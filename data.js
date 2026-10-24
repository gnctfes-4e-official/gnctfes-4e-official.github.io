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
 *   play    … 1回の時間・人数・対象（あそびかたの上に出る）
 *   howto   … あそびかたの手順（上から順番に表示）
 *   points  … 見どころ（いくつでも）
 *   chameleon … カメレオンポイント（作品のどこが「カメレオン」なのか）
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
    // ↓ 記入例（架空の作品）。本物の内容が届いたら書きかえて、sample の行を消す
    sample: true,
    name: "まぜまぜカメレオン",
    catch: "光の3色をまぜて、カメレオンをかくしてあげよう！",
    icon: "",
    image: "",
    summary:
      "背景のパネルが光ってお題の色が出ます。3つのつまみを回してカメレオンの体の色を変え、背景と同じ色にできたら高得点のゲームです。\n" +
      "つまみはそれぞれ赤・緑・青の光の明るさを変えていて、まぜ方しだいで約1677万色をつくれます。30秒で何点とれるかな？",
    play: { time: "1回 約1分", players: "1人（2人で協力してもOK）", target: "小学生から" },
    howto: [
      "スタートボタンを押すと、背景のパネルが光ってお題の色が出ます。",
      "赤・緑・青の3つのつまみを回して、カメレオンの体の色を背景の色に近づけます。",
      "「これだ！」と思ったら決定ボタンを押します。",
      "色の近さが100点満点で表示されます。30秒の間なら何回でも挑戦できます。",
    ],
    points: [
      "赤と緑の光をまぜると黄色になるなど、絵の具とはちがう「光の色のまざり方」を体験できます。",
      "点数は、お題の色とカメレオンの色がどれだけ離れているかを計算して出しています。",
      "カメレオンの体には60個のフルカラーLEDを、うろこ模様に合わせて1個ずつ並べました。",
    ],
    chameleon:
      "カメレオンは体の色を変える生き物として知られています。このゲームでは、あなたがカメレオンの代わりに色をつくり、カメレオンを背景にとけこませます。",
    tech: {
      text:
        "つまみ（可変抵抗）を回すと、マイコンに入る電圧が0〜5Vの間で変わります。マイコンはこの電圧をAD変換で0〜1023の数に直し、さらにLEDの明るさ0〜255に直して、カメレオンの体のLEDに送ります。\n" +
        "決定ボタンが押されたら、お題の色と体の色の赤・緑・青それぞれの差から2つの色の距離を計算し、距離が近いほど高い点数をつけます。",
      parts: [
        "Arduino Uno（マイコン）",
        "フルカラーLED WS2812B（体60個・背景24個）",
        "可変抵抗 10kΩ ×3",
        "押しボタンスイッチ ×2",
        "液晶ディスプレイ 16文字×2行",
        "圧電ブザー",
        "ACアダプタ 5V 6A",
        "プログラム：Arduino言語（C++）",
      ],
      figure: "images/team1-system.svg",
      figureCaption: "システム図：つまみとボタン（入力）→ マイコン（処理）→ LED・液晶・ブザー（出力）",
    },
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
    play: { time: "", players: "", target: "" },
    chameleon: "",
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
  {
    id: "team3",
    no: 3,
    color: "#FF7A2F",
    name: "九六式二五粍三連装機銃簡易シミュレータ",
    catch: "リアルな操作、チームで撃ちまくれ！",
    icon: "images/team3-icon.jpg",
    image: "images/team3-game.jpg",
    summary:
      "実在した対空機銃の操作をほぼ再現したシミュレータです。プレイヤーは旋回手・俯仰手・装填手それぞれの役割に分かれ、チームで協力して敵機を撃ち落とします。\n" +
      "ゲームは2種類用意しており、一方は大和の艦上、もう一方は謎の島です。",
    howto: [
      "俯仰手がハンドルを回して、照準の縦方向を調整します。",
      "同時に、旋回手がハンドルで照準の横方向を調整します。",
      "俯仰手が足元のトリガーペダルで発砲します。",
      "装填手が、弾切れした弾倉を交換します。",
    ],
    points: [
      "弾倉の装填を検知するために、接点式のスイッチではなくCdSセル（光センサ）を用いています。確実な検知が行えるよう調整しました。ぜひ、どこに装備されているか見つけてみてください。",
      "発射される弾丸は多少ばらけるほか、敵機も弾丸を避けるための機動を行ってきます。腕の見せどころです。",
    ],
    play: { time: "1ゲーム 1分", players: "最大6人まで同時プレイ", target: "" },
    chameleon:
      "そもそも謎の島では敵機がカメレオンですが、どちらのステージでも高得点が狙える巨大カメレオンが出現します。彼らは背景に溶け込むクリアカラーですから、頑張って見つけて撃ち落としましょう。",
    tech: {
      text:
        "ハンドルやペダル、弾倉のセンサが入力を検知すると、マイコンが値を解釈・整頓し、シリアル通信でPCに送ります。シリアル通信は、簡潔な文字列データを直列にひたすら流し続けるシンプルな通信です。\n" +
        "PCでは、オープンソースのゲームエンジンGodotで作ったゲームが動いていて、受け取った値を照準の動きや発砲、装填に反映します。",
      parts: [
        "Arduino Uno R3 の互換品（ELEGOO UNO R3）",
        "ロータリーエンコーダ ×2",
        "ペダルスイッチ ×2",
        "CdSセル（光センサ）×3",
        "LED",
        "Godot（ゲームエンジン）",
        "プログラム：GDScript（ゲーム）、Arduino IDE（マイコン）",
      ],
      figure: "images/team3-system.svg",
      figureCaption: "システム図：ハンドル・ペダル・弾倉センサ（入力）→ マイコン → PC（Godot）→ 画面・音（出力）",
    },
    media: [
      { type: "image", src: "images/team3-machine.jpg", caption: "製作中の機銃。3つの砲身と、旋回・俯仰のハンドル部分" },
      { type: "image", src: "images/team3-cds.jpg", caption: "CdSセルはこのあたりに…？ 会場で探してみてください" },
      { type: "image", src: "images/team3-godot.jpg", caption: "ゲームエンジンGodotでの開発画面（大和の艦上ステージ）" },
    ],
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
    play: { time: "", players: "", target: "" },
    chameleon: "",
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
    play: { time: "", players: "", target: "" },
    chameleon: "",
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
    play: { time: "", players: "", target: "" },
    chameleon: "",
    tech: { text: "", parts: [], figure: "", figureCaption: "" },
    media: [],
  },
];
