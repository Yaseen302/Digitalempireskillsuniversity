-- Run once in your Supabase SQL editor. Never expose the service-role key to browsers.
create table if not exists public.inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 kind text not null check(kind in ('contact','consultation','application')),
 name text not null, email text not null, phone text not null,
 subject text, message text, country text, course text,
 preferred_date date, preferred_time time, time_zone text,
 consent boolean not null default true,
 notification_sent boolean not null default false
);
alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;
create index if not exists inquiries_email_created on public.inquiries(email,created_at);
create or replace function public.submit_inquiry(payload jsonb) returns uuid
language plpgsql security definer set search_path=public as $$
declare new_id uuid; normalized_email text := lower(payload->>'email');
begin
 perform pg_advisory_xact_lock(hashtextextended(normalized_email,0));
 if (select count(*) from public.inquiries where email=normalized_email and created_at>now()-interval '1 hour') >= 4 then
 raise exception 'rate_limit';
 end if;
 insert into public.inquiries(kind,name,email,phone,subject,message,country,course,preferred_date,preferred_time,time_zone,consent)
 values(payload->>'kind',payload->>'name',normalized_email,payload->>'phone',payload->>'subject',payload->>'message',payload->>'country',payload->>'course',nullif(payload->>'preferred_date','')::date,nullif(payload->>'preferred_time','')::time,payload->>'time_zone',true)
 returning id into new_id;
 return new_id;
end;
$$;
revoke all on function public.submit_inquiry(jsonb) from public,anon,authenticated;
grant execute on function public.submit_inquiry(jsonb) to service_role;
