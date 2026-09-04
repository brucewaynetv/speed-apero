#!/usr/bin/env bash
# Install / update Speed Apéro release on VPS (run as ubuntu with sudo)
set -euo pipefail

REMOTE_TAR="${1:?usage: remote-speed-apero-up.sh /tmp/speed-apero-xxx.tgz}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RELEASE_ROOT="/opt/speed-apero-releases"
RUNTIME_ROOT="/opt/speed-apero"
RELEASE="${RELEASE_ROOT}/${STAMP}"
CURRENT="${RUNTIME_ROOT}/current"
NGINX_SITE="/etc/nginx/sites-available/speed-apero"
PORT=3010

sudo mkdir -p "$RELEASE_ROOT" "$RUNTIME_ROOT" /var/www/certbot
sudo chown -R ubuntu:ubuntu "$RELEASE_ROOT" "$RUNTIME_ROOT"

echo "==> Extract release $STAMP"
mkdir -p "$RELEASE"
tar -xzf "$REMOTE_TAR" -C "$RELEASE"
rm -f "$REMOTE_TAR"

if [[ ! -f "$RELEASE/server.js" ]]; then
  echo "ERROR: server.js missing in release (standalone build required)"
  exit 1
fi

if [[ -f "${RUNTIME_ROOT}/.env" ]]; then
  cp -a "${RUNTIME_ROOT}/.env" "$RELEASE/.env"
elif [[ -f "$RELEASE/.env.deploy" ]]; then
  cp -a "$RELEASE/.env.deploy" "$RELEASE/.env"
  cp -a "$RELEASE/.env.deploy" "${RUNTIME_ROOT}/.env"
  chmod 600 "${RUNTIME_ROOT}/.env" "$RELEASE/.env"
fi

if [[ ! -f "$RELEASE/.env" ]]; then
  echo "WARN: no .env found"
fi

ln -sfn "$RELEASE" "$CURRENT"

if [[ -f "$RELEASE/ecosystem.config.cjs" ]]; then
  cp "$RELEASE/ecosystem.config.cjs" "${RUNTIME_ROOT}/ecosystem.config.cjs"
fi

cd "$CURRENT"
export PORT HOSTNAME=127.0.0.1 NODE_ENV=production
if pm2 describe speed-apero >/dev/null 2>&1; then
  pm2 restart speed-apero --update-env
else
  pm2 start "${RUNTIME_ROOT}/ecosystem.config.cjs"
fi
pm2 save

echo "==> Health check localhost:${PORT}"
ok=0
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS "http://127.0.0.1:${PORT}/demo" >/dev/null; then
    ok=1
    break
  fi
  sleep 2
done
if [[ "$ok" != "1" ]]; then
  echo "ERROR: app not healthy on :${PORT}"
  pm2 logs speed-apero --lines 40 --nostream || true
  exit 1
fi

echo "==> Nginx site"
if [[ -f "$RELEASE/deploy/nginx-speed-apero.conf" ]]; then
  CERT_DIR="/etc/letsencrypt/live/speed-apero.gothamdev.fr"
  if sudo test -f "${CERT_DIR}/fullchain.pem" && sudo test -f "${CERT_DIR}/privkey.pem"; then
    sudo install -m 0644 "$RELEASE/deploy/nginx-speed-apero.conf" "$NGINX_SITE"
    sudo ln -sfn "$NGINX_SITE" /etc/nginx/sites-enabled/speed-apero
    if sudo nginx -t; then
      sudo systemctl reload nginx
    else
      echo "ERROR: nginx -t failed after SSL config install"
      exit 1
    fi
  else
    echo "WARN: SSL cert missing for speed-apero.gothamdev.fr — keeping current nginx config"
    echo "      Run: sudo certbot --nginx -d speed-apero.gothamdev.fr"
  fi
fi

cd "$RELEASE_ROOT"
ls -1dt */ 2>/dev/null | tail -n +6 | xargs -r rm -rf

echo "DEPLOY_OK speed-apero port=${PORT} release=${STAMP}"
