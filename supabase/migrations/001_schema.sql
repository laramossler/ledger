-- The Ledger — Trip Planning Schema

-- Trips
create table trips (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references auth.users(id),
  title text not null,
  subtitle text,
  destination text,
  start_date date,
  end_date date,
  tone text default 'effortless',
  status text default 'draft',
  created_at timestamptz default now()
);

-- Guests
create table guests (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade,
  name text not null,
  initial char(1) not null,
  city text,
  phone text,
  email text,
  token text unique not null default encode(gen_random_bytes(16), 'hex'),
  responded boolean default false,
  created_at timestamptz default now()
);

-- Guest Responses
create table responses (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references guests(id) on delete cascade,
  trip_id uuid references trips(id) on delete cascade,
  vibes text[] not null,
  wildcard text,
  date_preference text,
  created_at timestamptz default now(),
  unique(guest_id)
);

-- Trip Days
create table trip_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade,
  day_number int not null,
  title text not null,
  theme text,
  sort_order int not null
);

-- Events
create table events (
  id uuid primary key default gen_random_uuid(),
  trip_day_id uuid references trip_days(id) on delete cascade,
  trip_id uuid references trips(id) on delete cascade,
  time text not null,
  title text not null,
  subtitle text,
  detail text,
  dress_code text,
  event_type text,
  locked boolean default false,
  booking_status text,
  booking_ref text,
  sort_order int not null
);

-- Event Alternatives
create table event_alternatives (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  title text not null,
  detail text,
  sort_order int not null
);

-- Votes
create table votes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  guest_id uuid references guests(id) on delete cascade,
  created_at timestamptz default now(),
  unique(event_id, guest_id)
);

-- Activity Log
create table activity_log (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade,
  guest_id uuid references guests(id),
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Indexes
create index idx_guests_trip on guests(trip_id);
create index idx_guests_token on guests(token);
create index idx_responses_trip on responses(trip_id);
create index idx_responses_guest on responses(guest_id);
create index idx_trip_days_trip on trip_days(trip_id);
create index idx_events_trip on events(trip_id);
create index idx_events_day on events(trip_day_id);
create index idx_votes_event on votes(event_id);
create index idx_votes_guest on votes(guest_id);
create index idx_activity_trip on activity_log(trip_id);

-- Row Level Security
alter table trips enable row level security;
alter table guests enable row level security;
alter table responses enable row level security;
alter table trip_days enable row level security;
alter table events enable row level security;
alter table event_alternatives enable row level security;
alter table votes enable row level security;
alter table activity_log enable row level security;

-- Policies: Host can do everything on their trips
create policy "Host full access to trips" on trips
  for all using (auth.uid() = host_id);

create policy "Host full access to guests" on guests
  for all using (trip_id in (select id from trips where host_id = auth.uid()));

create policy "Host full access to responses" on responses
  for all using (trip_id in (select id from trips where host_id = auth.uid()));

create policy "Host full access to trip_days" on trip_days
  for all using (trip_id in (select id from trips where host_id = auth.uid()));

create policy "Host full access to events" on events
  for all using (trip_id in (select id from trips where host_id = auth.uid()));

create policy "Host full access to event_alternatives" on event_alternatives
  for all using (event_id in (
    select e.id from events e join trips t on e.trip_id = t.id where t.host_id = auth.uid()
  ));

create policy "Host full access to votes" on votes
  for all using (event_id in (
    select e.id from events e join trips t on e.trip_id = t.id where t.host_id = auth.uid()
  ));

create policy "Host full access to activity_log" on activity_log
  for all using (trip_id in (select id from trips where host_id = auth.uid()));

-- Policies: Guests can read trip data via their token (using RPC or service key)
-- For MVP, we'll use the service role key for guest operations server-side

-- Enable realtime
alter publication supabase_realtime add table votes;
alter publication supabase_realtime add table events;
alter publication supabase_realtime add table activity_log;
alter publication supabase_realtime add table responses;
