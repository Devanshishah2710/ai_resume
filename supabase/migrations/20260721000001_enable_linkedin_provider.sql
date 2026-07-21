-- Enable LinkedIn OAuth provider
--
-- This migration tracks the LinkedIn OAuth provider configuration for the project.
-- Note: The actual provider enablement must be done in the Supabase Dashboard:
--   Authentication → Providers → LinkedIn → toggle ON and paste Client ID/Secret.
--
-- This table serves as an infra-as-code record that the provider was intentionally
-- configured for this project. It is for audit/documentation purposes only.
--
-- After running this migration, also configure:
--   1. LinkedIn Developer Portal — add the Supabase callback URL as an Authorized
--      redirect URI: https://<project>.supabase.co/auth/v1/callback
--   2. Supabase Dashboard — enable LinkedIn provider with the Client ID/Secret

CREATE TABLE IF NOT EXISTS public.auth_provider_configs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider    text NOT NULL UNIQUE,
  enabled     boolean NOT NULL DEFAULT false,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.auth_provider_configs (provider, enabled, notes)
VALUES ('linkedin_oidc', true, 'LinkedIn (OIDC) configured for user sign-in via Sign In with LinkedIn OpenID Connect')
ON CONFLICT (provider) DO UPDATE
  SET enabled = true, updated_at = now();
