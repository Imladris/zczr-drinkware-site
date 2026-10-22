#!/usr/bin/env bash
# Deploy the built static site to a VPS running Nginx.
#
# Required environment variables:
#   VPS_HOST=203.0.113.42
#   VPS_USER=deploy
#
# Optional:
#   VPS_PATH=/var/www/zczr/current
#
# Usage:
#   VPS_HOST=203.0.113.42 VPS_USER=deploy ./deploy/deploy.sh
#
# The target user needs write access to VPS_PATH and passwordless sudo for
# `nginx -t` and `systemctl reload nginx` (or run the reload step manually).

set -euo pipefail

: "${VPS_HOST:?Set VPS_HOST to your server IP or hostname}"
: "${VPS_USER:?Set VPS_USER to the deploy user}"
VPS_PATH="${VPS_PATH:-/var/www/zczr/current}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "→ Installing locked dependencies"
npm ci

echo "→ Building static site"
npm run build

echo "→ Syncing dist/ to ${VPS_USER}@${VPS_HOST}:${VPS_PATH}"
# --delete removes files from previous releases that no longer exist.
# Make sure VPS_PATH is a dedicated site directory before using this.
rsync -az --delete --human-readable \
  --exclude '.DS_Store' \
  dist/ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

echo "→ Reloading Nginx"
ssh "${VPS_USER}@${VPS_HOST}" "sudo nginx -t && sudo systemctl reload nginx"

echo "✓ Deployed. Open https://zczr.example.com/"
