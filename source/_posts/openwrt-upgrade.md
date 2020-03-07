---
title: 记一次OpenWrt升级
categories:
  - 技术
tags:
  - OpenWrt
date: 2020-03-06 05:05:56
permalink: 
---
# 前情提要

我的路由器是在2019年黑五买的TP-Link Archer A7 v5，税后价格是$35。在美国，这个价格买全新路由器感觉也还可以了，不过当然没有国内实惠。当时机器到手之后没多久就刷了OpenWrt并装了LuCI，然后某一次心血来潮执行了升级全部包的命令，然后LuCI里头的大部分页面好像就挂掉了。当时看着也没有影响使用，就懒得管，这也为今天发生的事情挖了个大坑。

<!--more-->

当时的罪魁祸首是这个指令，各位不要随意效仿：

```bash
opkg list-upgradable | cut -f 1 -d ' ' | xargs opkg upgrade
```

# 排查并解决问题

今晚上网上得好好的，突然就毫无征兆的断网了，而且等了好几分钟也没有恢复的迹象。一开始以为是xfinity自动扣费失败导致欠费断网，所以果断用手机流量去查，发现没有断网。后来通过网线把树莓派直接连到路由器上，发现有网。那么，问题应该就出在路由器了。

所以我就祭出第一招，重启！毕竟绝大部分电脑问题，重启一下就解决了嘛。于是我登入LuCI，点击重启，发现失败。回想起以前挖的大坑，好像一点都不意外，因为当时LuCI很多功能就用不了，一点进去就报错。

LuCI用不了没关系，那就用树莓派通过ssh登录OpenWrt直接操作就好了。不过既然都要重启了，不如就直接恢复出厂设置好了，这样顺便把LuCI也修了。因为OpenWrt使用的是[overlayfs](https://zh.wikipedia.org/wiki/OverlayFS)，所有的修改都是在/overlay目录下，因此可以很容易的还原。这里就直接使用firstboot来恢复出厂设置。

```bash
root@OpenWrt:~# firstboot
```

跑完之后，就直接输入reboot，然后ssh就会断开，稍等片刻就可以尝试再次连接。因为恢复了出厂设置，所以不需要密码就能登入。

```
BusyBox v1.31.0 () built-in shell (ash)

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------
 OpenWrt SNAPSHOT, r10899-1c0290c5cc
 -----------------------------------------------------
=== WARNING! =====================================
There is no root password defined on this device!
Use the "passwd" command to set up a new password
in order to prevent unauthorized SSH logins.
--------------------------------------------------
```
嗯，终于看到了亲切的画面~

首先当然是要通过passwd命令设置密码，注意，这里密码在输入的时候是看不到的。

```bash
root@OpenWrt:~# passwd
```

接下来当然是直接安装LuCI啦，毕竟命令行还是没有Web界面直观的。

```bash
root@OpenWrt:~# opkg update
（此处省略输出内容）
root@OpenWrt:~# opkg install luci
Installing luci (git-20.062.71982-95804e5-1) to root...
Downloading http://downloads.openwrt.org/snapshots/packages/mips_24kc/luci/luci_git-20.062.71982-95804e5-1_all.ipk
Collected errors:
 * satisfy_dependencies_for: Cannot satisfy the following dependencies for luci:
 * 	kernel (= 4.19.106-1-315b646a823a53f3f58b69e5a9f746a9)
 * opkg_install_cmd: Cannot install package luci.
```

哎哟，居然安装失败了，没道理啊，明明恢复出厂设置之前就能用的，怎么恢复了之后装不上呢？仔细一看报错信息，里头提到了kernel = 4.19.106这个要求，那就赶紧看看我现在的OpenWrt是基于什么内核版本的吧。

```bash
root@OpenWrt:~# uname -a
Linux OpenWrt 4.19.69 #0 Fri Aug 30 18:45:40 2019 mips GNU/Linux
```

```bash
root@OpenWrt:~# cat /etc/openwrt_release 
DISTRIB_ID='OpenWrt'
DISTRIB_RELEASE='SNAPSHOT'
DISTRIB_REVISION='r10899-1c0290c5cc'
DISTRIB_TARGET='ath79/generic'
DISTRIB_ARCH='mips_24kc'
DISTRIB_DESCRIPTION='OpenWrt SNAPSHOT r10899-1c0290c5cc'
DISTRIB_TAINTS=''
```

哦，破案了，原来是内核不符合要求，看来是因为OpenWrt版本太老旧了。那就直接谷歌搜索“openwrt archer a7”，找到[OpenWrt对应的页面](https://openwrt.org/toh/hwdata/tp-link/tp-link_archer_a7_v5)。因为我这个路由器已经刷过OpenWrt，所以找到Firmware OpenWrt Upgrade URL使用wget下载即可。

```bash
root@OpenWrt:~# wget http://downloads.openwrt.org/releases/19.07.1/targets/ath79/generic/openwrt-19.07.1-ath79-generic-tplink_archer-a7-v5-squashfs-sysupgrade.bin
```

然后就使用sysupgrade命令进行升级。

```bash
root@OpenWrt:~# sysupgrade -v openwrt-19.07.1-ath79-generic-tplink_archer-a7-v5-squashfs-sysupgrade.bin 
（篇幅所限，省略对本文无意义的输出内容。。。）
Commencing upgrade. Closing all shell sessions.
Connection to 192.168.1.1 closed by remote host.
Connection to 192.168.1.1 closed.
```

稍等片刻，就可以再次尝试登录OpenWrt了。

```
BusyBox v1.30.1 () built-in shell (ash)

  _______                     ________        __
 |       |.-----.-----.-----.|  |  |  |.----.|  |_
 |   -   ||  _  |  -__|     ||  |  |  ||   _||   _|
 |_______||   __|_____|__|__||________||__|  |____|
          |__| W I R E L E S S   F R E E D O M
 -----------------------------------------------------
 OpenWrt 19.07.1, r10911-c155900f66
 -----------------------------------------------------
```

嗯，登进去了，赶紧看看kernel版本号先。

```bash
root@OpenWrt:~# uname -a
Linux OpenWrt 4.14.167 #0 Wed Jan 29 16:05:35 2020 mips GNU/Linux
```

这下可以了，满足前面看到的kernel>=4.19.106，那么就赶紧安装LuCI吧。接下来就是常规安装LuCI以及配置的教程了。

# 安装和配置LuCI

## 安装LuCI

貌似OpwnWrt官方支持的固件都是自带LuCI，而snapshot都是需要自己安装LuCI的。保险起见我这里还是执行了install命令。

```bash
root@OpenWrt:~# opkg update
（此处省略输出内容）
root@OpenWrt:~# opkg install luci
Upgrading luci on root from git-20.029.45734-adbbd5c-1 to git-20.064.69776-e8c638c-1...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci_git-20.064.69776-e8c638c-1_all.ipk
Configuring luci.
```

## 安装中文语言包

```bash
root@OpenWrt:~# opkg install luci-i18n-base-zh-cn
Installing luci-i18n-base-zh-cn (git-20.064.69776-e8c638c-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-i18n-base-zh-cn_git-20.064.69776-e8c638c-1_all.ipk
Configuring luci-i18n-base-zh-cn.
```

因为语言设置默认是auto，所以安装完语言包之后就会自动切换成中文。

## 安装打印服务

### 路由器端

这个还是挺有用的，把打印机连到路由器上，就摇身一变成了无线打印机。

```bash
root@OpenWrt:~# opkg install kmod-usb-printer
Installing kmod-usb-printer (4.14.167-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/targets/ath79/generic/kmods/4.14.167-1-b84a5a29b1d5ae1dc33ccf9ba292ca1d/kmod-usb-printer_4.14.167-1_mips_24kc.ipk
Configuring kmod-usb-printer.
```

```bash
root@OpenWrt:~# opkg install p910nd luci-app-p910nd
Installing p910nd (0.97-8) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/packages/p910nd_0.97-8_mips_24kc.ipk
Installing luci-app-p910nd (git-20.064.69776-e8c638c-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-app-p910nd_git-20.064.69776-e8c638c-1_all.ipk
Installing luci-compat (git-20.064.69776-e8c638c-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-compat_git-20.064.69776-e8c638c-1_all.ipk
Configuring p910nd.
Collected errors:
 * check_data_file_clashes: Package luci-compat wants to install file /usr/lib/lua/luci/tools/webadmin.lua
	But that file is already provided by package  * luci-base
 * opkg_install_cmd: Cannot install package luci-app-p910nd.
```

居然报错，我谷歌搜了下，在官方论坛找到[这个热乎的帖子](https://forum.openwrt.org/t/something-changed-luci-compat/56959/2)。总而言之，这里有两种方案，一种是升级luci-base，第二种是直接覆盖文件。我就直接用了前者。

```bash
root@OpenWrt:~# opkg upgrade luci-base
Upgrading luci-base on root from git-20.029.45734-adbbd5c-1 to git-20.064.69776-e8c638c-1...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-base_git-20.064.69776-e8c638c-1_mips_24kc.ipk
Upgrading rpcd on root from 2019-11-10-77ad0de0-1 to 2019-12-10-aaa08366-2...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/base/rpcd_2019-12-10-aaa08366-2_mips_24kc.ipk
Upgrading cgi-io on root from 16 to 19...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/packages/cgi-io_19_mips_24kc.ipk
Removing obsolete file /usr/lib/lua/luci/tools/webadmin.lua.
Configuring cgi-io.
Configuring rpcd.
Configuring luci-base.
Collected errors:
 * resolve_conffiles: Existing conffile /etc/config/luci is different from the conffile in the new package. The new conffile will be placed at /etc/config/luci-opkg.
```

这个报错看起来好像没有什么问题，于是直接无视。现在再次尝试安装luci-app-p910nd。

```bash
root@OpenWrt:~# opkg install p910nd luci-app-p910nd
Package p910nd (0.97-8) installed in root is up to date.
Installing luci-app-p910nd (git-20.064.69776-e8c638c-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-app-p910nd_git-20.064.69776-e8c638c-1_all.ipk
Installing luci-compat (git-20.064.69776-e8c638c-1) to root...
Downloading http://downloads.openwrt.org/releases/19.07.1/packages/mips_24kc/luci/luci-compat_git-20.064.69776-e8c638c-1_all.ipk
Configuring luci-compat.
Configuring luci-app-p910nd.
```

到这里就装好了，然后登入LuCI，进入“服务” > “p910nd - Printer server”。

* enable打勾
* 如果默认的设备（/dev/usb/lp0）不对，可以自行修改（ls /dev/usb/lp*可以查看打印机是否被识别）
* 接口保持“未指定”，无需修改
* 端口也不需要改，就是默认的9100
* Bidirectional mode打勾

### 电脑端

这里以Windows 10为例：
* 控制面板 > 硬件和声音 > 设备和打印机
* 找到打印机，右键 > 打印机属性
* 添加标准TCP/IP端口（Standard TCP/IP Port）
    * 端口名随意（我写的打印机型号）
    * 打印机名或IP地址：192.168.1.1
    * 协议：Raw
    * 端口：9100

## 开启WIFI

OpenWrt的WIFI默认是关闭的，所以需要在LuCI里头手动开启，相关设置在“网络” > “无线”里头。

选择启用之后，记得进入“编辑” > “接口配置” > “无线安全”来设置密码。