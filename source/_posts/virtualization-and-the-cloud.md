---
title: Virtualization and the Cloud
categories:
  - 技术
tags:
  - Virtualization
  - VMWare
date: 2020-03-01 17:09:25
permalink: 
---
自学了Modern Operating Systems 4e的第七章Virtualization and the Cloud，顺手就整理了笔记。

# Introduction
[虚拟机监视器](https://zh.wikipedia.org/wiki/Hypervisor)（VMM -> Virtual Machine Monitor / hypervisor）在同一物理硬件上虚拟出多个机器

[虚拟化](https://zh.wikipedia.org/wiki/%E8%99%9B%E6%93%AC%E5%8C%96)（Virtualization）可以让一台计算机同时跑几个虚拟机，并且操作系统可以互不相同

虚拟机好处：
* 省钱
* 设置检查点（checkpoint，俗称快照）和迁移都更容易
* 运行老旧的应用
* 软件开发的多环境测试（多系统共存比虚拟机麻烦多了）
    * 原书中说法不准确（原文：First of all, standard PCs support only four primary disk partitions, no matter how big the disk is.）
    * [MBR](https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%BC%95%E5%AF%BC%E8%AE%B0%E5%BD%95)（Master Boot Recorder）最多支持四个主分区
    * [GPT](https://zh.wikipedia.org/wiki/GUID%E7%A3%81%E7%A2%9F%E5%88%86%E5%89%B2%E8%A1%A8)（GUID Partition Table）的主分区几乎没有上限，是目前主流的分区表

云（cloud）的中心思想，就是把自身的计算或储存需求外包给专业的公司

# History

## IBM

[SIMMON](https://en.wikipedia.org/wiki/SIMMON)（1960s）

[CP-40](https://en.wikipedia.org/wiki/IBM_CP-40)（1960s） -> [CP-67](https://en.wikipedia.org/wiki/CP-67) -> [CP/CMS](https://en.wikipedia.org/wiki/CP/CMS)（for IBM System/360 Model 67） -> [VM/370](https://en.wikipedia.org/wiki/VM_(operating_system))（for [System/370](https://en.wikipedia.org/wiki/IBM_System/370) in 1972, later replaced by [System/390](https://en.wikipedia.org/wiki/IBM_System/390) in 1990s）

IBM很早就支持虚拟化，但是虚拟化一直到1999年才受到大量关注

## VMWare

1999年，[VMWare](https://zh.wikipedia.org/wiki/VMware)提出了第一个x86的虚拟化解决方案

## 其它产品

[Xen](https://zh.wikipedia.org/wiki/Xen), [KVM](https://zh.wikipedia.org/wiki/%E5%9F%BA%E4%BA%8E%E5%86%85%E6%A0%B8%E7%9A%84%E8%99%9A%E6%8B%9F%E6%9C%BA), [VirtualBox](https://zh.wikipedia.org/wiki/VirtualBox), [Hyper-V](https://en.wikipedia.org/wiki/Hyper-V), [Parallels](https://en.wikipedia.org/wiki/Parallels_Desktop_for_Mac)

# Requirements for virtualization

hypervisor的几个要点：
* 安全性（Safety）: 完全掌控虚拟化的资源
    * 使用解释器（interpreter），例如Bochs
* 保真性（Fidelity）: 虚拟机中的表现应该与实机的表现一致
    * [Popek and Goldberg virtualization requirements](https://zh.wikipedia.org/wiki/%E6%B3%A2%E4%BD%A9%E5%85%8B%E4%B8%8E%E6%88%88%E5%BE%B7%E5%A0%A1%E8%99%9A%E6%8B%9F%E5%8C%96%E9%9C%80%E6%B1%82)
    * 敏感指令（sensitive instructions）
        * 控制敏感指令：试图改变系统资源配置的指令
        * 行为敏感指令：其行为或结果取决于资源配置状态（如重定位寄存器的内容或处理器所处模式）的指令
        * 例如：I/O, change the [MMU](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%8D%95%E5%85%83) / memory management unit settings
    * 特权指令（privileged instructions）
        * 当处理器处于用户态时[自陷](https://en.wikipedia.org/wiki/Trap_(computing))，处于内核态时不自陷的指令
    * 用人话来说：if you try to do something in user mode that you should not be doing in user mode, the hardware should trap
        * IBM/370符合此特性，但是Intel 386不符合
        * 2005年，Intel和AMD在CPU中引入了虚拟化
            * Intel -> VT (Virtualization Technology)
            * AMD -> SVM (Secure Virtual Machine)
        * [陷入并模拟](https://stackoverflow.com/questions/20388156/what-is-meant-by-trap-and-emulate-virtualization)（trap-and-emulate）的虚拟机方法成为可能
        * 2005年以前的x86虚拟化（例如VMWare的解决方案），是通过对Guest OS中的代码进行实时的[二进制翻译](https://zh.wikipedia.org/wiki/%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%BF%BB%E8%AF%91)（binary translation）来规避一些特权指令的
* 高效性（Efficiency）: 大部分虚拟机中的代码不应该被hypervisor干涉

虚拟化的不同形态：
* [半虚拟化](https://en.wikipedia.org/wiki/Paravirtualization)（paravirtualization）
    * [虚拟化调用](https://www.cnblogs.com/echo1937/p/7227385.html)（hypercalls） -> 向Guest OS提供了一套“系统调用”
    * 实际上可以看作对Guest OS提供了一套API (Application Programming Interface) 
    * 让Guest OS知道自己在虚拟机上跑（非ring0状态），一些特权指令就会修改成跟VMM约定好的其它方式，因此Guest OS需要针对hypervisor做出一定的更改
    * 没有捕获异常、翻译、模拟，性能损耗很低
* [全虚拟化](https://zh.wikipedia.org/wiki/%E5%85%A8%E8%99%9A%E6%8B%9F%E5%8C%96)（full virtualization）
    * 任何可以运行在裸机上的软件（通常是操作系统）都可以未经修改地运行在虚拟机中

虚拟化的不同思路：
* full system virtualization
* process-level virtualization
    * [WINE](https://zh.wikipedia.org/wiki/Wine)
        * 在各种类Unix系统系统运行Windows程序，例如Linux，BSD，和OS X
    * [QEMU](https://zh.wikipedia.org/wiki/QEMU)
        * 为一种架构编译的程序在另外一种架构上面运行

# Type 1 and type 2 hypervisors

Guest OS -> 在hypervisor上运行的系统

Host OS -> 直接在硬件上运行的系统

* Type 1 Hypervisors
    * 跟操作系统相似（the only program running in the most privileged mode）
* Type 2 Hypervisors（hosted hypervisors）
    * 跟普通程序相似（靠Host OS调度资源）
    * VMware Workstations -> 第一个x86的type 2 hypervisor
    * 初次启动的表现就跟一台全新的电脑一样，会去寻找装有OS的DVD / USB / CD-ROM（当然都可以是虚拟设备）
    * 操作系统会被安装到[虚拟磁盘](https://en.wikipedia.org/wiki/Virtual_disk_and_virtual_drive)（virtual disk），本质上只是Host OS上的一个文件

![Type 1 & Type 2 Hypervisors](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/hypervisor%20type.png)

下面总结一下各种虚拟化方案对应的例子

| Virtualizaton method              | Type 1 hypervisor     | Type 2 hypervisor             |
|-----------------------------------|-----------------------|-------------------------------|
| Virtualization without HW support | ESX Server 1.0        | VMware Workstation 1          |
| Paravirtualization                | Xen 1.0               |                               |
| Virtualization with HW support    | vSphere, Xen, Hyper-V | VMware Fusion, KVM, Parallels |
| Process virtualization            |                       | Wine                          |

# Techniques for Efficient Virtualization

## Type 1 hypervisor

Virtual kernel mode

* 虚拟机以用户模式（user mode）运行，因此不允许执行敏感指令
* 虚拟机内的操作系统以为自己运行在内核模式（kernel mode）
* 虚拟机内的用户进程认为自己运行在用户模式（然而确实就是用户模式）
* 当Guest OS尝试执行敏感指令：
    * 不带VT的CPU
        * 执行失败，系统崩溃
    * 带VT的CPU
        * trap to the hypervisor
        * hypervisor会检查指令发出者是Guest OS还是普通用户进程
        * 如果由Guest OS发出，那么会模拟真实硬件的反馈
        * 如果由普通用户进程发出，那么会安排执行的指示

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/virtual%20kernel%20mode.png)

## Virtualizing the Unvirtualizable

在VT出现之前，VMware通过利用binary translation和[protection rings](https://zh.wikipedia.org/wiki/%E5%88%86%E7%BA%A7%E4%BF%9D%E6%8A%A4%E5%9F%9F)来实现x86的hypervisor

x86支持4级的保护环（protection rings）

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/Priv_rings.png)

* Ring 3权力最小
    * 用户进程通常在此执行
    * 不能执行特权指令（privileged instructions）
* Ring 0权力最大
    * 内核通常在此运行
    * 可以执行任何指令
* Ring 1 & 2不被当今的OS使用
    * hypervisors可以自由使用它们
    * 例如：把Guest OS放到Ring 1

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/hypervisor%20and%20protection%20rings.png)

关于Guest OS内核的敏感指令：
* hypervisor会通过重写代码确保他们不再存在
* 一次重写一个[基本块](https://en.wikipedia.org/wiki/Basic_block)（basic block）
    * 只有一个[入口点](https://zh.wikipedia.org/wiki/%E5%85%A5%E5%8F%A3%E7%82%B9)（entry point）, 一个出口点
    * 没有jump，call，trap，return，或者其它改变控制流的指令
* 执行基本块之前，hypervisor会检查里面是否有敏感指令
    * 如果有就转交给hypervisor处理
* 翻译过的基本块（translated blocks）会被缓存，而且大部分代码都不含敏感指令，因此并不会造成很大的开销
* binary translator可以忽略全部用户进程，因为他们本来就运行在非特权模式下

在实际应用中，运行在Ring 1的操作系统代码会被全部翻译，因为binary translation的性能比trap好多了

虽然type 1跟type 2 hypervisor的差别很大，但是使用的技巧都是一样的。例如[VMware ESX Server](https://en.wikipedia.org/wiki/VMware_ESXi)（type 1）跟[VMware Workstation](https://en.wikipedia.org/wiki/VMware_Workstation)（type 2）所使用的binary translation是一样的。

现在大多数type 2 hypervisors都有一个在Ring 0中运行的内核模块，该模块允许它们使用特权指令来操纵硬件。

总结：hypervisor之所以能工作，是因为敏感指令都被替换掉，真正的硬件并不会执行这些敏感指令，hypervisor会拦截并模拟那些指令。

## The Cost of Virtualization

trap-and-emulate (with VT) vs. binary translation
* trap-and-emulate <- 硬件方法
    * 会生成大量的trap
    * trap的代价很大（they ruin CPU caches, TLBs, and branch prediction tables internal to the CPU）
* binary translation <- 软件方法
    * 敏感指令全部被calls to hypervisor procedures替换
    * 不会造成CPU的[环境切换](https://zh.wikipedia.org/wiki/%E4%B8%8A%E4%B8%8B%E6%96%87%E4%BA%A4%E6%8F%9B)（context switch）
* 因此，在一些情况下，软件方法的性能会比硬件方法的性能好

IF ([Interrupt Flag](https://en.wikipedia.org/wiki/Interrupt_flag))（中断标志）
* If flag = 1, maskable hardware interrupts（可屏蔽硬件中断）will be handled
* If cleared (flag = 0), such interrupts will be ignored
* 例如Guest OS使用了CLI instruction (clear interrupts)来禁用[硬件中断](https://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%B7)（hardware interrupt）：
    * 在一些架构上，这个指令的执行速度很慢
    * hypervisor会真的对Guest OS禁用，但是却不影响宿主机器
    * CLI会直接被替换成类似VirtualCPU.IF = 0的flag，从而减少执行开销

# Are Hypervisors Microkernels Done Right?

当我们移除了所有的敏感指令，通过hypercall来调用一些系统服务（例如：I/O），这时hypervisor实质上就已经变成了一个[微内核](https://zh.wikipedia.org/wiki/%E5%BE%AE%E5%85%A7%E6%A0%B8)（microkernel）

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_1_26.png)

全虚拟化跟半虚拟化的区别：
* 全虚拟化运行未修改的OS，遇到敏感指令会trap，hypervisor对指令进行模拟，然后返回结果
* 半虚拟化运行修改过的OS，没有敏感指令。但是如果需要进行I/O操作或者修改关键内部寄存器（critical internal registers），例如指向[分页表](https://zh.wikipedia.org/wiki/%E5%88%86%E9%A0%81%E8%A1%A8)（page table）的寄存器，那么就会直接使用hypervisor call来完成，跟System call比较类似

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_5.png)

VMI (Virtual Machine Interface)
* 跟硬件或者hypervisor进行交互的low-level layer
* 是通用的，不跟任何特定的硬件平台或者hypervisor绑定的中间层
* 解决了以下几个问题：
    * 修改过的Guest OS（把敏感指令替换成了hypercall）无法直接在硬件上工作，因为硬件并不知道如何处理hypercall
    * 市面上有很多hypervisor，例如VMware，Xen，Hyper-V等等，它们都有不完全一样的hypervisor API

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_6.png)

Paravirt-Ops (pv-ops)
* 一个跟VMI类似的实现
* 从Linux内核2.6.23开始就支持
* 由一众Linux开发供应商搞的，其中包括IBM，VMware，Xen，Red Hat

# Memory Virtualization

[虚拟内存](https://zh.wikipedia.org/wiki/%E8%99%9A%E6%8B%9F%E5%86%85%E5%AD%98)简介
* 现在的操作系统基本都支持
* 基本上是把虚拟地址空间中的页映射到物理内存的页
* 虚拟内存不仅用在虚拟化上，它能提高物理内存的使用效率
* 它使得应用程序认为它拥有连续可用的内存，而实际上，它通常是被分隔成多个物理内存碎片，还有部分暂时存储在外部磁盘存储器上，在需要时进行数据交换

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/VirtualMem01.png)

虚拟化的内存管理比较复杂，用以下场景为例：
* Guest OS 1要把7，4，3虚拟页映射到10，11，12物理页
* 此时hypervisor可以直接把10，11，12物理页分配给Guest OS 1
* Guest OS 2要把4，5，6虚拟页映射到10，11，12物理页
* 此时hypervisor无法再执行对应任务，因为10，11，12物理页已经被Guest OS 1占用
* 所以hypervisor会寻找一些空闲的页，例如20，21，22物理页，然后映射给Guest OS 2，所以实际关系如下：
    * Guest OS 2的4，5，6虚拟页（guest virtual addresses）
    * Guest OS 2认为的10，11，12物理页（guest physical addresses）
    * 实际的20，21，22物理页（host physical addresses / machine physical addresses）
* 为了达成上面所述功能，hypervisor会为每个虚拟机创建[shadow page table](https://en.wikipedia.org/wiki/Shadow_table)，从而把虚拟机中的虚拟页映射到实际物理页
* 如果Guest OS修改了分页表，hypervisor也必须要更改对应的shadow page table
* 但是Guest OS可以直接通过写内存来更改分页表，而且不需要执行敏感指令，因此hypervisor并不会知道此事

hypervisor有两种方法得知Guest OS是否修改分页表：
* 方法一：hypervisor去关注追踪Guest OS分页表
    * hypervisor可以在Guest OS第一次尝试加载指向top-level分页表的硬件寄存器的时候获取信息，因为这个是敏感操作
    * 然后hypervisor会把分页表设为只读，如果Guest OS尝试修改分页表，会出现[分页错误](https://en.wikipedia.org/wiki/Page_fault)（page fault）
    * 此时hypervisor会接管并分析Guest OS想干什么，然后就可以对应的去更新shadow page table
* 方法二：Guest OS尝试访问新映射的分页表时出错，被hypervisor捕获
    * hypervisor允许Guest OS任意添加新的映射关系，并且hypervisor压根不会知道增加了没
    * 当Guest OS尝试访问新映射的分页表时会出错，此时控制权移交给hypervisor
    * hypervisor会检查是否有新的映射关系需要添加到shadow page table，如果有那就添加并重新执行刚刚出错的指令
    * 如果Guest OS尝试删除分页表的映射关系，hypervisor会直接截获[INVLPG](https://docs.microsoft.com/en-us/cpp/intrinsics/invlpg)（Invalidate TLB Entries）指令，然后更新shadow page table

分页错误可以分成两类：
* guest-induced page faults -> 正常状况下由Guest OS上的程序造成的分页错误
* hypervisor-induced page faults -> 用来保证Guest OS的分页表和shadow page table保持同步

VM exit（hypervisor重获控制权）
* 记录VM exit的原因，这样hypervisor在接管后知道要做什么
* 记录Guest OS造成VM exit的指令
* 环境切换（context switch）
* 加载hypervisor的processor state
* hypervisor开始处理问题（例如分页错误）
* 处理完问题之后，还要把上述过程反过来执行一次
* 所以大家都尽量减少VM exit，因为处理开销太大了

如果用半虚拟化，就不用那么大费周章了，因为Guest OS会告诉hypervisor分页表的变化

## Hardware Support for Nested Page Tables

硬件级别的支持：
* Nested Page Tables (AMD)
* EPT / Extended Page Tables (Intel)

在带有EPT特性的CPU上：
* guest virtual address -> guest physical address（跟非虚拟化的表现一样）
* guest physical address -> host physical address（通过Extended Page Tables直接查找，无需软件干涉）
* 能够显著减少VM exit的次数
* memory reference的数量随着层次的深度呈二次方增长
* 切换虚拟机时，就像切换进程时改变映射一样

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_7.png)

## Reclaiming Memory

[Memory overcommitment](https://en.wikipedia.org/wiki/Memory_overcommitment)
* 全部虚拟机占用的内存看起来可以比实际的物理内存多
* 例如：在一台32GB内存的机器上开三个虚拟机，看起来各有16GB内存。
* 这些虚拟机可能不会把各自的内存占满
* 虚拟机也可能进行了deduplication。常见的例子是三个虚拟机之间共享Linux内核

那么hypervisor如何分配虚拟机占用的内存资源呢？
* 直接加多一层分页（简单粗暴，但是效率不高）
* [Memory ballooning](https://en.wikipedia.org/wiki/Memory_ballooning)
    * 在每个虚拟机中都会有一个balloon模块（作为pseudo device driver）跟hypervisor沟通
    * balloon模块可以根据hypervisor的指示去故意占用（充气）或者释放内存（放气）
    * 当balloon模块故意占用内存，Guest OS就会释放掉它认为最没价值的页面
    * 综上所述，hypervisor通过欺骗Guest OS来让Guest OS自行决定释放的内存

# I/O Virtualization

hypervisor充当物理设备（硬盘，打印机等）和Guest OS之间的传话筒

hypervisor会创建虚拟硬盘文件来解决Guest OS的读写问题

hypervisor还可以进行I/O指令的转换，例如让Guest OS以为使用的是[IDE](https://zh.wikipedia.org/wiki/%E9%AB%98%E6%8A%80%E8%A1%93%E9%85%8D%E7%BD%AE)(Integrated Drive Electronics)硬盘，并从IDE指令转换成新的硬盘指令，从而让旧软件可以在新硬件上面跑，这也是为什么当时IBM的VM/370那么受欢迎。

[virtual switch](https://en.wikipedia.org/wiki/Virtual_security_switch) -> software Ethernet switch with embedded security controls

## I/O MMUs

[直接内存访问](https://zh.wikipedia.org/wiki/%E7%9B%B4%E6%8E%A5%E8%A8%98%E6%86%B6%E9%AB%94%E5%AD%98%E5%8F%96)（DMA / Direct memory access）

[输入输出内存管理单元](https://zh.wikipedia.org/wiki/%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%8D%95%E5%85%83)（I/O MMU / Input–output memory management unit）
* 对I/O进行虚拟化，跟虚拟化内存一样
* 设备穿透（Device pass through）
	* 物理设备可以直接分配给虚拟机
* 设备隔离（Device isolation）
	* 确保分配给虚拟机的设备可以直接访问该虚拟机，并且不会损害其它Guest OS的完整性
* 中断重映射（interrupt remapping）
	* 确保设备产生的中断能够抵达对应的虚拟机
* 允许32位的设备访问4GB以上的内存

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/423px-MMU_and_IOMMU.png)

## Device Domains

有一个专门的虚拟机运行常规的OS，然后将其它虚拟机的I/O calls反射到这台虚拟机
* 提供给hypervisor的指令直接就是Guest OS的想法（例如：从disk 1读取block 1403，而不是一连串寄存器相关命令）
* 半虚拟化比较常用这个方法，例如Xen（专用虚拟机叫domain 0）

在I/O虚拟化方面，type 2 hypervisor比type 1 hypervisor更有优势：
* type 2 hypervisor的Host OS本身就带有一大堆设备驱动
* type 1 hyeprvisor要么自带设备驱动，要么从domain 0里头调用驱动

## Single Root I/O Virtualization

直接给虚拟机分配设备，拓展性会很差，因为有多少虚拟机就需要多少设备

[Single root I/O virtualization](https://en.wikipedia.org/wiki/Single-root_input/output_virtualization) (SR-IOV)
* [PCIe / PCI Express](https://zh.wikipedia.org/wiki/PCI_Express)设备支持的技术
* 让每个虚拟机都认为该设备是自己独占
* 支持SR-IOV的设备，给每个使用这个设备的虚拟机都提供独立的内存空间、中断、DMA stream
* SR-IOV设备看起来就像多个不同的设备，而且每个都能被对应的虚拟机配置
* SR-IOV设备提供两种访问方式：
	* PF (Physical Functions)
		* full PCIe functions
		* 设备可以随意被系统管理员配置
		* Guest OS无法访问PF
	* VF (Virtual Functions)
		* lightweight PCIe functions 
		* 只提供有限的配置
* 例如：Intel I350 series网卡就分别有八个发送和八个接收队列

# Virtual Appliances

[Virtual appliance](https://en.wikipedia.org/wiki/Virtual_appliance)
* 是预先配置好的虚拟机镜像，开箱即用
* 解决了软件发行的环境依赖问题
* 例如：Amazon's EC2 cloud就提供很多打包好的虚拟机镜像给用户使用（这就是SaaS模式）
* 跟docker比较类似，但是docker容器不是虚拟机

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/VM%20and%20docker%20comparison.png)

# Virtual Machines on Multicore CPUs

CPU可以在分配的时候拆分给多个虚拟机，例如一个四核CPU可以拆给32个虚拟机，此时可以看作32-node multicomputer

Deduplication
* 主要技术有这几种：
	* Disco <- parent page sharing（需要修改Guest OS）
	* VMware <- content-based page sharing（无需对OS进行任何修改）
* 基本过程如下：
	* 扫描虚拟机的memory page并计算hash
	* 如果一致，再检查他们是否真的完全一样
	* 确认一样，就创建一个page来储存实际内容，然后对应的生成指向这个page的引用（reference）
	* 如果有Guest OS修改了共享的page，那就使用写入时复制（copy on write / COW）技巧修改，从而复制一份专用副本（private copy）

# Licensing Issues

有些软件的许可证是按照CPU数量来发放的，因此有的发行商会明确禁止软件在虚拟机上运行

# Clouds

[Cloud Computing](https://zh.wikipedia.org/zh-cn/%E9%9B%B2%E7%AB%AF%E9%81%8B%E7%AE%97)的五大特征：
* On-demand self-service（随需应变自助服务）
	* Users should be able to provision resources automatically, without requiring human interaction.
* Broad network access（随时随地用任何网络设备访问）
	* All these resources should be available over the network via standard mechanisms so that heterogeneous devices can make use of them
* Resource pooling（多人共享资源池）
	* The computing resource owned by the provider should be pooled to serve multiple users and with the ability to assign and reassign resources dynamically. The users generally do not even know the exact location of "their" resources or even which country they are located in
* Rapid elasticity（快速重新部署灵活度）
	* It should be possible to acquire and release resources elastically, perhaps even automatically, to scale immediately with the users' demands
* Measured service（可被监控与量测的服务）
	* The cloud provider meters the resources used in a way that matches the type of service agreed upon

## Clouds as A Service

 * [IAAS](https://zh.wikipedia.org/zh-cn/%E5%9F%BA%E7%A4%8E%E8%A8%AD%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8B%99) (Infrastructure As A Service)
	* 提供处理、储存、网络以及各种基础运算资源
	* 例如：Amazon Web Services (AWS), Microsoft Azure, Digital Ocean, Google Compute Engine (GCE)
 * [PAAS](https://zh.wikipedia.org/wiki/%E5%B9%B3%E5%8F%B0%E5%8D%B3%E6%9C%8D%E5%8A%A1) (Platform As A Service)
	* 提供运算平台与解决方案服务
	* 提供的环境包括操作系统，Web服务器，数据库等等
	* 例如：Google App Engine, AWS Elastic Beanstalk, Heroku, OpenShift
 * [SAAS](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E5%8D%B3%E6%9C%8D%E5%8A%A1) (Software As A Service)
	* 通过网络使用软件
	* 例如：Microsoft Office 365, Google Apps, Salesforce

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/iaas-paas-saas-comparison.jpg)

## Virtual Machine Migration

[Live migration](https://en.wikipedia.org/wiki/Live_migration)
* pre-copy memory migration -> copy memory pages while the machine is still serving requests
* seamless live migration ->  downtime is not noticeable

## Checkpointing

利用copy on write (COW)技巧，我们可以得到虚拟机的快照

# Case Study: VMware

## The Early History of VMware

* 1997年，VMware未来的几个创始人在斯坦福造出了prototype hypervisor，叫Disco
* 1998年，VMware公司成立，目标是对x86架构进行虚拟化
* 1999年，VMware推出了32-bit x86虚拟化的解决方案
    * VMware Workstation for Linux（type 2 hypervisor）
    * VMware Workstation for Windows（type 2 hypervisor）
* 2001年，VMWare推出了第二个产品ESX Server（type 1 hypervisor）
	* ESX Server使用了VMware Workstation的虚拟化引擎
	* 能够直接在硬件上运行
	* 是第一个引入ballooning的产品
* 2002年，VMware推出了Virtual Center（现在叫vSphere）
	* Virtual Center是管理ESX Server的解决方案
	* 管理员可以直接控制上千个虚拟机
	* VMotion能够提供live migration

## VMware Workstation

VMware Workstation是第一个32-bit x86的虚拟化产品

x86产业可以拆解成四个板块：
* CPU：Intel & AMD
* 操作系统：Microsoft Windows & Open source Linux
* 设备制造商：例如I/O设备
* 系统集成商：电脑组装厂，例如Dell, HP等

## Challenges in Bringing Virtualization to the x86

x86虚拟化的核心特点有：
* Compatibility（兼容性）
	* users could run whichever OS without restrictions
* Performance（性能）
	* run relevant workloads at near native speeds
	* in worst case to run at the speed of then-current processors
* Isolation（隔离）
	* complete control of recourses

x86虚拟化的四大难关：
* The x86 architecture was not virtualizable（x86在当时被认为无法虚拟化）
* The x86 architecture was of daunting complexity（x86架构复杂度很高）
* x86 machines had diverse peripherals（各种外设跟硬件五花八门）
* Need for a simple user experience（用户体验需要做到开箱即用）

## VMware Workstation: Solution Overview

### Virtualizing the x86 Architecture

半虚拟化可以通过修改Guest OS来完美绕开所有坑，但是Windows系统不开源，没法改

全部采用动态二进制翻译（dynamic binary translation）也不靠谱，因为效率还是比较低低

解决方案： trap-and-emulate + dynamic binary translation
* trap-and-emulate（直接执行）在运行用户级别的程序时是完全没问题的，因为敏感指令本身就无法执行（例如POPF）
* dynamic binary translation作为fallback的解决方案，一旦有无法直接执行的就切换
* 使用哪个方法由decision algorithm决定
* 以下场景必须使用dynamic binary translation：
	* 虚拟机当前运行在内核模式（x86架构中的ring 0）
	* 虚拟机可以禁用中断以及发出I/O指令（when the I/O privilege level is set to the ring level）
	* 虚拟机当前运行在[实模式](https://zh.wikipedia.org/zh-cn/%E7%9C%9F%E5%AF%A6%E6%A8%A1%E5%BC%8F) (a legacy 16-bit execution mode used by the BIOS among other things)

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_8.png)

software fault isolation(SFI) -> ensure the integrity of the virtualization sandbox

VMware VMM使用的是基于硬件的沙盒方案：
* VMM保留最上面的4MB内存
* 剩下的内存（4GB - 4MB）给虚拟机
* 任何虚拟机指令都无法访问保留的内存

### A Guest Operating System Centric Strategy

由于x86架构过于复杂，初期的VMware Workstation只支持少数Guest OS：
* Linux
* Windows 3.1
* Windows 95/98
* Windows NT

随着VMware Workstation不断完善，后期无需特别适配即可支持一些系统，例如[MINIX 3](https://en.wikipedia.org/wiki/MINIX_3)

现在的主流Guest OS都不使用ring 1和ring 2，因此如果Guest OS尝试使用这两个ring，虚拟机会直接退出
* OS/2会使用ring 2，所以不被支持
* VMware VMM的二进制翻译器就运行在ring 1

### The Virtual Hardware Platform

虽然CPU种类有限，但是外设有一大堆，所以VMware不会去一一对应的适配全部外设，而是用一些通用的规范去匹配

虚拟化平台包括以下两个部分：
* [多路复用](https://zh.wikipedia.org/wiki/%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8)（Multiplexing）
    * 硬件可以直接被虚拟机使用
    * 硬件被多个虚拟机共享
    * 例如：每个虚拟机都以为自己有个独占的CPU和物理地址从0开始的内存
* 模拟（Emulation）
    * 前端 -> 虚拟机可见
    * 后端 -> 跟Host OS交互
    * 例如：储存设备
        * 前端：IDE controller & Buslogic Controller
        * 后端：virtual disk (file in Host OS)
    * hardware-independent encapsulation（硬件无关的封装）

### The Role of the Host Operating System

VMware Workstation作为type 2 hypervisor的两大优点：
* 只要Host OS有合适的驱动，虚拟机就能在上面跑
* 易用性强，就跟安装普通的软件一样

VMware Hosted Architecture
* 解决hypervisor在用户模式权限不足的问题
* VMX(Virtual Machine Extension)
    * 用户认为的VMware程序
    * 负责UI，启动虚拟机，模拟设备（front-end），向Host OS发起system calls等等
    * 一般每个虚拟机都有一个VMX
* VMX driver
    * 运行在内核模式
    * 通过暂时挂起整个Host OS来让VMM运行
    * 一个Host OS内只有一个VMX driver
* VMM(Virtual Machine Manager)
    * 负责多路复用CPU和内存：
        * exception handlers
        * trap-andemulate handlers
        * the binary translator
        * the shadow paging module
    * 每个虚拟机都有一个VMM实例，通常在虚拟机启动的时候被创建

所以，VMware Workstation看起来是在Host OS上运行（VMX确实是），实际上VMM是能够完全控制硬件的

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_10.png)

World switch
* changes the entire address space, all exception handlers, privileged registers, etc.
* takes only 45 x86 machine-language instructions to
execute

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_11.png)

## The Evolution of VMware Workstation

采用VMware Hosted Architecture的产品有：
* VMware Workstation
* VMware Player
* VMware Fusion（OSX作为Host OS）

## ESX Server: VMware's Type-1 Hypervisor

2001年，VMWare推出了ESX Server（type 1 hypervisor）
* VMware ESX Server和VMware Workstation的VMM在源码层面上几乎一样
* ESX hypervisor类似半个Host OS，因为它只需要能跑VMM实例就行了
* ESX Server包含若干子系统（subsystem），例如CPU调度器（CPU scheduler），内存管理器（memory manager），I/O子系统

![](https://raw.githubusercontent.com/oscarcx123/hexo_resource/master/img/OS_4e_fig_7_12.png)

ESX Server的优点：
* 性能（performance）
* 可伸缩性（scalability）
* 可管理性（manageability）

现在ESX Server已经变成了ESXi，成为了vSphere套件的重要组成部分