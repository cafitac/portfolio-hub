// projects.js 의 목록으로 목차와 카드를 그린다.
(function () {
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const code = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const host = (u) => new URL(u).host;
  const arrow =
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const visual = (p) => {
    if (p.shot) {
      const img = `<img src="${esc(p.shot)}" alt="${esc(p.name)} 화면" loading="lazy" width="1280" height="800" />`;
      return p.url
        ? `<a class="shot" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="${esc(p.name)} 사이트 열기">${img}</a>`
        : `<div class="shot">${img}</div>`;
    }
    const steps = (p.diagram || [])
      .map((s, i) => `<li><span class="n">${i + 1}</span>${esc(s)}</li>`)
      .join("");
    return `<div class="shot flow" aria-label="${esc(p.name)} 동작 흐름"><ol>${steps}</ol></div>`;
  };

  const links = (p) =>
    [
      p.url && `<a class="btn primary" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(host(p.url))} ${arrow}</a>`,
      p.repo && `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">GitHub ${arrow}</a>`,
    ]
      .filter(Boolean)
      .join("");

  document.getElementById("index").innerHTML = window.PROJECTS.map(
    (p) => `<li><a href="#${esc(p.id)}">${esc(p.name)}</a></li>`,
  ).join("");

  document.getElementById("projects").innerHTML = window.PROJECTS.map(
    (p) => `
    <article class="card" id="${esc(p.id)}">
      ${visual(p)}
      <div class="body">
        <h2>${esc(p.name)}</h2>
        <p class="tagline">${esc(p.tagline)}</p>
        <p class="summary">${code(p.summary)}</p>
        <ul class="points">${p.highlights.map((h) => `<li>${code(h)}</li>`).join("")}</ul>
        <ul class="stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <div class="actions">${links(p)}</div>
        ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
      </div>
    </article>`,
  ).join("");
})();
