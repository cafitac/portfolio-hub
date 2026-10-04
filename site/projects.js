// 포트폴리오에 올리는 프로젝트 목록. 카드 순서 = 배열 순서.
// 프로젝트를 더하거나 고칠 때는 이 파일만 바꾸고 deploy/deploy.sh 로 다시 올린다.
//   url     공개 사이트(없으면 null — 카드에 "사이트 없음" 대신 저장소 링크만 보인다)
//   repo    공개 저장소(비공개면 null)
//   shot    shots/ 아래 화면 캡처(없으면 null — 대신 diagram 을 그린다)
//   note    방문자가 알아야 할 한 줄(로그인 필요 등)
window.PROJECTS = [
  {
    id: "interview",
    name: "Interview Coach",
    tagline: "회사 · 전형 단계별로 개인화되는 AI 모의 면접",
    summary:
      "지원한 회사의 공고 · 기술 블로그 · 내 이력서와 과제를 근거로 면접관 패널을 만들고, 음성으로 면접을 진행한 뒤 채점 · 약점 보강 · 성장 추이까지 이어지는 준비 서비스.",
    highlights: [
      "면접관 하네스: 모델은 다음 발화를 제안만 하고, 꼬리 질문 깊이(사실 → 이유 → 대안 → 한계 → 원리)와 라우팅은 코드 정책이 강제",
      "RAG 를 독립 서비스로 분리 — 로컬 임베딩(Qwen3-Embedding) + pgvector 하이브리드 검색",
      "블라인드 서류 평가를 과거 지원 결과로 백테스트해 합격 신호 기준을 보정",
    ],
    stack: ["Kotlin", "Spring Boot", "PostgreSQL · pgvector", "Python", "Next.js", "Claude"],
    url: "https://interview.cafitac.com",
    repo: null,
    shot: "shots/interview.jpg",
    note: "초대 코드가 있어야 가입할 수 있어요",
  },
  {
    id: "gather",
    name: "채점판 (judge-board)",
    tagline: "실습 문제를 실제로 돌려 채점하는 백엔드 스터디 채점판",
    summary:
      "참가자가 고친 코드를 도커 샌드박스에서 실제로 돌리고, 처리량 · 지연 · 장애 복구 같은 조건을 측정해 순위를 매긴다. 숭실대 백엔드 스터디에서 시작했다.",
    highlights: [
      "판정(규칙 · 배점)은 채점판, 측정은 실행기 — HTTP 계약으로만 붙여 실행기를 늘리거나 바꿔도 채점판은 그대로",
      "참가자 로컬과 서버가 같은 채점기를 써서 \"로컬은 통과, 서버는 실패\" 를 없앰",
      "한 판 5.5코어 고정 · 공식 채점 2줄 상한 · 일감마다 빈 포트 할당으로 동시 실행 간섭 차단",
    ],
    stack: ["Kotlin", "Spring Boot", "PostgreSQL", "Python", "Docker", "Next.js"],
    url: "https://gather.cafitac.com",
    repo: null,
    shot: "shots/gather.jpg",
    note: null,
  },
  {
    id: "threads",
    name: "thread-example",
    tagline: "장애를 먼저 재현하고 숫자로 고치는 스레드형 커뮤니티 백엔드",
    summary:
      "트래픽 봇으로 실제 부하를 걸고, 병목을 재현한 뒤 측정 근거로 개선한다. 결정마다 ADR 을 남기고 운영 콘솔에서 동시 접속 · 처리량 · 지연을 실시간으로 본다.",
    highlights: [
      "결정 기록 23건 — 커서 페이지네이션, 멱등성 키, 게이트웨이 연결 수, 2코어 · 4GB 앱 사양 등",
      "트래픽 생성기 · Prometheus · Grafana · cAdvisor 로 부하 실험 프로토콜을 고정",
      "운영 콘솔에서 동시 접속 단계 · 푸시 알림 · 바이럴 상황을 직접 걸어 볼 수 있음",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Nginx", "Prometheus", "Grafana"],
    url: "https://threads.cafitac.com",
    repo: null,
    shot: "shots/threads.jpg",
    note: null,
  },
  {
    id: "puri",
    name: "puri",
    tagline: "펜으로 풀고 풀이 과정을 AI 와 함께 검토하는 수학 풀이 워크스페이스",
    summary:
      "답만 입력하는 문제 풀이가 아니라, 압력 필기 캔버스에 남긴 풀이 과정 전체를 AI 가 판독 · 채점하고 다음 학습 단계를 제안한다.",
    highlights: [
      "Pointer Events 기반 압력 필기 · 700ms 자동 저장 · 제출 후 읽기 전용 보관",
      "버전이 고정된 문제 카탈로그 — 문제집이 개정돼도 이미 제출한 풀이의 채점 기준은 그대로",
      "Gemini · OpenAI 호환 provider 를 골라 쓰는 풀이 판독 · LaTeX 변환",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL", "Canvas API"],
    url: "https://puri-dev.cafitac.com",
    repo: null,
    shot: "shots/puri.jpg",
    note: null,
  },
  {
    id: "preview-hub",
    name: "preview-hub",
    tagline: "브랜치 · PR 단위로 여러 저장소를 묶어 띄우는 프리뷰 환경",
    summary:
      "`phub up feat-x --set backend=pr-4` 한 줄로 백엔드 · 프런트 · 알림 서비스를 정확한 커밋에 고정해 띄우고, 환경마다 고유 서브도메인을 붙인다.",
    highlights: [
      "PR 참조는 열린 PR 의 현재 head 커밋에 고정 — 업데이트할 때 다시 해석",
      "SQLite 레지스트리 · 수명 주기 오케스트레이션 · TTL 과 GC, 디스크 여유 공간 가드",
      "Traefik + Cloudflare Tunnel 와일드카드로 환경별 주소, Cloudflare Access 로 보호",
    ],
    stack: ["Python 3.12", "Docker Compose", "Traefik", "Cloudflare Tunnel", "JSON Schema"],
    url: null,
    repo: "https://github.com/cafitac/preview-hub",
    shot: null,
    diagram: ["phub up feat-x", "커밋 고정 체크아웃", "Compose 기동 · 헬스 체크", "phub-feat-x.cafitac.com"],
    note: "운영 화면은 접근 제한이라 저장소로 안내해요",
  },
  {
    id: "ai-qa",
    name: "ai-qa",
    tagline: "프리뷰 환경 위에서 AI 가 시나리오대로 E2E 검증을 돌리는 러너",
    summary:
      "서비스 저장소에 자연어 시나리오(YAML)를 두면, Claude Code 가 범위가 제한된 Playwright 세션으로 preview-hub 환경을 직접 조작해 기대 결과를 확인하고 증거를 남긴다.",
    highlights: [
      "시나리오 문장은 데이터로 격리 — 도구 · 접근 오리진 · 예산 · 출력 형식을 바꿀 수 없음",
      "Playwright MCP 버전 고정, Access 세션은 정확한 호스트의 쿠키만 0600 으로 보관",
      "가짜 에이전트 결과는 개발용 픽스처일 뿐 QA 증거로 치지 않는 규칙",
    ],
    stack: ["Python 3.12", "Claude Code", "Playwright MCP", "uv"],
    url: null,
    repo: "https://github.com/cafitac/ai-qa",
    shot: null,
    diagram: ["qa/scenarios.yaml", "Claude Code + Playwright", "preview-hub 환경", "통과 · 실패 · 증거"],
    note: null,
  },
];
