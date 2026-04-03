-- Agregar columnas de Stripe a la tabla profiles
alter table profiles
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists stripe_status text;

-- Index para búsquedas rápidas por customer
create index if not exists profiles_stripe_customer_id_idx on profiles(stripe_customer_id);
