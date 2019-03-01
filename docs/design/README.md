# 架构设计

## 说说分布式和集群的区别

集群是个物理形态，分布式是个工作方式。

1. 只要是一堆机器，就可以叫集群，他们是不是一起协作着干活，这个谁也不知道；一个程序或系统，只要运行在不同的机器上，就可以叫分布式
2. 集群可能运行着一个或多个分布式系统，也可能根本没有运行分布式系统；分布式系统可能运行在一个集群上，也可能运行在不属于一个集群的多台（2台也算多台）机器上。
3. 分布式是相对中心化而来，强调的是任务在多个物理隔离的节点上进行。中心化带来的主要问题是可靠性，若中心节点宕机则整个系统不可用，分布式除了解决部分中心化问题，也倾向于分散负载，但分布式会带来很多的其他问题，最主要的就是一致性。
4. 分布式：一个业务分拆多个子业务，部署在不同的服务器上（集群是解决高可用的）
5. 集群：同一个业务，部署在多个服务器上（分布式是解决高性能、高并发的）

## 架构师之路17年精选80篇

【架构必备】

《[互联网架构如何实现“高并发”](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959830&idx=1&sn=ce1c5a58caed227d7dfdbc16d6e1cea4&chksm=bd2d07ca8a5a8edc45cc45c4787cc72cf4c8b96fb43d2840c7ccd44978036a7d39a03dd578b5&scene=21#wechat_redirect)》4W+

《[TCP接入层的负载均衡、高可用、扩展性架构设计](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960086&idx=1&sn=70bbe7165ecddc7896767f4503a927fe&chksm=bd2d06ca8a5a8fdc67fcacb169583f53a968fdf623a20395926059d44e6abae6b2e56ff1f9f9&scene=21#wechat_redirect)》2.2W+

《[配置中心架构设计演进](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960061&idx=1&sn=3747338a91e85fc33f43d9c1bb98ab10&chksm=bd2d07218a5a8e37ad2e5078736d2449a6ba1e0d75bb18d09990a5f3dcc3af2b7ff414158adb&scene=21#wechat_redirect)》1.7W+

《[跨公网调用的大坑与架构优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960105&idx=1&sn=0069f2264e227e86a63ee50a4899e0a7&chksm=bd2d06f58a5a8fe33271ed3a378932ad023af7a9004d7fdb44e30a53d53928f984f293a41256&scene=21#wechat_redirect)》1.4W+

《[DNS在架构设计中的巧用](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960118&idx=1&sn=767e038cb4378be1c88dd42569a9264f&chksm=bd2d06ea8a5a8ffc7c69c71c2153b10565ecf72b6957c5667fbf9099c9f5478111132e967a35&scene=21#wechat_redirect)》1.9W+

《[消息如何在网络上安全传输](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960315&idx=1&sn=8592c5cd15732096bb3b84b3074a2d37&chksm=bd2d06278a5a8f310e3ac5bcdf82b5ec0815a3175466b999d58e173c89900dec00a55aa3f0bb&scene=21#wechat_redirect)》1.2W+

《[10W定时任务, 如何高效触发](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959957&idx=1&sn=a82bb7e8203b20b2a0cb5fc95b7936a5&chksm=bd2d07498a5a8e5f9f8e7b5aeaa5bd8585a0ee4bf470956e7fd0a2b36d132eb46553265f4eaf&scene=21#wechat_redirect)》2.9W+

《[工作线程究竟设置为多少合适](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960260&idx=1&sn=051fd566d43d7fd35724bdf55484ee5f&chksm=bd2d06188a5a8f0e64467381c7b3df5bdcb7f81ba055d5d21ec2f8b888492be15527d23070b0&scene=21#wechat_redirect)》2.1W+

《[URI设计原则](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960359&idx=1&sn=a036190cc369507aa67de9c9281fdc38&chksm=bd2d01fb8a5a88edd8b1750b8564a3e9eec90e19235f1fa7edce82ee2731e8beed668c9cc015&scene=21#wechat_redirect)》1.9W+

【一致性】

《[session一致性架构设计实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960128&idx=1&sn=8e0e409b10ab9db549432af461385314&chksm=bd2d069c8a5a8f8ab5cdee602d4062bbdbb25da290668515d36682afa854e374d2a5ff02004b&scene=21#wechat_redirect)》3.5W+

《[MySQL双主架构一致性优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960253&idx=1&sn=cce01d9d305024b5cc7e1e7149507ae9&chksm=bd2d06618a5a8f77db3731e8687f9a116c0c3113a4b9a8574149530610dc95fbcf7e4ab92ae5&scene=21#wechat_redirect)》1.6W+

《[库存扣多了, 到底怎么整](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960197&idx=1&sn=2e5c17d521772d28d39f31af5d22b34a&chksm=bd2d06598a5a8f4f9de2da89ba8fab711823935442fc632b65d461c923852485ff392c987568&scene=21#wechat_redirect)》2.1W+

《[再议库存扣减多种方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960200&idx=1&sn=fdec629caceee07b3946b6c338b8ceb7&chksm=bd2d06548a5a8f424dd32be960222edf5cecc3c1e5a8fcbb4cfff35e7da6787e702861131597&scene=21#wechat_redirect)》1.4W+

《[浅谈CAS在分布式ID生成方案上的应用](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960223&idx=1&sn=121716347174eedd6636b1c2c0b96047&chksm=bd2d06438a5a8f55d35add7dc99940c280264fa7caeacb21f7dc79884d00c050d0367a745f87&scene=21#wechat_redirect)》1.3W+

《[CAS下ABA问题及优化方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960240&idx=1&sn=18c4ce7c3baf6705940847c1c9bf49e3&chksm=bd2d066c8a5a8f7a27acb5603611b5cbcf6396a8a5e5d06571dcd41deaa64e615b097e84fef3&scene=21#wechat_redirect)》1.1W+

【分层架构设计】

《[互联网分层架构的本质](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960455&idx=1&sn=02cb2345ae9862edad11113726c49512&chksm=bd2d015b8a5a884d9619cdf7ae0dc1a480979a95abb24bac2645cecd54caec4c6bdb3aa617d7&scene=21#wechat_redirect)》2.8W+

《[分层架构, 为什么需要服务化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960468&idx=1&sn=82bb21ff787f2ae3db2630e0823f3062&chksm=bd2d01488a5a885eb4bbd2470cbd5f2d92a473a45cac02a5d68f55b5d8f72cd8cbb38b18962a&scene=21#wechat_redirect)》2W+

《[分层架构, 是否需要业务服务层](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960482&idx=1&sn=feb27bdd202093a5e4747f7c043415d1&chksm=bd2d017e8a5a8868888e553a30559cb9eefa93e0a1da557342e1a13127ca67143ea87b721363&scene=21#wechat_redirect)》1.4W+

《[分层架构, 为什么需要前后端分离](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960501&idx=1&sn=a452bab31c0457063241df237f955332&chksm=bd2d01698a5a887f9dfa5c6966d9e71bf492a040ab2dbe4e469ef38dd8ee5ab00b7c562a88e8&scene=21#wechat_redirect)》2.9W+

《[分层架构, 前后端分离的坏处](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960541&idx=1&sn=6e123e92e69f09c25ca1c8b81e6037d0&chksm=bd2d01018a5a881735fb37045ed187325f1102f01eaee1e78147d6dc702dccb7d9f1899227ed&scene=21#wechat_redirect)》1.8W+

《[分层架构, 为什么要引入数据库中间层](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960526&idx=1&sn=3fcf5a358d7166a25ba78010882616e3&chksm=bd2d01128a5a8804d2e0699ceef99c00be1635aeef956e0996f1153a0a1cdd78eb68d2fec8f0&scene=21#wechat_redirect)》1.8W+

《[分层架构, APP分层架构随想](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960548&idx=1&sn=fa268b779440f75ccd5b4cd18a48d8e9&chksm=bd2d01388a5a882e9c1cff970ab559a5580fe884b2f1e77d5c93d1e08aad52c8e8be55a7aa5c&scene=21#wechat_redirect)》1.4W+

【数据库-SQL】

《[或许你不知道的10条SQL技巧](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960280&idx=1&sn=da519cff7081ab347eb1aaa4f0f4f408&chksm=bd2d06048a5a8f123730ed91b60ac2f55ec5eb92774f24ec45c3fc0d004aea514e6fc3990e0e&scene=21#wechat_redirect)》4.2W+

《[MySQL索引or/in/union优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960277&idx=1&sn=bc452fbe863fd915c08f95a680e4bdbe&chksm=bd2d06098a5a8f1fa0262290a65b6a6634f84d394b072f701ed44a6df9dd4b9df8c926537a59&scene=21#wechat_redirect)》1.7W+

《[58到家数据库30条军规解读](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959906&idx=1&sn=2cbdc66cfb5b53cf4327a1e0d18d9b4a&chksm=bd2d07be8a5a8ea86dc3c04eced3f411ee5ec207f73d317245e1fefea1628feb037ad71531bc&scene=21#wechat_redirect)》4.9W+

《[再议58到家数据库军规](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959910&idx=1&sn=6b6853b70dbbe6d689a12a4a60b84d8b&chksm=bd2d07ba8a5a8eac6783bac951dba345d865d875538755fe665a5daaf142efe670e2c02b7c71&scene=21#wechat_redirect)》2.2W+

《[赶集MySQL军规](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960775&idx=1&sn=1a9c9f4b94dfe71ad2528fb2c84f5ec7&chksm=bd2d001b8a5a890d302d139ea42e9ffde44407738a618865934e40b8e35486b13cafca2933f6&scene=21#wechat_redirect)》2.5W+

【数据库架构】

《[100亿数据量1万属性10万并发数据库架构设计](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959855&idx=1&sn=f33abe8ec598c273f29cebb9365ece59&chksm=bd2d07f38a5a8ee58a944507a134e1da1efc3ac9c4d1c4cff261137cd986e51f5fe7cee9de15&scene=21#wechat_redirect)》4W+

《[数据库秒级平滑扩容架构方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959883&idx=1&sn=e7df8510c7096a5b069e0f12eaaca010&chksm=bd2d07978a5a8e815c2ae41b16b6b4c579923502fb919008a22bb108a1e920109f25387f8903&scene=21#wechat_redirect)》1.9W+

《[业界难题, 跨库分页的四种方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959942&idx=1&sn=e9d3fe111b8a1d44335f798bbb6b9eea&chksm=bd2d075a8a5a8e4cad985b847778aa83056e22931767bb835132c04571b66d5434020fd4147f&scene=21#wechat_redirect)》3.1W+

《[100亿数据平滑迁移, 不停服务](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959992&idx=1&sn=eb2fbd7d7922db42a593c304e50a65b7&chksm=bd2d07648a5a8e72d489022ec6006274d7e43ab48449b255d5661658c2af8e9221977a9609ed&scene=21#wechat_redirect)》1.7W+

《[MySQL数据冗余的三种方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960255&idx=1&sn=1bf42b6d8f5658f9d8b54274d62ca714&chksm=bd2d06638a5a8f757502004f4d206f1a4e0f3e8ab4b1d3ba0635308e7d5b7a30860ae6d91e0c&scene=21#wechat_redirect)》1.5W+

【数据库-容量】

《[每每谈到数据库架构, 我们在讨论什么](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960158&idx=1&sn=019e9dca6e074f62478b2562044cf8de&chksm=bd2d06828a5a8f945e1e6c2aa4702f48b7857ac9a79acf867496f25b28c86e2f28bed19b38e4&scene=21#wechat_redirect)》2.9W+

《[用户中心, 数据库架构优化与实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960212&idx=1&sn=ab4c52ab0309f7380f7e0207fa357128&chksm=bd2d06488a5a8f5e3b7c9de0cc5936818bd9a6ed4058679ae8d819175e0693c6fbd9cdea0c87&scene=21#wechat_redirect)》2.2W+

《[帖子中心, 数据库架构优化与实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960274&idx=1&sn=81714a692f3c29395c6e2ff3e8f00350&chksm=bd2d060e8a5a8f188c90253a496c97661da7f3bcab9d42c48b95665fae3916b2c2cdc2ea33e6&scene=21#wechat_redirect)》1.7W+

《[好友中心, 数据库架构优化与实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960302&idx=1&sn=ba3d794bd9cc42bead23b7877ad54643&chksm=bd2d06328a5a8f24d9d43a36093dc701c63393e61781ff7fa1e47e5d2ae0631edb7cf514bb6d&scene=21#wechat_redirect)》1.5W+

《[订单中心, 如何做到数据库无限容量](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960373&idx=1&sn=abf7d36840c4d3d556b17a8776ee536c&chksm=bd2d01e98a5a88ff0cbf615cb3444668ccdfca58d5dca2da00ed0cc8948585b7509adf648db0&scene=21#wechat_redirect)》1.8W+

【数据库中间件】

《[数据库中间件, 需求调研](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960679&idx=1&sn=aecca24f1150e353bcf9e63c9e6ae7b4&chksm=bd2d00bb8a5a89ad9820ae4b2b674cd0508be87be6b2d802b4417a864aad7db2eb9ccf19635c&scene=21#wechat_redirect)》1.4W+

《[数据库中间件, cobar调研笔记](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960594&idx=1&sn=b9d39a5591ceeee4e7896627482f05f6&chksm=bd2d00ce8a5a89d885deb207bbdb4a265862888e62fd18c1091830a418b58d4dec1753c6fab9&scene=21#wechat_redirect)》1.3W+

《[数据库中间件, TDDL调研笔记](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960601&idx=1&sn=4ea55404a2fc96dc5a7bb613bb9e3d32&chksm=bd2d00c58a5a89d307e062e4ad5fe5f0091d514b65881d0829e8f26c5aee965b225fd3eb1909&scene=21#wechat_redirect)》1W+

《[数据库中间件, atlas调研笔记](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960656&idx=1&sn=06717a19b6be3adfdb90e8c57d3274b8&chksm=bd2d008c8a5a899ad044dc6db27a07981937de61257112651f8d05d981a5efe86845c0248adf&scene=21#wechat_redirect)》1W+

《[数据库中间件, mysql-proxy调研笔记](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960133&idx=1&sn=07acfeac5306f92f81dfccf4c880da4f&chksm=bd2d06998a5a8f8fc8c3bbb2c2ea01825ebe6576a35aa4d9789774dba0f7964baf4edf584f1b&scene=21#wechat_redirect)》1.5W+

《[假如让你来设计数据库中间件](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960632&idx=1&sn=769f12c5180bdc37d71c99cdf7b4077f&chksm=bd2d00e48a5a89f2fa42e0c360e31c28cfd9cce7ab31b425cb5ef8da43bef117c95d0ca8c2cd&scene=21#wechat_redirect)》1.5W+

【架构解耦】

《[小小的IP, 大大的耦合, 如何解耦](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960643&idx=1&sn=adb2660bc1a367e118d0a3a799a312fa&chksm=bd2d009f8a5a898917ebe65caf0dc31d3f257594d5c18a468ebef344877b64e989ee292bf22e&scene=21#wechat_redirect)》1.5W+

《[小小的公共库, 大大的耦合, 如何解耦](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960650&idx=1&sn=7c63fdc50a130e1d9fc3e5b6791ce01f&chksm=bd2d00968a5a89801861bd1665ad60fe240b5ff3d6eab984e70938d9cfd6502aca8de5686e0c&scene=21#wechat_redirect)》1.7W+

《[数据库耦合, 如何解耦](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960667&idx=1&sn=850cc7370b7fe3fec43878e39baadb2b&chksm=bd2d00878a5a89917bf55546a0c1b44523190679849953cfcc94c886bc5b77ad136006b448f1&scene=21#wechat_redirect)》1.2W+

《[为何服务化了, 耦合却更加严重](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960690&idx=1&sn=2631832538639dde2de42e4dfc7008ac&chksm=bd2d00ae8a5a89b8e636e25d0d83723244a6462a9cfd4f477865899b7d72f3d899a1de5892ca&scene=21#wechat_redirect)》2.5W+

《[MQ, 互联网架构解耦神器](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960726&idx=1&sn=0fdaf0e7040318aabfeba553f815d691&chksm=bd2d004a8a5a895ca80180443cc0f18e66b3d15dbbbd120dabaf3e6d4ef00fbc1030bf41c24b&scene=21#wechat_redirect)》2.5W+

《[配置中心, 互联网架构解耦利器](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960763&idx=1&sn=63da208faee72464fa11691215229bc4&chksm=bd2d00678a5a8971fd2218247accac0f2367603c981c1d3c705d60d08a212ca2399f4bf076e0&scene=21#wechat_redirect)》1.8W+

【MQ】

《[究竟什么时候使用MQ](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960012&idx=1&sn=c6af5c79ecead98daa4d742e5ad20ce5&chksm=bd2d07108a5a8e0624ae6ad95001c4efe09d7ba695f2ddb672064805d771f3f84bee8123b8a6&scene=21#wechat_redirect)》5.4W+

《[MQ, 如何做到消息必达](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959966&idx=1&sn=068a2866dcc49335d613d75c4a5d1b17&chksm=bd2d07428a5a8e54162ad8ea8e1e9302dfaeb664cecc453bd16a5f299820755bd2e1e0e17b60&scene=21#wechat_redirect)》2.5W+

《[MQ, 如何做到消息幂等](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960002&idx=1&sn=c0775231bccf002c3178eabe43f1cdcb&chksm=bd2d071e8a5a8e08c3a5287247ea41dee6b2621e6ffafbf909ec1e8a866b7c816eeeea227246&scene=21#wechat_redirect)》2W+

《[MQ, 如何做到消息延时](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959961&idx=1&sn=afec02c8dc6db9445ce40821b5336736&chksm=bd2d07458a5a8e5314560620c240b1c4cf3bbf801fc0ab524bd5e8aa8b8ef036cf755d7eb0f6&scene=21#wechat_redirect)》2.7W+

《[MQ, 如何做到削峰填谷](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960021&idx=1&sn=4bbe275c249a70ab20e36959fc01d4e0&chksm=bd2d07098a5a8e1fd9b505778b551002ab59c35953fa3deaaddc79e3f21bcea5ff48076b4a89&scene=21#wechat_redirect)》1.6W+

【搜索】

《[搜索引擎的原理, 架构与细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959895&idx=1&sn=de25ce2544c088ff9be0b93fd3ea4d15&chksm=bd2d078b8a5a8e9d5ae4339a683d3f980ff2994f3c10c4081c7bab7f0d77f37521de95e974bf&scene=21#wechat_redirect)》2.1W+

《[流量从小到大, 检索架构演进](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959917&idx=1&sn=8faeae7419a756b0c355af2b30c255df&chksm=bd2d07b18a5a8ea75f16f7e98ea897c7e7f47a0441c64bdaef8445a2100e0bdd2a7de99786c0&scene=21#wechat_redirect)》1.9W+

《[全网搜索引擎, 如何检索到15分钟之前生成的网页](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959949&idx=1&sn=83f78cf6293714bd1fd97a11ff7c2c35&chksm=bd2d07518a5a8e47e6fce9fc03cddec1d8a43f2b4ac67cfbbf73a55143593da8a132da7a0815&scene=21#wechat_redirect)》1.9W+

【典型系统】

《[秒杀系统, 架构与优化细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959391&idx=1&sn=fb28fd5e5f0895ddb167406d8a735548&scene=21#wechat_redirect)》5.6W+

《[广告系统, 业务与架构细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960148&idx=1&sn=7c8a2d789fb20981355e49c3defe0229&chksm=bd2d06888a5a8f9e5ef5cf6cfa415d06800f5468148a0ba7a802e646aeec9610823ec0fc6d5d&scene=21#wechat_redirect)》1.3W+

《[计数系统, 架构与优化细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960185&idx=1&sn=0acd4a563c8c9684373fd05c116c4441&chksm=bd2d06a58a5a8fb3281acd95a7d9494161e75dcd27e95fdd526fce2b031ba79c4153bf255cee&scene=21#wechat_redirect)》1.9W+

【线上实战】

《[线上问题排查实战](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960323&idx=1&sn=e04af14d2ebf939133869e0f18bb0dd1&chksm=bd2d01df8a5a88c98c3cb94a99334a16b372fd997f36bc757a38bb44b70d977797fa840064dc&scene=21#wechat_redirect)》1.6W+

《[CPU100%问题排查实战](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960332&idx=1&sn=63cb23e04ac4bf926434f34001c0718a&chksm=bd2d01d08a5a88c6a01e62533162cc3535defb37cefa61a800e405edda8240ad17432e023d53&scene=21#wechat_redirect)》2.4W+

《[内存OOM问题排查实战](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960342&idx=1&sn=9b2dbbb2cfd7710f25be1a0862a9b2be&chksm=bd2d01ca8a5a88dcc14608cb00e0dbde11869d053ee8c83bc96e7b4a0fbd71d28d7fbb009c98&scene=21#wechat_redirect)》1.7W+

【一分钟系列】

《[1分钟理解LF线程模型](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959914&idx=1&sn=3600fc162970b39afe25d65bee10cd2e&chksm=bd2d07b68a5a8ea03c2b1372345991b74aa412b7fd96cc82e9ed0eb38e8dd481bf5d8b7b631c&scene=21#wechat_redirect)》1.1W+

《[1分钟了解索引技巧](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960258&idx=1&sn=caf8295fa5c0ee47d6b9e6bf5cffcb49&chksm=bd2d061e8a5a8f08374ddc84a3c59355368b840ab38ba97782947e02c0d9d6d3c289032b3d39&scene=21#wechat_redirect)》2.4W+

《[1分钟了解四层/七层反向代理](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960131&idx=1&sn=a3bbcbe03f9e12d32ba751ce6ffae067&chksm=bd2d069f8a5a8f895fed39cad842f6f5a390bb18493f964b910270128f19f0b8af1d1f30b5c7&scene=21#wechat_redirect)》2.2W+

《[1分钟写好连接池](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959821&idx=1&sn=4ede084b05ce81a9a5ddb87ec62434bb&chksm=bd2d07d18a5a8ec7726619dbb9f1e99df8239ebd07d5f01d748e01c08dd543f0a434945301c6&scene=21#wechat_redirect)》2.8W+

《[1分钟了解好接口的设计原则](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960736&idx=1&sn=bdbe301539eadead10da880ce7d51d55&chksm=bd2d007c8a5a896a1ab5743438a05e8553f41bca9761d2b2b9e78f398f6f30ba69702cb7da59&scene=21#wechat_redirect)》2W+

【评论比文章精彩, 架构讨论】

《[服务读写分离, 是否可行？](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960734&idx=1&sn=df69c556bcd87f9758d4c4c7d4625a7a&chksm=bd2d00428a5a89541874a438e96ded1fa5a0b27d4ba5e9cd62273b6295d740fe4e032ccd57f7&scene=21#wechat_redirect)》1.5W+

《[服务读写分离, 绝不推荐](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960749&idx=1&sn=3577ba4bdc80cf1820e14b1610ade7b4&chksm=bd2d00718a5a896754dc53798af38ab46347f85c084c2469761961e3716f8351782cbd86cb84&scene=21#wechat_redirect)》2W+

《[服务通过缓存传递数据, 是否可行？](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960768&idx=1&sn=7a10095e20208e2cb6ac2ce68f1bbd27&chksm=bd2d001c8a5a890a8db2f512ad85ddb860d8dbe0ca99afdc2af9a7eb0dc4620160111c53a26b&scene=21#wechat_redirect)》1.3W+

《[服务通过缓存传递数据, 绝不推荐](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960786&idx=1&sn=58fce15972702181cf0711700c31e29d&chksm=bd2d000e8a5a891827bf65f3d4ff41445bb41243f1a2bbb535e09fd8fdb8a52229523261f384&scene=21#wechat_redirect)》1.5W+

【通用】

《[如何精准理解leader布置的任务](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960035&idx=1&sn=e0a14e8539b001e4d6d149164987235b&chksm=bd2d073f8a5a8e290202fcdfac077744eab84e6549e0608698ae5e1d3ed221ee97ca21f42e6f&scene=21#wechat_redirect)》1.7W+

《[如何快速精准的和leader沟通](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960073&idx=1&sn=3ac3bb78bb643d73e9e68d713d6eceeb&chksm=bd2d06d58a5a8fc378e7cde71808c09dea9b4d5462deec0238a3d6f0ade62976a3d2bd0faafb&scene=21#wechat_redirect)》1.1W+

《[罗振宇送给新员工的四句话](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960162&idx=1&sn=0a4814e76ae98f7b4597205bc9b4402c&chksm=bd2d06be8a5a8fa8ea9cac53144d780160c853329af461b6ffa2d8002f93425c394140d1edb3&scene=21#wechat_redirect)》1.9W+

《[远离中国式辩论](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960490&idx=1&sn=c55da79ed49af175d86c71678f047a50&chksm=bd2d01768a5a886064fb23c75f6f81133584102ec687f4e1b0659e1a583a8178e9e127829427&scene=21#wechat_redirect)》1.6W+

【惊喜】

《[架构师之路, 支持历史文章搜索](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960699&idx=1&sn=6ce5462538893285fd7985d7ca9eee1d&chksm=bd2d00a78a5a89b1c4290045269b7cdca9e0b13a3e5b33c5f13e0d4024f10e566203a2abbd4d&scene=21#wechat_redirect)》1.6W+



## 架构师之路16年精选50篇

**【方法论】**

《[**秒杀系统架构优化思路**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959391&idx=1&sn=fb28fd5e5f0895ddb167406d8a735548&scene=21#wechat_redirect)》

《[分布式ID生成器](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=403837240&idx=1&sn=ae9f2bf0cc5b0f68f9a2213485313127&scene=21#wechat_redirect)》

《[互联网架构, 如何进行容量设计](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959542&idx=1&sn=2494bbea9a855e0e1c3ccd6d2562a600&scene=21#wechat_redirect)》

《[线程数究竟设多少合理](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=404369373&idx=1&sn=cab2ac9ec0edf92e744a2329662b16cd&scene=21#wechat_redirect)》

《[单点系统架构的可用性与性能优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959480&idx=1&sn=337bd74410a6bef616128fd17abd08a8&scene=21#wechat_redirect)》

《[关于负载均衡的一切](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959585&idx=1&sn=0a9222cbfeb62a662edffafb7f0b43ae&scene=21#wechat_redirect)》

《[异构服务器负载均衡及过载保护](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959601&idx=1&sn=5684c39676b1f6d9366d9d15a2cdcec3&scene=21#wechat_redirect)》

《[LVS为何不能完全替代DNS轮询](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959595&idx=1&sn=5f0633afd24c547b895f29f6538baa99&scene=21#wechat_redirect)》

《[究竟啥才是互联网架构“高并发”](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959830&idx=1&sn=ce1c5a58caed227d7dfdbc16d6e1cea4&chksm=bd2d07ca8a5a8edc45cc45c4787cc72cf4c8b96fb43d2840c7ccd44978036a7d39a03dd578b5&scene=21#wechat_redirect)》

《[**究竟啥才是互联网架构“高可用”**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959728&idx=1&sn=933227840ec8cdc35d3a33ae3fe97ec5&chksm=bd2d046c8a5a8d7a13551124af36bedf68f7a6e31f6f32828678d2adb108b86b7e08c678f22f&scene=21#wechat_redirect)》

《[**100亿数据1万属性数据架构设计**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959855&idx=1&sn=f33abe8ec598c273f29cebb9365ece59&chksm=bd2d07f38a5a8ee58a944507a134e1da1efc3ac9c4d1c4cff261137cd986e51f5fe7cee9de15&scene=21#wechat_redirect)》


**【数据库与缓存】**

《[**数据库架构设计的一切**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400465735&idx=1&sn=8d7067de4cc8f73ea5558f07e0a9340e#wechat_redirect)》


《[缓存架构细节二三事](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=404087915&idx=1&sn=075664193f334874a3fc87fd4f712ebc&scene=21#wechat_redirect)》

《[数据冗余一致性优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=403963671&idx=1&sn=51a2d2fd70212451cd5f22bbe2c6f8d6&scene=21#wechat_redirect)》

《[缓存与数据库一致性优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=404202261&idx=1&sn=1b8254ba5013952923bdc21e0579108e&scene=21#wechat_redirect)》

《[主从DB与Cache一致性优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=404308725&idx=1&sn=1a25ce76dd1956014ceb8a011855268e&scene=21#wechat_redirect)》

《[DB主库与从库一致性优化4种方法](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959442&idx=1&sn=feb8ff75385d8031386e120ef3535329&scene=21#wechat_redirect)》

《[多库多事务一致性优化方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959486&idx=1&sn=cd3e6b27af159f4eabd54f148eec638a&scene=21#wechat_redirect)》

《[mysql并行复制优化思路](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959461&idx=1&sn=c4c9317f55075541be00d59039b88470&scene=21#wechat_redirect)》

《[互联网公司为何不使用mysql分区表](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959604&idx=1&sn=9f3e21f5ff99abc5a16038a77f31843e&scene=21#wechat_redirect)》

《[即使删了全库, 保证半小时恢复](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959694&idx=1&sn=4ac53b797fca64229901373e793f860a&chksm=bd2d04528a5a8d44618333de549094569f9ec58833ab64d081bc826b9361f587aca2972fc4c6&scene=21#wechat_redirect)》

《[啥, 又要为表增加一列属性](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959762&idx=1&sn=f7d8d7648416a0157af6ac61a6b555c8&chksm=bd2d040e8a5a8d181ec1baa2e96982991ddfc218bb6838f38da61b651e4b8de5f0bbbd94f814&scene=21#wechat_redirect)》

《[续集:这才是真正的表扩展方案](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959765&idx=1&sn=b9916aa95c320e41035977e0a8098ca6&chksm=bd2d04098a5a8d1f3af38f658c05002151e621170949d2e3bb5b1bceea55c64b0477dba4c647&scene=21#wechat_redirect)》

《[瞬间掌握数据库垂直拆分](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959773&idx=1&sn=7e4ad0dcd050f6662dfaf39d9de36f2c&chksm=bd2d04018a5a8d17b92098b4840aac23982e32d179cdd957e4c55011f6a08f6bd31f9ba5cfee&scene=21#wechat_redirect)》

《[**数据库秒级平滑扩容方案**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959883&idx=1&sn=e7df8510c7096a5b069e0f12eaaca010&chksm=bd2d07978a5a8e815c2ae41b16b6b4c579923502fb919008a22bb108a1e920109f25387f8903&scene=21#wechat_redirect)》


**【服务化与为服务】**

《[**互联网架构为什么要做服务化**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959519&idx=1&sn=065074b135fc9cb243abe897261e1a72&scene=21#wechat_redirect)》

《[微服务架构究竟多“微”合适](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959530&idx=1&sn=ff84bd74745eee1577e7dfef8ce66bbe&scene=21#wechat_redirect)》

《[要想微服务, 先搞定RPC框架](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959553&idx=1&sn=c1084e91875721c5f6baf544450afa38&scene=21#wechat_redirect)》

《[RPC-client序列化原理与细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959558&idx=1&sn=610f06c6d62a5c22311d27cf40f758ef&scene=21#wechat_redirect)》

《[RPC-client异步收发细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959576&idx=1&sn=2be8d3f61effe7118abf920a175da710&scene=21#wechat_redirect)》


**【消息系统】**

《[**微信为什么不丢消息**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959606&idx=1&sn=f9561231dd33bcd0550b8d0d59d6b876&chksm=bd2d04ea8a5a8dfce90c870279a7f74b7aedd802c2d699dd919d7e40ebe30699381517c2d54b&scene=21#wechat_redirect)》

《[微信为什么不丢“离线”消息](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959629&idx=1&sn=053d85a862df6e6c01147a1cf95bdbf2&chksm=bd2d04918a5a8d87a32305fa8ef1603bb0e73e5c4b78afb5a144327841e08840188c4541b4aa&scene=21#wechat_redirect)》

《[群消息这么复杂, 怎么做到不丢不重](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959643&idx=1&sn=844afa6a31770fa587474ecd73c3b3b3&chksm=bd2d04878a5a8d91c5c93ad8e85254185c63eb419457efbedcba54a9b8a9053da1e8980a694a&scene=21#wechat_redirect)》

《[多点登陆, 消息漫游架构随想](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959651&idx=1&sn=959540719a8336bd6f507a324dc7219a&chksm=bd2d04bf8a5a8da9ddfaeb106b61386adeb51c2ad7d4a32589c9a9e113f9341604a490eebb98&scene=21#wechat_redirect)》

《[QQ状态同步究竟是推还是拉](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959618&idx=1&sn=912a9af6d000c6681dc645e53590729b&chksm=bd2d049e8a5a8d884f6acb35bc5b40edf88127219542c9e3033bb4c2e33854657c315c8a93b7&scene=21#wechat_redirect)》

《[消息时序与一致性为何这么难](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959666&idx=1&sn=fbdce26e40296d5b30f70915c4b9eb0a&chksm=bd2d04ae8a5a8db868df14904d0a1ddb4eb4d8411442f5529f9760e7c62fca586cfa6f3bd200&scene=21#wechat_redirect)》

《[58到家通用消息平台架构细节](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959410&idx=1&sn=b91b5721ca394d15fb391097eddb752d&scene=21#wechat_redirect)》

《[微信为什么这么省流量](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959676&idx=1&sn=0204f47f3ecad9034d0a3607914d25c3&chksm=bd2d04a08a5a8db61f7d98d811b703847a5c7e04356b70fbd7ae741848eb427ed17d31011ae3&scene=21#wechat_redirect)》

《[即时通讯协议设计选型](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959701&idx=1&sn=89850966b5e807097f8d273009104c50&chksm=bd2d04498a5a8d5f49e98825accf6fc3d3dd4edd49d92a0012befa992454c82191cbd4efa4be&scene=21#wechat_redirect)》

《[**http如何像tcp一样实时的收消息**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959605&idx=1&sn=21f25087bef3c3a966ef03b824365621&scene=21#wechat_redirect)》

**【架构实践】**

《[**58同城架构演进, 流量从0到10亿**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400276397&idx=1&sn=ea044079667b82f6cad58bcb743af7bc&scene=21#wechat_redirect)》

《[58同城推荐系统架构设计实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959464&idx=1&sn=81c29bf2e237499be07deba826f73c39&scene=21#wechat_redirect)》

《[58转转从0开始推荐系统实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=402978440&idx=1&sn=f0ec24d9f3c81fe49868d12a5128fcc9&scene=21#wechat_redirect)》

《[58到家O2O快速个性化推荐](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=403209303&idx=1&sn=f4fea7390b3a2c31e693189aee44af59&scene=21#wechat_redirect)》

《[58到家入驻微信钱包的架构优化](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959423&idx=1&sn=19d27145beab5b0238280e2e3804e41b&scene=21#wechat_redirect)》

《[58到家快速搭建立体化监控平台之路](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959433&idx=1&sn=9c9a222c06b2426f3935b04a10f90c0b&scene=21#wechat_redirect)》

《[高并发下, 余额扣减一致性实践](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400556481&idx=1&sn=42bc187b45e4e53aece4b8c1f43e8019&scene=21#wechat_redirect)》


《[百度是怎么做长文本去重的](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=403419223&idx=1&sn=7f45d6bf8af2e2e87349570ab93af441&scene=21#wechat_redirect)》

《[快速实现高并发短文检索](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959451&idx=1&sn=991d9c3737d7db50a8351d50cdf6419d&scene=21#wechat_redirect)》

《[快速实现高并发无锁缓存](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959502&idx=1&sn=7a1c7d81a8e030856fb920844dc571c6&scene=21#wechat_redirect)》

《[id串行化到底是怎么实现的](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959668&idx=1&sn=d4c13071ab619c891efa03ba4e05334e&chksm=bd2d04a88a5a8dbe4ea606c4970be60c5f5c00f3e4cceeb91b26c8975b45678440c516012e79&scene=21#wechat_redirect)》

《[**58到家从IDC到云架构平滑迁移实践**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959495&idx=1&sn=0f8789d6803f94e190ba2787389e6d1b&scene=21#wechat_redirect)》

**【一分钟系列】**

《[1分钟1副图看懂单机/集群/热备/磁盘阵列](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400720056&idx=1&sn=10c796793e27d475603f97b23e137c12&scene=21#wechat_redirect)》

《[1分钟awk够用, 收藏后备用](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400743254&idx=1&sn=147abc381ccd61e28f52699735c8748e&scene=21#wechat_redirect)》

《[1分钟perl够用, 收藏后备用](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400764946&idx=1&sn=4efab1953696c2e21071e58a74da9b82&scene=21#wechat_redirect)》

《[1分钟sed够用, 收藏后备用](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=403340380&idx=1&sn=9b4ced5a19f60b0cebf6fd582f1d52ae&scene=21#wechat_redirect)》

《[1分钟了解两阶段提交2PC](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400856212&idx=1&sn=b9734da77f2259bdd1fa89700b47eaff&scene=21#wechat_redirect)》

《[1分钟1副图彻底搞懂join](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=400889133&idx=1&sn=3ea1c06fc76e92349a822f41f45b77b5&scene=21#wechat_redirect)》

《[**1分钟写好连接池**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959821&idx=1&sn=4ede084b05ce81a9a5ddb87ec62434bb&chksm=bd2d07d18a5a8ec7726619dbb9f1e99df8239ebd07d5f01d748e01c08dd543f0a434945301c6&scene=21#wechat_redirect)》

《[1分钟实现分布式锁](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959749&idx=1&sn=6727638930905089342662c24f5bba62&chksm=bd2d04198a5a8d0f619f1b9be1ead542f015e6ff87b5aac5a61af94b714459964fedb89e6516&scene=21#wechat_redirect)》

《[续集:这才是真正的分布式锁](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959755&idx=1&sn=e0875b539895578ce966fdad7f3c0365&chksm=bd2d04178a5a8d01a66d30b5ac8958fc5a6108e6e1d90a265361a7d3b30197bcb51f4433f23b&scene=21#wechat_redirect)》


**【通用素质】**

《[心态:晋升的为何不是你](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=404332602&idx=1&sn=a50ed411c893f6aeadbd66a25d31b94c&scene=21#wechat_redirect)》

《[鸡汤:你的收入取决于你的努力程度](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959534&idx=1&sn=1f2f3b92332439cd65a3f1e69391f55f&scene=21#wechat_redirect)》

《[爱女友:“我穿这衣服好看吗”终于破解了](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959561&idx=1&sn=60fcc75435a80280aebe8faffd28fda5&scene=21#wechat_redirect)》

《[管理:一分钟经理人](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959737&idx=1&sn=5d6f3fd25f6473e77f54269a1b384565&chksm=bd2d04658a5a8d7389fe8cb761dcc494498e5a330fb4b9db1d760d35f7ce8df26fc788227e6d&scene=21#wechat_redirect)》

《[访谈:架构师到底该不该写代码](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959776&idx=1&sn=10a8bcb1277fdd6bfb9e24b816697038&chksm=bd2d043c8a5a8d2a9b3e6638c855da30e2910b17a7f6d435118fb1fe09a99fb85950d98b4d63&scene=21#wechat_redirect)》

《[**如何做一场B格满满的技术大会演讲**](http://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651959675&idx=1&sn=98c61e127f4b82ca3ba86ff369dfdb3c&chksm=bd2d04a78a5a8db1f5de8c39a1398b8812ff2b9961642f7b813293ade34f602d42ea127b85aa&scene=21#wechat_redirect)》



**分布式技术**

[到底什么是分布式系统？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485176&idx=1&sn=336e9d819a2e9e76445633f2b8a2fa35&chksm=eb5383cedc240ad836597607177c674d88e8cd2213af64b807f884c1744fb920d7cc06a43a77&scene=21#wechat_redirect)

[分布式 ID 生成器的解决方案总结](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485071&idx=1&sn=c27a1a0a5f0215dafe0232eb85e98929&chksm=eb5383b9dc240aaf96c66feab1fcb8000aacb54c9e34ae8f3b8b6893a9aa96a9c787627e8480&scene=21#wechat_redirect)

[一张图告诉你为什么是服务网关](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485079&idx=1&sn=ebd346159e9dd3bb107237855c154443&chksm=eb5383a1dc240ab7c1e93cdd7da4810e9016a3c910c53296064fa27b87750d2c8f1b141d2d7e&scene=21#wechat_redirect)

[一文告诉你 Java RMI 和 RPC 的区别](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486403&idx=1&sn=3ec98d1553969ad38fbd225aef2c9807&chksm=eb538ef5dc2407e3ee906c378776baf473d2a27ae0e98ebd0970c1050eb2cb30a0467c84ceb5&scene=21#wechat_redirect)

[大型网站架构利器－CDN技术](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484046&idx=1&sn=ae59a28f56ec19de553e6ae0f40c78b4&chksm=eb5387b8dc240eae913af519cd8930bc8e5ed69d2f06103074081ab2e68f57ccca0d95314959&scene=21#wechat_redirect)

[分布式系统架构常识：CAP理论](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484936&idx=1&sn=ff6f3e83f62e792881e24b88347d9ae9&chksm=eb53833edc240a286fd36397032e8263fe5e0a856eb97016509a87c525d5f61f77e7bd8e16f5&scene=21#wechat_redirect)

[分布式服务防雪崩熔断器 Hystrix 理论实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484850&idx=1&sn=842408941864d7531a672b7e3bf8c55f&chksm=eb538084dc240992ebb8143fda8dab96b870eb965c19d9efb9f97f271278ec45a72c063a26d1&scene=21#wechat_redirect)

[5 分钟带你理解一致性 Hash 算法](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484848&idx=1&sn=d1bc4865d9fe7d679469f936efc175ca&chksm=eb538086dc240990e72b267a44c77a7e43f0c66604a913bcb73e985b8d1ffc91b733e19abf4a&scene=21#wechat_redirect)

[分布式 Session 共享解决方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484903&idx=1&sn=62a16276714b046e776cc132c49fff8f&chksm=eb5380d1dc2409c7ba2263b276e95cf078b1af8befde2087d9b646155bd74ad000703c696cf4&scene=21#wechat_redirect)

[分布式事务 TCC 的服务设计和实现](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483910&idx=1&sn=f3158b2c5226064dd6d9ab99746f9e79&chksm=9f211792a8569e84524073db5ede1a7a5d9fac3a1694558072b3c602232864c52ac8eb6c7c91&scene=21#wechat_redirect)

[分布式系统中处理参数配置的 4 种方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487426&idx=1&sn=fcf42e630fcb364df9ad3c2be3371de4&chksm=eb538af4dc2403e2d458c60d37135a768441433fae0de9f9c1dbd444b39942678eb6ba96f654&scene=21#wechat_redirect)

[牛逼哄哄的 RPC 框架，底层到底什么原理？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487507&idx=1&sn=7511f822bf95b25a2586dfdb0c06546f&chksm=eb539525dc241c33507a02d137bd48b9d9e2a33c8b76030f6cc372d0cfa478c8d83d230a9e96&scene=21#wechat_redirect)

[前后端分离与不分离的本质区别！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487686&idx=2&sn=12a6c80af67371bcc8990b84032f3d4b&chksm=eb5395f0dc241ce6d9d2e3cb4c35c80415b501bea78d9c0813dccca66cc8e0c17a49f7a6617d&scene=21#wechat_redirect)

[分布式事务不理解？一次给你讲清楚！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487861&idx=1&sn=1e041eb56eaec737f95af0b3e65ac0e8&chksm=eb539443dc241d55bdbcee140ab8b33182bcf9768f21a13ba4b03fcccf331ca1eb757ba6b90e&scene=21#wechat_redirect)

[老大难的分布式锁与幂等性问题，如何解决？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488612&idx=1&sn=da9e2759035d14ef1d9656ac9fd95971&chksm=eb539152dc2418445d74b384da03fccfc3ab47c3b0db11abc2f63d8c31692005a9812f7d709d&scene=21#wechat_redirect)

**架构方案**

[微服务架构及分布式事务解决方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486512&idx=1&sn=01ce7459e71ffe204025fb66248a0c08&chksm=eb538906dc240010f561e14f4a71f98db2e35eee892523e71456675bdbe30c56b0096433d975&scene=21#wechat_redirect)

[微信扫码登录是如何实现的？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487661&idx=1&sn=954cc0c9742128ba2bb9095276403ba3&chksm=eb53959bdc241c8d268789a78dacc335c7525a78eea5a21b567c4b915caf111d8ec2ae3a8e23&scene=21#wechat_redirect)

[高可用高并发的 9 种技术架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486132&idx=1&sn=2a5a05edd7c99af1a030938d790c3ff9&chksm=eb538f82dc24069427239bd3be1971d6c80eabaf2b03f4ab31c3de4b4e5623f559d589d17289&scene=21#wechat_redirect)

[17 张图揭密支付宝系统架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484641&idx=1&sn=5b41345d13bee9d868a76fe0f3cc5a07&chksm=eb5381d7dc2408c12800efeeb3ac2a460d8d8dd6a7435ed6911f0c044b739472d516a53f639b&scene=21#wechat_redirect)

[浅谈大型网站之负载均衡架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484082&idx=1&sn=7130a098aa282e4d37fd5ace9f9aa900&chksm=eb538784dc240e9225acf7fefb225c96b13f90cb1364c5a5a14a70dd4effe6e26f87ed0607f9&scene=21#wechat_redirect)

[完整的支付系统整体架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484849&idx=1&sn=92abdb83f5d5e04b86f4ebd320584962&chksm=eb538087dc24099110ed5cdf13f236341b4dc2753b77a1411c942e21284f33147c98faf8058d&scene=21#wechat_redirect)

[京东购物车的 Java 架构实现原理](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486038&idx=1&sn=37c08f7aff4642bdc7838df628957439&chksm=eb538f60dc240676b8248648bfae14637624f4f5256eedd49588abd955de0767ce0bb388c9c2&scene=21#wechat_redirect)

## [电商摸爬打滚出的高并发架构实战干货](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483833&idx=1&sn=bf54b525e810174ff90c7aeeee0bcf85&scene=21#wechat_redirect)

## [高并发大流量访问处理及解决方案](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483795&idx=1&sn=db33f6d1d3e61cbf2f6206c31f1fd341&scene=21#wechat_redirect)

[如何构建一套高可用的 APP 消息推送平台](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487397&idx=1&sn=557f51de4b0958be0b46d9150b6c48b9&chksm=eb538a93dc240385b260a45b80eb07b47c43fa72e8a1347ee1ce40c84ff01f3351feed44f49d&scene=21#wechat_redirect)

[Java 架构 6 大设计原则](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486402&idx=1&sn=1a6c6ce596d8fadb4f2c55162bf7e441&chksm=eb538ef4dc2407e2c6ef9027e79ac5e1ea93256ee9b43dc2bede74fb89668a5413822666b302&scene=21#wechat_redirect)

[架构师必须掌握的 10 条设计原则](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486986&idx=1&sn=824914c6820203085dc86c85aa592fbb&chksm=eb538b3cdc24022a7dd3d9c021e5f8b521d02c0c2ec150f32d504af3ac9e8d5c4eb30a68cf15&scene=21#wechat_redirect)

[服务高可用：幂等性设计](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484866&idx=1&sn=e9a6d0719003bd45ce555702d391f804&chksm=eb5380f4dc2409e27e5a1d6bdb9255d6d476bbdfd6321d637b79ef2120ca8710a50f6e08c0f7&scene=21#wechat_redirect)

[服务降级的概念及应用手段](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484906&idx=1&sn=7ffa3cf4ba05cc496ce0041fa4b94c24&chksm=eb5380dcdc2409cab162e545b60908e8e6a3f04e73e9ebd7ed6af50e8e48f624074a1bf0790c&scene=21#wechat_redirect)

[接口限流算法：漏桶算法 & 令牌桶算法](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484716&idx=1&sn=d2fc1055e6f7641aaa2419b4cb503a6a&chksm=eb53801adc24090c5af5383300b5df347e13bfeac06b605f51e4d5907c99b884d4de1b805694&scene=21#wechat_redirect)

[秒杀系统设计的 5 个要点](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486072&idx=1&sn=8e89218da1447e7965f8c833beacc256&chksm=eb538f4edc240658cf543ec5a55436c21038c284f3913c6e20706ae96a46058a5c7a18ad6520&scene=21#wechat_redirect)

[秒杀系统必须考虑的 3 个技术问题！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488525&idx=2&sn=6aeb174b96f47a3b516d2319cf9f8045&chksm=eb53913bdc24182de7450e83dd89aa731a57a448f5801ce33729f1f0969d11103ecc94cf8a14&scene=21#wechat_redirect)

[阿里巴巴制定了这 16 条「设计规约」](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486901&idx=2&sn=41fcc26f7c04827f936b088049619669&chksm=eb538883dc240195cf1d9f8cf0488f32d53735d1f44630e0eebdda440d24e6ac8a2f254ccfbf&scene=21#wechat_redirect)

[RESTful  API 设计技巧经验总结](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486775&idx=2&sn=870da6b84065df709d292724b6f2244f&chksm=eb538801dc24011703683679c126acac04aa5ea7992e5915e3b4ae0be2f4e56c3700d29fec12&scene=21#wechat_redirect)

[APP 架构之后端接口设计方案](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483921&idx=1&sn=ff12eaad83447fa42d625add75cc5558&chksm=9f211785a8569e9317ec3ff864430421ed9db154dcc479ae4d8436a90eb7131582bf9d950feb&scene=21#wechat_redirect)

## [MVC，MVP 和 MVVM 架构区别](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483812&idx=2&sn=9b092dba78e0db06622146bb0ed60fad&chksm=9f211430a8569d269c16eac665f1ec0c8c639d8b92969ff163dca94f7c8c31e040af22fa76be&scene=21#wechat_redirect)

[为什么前后端分离了，你比从前更痛苦？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483961&idx=1&sn=5dd9f7b264553902077c8ed63fa10200&chksm=9f2117ada8569ebb6a88e3051693ab03716e990ca3256e8651fe4ea84433c2c9c750953e9490&scene=21#wechat_redirect)


[微服务架构下静态数据通用缓存机制](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247484002&idx=1&sn=b4d78a046ac1f23e8daf11103c11bce1&chksm=9f2117f6a8569ee01eade46952a8da4197b678dba42dbdfc8ec22b4657e382f6e07c002f274d&scene=21#wechat_redirect)

[如何用 Netty 设计一个百万级推送服务？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483985&idx=1&sn=f1dd33d666f5ffe460b5ece886a84b4f&chksm=9f2117c5a8569ed3413935432086be13effeb14a5d8f34be3da8a3913f6dd60aad3cfa462acb&scene=21#wechat_redirect)

[基于 Spring Boot 和 Spring Cloud 实现微服务架构](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483974&idx=1&sn=22f392fb0c274a413a3be994596ee616&chksm=9f2117d2a8569ec42d14ab62849dbc3a1a11a4b0956e53a0855aacc66898bcfc968d9334c0b6&scene=21#wechat_redirect)

[为什么前后端分离了，你比从前更痛苦？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483961&idx=1&sn=5dd9f7b264553902077c8ed63fa10200&chksm=9f2117ada8569ebb6a88e3051693ab03716e990ca3256e8651fe4ea84433c2c9c750953e9490&scene=21#wechat_redirect)

[微信、淘宝类扫码登录实现原理解析](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483953&idx=1&sn=0c19dd5368ef215dcc397a1b14d4baeb&chksm=9f2117a5a8569eb3a6cd1369ac9046adea9027d8128285e79910d8d7013a11d31272f90678e6&scene=21#wechat_redirect)

[老板让你抗住千万级流量，如何做架构设计？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487713&idx=1&sn=a59c4fbf67ec11da63c25064c5e21bb4&chksm=eb5395d7dc241cc1a1fc80fcfa65c58064560ecb8880387a9f21a575f66490b69dc238fad844&scene=21#wechat_redirect)


[阿里巴巴是如何打通 CMDB，实现就近访问的？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488145&idx=2&sn=0b21c0c37ba51dae29106970ef979091&chksm=eb5397a7dc241eb1ccd2a2ee680da70e2f456b9d49e72a9f1eab88142c3caf091a1eb5e2f822&scene=21#wechat_redirect)


**设计模式**

[设计模式之单例模式实践](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483742&idx=1&sn=9429b26871f19e4dafd1bf0c7ec0520e&chksm=eb538468dc240d7e968486dbdb7fa440b365ac81a3d9920013781776b601754b1a0659b92b70&scene=21#wechat_redirect)

[设计模式之静态代理模式实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483790&idx=1&sn=fe77ac9841f0053e7a94e5ab1ed53861&chksm=eb5384b8dc240dae71f7fab094b6bb9ce316e341b6b57bc603d747414949e688663adc6b2023&scene=21#wechat_redirect)

[设计模式之动态代理模式实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483791&idx=1&sn=548b40dd2ff72f5b553fa6d5f63fda7f&chksm=eb5384b9dc240daf63e6cc3a29827d7de6629cd26902c92143ac0cd88d6fe878d7bc7dc1abfa&scene=21#wechat_redirect)

[详解 Java 中的三种代理模式](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486759&idx=2&sn=6769d8ff9d163babe726b6213c6d15e4&chksm=eb538811dc240107bcf2a6e65b5381b2a68175af8ff12f4e2c1b0a06f7d16850db4acb64a18e&scene=21#wechat_redirect)

消息队列

## [](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484823&idx=1&sn=3501d7b5376ed02f966a9806f1f1ee92&chksm=eb5380a1dc2409b77d3b05a574f18fc4b536d86910a1abedfcef5c2093dd555258a5a87e86db&scene=21#wechat_redirect)

## [消息队列常见的几种使用场景介绍](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483886&idx=1&sn=0e34ee731772bd06c71370a5b90230c3&scene=21#wechat_redirect)

[消息中间件如何选型？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485210&idx=1&sn=3b7aee066ff45a81ea5fbe7539bb6021&chksm=eb53822cdc240b3a720eb4f2803c7cd83afb342a124ae96719283481a449dec5f357f71a7518&scene=21#wechat_redirect)

[RabbitMQ 和 Kafka 到底怎么选？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483978&idx=1&sn=3fece80abd3ee65b7493e8024d374393&chksm=9f2117dea8569ec89c9bd19f10a1fff815cfd2111b11915e013a8740684a65d2b1f33cc9fd04&scene=21#wechat_redirect)

Dubbo

[Dubbo 架构设计详解](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486281&idx=1&sn=e744b1405b20a45a436f5dbf69a6dd5b&chksm=eb538e7fdc2407693ca04a7fe95d2618b8bf08962ffaaf61940e1136c84cae5ee8c2a1d358bc&scene=21#wechat_redirect)

[Dubbo 服务调试管理实用命令](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483709&idx=1&sn=afe0688c184f00902529583a85d90089&chksm=eb53840bdc240d1de00b7c68dbcd7b6251d7bec9b01f2984aad69b58f9ec0ae85d2675a6146a&scene=21#wechat_redirect)

Zookeeper

[Zookeeper 集群安装配置，超详细，速度收藏！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488169&idx=1&sn=248b75817e4a6c8e65c40a6b17603196&chksm=eb53979fdc241e8957a82741c5bed23137daf8726b88f237c771831fbbd362dead4399070de2&scene=21#wechat_redirect)

**综合技术**

[全球架构师峰会全程内容分享](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486411&idx=1&sn=a9fe05e3c26a5ae1672d74a53a6f2487&chksm=eb538efddc2407eb6312630c5e234d30ed5630fa338d891146e2c1d4d9810996ae375107de63&scene=21#wechat_redirect)

[一张图告诉你什么是系统架构师](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485053&idx=1&sn=ad97b0306b1760acea80740d9652e920&chksm=eb53834bdc240a5de8f57dcdddc2817dd29c8a3cd28fa27a806b10e65c0ac50d102663ccfda8&scene=21#wechat_redirect)

[34 张架构史上最全技术知识图谱](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484330&idx=1&sn=30f9cbb95821d06a3a5884edd8f1cb4f&chksm=eb53869cdc240f8a237b975ec7f51817c020cfaacfaf48c6ac8a7bb9ca3516ee39db1847dfdf&scene=21#wechat_redirect)

[网站性能测试各个性能指标详解](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484873&idx=1&sn=29b53be1cf632d78b52a0cd78532e3a1&chksm=eb5380ffdc2409e95183b57d2a931f44eec754a9c6b545d177e2f0590e0b023d230611a07faa&scene=21#wechat_redirect)

[8 条关于 Web 前端性能的优化建议](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484905&idx=1&sn=e76cefe6958806a41b39680201ff77b6&chksm=eb5380dfdc2409c919d55a49e2a96548f824f13179c265af56fad08e6ed86e2d9283da5ad221&scene=21#wechat_redirect)

[SLA 服务可用性 99.99 是什么意思？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485120&idx=1&sn=9b41d713eda47ca6e0f545b7d8753498&chksm=eb5383f6dc240ae0fc4ad87ff9fca94ab71b22ca5ca1cefaafecd7cb9b85b32975ddbe0c1e48&scene=21#wechat_redirect)

## [高并发大容量 NoSQL 解决方案](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483819&idx=1&sn=5496fe56a5430ed02111a0eca4fe1151&scene=21#wechat_redirect)

## [提升系统 10 倍性能的 10 个建议](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483892&idx=1&sn=2eda85ed57bfebd3d80ca7ae72cfdcf1&scene=21#wechat_redirect)

## [优秀架构师必须掌握的架构思维](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483899&idx=1&sn=77d2e0b9b40cb920197ad2a30c2c6653&chksm=9f21146fa8569d797c75acf61233fd58c55db09b26156ef48f103cf76ce3286d235d1e540314&scene=21#wechat_redirect)

[架构师的工作内容都干些什么？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487107&idx=1&sn=9a1d60fa41dff3af5a8532bcbca9761d&chksm=eb538bb5dc2402a338e794abfb4d523596530bb9d389055e9a5baabb56e4674563d2ec2ba7f8&scene=21#wechat_redirect)

[超详细 Nginx 极简教程，傻瓜一看也会！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487632&idx=1&sn=e85e5174db089aa9ae60770fe3105a84&chksm=eb5395a6dc241cb066e4650997a3b1e0dc703c8db5cfd0031168a98418e80257e958c0ed99d9&scene=21#wechat_redirect)

[向高手进阶，从 0 开始手写实现一个 RPC 框架！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488220&idx=1&sn=0223c1a3b5b0745e497ebb920a910fa9&chksm=eb5397eadc241efc9e37be34e39eadf6ab91a365ebcba925f49032df6bf22e9681b4aa2be556&scene=21#wechat_redirect)

[把 14 亿人拉到一个微信群，如何实现？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488443&idx=1&sn=75a49a28ff58d93db5e95ffa2bed3905&chksm=eb53968ddc241f9b210be799ba09d58582eff238ddbbdcd5fdab1cec79ffdf6ef02c302cfab0&scene=21#wechat_redirect)

[狗屎一样的代码！快，重构我！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488468&idx=1&sn=5ce2259a11bd98e9409055d3afa42fab&chksm=eb5396e3dc241ff594259c689353bb61a3870cc7c05b55bf25ad23c7&scene=21#wechat_redirect)

[软件开发中的开源协议详解！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488573&idx=2&sn=fbec600e9c3c0740f8aa6a7078a42e2f&chksm=eb53910bdc24181da2d6331354e7f76ee67db6135ecf90b54d4ef645ba49f38f3cb451216344&scene=21#wechat_redirect)

[服务端 I/O 性能大比拼：Node、PHP、Java、Go哪家强？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488604&idx=2&sn=ce476c9a8bec366ef6ef2ff562df6176&chksm=eb53916adc24187c9dea067506030bce5f67336e5c655a5bca1cdd88e0f78675ab36562aa7b0&scene=21#wechat_redirect)

**分布式技术**

[到底什么是分布式系统？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485176&idx=1&sn=336e9d819a2e9e76445633f2b8a2fa35&chksm=eb5383cedc240ad836597607177c674d88e8cd2213af64b807f884c1744fb920d7cc06a43a77&scene=21#wechat_redirect)

[分布式 ID 生成器的解决方案总结](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485071&idx=1&sn=c27a1a0a5f0215dafe0232eb85e98929&chksm=eb5383b9dc240aaf96c66feab1fcb8000aacb54c9e34ae8f3b8b6893a9aa96a9c787627e8480&scene=21#wechat_redirect)

[一张图告诉你为什么是服务网关](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485079&idx=1&sn=ebd346159e9dd3bb107237855c154443&chksm=eb5383a1dc240ab7c1e93cdd7da4810e9016a3c910c53296064fa27b87750d2c8f1b141d2d7e&scene=21#wechat_redirect)

[一文告诉你 Java RMI 和 RPC 的区别](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486403&idx=1&sn=3ec98d1553969ad38fbd225aef2c9807&chksm=eb538ef5dc2407e3ee906c378776baf473d2a27ae0e98ebd0970c1050eb2cb30a0467c84ceb5&scene=21#wechat_redirect)

[大型网站架构利器－CDN技术](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484046&idx=1&sn=ae59a28f56ec19de553e6ae0f40c78b4&chksm=eb5387b8dc240eae913af519cd8930bc8e5ed69d2f06103074081ab2e68f57ccca0d95314959&scene=21#wechat_redirect)

[分布式系统架构常识：CAP理论](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484936&idx=1&sn=ff6f3e83f62e792881e24b88347d9ae9&chksm=eb53833edc240a286fd36397032e8263fe5e0a856eb97016509a87c525d5f61f77e7bd8e16f5&scene=21#wechat_redirect)

[分布式服务防雪崩熔断器 Hystrix 理论实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484850&idx=1&sn=842408941864d7531a672b7e3bf8c55f&chksm=eb538084dc240992ebb8143fda8dab96b870eb965c19d9efb9f97f271278ec45a72c063a26d1&scene=21#wechat_redirect)

[5 分钟带你理解一致性 Hash 算法](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484848&idx=1&sn=d1bc4865d9fe7d679469f936efc175ca&chksm=eb538086dc240990e72b267a44c77a7e43f0c66604a913bcb73e985b8d1ffc91b733e19abf4a&scene=21#wechat_redirect)

[分布式 Session 共享解决方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484903&idx=1&sn=62a16276714b046e776cc132c49fff8f&chksm=eb5380d1dc2409c7ba2263b276e95cf078b1af8befde2087d9b646155bd74ad000703c696cf4&scene=21#wechat_redirect)

[分布式事务 TCC 的服务设计和实现](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483910&idx=1&sn=f3158b2c5226064dd6d9ab99746f9e79&chksm=9f211792a8569e84524073db5ede1a7a5d9fac3a1694558072b3c602232864c52ac8eb6c7c91&scene=21#wechat_redirect)

[分布式系统中处理参数配置的 4 种方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487426&idx=1&sn=fcf42e630fcb364df9ad3c2be3371de4&chksm=eb538af4dc2403e2d458c60d37135a768441433fae0de9f9c1dbd444b39942678eb6ba96f654&scene=21#wechat_redirect)

[牛逼哄哄的 RPC 框架，底层到底什么原理？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487507&idx=1&sn=7511f822bf95b25a2586dfdb0c06546f&chksm=eb539525dc241c33507a02d137bd48b9d9e2a33c8b76030f6cc372d0cfa478c8d83d230a9e96&scene=21#wechat_redirect)

[前后端分离与不分离的本质区别！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487686&idx=2&sn=12a6c80af67371bcc8990b84032f3d4b&chksm=eb5395f0dc241ce6d9d2e3cb4c35c80415b501bea78d9c0813dccca66cc8e0c17a49f7a6617d&scene=21#wechat_redirect)

[分布式事务不理解？一次给你讲清楚！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487861&idx=1&sn=1e041eb56eaec737f95af0b3e65ac0e8&chksm=eb539443dc241d55bdbcee140ab8b33182bcf9768f21a13ba4b03fcccf331ca1eb757ba6b90e&scene=21#wechat_redirect)

[老大难的分布式锁与幂等性问题，如何解决？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488612&idx=1&sn=da9e2759035d14ef1d9656ac9fd95971&chksm=eb539152dc2418445d74b384da03fccfc3ab47c3b0db11abc2f63d8c31692005a9812f7d709d&scene=21#wechat_redirect)

**架构方案**

[微服务架构及分布式事务解决方案](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486512&idx=1&sn=01ce7459e71ffe204025fb66248a0c08&chksm=eb538906dc240010f561e14f4a71f98db2e35eee892523e71456675bdbe30c56b0096433d975&scene=21#wechat_redirect)

[微信扫码登录是如何实现的？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487661&idx=1&sn=954cc0c9742128ba2bb9095276403ba3&chksm=eb53959bdc241c8d268789a78dacc335c7525a78eea5a21b567c4b915caf111d8ec2ae3a8e23&scene=21#wechat_redirect)

[高可用高并发的 9 种技术架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486132&idx=1&sn=2a5a05edd7c99af1a030938d790c3ff9&chksm=eb538f82dc24069427239bd3be1971d6c80eabaf2b03f4ab31c3de4b4e5623f559d589d17289&scene=21#wechat_redirect)

[17 张图揭密支付宝系统架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484641&idx=1&sn=5b41345d13bee9d868a76fe0f3cc5a07&chksm=eb5381d7dc2408c12800efeeb3ac2a460d8d8dd6a7435ed6911f0c044b739472d516a53f639b&scene=21#wechat_redirect)

[浅谈大型网站之负载均衡架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484082&idx=1&sn=7130a098aa282e4d37fd5ace9f9aa900&chksm=eb538784dc240e9225acf7fefb225c96b13f90cb1364c5a5a14a70dd4effe6e26f87ed0607f9&scene=21#wechat_redirect)

[完整的支付系统整体架构](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484849&idx=1&sn=92abdb83f5d5e04b86f4ebd320584962&chksm=eb538087dc24099110ed5cdf13f236341b4dc2753b77a1411c942e21284f33147c98faf8058d&scene=21#wechat_redirect)

[京东购物车的 Java 架构实现原理](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486038&idx=1&sn=37c08f7aff4642bdc7838df628957439&chksm=eb538f60dc240676b8248648bfae14637624f4f5256eedd49588abd955de0767ce0bb388c9c2&scene=21#wechat_redirect)

## [电商摸爬打滚出的高并发架构实战干货](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483833&idx=1&sn=bf54b525e810174ff90c7aeeee0bcf85&scene=21#wechat_redirect)

## [高并发大流量访问处理及解决方案](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483795&idx=1&sn=db33f6d1d3e61cbf2f6206c31f1fd341&scene=21#wechat_redirect)

[如何构建一套高可用的 APP 消息推送平台](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487397&idx=1&sn=557f51de4b0958be0b46d9150b6c48b9&chksm=eb538a93dc240385b260a45b80eb07b47c43fa72e8a1347ee1ce40c84ff01f3351feed44f49d&scene=21#wechat_redirect)

[Java 架构 6 大设计原则](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486402&idx=1&sn=1a6c6ce596d8fadb4f2c55162bf7e441&chksm=eb538ef4dc2407e2c6ef9027e79ac5e1ea93256ee9b43dc2bede74fb89668a5413822666b302&scene=21#wechat_redirect)

[架构师必须掌握的 10 条设计原则](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486986&idx=1&sn=824914c6820203085dc86c85aa592fbb&chksm=eb538b3cdc24022a7dd3d9c021e5f8b521d02c0c2ec150f32d504af3ac9e8d5c4eb30a68cf15&scene=21#wechat_redirect)

[服务高可用：幂等性设计](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484866&idx=1&sn=e9a6d0719003bd45ce555702d391f804&chksm=eb5380f4dc2409e27e5a1d6bdb9255d6d476bbdfd6321d637b79ef2120ca8710a50f6e08c0f7&scene=21#wechat_redirect)

[服务降级的概念及应用手段](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484906&idx=1&sn=7ffa3cf4ba05cc496ce0041fa4b94c24&chksm=eb5380dcdc2409cab162e545b60908e8e6a3f04e73e9ebd7ed6af50e8e48f624074a1bf0790c&scene=21#wechat_redirect)

[接口限流算法：漏桶算法 & 令牌桶算法](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484716&idx=1&sn=d2fc1055e6f7641aaa2419b4cb503a6a&chksm=eb53801adc24090c5af5383300b5df347e13bfeac06b605f51e4d5907c99b884d4de1b805694&scene=21#wechat_redirect)

[秒杀系统设计的 5 个要点](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486072&idx=1&sn=8e89218da1447e7965f8c833beacc256&chksm=eb538f4edc240658cf543ec5a55436c21038c284f3913c6e20706ae96a46058a5c7a18ad6520&scene=21#wechat_redirect)

[秒杀系统必须考虑的 3 个技术问题！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488525&idx=2&sn=6aeb174b96f47a3b516d2319cf9f8045&chksm=eb53913bdc24182de7450e83dd89aa731a57a448f5801ce33729f1f0969d11103ecc94cf8a14&scene=21#wechat_redirect)

[阿里巴巴制定了这 16 条「设计规约」](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486901&idx=2&sn=41fcc26f7c04827f936b088049619669&chksm=eb538883dc240195cf1d9f8cf0488f32d53735d1f44630e0eebdda440d24e6ac8a2f254ccfbf&scene=21#wechat_redirect)

[RESTful  API 设计技巧经验总结](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486775&idx=2&sn=870da6b84065df709d292724b6f2244f&chksm=eb538801dc24011703683679c126acac04aa5ea7992e5915e3b4ae0be2f4e56c3700d29fec12&scene=21#wechat_redirect)

[APP 架构之后端接口设计方案](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483921&idx=1&sn=ff12eaad83447fa42d625add75cc5558&chksm=9f211785a8569e9317ec3ff864430421ed9db154dcc479ae4d8436a90eb7131582bf9d950feb&scene=21#wechat_redirect)

## [MVC，MVP 和 MVVM 架构区别](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483812&idx=2&sn=9b092dba78e0db06622146bb0ed60fad&chksm=9f211430a8569d269c16eac665f1ec0c8c639d8b92969ff163dca94f7c8c31e040af22fa76be&scene=21#wechat_redirect)

[为什么前后端分离了，你比从前更痛苦？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483961&idx=1&sn=5dd9f7b264553902077c8ed63fa10200&chksm=9f2117ada8569ebb6a88e3051693ab03716e990ca3256e8651fe4ea84433c2c9c750953e9490&scene=21#wechat_redirect)


[微服务架构下静态数据通用缓存机制](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247484002&idx=1&sn=b4d78a046ac1f23e8daf11103c11bce1&chksm=9f2117f6a8569ee01eade46952a8da4197b678dba42dbdfc8ec22b4657e382f6e07c002f274d&scene=21#wechat_redirect)

[如何用 Netty 设计一个百万级推送服务？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483985&idx=1&sn=f1dd33d666f5ffe460b5ece886a84b4f&chksm=9f2117c5a8569ed3413935432086be13effeb14a5d8f34be3da8a3913f6dd60aad3cfa462acb&scene=21#wechat_redirect)

[基于 Spring Boot 和 Spring Cloud 实现微服务架构](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483974&idx=1&sn=22f392fb0c274a413a3be994596ee616&chksm=9f2117d2a8569ec42d14ab62849dbc3a1a11a4b0956e53a0855aacc66898bcfc968d9334c0b6&scene=21#wechat_redirect)

[为什么前后端分离了，你比从前更痛苦？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483961&idx=1&sn=5dd9f7b264553902077c8ed63fa10200&chksm=9f2117ada8569ebb6a88e3051693ab03716e990ca3256e8651fe4ea84433c2c9c750953e9490&scene=21#wechat_redirect)

[微信、淘宝类扫码登录实现原理解析](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483953&idx=1&sn=0c19dd5368ef215dcc397a1b14d4baeb&chksm=9f2117a5a8569eb3a6cd1369ac9046adea9027d8128285e79910d8d7013a11d31272f90678e6&scene=21#wechat_redirect)

[老板让你抗住千万级流量，如何做架构设计？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487713&idx=1&sn=a59c4fbf67ec11da63c25064c5e21bb4&chksm=eb5395d7dc241cc1a1fc80fcfa65c58064560ecb8880387a9f21a575f66490b69dc238fad844&scene=21#wechat_redirect)


[阿里巴巴是如何打通 CMDB，实现就近访问的？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488145&idx=2&sn=0b21c0c37ba51dae29106970ef979091&chksm=eb5397a7dc241eb1ccd2a2ee680da70e2f456b9d49e72a9f1eab88142c3caf091a1eb5e2f822&scene=21#wechat_redirect)


**设计模式**

[设计模式之单例模式实践](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483742&idx=1&sn=9429b26871f19e4dafd1bf0c7ec0520e&chksm=eb538468dc240d7e968486dbdb7fa440b365ac81a3d9920013781776b601754b1a0659b92b70&scene=21#wechat_redirect)

[设计模式之静态代理模式实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483790&idx=1&sn=fe77ac9841f0053e7a94e5ab1ed53861&chksm=eb5384b8dc240dae71f7fab094b6bb9ce316e341b6b57bc603d747414949e688663adc6b2023&scene=21#wechat_redirect)

[设计模式之动态代理模式实战](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483791&idx=1&sn=548b40dd2ff72f5b553fa6d5f63fda7f&chksm=eb5384b9dc240daf63e6cc3a29827d7de6629cd26902c92143ac0cd88d6fe878d7bc7dc1abfa&scene=21#wechat_redirect)

[详解 Java 中的三种代理模式](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486759&idx=2&sn=6769d8ff9d163babe726b6213c6d15e4&chksm=eb538811dc240107bcf2a6e65b5381b2a68175af8ff12f4e2c1b0a06f7d16850db4acb64a18e&scene=21#wechat_redirect)

消息队列

## [](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484823&idx=1&sn=3501d7b5376ed02f966a9806f1f1ee92&chksm=eb5380a1dc2409b77d3b05a574f18fc4b536d86910a1abedfcef5c2093dd555258a5a87e86db&scene=21#wechat_redirect)

## [消息队列常见的几种使用场景介绍](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483886&idx=1&sn=0e34ee731772bd06c71370a5b90230c3&scene=21#wechat_redirect)

[消息中间件如何选型？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485210&idx=1&sn=3b7aee066ff45a81ea5fbe7539bb6021&chksm=eb53822cdc240b3a720eb4f2803c7cd83afb342a124ae96719283481a449dec5f357f71a7518&scene=21#wechat_redirect)

[RabbitMQ 和 Kafka 到底怎么选？](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483978&idx=1&sn=3fece80abd3ee65b7493e8024d374393&chksm=9f2117dea8569ec89c9bd19f10a1fff815cfd2111b11915e013a8740684a65d2b1f33cc9fd04&scene=21#wechat_redirect)

Dubbo

[Dubbo 架构设计详解](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486281&idx=1&sn=e744b1405b20a45a436f5dbf69a6dd5b&chksm=eb538e7fdc2407693ca04a7fe95d2618b8bf08962ffaaf61940e1136c84cae5ee8c2a1d358bc&scene=21#wechat_redirect)

[Dubbo 服务调试管理实用命令](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247483709&idx=1&sn=afe0688c184f00902529583a85d90089&chksm=eb53840bdc240d1de00b7c68dbcd7b6251d7bec9b01f2984aad69b58f9ec0ae85d2675a6146a&scene=21#wechat_redirect)

Zookeeper

[Zookeeper 集群安装配置，超详细，速度收藏！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488169&idx=1&sn=248b75817e4a6c8e65c40a6b17603196&chksm=eb53979fdc241e8957a82741c5bed23137daf8726b88f237c771831fbbd362dead4399070de2&scene=21#wechat_redirect)

**综合技术**

[全球架构师峰会全程内容分享](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486411&idx=1&sn=a9fe05e3c26a5ae1672d74a53a6f2487&chksm=eb538efddc2407eb6312630c5e234d30ed5630fa338d891146e2c1d4d9810996ae375107de63&scene=21#wechat_redirect)

[一张图告诉你什么是系统架构师](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485053&idx=1&sn=ad97b0306b1760acea80740d9652e920&chksm=eb53834bdc240a5de8f57dcdddc2817dd29c8a3cd28fa27a806b10e65c0ac50d102663ccfda8&scene=21#wechat_redirect)

[34 张架构史上最全技术知识图谱](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484330&idx=1&sn=30f9cbb95821d06a3a5884edd8f1cb4f&chksm=eb53869cdc240f8a237b975ec7f51817c020cfaacfaf48c6ac8a7bb9ca3516ee39db1847dfdf&scene=21#wechat_redirect)

[网站性能测试各个性能指标详解](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484873&idx=1&sn=29b53be1cf632d78b52a0cd78532e3a1&chksm=eb5380ffdc2409e95183b57d2a931f44eec754a9c6b545d177e2f0590e0b023d230611a07faa&scene=21#wechat_redirect)

[8 条关于 Web 前端性能的优化建议](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484905&idx=1&sn=e76cefe6958806a41b39680201ff77b6&chksm=eb5380dfdc2409c919d55a49e2a96548f824f13179c265af56fad08e6ed86e2d9283da5ad221&scene=21#wechat_redirect)

[SLA 服务可用性 99.99 是什么意思？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247485120&idx=1&sn=9b41d713eda47ca6e0f545b7d8753498&chksm=eb5383f6dc240ae0fc4ad87ff9fca94ab71b22ca5ca1cefaafecd7cb9b85b32975ddbe0c1e48&scene=21#wechat_redirect)

## [高并发大容量 NoSQL 解决方案](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483819&idx=1&sn=5496fe56a5430ed02111a0eca4fe1151&scene=21#wechat_redirect)

## [提升系统 10 倍性能的 10 个建议](https://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483892&idx=1&sn=2eda85ed57bfebd3d80ca7ae72cfdcf1&scene=21#wechat_redirect)

## [优秀架构师必须掌握的架构思维](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483899&idx=1&sn=77d2e0b9b40cb920197ad2a30c2c6653&chksm=9f21146fa8569d797c75acf61233fd58c55db09b26156ef48f103cf76ce3286d235d1e540314&scene=21#wechat_redirect)

[架构师的工作内容都干些什么？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487107&idx=1&sn=9a1d60fa41dff3af5a8532bcbca9761d&chksm=eb538bb5dc2402a338e794abfb4d523596530bb9d389055e9a5baabb56e4674563d2ec2ba7f8&scene=21#wechat_redirect)

[超详细 Nginx 极简教程，傻瓜一看也会！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487632&idx=1&sn=e85e5174db089aa9ae60770fe3105a84&chksm=eb5395a6dc241cb066e4650997a3b1e0dc703c8db5cfd0031168a98418e80257e958c0ed99d9&scene=21#wechat_redirect)

[向高手进阶，从 0 开始手写实现一个 RPC 框架！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488220&idx=1&sn=0223c1a3b5b0745e497ebb920a910fa9&chksm=eb5397eadc241efc9e37be34e39eadf6ab91a365ebcba925f49032df6bf22e9681b4aa2be556&scene=21#wechat_redirect)

[把 14 亿人拉到一个微信群，如何实现？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488443&idx=1&sn=75a49a28ff58d93db5e95ffa2bed3905&chksm=eb53968ddc241f9b210be799ba09d58582eff238ddbbdcd5fdab1cec79ffdf6ef02c302cfab0&scene=21#wechat_redirect)

[狗屎一样的代码！快，重构我！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488468&idx=1&sn=5ce2259a11bd98e9409055d3afa42fab&chksm=eb5396e3dc241ff594259c689353bb61a3870cc7c05b55bf25ad23c7&scene=21#wechat_redirect)

[软件开发中的开源协议详解！](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488573&idx=2&sn=fbec600e9c3c0740f8aa6a7078a42e2f&chksm=eb53910bdc24181da2d6331354e7f76ee67db6135ecf90b54d4ef645ba49f38f3cb451216344&scene=21#wechat_redirect)

[服务端 I/O 性能大比拼：Node、PHP、Java、Go哪家强？](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247488604&idx=2&sn=ce476c9a8bec366ef6ef2ff562df6176&chksm=eb53916adc24187c9dea067506030bce5f67336e5c655a5bca1cdd88e0f78675ab36562aa7b0&scene=21#wechat_redirect)

# 入门到放弃的 Java 架构师面试题

基础题目

1. Java线程的状态

2. 进程和线程的区别，进程间如何通讯，线程间如何通讯

3. HashMap的数据结构是什么？如何实现的。和HashTable，ConcurrentHashMap的区别

4. Cookie和Session的区别

5. 索引有什么用？如何建索引？

6. ArrayList是如何实现的，ArrayList和LinkedList的区别？ArrayList如何实现扩容。

7. equals方法实现

8. 面向对象

9. 线程状态，BLOCKED和WAITING有什么区别

10. JVM如何加载字节码文件

11. JVM GC，GC算法。

12. 什么情况会出现Full GC，什么情况会出现yong GC。

13. JVM内存模型

14. Java运行时数据区

15. 事务的实现原理

技术深度

1. 有没有看过JDK源码，看过的类实现原理是什么。

2. HTTP协议

3. TCP协议

4. 一致性Hash算法

5. JVM如何加载字节码文件

6. 类加载器如何卸载字节码

7. IO和NIO的区别，NIO优点

8. Java线程池的实现原理，keepAliveTime等参数的作用。

9. HTTP连接池实现原理

10. 数据库连接池实现原理

11. 数据库的实现原理

技术框架

1. 看过哪些开源框架的源码

2. 为什么要用Redis，Redis有哪些优缺点？Redis如何实现扩容？

3. Netty是如何使用线程池的，为什么这么使用

4. 为什么要使用Spring，Spring的优缺点有哪些

5. Spring的IOC容器初始化流程

6. Spring的IOC容器实现原理，为什么可以通过byName和ByType找到Bean

7. Spring AOP实现原理

8. 消息中间件是如何实现的，技术难点有哪些

系统架构

1. 如何搭建一个高可用系统

2. 哪些设计模式可以增加系统的可扩展性

3. 介绍设计模式，如模板模式，命令模式，策略模式，适配器模式、桥接模式、装饰模式，观察者模式，状态模式，访问者模式。

4. 抽象能力，怎么提高研发效率。

5. 什么是高内聚低耦合，请举例子如何实现

6. 什么情况用接口，什么情况用消息

7. 如果AB两个系统互相依赖，如何解除依赖

8. 如何写一篇设计文档，目录是什么

9. 什么场景应该拆分系统，什么场景应该合并系统

10. 系统和模块的区别，分别在什么场景下使用

分布式系统

1. 分布式事务，两阶段提交。

2. 如何实现分布式锁

3. 如何实现分布式Session

4. 如何保证消息的一致性

5. 负载均衡

6. 正向代理（客户端代理）和反向代理（服务器端代理）

7. CDN实现原理

8. 怎么提升系统的QPS和吞吐量

实战能力

1. 有没有处理过线上问题？出现内存泄露，CPU利用率标高，应用无响应时如何处理的。

2. 开发中有没有遇到什么技术问题？如何解决的

3. 如果有几十亿的白名单，每天白天需要高并发查询，晚上需要更新一次，如何设计这个功能。

4. 新浪微博是如何实现把微博推给订阅者

5. Google是如何在一秒内把搜索结果返回给用户的。

6. 12306网站的订票系统如何实现，如何保证不会票不被超卖。

7. 如何实现一个秒杀系统，保证只有几位用户能买到某件商品。

软能力

1. 如何学习一项新技术，比如如何学习Java的，重点学习什么

2. 有关注哪些新的技术

3. 工作任务非常多非常杂时如何处理

4. 项目出现延迟如何处理

5. 和同事的设计思路不一样怎么处理

6. 如何保证开发质量

7. 职业规划是什么？短期，长期目标是什么

8. 团队的规划是什么

9. 能介绍下从工作到现在自己的成长在那里

JAVA架构师的水准

既然java架构师，首先你要是一个高级java攻城尸，熟练使用各种框架，并知道它们实现的原理。jvm虚拟机原理、调优,懂得jvm能让你写出性能更好的代码；

池技术，什么对象池，连接池，线程池...:;java反射技术，写框架必备的技术，但是有严重的性能问题，替代方案java字节码技术;nio，没什么好说的，值得注意的是"直接内存"的特点，使用场景;java多线程同步异步；

java各种集合对象的实现原理，了解这些可以让你在解决问题时选择合适的数据结构，高效的解决问题，比如hashmap的实现原理，好多五年以上经验的人都弄不清楚，还有为什扩容时有性能问题？不弄清楚这些原理，就写不出高效的代码，还会认为自己做的很对；

总之一句话越基础的东西越重要，很多人认为自己会用它们写代码了，其实仅仅是知道如何调用api而已,离会用还差的远。

熟练使用各种数据结构和算法，数组、哈希、链表、排序树...，一句话要么是时间换空间要么是空间换时间，这里展开可以说一大堆，需要有一定的应用经验，用于解决各种性能或业务上的问题；有时间再补充。

熟练使用linux操作系统，必备，没什么好说的 。

熟悉tcp协议，创建连接三次握手和断开连接四次握手的整个过程，不了解的话，无法对高并发网络应用做优化; 熟悉http协议，尤其是http头，我发现好多工作五年以上的都弄不清session和cookie的生命周期以及它们之间的关联。

系统集群、负载均衡、反向代理、动静分离，网站静态化 。

分布式存储系统nfs,fastdfs,tfs,Hadoop了解他们的优缺点，适用场景 。

分布式缓存技术memcached,redis，提高系统性能必备，一句话，把硬盘上的内容放到内存里来提速，顺便提个算法一致性hash 。点击[这里](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483698&idx=1&sn=d7e19e501b7d428f3f73fcc4f5f7e322&chksm=9f2114a6a8569db0550a98d2442cfbd70f5a26aaf82995b4580d65c9c7a821dfb5b4908f8039&scene=21#wechat_redirect)有一套Redis面试题答案。

工具nginx必备技能超级好用，高性能，基本不会挂掉的服务器，功能多多，解决各种问题。

数据库的设计能力，mysql必备，最基础的数据库工具，免费好用，对它基本的参数优化，慢查询日志分析，主从复制的配置，至少要成为半个mysql dba。其他nosql数据库如mongodb。

还有[队列中间件](http://mp.weixin.qq.com/s?__biz=MzA3MjMwMzg2Nw==&mid=2247483886&idx=1&sn=0e34ee731772bd06c71370a5b90230c3&chksm=9f21147aa8569d6cc9f79132dbc03fbf633b9d4f5452f47ec0b16af1f608c12977603c880c9c&scene=21#wechat_redirect)。如消息推送，可以先把消息写入数据库，推送放队列服务器上，由推送服务器去队列获取处理，这样就可以将消息放数据库和队列里后直接给用户反馈，推送过程则由推送服务器和队列服务器完成，好处异步处理、缓解服务器压力，解藕系统。

以上纯粹是常用的技术，还有很多自己慢慢去摸索吧；因为要知道的东西很多，所以要成为一名合格的架构师，必须要有强大的自学能力，没有人会手把手的教给你所有的东西。

想成为架构师不是懂了一大堆技术就可以了，这些是解决问题的基础、是工具，不懂这些怎么去提解决方案呢？这是成为架构师的必要条件。

架构师还要针对业务特点、系统的性能要求提出能解决问题成本最低的设计方案才合格，人家一个几百人用户的系统，访问量不大，数据量小，你给人家上集群、上分布式存储、上高端服务器，为了架构而架构，这是最扯淡的，架构师的作用就是第一满足业务需求，第二最低的硬件网络成本和技术维护成本。

架构师还要根据业务发展阶段，提前预见发展到下一个阶段系统架构的解决方案，并且设计当前架构时将架构的升级扩展考虑进去，做到易于升级;否则等系统瓶颈来了，出问题了再去出方案，或现有架构无法扩展直接扔掉重做，或扩展麻烦问题一大堆，这会对企业造成损失。

程序员应该需要都有自知之明，会就是会，不会就是不会，互联网发展迅速的时代，只能跟上时代的进步，才不会被淘汰。


