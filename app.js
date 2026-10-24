/* 画面の組み立て。中身の文章は data.js に書く */
(function () {
  const app = document.getElementById("app");
  const DEFAULT_COLOR = "#3DBA4E";

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );
  // data.js で {漢字|かんじ} と書くと、ふりがな付きで表示する
  const RUBY = /\{([^|{}]+)\|([^{}]+)\}/g;
  const plain = (s) => String(s ?? "").replace(RUBY, "$1");
  const rb = (s) => esc(s).replace(RUBY, "<ruby>$1<rt>$2</rt></ruby>");
  const br = (s) => rb(s).replace(/\n/g, "<br>");
  const ph = (text) => (SITE.showPlaceholders ? `<p class="ph">${esc(text)}</p>` : "");
  const teamName = (t) => t.name || `チーム${t.no}の作品`;
  // 作品名が入っていないチーム（または secret: true）は「COMING SOON」で中身を隠す
  const isOpen = (t) => !!t.name && !t.secret;
  // 「TEAM 2　サッカー」のような見出し
  const teamLabel = (t) => `TEAM ${t.no}${t.nickname ? `<span class="nick">${esc(t.nickname)}</span>` : ""}`;
  // 確認用プレビューのときだけ出す目印
  const previewBar = () => SITE.preview
    ? `<div class="preview-bar">確認用プレビュー（非公開）：公開サイトでは「非公開」の作品は COMING SOON になります</div>` : "";
  const privTag = (t) => (SITE.preview && !t.public ? `<span class="tag">非公開</span>` : "");

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

    const cards = TEAMS.map((t) => isOpen(t) ? `
      <li data-c="${esc(t.color)}">
        <a class="card" href="#${esc(t.id)}">
          <div class="card-art">
            ${t.icon ? `<img src="${esc(t.icon)}" alt="">` : mascot()}
          </div>
          <div class="card-body">
            <p class="team-no">${teamLabel(t)}${privTag(t)}</p>
            <h3 class="card-name">${rb(teamName(t))}</h3>
            <p class="more">くわしく見る<span aria-hidden="true"> →</span></p>
          </div>
        </a>
      </li>` : `
      <li data-c="${esc(t.color)}">
        <div class="card card-soon">
          <div class="card-art">${mascot()}<span class="soon-mark" aria-hidden="true">？</span></div>
          <div class="card-body">
            <p class="team-no">${teamLabel(t)}</p>
            <h3 class="card-name">COMING SOON</h3>
          </div>
        </div>
      </li>`).join("");

    app.innerHTML = previewBar() + `
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
            ${SITE.instagram && SITE.instagram.url ? `
            <a class="insta" href="${esc(SITE.instagram.url)}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor"/></svg>
              <span><span class="insta-label">公式 Instagram</span><span class="insta-name">${esc(SITE.instagram.name)}</span></span>
              <span class="insta-arrow" aria-hidden="true">↗</span>
            </a>` : ""}
          </div>
          <div class="hero-art">
            ${SITE.logo ? `<img class="logo" src="${esc(SITE.logo)}" alt="めっちゃE科メレオンのアイコン">` : mascot("cycle")}
          </div>
        </div>
      </header>
      ${SITE.about && SITE.about.text ? `
      <section class="wrap about" id="about">
        <h2 class="sec-title">${esc(SITE.about.title)}</h2>
        <div class="about-box">
          <p>${br(SITE.about.text)}</p>
          ${SITE.about.source ? `<p class="about-src">参考：<a href="${esc(SITE.about.source.url)}" target="_blank" rel="noopener noreferrer">${esc(SITE.about.source.label)}</a></p>` : ""}
        </div>
      </section>` : ""}
      <main class="wrap works" id="works">
        <h2 class="sec-title">${TEAMS.length}つの作品</h2>
        <ul class="cards">${cards}</ul>
      </main>
      ${SITE.booths && SITE.booths.length ? `
      <section class="wrap map-sec" id="map">
        <h2 class="sec-title">会場マップ</h2>
        <p class="map-lead">E科のブースを上から見た図です。ブースをタップすると、その作品の説明が見られます。</p>
        <div class="map-box">${buildMapSVG({ links: true })}</div>
      </section>` : ""}
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
    document.title = `${plain(teamName(t))}｜めっちゃE科メレオン`;
    const open = TEAMS.filter(isOpen);
    const i = open.indexOf(t);
    const prev = open[(i - 1 + open.length) % open.length];
    const next = open[(i + 1) % open.length];
    const tech = t.tech || {};

    const summary = t.summary ? `<p>${br(t.summary)}</p>` : ph("ここに作品の紹介文が入ります。");

    const play = t.play || {};
    const playInfo = [
      play.time && `<div><dt>時間</dt><dd>${esc(play.time)}</dd></div>`,
      play.players && `<div><dt>人数</dt><dd>${esc(play.players)}</dd></div>`,
      play.target && `<div><dt>対象</dt><dd>${esc(play.target)}</dd></div>`,
    ].filter(Boolean).join("");
    const howto =
      (playInfo ? `<dl class="play-info">${playInfo}</dl>` : "") +
      (t.howto.length
        ? `<ol class="steps">${t.howto.map((s) => `<li><span>${br(s)}</span></li>`).join("")}</ol>`
        : ph("ここに遊び方の手順が入ります。"));

    const chameleon = t.chameleon
      ? `<p>${br(t.chameleon)}</p>`
      : ph("ここにカメレオンポイント（作品のどこが「カメレオン」なのか）が入ります。");

    const points = t.points.length
      ? `<ul class="points">${t.points.map((s) => `<li>${br(s)}</li>`).join("")}</ul>`
      : ph("ここに見どころが入ります。");

    let techBody =
      (tech.text ? `<p>${br(tech.text)}</p>` : "") +
      (tech.parts && tech.parts.length
        ? `<h3 class="sub">使った部品・技術</h3><ul class="chips">${tech.parts.map((p) => `<li>${rb(p)}</li>`).join("")}</ul>`
        : "") +
      (tech.figure
        ? `<figure class="fig"><a href="${esc(tech.figure)}" target="_blank" rel="noopener"><img src="${esc(tech.figure)}" alt="${esc(plain(tech.figureCaption) || "仕組みの図")}"></a>${tech.figureCaption ? `<figcaption>${rb(tech.figureCaption)}（タップで拡大）</figcaption>` : ""}</figure>`
        : "");
    if (!techBody) techBody = ph("ここに仕組みの解説（回路図・使った部品・プログラムの流れなど）が入ります。");

    // ことばの解説：{ word: "{旋回手|せんかいしゅ}", desc: "説明" }
    const glossary = (t.glossary || []).length
      ? `<dl class="glossary">${t.glossary.map((g) => `<div><dt>${rb(g.word)}</dt><dd>${br(g.desc)}</dd></div>`).join("")}</dl>`
      : "";

    const media = t.media.length
      ? `<div class="gallery">${t.media.map(mediaItem).join("")}</div>`
      : ph("ここに写真や動画が入ります。");

    app.innerHTML = previewBar() + `
      <div class="detail">
        <header class="d-hero">
          <div class="wrap d-hero-inner">
            <a class="back" href="#works"><span aria-hidden="true">← </span>作品一覧</a>
            <p class="team-no">${teamLabel(t)}${privTag(t)}</p>
            <h1 class="d-title">${rb(teamName(t))}</h1>
            ${t.catch ? `<p class="d-catch">${rb(t.catch)}</p>` : ph("ここにキャッチコピーが入ります。")}
            <div class="d-visual">
              ${t.image ? `<img src="${esc(t.image)}" alt="${esc(plain(teamName(t)))}">` : mascot()}
            </div>
          </div>
        </header>
        <main class="wrap d-main">
          ${section("どんな作品？", summary)}
          ${section("あそびかた", howto)}
          ${section("見どころ", points)}
          ${section("カメレオンポイント", chameleon)}
          ${section("しくみ", techBody)}
          ${section("ことばの解説", glossary)}
          ${section("写真・動画", media)}
          ${SITE.booths && SITE.booths.some((b) => b.team === t.id) ? section("会場での場所", `<div class="map-box">${buildMapSVG({ links: true, highlight: t.id })}</div>`) : ""}
        </main>
        ${open.length > 1 ? `<nav class="wrap pager${prev === next ? " pager-one" : ""}" aria-label="ほかの作品">
          ${prev === next ? "" : `<a href="#${esc(prev.id)}" data-c="${esc(prev.color)}"><span class="pager-dir">← まえの作品</span><span class="pager-name">TEAM ${prev.no}　${esc(plain(teamName(prev)))}</span></a>`}
          <a href="#${esc(next.id)}" data-c="${esc(next.color)}"><span class="pager-dir">${prev === next ? "ほかの作品" : "つぎの作品"} →</span><span class="pager-name">TEAM ${next.no}　${esc(plain(teamName(next)))}</span></a>
        </nav>` : ""}
        ${footer()}
      </div>`;
    paint();
  }

  function renderSoon(t) {
    setColor(t.color);
    document.title = `TEAM ${t.no} ${t.nickname || ""}｜めっちゃE科メレオン`;
    app.innerHTML = previewBar() + `
      <div class="detail">
        <header class="d-hero">
          <div class="wrap d-hero-inner">
            <a class="back" href="#works"><span aria-hidden="true">← </span>作品一覧</a>
            <p class="team-no">${teamLabel(t)}</p>
            <h1 class="d-title">COMING SOON</h1>
            <p class="d-catch">この作品の紹介は準備中です。公開までお楽しみに！</p>
            <div class="d-visual soon-visual">${mascot()}<span class="soon-mark" aria-hidden="true">？</span></div>
          </div>
        </header>
        <div class="wrap soon-back"><a class="back" href="#works"><span aria-hidden="true">← </span>ほかの作品を見る</a></div>
        ${footer()}
      </div>`;
  }

  function mediaItem(m) {
    const cap = m.caption ? `<figcaption>${rb(m.caption)}</figcaption>` : "";
    if (m.type === "video")
      return `<figure><video src="${esc(m.src)}"${m.poster ? ` poster="${esc(m.poster)}"` : ""} controls playsinline preload="metadata"></video>${cap}</figure>`;
    if (m.type === "link")
      return `<a class="media-link" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.caption || "動画を見る")}<span aria-hidden="true"> ↗</span></a>`;
    return `<figure><img src="${esc(m.src)}" alt="${esc(plain(m.caption))}" loading="lazy">${cap}</figure>`;
  }

  function footer() {
    return `
      <footer class="foot">
        <div class="wrap">
          <p class="foot-title">めっちゃ<span class="e">E</span>科メレオン</p>
          <p><span class="nb">${esc(SITE.school)}</span>　<span class="nb">${esc(SITE.event)}</span></p>
        </div>
      </footer>`;
  }

  /* ---------- 画面の切りかえ（#team1 など） ---------- */
  function route() {
    const id = location.hash.replace(/^#/, "");
    const team = TEAMS.find((t) => t.id === id);
    if (team) {
      if (isOpen(team)) renderTeam(team);
      else renderSoon(team);
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
