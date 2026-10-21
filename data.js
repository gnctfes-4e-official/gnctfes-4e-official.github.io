/*
 * ===== サイトの中身はこのファイルだけ書きかえればOK =====
 *
 * ・文字は " " の中に書く。改行したいところは \n と書く。
 * ・空欄 "" や空のリスト [] の項目は、公開時はページに表示されない。
 * ・画像や動画は images フォルダに入れて、"images/ファイル名" と書く。
 */

const SITE = {
  // true の間は、まだ書いていない欄に「ここに〜が入ります」と表示する（下書き確認用）。
  // 公開する前に false にする。
  showPlaceholders: true,

  // トップに出すアイコン（インスタと同じもの）。ファイルが無いときはカメレオンの絵になる
  logo: "images/icon.jpg",

  school: "岐阜工業高等専門学校 電気情報工学科 4年",
  event: "高専祭2026　専門展",
  date: "",   // 例："11月8日（土）・9日（日）10:00〜15:00"
  place: "",  // 例："電気情報工学科棟 2階 ○○実験室"
  intro:
    "電気情報工学科の学生が6つのチームに分かれ、カメレオンをテーマにした作品をつくりました。\n" +
    "気になる作品をタップすると、遊び方や仕組みをくわしく見られます。",
};

/*
 * チームごとの情報。
 *   color   … そのチームの「体色」。カードと詳しいページの色になる
 *   icon    … 一覧に出す画像（正方形がきれい）。"" のときはカメレオンの絵になる
 *   image   … 詳しいページの一番上に出す大きな画像（横長がきれい）
 *   howto   … あそびかたの手順（上から順番に表示）
 *   points  … 見どころ（いくつでも）
 *   tech    … しくみ。parts は使った部品・技術、figure は回路図やブロック図の画像
 *   media   … 写真・動画。
 *             { type: "image", src: "images/xxx.jpg", caption: "説明" }
 *             { type: "video", src: "images/xxx.mp4", caption: "説明" }
 *             { type: "link",  url: "https://www.youtube.com/...", caption: "動画を見る" }
 */
const TEAMS = [
  {
    id: "team1",
    no: 1,
    color: "#3DBA4E",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team2",
    no: 2,
    color: "#F5B700",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team3",
    no: 3,
    color: "#FF7A2F",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team4",
    no: 4,
    color: "#FF5C93",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team5",
    no: 5,
    color: "#3A9BFF",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team6",
    no: 6,
    color: "#A57BFF",
    name: "",
    catch: "",
    icon: "",
    image: "",
    summary: "",
    howto: [],
    points: [],
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
];
