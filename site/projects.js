// 포트폴리오에 올리는 프로젝트 목록. 카드 순서 = 배열 순서(근거 숫자가 강한 것부터).
// 프로젝트를 더하거나 고칠 때는 이 파일만 바꾸고 README 의 배포 순서대로 다시 올린다.
//   result  카드 맨 위 결과 한 줄 — 측정한 숫자만. before/after(+gain) 이거나 figures 목록, source 는 근거 위치
//   flow    써 보지 않은 사람이 읽는 "한 번 쓰면 이렇게 된다" 4단계
//   url     공개 사이트(없으면 null — 저장소 링크만 보인다)
//   repos   공개 저장소 목록(비공개면 빈 배열)
//   shot    shots/ 아래 화면 캡처. 없으면 record(실제 실행 기록)를 그린다
//   detail  기술 노트 같은 상세 페이지(있으면 버튼으로)
//   note    방문자가 알아야 할 한 줄(로그인 필요, 수치의 성격 등)
window.PROJECTS = [
  {
    id: "threads",
    name: "thread-example",
    tagline: "장애를 먼저 재현하고 숫자로 고치는 스레드형 커뮤니티 백엔드",
    result: {
      label: "개인 피드 첫 페이지 응답",
      before: "16.8ms",
      after: "0.10ms",
      gain: "163배",
      detail: "같은 서버에서 버티는 동시 접속 1만 → 3만 명",
      source: "결정 기록 0022",
    },
    summary:
      "합성 트래픽 봇으로 수만 명 동시 접속을 걸어 병목을 재현하고, 원인 → 선택지 → 결정 → 전후 숫자를 결정 기록 37건에 남긴다. 앱 서버는 2코어 · 4GB 로 고정해 하드웨어로 덮지 않는다.",
    flow: ["봇으로 동시 접속 단계 올리기", "처리량이 꺾이는 지점 찾기", "대조 실험으로 원인 확인", "고친 뒤 같은 조건으로 재측정"],
    highlights: [
      "첫 장애: 목록 조회만 다른 행동으로 바꾼 대조 실험으로 원인을 확인한 뒤 커서 페이지네이션으로 해결 — 다음 페이지 쿼리 0.105ms → 0.030ms",
      "커넥션 풀 크기를 공식이 아니라 측정으로 결정 — 공식값 4는 p95 73ms, 20은 16ms, 40은 10초로 무너짐",
      "좋아요 수 갱신을 원장 + 비동기 집계로 바꿔 그 일에 쓰던 DB 시간 비중 40.3% → 4.4%, gateway 연결 한도 7,071 → 36,052 까지 거절 없이",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Nginx", "Prometheus", "Grafana", "Kubernetes"],
    url: "https://threads.cafitac.com",
    repos: [],
    shot: "shots/threads.jpg?v=2",
    note: "수치는 합성 부하 실험에서 잰 값이에요. 실제 사용자 트래픽이 아니에요",
  },
  {
    id: "interview",
    name: "Interview Coach",
    tagline: "회사 · 전형 단계별로 개인화되는 AI 모의 면접",
    result: {
      label: "질문 근거 검색 정확도(MRR, 평가 세트)",
      before: "0.81",
      after: "0.88",
      detail: "상위 3개 안에 정답 84.6% → 92.3%",
      source: "검색 질의 확장 실험",
    },
    summary:
      "지원한 회사의 공고 · 기술 블로그 · 내 이력서와 과제를 근거로 면접관 패널을 만들고, 음성으로 면접을 본 뒤 질문마다 좋았던 점 · 보완할 점 · 다음 답 예시를 돌려준다. 확인된 약점은 쌓아 두었다가 다음 면접에서 다시 묻는다.",
    flow: ["공고 · 이력서 등록", "면접관 패널이 음성으로 질문", "꼬리 질문으로 깊이 파기", "리포트 · 약점을 다음 면접으로"],
    highlights: [
      "서버가 멈추던 장애를 스레드 덤프로 추적 — JDK 21 가상 스레드가 synchronized 잠금에 캐리어 2개를 모두 붙잡힌 pinning, JDK 25(JEP 491)로 올려 해결",
      "느린 LLM 작업 8종 이상을 공통 비동기 작업 실행기 하나로 모으고, 탭마다 기다리는 것을 SSE 연결 하나로 받는다(끊기면 폴링으로)",
      "면접관 하네스: 모델은 다음 발화를 제안만 하고, 꼬리 질문 깊이(사실 → 이유 → 대안 → 한계 → 원리)와 라우팅은 코드 정책이 강제",
    ],
    stack: ["Kotlin", "Spring Boot", "PostgreSQL · pgvector", "Python", "Next.js", "Swift(iOS)", "Claude"],
    url: "https://interview.cafitac.com",
    detail: { href: "interview-coach.html", label: "기술 자세히 보기" },
    repos: [],
    shot: "shots/interview.jpg?v=2",
    shotAlt: "과제 리뷰 면접 화면 — 질문, 깊이 2/5, 좋았던 점 · 보완할 점 · 이렇게 말하면 돼요",
    note: "초대 코드가 있어야 가입할 수 있어요. 화면은 과제 리뷰 면접의 피드백이에요",
  },
  {
    id: "gather",
    name: "채점판 (judge-board)",
    tagline: "실습 문제를 실제로 돌려 채점하는 백엔드 스터디 채점판",
    result: {
      label: "문제 예 — 외부 발송 한도 안에서 대량 발송",
      figures: [
        { v: "50건/초", l: "문자 공급자 한도" },
        { v: "8만 건", l: "30분 안에 보낼 양" },
        { v: "여유 6%", l: "평균 47건/초 필요" },
      ],
      source: "스터디 1회차 문제",
    },
    summary:
      "참가자가 고친 코드를 도커 샌드박스에서 실제로 돌리고, 처리량 · 지연 · 장애 복구 같은 조건을 재서 통과 여부와 순위를 매긴다. 숭실대 백엔드 스터디에서 시작했다.",
    flow: ["문제의 코드를 고쳐 제출", "도커에서 실제 실행", "처리량 · 지연 · 복구 측정", "기준과 비교해 판정 · 순위"],
    highlights: [
      "판정(규칙 · 배점)은 채점판, 측정은 실행기 — HTTP 계약으로만 붙여 실행기를 늘리거나 바꿔도 채점판은 그대로. 로컬과 서버 판정이 같은지 테스트로 확인",
      "한 판 5.5코어 고정 · 공식 채점 2줄 상한 · 일감마다 빈 포트 할당으로 동시 실행 간섭 차단",
      "운영 중 보강: Spring Boot 패치로 알려진 취약점 14 → 0, 로그인 세션 고정 수정 · IP별 잠금, 시나리오별 기준값과 발제자 재판정",
    ],
    stack: ["Kotlin", "Spring Boot", "PostgreSQL", "Python", "Docker", "Next.js"],
    url: "https://gather.cafitac.com",
    repos: [],
    shot: "shots/gather.jpg",
    shotAlt: "채점판 문제 화면 — 30분 안에 8만 건, 공급자는 초당 50건",
    note: null,
  },
  {
    id: "preview-qa",
    name: "preview-hub + ai-qa",
    tagline: "PR 마다 격리 환경을 띄우고, 그 위에서 AI 가 직접 눌러 보며 검증하는 파이프라인",
    result: {
      label: "Kubernetes 전환 때 AI QA 시나리오 — 실제 버그를 잡고 고친 뒤",
      before: "실패 2/2",
      after: "통과 2/2",
      detail: "재실행 70초 · preview-hub 테스트 714개 통과",
      source: "전환 기록 K5 · ai-qa 실행 기록",
    },
    summary:
      "`phub up feat-x --set backend=pr-4` 한 줄로 백엔드 · 프런트 · 알림 서비스를 정확한 커밋에 고정해 환경을 띄우고, ai-qa 가 그 환경에서 자연어 시나리오대로 Claude Code + Playwright 를 돌려 통과 · 실패와 스크린샷 · 로그를 남긴다.",
    flow: ["PR 지정해 환경 띄우기", "환경마다 고유 주소", "AI 가 시나리오대로 조작", "통과 · 실패 · 증거 보관"],
    highlights: [
      "단위 테스트와 dry-run 은 통과했지만 AI QA 가 실패를 잡음 — Service 선택자가 같은 서비스의 postgres 파드까지 골라 요청 일부가 DB 로 갔다. 선택자 겹침을 테스트로 만들어 재발을 막음",
      "환경 하나 = Kubernetes namespace 하나. PR 참조는 열린 PR 의 현재 head 커밋에 고정, TTL · GC · 디스크 여유 공간 가드",
      "시나리오 문장은 데이터로 격리해 도구 · 접근 주소 · 예산을 바꿀 수 없고, 합성 샘플 결과는 QA 증거로 치지 않는다",
    ],
    stack: ["Python 3.12", "Kubernetes", "Docker", "Traefik", "Cloudflare Tunnel · Access", "Claude Code", "Playwright MCP"],
    url: null,
    repos: [
      { label: "preview-hub", url: "https://github.com/cafitac/preview-hub" },
      { label: "ai-qa", url: "https://github.com/cafitac/ai-qa" },
    ],
    shot: null,
    record: [
      { status: "fail", title: "첫 실행 — 시나리오 2개 실패", text: "화면은 뜨지만 목록이 비고, 새 메모 저장을 확인하지 못함" },
      { status: "info", title: "원인", text: "Service 선택자가 env · service 라벨만 봐서 postgres · init 파드까지 고름" },
      { status: "info", title: "수정 #20", text: "선택자에 역할 라벨 추가, 「선택자 하나 = 워크로드 하나」 테스트" },
      { status: "pass", title: "재실행 — 시나리오 2개 통과", text: "70초, 스크린샷 · 콘솔 로그 · 에이전트 기록 보존" },
    ],
    note: "운영 화면은 접근 제한이라 저장소로 안내해요",
  },
];
