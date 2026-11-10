-- PrecificaFood — schema inicial
-- Multiestabelecimento: cada usuário acessa só os restaurantes em que é membro.
-- Toda tabela de dados tem restaurant_id e RLS ligada.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------
-- Tabelas
-- ---------------------------------------------------------------

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  logo_url text check (logo_url is null or char_length(logo_url) <= 300000),
  target_margin_pct numeric(7,3) not null default 25 check (target_margin_pct >= 0 and target_margin_pct < 100),
  default_tax_pct numeric(7,3) not null default 6 check (default_tax_pct >= 0 and default_tax_pct < 100),
  fixed_monthly_costs numeric(14,2) not null default 0 check (fixed_monthly_costs >= 0),
  estimated_monthly_orders integer not null default 0 check (estimated_monthly_orders >= 0),
  rounding_rule text not null default 'end_90' check (rounding_rule in ('none','end_90','end_99','end_50','whole')),
  currency text not null default 'BRL' check (currency = 'BRL'),
  food_cost_alert_pct numeric(7,3) not null default 35 check (food_cost_alert_pct > 0 and food_cost_alert_pct <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.restaurant_members (
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','editor','viewer')),
  created_at timestamptz not null default now(),
  primary key (restaurant_id, user_id)
);
create index restaurant_members_user_idx on public.restaurant_members(user_id);

-- Perfis de taxa por canal de venda (iFood hoje; outros canais depois).
create table public.fee_profiles (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  channel text not null default 'ifood' check (channel in ('ifood','proprio','outro')),
  plan_name text check (plan_name is null or char_length(plan_name) <= 80),
  commission_pct numeric(7,3) not null default 0 check (commission_pct >= 0 and commission_pct < 100),
  payment_fee_pct numeric(7,3) not null default 0 check (payment_fee_pct >= 0 and payment_fee_pct < 100),
  delivery_commission_pct numeric(7,3) not null default 0 check (delivery_commission_pct >= 0 and delivery_commission_pct < 100),
  apply_delivery_commission boolean not null default false,
  other_fees_pct numeric(7,3) not null default 0 check (other_fees_pct >= 0 and other_fees_pct < 100),
  per_order_fee numeric(12,2) not null default 0 check (per_order_fee >= 0),
  monthly_fee numeric(12,2) not null default 0 check (monthly_fee >= 0),
  campaign_discount_pct numeric(7,3) not null default 0 check (campaign_discount_pct >= 0 and campaign_discount_pct < 100),
  commission_base text not null default 'customer' check (commission_base in ('list','customer','restaurant')),
  payment_fee_base text not null default 'customer' check (payment_fee_base in ('list','customer','restaurant')),
  is_default boolean not null default false,
  notes text check (notes is null or char_length(notes) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, restaurant_id)
);
create unique index fee_profiles_one_default on public.fee_profiles(restaurant_id) where is_default;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  fee_profile_id uuid,
  name text not null check (char_length(btrim(name)) between 1 and 120),
  category text not null default 'Geral' check (char_length(btrim(category)) between 1 and 60),
  description text check (description is null or char_length(description) <= 1000),
  packaging_cost numeric(12,4) not null default 0 check (packaging_cost >= 0),
  labor_cost numeric(12,4) not null default 0 check (labor_cost >= 0),
  other_cost numeric(12,4) not null default 0 check (other_cost >= 0),
  current_price numeric(12,2) check (current_price is null or current_price >= 0),
  tax_pct numeric(7,3) check (tax_pct is null or (tax_pct >= 0 and tax_pct < 100)),
  target_margin_pct numeric(7,3) check (target_margin_pct is null or (target_margin_pct >= 0 and target_margin_pct < 100)),
  funded_discount_pct numeric(7,3) check (funded_discount_pct is null or (funded_discount_pct >= 0 and funded_discount_pct < 100)),
  fixed_cost_per_order numeric(12,4) check (fixed_cost_per_order is null or fixed_cost_per_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, restaurant_id),
  -- o perfil de taxa precisa ser do mesmo restaurante
  foreign key (fee_profile_id, restaurant_id) references public.fee_profiles(id, restaurant_id) on delete set null (fee_profile_id)
);
create index products_restaurant_idx on public.products(restaurant_id);

create table public.product_ingredients (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null,
  restaurant_id uuid not null,
  position integer not null default 0 check (position >= 0),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  quantity numeric(14,4) not null default 1 check (quantity >= 0),
  unit text not null default 'un' check (char_length(unit) between 1 and 12),
  unit_cost numeric(14,4) not null default 0 check (unit_cost >= 0),
  created_at timestamptz not null default now(),
  foreign key (product_id, restaurant_id) references public.products(id, restaurant_id) on delete cascade
);
create index product_ingredients_product_idx on public.product_ingredients(product_id);
create index product_ingredients_restaurant_idx on public.product_ingredients(restaurant_id);

-- Histórico das simulações de preço (gravado a cada vez que o produto é salvo).
create table public.price_snapshots (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null,
  restaurant_id uuid not null,
  recommended_price numeric(12,2),
  commercial_price numeric(12,2),
  current_price numeric(12,2),
  variable_cost numeric(12,4) not null default 0,
  contribution_margin numeric(9,6),
  created_at timestamptz not null default now(),
  foreign key (product_id, restaurant_id) references public.products(id, restaurant_id) on delete cascade
);
create index price_snapshots_restaurant_idx on public.price_snapshots(restaurant_id, created_at);

-- ---------------------------------------------------------------
-- Funções auxiliares de acesso (security definer, search_path fixo)
-- ---------------------------------------------------------------

create or replace function public.is_member(rid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.restaurant_members m where m.restaurant_id = rid and m.user_id = auth.uid());
$$;

create or replace function public.can_edit(rid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.restaurant_members m
    where m.restaurant_id = rid and m.user_id = auth.uid() and m.role in ('owner','editor')
  );
$$;

create or replace function public.is_owner(rid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.restaurant_members m
    where m.restaurant_id = rid and m.user_id = auth.uid() and m.role = 'owner'
  );
$$;

revoke all on function public.is_member(uuid), public.can_edit(uuid), public.is_owner(uuid) from public;
grant execute on function public.is_member(uuid), public.can_edit(uuid), public.is_owner(uuid) to authenticated;

-- ---------------------------------------------------------------
-- Triggers: updated_at e restaurant_id imutável
-- ---------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

create or replace function public.lock_restaurant_id()
returns trigger language plpgsql as $$
begin
  if new.restaurant_id is distinct from old.restaurant_id then
    raise exception 'restaurant_id não pode ser alterado' using errcode = '42501';
  end if;
  return new;
end $$;

create trigger restaurants_touch before update on public.restaurants for each row execute function public.touch_updated_at();
create trigger fee_profiles_touch before update on public.fee_profiles for each row execute function public.touch_updated_at();
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();
create trigger fee_profiles_lock before update on public.fee_profiles for each row execute function public.lock_restaurant_id();
create trigger products_lock before update on public.products for each row execute function public.lock_restaurant_id();
create trigger product_ingredients_lock before update on public.product_ingredients for each row execute function public.lock_restaurant_id();
create trigger price_snapshots_lock before update on public.price_snapshots for each row execute function public.lock_restaurant_id();

-- ---------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------

alter table public.restaurants enable row level security;
alter table public.restaurant_members enable row level security;
alter table public.fee_profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_ingredients enable row level security;
alter table public.price_snapshots enable row level security;

-- restaurants: criação só pela função create_restaurant
create policy restaurants_select on public.restaurants for select to authenticated using (public.is_member(id));
create policy restaurants_update on public.restaurants for update to authenticated using (public.is_owner(id)) with check (public.is_owner(id));
create policy restaurants_delete on public.restaurants for delete to authenticated using (public.is_owner(id));

-- membros: leitura dentro do restaurante; alterações só por funções (convites ficam para depois)
create policy members_select on public.restaurant_members for select to authenticated using (public.is_member(restaurant_id));

create policy fee_profiles_select on public.fee_profiles for select to authenticated using (public.is_member(restaurant_id));
create policy fee_profiles_insert on public.fee_profiles for insert to authenticated with check (public.can_edit(restaurant_id));
create policy fee_profiles_update on public.fee_profiles for update to authenticated using (public.can_edit(restaurant_id)) with check (public.can_edit(restaurant_id));
create policy fee_profiles_delete on public.fee_profiles for delete to authenticated using (public.can_edit(restaurant_id) and not is_default);

create policy products_select on public.products for select to authenticated using (public.is_member(restaurant_id));
create policy products_insert on public.products for insert to authenticated with check (public.can_edit(restaurant_id));
create policy products_update on public.products for update to authenticated using (public.can_edit(restaurant_id)) with check (public.can_edit(restaurant_id));
create policy products_delete on public.products for delete to authenticated using (public.can_edit(restaurant_id));

create policy ingredients_select on public.product_ingredients for select to authenticated using (public.is_member(restaurant_id));
create policy ingredients_insert on public.product_ingredients for insert to authenticated with check (public.can_edit(restaurant_id));
create policy ingredients_update on public.product_ingredients for update to authenticated using (public.can_edit(restaurant_id)) with check (public.can_edit(restaurant_id));
create policy ingredients_delete on public.product_ingredients for delete to authenticated using (public.can_edit(restaurant_id));

-- histórico: só leitura e inserção (imutável)
create policy snapshots_select on public.price_snapshots for select to authenticated using (public.is_member(restaurant_id));
create policy snapshots_insert on public.price_snapshots for insert to authenticated with check (public.can_edit(restaurant_id));

-- anon não acessa nada
revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;

-- ---------------------------------------------------------------
-- Funções de negócio (RPC)
-- ---------------------------------------------------------------

-- Cria o restaurante, o vínculo de dono e um perfil de taxa iFood em branco
-- (o usuário preenche com as taxas do contrato dele; nada é fixado).
create or replace function public.create_restaurant(p_name text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  rid uuid;
begin
  if auth.uid() is null then
    raise exception 'não autenticado' using errcode = '42501';
  end if;
  if p_name is null or char_length(btrim(p_name)) = 0 then
    raise exception 'informe o nome do restaurante' using errcode = '22023';
  end if;
  if exists (select 1 from public.restaurant_members where user_id = auth.uid()) then
    raise exception 'este usuário já tem um restaurante' using errcode = '23505';
  end if;
  insert into public.restaurants(name) values (btrim(p_name)) returning id into rid;
  insert into public.restaurant_members(restaurant_id, user_id, role) values (rid, auth.uid(), 'owner');
  insert into public.fee_profiles(restaurant_id, name, channel, is_default) values (rid, 'iFood', 'ifood', true);
  return rid;
end $$;

revoke all on function public.create_restaurant(text) from public;
grant execute on function public.create_restaurant(text) to authenticated;

-- Salva produto + ingredientes + registro no histórico numa transação só.
-- security invoker: as políticas RLS valem para cada comando.
create or replace function public.save_product(p_product jsonb, p_ingredients jsonb, p_snapshot jsonb)
returns uuid language plpgsql security invoker set search_path = public as $$
declare
  pid uuid := nullif(p_product->>'id', '')::uuid;
  rid uuid := (p_product->>'restaurant_id')::uuid;
  ing jsonb;
  pos integer := 0;
begin
  if not public.can_edit(rid) then
    raise exception 'sem permissão para este restaurante' using errcode = '42501';
  end if;
  if jsonb_typeof(p_ingredients) <> 'array' or jsonb_array_length(p_ingredients) > 200 then
    raise exception 'lista de ingredientes inválida' using errcode = '22023';
  end if;

  if pid is null then
    insert into public.products(restaurant_id, fee_profile_id, name, category, description, packaging_cost, labor_cost, other_cost,
      current_price, tax_pct, target_margin_pct, funded_discount_pct, fixed_cost_per_order)
    values (rid, nullif(p_product->>'fee_profile_id','')::uuid, p_product->>'name', coalesce(nullif(p_product->>'category',''), 'Geral'),
      nullif(p_product->>'description',''), coalesce((p_product->>'packaging_cost')::numeric, 0), coalesce((p_product->>'labor_cost')::numeric, 0),
      coalesce((p_product->>'other_cost')::numeric, 0), (p_product->>'current_price')::numeric, (p_product->>'tax_pct')::numeric,
      (p_product->>'target_margin_pct')::numeric, (p_product->>'funded_discount_pct')::numeric, (p_product->>'fixed_cost_per_order')::numeric)
    returning id into pid;
  else
    update public.products set
      fee_profile_id = nullif(p_product->>'fee_profile_id','')::uuid,
      name = p_product->>'name',
      category = coalesce(nullif(p_product->>'category',''), 'Geral'),
      description = nullif(p_product->>'description',''),
      packaging_cost = coalesce((p_product->>'packaging_cost')::numeric, 0),
      labor_cost = coalesce((p_product->>'labor_cost')::numeric, 0),
      other_cost = coalesce((p_product->>'other_cost')::numeric, 0),
      current_price = (p_product->>'current_price')::numeric,
      tax_pct = (p_product->>'tax_pct')::numeric,
      target_margin_pct = (p_product->>'target_margin_pct')::numeric,
      funded_discount_pct = (p_product->>'funded_discount_pct')::numeric,
      fixed_cost_per_order = (p_product->>'fixed_cost_per_order')::numeric
    where id = pid and restaurant_id = rid;
    if not found then
      raise exception 'produto não encontrado' using errcode = 'P0002';
    end if;
    delete from public.product_ingredients where product_id = pid and restaurant_id = rid;
  end if;

  for ing in select * from jsonb_array_elements(p_ingredients) loop
    insert into public.product_ingredients(product_id, restaurant_id, position, name, quantity, unit, unit_cost)
    values (pid, rid, pos, ing->>'name', coalesce((ing->>'quantity')::numeric, 0), coalesce(nullif(ing->>'unit',''), 'un'),
      coalesce((ing->>'unit_cost')::numeric, 0));
    pos := pos + 1;
  end loop;

  if p_snapshot is not null and jsonb_typeof(p_snapshot) = 'object' then
    insert into public.price_snapshots(product_id, restaurant_id, recommended_price, commercial_price, current_price, variable_cost, contribution_margin)
    values (pid, rid, (p_snapshot->>'recommended_price')::numeric, (p_snapshot->>'commercial_price')::numeric,
      (p_snapshot->>'current_price')::numeric, coalesce((p_snapshot->>'variable_cost')::numeric, 0), (p_snapshot->>'contribution_margin')::numeric);
  end if;

  return pid;
end $$;

revoke all on function public.save_product(jsonb, jsonb, jsonb) from public;
grant execute on function public.save_product(jsonb, jsonb, jsonb) to authenticated;

-- Troca o perfil padrão de forma atômica.
create or replace function public.set_default_fee_profile(p_profile_id uuid)
returns void language plpgsql security invoker set search_path = public as $$
declare
  rid uuid;
begin
  select restaurant_id into rid from public.fee_profiles where id = p_profile_id;
  if rid is null or not public.can_edit(rid) then
    raise exception 'perfil não encontrado' using errcode = 'P0002';
  end if;
  update public.fee_profiles set is_default = false where restaurant_id = rid and is_default;
  update public.fee_profiles set is_default = true where id = p_profile_id;
end $$;

revoke all on function public.set_default_fee_profile(uuid) from public;
grant execute on function public.set_default_fee_profile(uuid) to authenticated;
