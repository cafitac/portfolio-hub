#!/usr/bin/env bash
# 맥스튜디오에서 도는 배포 후반부 — 사이트 파일을 외장 SSD 로 복사하고, 터널이 없으면 만든 뒤 compose 로 올린다.
set -euo pipefail
export PATH=$HOME/.local/bin:/opt/homebrew/bin:$PATH
# 도커 컨텍스트는 다른 작업이 바꿀 수 있다 — 외장 SSD 를 마운트하는 judge 프로필에 고정한다
export DOCKER_CONTEXT=${DOCKER_CONTEXT:-colima-judge}
cd ~/Project/portfolio-hub
export HUB_DATA_DIR=${HUB_DATA_DIR:-/Volumes/TradingData/portfolio-hub}
mkdir -p "$HUB_DATA_DIR"/{site,tunnel}

rsync -a --delete site/ "$HUB_DATA_DIR/site/"
cp deploy/nginx.conf "$HUB_DATA_DIR/nginx.conf"

# 터널 — 없으면 만들고 DNS 를 연결한다(다른 프로젝트 터널은 건드리지 않는다)
TID=$(cloudflared tunnel list 2>/dev/null | awk '$2=="portfolio-hub"{print $1}')
if [ -z "$TID" ]; then
  cloudflared tunnel create portfolio-hub
  TID=$(cloudflared tunnel list 2>/dev/null | awk '$2=="portfolio-hub"{print $1}')
  sed "s/TUNNEL_ID/$TID/g" deploy/cloudflared.yml > "$HUB_DATA_DIR/tunnel/config.yml"
  cloudflared --config "$HUB_DATA_DIR/tunnel/config.yml" tunnel route dns "$TID" portfolio.cafitac.com
fi
cp ~/.cloudflared/"$TID".json "$HUB_DATA_DIR/tunnel/"
# cloudflared 컨테이너는 root 가 아닌 사용자로 돈다 — 읽을 수 있게 연다(1인 사용 맥스튜디오 · 외장 SSD 안)
chmod 644 "$HUB_DATA_DIR/tunnel/$TID.json"
sed "s/TUNNEL_ID/$TID/g" deploy/cloudflared.yml > "$HUB_DATA_DIR/tunnel/config.yml"

docker compose -p portfolio-hub -f deploy/compose.yml up -d
for _ in $(seq 1 20); do
  curl -fsS -o /dev/null http://127.0.0.1:8796/ && { echo "portfolio-hub: 로컬 응답 확인"; exit 0; }
  sleep 1
done
echo "portfolio-hub: 로컬 응답 없음" >&2; exit 1
