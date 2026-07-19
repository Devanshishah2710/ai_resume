-- ResumeForge — initial schema, RLS, storage, and triggers.
--
-- Run this in the Supabase SQL Editor. It is idempotent where practical so it
-- can be re-run safely. Every table is owned by auth.users via `user_id` and
-- protected by row-level security so a user can only read/write their own rows.

-- ─────────────────────────────────────────────────────────────────────────────
-- Extensions
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- Profiles (1:1 with auth.users)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default '',
  avatar_url  text,
  headline    text not null default '',
  website     text not null default '',
  location    text not null default '',
  plan        text not null default 'free' check (plan in ('free', 'pro', 'enterprise')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Resumes
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.resumes (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  title            text not null,
  slug             text not null,
  template_id      text not null default 'classic-professional',
  theme            jsonb not null,
  sections         jsonb not null,
  data             jsonb not null,
  is_public        boolean not null default false,
  metadata         jsonb not null default '{"targetRole":"","targetCompany":"","notes":""}'::jsonb,
  last_exported_at timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (user_id, slug)
);

create index if not exists resumes_user_id_idx on public.resumes (user_id);
create index if not exists resumes_user_id_updated_at_idx on public.resumes (user_id, updated_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- Resume versions (reserved for history)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.resume_versions (
  id         uuid primary key default gen_random_uuid(),
  resume_id  uuid not null references public.resumes (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  title      text not null,
  theme      jsonb not null,
  sections   jsonb not null,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists resume_versions_resume_id_idx on public.resume_versions (resume_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Downloads (PDF export events)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.downloads (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  resume_id  uuid not null references public.resumes (id) on delete cascade,
  format     text not null default 'pdf' check (format in ('pdf', 'docx', 'txt')),
  created_at timestamptz not null default now()
);

create index if not exists downloads_user_id_idx on public.downloads (user_id);
create index if not exists downloads_resume_id_idx on public.downloads (resume_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- User settings (reserved)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.user_settings (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  settings   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Subscriptions (billing — not implemented in app yet, schema ready)
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  plan            text not null default 'free' check (plan in ('free', 'pro', 'enterprise')),
  status          text not null default 'active' check (status in ('active', 'canceled', 'past_due', 'trialing')),
  provider        text,
  provider_sub_id text,
  current_period_end timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Updated-at triggers
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists resumes_set_updated_at on public.resumes;
create trigger resumes_set_updated_at before update on public.resumes
  for each row execute function public.set_updated_at();

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at before update on public.user_settings
  for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Auto-create profile on signup
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- Row-level security
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.profiles          enable row level security;
alter table public.resumes           enable row level security;
alter table public.resume_versions   enable row level security;
alter table public.downloads         enable row level security;
alter table public.user_settings     enable row level security;
alter table public.subscriptions     enable row level security;

-- Helper: true when the row belongs to the current user.
-- (auth.uid() is stable within a statement; no function wrapper needed.)

-- Profiles
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Resumes
drop policy if exists resumes_select_own on public.resumes;
create policy resumes_select_own on public.resumes
  for select using (auth.uid() = user_id or is_public = true);

drop policy if exists resumes_insert_own on public.resumes;
create policy resumes_insert_own on public.resumes
  for insert with check (auth.uid() = user_id);

drop policy if exists resumes_update_own on public.resumes;
create policy resumes_update_own on public.resumes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists resumes_delete_own on public.resumes;
create policy resumes_delete_own on public.resumes
  for delete using (auth.uid() = user_id);

-- Resume versions
drop policy if exists resume_versions_select_own on public.resume_versions;
create policy resume_versions_select_own on public.resume_versions
  for select using (auth.uid() = user_id);

drop policy if exists resume_versions_insert_own on public.resume_versions;
create policy resume_versions_insert_own on public.resume_versions
  for insert with check (auth.uid() = user_id);

drop policy if exists resume_versions_delete_own on public.resume_versions;
create policy resume_versions_delete_own on public.resume_versions
  for delete using (auth.uid() = user_id);

-- Downloads
drop policy if exists downloads_select_own on public.downloads;
create policy downloads_select_own on public.downloads
  for select using (auth.uid() = user_id);

drop policy if exists downloads_insert_own on public.downloads;
create policy downloads_insert_own on public.downloads
  for insert with check (auth.uid() = user_id);

drop policy if exists downloads_delete_own on public.downloads;
create policy downloads_delete_own on public.downloads
  for delete using (auth.uid() = user_id);

-- User settings
drop policy if exists user_settings_select_own on public.user_settings;
create policy user_settings_select_own on public.user_settings
  for select using (auth.uid() = user_id);

drop policy if exists user_settings_upsert_own on public.user_settings;
create policy user_settings_upsert_own on public.user_settings
  for insert with check (auth.uid() = user_id);

drop policy if exists user_settings_update_own on public.user_settings;
create policy user_settings_update_own on public.user_settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Subscriptions
drop policy if exists subscriptions_select_own on public.subscriptions;
create policy subscriptions_select_own on public.subscriptions
  for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Storage buckets
-- ─────────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('resume-exports', 'resume-exports', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('template-previews', 'template-previews', true)
on conflict (id) do nothing;

-- Avatars: owner may read/write their own folder; public read for anyone.
drop policy if exists avatars_public_read on storage.objects;
create policy avatars_public_read on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists avatars_upload_own on storage.objects;
create policy avatars_upload_own on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

drop policy if exists avatars_update_own on storage.objects;
create policy avatars_update_own on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

drop policy if exists avatars_delete_own on storage.objects;
create policy avatars_delete_own on storage.objects
  for delete using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- Resume exports: private, owner-scoped.
drop policy if exists resume_exports_insert_own on storage.objects;
create policy resume_exports_insert_own on storage.objects
  for insert with check (bucket_id = 'resume-exports' and auth.uid()::text = (storage.foldername(name))[1]);

drop policy if exists resume_exports_select_own on storage.objects;
create policy resume_exports_select_own on storage.objects
  for select using (bucket_id = 'resume-exports' and auth.uid()::text = (storage.foldername(name))[1]);

drop policy if exists resume_exports_delete_own on storage.objects;
create policy resume_exports_delete_own on storage.objects
  for delete using (bucket_id = 'resume-exports' and auth.uid()::text = (storage.foldername(name))[1]);

-- Template previews: public read, admin write (authenticated users may upload).
drop policy if exists template_previews_public_read on storage.objects;
create policy template_previews_public_read on storage.objects
  for select using (bucket_id = 'template-previews');

drop policy if exists template_previews_insert_auth on storage.objects;
create policy template_previews_insert_auth on storage.objects
  for insert with check (bucket_id = 'template-previews' and auth.role() = 'authenticated');
