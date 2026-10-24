/* 会場マップ（上から見た図）を SVG の文字列で作る。
 * 配置は data.js の SITE.room と SITE.booths。
 * サイトでは app.js から、保存用の画像は _tools/make-map.js から使う。
 *   links     … ブースを作品ページへのリンクにする
 *   highlight … このチーム（"team3" など）のブースだけ目立たせる
 *   title     … 上にタイトルを入れる（保存用の画像）
 *   font      … 文字のフォント
 */
function buildMapSVG(opts) {
  const o = Object.assign({ links: true, highlight: "", title: false, font: "inherit" }, opts);
  const room = SITE.room, booths = SITE.booths;
  const S = 56;                        // 1m を何 px で描くか
  const X0 = 70, Y0 = o.title ? 150 : 64;
  const W = room.w * S, H = room.h * S;
  const VW = X0 + W + 40, VH = Y0 + H + (o.title ? 150 : 104);
  const px = (m) => X0 + m * S, py = (m) => Y0 + m * S;
  const fmt = (n) => String(Math.round(n * 10) / 10);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const tint = (hex, a) => {
    const n = parseInt(hex.slice(1), 16), mix = (v) => Math.round(v + (255 - v) * a);
    return "#" + [n >> 16, (n >> 8) & 255, n & 255].map(mix).map((v) => v.toString(16).padStart(2, "0")).join("");
  };
  const arrow = (x1, y1, x2, y2, color, w) => {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const hx = x2 - ux * w * 2.2, hy = y2 - uy * w * 2.2, nx = -uy * w * 1.6, ny = ux * w * 1.6;
    return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>` +
      `<path d="M${x2} ${y2} L${hx + nx} ${hy + ny} L${hx - nx} ${hy - ny} Z" fill="${color}"/>`;
  };
  const INK = "#15331F";
  const k = o.title ? 1 : 1.35;        // サイトではスマホでも読めるように文字を大きくする
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VW} ${VH}" width="${VW}" height="${VH}" font-family="${esc(o.font)}" role="img" aria-label="会場マップ">`;
  svg += `<rect width="${VW}" height="${VH}" fill="#FFFFFF"/>`;

  if (o.title) {
    svg += `<text x="${X0}" y="58" font-size="30" font-weight="900" fill="${INK}">めっちゃE科メレオン　会場マップ</text>`;
    svg += `<text x="${X0}" y="90" font-size="16" fill="#46604F">${esc(SITE.school)}　${esc(SITE.event)}（上から見た図）</text>`;
  }

  // 寸法
  svg += arrow(px(0) + 4, Y0 - 26, px(room.w) - 4, Y0 - 26, "#7A8C80", 2) + arrow(px(room.w) - 4, Y0 - 26, px(0) + 4, Y0 - 26, "#7A8C80", 2);
  svg += `<rect x="${px(room.w / 2) - 30}" y="${Y0 - 38}" width="60" height="22" fill="#FFFFFF"/><text x="${px(room.w / 2)}" y="${Y0 - 21}" font-size="${15 * k}" fill="#46604F" text-anchor="middle">${fmt(room.w)} m</text>`;
  svg += arrow(X0 - 34, py(0) + 4, X0 - 34, py(room.h) - 4, "#7A8C80", 2) + arrow(X0 - 34, py(room.h) - 4, X0 - 34, py(0) + 4, "#7A8C80", 2);
  svg += `<rect x="${X0 - 48}" y="${py(room.h / 2) - 12}" width="28" height="24" fill="#FFFFFF"/><text x="${X0 - 34}" y="${py(room.h / 2) + 5}" font-size="${15 * k}" fill="#46604F" text-anchor="middle">${fmt(room.h)}m</text>`;

  // 床（通路）
  svg += `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" fill="#EEF2EC"/>`;

  // ブース
  for (const b of booths) {
    const t = TEAMS.find((x) => x.id === b.team) || { no: "?", color: "#BBBBBB" };
    const on = !o.highlight || o.highlight === b.team;
    const secret = o.links && (!t.name || t.secret);
    const label = secret ? "？？？" : b.label;
    const x = px(b.x), y = py(b.y), w = b.w * S, h = b.h * S, cx = x + w / 2, cy = y + h / 2;
    const fill = on ? tint(t.color, o.highlight ? 0.15 : 0.55) : "#F7F8F6";
    const stroke = on ? INK : "#B9C2BC";
    let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${o.highlight === b.team ? 5 : 2.5}"/>`;
    g += `<circle cx="${cx}" cy="${cy - 26 * k}" r="${17 * k}" fill="${on ? t.color : "#DDE2DE"}" stroke="${stroke}" stroke-width="2.5"/>`;
    g += `<text x="${cx}" y="${cy - 20 * k}" font-size="${17 * k}" font-weight="900" fill="${on ? INK : "#9AA6A0"}" text-anchor="middle">${t.no}</text>`;
    g += `<text x="${cx}" y="${cy + 14 * k}" font-size="${(label.length > 4 ? 16 : 19) * k}" font-weight="900" fill="${on ? INK : "#9AA6A0"}" text-anchor="middle">${esc(label)}</text>`;
    g += `<text x="${cx}" y="${cy + 36 * k}" font-size="${12 * k}" fill="${on ? "#46604F" : "#B0B9B4"}" text-anchor="middle">${secret ? "COMING SOON" : `${fmt(b.w)}×${fmt(b.h)}m`}</text>`;
    // ブースの入り口の矢印（通路からブースへ）
    const L = 0.75 * S, gap = 0.12 * S, col = on ? INK : "#C6CEC9";
    if (b.door === "bottom") g += arrow(cx, y + h + gap + L, cx, y + h + gap, col, 5);
    if (b.door === "top") g += arrow(cx, y - gap - L, cx, y - gap, col, 5);
    if (b.door === "left") g += arrow(x - gap - L, cy, x - gap, cy, col, 5);
    if (b.door === "right") g += arrow(x + w + gap + L, cy, x + w + gap, cy, col, 5);
    const name = `TEAM ${t.no} ${label}`;
    svg += o.links && !secret
      ? `<a href="#${esc(b.team)}" class="booth" aria-label="${esc(name)}の作品ページへ"><title>${esc(name)}</title>${g}</a>`
      : `<g>${g}</g>`;
  }

  // 壁（入口のところは開いている）
  const e = room.entrance;
  svg += `<path d="M${px(e.from)} ${py(room.h)} H${px(0)} V${py(0)} H${px(room.w)} V${py(room.h)} H${px(e.to)}" fill="none" stroke="${INK}" stroke-width="9" stroke-linejoin="miter"/>`;

  // 入口・出口
  const ey = py(room.h);
  svg += arrow(px(room.in), ey + 62, px(room.in), ey + 10, "#E0661F", 7);
  svg += arrow(px(room.out), ey + 10, px(room.out), ey + 62, "#3A9BFF", 7);
  svg += `<text x="${px(room.in) - 14}" y="${ey + 50}" font-size="${17 * k}" font-weight="900" fill="#C8581A" text-anchor="end">入口</text>`;
  svg += `<text x="${px(room.out) + 14}" y="${ey + 50}" font-size="${17 * k}" font-weight="900" fill="#1F6FBF">出口</text>`;

  // 凡例
  const ly = VH - (o.title ? 44 : 18);
  svg += arrow(X0, ly - 5, X0 + 30, ly - 5, INK, 5);
  svg += `<text x="${X0 + 40}" y="${ly}" font-size="${14 * k}" fill="${INK}">ブースの入り口</text>`;
  const lx = X0 + 172 * k;
  svg += `<circle cx="${lx}" cy="${ly - 5 * k}" r="${10 * k}" fill="#3DBA4E" stroke="${INK}" stroke-width="2"/><text x="${lx}" y="${ly}" font-size="${12 * k}" font-weight="900" fill="${INK}" text-anchor="middle">1</text>`;
  svg += `<text x="${lx + 18 * k}" y="${ly}" font-size="${14 * k}" fill="${INK}">チーム番号${o.links ? "（タップで作品へ）" : ""}</text>`;

  return svg + "</svg>";
}
