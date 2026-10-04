#!/usr/bin/env bash
# 맥스튜디오에 배포한다 — 저장소를 동기화한 뒤 ssh 로 deploy/remote.sh 를 실행한다.
#   deploy/deploy.sh            (이 저장소 루트에서)
set -euo pipefail
HOST=${HOST:-trading-macstudio}
ROOT=$(cd "$(dirname "$0")/.." && pwd)
REMOTE=Project/portfolio-hub

rsync -az --delete --exclude .git --exclude .DS_Store "$ROOT/" "$HOST:$REMOTE/"
ssh "$HOST" "bash ~/$REMOTE/deploy/remote.sh < /dev/null"
