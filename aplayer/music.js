const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    preload: 'metadata',
    autoplay: false,
    order: 'random',
    audio: [
    {
        "name": "宿星のガールフレンド３",
        "artist": "mirai",
        "url": "https://oscarcx.com/hexo_resource/music/song/宿星のガールフレンド３.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/宿星のガールフレンド３.jpg"
    },
    {
        "name": "宿星のガールフレンド",
        "artist": "mirai",
        "url": "https://oscarcx.com/hexo_resource/music/song/宿星のガールフレンド.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/宿星のガールフレンド.jpg"
    },
    {
        "name": "夏恋花火",
        "artist": "40mP",
        "url": "https://oscarcx.com/hexo_resource/music/song/夏恋花火.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/夏恋花火.jpg"
    },
    {
        "name": "ETERNAL DRAIN",
        "artist": "Colorful Sounds Port",
        "url": "https://oscarcx.com/hexo_resource/music/song/ETERNAL DRAIN.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/ETERNAL DRAIN.jpg"
    },
    {
        "name": "君と誰かの優しさに",
        "artist": "senya",
        "url": "https://oscarcx.com/hexo_resource/music/song/君と誰かの優しさに.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/君と誰かの優しさに.jpg"
    },
    {
        "name": "ニヒル神楽",
        "artist": "senya",
        "url": "https://oscarcx.com/hexo_resource/music/song/ニヒル神楽.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/ニヒル神楽.jpg"
    },
    {
        "name": "Moonlight of Sand Castle",
        "artist": "旅人E",
        "url": "https://oscarcx.com/hexo_resource/music/song/Moonlight of Sand Castle.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Moonlight of Sand Castle.jpg"
    },
    {
        "name": "Oracle",
        "artist": "TQ☆",
        "url": "https://oscarcx.com/hexo_resource/music/song/Oracle.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Oracle.jpg"
    },
    {
        "name": "Cross soul",
        "artist": "HyuN",
        "url": "https://oscarcx.com/hexo_resource/music/song/Cross soul.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Cross soul.jpg"
    },
    {
        "name": "Astral tale",
        "artist": "Noah",
        "url": "https://oscarcx.com/hexo_resource/music/song/Astral tale.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Astral tale.jpg"
    },
    {
        "name": "Hazukashigariya no Toy Soldier",
        "artist": "AAAA",
        "url": "https://oscarcx.com/hexo_resource/music/song/Hazukashigariya no Toy Soldier.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Hazukashigariya no Toy Soldier.jpg"
    },
    {
        "name": "アスノヨゾラ哨戒班",
        "artist": "Orangestar",
        "url": "https://oscarcx.com/hexo_resource/music/song/アスノヨゾラ哨戒班.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/アスノヨゾラ哨戒班.jpg"
    },
    {
        "name": "MELODY FLAG",
        "artist": "水瀬いのり",
        "url": "https://oscarcx.com/hexo_resource/music/song/MELODY FLAG.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/MELODY FLAG.jpg"
    },
    {
        "name": "fortissimo -from insanity affection-",
        "artist": "fripSide",
        "url": "https://oscarcx.com/hexo_resource/music/song/fortissimo -from insanity affection-.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/fortissimo -from insanity affection-.jpg"
    },
    {
        "name": "灼熱のユートピア",
        "artist": "Xceon",
        "url": "https://oscarcx.com/hexo_resource/music/song/灼熱のユートピア.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/灼熱のユートピア.jpg"
    },
    {
        "name": "Scarlet Faith",
        "artist": "仲村芽衣子",
        "url": "https://oscarcx.com/hexo_resource/music/song/Scarlet Faith.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Scarlet Faith.jpg"
    },
    {
        "name": "Ultimate Fate",
        "artist": "Jun Kuroda",
        "url": "https://oscarcx.com/hexo_resource/music/song/Ultimate Fate.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Ultimate Fate.jpg"
    },
    {
        "name": "惑星☆ロリポップ",
        "artist": "Nana Takahashi",
        "url": "https://oscarcx.com/hexo_resource/music/song/惑星☆ロリポップ.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/惑星☆ロリポップ.jpg"
    },
    {
        "name": "Endless Tears",
        "artist": "中村舞子",
        "url": "https://oscarcx.com/hexo_resource/music/song/Endless Tears.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Endless Tears.jpg"
    },
    {
        "name": "Alice in Rosso",
        "artist": "fripSide",
        "url": "https://oscarcx.com/hexo_resource/music/song/Alice in Rosso.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Alice in Rosso.jpg"
    },
    {
        "name": "Ikenai Borderline",
        "artist": "Mikumo",
        "url": "https://oscarcx.com/hexo_resource/music/song/Ikenai Borderline.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Ikenai Borderline.jpg"
    },
    {
        "name": "Paranoia",
        "artist": "Umeri",
        "url": "https://oscarcx.com/hexo_resource/music/song/Paranoia.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Paranoia.jpg"
    },
    {
        "name": "夜に駆ける",
        "artist": "YOASOBI",
        "url": "https://oscarcx.com/hexo_resource/music/song/夜に駆ける.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/夜に駆ける.jpg"
    },
    {
        "name": "Flesvelka",
        "artist": "Grand Thaw",
        "url": "https://oscarcx.com/hexo_resource/music/song/Flesvelka.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Flesvelka.jpg"
    },
    {
        "name": "Grad Erlija",
        "artist": "Grand Thaw",
        "url": "https://oscarcx.com/hexo_resource/music/song/Grad Erlija.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Grad Erlija.jpg"
    },
    {
        "name": "Äventyr",
        "artist": "Grand Thaw",
        "url": "https://oscarcx.com/hexo_resource/music/song/Äventyr.mp3",
        "cover": "https://oscarcx.com/hexo_resource/music/cover/Äventyr.jpg"
    }
]});