# portfolio-hub

`portfolio.cafitac.com` — 직접 만들고 운영 중인 프로젝트를 한 화면에서 보고 각 사이트로 넘어가는 허브.
빌드 단계 없는 정적 사이트(nginx)이고, 다른 프로젝트처럼 맥스튜디오에서 전용 Cloudflare 터널로 나간다.

```
site/
  index.html     레이아웃
  projects.js    프로젝트 목록 — 카드를 더하거나 고칠 때는 이 파일만 바꾼다
  app.js         목록으로 목차 · 카드를 그린다
  styles.css     라이트 · 다크, 820px 아래는 한 줄 카드
  shots/         각 사이트 화면 캡처(1280×800, JPEG)
deploy/
  deploy.sh      로컬에서 실행 — 동기화 후 remote.sh
  remote.sh      맥스튜디오 — 외장 SSD 로 복사, 터널 없으면 생성 · DNS 연결, compose up
  compose.yml    nginx(127.0.0.1:8796) + cloudflared
```

## 로컬 미리보기

```bash
python3 -m http.server 4180 -d site
```

## 배포 (homelab k8s)

2026-10-05 부터 [cafitac/homelab](https://github.com/cafitac/homelab) 의 k8s 클러스터에서 돈다(`apps/portfolio`).

```bash
git commit ...                 # 태그가 커밋을 가리킨다 — 커밋하지 않은 변경이 있으면 멈춘다
deploy/k8s-image.sh            # 맥스튜디오 k8s VM 에서 portfolio-hub:<커밋> 이미지를 만든다
# homelab/apps/portfolio/kustomization.yaml 의 newTag 를 바꾸고 kubectl apply -k apps/portfolio
```

이전 방식(`deploy/deploy.sh` — colima-judge 의 nginx + 전용 터널)은 옮긴 뒤 검증 기간 동안만 남겨 둔다. 롤백: `cloudflared tunnel route dns --overwrite-dns portfolio-hub portfolio.cafitac.com`.

처음 배포할 때 `portfolio-hub` 터널을 만들고 `portfolio.cafitac.com` CNAME 을 그 터널로 잇는다.
`*.cafitac.com` 와일드카드(preview-hub 터널)보다 지정 레코드가 먼저 적용된다.

## 프로젝트 추가 · 수정

1. `site/projects.js` 에 항목을 더한다(필드 설명은 파일 머리 주석).
2. 화면 캡처가 있으면 `site/shots/<id>.jpg` 로 넣는다(1280×800 권장).
3. `deploy/deploy.sh`.
