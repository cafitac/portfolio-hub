// projects.js 의 목록으로 목차와 카드를 그린다.
(function () {
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const code = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const host = (u) => new URL(u).host;
  const arrow =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // 실행 기록의 상태는 색만으로 구분하지 않는다 — 기호와 글자를 같이 쓴다
  const STATUS = { fail: ["✕", "실패"], pass: ["✓", "통과"], info: ["→", "진행"] };

  const visual = (p) => {
    if (!p.shot && !(p.record || []).length) return "";
    if (p.shot) {
      const img = `<img src="${esc(p.shot)}" alt="${esc(p.shotAlt || p.name + " 화면")}" loading="lazy" width="1280" height="800" />`;
      return p.url
        ? `<a class="shot" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} 사이트 열기">${img}</a>`
        : `<div class="shot">${img}</div>`;
    }
    const rows = (p.record || [])
      .map((r) => {
        const [mark, word] = STATUS[r.status] || STATUS.info;
        return `<li class="rec ${esc(r.status)}">
          <span class="mark" aria-hidden="true">${mark}</span>
          <div><strong><span class="sr">${word}: </span>${esc(r.title)}</strong><span>${esc(r.text)}</span></div>
        </li>`;
      })
      .join("");
    return `<div class="shot record"><p class="record-head">실제 실행 기록</p><ol>${rows}</ol></div>`;
  };

  const result = (r) => {
    if (!r) return "";
    const main = r.figures
      ? `<ul class="figures">${r.figures.map((f) => `<li><b>${esc(f.v)}</b><span>${esc(f.l)}</span></li>`).join("")}</ul>`
      : `<p class="delta"><span class="before">${esc(r.before)}</span><span class="to" aria-hidden="true">→</span><span class="sr">에서</span><span class="after">${esc(r.after)}</span>${
          r.gain ? `<span class="gain">${esc(r.gain)}</span>` : ""
        }</p>`;
    return `<div class="result">
      <p class="result-label">${esc(r.label)}</p>
      ${main}
      ${r.detail ? `<p class="result-detail">${esc(r.detail)}</p>` : ""}
      <p class="result-source">근거 · ${esc(r.source)}</p>
    </div>`;
  };

  const flow = (steps) =>
    steps && steps.length
      ? `<ol class="flow" aria-label="동작 흐름">${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`
      : "";

  const links = (p) =>
    [
      p.url && `<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(host(p.url))} ${arrow}</a>`,
      p.detail && `<a class="btn" href="${esc(p.detail.href)}">${esc(p.detail.label)}</a>`,
      ...(p.repos || []).map(
        (r) => `<a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener">GitHub · ${esc(r.label)} ${arrow}</a>`,
      ),
    ]
      .filter(Boolean)
      .join("");

  document.getElementById("index").innerHTML = window.PROJECTS.map(
    (p) => `<li><a href="#${esc(p.id)}">${esc(p.name)}</a></li>`,
  ).join("");

  document.getElementById("projects").innerHTML = window.PROJECTS.map(
    (p) => `
    <article class="card${p.shot || (p.record || []).length ? "" : " text-only"}" id="${esc(p.id)}">
      ${visual(p)}
      <div class="body">
        <h2>${esc(p.name)}</h2>
        <p class="tagline">${esc(p.tagline)}</p>
        ${result(p.result)}
        <p class="summary">${code(p.summary)}</p>
        ${flow(p.flow)}
        <ul class="points">${p.highlights.map((h) => `<li>${code(h)}</li>`).join("")}</ul>
        <ul class="stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <div class="actions">${links(p)}</div>
        ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
      </div>
    </article>`,
  ).join("");
})();
