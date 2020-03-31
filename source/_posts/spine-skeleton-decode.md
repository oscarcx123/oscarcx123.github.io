---
title: 读取Spine骨骼动画
categories:
  - 技术
tags:
  - Spine
  - DragonBones
date: 2020-03-31 06:11:16
permalink: 
---
# 前言

之前有看到别人拆包读取了《剑与远征》还没正式公开的人物动图，刚刚好前几天公会群里头有人叫我拆包看看有没有更新什么素材，于是就打算研究下如何读取人物动图。由于我在游戏引擎相关方面没有任何经验，当时就像个无头苍蝇到处乱撞，因此在搞明白之后，决定把过程记录下来。

<!--more-->

前排提示：本文如果需要示范操作，会以提取《剑与远征》的人物动图资源为例~

# 软件清单

* DragonBonesPro v5.5.0（龙骨）
* Mali Texture Compression Tool v4.3.0
* [AzurLaneSpineCharacterDecoder v1.2](https://github.com/azurlane-doujin/AzurLaneSpineCharacterDecoder)

这几个软件都是免费的~

# 准备工作

Spine是用来制作2d骨骼动画的软件，但是要钱。好在我们有替代品，就是龙骨。

要在龙骨中读取Spine骨骼动画，需要凑齐三件套：
* .json（Spine数据，从.skel转换得到）
* .atlas（配置文件）
* .png（纹理集）

# 定位素材文件

具体路径就不给了，因为每个游戏都不一样。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_1.png)

上图中，可以看到我们需要的几个文件：
* Arthur.atlas
* Arthur.skel
* Arthur0.pvr
* Arthur1.pvr

# 凑齐三件套

## skel转json

因为龙骨不支持直接读取skel文件，因此我们需要手动转换文件格式。

这里我使用了AzurLaneSpineCharacterDecoder，一个带GUI的转换器，虽然这个GUI感觉特别鸡肋，还不如直接提供命令行版本呢。

双击`azurlanespine.jar`，可以看到一个红色背景的窗口。此时按下`Ctrl + O`，会出现一个选择文件的弹窗，选中要转换的skel文件。如果读取成功，此时背景会变成白色。接下来可以按下`Ctrl + S`设置保存路径，也可以直接按下`空格`开始转换。如果转换成功，那么背景会变成蓝色。默认输出目录是程序的运行目录。

## pkm转png

为什么不是pvr转png呢？因为上面例子中的pvr文件是披着羊皮的狼，本质上其实是pkm文件。这一点可以通过把本例的pvr文件拖入HxD来证明。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_2.png)

可以看到，这个文件前面几个字符表明了真实身份，怪不得我用PVRTexTool读不出来。既然这样，就直接把后缀名改成pkm好了。

因此，这里是使用Mali Texture Compression Tool的一个工具。在软件安装目录下，进入bin文件夹，会看到下面的一系列文件。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_3.png)

实际上这里只有两个文件会被用到，分别是`convert.exe`和`etcpack.exe`。

这里我们直接对该文件夹空白处`Shift + 右键`，选择打开命令行窗口，然后输入如下内容。注意根据自身情况替换`<input.pkm>`和`<outputdir>`。

```cmd
etcpack <input.pkm> <outputdir> -ext PNG
```

如果成功，那么就能看到纹理集了，如下图所示。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_4.png)

# 把素材导入龙骨

首先，打开龙骨，点开`导入项目数据`，然后选择我们刚刚转换得到的json文件。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_5.png)

接下来有个大坑，我搞了半天才明白问题在哪儿。那么我们先看错误的方法，没兴趣的话，可以直接翻到后面看正确的做法。

## 错误的做法

在纹理集那一栏，选中两张刚刚转换得到的png。在配置文件那一栏，选择atlas文件，然后点击完成。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_6.png)

然后龙骨会让你选择导入的动画类型，这里选`骨骼动画`。

然后。。。就会出现一大堆红色的MISSING，如下图所示。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_7.png)

很明显，刚刚选中的纹理集并没有贴上去。这是因为，我们有两张png纹理集，但是却只提供了一个atlas配置文件，所以龙骨顿时不知所措。

## 正确的做法

那么，我们来看看atlas文件里头到底都有些什么。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_8.png)

哦，其实就是两份配置文件放到了一起，这就好办了，直接把atlas文件内容拆成两个文件就行了。最后拆分的文件名如图所示。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_9.png)

现在再尝试在龙骨中导入，如下所示。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_10.png)

最后得到的人物资源如下所示。虽然感觉贴图仍然有点奇怪，但是这个资源读取出来确实就是这样的，看起来像是一些战斗招式的骨骼动画。

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/spine_skeleton_decode_11.png)

# 总结

这次学习到了一些皮毛，知道了手游制作动图的方式。学会了读取好像也没什么特别的用处，就是满足一下好奇心，然后下次出新英雄的时候可以提前拆包看看。下次再遇到这种类型的，就知道怎么读取了。