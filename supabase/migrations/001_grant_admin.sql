-- Grant admin role to the specified user via app_metadata.
-- Run this in the Supabase SQL editor after creating the user
-- under Authentication → Users in the dashboard.

UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'vorynto.india@gmail.com';
