-- Run in the existing Supabase project SQL editor. No public/admin-user DB policies are created.
create table if not exists public.site_content (
 id text primary key check(id='homepage'),
 draft jsonb,
 published jsonb,
 version integer not null default 0,
 updated_at timestamptz not null default now(),
 published_at timestamptz
);
insert into public.site_content(id) values('homepage') on conflict do nothing;
alter table public.site_content enable row level security;
revoke all on public.site_content from anon,authenticated;
grant select,insert,update on public.site_content to service_role;
alter table public.inquiries add column if not exists status text not null default 'new' check(status in ('new','contacted','enrolled','closed'));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('site-media','site-media',true,4194304,array['image/png','image/jpeg','image/webp'])
on conflict(id) do update set public=true,file_size_limit=4194304,allowed_mime_types=array['image/png','image/jpeg','image/webp'];
-- Public bucket URLs serve published images. All uploads go through authenticated server endpoints.
-- No browser roles receive table access or storage upload policies.

grant select, update on public.inquiries to service_role;
