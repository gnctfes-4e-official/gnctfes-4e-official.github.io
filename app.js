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
          <div class="card-art">${t.icon ? `<img src="${esc(t.icon)}" alt="">` : `${mascot()}<span class="soon-mark" aria-hidden="true">？</span>`}</div>
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
              <span class="t-big"><span class="e" id="secret-e">E</span>科メレオン</span>
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
            ${SITE.logo ? (SITE.department && SITE.department.url
              ? `<a class="logo-link" href="${esc(SITE.department.url)}" target="_blank" rel="noopener noreferrer">
                  <img class="logo" src="${esc(SITE.logo)}" alt="${esc(SITE.department.name)}のサイトを開く">
                </a>`
              : `<img class="logo" src="${esc(SITE.logo)}" alt="めっちゃE科メレオンのアイコン">`) : mascot("cycle")}
          </div>
        </div>
      </header>
      ${quickNav()}
      ${aboutSection()}
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
      ${voteSection()}
      ${footer()}`;
    paint();
    initVote();

    // アイコン画像がまだ無いときはカメレオンの絵に差しかえる
    const logo = app.querySelector(".logo");
    if (logo) {
      const fallback = () => { logo.outerHTML = mascot("cycle"); };
      if (logo.complete && logo.naturalWidth === 0) fallback();
      else logo.addEventListener("error", fallback);
    }
  }

  /* ---------- トップの「すぐ移動」ボタン ---------- */
  function quickNav() {
    const items = [
      SITE.about && SITE.about.steps && ["about", "めっちゃカメレオンとは"],
      ["works", "作品"],
      SITE.booths && SITE.booths.length && ["map", "会場マップ"],
      voteOn() && ["vote", "投票"],
    ].filter(Boolean);
    return `<nav class="wrap quick" aria-label="ページ内の移動">${items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav>`;
  }

  /* ---------- 「めっちゃカメレオン」ってどんなゲーム？ ---------- */
  const ABOUT_ICONS = {
    // 真っ白な体に絵をかく
    paint: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="27" cy="15" r="9" fill="#fff" stroke="#15331F" stroke-width="3"/><rect x="15" y="24" width="24" height="32" rx="11" fill="#fff" stroke="#15331F" stroke-width="3"/><path d="M17 36 Q27 30 37 36" stroke="#3DBA4E" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M18 45 Q27 40 36 46" stroke="#FF7A2F" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M58 6 L42 28" stroke="#7A4E2A" stroke-width="5" stroke-linecap="round"/><ellipse cx="41" cy="30" rx="4" ry="5" fill="#3A9BFF" stroke="#15331F" stroke-width="2"/></svg>',
    // 景色にとけこむ（しま模様のかべに、同じ模様の体と目だけ）
    hide: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="6" width="56" height="52" rx="8" fill="#F5B700" stroke="#15331F" stroke-width="3"/><rect x="5.5" y="20" width="53" height="12" fill="#3DBA4E"/><rect x="5.5" y="40" width="53" height="12" fill="#FF7A2F"/><rect x="20" y="16" width="24" height="40" rx="11" fill="none" stroke="#15331F" stroke-width="2" stroke-dasharray="4 3"/><circle cx="28" cy="26" r="4" fill="#fff" stroke="#15331F" stroke-width="2"/><circle cx="37" cy="26" r="4" fill="#fff" stroke="#15331F" stroke-width="2"/><circle cx="29" cy="26" r="1.6" fill="#15331F"/><circle cx="38" cy="26" r="1.6" fill="#15331F"/></svg>',
    // 時間まで逃げきる（ストップウォッチ）
    run: '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="27" y="4" width="10" height="7" rx="2" fill="#15331F"/><circle cx="32" cy="36" r="22" fill="#fff" stroke="#15331F" stroke-width="3"/><path d="M32 14 A22 22 0 0 1 54 36 L32 36 Z" fill="#3DBA4E" opacity=".35"/><path d="M32 36 L32 20" stroke="#15331F" stroke-width="3.5" stroke-linecap="round"/><path d="M32 36 L43 42" stroke="#FF5C93" stroke-width="3.5" stroke-linecap="round"/><circle cx="32" cy="36" r="3" fill="#15331F"/></svg>',
  };
  function aboutSection() {
    const A = SITE.about;
    if (!A || !A.steps) return "";
    return `
      <section class="wrap about" id="about">
        <h2 class="sec-title">${esc(A.title)}</h2>
        <div class="about-box">
          <p class="about-catch">${esc(A.catch)}<small>— 公式のキャッチコピーより</small></p>
          <ol class="about-steps">
            ${A.steps.map((st) => `<li><span class="about-icon">${ABOUT_ICONS[st.icon] || ""}</span><b>${rb(st.title)}</b><span>${rb(st.text)}</span></li>`).join("")}
          </ol>
          ${A.tags ? `<ul class="about-tags">${A.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
          ${A.text ? `<p class="about-text">${br(A.text)}</p>` : ""}
          ${A.source ? `<a class="about-link" href="${esc(A.source.url)}" target="_blank" rel="noopener noreferrer">${esc(A.source.label)}<span aria-hidden="true"> ↗</span></a>` : ""}
        </div>
      </section>`;
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
      play.time && `<div><dt>時間</dt><dd>${rb(play.time)}</dd></div>`,
      play.players && `<div><dt>人数</dt><dd>${rb(play.players)}</dd></div>`,
      play.target && `<div><dt>対象</dt><dd>${rb(play.target)}</dd></div>`,
    ].filter(Boolean).join("");
    const howto =
      (playInfo ? `<dl class="play-info">${playInfo}</dl>` : "") +
      (t.howto.length
        ? `<ol class="steps">${t.howto.map((s) => `<li><span>${br(s)}</span></li>`).join("")}</ol>`
        : ph("ここに遊び方の手順が入ります。"));

    // 「見出し：本文」の見出しを太字にする
    const headed = (s) => {
      const m = String(s).match(/^([^：。\n]{1,24})：([\s\S]*)$/);
      return m ? `<b class="hd">${rb(m[1])}</b>${br(m[2])}` : br(s);
    };
    const chameleon = t.chameleon
      ? `<ul class="points">${t.chameleon.split("\n").map((s) => `<li>${headed(s)}</li>`).join("")}</ul>`
      : ph("ここにカメレオンポイント（作品のどこが「カメレオン」なのか）が入ります。");

    const points = t.points.length
      ? `<ul class="points">${t.points.map((s) => `<li>${headed(s)}</li>`).join("")}</ul>`
      : ph("ここに見どころが入ります。");

    let techBody =
      (tech.text ? `<p>${br(tech.text)}</p>` : "") +
      (tech.parts && tech.parts.length
        ? `<h3 class="sub">使った部品・技術</h3><ul class="chips">${tech.parts.map((p) => `<li>${rb(p)}</li>`).join("")}</ul>`
        : "") +
      (tech.figure
        // figurePhone：横長の図をスマホ用に縦に並べかえたもの（あればスマホではこちらを出す）
        ? `<figure class="fig"><a href="${esc(tech.figure)}" target="_blank" rel="noopener"><picture>${tech.figurePhone ? `<source media="(max-width:639px)" srcset="${esc(tech.figurePhone)}">` : ""}<img src="${esc(tech.figure)}" alt="${esc(plain(tech.figureCaption) || "仕組みの図")}"></picture></a>${tech.figureCaption ? `<figcaption>${rb(tech.figureCaption)}（タップで拡大）</figcaption>` : ""}</figure>`
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
            ${t.subtitle ? `<p class="d-sub">${rb(t.subtitle)}</p>` : ""}
            ${t.catch ? `<p class="d-catch">${rb(t.catch)}</p>` : ph("ここにキャッチコピーが入ります。")}
            <div class="d-visual">
              ${t.image ? `<img src="${esc(t.image)}" alt="${esc(plain(teamName(t)))}">`
                : t.icon ? `<img class="d-icon" src="${esc(t.icon)}" alt="${esc(plain(teamName(t)))}">` : mascot()}
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
          ${voteInvite(t)}
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
            <div class="d-visual soon-visual">${t.icon ? `<img class="soon-img" src="${esc(t.icon)}" alt="">` : `${mascot()}<span class="soon-mark" aria-hidden="true">？</span>`}</div>
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

  /* ---------- 投票 ---------- */
  const LIVE = SITE.live || {};
  const VOTE = LIVE.vote || {};
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* 保存できなくても投票はできる */ } },
  };
  // 投票はスマホ1台につき1回だけ。投票したらこの印を残し、サーバー側でも同じ端末IDを二重に数えない
  const VOTED_KEY = "eka-voted";
  const clientId = () => {
    let id = store.get("eka-client");
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
      store.set("eka-client", id);
    }
    return id;
  };
  const voteOn = () => VOTE.open && (LIVE.endpoint || SITE.preview);
  // 投票の期間："before"（まだ）・"open"（受付中）・"after"（終了）。確認用プレビューではいつでも受付中にする
  //   trialFrom 〜 start はお試し期間（デモ用）。お試しの票は本番の票数に入らず、本番になったらもう一度投票できる
  const votePhase = () => {
    if (SITE.preview) return "open";
    const now = Date.now(), from = VOTE.trialFrom || VOTE.start;
    if (from && now < Date.parse(from)) return "before";
    if (VOTE.end && now >= Date.parse(VOTE.end)) return "after";
    return "open";
  };
  const isTrial = () => !SITE.preview && !!VOTE.start && Date.now() < Date.parse(VOTE.start);
  // 投票した印は「チーム|t（お試し）または r（本番）」。お試しの印は本番になったら無視する
  const votedTeam = () => {
    if (SITE.preview) return "";
    const [team, kind] = String(store.get(VOTED_KEY) || "").split("|");
    if (!team) return "";
    if (kind === "t" && !isTrial()) return "";
    return team;
  };
  const trialNote = () => (isTrial() ? `<p class="vote-trial">いまは<b>お試し期間</b>です。本番の投票は${esc(VOTE.period ? VOTE.period.split("〜")[0].trim() : "")}からで、お試しの票は本番の票数に入りません。</p>` : "");
  const votePeriod = () => (VOTE.period ? `<p class="vote-period">投票できる期間：<b>${esc(VOTE.period)}</b></p>` : "");
  const teamTitle = (id) => { const t = TEAMS.find((x) => x.id === id); return t ? `TEAM ${t.no} ${t.nickname || ""}` : ""; };

  function voteThanks(teamId, note) {
    return `<p class="vote-thanks">${esc(VOTE.thanks || "投票ありがとうございます！")}</p>
      ${teamId ? `<p class="vote-mine">あなたの1票：<b>${esc(teamTitle(teamId))}</b></p>` : ""}
      ${VOTE.ask ? `<p class="vote-ask">${esc(VOTE.ask)}</p>` : ""}
      ${note ? `<p class="vote-note">${esc(note)}</p>` : ""}`;
  }

  function voteForm() {
    return `
          <p class="vote-lead">${esc(VOTE.lead || "")}</p>
          <div class="vote-choices">
            ${TEAMS.map((t) => `<button type="button" class="vote-choice" data-team="${esc(t.id)}" data-c="${esc(t.color)}" aria-pressed="false">
              ${t.icon ? `<img src="${esc(t.icon)}" alt="">` : ""}
              <span class="vote-no">TEAM ${t.no}</span><span class="vote-nick">${esc(t.nickname || "")}</span></button>`).join("")}
          </div>
          <div class="vote-bar">
            <button type="button" class="vote-send" id="vote-send" disabled>ブースを1つ選んでください</button>
          </div>
          <p class="vote-msg" id="vote-msg" role="status"></p>`;
  }

  const trialDoneNote = () => `お試しの投票を受け付けました（本番の票数には入りません）。本番の${VOTE.period ? VOTE.period.split("〜")[0].trim() : "投票開始"}からは、もう一度投票できます。`;
  const voteClosed = () => `<p class="vote-thanks">投票は終了しました。</p><p class="vote-note">たくさんの投票、ありがとうございました！</p>`;
  const voteNotYet = () => `<p class="vote-thanks">投票はまだ始まっていません。</p><p class="vote-note">${esc(VOTE.period ? VOTE.period.split("〜")[0].trim() : "")}から投票できます。お楽しみに！</p>`;

  function voteSection() {
    if (!voteOn()) return "";
    const done = votedTeam();
    const phase = votePhase();
    const body = done ? voteThanks(done, isTrial() ? trialDoneNote() : "このスマホからの投票は受け付けました。投票は1台につき1回までです。")
      : phase === "before" ? voteNotYet()
      : phase === "after" ? voteClosed()
      : voteForm();
    return `
      <section class="wrap vote-sec" id="vote">
        <h2 class="sec-title">${esc(VOTE.title || "いちばん印象に残ったブースは？")}</h2>
        ${votePeriod()}
        ${phase === "open" ? trialNote() : ""}
        <div class="vote-box" id="vote-box">${body}</div>
      </section>`;
  }

  // 開いたままのページでも、始まる・終わる時刻になったら表示を切りかえる（24時間以内のときだけ）
  let phaseTimer = 0;
  function watchVotePhase(rerender) {
    clearTimeout(phaseTimer);
    if (!voteOn() || SITE.preview) return;
    const now = Date.now();
    const next = [VOTE.trialFrom, VOTE.start, VOTE.end].map((s) => (s ? Date.parse(s) : NaN)).find((t) => t > now);
    if (next && next - now < 86400000) phaseTimer = setTimeout(rerender, next - now + 1000);
  }

  function initVote() {
    const box = document.getElementById("vote-box");
    const send = document.getElementById("vote-send");
    if (!box || !send) return;
    const msg = document.getElementById("vote-msg");
    let chosen = "", confirming = false;
    const reset = () => {
      confirming = false;
      send.classList.remove("is-confirm");
      send.textContent = chosen ? `${teamTitle(chosen)} に投票する` : "ブースを1つ選んでください";
      msg.textContent = "";
    };
    box.querySelectorAll(".vote-choice").forEach((b) => b.addEventListener("click", () => {
      chosen = b.dataset.team;
      box.querySelectorAll(".vote-choice").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      send.disabled = false;
      reset();
      // スマホでは「投票する」ボタンが見えるところまで動かす
      const r = send.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 80) send.scrollIntoView({ behavior: "smooth", block: "center" });
    }));
    send.addEventListener("click", async () => {
      if (!chosen) return;
      // 1回目のタップは確認。もう一度押すと送信する
      if (!confirming) {
        confirming = true;
        send.classList.add("is-confirm");
        send.textContent = `この1票で決定（${teamTitle(chosen)}）`;
        msg.textContent = "投票は1回だけで、あとから変えられません。よければもう一度押してください。";
        return;
      }
      send.disabled = true;
      send.textContent = "送信中…";
      if (SITE.preview) {
        box.innerHTML = voteThanks(chosen, "（確認用プレビューなので、実際には送信していません）");
        return;
      }
      try {
        const res = await fetch(LIVE.endpoint, {
          method: "POST",
          body: JSON.stringify({ action: "vote", team: chosen, client: clientId() }),
        });
        const data = await res.json();
        // スマホの時計がずれていても、受付期間はサーバーの時刻で決まる
        if (data.error === "closed") { box.innerHTML = voteClosed(); return; }
        if (data.error === "not_started") { box.innerHTML = voteNotYet(); return; }
        if (!data.ok) throw new Error(data.error || "error");
        const mine = data.already ? (data.team || chosen) : chosen;
        // お試しかどうかもサーバーの時刻で決まる
        store.set(VOTED_KEY, `${mine}|${data.trial ? "t" : "r"}`);
        box.innerHTML = voteThanks(mine, data.trial ? trialDoneNote()
          : data.already ? "このスマホからは、すでに投票済みです。投票は1台につき1回までです。" : "");
      } catch (e) {
        send.disabled = false;
        reset();
        msg.textContent = "うまく送れませんでした。電波のよいところで、もう一度押してください。";
      }
    });
  }

  // 作品ページの下：投票へのさそい
  function voteInvite(t) {
    if (!voteOn() || votePhase() !== "open") return "";
    return `<a class="vote-invite" href="#vote">印象に残ったら、${esc(teamTitle(t.id))} に1票をお願いします！<span aria-hidden="true"> →</span></a>`;
  }

  // スマホ用：画面の下にいつも出る移動ボタン
  function bottomNav() {
    const items = [
      ["", "トップ", "M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"],
      ["works", "作品", "M4 4 H10 V10 H4 Z M14 4 H20 V10 H14 Z M4 14 H10 V20 H4 Z M14 14 H20 V20 H14 Z"],
      SITE.booths && SITE.booths.length && ["map", "会場マップ", "M3 6 L9 4 L15 6 L21 4 V18 L15 20 L9 18 L3 20 Z M9 4 V18 M15 6 V20"],
      voteOn() && ["vote", "投票", "M5 12 L10 17 L19 7"],
    ].filter(Boolean);
    return `<nav class="bnav" aria-label="移動">${items.map(([id, label, d]) =>
      `<a href="#${id || "top"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg><span>${label}</span></a>`).join("")}</nav>`;
  }

  function footer() {
    return `
      <footer class="foot">
        <div class="wrap">
          <p class="foot-title">めっちゃ<span class="e">E</span>科メレオン</p>
          <p><span class="nb">${esc(SITE.school)}</span>　<span class="nb">${esc(SITE.event)}</span></p>
        </div>
      </footer>
      ${bottomNav()}`;
  }

  /* ---------- 隠しコマンド ----------
   * ・タイトルの「E」を 3 秒以内に 5 回タップ（パソコンはダブルクリックでも）
   * ・キーボードで ↑↑↓↓←→←→BA
   * → 当たり演出の音が鳴っている間（約8.5秒）、サイト全体がカメレオンのように色を変える */
  let secretTimer = 0;

  // 当たり演出の音（ファイルを使わず、ブラウザでその場で作る。約8.5秒）
  //   ドドドド… → キュインキュインキュインキュイン…（7回・だんだん高く）→ ギュイーン
  //   → ドーン！＋シンバル → パパパ・パーン・パーン・パーーン（ファンファーレ）＋ キラキラ
  //   戻り値は音の長さ（秒）。隠しコマンドはこの長さで終わる
  const SECRET_LEN = 8.5;
  function secretSound(ctx, out) {
    const t0 = ctx.currentTime + 0.03;
    // ホールで鳴っているような響き（残響）をつける
    const bus = ctx.createGain();
    bus.connect(out);
    const rev = ctx.createConvolver(), wet = ctx.createGain();
    const irLen = Math.ceil(ctx.sampleRate * 2.2), ir = ctx.createBuffer(2, irLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < irLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 3);
    }
    rev.buffer = ir; wet.gain.value = 0.25;
    bus.connect(rev).connect(wet).connect(out);

    const env = (g, start, dur, vol, attack, swell) => {
      g.gain.setValueAtTime(0.0001, t0 + start);
      g.gain.exponentialRampToValueAtTime(swell ? vol * 0.5 : vol, t0 + start + (attack || 0.01));
      if (swell) g.gain.exponentialRampToValueAtTime(vol, t0 + start + dur * 0.6);
      g.gain.setValueAtTime(vol, t0 + start + Math.max(attack || 0.01, dur * 0.65));
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
    };
    const tone = (type, f0, f1, start, dur, vol, opt) => {
      opt = opt || {};
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f0, t0 + start);
      if (f1) o.frequency.exponentialRampToValueAtTime(f1, t0 + start + (opt.glide || dur));
      if (opt.detune) o.detune.value = opt.detune;
      if (opt.vib) {                              // ビブラート（音をゆらす）
        const l = ctx.createOscillator(), lg = ctx.createGain();
        l.frequency.value = opt.vib[0]; lg.gain.value = opt.vib[1];
        l.connect(lg).connect(o.frequency);
        l.start(t0 + start); l.stop(t0 + start + dur + 0.05);
      }
      let node = o;
      if (opt.lp) { const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = opt.lp; node = o.connect(f); }
      env(g, start, dur, vol, opt.attack, opt.swell);
      node.connect(g).connect(bus);
      o.start(t0 + start); o.stop(t0 + start + dur + 0.05);
    };
    const noise = (start, dur, vol, type, fA, fB, attack) => {
      const len = Math.ceil(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = buf; f.type = type;
      f.frequency.setValueAtTime(fA, t0 + start);
      f.frequency.exponentialRampToValueAtTime(fB, t0 + start + dur);
      g.gain.setValueAtTime(attack ? 0.0001 : vol, t0 + start);
      if (attack) g.gain.exponentialRampToValueAtTime(vol, t0 + start + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
      src.connect(f).connect(g).connect(bus);
      src.start(t0 + start);
    };
    const brass = (freq, start, dur, vol, swell) => {    // ラッパっぽい音
      tone("sawtooth", freq, 0, start, dur, vol, { lp: 2800, attack: 0.03, vib: [5.5, freq * 0.012], swell });
      tone("square", freq * 2, 0, start, dur, vol * 0.22, { lp: 3800, attack: 0.03, swell });
    };
    const chord = (freqs, start, dur, vol, swell) => freqs.forEach((f) => brass(f, start, dur, vol, swell));
    const timpani = (freq, start, vol) => { tone("sine", freq, freq * 0.8, start, 0.7, vol); noise(start, 0.08, 0.4, "lowpass", 900, 200); };
    const cymbal = (start, dur, vol, attack) => noise(start, dur, vol, "highpass", 5000, 8000, attack);
    // パチンコの「キュイン」：下からいっきに上がって、ふるえながら鳴る高い音（2つ重ねて太くする）
    const kyuin = (start, base) => {
      tone("square", base, base * 3.4, start, 0.21, 0.17, { glide: 0.09, vib: [38, base * 0.14] });
      tone("sawtooth", base * 0.5, base * 1.7, start, 0.21, 0.1, { glide: 0.09, vib: [38, base * 0.07], detune: 12, lp: 6000 });
    };

    // 1. ドドドド…（だんだん速く・高く）
    let t = 0, gap = 0.12, k = 0;
    while (t < 0.85) {
      noise(t, 0.05, 0.8, "bandpass", 1500 + k * 60, 1100);
      timpani(70 + k * 3, t, 0.25 + k * 0.015);
      t += gap; gap = Math.max(0.035, gap * 0.85); k++;
    }
    tone("sawtooth", 110, 440, 0, 0.9, 0.07, { lp: 1800, swell: true });
    // 2. キュインキュインキュインキュイン…（7回・だんだん高く）
    for (let i = 0; i < 7; i++) kyuin(0.92 + i * 0.24, 760 * Math.pow(1.045, i));
    cymbal(1.6, 1.15, 0.22, 1.1);
    // 3. ギュイーン
    tone("sawtooth", 160, 2200, 2.62, 0.55, 0.26, { lp: 5000 });
    noise(2.62, 0.55, 2.6, "bandpass", 400, 7000);
    // 4. ドーン！＋シンバル
    const B = 3.2;
    tone("sine", 200, 40, B, 1.0, 0.9);
    tone("square", 160, 55, B, 0.5, 0.2);
    noise(B, 0.5, 1.0, "lowpass", 3000, 150);
    cymbal(B, 2.4, 0.5);
    // 5. ファンファーレ：パパパ（ソ・ド・ミ）→ パーン（ファ）→ パーン（ソ）→ パーーン（ド）
    brass(392, B + 0.2, 0.14, 0.13); brass(523, B + 0.36, 0.14, 0.13); brass(659, B + 0.52, 0.3, 0.13);
    chord([349, 440, 523, 698], B + 0.95, 0.45, 0.085); timpani(87, B + 0.95, 0.5);
    chord([392, 494, 587, 784], B + 1.45, 0.45, 0.085); timpani(98, B + 1.45, 0.5);
    chord([262, 330, 392, 523, 659, 784, 1047], B + 1.95, 2.4, 0.07, true);
    tone("sine", 131, 0, B + 1.95, 2.4, 0.35, { attack: 0.03 });
    let r = B + 1.95;
    while (r < B + 3.7) { timpani(65, r, 0.22); r += 0.07; }   // 最後のティンパニのロール
    cymbal(B + 1.95, 2.4, 0.35, 1.6);                          // シンバルがふくらむ
    timpani(65, B + 3.8, 0.8); cymbal(B + 3.8, 0.6, 0.5);      // ジャン！
    // 6. キラキラ
    [2093, 2637, 3136, 3520, 4186, 3520, 3136, 2637, 3136, 3520, 4186, 5274, 4186, 5274].forEach((f, i) =>
      tone("sine", f, 0, B + 2.0 + i * 0.13, 0.28, 0.12));
    return SECRET_LEN;
  }
  let audioCtx = null;
  function playSecretSound() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return 0;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const master = audioCtx.createGain(), comp = audioCtx.createDynamicsCompressor();
      master.gain.value = 0.75;   // 音量（前の 0.5 より大きく、音割れしない範囲）
      master.connect(comp).connect(audioCtx.destination);
      return secretSound(audioCtx, master);
    } catch (e) { /* 音が出せない環境では、色が変わるだけにする */ }
    return 0;
  }
  window.__secretSound = secretSound; // 音の確認用

  let secretOn = false;
  function chameleonMode() {
    if (secretOn) return;
    secretOn = true;
    const len = playSecretSound() || SECRET_LEN;   // 音が終わったら隠しコマンドも終わる
    document.documentElement.classList.add("chameleon-mode");
    let toast = document.getElementById("secret-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "secret-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.innerHTML = "<b>隠しコマンドを発見！！</b><br>めっちゃカメレオンモード発動中…";
    toast.hidden = false;
    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => {
      document.documentElement.classList.remove("chameleon-mode");
      toast.hidden = true;
      secretOn = false;
    }, len * 1000);
  }
  let taps = [];
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#secret-e")) return;
    const now = Date.now();
    taps = taps.filter((t) => now - t < 3000).concat(now);
    if (taps.length >= 5) { taps = []; chameleonMode(); }
  });
  document.addEventListener("dblclick", (e) => {
    if (e.target.closest("#secret-e") && window.matchMedia("(pointer: fine)").matches) chameleonMode();
  });
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let keys = [];
  document.addEventListener("keydown", (e) => {
    keys = keys.concat(e.key.length === 1 ? e.key.toLowerCase() : e.key).slice(-KONAMI.length);
    if (keys.join() === KONAMI.join()) { keys = []; chameleonMode(); }
  });

  /* ---------- 画面の切りかえ（#team1 など） ---------- */
  function route() {
    const id = location.hash.replace(/^#/, "");
    const team = TEAMS.find((t) => t.id === id);
    if (team) {
      if (isOpen(team)) renderTeam(team);
      else renderSoon(team);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      renderHome();
      const target = id && document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    }
    watchVotePhase(() => { const y = scrollY; route(); window.scrollTo({ top: y, behavior: "instant" }); });
  }

  window.addEventListener("hashchange", route);
  route();
})();
