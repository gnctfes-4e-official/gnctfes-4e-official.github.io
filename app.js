/* 画面の組み立て。中身の文章は data.js に書く */
(function () {
  const app = document.getElementById("app");
  const DEFAULT_COLOR = "#3DBA4E";

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  const br = (s) => esc(s).replace(/\n/g, "<br>");
  const ph = (text) => (SITE.showPlaceholders ? `<p class="ph">${esc(text)}</p>` : "");
  const teamName = (t) => t.name || `チーム${t.no}の作品`;

  // カメレオン（体の色は currentColor、舌は電気）
  const mascot = (cls = "") => `
    <svg class="mascot ${cls}" viewBox="0 0 132 96" aria-hidden="true">
      <path d="M4 86 Q66 79 128 86" fill="none" stroke="#7A4E2A" stroke-width="6" stroke-linecap="round"/>
      <path d="M34 66 C18 70 10 58 14 48 C18 38 32 38 34 48 C36 56 26 58 24 51" fill="none" stroke="var(--ink)" stroke-width="13" stroke-linecap="round"/>
      <path d="M34 66 C18 70 10 58 14 48 C18 38 32 38 34 48 C36 56 26 58 24 51" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
      <path d="M46 68 L42 84 M78 68 L82 84" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
      <path d="M30 62 C32 40 62 30 84 38 L92 40 C104 42 114 52 112 60 C110 68 98 72 84 70 L40 72 C34 72 30 68 30 62 Z" fill="currentColor" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M44 41 L49 33 L54 38 L60 30 L65 36 L71 29 L75 36" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M40 64 C55 67 75 67 92 62" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/>
      <circle cx="52" cy="52" r="4" fill="#fff" fill-opacity=".4"/>
      <circle cx="65" cy="47" r="3" fill="#fff" fill-opacity=".4"/>
      <circle cx="72" cy="57" r="3.5" fill="#fff" fill-opacity=".4"/>
      <circle cx="96" cy="50" r="9" fill="currentColor" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="98" cy="50" r="3.5" fill="var(--ink)"/>
      <path d="M103 63 Q107 63 110 60" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M110 60 L118 57 L114 54 L126 48" fill="none" stroke="var(--volt-deep)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;

  // data-c のチーム色を反映する（style 属性を使わないのは CSP で禁止しているため）
  function paint() {
    app.querySelectorAll("[data-c]").forEach((el) => el.style.setProperty("--c", el.dataset.c));
  }

  function setColor(color) {
    document.documentElement.style.setProperty("--c", color || DEFAULT_COLOR);
  }

  /* ---------- トップページ ---------- */
  function renderHome() {
    setColor(DEFAULT_COLOR);
    document.title = "めっちゃE科メレオン";

    const info = [
      SITE.date && `<div><dt>日時</dt><dd>${esc(SITE.date)}</dd></div>`,
      SITE.place && `<div><dt>場所</dt><dd>${esc(SITE.place)}</dd></div>`,
    ].filter(Boolean).join("");

    const cards = TEAMS.map((t) => `
      <li data-c="${esc(t.color)}">
        <a class="card" href="#${esc(t.id)}">
          <div class="card-art">
            ${t.icon ? `<img src="${esc(t.icon)}" alt="">` : mascot()}
          </div>
          <div class="card-body">
            <p class="team-no">TEAM ${t.no}</p>
            <h3 class="card-name">${esc(teamName(t))}</h3>
            ${t.catch ? `<p class="card-catch">${esc(t.catch)}</p>` : ""}
            <p class="more">くわしく見る<span aria-hidden="true"> →</span></p>
          </div>
        </a>
      </li>`).join("");

    app.innerHTML = `
      <header class="hero">
        <div class="wrap hero-inner">
          <div class="hero-text">
            <p class="eyebrow">${esc(SITE.school)}<br>${esc(SITE.event)}</p>
            <h1 class="title">
              <span class="t-small">めっちゃ</span>
              <span class="t-big"><span class="e">E</span>科メレオン</span>
            </h1>
            <p class="lead">${br(SITE.intro)}</p>
            ${info ? `<dl class="info">${info}</dl>` : ""}
          </div>
          <div class="hero-art">
            ${SITE.logo ? `<img class="logo" src="${esc(SITE.logo)}" alt="めっちゃE科メレオンのアイコン">` : mascot("cycle")}
          </div>
        </div>
      </header>
      <main class="wrap works" id="works">
        <h2 class="sec-title">${TEAMS.length}つの作品</h2>
        <ul class="cards">${cards}</ul>
      </main>
      ${footer()}`;
    paint();

    // アイコン画像がまだ無いときはカメレオンの絵に差しかえる
    const logo = app.querySelector(".logo");
    if (logo) {
      const fallback = () => { logo.outerHTML = mascot("cycle"); };
      if (logo.complete && logo.naturalWidth === 0) fallback();
      else logo.addEventListener("error", fallback);
    }
  }

  /* ---------- 作品ページ ---------- */
  function section(title, body) {
    return body ? `<section class="panel"><h2>${title}</h2>${body}</section>` : "";
  }

  function renderTeam(t) {
    setColor(t.color);
    document.title = `${teamName(t)}｜めっちゃE科メレオン`;
    const i = TEAMS.indexOf(t);
    const prev = TEAMS[(i - 1 + TEAMS.length) % TEAMS.length];
    const next = TEAMS[(i + 1) % TEAMS.length];
    const tech = t.tech || {};

    const summary = t.summary ? `<p>${br(t.summary)}</p>` : ph("ここに作品の紹介文が入ります。");

    const howto = t.howto.length
      ? `<ol class="steps">${t.howto.map((s) => `<li>${br(s)}</li>`).join("")}</ol>`
      : ph("ここに遊び方の手順が入ります。");

    const points = t.points.length
      ? `<ul class="points">${t.points.map((s) => `<li>${br(s)}</li>`).join("")}</ul>`
      : ph("ここに見どころが入ります。");

    let techBody =
      (tech.text ? `<p>${br(tech.text)}</p>` : "") +
      (tech.parts && tech.parts.length
        ? `<h3 class="sub">使った部品・技術</h3><ul class="chips">${tech.parts.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`
        : "") +
      (tech.figure
        ? `<figure class="fig"><img src="${esc(tech.figure)}" alt="${esc(tech.figureCaption || "仕組みの図")}">${tech.figureCaption ? `<figcaption>${esc(tech.figureCaption)}</figcaption>` : ""}</figure>`
        : "");
    if (!techBody) techBody = ph("ここに仕組みの解説（回路図・使った部品・プログラムの流れなど）が入ります。");

    const media = t.media.length
      ? `<div class="gallery">${t.media.map(mediaItem).join("")}</div>`
      : ph("ここに写真や動画が入ります。");

    app.innerHTML = `
      <div class="detail">
        <header class="d-hero">
          <div class="wrap d-hero-inner">
            <a class="back" href="#works"><span aria-hidden="true">← </span>作品一覧</a>
            <p class="team-no">TEAM ${t.no}</p>
            <h1 class="d-title">${esc(teamName(t))}</h1>
            ${t.catch ? `<p class="d-catch">${esc(t.catch)}</p>` : ph("ここにキャッチコピーが入ります。")}
            <div class="d-visual">
              ${t.image ? `<img src="${esc(t.image)}" alt="${esc(teamName(t))}">` : mascot()}
            </div>
          </div>
        </header>
        <main class="wrap d-main">
          ${section("どんな作品？", summary)}
          ${section("あそびかた", howto)}
          ${section("見どころ", points)}
          ${section("しくみ", techBody)}
          ${section("写真・動画", media)}
        </main>
        <nav class="wrap pager" aria-label="ほかの作品">
          <a href="#${esc(prev.id)}" data-c="${esc(prev.color)}"><span class="pager-dir">← まえの作品</span><span class="pager-name">TEAM ${prev.no}　${esc(teamName(prev))}</span></a>
          <a href="#${esc(next.id)}" data-c="${esc(next.color)}"><span class="pager-dir">つぎの作品 →</span><span class="pager-name">TEAM ${next.no}　${esc(teamName(next))}</span></a>
        </nav>
        ${footer()}
      </div>`;
    paint();
  }

  function mediaItem(m) {
    const cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
    if (m.type === "video")
      return `<figure><video src="${esc(m.src)}" controls playsinline preload="metadata"></video>${cap}</figure>`;
    if (m.type === "link")
      return `<a class="media-link" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.caption || "動画を見る")}<span aria-hidden="true"> ↗</span></a>`;
    return `<figure><img src="${esc(m.src)}" alt="${esc(m.caption || "")}" loading="lazy">${cap}</figure>`;
  }

  function footer() {
    return `
      <footer class="foot">
        <div class="wrap">
          <p class="foot-title">めっちゃ<span class="e">E</span>科メレオン</p>
          <p>${esc(SITE.school)}　${esc(SITE.event)}</p>
        </div>
      </footer>`;
  }

  /* ---------- 画面の切りかえ（#team1 など） ---------- */
  function route() {
    const id = location.hash.replace(/^#/, "");
    const team = TEAMS.find((t) => t.id === id);
    if (team) {
      renderTeam(team);
      window.scrollTo(0, 0);
    } else {
      renderHome();
      if (id === "works") document.getElementById("works").scrollIntoView();
      else window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
