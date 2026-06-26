-- Supabase SQL Editor에서 실행하세요.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  thumbnail_url text not null default '',
  name text not null,
  category text not null default 'top'
    check (category in ('top', 'bottom', 'outer', 'dress', 'accessory')),
  detail_page_status text not null default 'not_started'
    check (detail_page_status in ('not_started', 'in_progress', 'done')),
  detail_page_url text not null default '',
  cost_price integer not null default 0,
  sale_price integer not null default 0,
  margin_amount integer not null default 0,
  margin_rate numeric(5, 1) not null default 0,
  sale_status text not null default 'draft'
    check (sale_status in ('draft', 'selling', 'sold_out', 'stopped')),
  memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_updated_at_idx on public.products (updated_at desc);
create index if not exists products_category_idx on public.products (category);

alter table public.products enable row level security;

create policy "products_select" on public.products
  for select using (true);

create policy "products_insert" on public.products
  for insert with check (true);

create policy "products_update" on public.products
  for update using (true);

create policy "products_delete" on public.products
  for delete using (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "product_images_select" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "product_images_insert" on storage.objects
  for insert with check (bucket_id = 'product-images');

create policy "product_images_update" on storage.objects
  for update using (bucket_id = 'product-images');

create policy "product_images_delete" on storage.objects
  for delete using (bucket_id = 'product-images');
