/* 自動で作ったファイル。直接書きかえず、専門店/下書き/data.js を直してから _tools/build.js public を実行する */
const SITE = {
  "showPlaceholders": false,
  "logo": "images/icon.jpg?v=23be8c82",
  "about": {
    "title": "「めっちゃカメレオン」ってどんなゲーム？",
    "catch": "自分を塗って、景色に溶け込め！",
    "steps": [
      {
        "icon": "paint",
        "title": "真っ白な体に、絵をかく",
        "text": "自分の体に、好きな色や模様をぬれます"
      },
      {
        "icon": "hide",
        "title": "景色にとけこんで、かくれる",
        "text": "カメレオンみたいにステージに{擬態|ぎたい}します！"
      },
      {
        "icon": "run",
        "title": "鬼から逃げきれ！",
        "text": "時間まで見つからなければ勝ちです"
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
      "open": true,
      "title": "いちばん印象に残ったブースは？",
      "lead": "いちばん印象に残ったブースを1つ選んで、投票してください。（投票はスマホ1台につき1回だけです）",
      "thanks": "投票ありがとうございます！",
      "ask": "専門店の学科別投票では、ぜひ「電気情報工学科」に投票お願いします！"
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
      "label": "脱出\nサバイバル",
      "x": 5.333333333333334,
      "y": 0,
      "w": 2.3333333333333335,
      "h": 3,
      "door": "bottom"
    },
    {
      "team": "team5",
      "label": "レース",
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
      "label": "もりづくり",
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
    "icon": "images/team1-icon.jpg?v=2f3f4524",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
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
    "icon": "images/team2-icon.jpg?v=b6ddc9f9",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
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
    "icon": "images/team3-icon.jpg?v=57d55043",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
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
    "nickname": "脱出サバイバル",
    "public": false,
    "icon": "images/team4-icon.jpg?v=591e370b",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
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
    "nickname": "レース",
    "public": false,
    "icon": "images/team5-icon.jpg?v=a2768b1d",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
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
    "nickname": "もりづくり",
    "public": false,
    "icon": "images/team6-icon.jpg?v=c0e27a5a",
    "name": "",
    "catch": "",
    "image": "",
    "summary": "",
    "howto": [],
    "points": [],
    "play": {},
    "chameleon": "",
    "tech": {},
    "glossary": [],
    "media": []
  }
];
