create table if not exists public.analytics_sessions(id uuid primary key,first_seen timestamptz not null default now(),last_seen timestamptz not null default now(),country text not null,city text not null,source text not null,device text not null);
create table if not exists public.analytics_events(id uuid primary key,created_at timestamptz not null default now(),session_id uuid not null,event_type text not null check(event_type in ('pageview','whatsapp')),path text not null,source text not null,device text not null,country text not null,city text not null,rate_hash text not null);
alter table public.analytics_sessions enable row level security;
alter table public.analytics_events enable row level security;
revoke all on public.analytics_sessions,public.analytics_events from anon,authenticated;
grant select,insert,update,delete on public.analytics_sessions,public.analytics_events to service_role;
create index if not exists analytics_events_created on public.analytics_events(created_at);
create index if not exists analytics_events_rate on public.analytics_events(rate_hash,created_at);
create index if not exists analytics_sessions_active on public.analytics_sessions(last_seen);
create or replace function public.record_site_analytics(payload jsonb) returns void language plpgsql security definer set search_path=public as $$
declare sid uuid:=(payload->>'session')::uuid; typ text:=payload->>'type'; rate text:=payload->>'rate_hash';
begin
 if typ not in ('pageview','heartbeat','whatsapp') then return; end if;
 perform pg_advisory_xact_lock(hashtextextended(rate,0));
 if (select count(*) from public.analytics_events where rate_hash=rate and created_at>now()-interval '1 hour')>=240 then return; end if;
 if typ='pageview' then
 insert into public.analytics_sessions(id,country,city,source,device) values(sid,left(payload->>'country',100),left(payload->>'city',100),left(payload->>'source',100),left(payload->>'device',20)) on conflict(id) do update set last_seen=now();
 else
 update public.analytics_sessions set last_seen=now() where id=sid;
 if not found then return; end if;
 end if;
 if typ<>'heartbeat' then
 insert into public.analytics_events(id,session_id,event_type,path,source,device,country,city,rate_hash) values((payload->>'id')::uuid,sid,typ,left(payload->>'path',300),left(payload->>'source',100),left(payload->>'device',20),left(payload->>'country',100),left(payload->>'city',100),rate) on conflict(id) do nothing;
 end if;
 -- Small bounded retention cleanup, avoiding an unbounded deletion on request paths.
 delete from public.analytics_events where id in(select id from public.analytics_events where created_at<now()-interval '90 days' limit 100);
 delete from public.analytics_sessions where id in(select id from public.analytics_sessions where last_seen<now()-interval '90 days' limit 100);
end;$$;
create or replace function public.site_analytics_summary(range_days integer default 7) returns jsonb language plpgsql security definer set search_path=public as $$
declare start_at timestamptz; result jsonb;
begin
 if range_days not in (1,7,30) then raise exception 'Invalid range'; end if;
 start_at:=(((now() at time zone 'Asia/Karachi')::date-(range_days-1))::timestamp at time zone 'Asia/Karachi');
 with events as(select * from public.analytics_events where created_at>=start_at),
 summary as(select count(*) filter(where event_type='pageview') as views,count(distinct session_id) filter(where event_type='pageview') as visitors,count(*) filter(where event_type='whatsapp') as whatsapp from events),
 daily as(select d::date as day,count(e.id) filter(where event_type='pageview') as views,count(distinct e.session_id) filter(where event_type='pageview') as visitors from generate_series((start_at at time zone 'Asia/Karachi')::date,(now() at time zone 'Asia/Karachi')::date,interval '1 day') d left join events e on(e.created_at at time zone 'Asia/Karachi')::date=d::date group by d order by d)
 select jsonb_build_object('views',s.views,'visitors',s.visitors,'whatsapp',s.whatsapp,'active',(select count(*) from public.analytics_sessions where last_seen>now()-interval '5 minutes'),'days',range_days,'updatedAt',now(),'firstTrackedAt',(select min(created_at) from public.analytics_events),'daily',(select coalesce(jsonb_agg(jsonb_build_object('day',day,'views',views,'visitors',visitors)),'[]'::jsonb) from daily),'pages',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select path as name,count(*) as count from events where event_type='pageview' group by path order by count(*) desc limit 10)x),'countries',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select country as name,count(distinct session_id) as count from events where event_type='pageview' group by country order by count(distinct session_id) desc limit 10)x),'cities',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select city||', '||country as name,count(distinct session_id) as count from events where event_type='pageview' group by city,country order by count(distinct session_id) desc limit 10)x),'sources',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select source as name,count(*) as count from public.analytics_sessions where id in(select session_id from events where event_type='pageview') group by source order by count(*) desc limit 10)x),'devices',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select device as name,count(distinct session_id) as count from events where event_type='pageview' group by device order by count(distinct session_id) desc)x),'liveLocations',(select coalesce(jsonb_agg(x),'[]'::jsonb) from(select city||', '||country as name,count(*) as count from public.analytics_sessions where last_seen>now()-interval '5 minutes' group by city,country order by count(*) desc limit 10)x)) into result from summary s;
 return result;
end;$$;
revoke all on function public.record_site_analytics(jsonb),public.site_analytics_summary(integer) from public,anon,authenticated;
grant execute on function public.record_site_analytics(jsonb),public.site_analytics_summary(integer) to service_role;
