/* 自動で作ったファイル。直接書きかえず、専門店/下書き/data.js を直してから _tools/build.js public を実行する */
const SITE = {
  "showPlaceholders": false,
  "logo": "images/icon.jpg",
  "about": {
    "title": "「めっちゃカメレオン」ってどんなゲーム？",
    "catch": "自分を塗って、景色に溶け込め！",
    "steps": [
      {
        "icon": "paint",
        "title": "真っ白な体に、絵をかく",
        "text": "自分の体に、好きな色や模様をぬれる"
      },
      {
        "icon": "hide",
        "title": "景色にとけこんで、かくれる",
        "text": "カメレオンみたいにステージに擬態！"
      },
      {
        "icon": "run",
        "title": "鬼から逃げきれ！",
        "text": "時間まで見つからなければ勝ち"
      }
    ],
    "tags": [
      "鬼チーム vs かくれチーム",
      "パソコン（Steam）のゲーム",
      "2026年6月発売"
    ],
    "text": "E科は、この「色を変えて、まわりにとけこむ」アイデアをヒントに、6つの作品をつくりました！",
    "source": {
      "label": "公式ストアページ（Steam）を見る",
      "url": "https://store.steampowered.com/app/4704690/"
    }
  },
  "department": {
    "url": "https://www.gifu-nct.ac.jp/elec/index.html",
    "name": "岐阜高専 電気情報工学科"
  },
  "live": {
    "endpoint": "",
    "vote": {
      "open": false,
      "title": "いちばん印象に残ったブースは？",
      "lead": "おもしろかった・印象に残ったブースに1票！（1台につき1日1回）",
      "thanks": "投票ありがとう！",
      "ask": "高専祭の学科別投票では、ぜひ「電気情報工学科」に投票お願いします！"
    }
  },
  "instagram": {
    "url": "https://www.instagram.com/gnctfes_4e_official/",
    "name": "@gnctfes_4e_official"
  },
  "room": {
    "w": 10,
    "h": 9,
    "entrance": {
      "from": 4,
      "to": 7
    },
    "in": 4.9,
    "out": 6.1
  },
  "booths": [
    {
      "team": "team2",
      "label": "サッカー",
      "x": 0,
      "y": 0,
      "w": 3,
      "h": 5,
      "door": "bottom"
    },
    {
      "team": "team3",
      "label": "機銃",
      "x": 3,
      "y": 0,
      "w": 2.3333333333333335,
      "h": 3,
      "door": "bottom"
    },
    {
      "team": "team4",
      "label": "おばけ",
      "x": 5.333333333333334,
      "y": 0,
      "w": 2.3333333333333335,
      "h": 3,
      "door": "bottom"
    },
    {
      "team": "team5",
      "label": "熊",
      "x": 7.666666666666667,
      "y": 0,
      "w": 2.3333333333333335,
      "h": 3,
      "door": "bottom"
    },
    {
      "team": "team1",
      "label": "光学迷彩",
      "x": 0,
      "y": 7,
      "w": 4,
      "h": 2,
      "door": "top"
    },
    {
      "team": "team6",
      "label": "チームラボ",
      "x": 7,
      "y": 6,
      "w": 3,
      "h": 3,
      "door": "left"
    }
  ],
  "school": "岐阜工業高等専門学校 電気情報工学科 4年",
  "event": "高専祭2026　専門展",
  "date": "",
  "place": "",
  "intro": "電気情報工学科の学生が6つのチームに分かれ、「めっちゃカメレオン」というゲームをモチーフにした作品をつくりました。\n気になる作品をタップすると、遊び方や仕組みをくわしく見られます。"
};

const TEAMS = [
  {
    "id": "team1",
    "no": 1,
    "color": "#3DBA4E",
    "nickname": "光学迷彩",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  },
  {
    "id": "team2",
    "no": 2,
    "color": "#F5B700",
    "nickname": "サッカー",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  },
  {
    "id": "team3",
    "no": 3,
    "color": "#FF7A2F",
    "nickname": "機銃",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "images/team3-icon.jpg",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  },
  {
    "id": "team4",
    "no": 4,
    "color": "#FF5C93",
    "nickname": "おばけ",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  },
  {
    "id": "team5",
    "no": 5,
    "color": "#3A9BFF",
    "nickname": "熊",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "images/team5-icon.jpg",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  },
  {
    "id": "team6",
    "no": 6,
    "color": "#A57BFF",
    "nickname": "チームラボ",
    "public": false,
    "name": "",
    "catch": "",
    "icon": "images/team6-icon.jpg",
    "image": "",
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  }
];
