-- 기존 DB에 카테고리 컬럼 추가 (이미 schema.sql 전체를 실행했다면 생략 가능)

alter table public.products
  add column if not exists category text not null default 'top'
    check (category in ('top', 'bottom', 'outer', 'dress', 'accessory'));

create index if not exists products_category_idx on public.products (category);
