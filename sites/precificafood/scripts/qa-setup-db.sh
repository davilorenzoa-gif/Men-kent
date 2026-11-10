#!/usr/bin/env bash
# Cria (do zero) o banco local de QA com o shim do Supabase + migrations.
set -euo pipefail
cd "$(dirname "$0")/.."
ADMIN_URL="${DATABASE_URL:-postgres://postgres:postgres@localhost:5432/postgres}"
psql "$ADMIN_URL" -q -c "drop database if exists precificafood_qa" -c "create database precificafood_qa"
URL="${ADMIN_URL%/*}/precificafood_qa"
psql "$URL" -q -v ON_ERROR_STOP=1 -f supabase/tests/local-shim.sql
for f in supabase/migrations/*.sql; do psql "$URL" -q -v ON_ERROR_STOP=1 -f "$f"; done
echo "banco precificafood_qa pronto"
