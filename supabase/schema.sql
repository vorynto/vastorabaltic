-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists site_settings (
  id text primary key default 'global',
  settings jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists site_content (
  id text primary key default 'global',
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table site_settings enable row level security;
alter table site_content enable row level security;
alter table enquiries enable row level security;

-- site_settings: public can read; authenticated (admin) can do everything
create policy "Public can read settings"
  on site_settings for select
  to anon, authenticated
  using (true);

create policy "Authenticated can manage settings"
  on site_settings for all
  to authenticated
  using (true)
  with check (true);

-- site_content: public can read; authenticated (admin) can do everything
create policy "Public can read content"
  on site_content for select
  to anon, authenticated
  using (true);

create policy "Authenticated can manage content"
  on site_content for all
  to authenticated
  using (true)
  with check (true);

-- enquiries: anyone can submit; only authenticated (admin) can read
create policy "Public can create enquiries"
  on enquiries for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read enquiries"
  on enquiries for select
  to authenticated
  using (true);

create policy "Authenticated can delete enquiries"
  on enquiries for delete
  to authenticated
  using (true);
