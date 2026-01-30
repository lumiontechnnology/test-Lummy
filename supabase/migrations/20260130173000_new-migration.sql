-- Create todos table for demo page
create table if not exists public.todos (
  id bigserial primary key,
  title text not null,
  inserted_at timestamptz default now()
);

-- Enable RLS and allow public read for demo
alter table public.todos enable row level security;
create policy "public read todos"
  on public.todos
  for select
  using ( true );
