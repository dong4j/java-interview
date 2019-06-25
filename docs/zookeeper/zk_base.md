# Zookeeper 基础

相信大家对 ZooKeeper 应该不算陌生。但是你真的了解 ZooKeeper 是个什么东西吗？如果别人/面试官让你给他讲讲 ZooKeeper 是个什么东西，你能回答到什么地步呢？

我本人曾经使用过 ZooKeeper 作为 Dubbo 的注册中心，另外在搭建 solr 集群的时候，我使用到了 ZooKeeper 作为 solr 集群的管理工具。前几天，总结项目经验的时候，我突然问自己 ZooKeeper 到底是个什么东西？想了半天，脑海中只是简单的能浮现出几句话：“①Zookeeper 可以被用作注册中心。 ②Zookeeper 是 Hadoop 生态系统的一员；③构建 Zookeeper 集群的时候，使用的服务器最好是奇数台。” 可见，我对于 Zookeeper 的理解仅仅是停留在了表面。

所以，**通过本文，希望带大家稍微详细的了解一下 ZooKeeper 。如果没有学过 ZooKeeper ，那么本文将会是你进入 ZooKeeper 大门的垫脚砖。如果你已经接触过 ZooKeeper ，那么本文将带你回顾一下 ZooKeeper 的一些基础概念。**

最后，**本文只涉及 ZooKeeper 的一些概念，并不涉及 ZooKeeper 的使用以及 ZooKeeper 集群的搭建。** 网上有介绍 ZooKeeper 的使用以及搭建 ZooKeeper 集群的文章，大家有需要可以自行查阅。

## 一 什么是 ZooKeeper

### ZooKeeper 的由来

**下面这段内容摘自《从Paxos到Zookeeper 》第四章第一节的某段内容，推荐大家阅读以下：**

> Zookeeper最早起源于雅虎研究院的一个研究小组。在当时，研究人员发现，在雅虎内部很多大型系统基本都需要依赖一个类似的系统来进行分布式协调，但是这些系统往往都存在分布式单点问题。所以，**雅虎的开发人员就试图开发一个通用的无单点问题的分布式协调框架，以便让开发人员将精力集中在处理业务逻辑上。**
>
> 关于“ZooKeeper”这个项目的名字，其实也有一段趣闻。在立项初期，考虑到之前内部很多项目都是使用动物的名字来命名的（例如著名的Pig项目),雅虎的工程师希望给这个项目也取一个动物的名字。时任研究院的首席科学家RaghuRamakrishnan开玩笑地说：“在这样下去，我们这儿就变成动物园了！”此话一出，大家纷纷表示就叫动物园管理员吧一一一因为各个以动物命名的分布式组件放在一起，**雅虎的整个分布式系统看上去就像一个大型的动物园了，而Zookeeper正好要用来进行分布式环境的协调一一于是，Zookeeper的名字也就由此诞生了。**

### 1.1 ZooKeeper 概览

ZooKeeper 是一个开源的分布式协调服务，ZooKeeper框架最初是在“Yahoo!"上构建的，用于以简单而稳健的方式访问他们的应用程序。 后来，Apache ZooKeeper成为Hadoop，HBase和其他分布式框架使用的有组织服务的标准。 例如，Apache HBase使用ZooKeeper跟踪分布式数据的状态。**ZooKeeper 的设计目标是将那些复杂且容易出错的分布式一致性服务封装起来，构成一个高效可靠的原语集，并以一系列简单易用的接口提供给用户使用。**

> **原语：** 操作系统或计算机网络用语范畴。是由若干条指令组成的，用于完成一定功能的一个过程。具有不可分割性·即原语的执行必须是连续的，在执行过程中不允许被中断。

**ZooKeeper 是一个典型的分布式数据一致性解决方案，分布式应用程序可以基于 ZooKeeper 实现诸如数据发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能。**

**Zookeeper 一个最常用的使用场景就是用于担任服务生产者和服务消费者的注册中心(提供发布订阅服务)。** 服务生产者将自己提供的服务注册到Zookeeper中心，服务的消费者在进行服务调用的时候先到Zookeeper中查找服务，获取到服务生产者的详细信息之后，再去调用服务生产者的内容与数据。如下图所示，在 Dubbo架构中 Zookeeper 就担任了注册中心这一角色。

![](./imgs/973dtm.png)

### 1.2 结合个人使用情况的讲一下 ZooKeeper

在我自己做过的项目中，主要使用到了 ZooKeeper 作为 Dubbo 的注册中心(Dubbo 官方推荐使用 ZooKeeper注册中心)。另外在搭建 solr 集群的时候，我使用 ZooKeeper 作为 solr 集群的管理工具。这时，ZooKeeper 主要提供下面几个功能：1、集群管理：容错、负载均衡。2、配置文件的集中管理3、集群的入口。

我个人觉得在使用 ZooKeeper 的时候，最好是使用 集群版的 ZooKeeper 而不是单机版的。官网给出的架构图就描述的是一个集群版的 ZooKeeper 。通常 3 台服务器就可以构成一个 ZooKeeper 集群了。

**为什么最好使用奇数台服务器构成 ZooKeeper 集群？**

所谓的zookeeper容错是指，当宕掉几个zookeeper服务器之后，剩下的个数必须大于宕掉的个数的话整个zookeeper才依然可用。假如我们的集群中有n台zookeeper服务器，那么也就是剩下的服务数必须大于n/2。先说一下结论，2n和2n-1的容忍度是一样的，都是n-1，大家可以先自己仔细想一想，这应该是一个很简单的数学问题了。 比如假如我们有3台，那么最大允许宕掉1台zookeeper服务器，如果我们有4台的的时候也同样只允许宕掉1台。 假如我们有5台，那么最大允许宕掉2台zookeeper服务器，如果我们有6台的的时候也同样只允许宕掉2台。

综上，何必增加那一个不必要的zookeeper呢？

## 二 关于 ZooKeeper 的一些重要概念

### 2.1 重要概念总结

- **ZooKeeper 本身就是一个分布式程序（只要半数以上节点存活，ZooKeeper 就能正常服务）。**
- **为了保证高可用，最好是以集群形态来部署 ZooKeeper，这样只要集群中大部分机器是可用的（能够容忍一定的机器故障），那么 ZooKeeper 本身仍然是可用的。**
- **ZooKeeper 将数据保存在内存中，这也就保证了 高吞吐量和低延迟**（但是内存限制了能够存储的容量不太大，此限制也是保持znode中存储的数据量较小的进一步原因）。
- **ZooKeeper 是高性能的。 在“读”多于“写”的应用程序中尤其地高性能，因为“写”会导致所有的服务器间同步状态。**（“读”多于“写”是协调服务的典型场景。）
- **ZooKeeper有临时节点的概念。 当创建临时节点的客户端会话一直保持活动，瞬时节点就一直存在。而当会话终结时，瞬时节点被删除。持久节点是指一旦这个ZNode被创建了，除非主动进行ZNode的移除操作，否则这个ZNode将一直保存在Zookeeper上。**
- ZooKeeper 底层其实只提供了两个功能：①管理（存储、读取）用户程序提交的数据；②为用户程序提供数据节点监听服务。

**下面关于会话（Session）、 Znode、版本、Watcher、ACL概念的总结都在《从Paxos到Zookeeper 》第四章第一节以及第七章第八节有提到，感兴趣的可以看看！**

### 2.2 会话（Session）

Session 指的是 ZooKeeper 服务器与客户端会话。**在 ZooKeeper 中，一个客户端连接是指客户端和服务器之间的一个 TCP 长连接**。客户端启动的时候，首先会与服务器建立一个 TCP 连接，从第一次连接建立开始，客户端会话的生命周期也开始了。**通过这个连接，客户端能够通过心跳检测与服务器保持有效的会话，也能够向Zookeeper服务器发送请求并接受响应，同时还能够通过该连接接收来自服务器的Watch事件通知。** Session的`sessionTimeout`值用来设置一个客户端会话的超时时间。当由于服务器压力太大、网络故障或是客户端主动断开连接等各种原因导致客户端连接断开时，**只要在sessionTimeout规定的时间内能够重新连接上集群中任意一台服务器，那么之前创建的会话仍然有效。**

**在为客户端创建会话之前，服务端首先会为每个客户端都分配一个sessionID。由于 sessionID 是 Zookeeper 会话的一个重要标识，许多与会话相关的运行机制都是基于这个 sessionID 的，因此，无论是哪台服务器为客户端分配的 sessionID，都务必保证全局唯一。**

### 2.3 Znode

**在谈到分布式的时候，我们通常说的“节点"是指组成集群的每一台机器。然而，在Zookeeper中，“节点"分为两类，第一类同样是指构成集群的机器，我们称之为机器节点；第二类则是指数据模型中的数据单元，我们称之为数据节点一一ZNode。**

Zookeeper将所有数据存储在内存中，数据模型是一棵树（Znode Tree)，由斜杠（/）的进行分割的路径，就是一个Znode，例如/foo/path1。每个上都会保存自己的数据内容，同时还会保存一系列属性信息。

**在Zookeeper中，node可以分为持久节点和临时节点两类。所谓持久节点是指一旦这个ZNode被创建了，除非主动进行ZNode的移除操作，否则这个ZNode将一直保存在Zookeeper上。而临时节点就不一样了，它的生命周期和客户端会话绑定，一旦客户端会话失效，那么这个客户端创建的所有临时节点都会被移除。** 另外，ZooKeeper还允许用户为每个节点添加一个特殊的属性：**SEQUENTIAL**.一旦节点被标记上这个属性，那么在这个节点被创建的时候，Zookeeper会自动在其节点名后面追加上一个整型数字，这个整型数字是一个由父节点维护的自增数字。

### 2.4 版本

在前面我们已经提到，Zookeeper 的每个 ZNode 上都会存储数据，对应于每个ZNode，Zookeeper 都会为其维护一个叫作 **Stat** 的数据结构，Stat 中记录了这个 ZNode 的三个数据版本，分别是version（当前ZNode的版本）、cversion（当前ZNode子节点的版本）和 aversion（当前ZNode的ACL版本）。

### 2.5 Watcher

**Watcher（事件监听器），是Zookeeper中的一个很重要的特性。Zookeeper允许用户在指定节点上注册一些Watcher，并且在一些特定事件触发的时候，ZooKeeper服务端会将事件通知到感兴趣的客户端上去，该机制是Zookeeper实现分布式协调服务的重要特性。**

### 2.6 ACL

Zookeeper采用ACL（AccessControlLists）策略来进行权限控制，类似于 UNIX 文件系统的权限控制。Zookeeper 定义了如下5种权限。

![](./imgs/dRBPqB.png)

其中尤其需要注意的是，CREATE和DELETE这两种权限都是针对子节点的权限控制。

## 三 ZooKeeper 特点

- **顺序一致性：** 从同一客户端发起的事务请求，最终将会严格地按照顺序被应用到 ZooKeeper 中去。
- **原子性：** 所有事务请求的处理结果在整个集群中所有机器上的应用情况是一致的，也就是说，要么整个集群中所有的机器都成功应用了某一个事务，要么都没有应用。
- **单一系统映像 ：** 无论客户端连到哪一个 ZooKeeper 服务器上，其看到的服务端数据模型都是一致的。
- **可靠性：** 一旦一次更改请求被应用，更改的结果就会被持久化，直到被下一次更改覆盖。

## 四 ZooKeeper 设计目标

### 4.1 简单的数据模型

ZooKeeper 允许分布式进程通过共享的层次结构命名空间进行相互协调，这与标准文件系统类似。 名称空间由 ZooKeeper 中的数据寄存器组成 - 称为znode，这些类似于文件和目录。 与为存储设计的典型文件系统不同，ZooKeeper数据保存在内存中，这意味着ZooKeeper可以实现高吞吐量和低延迟。

![](./imgs/BVf6lu.png)

### 4.2 可构建集群

**为了保证高可用，最好是以集群形态来部署 ZooKeeper，这样只要集群中大部分机器是可用的（能够容忍一定的机器故障），那么zookeeper本身仍然是可用的。** 客户端在使用 ZooKeeper 时，需要知道集群机器列表，通过与集群中的某一台机器建立 TCP 连接来使用服务，客户端使用这个TCP链接来发送请求、获取结果、获取监听事件以及发送心跳包。如果这个连接异常断开了，客户端可以连接到另外的机器上。

**ZooKeeper 官方提供的架构图：**

![](./imgs/7d9jTl.png)

上图中每一个Server代表一个安装Zookeeper服务的服务器。组成 ZooKeeper 服务的服务器都会在内存中维护当前的服务器状态，并且每台服务器之间都互相保持着通信。集群间通过 Zab 协议（Zookeeper Atomic Broadcast）来保持数据的一致性。

### 4.3 顺序访问

**对于来自客户端的每个更新请求，ZooKeeper 都会分配一个全局唯一的递增编号，这个编号反应了所有事务操作的先后顺序，应用程序可以使用 ZooKeeper 这个特性来实现更高层次的同步原语。** **这个编号也叫做时间戳——zxid（Zookeeper Transaction Id）**

### 4.4 高性能

**ZooKeeper 是高性能的。 在“读”多于“写”的应用程序中尤其地高性能，因为“写”会导致所有的服务器间同步状态。（“读”多于“写”是协调服务的典型场景。）**

## 五 ZooKeeper 集群角色介绍

**最典型集群模式： Master/Slave 模式（主备模式）**。在这种模式中，通常 Master服务器作为主服务器提供写服务，其他的 Slave 服务器从服务器通过异步复制的方式获取 Master 服务器最新的数据提供读服务。

但是，**在 ZooKeeper 中没有选择传统的 Master/Slave 概念，而是引入了Leader、Follower 和 Observer 三种角色**。如下图所示

![](./imgs/UjbI01.png)

**ZooKeeper 集群中的所有机器通过一个 Leader 选举过程来选定一台称为 “Leader” 的机器，Leader 既可以为客户端提供写服务又能提供读服务。除了 Leader 外，Follower 和 Observer 都只能提供读服务。Follower 和 Observer 唯一的区别在于 Observer 机器不参与 Leader 的选举过程，也不参与写操作的“过半写成功”策略，因此 Observer 机器可以在不影响写性能的情况下提升集群的读性能。**

![](./imgs/EWN3Dm.png)

**当 Leader 服务器出现网络中断、崩溃退出与重启等异常情况时，ZAB 协议就会进人恢复模式并选举产生新的Leader服务器。这个过程大致是这样的：**

1. Leader election（选举阶段）：节点在一开始都处于选举阶段，只要有一个节点得到超半数节点的票数，它就可以当选准 leader。
2. Discovery（发现阶段）：在这个阶段，followers 跟准 leader 进行通信，同步 followers 最近接收的事务提议。
3. Synchronization（同步阶段）:同步阶段主要是利用 leader 前一阶段获得的最新提议历史，同步集群中所有的副本。同步完成之后 准 leader 才会成为真正的 leader。
4. Broadcast（广播阶段） 到了这个阶段，Zookeeper 集群才能正式对外提供事务服务，并且 leader 可以进行消息广播。同时如果有新的节点加入，还需要对新节点进行同步。

## 六 ZooKeeper &ZAB 协议&Paxos算法

### 6.1 ZAB 协议&Paxos算法

Paxos 算法应该可以说是 ZooKeeper 的灵魂了。但是，ZooKeeper 并没有完全采用 Paxos算法 ，而是使用 ZAB 协议作为其保证数据一致性的核心算法。另外，在ZooKeeper的官方文档中也指出，ZAB协议并不像 Paxos 算法那样，是一种通用的分布式一致性算法，它是一种特别为Zookeeper设计的崩溃可恢复的原子消息广播算法。

### 6.2 ZAB 协议介绍

**ZAB（ZooKeeper Atomic Broadcast 原子广播） 协议是为分布式协调服务 ZooKeeper 专门设计的一种支持崩溃恢复的原子广播协议。 在 ZooKeeper 中，主要依赖 ZAB 协议来实现分布式数据一致性，基于该协议，ZooKeeper 实现了一种主备模式的系统架构来保持集群中各个副本之间的数据一致性。**

### 6.3 ZAB 协议两种基本的模式：崩溃恢复和消息广播

ZAB协议包括两种基本的模式，分别是 **崩溃恢复和消息广播**。当整个服务框架在启动过程中，或是当 Leader 服务器出现网络中断、崩溃退出与重启等异常情况时，ZAB 协议就会进人恢复模式并选举产生新的Leader服务器。当选举产生了新的 Leader 服务器，同时集群中已经有过半的机器与该Leader服务器完成了状态同步之后，ZAB协议就会退出恢复模式。其中，**所谓的状态同步是指数据同步，用来保证集群中存在过半的机器能够和Leader服务器的数据状态保持一致**。

**当集群中已经有过半的Follower服务器完成了和Leader服务器的状态同步，那么整个服务框架就可以进人消息广播模式了。** 当一台同样遵守ZAB协议的服务器启动后加人到集群中时，如果此时集群中已经存在一个Leader服务器在负责进行消息广播，那么新加人的服务器就会自觉地进人数据恢复模式：找到Leader所在的服务器，并与其进行数据同步，然后一起参与到消息广播流程中去。正如上文介绍中所说的，ZooKeeper设计成只允许唯一的一个Leader服务器来进行事务请求的处理。Leader服务器在接收到客户端的事务请求后，会生成对应的事务提案并发起一轮广播协议；而如果集群中的其他机器接收到客户端的事务请求，那么这些非Leader服务器会首先将这个事务请求转发给Leader服务器。

关于 **ZAB 协议&Paxos算法** 需要讲和理解的东西太多了，说实话，笔主到现在不太清楚这俩兄弟的具体原理和实现过程。推荐阅读下面两篇文章：

- [图解 Paxos 一致性协议](http://codemacro.com/2014/10/15/explain-poxos/)
- [Zookeeper ZAB 协议分析](https://dbaplus.cn/news-141-1875-1.html)

关于如何使用 zookeeper 实现分布式锁，可以查看下面这篇文章：

- 

[10分钟看懂！基于Zookeeper的分布式锁](https://blog.csdn.net/qiangcuo6087/article/details/79067136)

## ZooKeeper 数据模型

ZNode（数据节点）是 ZooKeeper 中数据的最小单元，每个ZNode上都可以保存数据，同时还是可以有子节点（这就像树结构一样，如下图所示）。可以看出，节点路径标识方式和Unix文件 系统路径非常相似，都是由一系列使用斜杠"/"进行分割的路径表示，开发人员可以向这个节点中写人数据，也可以在节点下面创建子节点。这些操作我们后面都会介绍到。 [![ZooKeeper 数据模型](https://camo.githubusercontent.com/3e4b2526e8d5b1b3873ed91350ec34ef5e818d11/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f39356131393262302d316335362d313165392d396138652d663362303162316561396161)](https://camo.githubusercontent.com/3e4b2526e8d5b1b3873ed91350ec34ef5e818d11/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f39356131393262302d316335362d313165392d396138652d663362303162316561396161)

提到 ZooKeeper 数据模型，还有一个不得不得提的东西就是 **事务 ID** 。事务的ACID（Atomic：原子性；Consistency:一致性；Isolation：隔离性；Durability：持久性）四大特性我在这里就不多说了，相信大家也已经挺腻了。

在Zookeeper中，事务是指能够改变 ZooKeeper 服务器状态的操作，我们也称之为事务操作或更新操作，一般包括数据节点创建与删除、数据节点内容更新和客户端会话创建与失效等操作。对于每一个事务请求，**ZooKeeper 都会为其分配一个全局唯一的事务ID,用 ZXID 来表示**，通常是一个64位的数字。每一个ZXID对应一次更新操作，**从这些 ZXID 中可以间接地识别出Zookeeper处理这些更新操作请求的全局顺序**。

## ZNode(数据节点)的结构

每个 ZNode 由2部分组成:

- stat：状态信息
- data：数据内容

如下所示，我通过 get 命令来获取 根目录下的 dubbo 节点的内容。（get 命令在下面会介绍到）

```
[zk: 127.0.0.1:2181(CONNECTED) 6] get /dubbo    
# 该数据节点关联的数据内容为空
null
# 下面是该数据节点的一些状态信息，其实就是 Stat 对象的格式化输出
cZxid = 0x2
ctime = Tue Nov 27 11:05:34 CST 2018
mZxid = 0x2
mtime = Tue Nov 27 11:05:34 CST 2018
pZxid = 0x3
cversion = 1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 1
```

这些状态信息其实就是 Stat 对象的格式化输出。Stat 类中包含了一个数据节点的所有状态信息的字段，包括事务ID、版本信息和子节点个数等，如下图所示（图源：《从Paxos到Zookeeper 分布式一致性原理与实践》，下面会介绍通过 stat 命令查看数据节点的状态）。

**Stat 类：**

[![Stat 类](https://camo.githubusercontent.com/9c787e366afda86ee6c27433f2c2a64ef80fd9b3/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f61383431653734302d316335352d313165392d623562372d616266306563306336363661)](https://camo.githubusercontent.com/9c787e366afda86ee6c27433f2c2a64ef80fd9b3/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f61383431653734302d316335352d313165392d623562372d616266306563306336363661)

关于数据节点的状态信息说明（也就是对Stat 类中的各字段进行说明），可以参考下图（图源：《从Paxos到Zookeeper 分布式一致性原理与实践》）。

[![数据节点的状态信息说明](https://camo.githubusercontent.com/75e4e5b1b4ceeb1e297a5feea4d3c9af80ee70dd/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f66343464383633302d316335352d313165392d623562372d616266306563306336363661)](https://camo.githubusercontent.com/75e4e5b1b4ceeb1e297a5feea4d3c9af80ee70dd/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f66343464383633302d316335352d313165392d623562372d616266306563306336363661)

## 测试 ZooKeeper 中的常见操作

### 连接 ZooKeeper 服务

进入安装 ZooKeeper文件夹的 bin 目录下执行下面的命令连接 ZooKeeper 服务（Linux环境下）（连接之前首选要确定你的 ZooKeeper 服务已经启动成功）。

```
./zkCli.sh -server 127.0.0.1:2181
```

[![连接 ZooKeeper 服务](https://camo.githubusercontent.com/f9de9494d295516a4bb6b4581132c01d5c8f43a0/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f31353362383463302d316335392d313165392d396138652d663362303162316561396161)](https://camo.githubusercontent.com/f9de9494d295516a4bb6b4581132c01d5c8f43a0/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f31353362383463302d316335392d313165392d396138652d663362303162316561396161)

从上图可以看出控制台打印出了很多信息，包括我们的主机名称、JDK 版本、操作系统等等。如果你成功看到这些信息，说明你成功连接到 ZooKeeper 服务。

### 查看常用命令(help 命令)

help 命令查看 zookeeper 常用命令

[![help 命令](https://camo.githubusercontent.com/096f9514ac227eec1a33abb22753a189a8907ccb/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f30393164623634302d316335392d313165392d623562372d616266306563306336363661)](https://camo.githubusercontent.com/096f9514ac227eec1a33abb22753a189a8907ccb/68747470733a2f2f696d616765732e676974626f6f6b2e636e2f30393164623634302d316335392d313165392d623562372d616266306563306336363661)

### 创建节点(create 命令)

通过 create 命令在根目录创建了node1节点，与它关联的字符串是"node1"

```
[zk: 127.0.0.1:2181(CONNECTED) 34] create /node1 “node1”
```

通过 create 命令在根目录创建了node1节点，与它关联的内容是数字 123

```
[zk: 127.0.0.1:2181(CONNECTED) 1] create /node1/node1.1 123
Created /node1/node1.1
```

### 更新节点数据内容(set 命令)

```
[zk: 127.0.0.1:2181(CONNECTED) 11] set /node1 "set node1" 
```

### 获取节点的数据(get 命令)

get 命令可以获取指定节点的数据内容和节点的状态,可以看出我们通过set 命令已经将节点数据内容改为 "set node1"。

```
set node1
cZxid = 0x47
ctime = Sun Jan 20 10:22:59 CST 2019
mZxid = 0x4b
mtime = Sun Jan 20 10:41:10 CST 2019
pZxid = 0x4a
cversion = 1
dataVersion = 1
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 9
numChildren = 1
```

### 查看某个目录下的子节点(ls 命令)

通过 ls 命令查看根目录下的节点

```
[zk: 127.0.0.1:2181(CONNECTED) 37] ls /
[dubbo, zookeeper, node1]
```

通过 ls 命令查看 node1 目录下的节点

```
[zk: 127.0.0.1:2181(CONNECTED) 5] ls /node1
[node1.1]
```

zookeeper 中的 ls 命令和 linux 命令中的 ls 类似， 这个命令将列出绝对路径path下的所有子节点信息（列出1级，并不递归）

### 查看节点状态(stat 命令)

通过 stat 命令查看节点状态

```
[zk: 127.0.0.1:2181(CONNECTED) 10] stat /node1
cZxid = 0x47
ctime = Sun Jan 20 10:22:59 CST 2019
mZxid = 0x47
mtime = Sun Jan 20 10:22:59 CST 2019
pZxid = 0x4a
cversion = 1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 11
numChildren = 1
```

上面显示的一些信息比如cversion、aclVersion、numChildren等等，我在上面 “ZNode(数据节点)的结构” 这部分已经介绍到。

### 查看节点信息和状态(ls2 命令)

ls2 命令更像是 ls 命令和 stat 命令的结合。ls2 命令返回的信息包括2部分：子节点列表 + 当前节点的stat信息。

```
[zk: 127.0.0.1:2181(CONNECTED) 7] ls2 /node1
[node1.1]
cZxid = 0x47
ctime = Sun Jan 20 10:22:59 CST 2019
mZxid = 0x47
mtime = Sun Jan 20 10:22:59 CST 2019
pZxid = 0x4a
cversion = 1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 11
numChildren = 1
```

### 删除节点(delete 命令)

这个命令很简单，但是需要注意的一点是如果你要删除某一个节点，那么这个节点必须无子节点才行。

```
[zk: 127.0.0.1:2181(CONNECTED) 3] delete /node1/node1.1
```

在后面我会介绍到 Java 客户端 API的使用以及开源 Zookeeper 客户端 ZkClient 和 Curator 的使用。

## 参考

- 《从Paxos到Zookeeper 分布式一致性原理与实践》