-- ============================================================
-- ResumeForge — Initial Database Schema
-- Migration: 001_initial_schema
-- 
-- Design decisions:
--   • JSONB for resume data (flexible, indexable, avoids over-normalization)
--   • RLS enabled on all tables — users can only access their own data
--   • Triggers for updated_at consistency
--   • Partial indexes for common query patterns
-- ============================================================

-- ── Extensions ────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search on resume titles

-- ── Enums ─────────────────────────────────────────────────────────────────────

CREATE TYPE user_plan AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE download_format AS ENUM ('pdf', 'docx', 'txt');
CREATE TYPE theme_mode AS ENUM ('light', 'dark', 'system');

-- ── Helper: updated_at trigger function ───────────────────────────────────────

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Table: profiles ───────────────────────────────────────────────────────────
-- Extends auth.users with app-specific profile data.
-- A trigger auto-creates a profile row when a user signs up.

CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL DEFAULT '',
  avatar_url   TEXT,
  headline     TEXT NOT NULL DEFAULT '',
  website      TEXT NOT NULL DEFAULT '',
  location     TEXT NOT NULL DEFAULT '',
  plan         user_plan NOT NULL DEFAULT 'free',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Never let a profile-creation failure block signup.
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── Table: resumes ────────────────────────────────────────────────────────────
-- Core resume entity. JSONB columns store the resume data and settings.
-- This approach allows schema evolution without migrations for content changes.

CREATE TABLE resumes (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title            TEXT NOT NULL DEFAULT 'Untitled Resume',
  slug             TEXT NOT NULL,
  template_id      TEXT NOT NULL DEFAULT 'classic-professional',
  theme            JSONB NOT NULL DEFAULT '{}',
  sections         JSONB NOT NULL DEFAULT '[]',
  data             JSONB NOT NULL DEFAULT '{}',
  is_public        BOOLEAN NOT NULL DEFAULT FALSE,
  metadata         JSONB NOT NULL DEFAULT '{}',
  last_exported_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT resumes_slug_user_unique UNIQUE (user_id, slug),
  CONSTRAINT resumes_title_length CHECK (char_length(title) <= 100)
);

CREATE TRIGGER resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Indexes for common query patterns
CREATE INDEX idx_resumes_user_id ON resumes(user_id);
CREATE INDEX idx_resumes_updated_at ON resumes(user_id, updated_at DESC);
CREATE INDEX idx_resumes_title_search ON resumes USING gin(title gin_trgm_ops);

-- ── Table: resume_versions ────────────────────────────────────────────────────
-- Immutable version history snapshots. Written on explicit save actions.

CREATE TABLE resume_versions (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id      UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title          TEXT NOT NULL,
  snapshot       JSONB NOT NULL, -- Full resume state at this point in time
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT resume_versions_unique_version UNIQUE (resume_id, version_number)
);

CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id, version_number DESC);
CREATE INDEX idx_resume_versions_user_id ON resume_versions(user_id);

-- ── Table: user_settings ──────────────────────────────────────────────────────

CREATE TABLE user_settings (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_mode           theme_mode NOT NULL DEFAULT 'system',
  default_template_id  TEXT,
  email_notifications  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Auto-create settings row on signup
CREATE OR REPLACE FUNCTION handle_new_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_settings (user_id) VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_settings();

-- ── Table: downloads ──────────────────────────────────────────────────────────
-- Tracks PDF export history for analytics and rate limiting.

CREATE TABLE downloads (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id  UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  format     download_format NOT NULL DEFAULT 'pdf',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_downloads_user_id ON downloads(user_id, created_at DESC);
CREATE INDEX idx_downloads_resume_id ON downloads(resume_id);

-- ── Function: get_resume_count ────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_resume_count(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM resumes WHERE user_id = p_user_id;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ── Row Level Security ────────────────────────────────────────────────────────
-- Every table uses RLS. Users can only see and modify their own data.
-- SECURITY DEFINER functions bypass RLS for internal operations.

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- resumes
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resumes_select_own"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "resumes_insert_own"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "resumes_update_own"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "resumes_delete_own"
  ON resumes FOR DELETE
  USING (auth.uid() = user_id);

-- resume_versions
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resume_versions_select_own"
  ON resume_versions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "resume_versions_insert_own"
  ON resume_versions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- user_settings
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_settings_select_own"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_settings_update_own"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- downloads
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "downloads_select_own"
  ON downloads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "downloads_insert_own"
  ON downloads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── Storage Buckets ───────────────────────────────────────────────────────────
-- Note: Run these via Supabase Dashboard or Storage API, not SQL.
-- Documented here for completeness.

-- Bucket: avatars (public read, authenticated write own files)
-- Bucket: resume-exports (private, authenticated access only)
-- Bucket: template-previews (public read)
