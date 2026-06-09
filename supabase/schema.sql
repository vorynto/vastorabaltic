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

alter table site_settings enable row level security;
alter table site_content enable row level security;
alter table enquiries enable row level security;

create policy "Public can create enquiries"
  on enquiries for insert
  to anon
  with check (true);
