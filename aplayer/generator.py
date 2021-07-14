import csv
import json

filename = 'musicDB.csv'
repo_url = 'https://oscarcx.com/hexo_resource/music/'

# 从csv读取name和artist并去掉表头
with open(filename) as f:
    reader = csv.reader(f)
    music_list = list(reader)[1:]

# 生成JSON对象
# music_list[i] = [name, artist, url, cover]
# url / cover 为空时，会使用name代替
result = []
for i in range(len(music_list)):
    data = {}
    data['name'] = music_list[i][0]
    data['artist'] = music_list[i][1]
    mp3_file_name = music_list[i][2] if music_list[i][2] else music_list[i][0]
    data['url'] = repo_url + 'song/' + mp3_file_name + '.mp3'
    cover_name = music_list[i][3] if music_list[i][3] else music_list[i][0]
    data['cover'] = repo_url + 'cover/' + cover_name + '.jpg'
    result.append(data)

# 写入music.js
with open('music.js', 'w') as f:
    f.writelines([
        "const ap = new APlayer({" + "\n",
        "    container: document.getElementById('aplayer')," + "\n",
        "    fixed: true," + "\n",
        "    preload: 'metadata'," + "\n",
        "    autoplay: false," + "\n",
        "    order: 'random'," + "\n",
        "    audio: ",
    ])
    json.dump(result, f, ensure_ascii=False, sort_keys=False, indent=4)
    f.write("});")