-- Testes de isolamento entre restaurantes (RLS). Rodar com: npm run test:db
\set ON_ERROR_STOP on
begin;

insert into auth.users(id, email) values
  ('11111111-1111-1111-1111-111111111111', 'a@teste.local'),
  ('22222222-2222-2222-2222-222222222222', 'b@teste.local'),
  ('33333333-3333-3333-3333-333333333333', 'c@teste.local');

create temp table ctx(k text primary key, v uuid);
grant all on ctx to authenticated;

-- Usuário A cria restaurante e um produto
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
insert into ctx values ('ra', public.create_restaurant('Burger do A'));
insert into ctx select 'pa', public.save_product(
  jsonb_build_object('restaurant_id', (select v from ctx where k='ra'), 'name', 'X-Burger', 'category', 'Lanches', 'packaging_cost', 2, 'current_price', 29.9),
  '[{"name":"Pão","quantity":1,"unit":"un","unit_cost":1.8},{"name":"Blend","quantity":0.15,"unit":"kg","unit_cost":42}]'::jsonb,
  '{"recommended_price":29.09,"commercial_price":29.9,"variable_cost":15,"contribution_margin":0.25}'::jsonb);

insert into ctx select 'fa', id from public.fee_profiles where is_default;
do $$ begin
  assert (select count(*) from public.restaurants) = 1, 'A deveria ver 1 restaurante';
  assert (select count(*) from public.product_ingredients) = 2, 'A deveria ver 2 ingredientes';
  assert (select count(*) from public.price_snapshots) = 1, 'A deveria ver 1 histórico';
  assert (select count(*) from public.fee_profiles where is_default) = 1, 'perfil iFood padrão criado';
end $$;

-- Usuário B cria o dele
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';
insert into ctx values ('rb', public.create_restaurant('Pizza do B'));

do $$
declare n int;
begin
  assert (select count(*) from public.restaurants) = 1, 'B só vê o próprio restaurante';
  assert (select count(*) from public.products) = 0, 'B não vê produtos de A';
  assert (select count(*) from public.product_ingredients) = 0, 'B não vê ingredientes de A';
  assert (select count(*) from public.price_snapshots) = 0, 'B não vê histórico de A';

  update public.products set current_price = 1 where id = (select v from ctx where k='pa');
  get diagnostics n = row_count;
  assert n = 0, 'B não altera produto de A';

  delete from public.products where id = (select v from ctx where k='pa');
  get diagnostics n = row_count;
  assert n = 0, 'B não apaga produto de A';

  begin
    insert into public.products(restaurant_id, name) values ((select v from ctx where k='ra'), 'Invasor');
    assert false, 'B não deveria inserir no restaurante de A';
  exception when insufficient_privilege then null;
  end;

  begin
    perform public.save_product(jsonb_build_object('restaurant_id', (select v from ctx where k='ra'), 'name', 'Invasor'), '[]'::jsonb, null);
    assert false, 'save_product deveria barrar B';
  exception when insufficient_privilege then null;
  end;

  begin
    perform public.save_product(jsonb_build_object('id', (select v from ctx where k='pa'), 'restaurant_id', (select v from ctx where k='rb'), 'name', 'Roubo'), '[]'::jsonb, null);
    assert false, 'B não pode puxar produto de A para o restaurante dele';
  exception when no_data_found then null;
  end;

  begin
    insert into public.restaurant_members(restaurant_id, user_id, role) values ((select v from ctx where k='ra'), '22222222-2222-2222-2222-222222222222', 'owner');
    assert false, 'B não pode se adicionar como membro de A';
  exception when insufficient_privilege then null;
  end;

  begin
    perform public.create_restaurant('Segundo');
    assert false, 'um restaurante por usuário';
  exception when unique_violation then null;
  end;
end $$;

-- Produto de B não pode apontar para perfil de taxa de A
do $$ begin
  begin
    perform public.save_product(jsonb_build_object('restaurant_id', (select v from ctx where k='rb'), 'name', 'Pizza',
      'fee_profile_id', (select v from ctx where k='fa')), '[]'::jsonb, null);
    assert false, 'perfil de taxa de outro restaurante deveria falhar';
  exception when foreign_key_violation then null;
  end;
end $$;

-- A não consegue mudar restaurant_id do próprio produto para outro restaurante
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
do $$ begin
  begin
    update public.products set restaurant_id = (select v from ctx where k='rb') where id = (select v from ctx where k='pa');
    assert false, 'restaurant_id deveria ser imutável';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.price_snapshots set current_price = 0;
    assert (select count(*) from public.price_snapshots where current_price = 0) = 0, 'histórico é imutável';
  end;
  begin
    perform public.save_product(jsonb_build_object('restaurant_id', (select v from ctx where k='ra'), 'name', 'Neg', 'packaging_cost', -1), '[]'::jsonb, null);
    assert false, 'custo negativo deveria falhar';
  exception when check_violation then null;
  end;
end $$;

-- Usuário sem restaurante não vê nada; anon não lê nada
set local request.jwt.claims = '{"sub":"33333333-3333-3333-3333-333333333333","role":"authenticated"}';
do $$ begin
  assert (select count(*) from public.restaurants) = 0, 'C não vê nada';
  assert (select count(*) from public.products) = 0, 'C não vê produtos';
end $$;
reset role;
set local role anon;
do $$ begin
  begin
    perform count(*) from public.products;
    assert false, 'anon não deveria ler products';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;

select 'RLS OK: todos os testes de isolamento passaram' as resultado;
rollback;
