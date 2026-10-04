#!/usr/bin/env bash
# homelab k8s 용 이미지를 만든다 — 로컬에서 실행한다. 저장소를 맥스튜디오로 보내고 k8s VM 의 docker 로 빌드한다.
#   deploy/k8s-image.sh            → portfolio-hub:<커밋> 이미지. 태그를 homelab/apps/portfolio 의 kustomization 에 적는다
# ⭐ k3s 가 같은 docker 런타임을 쓰므로 레지스트리 없이 그 이미지로 파드가 뜬다(imagePullPolicy: IfNotPresent).
# ⚠️ 커밋하지 않은 변경이 있으면 멈춘다 — 태그가 커밋을 가리켜야 무엇이 떠 있는지 안다
set -euo pipefail
HOST=${HOST:-trading-macstudio}
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"
[ -z "$(git status --porcelain)" ] || { echo "커밋하지 않은 변경이 있다" >&2; exit 1; }
TAG=$(git rev-parse --short=12 HEAD)
rsync -az --delete --exclude .git --exclude .DS_Store "$ROOT/" "$HOST:Project/portfolio-hub-build/"
ssh "$HOST" "export PATH=/opt/homebrew/bin:\$PATH; docker --context colima-k8s build -q -t portfolio-hub:$TAG ~/Project/portfolio-hub-build"
echo "portfolio-hub:$TAG"
