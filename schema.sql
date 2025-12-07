create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- habits tables

create table habits (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    title text not null,
    description text,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,

    constraint title_length check (char_length(title) >= 1)  -- this for a stonemanson who once tried to just input 1 char in a field before :sob:

);

create table habit_logs (
    id uuid default gen_random_uuid() primary key,
    habit_id uuid references habits on delete cascade not null,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,

    unique(habit_id, completed_at)

);


alter table habits enable row level security;
alter table habit_logs enable row level security;

create policy "Users can view thier own habits." on habits
    for select using (auth.uid() = user_id);

create policy "Users can insert their own habits." on habits
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own habits." on habits
  for update using (auth.uid() = user_id);

create policy "Users can delete their own habits." on habits
  for delete using (auth.uid() = user_id);



create policy "Users can view their own habit logs." on habit_logs
  for select using (
    exists (
      select 1 from habits
      where habits.id = habit_logs.habit_id
      and habits.user_id = auth.uid()
    )
  );

create policy "Users can insert their own habit logs." on habit_logs
  for insert with check (
    exists (
      select 1 from habits
      where habits.id = habit_logs.habit_id
      and habits.user_id = auth.uid()
    )
  );

create policy "Users can delete their own habit logs." on habit_logs
  for delete using (
    exists (
      select 1 from habits
      where habits.id = habit_logs.habit_id
      and habits.user_id = auth.uid()
    )
  );