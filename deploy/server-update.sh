#!/usr/bin/env bash
# Update the ZCZR site on the VPS from the Git checkout.
#
# Defaults match the current production server:
#   repository: /opt/zczr-drinkware-site
#   web root:   /var/www/zczr/current
#   web user:   nginx
#
# Override if needed:
#   APP_DIR=/opt/zczr-drinkware-site WEB_ROOT=/var/www/zczr/current ./deploy/server-update.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/opt/zczr-drinkware-site}"
WEB_ROOT="${WEB_ROOT:-/var/www/zczr/current}"
WEB_USER="${WEB_USER:-nginx}"
SERVICE_NAME="${SERVICE_NAME:-zczr-contact-api}"
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
fi

case "$WEB_ROOT" in
  /|/var|/var/www|/var/www/zczr)
    echo "Refusing to publish into ${WEB_ROOT}" >&2
    exit 1
    ;;
esac

cd "$APP_DIR"

echo "→ Pulling latest code"
git pull --ff-only

echo "→ Installing locked dependencies"
npm ci

echo "→ Building static site"
npm run build

echo "→ Publishing dist/ to ${WEB_ROOT}"
$SUDO install -d -o "$WEB_USER" -g "$WEB_USER" "$WEB_ROOT"
$SUDO find "$WEB_ROOT" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
$SUDO cp -a "$APP_DIR/dist/." "$WEB_ROOT/"
$SUDO chown -R "$WEB_USER:$WEB_USER" "$WEB_ROOT"

echo "→ Restarting contact API"
$SUDO systemctl restart "$SERVICE_NAME"
ready=0
for _ in $(seq 1 20); do
  if curl -fsS --max-time 2 http://127.0.0.1:8787/api/health >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 0.5
done
if [ "$ready" -ne 1 ]; then
  echo "Contact API did not become healthy" >&2
  $SUDO journalctl -u "$SERVICE_NAME" -n 30 --no-pager >&2 || true
  exit 1
fi

echo "→ Reloading Nginx"
$SUDO nginx -t
$SUDO systemctl reload nginx

echo "✓ Deployed. Test https://zczr.com.cn/ and https://zczr.com.cn/api/health"
