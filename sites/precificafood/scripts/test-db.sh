#!/usr/bin/env bash
# Sobe a migration num banco Postgres descartável e roda os testes de RLS.
# Uso: DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres npm run test:db
set -euo pipefail
cd "$(dirname "$0")/.."
ADMIN_URL="${DATABASE_URL:-postgres://postgres:postgres@localhost:5432/postgres}"
DB="precificafood_test_$$"
psql "$ADMIN_URL" -q -v ON_ERROR_STOP=1 -c "create database $DB" >/dev/null
trap 'psql "$ADMIN_URL" -q -c "drop database if exists $DB" >/dev/null' EXIT
URL="${ADMIN_URL%/*}/$DB"
psql "$URL" -q -v ON_ERROR_STOP=1 -f supabase/tests/local-shim.sql >/dev/null
for f in supabase/migrations/*.sql; do psql "$URL" -q -v ON_ERROR_STOP=1 -f "$f" >/dev/null; done
psql "$URL" -q -v ON_ERROR_STOP=1 -f supabase/tests/rls.test.sql
