#!/usr/bin/env bash
# Run this on the VPS after the first installation.
#
# It pulls the Git repository, installs dependencies, builds the Astro site,
# copies dist/ to the Nginx web root, restarts the contact API, and reloads Nginx.
#
# Defaults assume:
#   repository: /var/www/zczr
#   web root:   /var/www/zczr/current
#
# Override with:
#   APP_DIR=/var/www/zczr WEB_ROOT=/var/www/zczr/current ./deploy/server-update.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/zczr}"
WEB_ROOT="${WEB_ROOT:-/var/www/zczr/current}"
SERVICE_NAME="${SERVICE_NAME:-zczr-contact-api}"

cd "$APP_DIR"

echo "→ Pulling latest code"
git pull --ff-only

echo "→ Installing locked dependencies"
npm ci

echo "→ Building static site"
npm run build

echo "→ Publishing dist/ to ${WEB_ROOT}"
sudo install -d -o www-data -g www-data "$WEB_ROOT"
sudo rsync -a --delete --chown=www-data:www-data "$APP_DIR/dist/" "$WEB_ROOT/"

echo "→ Restarting contact API"
sudo systemctl restart "$SERVICE_NAME"
curl -fsS --max-time 5 http://127.0.0.1:8787/api/health >/dev/null

echo "→ Reloading Nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "✓ Deployed. Test https://zczr.com.cn/ and /api/health"
