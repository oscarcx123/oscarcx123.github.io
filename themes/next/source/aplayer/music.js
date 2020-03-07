const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    order: 'random',
    audio: [
      {
        name: "宿星のガールフレンド３",
        artist: 'mirai',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/%E5%AE%BF%E6%98%9F%E3%81%AE%E3%82%AC%E3%83%BC%E3%83%AB%E3%83%95%E3%83%AC%E3%83%B3%E3%83%89%EF%BC%93.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/%E5%AE%BF%E6%98%9F%E3%81%AE%E3%82%AC%E3%83%BC%E3%83%AB%E3%83%95%E3%83%AC%E3%83%B3%E3%83%89%EF%BC%93.jpg',
      },
      {
        name: "宿星のガールフレンド",
        artist: 'mirai',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/%E5%AE%BF%E6%98%9F%E3%81%AE%E3%82%AC%E3%83%BC%E3%83%AB%E3%83%95%E3%83%AC%E3%83%B3%E3%83%89.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/%E5%AE%BF%E6%98%9F%E3%81%AE%E3%82%AC%E3%83%BC%E3%83%AB%E3%83%95%E3%83%AC%E3%83%B3%E3%83%89.jpg',
      },
      {
        name: "夏恋花火",
        artist: '40mP',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/%E5%A4%8F%E6%81%8B%E8%8A%B1%E7%81%AB.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/%E5%A4%8F%E6%81%8B%E8%8A%B1%E7%81%AB.jpg',
      },
      {
        name: "ETERNAL DRAIN",
        artist: 'Colorful Sounds Port',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/ETERNAL%20DRAIN.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/ETERNAL%20DRAIN.jpg',
      },
      {
        name: "君と誰かの優しさに",
        artist: 'senya',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/%E5%90%9B%E3%81%A8%E8%AA%B0%E3%81%8B%E3%81%AE%E5%84%AA%E3%81%97%E3%81%95%E3%81%AB.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/%E5%90%9B%E3%81%A8%E8%AA%B0%E3%81%8B%E3%81%AE%E5%84%AA%E3%81%97%E3%81%95%E3%81%AB.jpg',
      },
      {
        name: "Accel World Ending 1 Unfinished",
        artist: 'Kotoko',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Accel%20World%20Ending%201%20Unfinished.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Accel%20World%20Ending%201%20Unfinished.jpg',
      },
      {
        name: "ニヒル神楽",
        artist: 'senya',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/%E3%83%8B%E3%83%92%E3%83%AB%E7%A5%9E%E6%A5%BD.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/%E3%83%8B%E3%83%92%E3%83%AB%E7%A5%9E%E6%A5%BD.jpg',
      },
      {
        name: "fragment of tears",
        artist: 'Nakamura Meiko',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/fragment%20of%20tears.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/fragment%20of%20tears.jpg',
      },
      {
        name: "Dynasty",
        artist: 'Yooh',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Dynasty.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Dynasty.jpg',
      },
      {
        name: "Moonlight of Sand Castle",
        artist: '旅人E',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Moonlight%20of%20Sand%20Castle.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Moonlight%20of%20Sand%20Castle.jpg',
      },
      {
        name: "Oracle",
        artist: 'TQ☆',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Oracle.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Oracle.jpg',
      },
      {
        name: "Девчонка рыжая",
        artist: 'Воровайки',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Девчонка%20рыжая.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Девчонка%20рыжая.jpg',
      },
      {
        name: "Schubert Fantasy in F minor D940",
        artist: 'Schubert',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Schubert%20Fantasy%20in%20F%20minor%20D940.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Schubert%20Fantasy%20in%20F%20minor%20D940.jpg',
      },
      {
        name: "Glinka_Balakirev The Lark",
        artist: 'Kissin',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Glinka_Balakirev%20The%20Lark.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Glinka_Balakirev%20The%20Lark.jpg',
      },
      {
        name: "Rachmaninoff Moment Musicaux",
        artist: 'Nikolai Lugansky',
        url: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/song/Rachmaninoff%20Moment%20Musicaux.mp3',
        cover: 'https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/music/cover/Rachmaninoff%20Moment%20Musicaux.jpg',
      }
    ]
});