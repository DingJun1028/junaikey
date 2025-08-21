#!/usr/bin/env bash
set -euo pipefail

# Defaults
DIR_NAME="codelab-friendlyeats-web"
SOURCE_SPEC="gh:firebase/friendlyeats-web/nextjs-start#master"
MIN_FIREBASE_CLI="14.1.0"
REPO_URL=""

usage() {
  cat <<EOF
Usage: $(basename "$0") [-d <dir>] -r <repo_url>

Options:
  -d <dir>       Target directory (default: ${DIR_NAME})
  -r <repo_url>  Your new GitHub repository URL (required), e.g.:
                 https://github.com/<USER>/<REPO>.git
                 or git@github.com:<USER>/<REPO>.git

Steps performed:
  1) Create and enter directory
  2) Fetch nextjs-start via giget and install deps
  3) Initialize git and push to your GitHub repo
  4) Install/upgrade Firebase CLI to >= ${MIN_FIREBASE_CLI}
  5) Login to Firebase (interactive)

Examples:
  $(basename "$0") -r https://github.com/yourname/friendlyeats-nextjs.git
  $(basename "$0") -d my-friendlyeats -r git@github.com:yourname/friendlyeats-nextjs.git
EOF
}

while getopts ":d:r:h" opt; do
  case $opt in
    d) DIR_NAME="$OPTARG" ;;
    r) REPO_URL="$OPTARG" ;;
    h) usage; exit 0 ;;
    \?) echo "Invalid option: -$OPTARG" >&2; usage; exit 1 ;;
    :) echo "Option -$OPTARG requires an argument." >&2; usage; exit 1 ;;
  esac
done

if [[ -z "${REPO_URL}" ]]; then
  echo "Error: -r <repo_url> is required."
  usage
  exit 1
fi

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' not found. Please install it first." >&2
    exit 1
  fi
}

echo "== Preflight checks =="
need_cmd git
need_cmd npm
need_cmd npx
echo "OK: git/npm/npx available."

echo "== Step 1: Create directory =="
mkdir -p "${DIR_NAME}"
cd "${DIR_NAME}"

echo "== Step 2: Fetch nextjs-start via giget =="
# If you see branch errors, verify that 'master' is the correct default branch for firebase/friendlyeats-web
npx giget@latest "${SOURCE_SPEC}" . --install

echo "== Step 3: Initialize git and make initial commit =="
if [ ! -d ".git" ]; then
  git init
fi
git add .
git commit -m "codelab starting point" || true
git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  echo "Origin remote already exists. Updating it to ${REPO_URL}"
  git remote set-url origin "${REPO_URL}"
else
  git remote add origin "${REPO_URL}"
fi

echo "Pushing to ${REPO_URL} ..."
git push -u origin main

echo "== Step 4: Ensure Firebase CLI >= ${MIN_FIREBASE_CLI} =="

ver_to_int() {
  # Convert semver x.y.z to integer xyyyzzz for easy numeric comparison
  awk -F. '{printf("%d%03d%03d\n", $1, $2, $3)}' <<<"$1"
}

ensure_firebase_cli() {
  local min="${MIN_FIREBASE_CLI}"
  local need_install=0

  if command -v firebase >/dev/null 2>&1; then
    local v
    v="$(firebase --version 2>/dev/null || true)"
    if [[ -z "${v}" ]]; then
      need_install=1
    else
      local v_int min_int
      v_int="$(ver_to_int "$v")"
      min_int="$(ver_to_int "$min")"
      if (( v_int < min_int )); then
        echo "Firebase CLI (${v}) < ${min}. Upgrading..."
        need_install=1
      else
        echo "Firebase CLI version OK: ${v}"
        return 0
      fi
    fi
  else
    need_install=1
  fi

  if (( need_install == 1 )); then
    echo "Installing/Upgrading firebase-tools@latest globally with npm..."
    if npm install -g firebase-tools@latest; then
      echo "Firebase CLI installed/updated."
    else
      echo "Global install failed (permissions?). Trying alternative approaches..."
      echo "You can either:"
      echo "  - Re-run with sudo (macOS/Linux): sudo npm install -g firebase-tools@latest"
      echo "  - Use a Node version manager (nvm) to avoid sudo"
      echo "  - Or run firebase via npx each time: npx firebase-tools@latest <command>"
      echo "Continuing with npx fallback..."
      alias firebase="npx firebase-tools@latest"
    fi
  fi
}

ensure_firebase_cli

echo "== Step 5: Login to Firebase (interactive) =="
# Standard interactive login (opens browser). If you're on headless/SSH, you can use --no-localhost
if firebase --version >/dev/null 2>&1; then
  firebase login || true
else
  npx firebase-tools@latest login || true
fi

echo ""
echo "All done! Next steps:"
echo "  - Your repo should now contain the nextjs-start code on 'main'."
echo "  - You are logged into Firebase CLI (if you completed browser auth)."
echo "  - Proceed with the codelab steps (configure Firebase project, emulators, deploy, etc.)."