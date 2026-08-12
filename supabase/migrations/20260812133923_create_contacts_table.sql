create table contacts (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table contacts enable row level security;

-- Create policy to allow anonymous inserts
create policy "Allow anonymous inserts"
  on contacts for insert
  with check (true);
