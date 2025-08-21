#!/usr/bin/env bash
# Basic runtime secret presence verifier
set -euo pipefail
REQUIRED=(
  SACRED_API_KEY
  SUPABASE_SERVICE_ROLE_KEY
  SUPABASE_DB_PASSWORD
  GEMINI_API_KEY
)
missing=0
echo "[Secret Verification]"
for v in "${REQUIRED[@]}"; do
  if [ -z "${!v:-}" ]; then
    printf '[-] %s MISSING\n' "$v"
    missing=1
  else
    printf '[+] %s OK\n' "$v"
  fi
done
exit $missing