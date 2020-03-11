---
title: Modern Operating Systems Intro
categories:
  - 技术
tags:
  - Operating System
date: 2020-03-10 17:19:05
permalink: 
---
Modern Operating Systems 4e `Chapter 1 Introduction`自学笔记

<!--more-->

操作系统（Operating System）
* 主流系统：Windows, Linux, FreeBSD, OS X
* 交互（interface）方式：
    * shell
    * GUI（Graphical User Interface）
    * 运行在用户态最底层，可以启动其它程序（例如浏览器）
* 运行模式：
    * 内核态（kernel mode / supervisor mode）
        * 操作系统运行在内核态
        * 可以执行任意指令
        * 对硬件有完整控制权
    * 用户态（user mode）
        * 其它软件都运行在用户态
        * 只能执行部分指令（例如无法进行I/O）

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_1.png)

普通软件可以随意替换重写，但是操作系统的组件，例如时钟中断处理程序（clock interrupt handler），就不可更改或重写，因为此程序受硬件保护。嵌入式系统(embedded systems)（没有内核态）和解释系统(intepreted systems)（非硬件方式区分组件）可能不受此规则约束。

操作系统的进化：
* Windows
    * Windows 95/98/Me
    * Windows NT/2000/XP/Vista/Windows 7
    * 两条线完全不一样，只是UI看起来相似
* UNIX系
    * System V, Solaris, FreeBSD（来源于UNIX）
    * Linux（从UNIX依葫芦画瓢得来）

# What is an Operating System?

操作系统有两大功能：
* 提供清晰易用的硬件资源管理方法（provide clean abstract set of resources）
* 管理硬件资源（manage these hardware resources）

## The Operating System as an Extended Machine

计算机底层是相当原始的，通过抽象化（abstraction）提升易用性，以SATA(Serial ATA)硬盘为例：
* 最初是超过450页的说明文档
* 然后是硬盘驱动（disk driver），提供读写硬盘块接口
* 最后是操作系统提供的文件系统

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_2.png)

## The Operating System as a Resource Manager

多路复用（multiplexing）
* 时间上复用（time）
    * 不同用户或程序轮流使用资源
    * 队列管理以及使用时长由操作系统决定
    * 例子：多个程序在一个CPU上跑，打印队列
* 空间上复用（space）
    * 不同用户或程序取得部分资源
    * 例子：内存，硬盘

# History of Operating Systems

[Charles Babbage](https://zh.wikipedia.org/wiki/%E6%9F%A5%E5%B0%94%E6%96%AF%C2%B7%E5%B7%B4%E8%B4%9D%E5%A5%87) (1792–1871)提出了[差分机](https://zh.wikipedia.org/wiki/%E5%B7%AE%E5%88%86%E6%A9%9F)，是计算机先驱

[Ada Lovelace](https://zh.wikipedia.org/wiki/%E6%84%9B%E9%81%94%C2%B7%E5%8B%92%E8%8A%99%E8%95%BE%E7%B5%B2)是世界上第一个程序员

## Gen 1 (1945–55): Vacuum Tubes

* 电脑使用[真空管](https://zh.wikipedia.org/wiki/%E7%9C%9F%E7%A9%BA%E7%AE%A1)
* 没有编程语言（包括汇编），使用[插线板](https://en.wikipedia.org/wiki/Plugboard)（plugboards）
* 没有操作系统
* 1950s，出现了[穿孔卡片](https://zh.wikipedia.org/wiki/%E6%89%93%E5%AD%94%E5%8D%A1)（punched cards）
* 例子：Colossus (Bletchley Park, England), Mark I (Harvard), ENIAC (UPenn)

## Gen 2 (1955–65): Transistors and Batch Systems

1950s中期，[晶体管](https://zh.wikipedia.org/wiki/%E6%99%B6%E4%BD%93%E7%AE%A1)（transistor）被发明

[大型机](https://zh.wikipedia.org/wiki/%E5%A4%A7%E5%9E%8B%E8%AE%A1%E7%AE%97%E6%9C%BA)（mainframes）
* 放在带空调的大型电脑房
* 需要专业操作员
* 数百万美元的价格，只有大公司、主要政府机构、大学才用得起

运行作业（job -> a program / a set of programs）的过程：
* 在纸上写程序（用FORTRAN或者汇编）
* 穿孔成卡片
* 把卡片交给操作员
* 运行完成后，操作员会获取打印的输出

因为操作员东跑西跑，很浪费时间，所以出现了批处理系统（batch system）
* 由小型机器（例如IBM 1401）从卡片收集输入
* 积攒一定量之后，拿去大型机（如IBM 7094）计算
* 计算完成后，由小型机器（例如IBM 1401）负责打印输出内容
* 在计算机之间负责传输数据的介质是磁带（tape）

输入作业的结构：
* $JOB card
    * 最大运行时间
    * 计费账号
    * 程序员名字
* $FORTRAN card
    * 告诉系统加载FORTRAN编译器
    * $FORTRAN card后面跟着FORTRAN程序
* $LOAD card
    * 让操作系统加载刚刚编译的目标程序
* $RUN card
    * 让操作系统运行程序并使用$RUN card后面跟着的数据
* $END card
    * 标志作业结束

当时主流操作系统：
* FMS (the Fortran Monitor System)
* IBSYS (IBM 7094的操作系统)

## Gen 3 (1965–1980): ICs and Multiprogramming

当时有两种完全不同的产品线：
* 负责科学计算的计算机，例如IBM 7094 -> word-oriented
* 负责磁带整理和打印的计算机，例如IBM 1401 -> character-oriented

System/360的出现一举合并了两条产品线
* 后续系列有370, 4300, 3080, 3090
* [zSeries](https://en.wikipedia.org/wiki/IBM_Z)是此系列最新机型
* 首个采用[集成电路](https://zh.wikipedia.org/wiki/%E9%9B%86%E6%88%90%E7%94%B5%E8%B7%AF)（ICs / Integrated Circuits）的主流机型，并且价格跟性能都比基于晶体管的计算机好很多

[OS/360](https://en.wikipedia.org/wiki/OS/360_and_successors)是System/360系列的操作系统
* 数千个程序员写了几百万行汇编
* 因为太复杂，总是修了旧的bug又引入了新的bug，最后成了烂摊子
* 虽然坑，但是用户总体还是满意的

[多道程序处理](https://zh.wikipedia.org/wiki/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E5%A4%84%E7%90%86)（multiprogramming）
* 在一个程序等待I/O的时候，另一个程序可以使用CPU，从而避免资源闲置
* 现在叫多任务处理

[外部设备联机并行操作](https://zh.wikipedia.org/wiki/%E5%81%87%E8%84%B1%E6%9C%BA)（spool / Simultaneous Peripheral Operation On Line）
* 当一个作业运行完之后，可以直接从磁盘读取新作业并载入空出的内存运行
* IBM 1401失去用武之地
* 现代例子：打印机队列

[分时系统](https://zh.wikipedia.org/wiki/%E5%88%86%E6%99%82%E7%B3%BB%E7%B5%B1)（timesharing）
* 多个用户可以同时使用同一台计算机
* [兼容分时系统](https://zh.wikipedia.org/wiki/%E7%9B%B8%E5%AE%B9%E5%88%86%E6%99%82%E7%B3%BB%E7%B5%B1)（CTSS / Compatible Time Sharing System）是第一个通用的分时系统，在麻省理工开发

[MULTICS](https://web.mit.edu/multics-history/) (MULTiplexed Information and Computing Service)
* 著名的分时操作系统（time-sharing operating system）
* 1964年由贝尔实验室（Bell Labs）、麻省理工学院及美国通用电气公司（General Electric）所共同参与研发
* 很多用户直到1990s晚期才关闭MULTICS系统
* 在[这里](https://www.multicians.org/)可以找到MULTICS系统的更多信息

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/MULTICS_timeline.png)

小型机（minicomputers）的崛起：
* DEC PDP-1 (1961)
    * 仅售$120,000，是IBM 7094价格的5%
    * 在一些非数值计算上，跟IBM 7094的速度差不多

UNIX系统在此阶段的发展
* IEEE制定了标准：[POSIX / Portable Operating System Interface](https://zh.wikipedia.org/wiki/%E5%8F%AF%E7%A7%BB%E6%A4%8D%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3)
* System V (AT&T)
* BSD / Berkeley Software Distribution (UC Berkeley)
* MINIX (1987) -> MINIX 3
    * 是UNIX的仿制品
    * 主要用于教学
    * 官网[在此](http://www.minix3.org/)，提供免费下载
* Linux (inspired by MINIX)

## Gen 4 (1980–Present): Personal Computers

随着大规模集成电路（LSI / Large Scale Integration circuit）的出现，PC时代到来了。PC在当时叫微机（microcomputers，微型计算机）。

* 1974年，Intel 8080造出了第一个通用8-bit CPU
    * Gary Kildall为这个CPU写了操作系统，叫[CP/M](https://zh.wikipedia.org/wiki/CP/M) (Control Program for Microcomputers)
    * Intel觉得基于磁盘的微机没前途，所以就让Gary Kildall拿到了版权
    * Gary Kildall随后开了个公司，叫Digital Research，主要开发和销售CP/M
* 1977年，Digital Research重写了CP/M，使其能在各种CPU上面跑，例如Intel 8080，Zilog Z80等等
* 1980s，IBM设计了IBM PC，并且需要能在上面运行的软件，接下来轮到比尔盖茨表演空手套白狼~
    * IBM找了比尔盖茨询问他的BASIC解释器
    * 比尔盖茨让IBM找当时如日中天的Digital Research
    * Digital Research没理IBM，合作告吹
    * 于是IBM又找比尔盖茨，这回要操作系统
    * 盖茨从Seattle Computer Products那里以$75,000买了DOS (Disk Operating System)，然后加上自己的BASIC解释器一起转手给了IBM。不过盖茨没让IBM买断，而是跟IBM PC硬件捆绑销售。
    * IBM需要对DOS做一些修改，于是盖茨直接请了写DOS的人（Tim Paterson）来微软公司
    * 最后这个系统叫做MS-DOS (MicroSoft Disk Operating System)
* 1983年，IBM PC/AT搭配Intel 80286 CPU作为IBM PC的继承者横空出世
    * 这时候CP/M已经差不多要凉了
    * MS DOS越来越红火，在后来的Intel 80386 & 80486 CPU上都广泛使用
* 此时操作系统都是命令行，乔布斯从Xerox那里看到了GUI，并意识到了GUI的潜在价值，于是就推出了带GUI的电脑
    * Lisa（由于太贵而失败）
    * Macintosh（大获成功，因为操作方式对用户友好）
* 微软看到Macintosh的成功，于是依葫芦画瓢搞了个Windows
    * 1985-1995年，Windows只是作为MS DOS的图形界面
    * 1995年，推出了Windows 95，此时MS DOS只负责启动以及运行老的DOS程序
    * 1998年，推出了改进版，叫Windows 98，不过仍然包含大量16位Intel汇编
* Windows NT（Windows New Technology）看起来跟之前没区别，但是底层已经完全重写，是32位的系统
    * 1999年，Windows NT 5.0改名为Windows 2000，尝试完全代替Windows 98，但是没有成功
    * 所以微软又推出了Windows 98的改良版，叫Windows Me (Millennium Edition)
* 2001年，微软推出了Windows 2000的改进版，就是我们熟知的Windows XP
    * Windows XP主要分支：
        * 客户端（client）
        * 服务器端（server）
        * 嵌入式系统（embedded）
    * 这些分支导致各种服务包（service packs）出现
* 2007年，微软推出了Windows Vista
    * 微软寄予厚望，然而Windows Vista凉透了
* 2009年，微软推出了Windows 7
    * 七个月内，Windows 7的份额就超过了Windows Vista
* 2012年，微软推出了Windows 8
    * 书上到这里就结束了，但是实际上Windows 8又凉了
* 2015年，微软推出了Windows 10
    * 可以从Windows 7免费升级到Windows 10

x86架构主要有两个变种：
* x86-32 (32-bit)
* x86-64 (64-bit)

UNIX系的GUI
* X Window System (X11)
* 完整的GUI是运行在X11之上的，例如Gnome, KDE

网络操作系统（network operating systems）

分布式操作系统（distributed operating systems）

## Gen 5 (1990–Present): Mobile Computers

* 1946年，贝尔实验室造出了第一个移动电话，只不过重达40kg
* 1970s，第一个真正意义上的移动电话被造出来，只有1kg重
* 1990s中期，诺基亚造出了N9000，是手机和PDA(Personal Digital Assistant)的结合体
* 1997年，爱立信造出了第一个概念智能手机GS88 "Penelope"，不过只有原型机，最后没有公开发售。图片取自[这篇介绍GS88的文章](https://ericssoners.wordpress.com/2016/06/13/gs88/)

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/1998924_20130219075643.jpg)

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/gs88_071.jpg)

手机操作系统有：
* Symbian OS (Nokia, 1998年)
    * 主要厂商：诺基亚，三星，索尼爱立信，摩托罗拉
* Blackberry OS ([RIM / BlackBerry](https://zh.wikipedia.org/wiki/%E9%BB%91%E8%8E%93%E5%85%AC%E5%8F%B8), 2002年)
* iOS (Apple, 2007年)
    * 随着第一代iPhone一起发布
* Android (Google, 2008年)
    * 基于Linux，开源
* Windows Phone (Microsoft, 2010年)
    * 已经凉了

# Computer Hardware Review

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_6.png)

## Processors

关于计算机的“大脑”CPU：
* CPU的基本周期（basic cycle）：
    * 从内存取出指令（fetch instruction）
    * 解码以确定类型和[操作数](https://zh.wikipedia.org/wiki/%E9%81%8B%E7%AE%97%E6%95%B8)（decode type and operands）
    * 执行指令（execute）
* 指令集（Instruction set）
    * x86
    * ARM
    * CPU只能执行自己架构的指令
* 寄存器（registers）
    * 通用寄存器（general registers）
        * 储存关键变量（key variables）和临时数据（temporary results）
        * 因为访问内存获取指令或者数据很花时间，所以通常会有指令从内存加载到寄存器，反之亦然。
    * 特殊寄存器（special registers）
        * [程序计数器](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E8%A8%88%E6%95%B8%E5%99%A8)（program counter）
            * 保存了下一条指令的地址
        * [堆栈指针](https://en.wikipedia.org/wiki/Stack_register)（stack pointer）
            * 指向内存中当前栈的顶端
        * [程序状态字](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F%E7%8A%B6%E6%80%81%E5%AD%97)（PSW / Program Status Word）
            * 包含了条件码位（condition code bits）
* 流水线（pipeline）技术
    * 现代CPU一个周期可以执行多条指令
    * 指令一旦被获取就必须执行完
* 超标量（superscalar）架构
    * 多个执行单位
        * 整数运算（integer arithmetic）
        * 浮点数运算（floating-point arithmetic）
        * 布尔运算（boolean operation）
    * 多条指令被同时获取并解码，然后存放到缓冲区（holding buffer）
    * 一旦执行单位空闲，就会到缓冲区查看是否有能执行的指令
    * 副作用：程序的指令经常不按顺序执行

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_7.png)

### Multithreaded and Multicore Chips

摩尔定律（Moore’s law）：芯片中晶体管的数量每十八个月翻一番（the number of transistors on a chip doubles every 18 months）

多线程（multithreading）/ 超线程（hyperthreading）
* SPARC, Power5, Intel Xeon, Intel Core都支持多线程
* 允许CPU保持两个线程的状态，并且可以在纳秒级的时间内来回切换
* 不是真正的并行处理，一次只有一个进程在跑
* 每个线程在操作系统看来就是一个CPU核心，所以双核四线程看起来就是四核

CPU核心（core）
* 每个核心都是完整的处理器
* Intel Xeon Phi和Tilera TilePro等CPU，已经超过60核
* GPU (Graphics Processing Unit)核心更多，有数以千计的微核，擅长大量简单的并行运算

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_8.png)

## Memory

又快又大还便宜的内存是不存在的~

内存系统采用分层结构：
* CPU内部的寄存器（最快）
    * 32-bit的CPU上的储存空间是32*32 bits(=0.128KB)
    * 64-bit的CPU上的储存空间是64*64 bits(=0.512KB)
* [高速缓存](https://zh.wikipedia.org/wiki/CPU%E7%BC%93%E5%AD%98)（cache memory）
    * 高速缓存行（cache lines）
        * 通常情况下，大小是64bytes
        * line 0 -> addr 0-63, line 1 -> addr 64-127, 以此类推
        * 高速缓存命中（cache hit）-> 无需访问内存
    * L1 cache
        * 通常在CPU内部
        * 访问L1 cache没有延迟
        * 通常大小是16KB
    * L2 cache
        * 访问L2 cache有1-2个时钟周期的延迟
        * 大小在MB级别
    * 因为价格比较贵，所以空间也是很小的
* [主存储器 / 主存](https://zh.wikipedia.org/wiki/%E9%9A%8F%E6%9C%BA%E5%AD%98%E5%8F%96%E5%AD%98%E5%82%A8%E5%99%A8)（Main memory / RAM -> Random Access Memory）
    * 曾经叫磁芯储存器（core memory），因为1950s-1960s内存是用可磁化的铁磁体（magnetizable ferrite cores）做的
    * 断电数据就没了
* 只读储存器（ROM -> Read Only Memory）
    * 非易失（non-volatile）储存器
    * 速度快而且便宜，但是一次写死不能改
* [EEPROM](https://zh.wikipedia.org/wiki/%E9%9B%BB%E5%AD%90%E6%8A%B9%E9%99%A4%E5%BC%8F%E5%8F%AF%E8%A4%87%E5%AF%AB%E5%94%AF%E8%AE%80%E8%A8%98%E6%86%B6%E9%AB%94)（Electrically Erasable PROM）和[闪存](https://zh.wikipedia.org/wiki/%E9%97%AA%E5%AD%98)（flash memory）
    * 非易失（non-volatile）储存器
    * 闪存通常作为电子设备的储存介质
* [CMOS](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%A3%9C%E5%BC%8F%E9%87%91%E5%B1%AC%E6%B0%A7%E5%8C%96%E7%89%A9%E5%8D%8A%E5%B0%8E%E9%AB%94)（Complementary Metal-Oxide-Semiconductor）
    * 易失（volatile）储存器
    * CMOS保存电脑当前时间日期，以及一些配置参数（例如启动顺序）
    * CMOS由单独的电池供电

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_9.png)

## Disks

磁盘（magnetic disk / hard disk）很便宜，但是比内存慢多了

机械硬盘内部长这样：

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_10.png)

机械硬盘的特点：
* 转速：5400, 7200, 10800 RPM
* 磁道（track）：是盘片上的环形区域（annular region）
* 柱面（cylinder）：当前磁盘臂位置的所有磁道的集合
* 扇区（sector）：从磁道划分而来，通常扇区大小为512bytes

固态硬盘（SSD -> Solid State Disk）的特点：
* 数据储存在闪存
* 没有机械结构

## I/O Devices

I/O设备由两部分组成，分别是设备控制器和设备本身

操作系统通过驱动（device driver）跟设备控制器交互

I/O的方式有三种：
* 忙等待（busy waiting）
    * 发出system call调用设备，然后循环检查是否完成
    * 缺点：占据CPU直到I/O完成
* 中断（interrupt）
    * 设备驱动器通知设备控制器
    * 设备控制器启动对应设备
    * 设备控制器在I/O完成后向中断控制器发信号
    * 中断控制器接收信号后，告知CPU，并把设备编号放到总线上
    * CPU决定处理中断，把程序计数器和PSW压栈，CPU切换到内核模式
    * 通过[中断向量](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%B7%E5%90%91%E9%87%8F)（interrupt vector）寻找中断处理程序的地址
    * 开始执行中断处理程序，取走刚刚入栈的程序计数器和PSW，然后查询设备状态
    * 中断处理完成后，返回到用户程序第一条未执行指令
* DMA（Direct Memory Access）
    * 无需CPU干预
    * 处理完成后会引发中断

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_11.png)

## Buses

[总线](https://zh.wikipedia.org/wiki/%E6%80%BB%E7%BA%BF)（Bus）是计算机组件交换数据的方式

大型x86系统结构如下所示：

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_12.png)

几种不同的总线（最下面是最新的技术）：
* [ISA](https://zh.wikipedia.org/wiki/%E5%B7%A5%E4%B8%9A%E6%A0%87%E5%87%86%E7%BB%93%E6%9E%84) (Industry Standard Architecture)
* [PCI](https://zh.wikipedia.org/wiki/%E5%A4%96%E8%AE%BE%E7%BB%84%E4%BB%B6%E4%BA%92%E8%BF%9E%E6%A0%87%E5%87%86) (Peripheral Component Interconnect)
* [PCIe](https://zh.wikipedia.org/wiki/PCI_Express) (Peripheral Component Interconnect Express)

几种总线架构
* 共享总线架构（shared bus architecture）
    * 多设备用同一条线传输数据
    * 例子：ISA, PCI
* 并行总线架构（shared bus architecture）
    * 一次可以发送多位数据
    * 例子：ISA, PCI
* 串行总线架构（serial bus architecture）
    * 通过单个数据通路（lane）发送所有数据
    * 跟并行总线架构相比，无需保证数据同时到达
    * 例子：PCIe

[DMI](https://zh.wikipedia.org/wiki/%E7%9B%B4%E6%8E%A5%E5%AA%92%E9%AB%94%E4%BB%8B%E9%9D%A2) (Direct Media Interface)：连接[南桥芯片](https://zh.wikipedia.org/wiki/%E5%8D%97%E6%A1%A5)（Southbridge）和[北桥芯片](https://zh.wikipedia.org/wiki/%E5%8C%97%E6%A1%A5)（Northbridge）

USB (Universal Serial Bus)
* 最初是为了连接慢速I/O设备，例如鼠标键盘
* USB 1.0 -> 12 Mbps
* USB 2.0 -> 480 Mbps
* USB 3.0 -> 5 Gbps

[SCSI](https://zh.wikipedia.org/wiki/%E5%B0%8F%E5%9E%8B%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%8F%A3) (Small Computer System Interface)
* 跟周边设备（例如：硬盘、软驱、光驱、打印机、扫描仪等）通信
* 通常在服务器和工作站能看到
* 传输速率：640 MB/s

即插即用（plug and play）
* 系统自动收集I/O设备信息
* 集中赋予中断级别和I/O地址

## Booting the Computer

BIOS (Basic Input Output System)
* 在主板（motherboard）上
* 包含一些低级I/O软件（例如：读取键盘，写屏幕）
* 储存在闪存（flash RAM）中
* 操作系统可以更新BIOS

计算机启动过程：
* BIOS开始运行
* 通过扫描各类总线，检测安装的内存数量，以及各类基本设备和外设
* 根据CMOS中的设备清单来决定启动的设备（从光驱，硬盘，USB）
* 启动设备的第一个扇区被读入内存执行，然后找出活动的（active）分区
* 从该分区读取第二个启动装载模块（bootloader）
* 这个bootloader从活动分区读取并启动操作系统
* 操作系统检查硬件是否都有驱动程序，然后把驱动程序载入内核
* 初始化分页表，创建一系列后台进程，启动GUI

# The Operating System Zoo

## Mainframe Operating Systems

大型机操作系统主要提供三类服务：
* 批处理（batch）
    * 处理无需人工干预的周期性任务（processes routine jobs without any interactive user present）
* 事务处理（transaction processing）
    * 处理大量的小型请求（handle large numbers of small requests）
* 分时（timesharing）
    * 允许多个远程用户同时使用（allow multiple remote users to run jobs）

## Server Operating Systems

服务器操作系统通常在作为服务器的PC，工作站，以及大型机跑

典型的服务器操作系统有：Solaris, FreeBSD, Linux, Windows Server 201x

## Multiprocessor Operating Systems

多处理器操作系统可以整合大量算力，可以细分为：parallel computers, multicomputers, multiprocessors

## Personal Computer Operating Systems

常用的个人电脑操作系统：
* Linux
* FreeBSD
* Windows 7/8/10
* OS X

## Handheld Computer Operating Systems

掌上计算机，又称为PDA (Personal Digital Assistant)，例如：手机，平板

目前掌上计算机操作系统有：Android, iOS

## Embedded Operating Systems

嵌入式操作系统一般是在控制设备的计算机允许，通常不允许安装软件

嵌入式例子：微波炉，汽车，MP3播放器等等

常见的嵌入式操作系统：
* 嵌入式Linux
* QNX
* VxWorks

## Sensor-Node Operating Systems

传感器节点操作系统有多种用途，例如保卫国界，降水测量，森林火灾探测等等

常见的传感器节点操作系统：TinyOS

## Real-Time Operating Systems

实时操作系统分两类：
* 硬实时系统（hard real-time system）
    * 必须在限定时间内进行操作
    * 通常用于工控领域，民航领域等等
* 软实时系统（soft real-time system）
    * 可以偶尔违反时限，并且不会带来严重后果
    * 通常用于数字音频，智能手机等等

实时操作系统这个分类，跟嵌入式系统和掌上计算机操作系统有一定的重叠

常见的实时操作系统：[eCos](https://zh.wikipedia.org/wiki/ECOS)

## Smart Card Operating Systems

智能卡操作系统跑在信用卡大小的卡片上

两种主要供电方式：
* 直接接触读卡器供电（contacts in the reader）
* 接近读卡器，感应供电（inductively powered）

部分智能卡使用了Java，因此带有Java虚拟机（JVM）

# Operating System Concepts

## Processes

进程（Processes）-> 正在执行的程序

地址空间（address space）
* 进程可以进行读写的地方
* 包含可执行程序，程序数据，堆栈（stack）

进程表（process table）
* 储存了所有进程的信息
* 通常是数组或者链表结构

挂机的进程（suspended process）包括：
* 地址空间，又叫磁芯映像 / 核心映像（core image）
* 对应的进程表项

[进程树](https://zh.wikipedia.org/wiki/%E8%BF%9B%E7%A8%8B%E6%A0%91)（process tree）
* [父进程](https://zh.wikipedia.org/wiki/%E7%88%B6%E8%BF%9B%E7%A8%8B)（parent process）
* [子进程](https://zh.wikipedia.org/wiki/%E5%AD%90%E8%BF%9B%E7%A8%8B)（child process）
* [进程间通信](https://zh.wikipedia.org/wiki/%E8%A1%8C%E7%A8%8B%E9%96%93%E9%80%9A%E8%A8%8A)（interprocess communication）

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_13.png)

UID (User IDentification)
* 每个用户都有一个UID
* 同一用户启动的所有进程都会有相同的UID
* 子进程的UID跟父进程一样
* superuser(UNIX) / Administrator(Windows)
    * 作为系统的超级用户或管理员，拥有很高的权限，可以无视很多规则

GID (Group IDentification)
* 用户可以是组员
* 每个组都有一个GID

## Address Spaces

内存地址是32位或者64位

如果内存超了，操作系统会调用虚拟内存（virtual memory）

## Files

目录（directory）-> 可以把文件分组存放

根目录（root directory）-> 目录的顶部

路径名（path name）
* 绝对路径（absolute path）
* 相对路径（relative path）
* 路径有两种写法：
    * / (slash, UNIX)
    * \ (backslash, Windows)

工作目录（working directory）-> 进程工作的目录，可以被改变

尝试打开文件：
* 如果允许访问，会返回文件描述符（file descriptor），是一个小整数
* 如果拒绝访问，会返回错误码

挂载（mount）机制 (UNIX)
* 可以把外部的文件数接到根文件系统上（root file system）
* 下图是挂载CD-ROM

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_15.png)

特殊文件（special file）
* UNIX一切皆文件
* block special files（例如：磁盘）
* character special files（例如：打印机，调制器等）
* 特殊文件保存在/dev
    * 例如：/dev/lp是打印机

管道（pipe）
* 用于连接两个进程
* 进程A把管道当成普通的输出文件
* 进程B把管道当成普通的输入文件

## Input/Output

常见I/O设备有：键鼠，显示器，打印机等等

## Protection

rwx bits
* r -> read = 4
* w -> write = 2
* x -> execute = 1
* rwxr-x--x = 751 -> owner rwx, other group rx, everyone else x

## The Shell

提示符（prompt）

Shell有很多种：sh, csh, ksh, bash

标准输出重定向【>】（stdout redirect）：date > file

标准输入重定向【<】（stdin redirect）：sor t < file1 > file2

管道【|】（pipe）：cat file1 file2 file3 | sort > /dev/lp

不等待执行结束【&】（give prompt immediately）：cat file1 file2 file3 | sort > /dev/lp &

## Ontogeny Recapitulates Phylogeny

标题一个词都不认识哎。。。
* Ontogeny -> 个体发生学
* Recapitulates -> 重复（(BIOLOGY) repeat (an evolutionary or other process) during development and growth）
* Phylogeny -> 系统发育学
* 标题意思：个体重复系统发育
* 人话：新的产品种类总是容易重蹈覆辙

核心观点：当前过时的东西，过几年因为技术的发展可能又在新的产品种类上复活了
* 解释器（interpreter） vs. 直接执行（direct execution）
* 汇编 vs. 高级语言
* 单道程序处理（monoprogramming） vs. 多道程序处理（multiprogramming）

# System Calls

count = read(fd, buffer, nbytes);
* fd -> 指定文件
* buffer -> 指向缓冲区
* nbytes -> 要读的字节数
* count -> 实际读到的字节数，由系统调用返回。如果出错，count = -1

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_17.png)

POSIX大约有100个过程调用（procedure calls），绝大部分POSIX过程都会触发系统调用

下面是一些主要的POSIX系统调用

| Process management                    |                                                |
|---------------------------------------|------------------------------------------------|
| Call                                  | Description                                    |
| pid = fork()                          | Create a child process identical to the parent |
| pid = waitpid(pid, &statloc, options) | Wait for a child to terminate                  |
| s = execve(name, argv, environp)      | Replace a process’ core image                  |
| exit(status)                          | Terminate process execution and return status  |

| File management                      |                                           |
|--------------------------------------|-------------------------------------------|
| Call                                 | Description                               |
| fd = open(file, how, ...)            | Open a file for reading, writing, or both |
| s = close(fd)                        | Close an open file                        |
| n = read(fd, buffer, nbytes)         | Read data from a file into a buffer       |
| n = write(fd, buffer, nbytes)        | Write data from a buffer into a file      |
| position = lseek(fd, offset, whence) | Move the file pointer                     |
| s = stat(name, &buf)                 | Get a file’s status information           |

| Directory- and file-system management |                                               |
|---------------------------------------|-----------------------------------------------|
| Call                                  | Description                                   |
| s = mkdir(name, mode)                 | Create a new directory                        |
| s = rmdir(name)                       | Remove an empty directory                     |
| s = link(name1, name2)                | Create a new entry, name2, pointing to name1  |
| s = unlink(name)                      | Remove a directory entry                      |
| s = mount(special, name, flag)        | Mount a file system                           |
| s = umount(special)                   | Unmount a file system                         |

| Miscellaneous            |                                         |
|--------------------------|-----------------------------------------|
| Call                     | Description                             |
| s = chdir(dirname)       | Change the working directory            |
| s = chmod(name, mode)    | Change a file’s protection bits         |
| s = kill(pid, signal)    | Send a signal to a process              |
| seconds = time(&seconds) | Get the elapsed time since Jan. 1, 1970 |

## System Calls for Process Management

Fork
* 是在POSIX中创建进程的唯一途径
* 子进程在创建的时候跟父进程一模一样
* 任何后续变化都不会互相影响
* Fork的返回值，在子进程中是0，在父进程中等于子进程的PID (Process IDentifier)。这也是区分父进程和子进程的方法。

waitpid
* 等待任意一个子进程终止
* 可以指定等待特定的子进程，或者是等待老的子进程（参数pid = -1）
* waitpid完成时，statloc会被赋值为子进程的退出状态（exit status）

execve（exec）
* 参数
    * name -> the name of the file to be executed
    * argv -> a pointer to the argument array
    * environp -> a pointer to the environment array
* 替换进程的核心映像（core image）
* 变种（可以忽略或者指定参数）：execl, execv, execle

exit
* 进程终止执行时使用
* exit status范围是0-255（通过waitpid中的statloc返回给父进程）

下面是一个高度简化的shell，用以说明fork，waitpid和execve的使用

```cpp
#define TRUE 1
while (TRUE) {                              /* repeat forever */
    type_prompt();                          /* display prompt on the screen */
    read_command(command, parameters);      /* read input from terminal */
    if (fork() != 0) {                      /* fork off child process */
        /* Parent code. */
        waitpid(−1, &status, 0);            /* wait for child to exit */
    } else {
        /* Child code. */
        execve(command, parameters, 0);     /* execute command */
    }
}
```

下面是cp命令的过程展示

```bash
cp file1 file2
```
* shell会fork出一个子进程
* 子进程找到，执行cp并传入参数
* cp程序的入口是main(argc, argv, envp)
    * argc(=3) -> 在命令行上，包括程序名字在内的参数数量
    * argv -> 指向数组的指针（a pointer to an array）
        * argv[0] -> "cp"
        * argv[1] -> "file1"
        * argv[2] -> "file2"
    * envp -> 指向环境的指针（a pointer to the environment）
        * an array of strings (name = value)
        * 用来传入各种环境变量（environment variables）
            * 例如：terminal type, home directory name
            * 如果什么都不传入，那envp = 0

UNIX进程的内存被分为三部分：
* 正文段（text segment）
* 数据段（data segment）
    * 向上增长（grows upward）
* 堆栈段（segment segment）
    * 向下增长（grows downward）

使用malloc可以动态分配内存

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_20.png)

## System Calls for File Management

open
* 想要读写文件，必须先打开文件
* open参数：
    * file -> absolute path / relative path
    * how
        * O_RDONLY -> read
        * O_WRONLY -> write
        * O_RDWR -> read and write
        * O_CREAT -> create
* 返回的file descriptor可以进行读写操作
* 最后需要使用close关闭文件

read & write
* fd, buffer, nbytes
* 返回实际字节数。如果出错，返回-1

Lseek
* 移动文件指针
* lseek参数：
    * fd -> file descriptor
    * offset -> file position
    * whence -> position type
        * 相对文件开头
        * 当前位置
        * 相对文件末尾
* 返回指针移动后，在文件中的绝对位置

stat
* 获取文件相关信息
    * 文件类型（普通文件，特殊文件，目录等）
    * 大小
    * 最后修改时间
    * 若干其它信息

## System Calls for Directory Management

mkdir -> 创建空目录

rmdir -> 删除空目录

link（链接）
* 创建一个同步的链接，用以共享文件
* 两个路径都指向同一个文件
* i-nodes表记载了文件的相关信息
* i-number是i-nodes的引用，UNIX通过i-number来标识文件
* link的本质就是，创建新目录，但是使用原有文件的i-number

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_21.png)

mount（挂载）
* 用于合并两个文件系统
* 例子：mount("/dev/sdb0", "/mnt", 0);
* 取消挂载使用umount

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_22.png)

## Miscellaneous System Calls

chdir
* 改变当前工作目录
* 例子：chdir("/usr/ast/test");

chmod
* 改变文件权限 / 保护模式
* 例子：chmod("file", 0644);

## The Windows Win32 API

Windows和UNIX的编程模式（programming model）不同：
* UNIX是系统调用（system call）
* Windows是事件驱动（event driven）

Win32 API
* 包含数千个调用
* 部分会触发系统调用，也有一些是在用户空间执行
* 可以管理窗口，图形，文本，字体，滚动条，对话框，菜单等等

下面是一些UNIX系统调用对应的Win32 API

| UNIX    | Win32               | Description                                        |
|---------|---------------------|----------------------------------------------------|
| fork    | CreateProcess       | Create a new process                               |
| waitpid | WaitForSingleObject | Can wait for a process to exit                     |
| execve  | (none)              | CreateProcess = fork + execve                      |
| exit    | ExitProcess         | Terminate execution                                |
| open    | CreateFile          | Create a file or open an existing file             |
| close   | CloseHandle         | Close a file                                       |
| read    | ReadFile            | Read data from a file                              |
| write   | WriteFile           | Write data to a file                               |
| lseek   | SetFilePointer      | Move the file pointer                              |
| stat    | GetFileAttributesEx | Get various file attributes                        |
| mkdir   | CreateDirectory     | Create a new directory                             |
| rmdir   | RemoveDirectory     | Remove an empty directory                          |
| link    | (none)              | Win32 does not support links                       |
| unlink  | DeleteFile          | Destroy an existing file                           |
| mount   | (none)              | Win32 does not support mount                       |
| umount  | (none)              | Win32 does not support mount, so no umount         |
| chdir   | SetCurrentDirectory | Change the current working directory               |
| chmod   | (none)              | Win32 does not support security (although NT does) |
| kill    | (none)              | Win32 does not support signals                     |
| time    | GetLocalTime        | Get the current time                               |

CreateProcess -> Windows有进程层次，但并非是关系较强的父子链，创建进程后两者是平等的

# Operating System Structure

## Monolithic Systems

单体系统（Monolithic System）
* 整个操作系统在内核态以单一程序的方式运行
* 可以高效的任意调用procedure
* 任意一个procedure出问题，整个系统就会崩溃
* 基本结构如下：
    * main procedure
    * service procedure
    * utility procedure
* 系统支持载入扩展（extension）
    * 共享库（shared library, UNIX）
    * 动态链接库（DLL -> Dynamic-Link Library, Windows）

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_24.png)

## Layered Systems

THE系统是首个层次式系统（Layered System）
* 1968年，由E. W. Dijkstra在Technische Hogeschool Eindhoven搭建
* 是为荷兰的计算机Electrologica X8设计的批处理系统
* 上层无需关心底层的实现

THE系统的层次如下：

| Layer | Function                                  |
|-------|-------------------------------------------|
| 5     | The operator                              |
| 4     | User programs                             |
| 3     | Input/output management                   |
| 2     | Operator-process communication            |
| 1     | Memory and drum management                |
| 0     | Processor allocation and multiprogramming |

## Microkernels

微内核（Microkernel）
* 把操作系统分成若干模块
* 只有微内核运行在内核态，其它模块作为用户进程运行
* 模块崩溃不会造成整个系统的崩溃
* 常见的现代操作系统只有OS X使用微内核（Mach microkernel）
* 微内核因为高度可靠，常见于实时、工业、航天、军事等领域
* 常见的微内核有：Integrity, K42, L4, PikeOS, QNX, Symbian, MINIX 3

MINIX 3的微内核由12000行左右的C代码和1400行左右的汇编（用于捕获中断，切换进程等）构成

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_26.png)

MINIX处于用户态的层次：
* device drivers
    * 没有I/O的物理访问权
    * 使用kernel call来让内核代为完成I/O行为
* servers
    * 能够完成操作系统的多数工作
    * 再生服务器（reincarnation server）
        * 负责检查其它servers和drivers是否正常工作
        * 如果发现错误，会自行修复，无需用户干预
* user programs
    * 需要给servers发送短消息请求POSIX系统调用

## Client-Server Model

客户端（client）构造消息，发给服务端（server），服务端完成工作并发送回应。例如：客户端请求Web页面，服务端返回对应的页面数据。

## Virtual Machines

虚拟机在本书的第七章[Virtualization and the Cloud](https://oscarcx123.github.io/%E6%8A%80%E6%9C%AF/virtualization-and-the-cloud.html)有做详细介绍

CMS (Conversational Monitor System) -> a single-user, interactive
system

### The Java Virtual Machine

JVM (Java Virtual Machine)
* Java编译器为JVM生成代码
* 有JVM解释器的地方，就能执行代码
* 代码在保护环境下隔离执行，不会造成破坏

## Exokernels

[外核](https://zh.wikipedia.org/wiki/Exokernel)（exokernel）
* 负责给虚拟机分配独占的资源（每个虚拟机仅获得一部分资源）
* 省去了一层映射

# The World According to C

## The C Language

显式指针（explicit pointer）
* 指针是指向（包含对象的地址）一个变量或数据结构的变量
* 理论上，指针是有类型的

```c++
char c1, c2, *p;
c1 = 'c';
p = &c1;    /* 把c1的地址赋值给指针变量p */
c2 = *p;    /* 把p指向的变量（c1）的内容赋值给c2 */
/* 此时c2 == 'c' */
```

C语言没有内建字符串（string）、线程（thread）、包（package）、类（class）、对象（object）、类型安全（type safety）、垃圾回收（garbage collection）等

## Header Files

* .c -> 代码文件
* .h -> 头文件

头文件可以声明和定义很多东西，也可以使用一些简单的宏（macros）

```c++
#define BUFFER_SIZE 4096
/* 程序中所有的BUFFER_SIZE在编译时都会自动替换为4096 */
```

```c++
/* macros可以带参数 */
#define max(a, b) (a > b ? a : b)
/* i = max(j, k+1)在代码中等价于i = (j > k+1 ? j : k+1) */
```

```c++
/* macros可以带条件 */
#ifdef X86
intel_int_ack();
#endif
/* 如果X86有定义，就调用intel_int_ack() */
```

## Large Programming Projects

C程序编译过程：
* C预处理器（C preprocessor）
    * 处理#include，把内容都加入代码里，然后把结果传给C编译器
* 通过C编译器生成.o文件（object file）
    * object file包含了目标机器的二进制指令
* linker把object file组合成一个单一的可执行程序（.out文件）
    * 任何调用的库（library）在此阶段会被包含进去

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_30.png)

make (UNIX)
* 可以读入Makefile
* Makefile写明了文件依赖关系
* 通过检查object file的变动来决定是否重新编译