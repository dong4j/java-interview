# [JDK11 变化详解，JDK8 升级 JDK11 详细指南](https://www.jianshu.com/p/81b65eded96c)

::: tip 官方英文原版
[https://docs.oracle.com/en/java/javase/11/migrate/index.html#JSMIG-GUID-C25E2B1D-6C24-4403-8540-CFEA875B994A](https://docs.oracle.com/en/java/javase/11/migrate/index.html#JSMIG-GUID-C25E2B1D-6C24-4403-8540-CFEA875B994A)
:::

## Java平台，标准版

第11版 E94894-01 2018年9月

### 入门

本指南的目的是帮助您识别潜在问题，并在将现有Java应用程序迁移到最新JDK版本时为您提供有关如何继续的建议。该指南还强调了对最新版本所做的重大更改和增强。

本指南包含以下部分：

* [JDK 11发布的重大变化](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-561005C1-12BB-455C-AD41-00455CAD23A6)

* [准备迁移](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-5657F44A-B2D7-4FB6-AAD7-295AC4533ABC)

* [从JDK 8迁移到以后的JDK版本](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-7744EF96-5899-4FB2-B34E-86D49B2E89B6)

* [下一步](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-8074FBBD-92DF-4C46-837D-86D1D55DEC84)

### JDK 11发布的重大变化

在将应用程序迁移到JDK 11之前，您应该了解它与JDK 10版本之间的更新和更改。如果要从JDK 8迁移，则还应熟悉[从JDK 8迁移到以后的JDK版本](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-7744EF96-5899-4FB2-B34E-86D49B2E89B6)中描述的JDK 8和更高版本之间的差异。

以下是JDK 11中的一些重要更改：

* Oracle不再提供JRE和Server JRE下载; 因此，自动更新不再可用。

* Oracle不再提供32位Windows下载。

* JDK中不提供Java Web Start，Java插件和Java控制面板。请参阅[删除部署堆栈](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-4B3D2D73-359C-4ADA-937E-BAEA79CFDF0F)。

* JDK中不再包含JavaFX。它现在可以从[https://openjfx.io/](https://openjfx.io/)单独下载。

* JAXB和JAX-WS不再与JDK捆绑在一起。请参阅[删除Java EE和CORBA模块](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-F640FA9D-FB66-4D85-AD2B-D931174C09A3)。

此外，还需要了解与安全相关的更新以及很少删除的工具和组件。看到：

* [安全更新](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-8C36237D-76BB-4ADD-B026-4EB3EAA6BE99)

* [删除了API，工具和组件](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-FAD4E80D-64BA-42AC-A682-38D06EE61AC6)

### 删除部署堆栈

Java部署技术在JDK 9中已弃用，在JDK 11中已删除。

Java applet和Web Start功能，包括Java插件，Java Applet Viewer，Java控制面板和Java Web Start，以及`javaws`工具，已在JDK 11中删除。

请参阅 [删除Java部署技术](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8185077)。

### 删除Java EE和CORBA模块

在JDK 11中，删除了Java EE和CORBA模块。不推荐在JDK 9中删除这些模块。

删除的模块是：

* java.xml.ws：用于XML Web服务的Java API（JAX-WS），用于Java平台的Web服务元数据以及用于Java的附件的SOAP（SAAJ）
* java.xml.bind：用于XML绑定的Java体系结构（JAXB）
* java.xml.ws.annotation：Java SE定义的JSR-250 Common Annotations的子集，用于支持Web服务
* java.corba：CORBA
* java.transaction：Java SE定义的Java Transaction API的子集，用于支持CORBA对象事务服务
* java.activation：JavaBeans Activation Framework
* java.se.ee：上面六个模块的聚合器模块
* jdk.xml.ws：JAX-WS的工具
* jdk.xml.bind：JAXB的工具

如果不更改构建，则不会编译引用这些API中的类的现有代码。同样，在这些API类的引用的类路径上的代码将失败，`NoDefClassFoundError`或者`ClassNotFoundException`，除非改变了应用程序的部署制成。

请参阅[JEP 320：删除Java EE和CORBA模块](http://openjdk.java.net/jeps/320)以获取有关模块可能替换的更多信息。

注意：

您可以从Maven下载JAXB和JAX-WS。

### 安全更新

JDK 11版本包括传输层安全性（TLS）1.3规范（[RFC 8446](https://www.rfc-editor.org/info/rfc8446)）的实现。

TLS 1.3是传输层安全性（TLS）协议的最新版本（2018年8月），默认情况下在JDK 11中启用。此版本不仅关注速度改进，还通过强调现代加密技术来更新协议的整体安全性。实践，并禁止过时或弱的加密算法。（例如，不再允许RSA密钥交换和普通DSA签名。）

TLS 1.3协议中添加了一些功能以提高向后兼容性，但有几个问题需要注意。有关详细信息，请参阅[JEP 332](http://openjdk.java.net/jeps/332)。

删除安全证书

已从JDK 11中的信任库中删除以下根证书：

* [几个Symantec根CA.](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8191031)

* [巴尔的摩Cyber​​trust代码签署加州](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8189949)

* [SECOM根证书](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8191844)

* [AOL和Swisscom根证书](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8203230)

使用已删除证书的产品可能不再有效。如果需要这些证书，则必须使用缺少的证书配置和填充cacerts。为了证书添加到信任，看到[密钥工具](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-5990A2E4-78E3-47B7-AE75-6D1826259549)在Java平台，标准版工具参考指南。

### 删除了API，工具和组件

本节提供有关在JDK 11中删除的API，工具和组件的详细信息。

### 在JDK 11中删除了API

在JDK 11中删除了以下API。许多这些API在以前的版本中已被弃用，并且已被更新的API替换。有关可能的替代方案的信息，请参阅[JDK 11 API规范](https://docs.oracle.com/en/java/javase/11/docs/api/)。

```
javax.security.auth.Policy 
java.lang.Runtime.runFinalizersOnExit(boolean)
java.lang.SecurityManager.checkAwtEventQueueAccess() 
java.lang.SecurityManager.checkMemberAccess(java.lang.Class,int)
java.lang.SecurityManager.checkSystemClipboardAccess()
java.lang.SecurityManager.checkTopLevelWindow(java.lang.Object)
java.lang.System.runFinalizersOnExit(boolean)
java.lang.Thread.destroy()
java.lang.Thread.stop(java.lang.Throwable)

```

### JDK 11未提供的工具和组件

以下是JDK 11未附带的工具和组件列表。

主要工具

* `appletviewer`

请参阅[JDK-8200146：删除appletviewer启动器](https://bugs.java.com/view_bug.do?bug_id=JDK-8200146)。

CORBA工具

* `idlj`
* `orbd`
* `servertool`
* `tnamesrv`

此外，`rmic`（RMI编译器）将不再支持`-idl`或`-iiop`选项。请参阅 [JDK 11发行说明](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8190378)。

Java Web服务工具

* `schemagen`
* `wsgen`
* `wsimport`
* `xjc`

请参阅[JEP 320：删除Java EE和CORBA模块](http://openjdk.java.net/jeps/320)。

Java部署工具

* `javapackager`
* `javaws`

注意：

`pack 200`并且`unpack200`已被弃用，可能会在将来的JDK版本中删除。

请参阅[从JDK](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8198527)和[JEP中](http://openjdk.java.net/jeps/336)[删除JavaFX ](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8198527)[336：弃用Pack200工具和API](http://openjdk.java.net/jeps/336)。

监控工具

* `jmc`：在JDK 11中，JMC作为独立程序包提供，而不是捆绑在JDK中。

请参阅[从JDK](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8202347)和[Java Mission Control中](https://blogs.oracle.com/java-platform-group/java-mission-control-now-serving-openjdk-binaries-too)[删除JMC](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8202347)。

JVM管理-MIB.mib中

`JVM-MANAGEMENT-MIB.mib`已删除通过SNMP进行JVM监视和管理的规范。请参阅[删除JVM-MANAGEMENT-MIB.mib](https://bugs.java.com/view_bug.do?bug_id=JDK-8206211)。

SNMP代理

该 `jdk.snmp`模块已被删除。请参阅[删除SNMP代理](https://bugs.java.com/view_bug.do?bug_id=JDK-8071367)。

Oracle桌面特定删除

* Oracle JDK T2K字体光栅器已被删除。
* Lucida字体：Oracle JDK不再提供任何字体，完全依赖于操作系统上安装的字体。请参阅[从Oracle JDK中删除Lucida字体](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#JDK-8191522)。

### 准备迁移

以下部分将帮助您成功迁移您的应用程序：

* [下载最新的JDK](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-6FB24439-342C-496E-9D99-5F752528C7B1)

* [在重新编译之前运行程序](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-2A6D935A-2FFB-4D3A-B982-3266A4588B49)

* [更新第三方库](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-AFD3BDEC-99FC-4F3C-946F-A1CD2D05B74B)

* [如果需要，编译您的应用程序](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-77874D97-46F3-4DB5-85E4-2ACB5F8D760B)

* [在您的代码上运行jdeps](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-BA521187-60FD-4CA5-B998-58A1D05587BC)

### 下载最新的JDK

下载并安装[最新的JDK版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。

### 在重新编译之前运行程序

尝试在最新的JDK版本（JDK 11）上运行您的应用程序。大多数代码和库应该在JDK 11上运行而不做任何更改，但可能有一些库需要升级。

注意：

迁移是一个迭代过程。您可能会发现最好首先尝试运行您的程序（此任务），然后或多或少地并行完成这三项任务：

* [更新第三方库](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-AFD3BDEC-99FC-4F3C-946F-A1CD2D05B74B)

* [如果需要，编译您的应用程序](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-77874D97-46F3-4DB5-85E4-2ACB5F8D760B)

* [在您的代码上运行jdeps](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-BA521187-60FD-4CA5-B998-58A1D05587BC)。

运行应用程序时，请从JVM中查找有关过时VM选项的警告。如果VM无法启动，请查找已[删除的GC选项](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-977E1ED7-02BE-4A13-9B04-A719728E84BF)。

如果您的应用程序成功启动，请仔细查看您的测试并确保其行为与您使用的JDK版本相同。例如，一些早期采用者注意到他们的日期和货币格式不同。请参阅[默认使用CLDR区域设置数据](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-A20F2989-BFA9-482D-8618-6CBB4BAAE310)。

要使代码适用于最新的JDK版本，请了解每个JDK版本中的新功能和更改。

* 有关JDK 11中的新功能和更改的详细信息，请参阅[JDK 11中的新增功能 - 新增功能和增强功能](http://www.oracle.com/technetwork/java/javase/11-relnote-issues-5012449.html#NewFeature)。

* 有关新功能和更改JDK 10的详细信息，请参阅[什么在JDK 10的新功能](http://www.oracle.com/technetwork/java/javase/10-relnote-issues-4108729.html#NewFeature)。

* 对于所有的JDK 9的新功能的完整列表，请参阅[什么在JDK 9的新功能](https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-C23AFD78-C777-460B-8ACE-58BE5EA681F6)。

    有关JDK 9中的更改的详细信息，请参阅[JDK 9发行说明](http://www.oracle.com/technetwork/java/javase/9-relnotes-3622618.html)。

即使您的程序似乎成功运行，您也应该完成本指南中的其余步骤并查看问题列表。

### 更新第三方库

对于您使用的每个工具和第三方库，您可能需要具有支持最新JDK版本的更新版本。

检查第三方库和工具供应商的网站，以获取适用于最新JDK的每个库或工具的版本。如果存在，则下载并安装新版本。

如果使用Maven或Gradle构建应用程序，请确保升级到支持最新JDK版本的更新版本。

如果使用IDE开发应用程序，则可能有助于迁移现有代码。NetBeans，Eclipse和IntelliJ IDE都有可用的版本，包括对最新JDK的支持。

您可以在OpenJDK wiki上的[Quality Outreach](https://wiki.openjdk.java.net/display/quality/Quality+Outreach)上看到OpenJDK 构建的许多免费开源软件（FOSS）项目的测试状态。

### 如果需要，编译您的应用程序

使用最新的JDK编译器编译代码将简化向未来版本的迁移，因为代码可能依赖于已被确定为有问题的API和功能。但是，并非绝对必要。

如果需要使用JDK 11编译器编译代码，请注意以下事项：

* 如果在源代码中使用下划线字符（“_”）作为单字符标识符，则代码将无法在JDK 11中编译。它在JDK 8中生成警告，并从JDK 9开始生成错误。

    举个例子：

    ```
    static Object _ = new Object();

    ```

    此代码从编译器生成以下错误消息：

    ```
    MyClass.java:2: error: as of release 9, '_' is a keyword, and may not be used as a legal identifier.

    ```

* 如果使用`-source`和`-target`选项`javac`，则检查您使用的值。

    支持的`-source/-target`值为11（默认值），10,9,8,7和6（不推荐使用6，并且在使用此值时会显示警告）。

    在JDK 8，`-source`和`-target`1.5 / 5的值和更早被弃用，并引起了警告。在JDK 9及更高版本中，这些值会导致错误。

    ```
    >javac -source 5 -target 5 Sample.java 
    warning: [options] bootstrap class path not set in conjunction with -source 5 
    error: Source option 5 is no longer supported. Use 6 or later. 
    error: Target option 1.5 is no longer supported. Use 1.6 or later.

    ```

    如果可能，请使用新`--release`标志而不是`-source`和`-target`选项。见[`javac`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-AEEC9F07-CB49-4E96-8BC7-BCC2C7F725C9)在Java平台，标准版工具参考。

    该`--release`标志的有效参数遵循与之相同的策略，`-source`并且`-target`一加三后退。

    它`javac`可以识别和处理所有以前的JDK的类文件，一直回到JDK 1.0.2类文件。

    请参阅[JEP 182：退休javac -source和-target选项的政策](http://openjdk.java.net/jeps/182)。

* 在JDK 11中仍然可以访问关键的内部JDK API，例如sun.misc.Unsafe，但是在编译时无法访问大多数JDK的内部API。您可能会收到编译错误，指出您的应用程序或其库依赖于内部API。

    要标识依赖项，请运行Java依赖关系分析工具。请参阅[在您的代码上运行jdeps](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-BA521187-60FD-4CA5-B998-58A1D05587BC)。如果可能，请更新代码以使用支持的替换API。

    您可以使用该`--add-exports`选项作为临时解决方法来编译源代码，并引用JDK内部类。

* 您可能会看到比以前更多的弃用警告。

### 在您的代码上运行jdeps

`jdeps`在应用程序上运行该工具，以查看应用程序和库所依赖的包和类。如果您使用内部API，则`jdeps`可以建议替换以帮助您更新代码。

要查找内部JDK API的依赖项，请`jdeps`使用该`-jdkinternals`选项运行。例如，如果您`jdeps`在调用的类上运行`sun.misc.BASE64Encoder`，您将看到：

```
>jdeps -jdkinternals Sample.class
Sample.class -> JDK removed internal API
   Sample  -> sun.misc.BASE64Encoder  JDK internal API (JDK removed internal API)

Warning: JDK internal APIs are unsupported and private to JDK implementation that are
subject to be removed or changed incompatibly and could break your application.
Please modify your code to eliminate dependency on any JDK internal APIs.
For the most recent update on JDK internal API replacements, please check:
https://wiki.openjdk.java.net/display/JDK8/Java+Dependency+Analysis+Tool

JDK Internal API                         Suggested Replacement
----------------                         ---------------------
sun.misc.BASE64Encoder                   Use java.util.Base64 @since 1.8

```

如果您使用Maven，则可以使用`jdeps` 插件。

对于`jdeps`语法，请参见[`jdeps`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-A543FEBE-908A-49BF-996C-39499367ADB4)在Java平台，标准版工具参考。

请记住，这`jdeps`是一个静态分析工具，代码的静态分析可能无法提供完整的依赖项列表。如果代码使用反射来调用内部API，则`jdeps`不会警告您。

### 从JDK 8迁移到以后的JDK版本

JDK 8和后来的JDK版本之间发生了重大变化。

每个新的Java SE版本都会引入一些二进制，源代码和行为不兼容的版本。在JDK 9中发生的Java SE平台的模块化带来了许多好处，但也带来了许多变化。仅使用官方Java SE平台API和受支持的JDK特定API的代码应继续无变化地工作。使用JDK内部API的代码应继续运行，但应迁移以使用支持的API。

以下部分描述了在将JDK 8应用程序迁移到以后的JDK版本时应注意的JDK包和API中的更改。

查看运行应用程序时可能遇到的更改列表。

* [新版本 - 字符串方案](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-3A71ECEF-5FC5-46FE-9BA9-88CBFCE828CB)

* [了解运行时访问警告](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-7BB28E4D-99B3-4078-BDC4-FC24180CE82B)

* [对已安装的JDK / JRE映像的更改](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-D867DCCC-CEB5-4AFA-9D11-9C62B7A3FAB1)

* [删除或更改的API](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-F7696E02-A1FB-4D5A-B1F2-89E7007D4096)

* [部署](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-954372A5-5954-4075-A1AF-6A9168371246)

* [JDK 9中的安全更新](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-D6EE05FB-6791-43B3-A610-3F4416DEE508)

* [垃圾收集的变化](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-1F270BDA-50B0-49C8-807E-0B727CCC5169)

* [删除了工具和组件](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-12237744-E23B-42F8-8892-26BA1BDD63F2)

* [删除了特定于macOS的功能](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-97C1D0BB-D5D3-4CAD-B17D-03A87A0AAF3B)

当您的应用程序在最新版本的JDK上成功运行时，请查看[后续步骤](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-8074FBBD-92DF-4C46-837D-86D1D55DEC84)，这将帮助您避免将来的版本出现问题。

### 了解运行时访问警告

某些工具和库使用反射来访问仅供内部使用的JDK部分。在将来的JDK版本中将禁用此非法反射访问。目前，默认情况下允许并发出警告。

例如，以下是启动Jython时发出的警告：

```
>java -jar jython-standalone-2.7.0.jar
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by jnr.posix.JavaLibCHelper (file:/C:/Jython/jython2.7.0/jython-standalone-2.7.0.jar) to method sun.nio.ch.SelChImpl.getFD()
WARNING: Please consider reporting this to the maintainers of jnr.posix.JavaLibCHelper
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
Jython 2.7.0 (default:9987c746f838, Apr 29 2015, 02:25:11)

```

如果您看到这样的警告，请联系工具或库的维护人员。警告的第二行命名精确的JAR文件，其代码使用反射来访问JDK的内部部分。

默认情况下，在`java`启动程序启动的进程的生命周期中，最多会发出一条有关反射访问的警告。警告的确切时间取决于执行反射访问操作的工具和库的行为。警告可能会在过程的生命周期的早期出现，也可能在启动后很长时间出现。

您可以使用`--add-opens`命令行标志在逐个库的基础上禁用警告消息。例如，您可以通过以下方式启动Jython：

```
>java --add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.base/java.io=ALL-UNNAMED -jar jython-standalone-2.7.0.jar
Jython 2.7.0 (default:9987c746f838, Apr 29 2015, 02:25:11)

```

这次，不发出警告，因为`java`调用明确地确认了反射访问。如您所见，您可能需要指定多个`--add-opens`标志来覆盖类路径上的库尝试的所有反射访问操作。

要更好地理解工具和库的行为，可以使用命令行标志。该标志导致为每个非法反射访问操作发出警告消息。此外，您还可以通过设置获取有关非法反射访问操作的详细信息，包括堆栈跟踪。 `--illegal-access=warn``--illegal-access=debug`

如果您更新了库，或者获得了库，那么您可以尝试使用命令行标志。除了由其他命令行选项启用的操作外，它禁用所有反射访问操作，例如。这将是未来版本中的默认模式。 `--illegal-access=deny``--add-opens`

有两个选项可以让您以特定方式打破封装。您可以结合使用它们，或者如前所述，来抑制警告。 `--illegal-access=deny`

* 如果需要使用已无法访问的内部API，请使用[`--add-exports`](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-2F61F3A9-0979-46A4-8B49-325BA0EE8B66)runtime选项。您还可以`--add-exports`在编译时使用来访问内部API。
* 如果必须允许类路径上的代码进行深入反射以访问非公共成员，请使用该[`--add-opens`](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-12F945EB-71D6-46AF-8C3D-D354FD0B1781)选项。

如果要禁止所有反射访问警告，请在需要时使用`--add-exports`和`--add-opens`选项。

### --add出口

如果必须使用默认情况下无法访问的内部API，则可以使用`--add-exports`命令行选项中断封装。

该`--add-exports`选项的语法是：

```
--add-exports <source-module>/<package>=<target-module>(,<target-module>)*

```

其中`<source-module>`和`<target-module>`是模块名称，`<package>`是包的名称。

`--add-exports`如果目标模块读取源模块，则该选项允许目标模块中的代码访问源模块的命名包中的类型。

作为特殊情况，如果`<target-module>`是`ALL-UNNAMED`，则将源包导出到所有未命名的模块，无论它们是最初存在还是稍后创建。例如：

```
--add-exports java.management/sun.management=ALL-UNNAMED

```

此示例允许所有未命名模块中的代码（类路径上的代码）访问公共类型的公共成员`java.management/sun.management`。如果类路径上的代码尝试进行深度反射以访问非公共成员，则代码将失败。

如果`oldApp`在类路径上运行的应用程序必须使用模块的未导出`com.sun.jmx.remote.internal`包`java.management`，则可以通过以下方式授予其所需的访问权限：

```
--add-exports java.management/com.sun.jmx.remote.internal=ALL-UNNAMED

```

您还可以使用JAR文件清单中断封装：

```
Add-Exports:java.management/sun.management

```

`--add-exports`仔细使用该选项。您可以使用它来访问库模块的内部API，甚至是JDK本身的内部API，但这样做需要您自担风险。如果该内部API发生更改或被删除，则您的库或应用程序将失败。

另见[JEP 261](http://openjdk.java.net/jeps/261)。

### --add-打开

如果必须允许类路径上的代码进行深度反射以访问非公共成员，请使用`--add-opens`运行时选项。

有些图书馆深入反思，这意味着`setAccessible(true)`他们可以访问所有成员，包括私人成员。您可以使用命令行`--add-opens`上的选项授予此访问权限`java`。使用此选项不会生成警告消息。

如果，您在运行时看到或发出消息，则可以使用运行时选项，将参数基于异常消息中显示的信息。 `--illegal-access=deny``IllegalAccessException``InaccessibleObjectException``--add-opens`

语法`--add-opens`是：

```
--add-opens module/package=target-module(,target-module)*

```

该选项允许`<module>`开`<package>`来`<target-module>`，无论模块声明。

作为特殊情况，如果`<target-module>`是`ALL-UNNAMED`，则将源包导出到所有未命名的模块，无论它们是最初存在还是稍后创建。例如：

```
--add-opens java.management/sun.management=ALL-UNNAMED

```

此示例允许类路径上的所有代码访问`java.management/sun.management`包中公共类型的非公共成员。

注意：

如果您正在使用JNI调用API（例如，包括Java Web Start JNLP文件），则必须在`--add-opens`其值和其值之间包含等号。

```
<j2se version="10" java-vm-args="--add-opens=module/package=ALL-UNNAMED"  />

```

`--add-opens`在命令行上，其值和它的值之间的等号是可选的。

### 新版本 - 字符串方案

JDK 10引入了一些小的更改，以更好地适应基于时间的发布模型，以及JDK 9中引入的版本字符串方案.JDK 11保留了JDK 10中引入的版本字符串格式。

如果您的代码依赖于版本字符串格式来区分主要版本，次要版本，安全版本和补丁更新版本，那么您可能需要更新它。

新版本字符串的格式为：

`$FEATURE.$INTERIM.$UPDATE.$PATCH`

添加了一个简单的Java API来解析，验证和比较版本字符串。请参阅[java.lang.Runtime.Version](https://docs.oracle.com/javase/10/docs/api/java/lang/Runtime.Version.html)。

见[版本字符串格式](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSJIG-GUID-DCA60310-6565-4BB6-8D24-6FF07C1C4B4E)的Java平台，标准版安装指南。

有关JDK 9中引入的版本字符串的更改，请参阅 [JEP 223：新版本字符串方案](http://openjdk.java.net/jeps/223)。

有关JDK 10中引入的版本字符串更改，请参阅[JEP 322：基于时间的发行版本控制](http://openjdk.java.net/jeps/322)。

### 对已安装的JDK / JRE映像的更改

JDK和JRE已经发生了重大变化。

### 更改了JDK和JRE布局

安装JDK之后，如果查看文件系统，您会注意到目录布局与JDK 9之前的版本不同。

JDK 11

JDK 11没有JRE映像。见[JDK安装目录结构](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSJIG-GUID-F7178F2F-DC92-47E9-8062-CA6B2612D350)在Java平台，标准版安装指南。

JDK 9和JDK 10

早期版本生成了两种类型的运行时映像：JRE，它是Java SE平台的完整实现，以及JDK，它包括`jre/`目录中的整个JRE ，以及开发工具和库。

在JDK 9和JDK 10中，JDK和JRE是两种类型的模块化运行时映像，其中每个映像都包含以下目录：

* `bin`：包含二进制可执行文件。

* `conf`：包含`.properties`，`.policy`和其他类型的文件，供开发人员，部署人员和最终用户编辑。这些文件以前位于`lib`目录或其子目录中。

* `lib`：包含动态链接库和JDK的完整内部实现。

在JDK 9和JDK 10中，仍然有单独的JDK和JRE下载，但每个都具有相同的目录结构。JDK映像包含历史上在JDK中找到的额外工具和库。没有`jdk/`与`jre/`包装目录相对应，并且二进制文件（例如`java`命令）不会重复。

请参阅[JEP 220：模块化运行时映像](http://openjdk.java.net/jeps/220)。

### 新的类加载器实现

JDK 9及更高版本维护自1.2版本以来存在的类加载器的层次结构。但是，已经进行了以下更改以实现模块系统：

* 应用程序类加载器不再是URLClassLoader的实例，而是内部类的实例。它是模块中类的默认加载器，既不是Java SE也不是JDK模块。

* 扩展类加载器已重命名; 它现在是平台类加载器。通过平台类加载器可以保证Java SE Platform中的所有类都可见。此外，通过平台类加载器可以保证在Java Community Process下标准化但不属于Java SE Platform的模块中的类。

    仅仅因为通过平台类加载器可见类并不意味着该类实际上是由平台类加载器定义的。Java SE平台中的某些类由平台类加载器定义，而其他类则由引导类加载器定义。应用程序不应该依赖于哪个类加载器定义哪个平台类。

    在JDK 9中实现的更改可能会影响使用`null`（即引导类加载器）创建类加载器的代码作为父类加载器，并假定所有平台类对父级是可见的。可能需要更改此类代码以使用平台类加载器作为父代（请参阅[ClassLoader.getPlatformClassLoader](https://docs.oracle.com/javase/10/docs/api/java/lang/ClassLoader.html#getPlatformClassLoader--)）。

    平台类加载器不是URLClassLoader的实例，而是内部类的实例。

* 引导类加载器仍然是内置的Java虚拟机和代表`null`中ClassLoader的 API。它定义了一些关键模块中的类，例如java.base。因此，它定义的类比JDK 8中的类少得多，因此使用`-Xbootclasspath/a`或创建类加载器`null`作为父级的应用程序可能需要如前所述进行更改。

### 删除了JDK 9中的rt.jar和tools.jar

类和资源文件之前存储在`lib/rt.jar`，`lib/tools.jar`，`lib/dt.jar`和其他各种内部JAR文件都存储在一个更有效的格式在实现特定的文件`lib`目录。

删除`rt.jar`和类似文件会导致以下方面的问题：

* 从JDK 9开始，[ClassLoader.getSystemResource](https://docs.oracle.com/javase/10/docs/api/java/lang/ClassLoader.html#getSystemResource-java.lang.String-)不返回指向JAR文件的URL（因为没有JAR文件）。相反，它返回一个`jrt`URL，该URL命名存储在运行时映像中的模块，类和资源，而不会泄露图像的内部结构或格式。

    例如：

    ```
    ClassLoader.getSystemResource("java/lang/Class.class");

    ```

    在JDK 8上运行时，此方法返回以下形式的JAR URL：

    ```
    jar:file:/usr/local/jdk8/jre/lib/rt.jar!/java/lang/Class.class

    ```

    嵌入文件URL以命名运行时映像中的实际JAR文件。

    模块化图像不包含任何JAR文件，因此这种形式的URL毫无意义。在JDK 9及更高版本中，此方法返回：

    ```
    jrt:/java.base/java/lang/Class.class

    ```

* 该[java.security.CodeSource中的](https://docs.oracle.com/javase/10/docs/api/java/security/CodeSource.html) API和安全策略文件所使用的网址来命名的将被授予特定权限的代码库的位置。请参阅[策略文件语法](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSSEC-GUID-7942E6F8-8AAB-4404-9FE9-E08DD6FFCFFA)在Java平台，标准版安全开发人员指南。目前`conf/security/java.policy`，使用文件URL 在文件中标识了需要特定权限的运行时系统组件。

* 较旧版本的IDE和其他开发工具需要能够枚举存储在运行时映像中的类和资源文件，并通过打开和读取`rt.jar`以及类似文件直接读取其内容。模块化图像无法实现这一点。

### 在JDK 9中删除了扩展机制

在JDK 8及更早版本中，扩展机制使运行时环境可以查找和加载扩展类，而无需在类路径上特别命名它们。从JDK 9开始，如果需要使用扩展类，请确保JAR文件位于类路径上。

在JDK 9和JDK 10中，如果设置了系统属性，或者目录存在，`javac`编译器和`java`启动器将退出。要另外检查特定于平台的系统范围目录，请指定命令行选项。如果目录存在且不为空，则会导致出现相同的退出行为。扩展类加载器保留在JDK 9（及更高版本）中，并被指定为平台类加载器（请参阅[getPlatformClassLoader](https://docs.oracle.com/javase/10/docs/api/java/lang/ClassLoader.html#getPlatformClassLoader--)。）但是，在JDK 11中，此选项已过时，并在使用时发出警告。`java.ext.dirs``lib/ext``-XX:+CheckEndorsedAndExtDirs`[](https://docs.oracle.com/javase/10/docs/api/java/lang/ClassLoader.html#getPlatformClassLoader--)

以下错误表示您的系统配置为使用扩展机制：

```
<JAVA_HOME>/lib/ext exists, extensions mechanism no longer supported; Use -classpath instead.
.Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.

```

如果`java.ext.dirs`设置了系统属性，您将看到类似的错误。

要修复此错误，请删除`ext/`目录或`java.ext.dirs`系统属性。

请参阅[JEP 220：模块化运行时映像](http://openjdk.java.net/jeps/220)。

### 删除了背书标准覆盖机制

该`java.endorsed.dirs`系统属性和`lib/endorsed`目录不再存在。如果检测到任何一个，`javac`编译器和`java`启动器将退出。

从JDK 9开始，您可以使用可升级模块或将JAR文件放在类路径上。

此机制旨在供应用程序服务器覆盖JDK中使用的组件。要更新的包将放入JAR文件中，系统属性`java.endorsed.dirs`将告诉Java运行时环境在哪里找到它们。如果未指定此属性的值，则使用默认值`$JAVA_HOME/lib/endorsed`。

在JDK 8中，您可以使用`-XX:+CheckEndorsedAndExtDirs`命令行参数来检查系统上任何位置的此类目录。

在JDK 9及更高版本中，如果设置了系统属性，或者目录存在，`javac`编译器和`java`启动器将退出。`java.endorsed.dirs``lib/endorsed`

以下错误表示您的系统配置为使用支持的标准覆盖机制：

```
<JAVA_HOME>/lib/endorsed is not supported. Endorsed standards and standalone APIs
in modular form will be supported via the concept of upgradeable modules.
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.

```

如果`java.endorsed.dirs`设置了系统属性，您将看到类似的错误。

要修复此错误，请删除该`lib/endorsed`目录，或取消设置`java.endorsed.dirs`系统属性。

请参阅[JEP 220：模块化运行时映像](http://openjdk.java.net/jeps/220)。

### Windows注册表项更改

安装JDK时，Java 11安装程序会创建这些Windows注册表项：

* `“HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK”`

* `“HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK\11”`

如果安装了两个版本的JDK，则会创建两个不同的Windows注册表项。例如，如果JDK 11.0.1与JDK 11一起安装，则安装程序会创建另一个Windows注册表项，如下所示：

* `“HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK”`

* `“HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\JDK\11.0.1”`

### 删除或更改的API

本节重点介绍了在默认行为中无法访问，删除或更改的API。编译或运行应用程序时，您可能会遇到本节中描述的问题。

请参阅[JDK 11中的已删除API](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-4B613B7E-B150-4D0A-835C-2393C60BE1F8)。

### 删除了JDK 9和JDK 10中的API

以下是从JDK 9和JDK 10发行版中删除的一些重要API。

### 删除了java。* API

Java团队致力于向后兼容。如果应用程序在JDK 8中运行，那么它将在JDK 9及更高版本上运行，只要它使用受支持且供外部使用的API即可。

这些包括：

* JCP标准，java。*，javax。*
* JDK特定的API，一些com.sun。*，一些jdk。*

支持的API可以从JDK中删除，但只能通知。通过运行静态分析工具，了解您的代码是否使用了弃用的API [`jdeprscan`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-2B7588B0-92DB-4A88-88D4-24D183660A62)。

java。*在JDK 9中删除的API包括java.util.logging.LogManager和java.util.jar.Pack200包中以前弃用的方法：

```
java.util.logging.LogManager.addPropertyChangeListener
java.util.logging.LogManager.removePropertyChangeListener
java.util.jar.Pack200.Packer.addPropertyChangeListener
java.util.jar.Pack200.Packer.removePropertyChangeListener
java.util.jar.Pack200.Unpacker.addPropertyChangeListener
java.util.jar.Pack200.Unpacker.removePropertyChangeListener

```

### 删除和将来删除sun.misc和sun.reflect API

与java。* API不同，几乎所有sun。* API都不受支持，JDK内部API，并且可能随时消失。

在JDK 9中删除了一些sun。* API。值得注意的是，sun.misc.BASE64Encoder和sun.misc.BASE64Decoder被删除了。而是使用在JDK 8中添加的受支持的[java.util.Base64](https://docs.oracle.com/javase/10/docs/api/java/util/Base64.html)类。

如果您使用这些API，则可能希望迁移到其支持的替换项：

* sun.misc.Unsafe

    通过使用变量句柄可以使用此类中的许多方法的功能，请参阅[JEP 193：可变句柄](http://openjdk.java.net/jeps/193)。

* sun.reflect.Reflection :: getCallerClass（INT）

    相反，使用stack-walking API，请参阅[JEP 259：Stack-Walking API](http://openjdk.java.net/jeps/259)。

请参阅[JEP 260：封装大多数内部API](http://openjdk.java.net/jeps/260)。

### java.awt.peer不可访问

该java.awt.peer中和java.awt.dnd.peer包无法访问，在JDK 9开始的包从来没有在Java SE API的一部分，尽管是java中。*命名空间。

引用这些包中定义的类型的Java SE API中的所有方法都从JDK 9中删除。调用先前接受或返回在这些包中定义的类型的方法的代码不再编译或运行。

java.awt.peer类有两种常见用法。您应该按如下方式替换它们：

* 要查看是否已设置对等方：

    ```
    if (component.getPeer() != null) { .. }

    ```

    将其替换为JDK 1.1 API中的Component.isDisplayable（）：

    ```
    public boolean isDisplayable() {
        return getPeer() != null;

    ```

* 要测试组件是否轻量级：

    ```
    if (component.getPeer() instanceof LightweightPeer) ..

    ```

    将其替换为JDK 1.2 API中的Component.isLightweight（）：

    ```
    public boolean isLightweight() {
        return getPeer() instanceof LightweightPeer;

    ```

### 删除了com.sun.image.codec.jpeg包

已删除非标准包com.sun.image.codec.jpeg。请改用Java Image I / O API。

该的com.sun.image.codec.jpeg包JDK 1.2中加入作为控制装载和JPEG格式的图像文件的保存的一个非标准的方式。它从未成为平台规范的一部分。

在JDK 1.4中，Java Image I / O API作为标准API添加，位于javax.imageio包中。它提供了一种标准机制，用于控制采样图像格式的加载和保存，并要求所有兼容的Java SE实现都支持基于Java Image I / O规范的JPEG。

### 删除了压缩配置文件的工具支持

从JDK 9开始，您可以选择针对Java运行时映像中的任何模块子集构建和运行应用程序，而无需依赖预定义的配置文件。

Java SE 8中引入的配置文件定义了Java SE Platform API的子集，这些子集可以减少存储容量有限的设备上Java运行时的静态大小。在JDK 8支持工具三个配置文件，`compact1`，`compact2`，和`compact3`。有关每个配置文件的API组合，请参阅JDK 8文档中的[详细配置文件组合](https://docs.oracle.com/javase/8/docs/technotes/guides/compactprofiles/compactprofiles.html)和[API参考](https://docs.oracle.com/javase/8/docs/api/overview-summary.html)。

在JDK 8中，您可以使用该`-profile`选项在运行`javac`和`java`命令时指定配置文件。从JDK 9开始，该`-profile`选项`javac`仅与`--release 8`选项一起支持，并且不受支持`java`。

JDK 9及更高版本允许您选择在编译和运行时使用的模块。通过使用新`--limit-modules`选项指定模块，您可以获得紧凑配置文件中的相同API。该选项是由两个支持`javac`和`java`命令，如在以下实施例：

```
javac --limit-modules java.base,java.logging MyApp.java

```

```
java --limit-modules java.base,java.logging MyApp

```

为Java SE 8中的每个配置文件指定的包将通过以下模块集共同导出：

* 对于`compact1`配置文件：java.base，java.logging，java.scripting

* 对于`compact2`配置文件：java.base，java.logging，java.scripting，java.rmi，java.sql，java.xml

* 对于`compact3`配置文件：java.base，java.logging，java.scripting，java.rmi，java.sql，java.xml，java.compiler，java.instrument，java.management，java.naming，java.prefs，java。 security.jgss，java.security.sasl，java.sql.rowset，java.xml.crypto

您可以使用该`jdeps`工具对源代码中使用的Java包进行静态分析。这为您提供了执行应用程序所需的一组模块。`compact3`例如，如果您一直在使用该配置文件，那么您可能会发现在构建应用程序时不需要包含整套模块。见[`jdeps`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-A543FEBE-908A-49BF-996C-39499367ADB4)在Java平台，标准版工具参考。

请参阅[JEP 200：模块化JDK](http://openjdk.java.net/jeps/200)。

### 默认情况下使用CLDR区域设置数据

从JDK 9开始，Unicode Consortium的公共区域设置数据存储库（CLDR）数据作为默认区域设置数据启用，因此您可以使用标准区域设置数据而无需任何进一步操作。

在JDK 8中，虽然CLDR区域设置数据与JRE捆绑在一起，但默认情况下不启用它。

使用区域设置敏感服务（如日期，时间和数字格式）的代码可能会使用CLDR区域设置数据生成不同的结果。请记住，即使System.out.printf（）也是区域设置感知的。

要启用与JDK 8兼容的行为，请将系统属性设置为例如前面的`java.locale.providers`值。`COMPAT``CLDR``java.locale.providers=COMPAT,CLDR`

见[CLDR语言环境数据通过默认启用](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSINT-GUID-9DCDB41C-A989-4220-8140-DBFB844A0FCA)的Java平台，标准版国际指南和[JEP 252：使用CLDR语言环境数据的默认](http://openjdk.java.net/jeps/252)。

### 部署

Java部署技术在JDK 9中已弃用，在JDK 11中已删除。

使用`jlink`JDK 9引入的工具打包和部署专用运行时，而不是依赖于预安装的系统JRE。

### 删除了启动时JRE版本选择

从JDK 9开始，删除了请求从发布时启动的JRE版本的JRE版本的能力。

现代应用程序通常使用Java Web Start（JNLP），本机OS打包系统或活动安装程序进行部署。这些技术有自己的方法来管理所需的JRE，根据需要查找或下载并更新所需的JRE。这使得启动程序的启动时JRE版本选择已过时。

在以前的版本中，您可以指定启动应用程序时要使用的JRE版本（或版本范围）。通过命令行选项和应用程序的JAR文件中的清单条目，可以选择版本。

从JDK 9开始，`java`启动器修改如下：

* 如果`-version:`在命令行上给出了该选项，则发出错误消息并退出。
* 如果`JRE-Version`在JAR文件中找到清单条目，则发出警告消息并继续。

请参阅[JEP 231：删除启动时JRE版本选择。](http://openjdk.java.net/jeps/231)

### 删除了对序列化小程序的支持

从JDK 9开始，不支持将applet部署为序列化对象的能力。借助现代压缩和JVM性能，以这种方式部署applet没有任何好处。

在`object`该属性`applet`标签和`object`和`java object`applet的参数标签启动小程序时被忽略。

而不是序列化applet，使用标准部署策略。

### JNLP规范更新

JNLP（Java网络启动协议）已更新，以消除不一致性，使代码维护更容易，并增强安全性。

JNLP已更新如下：

1. `&amp;`而不是`&`在JNLP文件中。

    JNLP文件语法符合XML规范，所有JNLP文件都应该能够由标准XML解析器解析。

    JNLP文件允许您指定复杂的比较。以前，这是通过使用ampersand（`&`）完成的，但标准XML不支持此功能。如果您正在使用`&`创建复杂的比较，请`&amp;`在JNLP文件中替换它。`&amp;`与所有版本的JNLP兼容。

2. 将数字版本元素类型与非数字版本元素类型进行比较。

    以前，当将`int`版本元素与另一个无法解析为`int`的版本元素进行比较时，版本元素按字典顺序通过ASCII值进行比较。

    从JDK 9开始，如果可以解析为`int`a 的元素是比其他元素更短的字符串，则在按字典顺序按ASCII值进行比较之前，将使用前导零填充该元素。这确保不存在圆形。

    在使用版本比较和JNLP servlet的情况下，您应该仅使用数值来表示版本。

3. 在`java`（或`j2se`）元素中具有嵌套资源的组件扩展。

    这在规范中是允许的。它以前得到了支持，但这种支持没有反映在规范中。

4. FX XML扩展。

    该JNLP规范已经增强，一个添加`type`属性`application-desc`元素，并添加子元素`param`中`application-desc`（因为它已经是`applet-desc`）。

    这不会导致现有应用程序出现问题，因为仍然支持以前指定JavaFX应用程序的方法。

请参阅[JSR-056上](https://jcp.org/aboutJava/communityprocess/maintenance/jsr056/9.html)的JNLP规范更新。

### JDK 9中的安全更新

从JDK 9开始，一些与安全相关的默认值已更改。

### JCE管辖权政策文件默认为无限制

如果您的应用程序以前需要Java Cryptography Extension（JCE）Unlimited Strength Jurisdiction Policy Files，那么您不再需要下载或安装它们。它们包含在JDK中，默认情况下处于激活状态。

如果您的国家/地区或用途需要更严格的策略，则仍然可以使用有限的Java加密策略文件。

如果默认情况下提供的任一策略文件都不满足要求，则可以自定义这些策略文件以满足您的需求。

请参阅文件中的`crypto.policy`Security属性`<java-home>/conf/security/java.security`，或Java Platform，Standard Edition Security Developer's Guide中的[Cryptographic Strength Configuration](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSSEC-GUID-EFA5AC2D-644E-4CD9-8523-C6D3936D5FB1)。

建议您咨询您的出口/进口控制律师或律师以确定具体要求。

### 创建PKCS12密钥库

我们建议您为密钥库使用PKCS12格式。此格式是默认密钥库类型，基于RSA PKCS12个人信息交换语法标准。

请参阅[创建密钥库与JSSE使用](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSSEC-GUID-3D26386B-BC7A-41BB-AC70-80E6CD147D6F)的Java平台，标准版安全开发人员指南和[密钥工具](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-5990A2E4-78E3-47B7-AE75-6D1826259549)在Java平台，标准版工具参考。

### 垃圾收集的变化

本节介绍从JDK 9开始的垃圾回收更改。

### 使G1成为默认垃圾收集器

Garbage-First垃圾收集器（G1 GC）是JDK 9及更高版本中的默认垃圾收集器。

对于大多数用户而言，低暂停收集器（如G1 GC）应该提供比面向吞吐量的收集器更好的整体体验，例如Parallel GC，它是JDK 8的默认值。

见[为G1 GC人体工学默认值](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSGCT-GUID-082C967F-2DAC-4B59-8A81-0CEC6EEB9016)和[可调默认](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSGCT-GUID-379B3888-FE24-4C3F-9E38-26434EB04F89)的Java平台，标准版Java虚拟机指南有关调整G1 GC的更多信息。

### 删除了GC选项

以下GC组合将导致您的应用程序无法在JDK 9及更高版本中启动：

* `DefNew + CMS`
* `ParNew + SerialOld`
* `Incremental CMS`

CMS的前台模式也已删除。被删除的命令行标志`-Xincgc`，`-XX:+CMSIncrementalMode`，`-XX:+UseCMSCompactAtFullCollection`，`-XX:+CMSFullGCsBeforeCompaction`，和`-XX:+UseCMSCollectionPassing`。

命令行标志`-XX:+UseParNewGC`不再有效。该`ParNew`标志只能用于CMS和CMS要求`ParNew`。因此，该`-XX:+UseParNewGC`标志已被弃用，并且有资格在将来的版本中删除。

请参阅[JEP 214：删除JDK 8中不推荐使用的GC组合](http://openjdk.java.net/jeps/214)。

删除了永久代

在JDK 8中删除了永久代，并且相关的VM选项会导致打印警告。您应该从脚本中删除这些选项：

* `-XX:MaxPermSize=size`

* `-XX:PermSize=size`

在JDK 9及更高版本中，JVM会显示如下警告：

```
Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option MaxPermSize; support was removed in 8.0

```

知道永久代的工具可能必须更新。

请参阅[JEP 122：删除永久生成](http://openjdk.java.net/jeps/122)和[JDK 9发行说明 - 已删除的API，功能和选项](http://www.oracle.com/technetwork/java/javase/9-removed-features-3745614.html)。

### GC日志输出的更改

垃圾收集（GC）日志记录使用JVM统一日志记录框架，新旧日志之间存在一些差异。您正在使用的任何GC日志解析器可能都需要更改。

您可能还需要更新JVM日志记录选项。所有与GC相关的日志记录都应使用`gc`标记（例如`—Xlog:gc`），通常与其他标记结合使用。这些`—XX:+PrintGCDetails`和`-XX:+PrintGC`选项已被弃用。

请参阅[启用与JVM统一日志框架记录](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-BE93ABDC-999C-4CB5-A88B-1994AAAC74D5)在Java平台，标准版工具参考和[JEP 271：统一GC日志记录](http://openjdk.java.net/jeps/271)。

### 删除了工具和组件

此列表包括不再与JDK捆绑在一起的工具和组件。

要了解有关JDK 11中删除的工具和组件的更多信息，请参阅JDK 11中的已[删除API](https://docs.oracle.com/en/java/javase/11/migrate/index.html#GUID-4B613B7E-B150-4D0A-835C-2393C60BE1F8)。

### 删除了Native-Header生成工具（javah）

该`javah`工具已被优越的功能所取代`javac`。它已在JDK 10中删除。

从JDK 8开始，`javac`提供了在编译Java源代码时编写本机头文件的功能，从而无需单独的工具。

而不是`javah`，使用

```
javac -h

```

### 删除了JavaDB

JavaDB是Apache Derby的品牌重塑，不再包含在JDK中。

JavaDB与JDK 7和JDK 8捆绑在一起。它`db`位于JDK安装目录的目录中。

您可以从[Apache Derby Downloads](https://db.apache.org/derby/derby_downloads.html)下载并安装Apache Derby 。

### 删除了JVM TI hprof代理

该`hprof`代理程序库已被删除。

该`hprof`剂被写为演示代码[JVM工具界面](https://docs.oracle.com/javase/8/docs/technotes/guides/jvmti/index.html)，并没有打算成为一个生产工具。`hprof`代理的有用功能已被更好的替代方案所取代，包括JDK中包含的一些替代方案。

要以`hprof`格式创建堆转储，请使用诊断命令（`jcmd`）或`jmap`工具：

* 诊断命令：。见。 `jcmd <pid> GC.heap_dump`[`jcmd`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-59153599-875E-447D-8D98-0078A5778F05)
* jmap : `jmap -dump`. 见[`jmap`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-D2340719-82BA-4077-B0F3-2803269B7F41)。

对于CPU分析器功能，请使用与JDK捆绑在一起的Java Flight Recorder。

注意：

Java Flight Recorder需要商业许可才能用于生产。要了解有关商业功能以及如何启用它们的更多信息，请访问[http://www.oracle.com/technetwork/java/javaseproducts/](http://www.oracle.com/technetwork/java/javaseproducts/)。

请参阅[JEP 240：删除JVM TI hprof代理](http://openjdk.java.net/jeps/240)。

### 删除了jhat工具

该`jhat`工具是JDK 6中添加的实验性，不受支持的堆可视化工具。高级堆可视化器和分析器已经可用多年。

### 删除了java-rmi.exe和java-rmi.cgi启动器

`java-rmi.exe`来自Windows以及`java-rmi.cgi`Linux和Solaris 的启动程序已被删除。

`java-rmi.cgi`在`$JAVA_HOME/bin`Linux和Solaris上。

`java-rmi.exe`在`$JAVA_HOME/bin`Windows上。

这些启动程序被添加到JDK中以便于使用RMI CGI代理机制，该机制在JDK 8中已弃用。

几年来，使用servlet代替RMI over HTTP的替代方案已经可用，甚至是首选。请参阅[Java RMI和对象序列化。](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/faq.html#servlet)

### 从JMX RMIConnector中删除了对IIOP传输的支持

来自JMX RMI连接器的IIOP传输支持及其支持类已从JDK中删除。

在JDK 8中，对IIOP传输的支持从必需降级到可选。这是多版本努力从JMX Remote API中删除对IIOP传输的支持的第一步。在JDK 9中，完全删除了对IIOP的支持。

公共API更改包括：

* 该`javax.management.remote.rmi.RMIIIOPServerImpl`班已弃用。在调用时，它的所有方法和构造函数都会抛出`java.lang.UnsupportedOperationException`一条解释性消息。

* 不会生成两个类，`org.omg.stub.javax.management.rmi._RMIConnection_Stub`和`org.omg.stub.javax.management.rmi._RMIConnection_Tie`。

### 删除了Windows 32位客户端VM

Windows 32位客户端VM不再可用。仅提供服务器VM。

JDK 8及更早版本为Windows 32位系统提供了客户端JVM和服务器JVM。JDK 9及更高版本仅提供服务器JVM，该服务器JVM经过调整以最大化峰值运行速度。

### 删除了Java VisualVM

Java VisualVM是一个工具，它提供有关在Java虚拟机上运行的代码的信息。该`jvisualvm`工具提供了JDK 6，JDK 7和JDK 8。

Java VisualVM不再与JDK捆绑在一起，但您可以从[VisualVM开源项目站点](https://visualvm.github.io/)获取它。

### 删除了native2ascii工具

该`native2ascii`工具已从JDK中删除。由于JDK 9及更高版本支持基于UTF-8的属性资源包，因此不再需要将基于UTF-8的属性资源包转换为ISO-8859-1的转换工具。

见[UTF-8属性文件](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSINT-GUID-974CF488-23E8-4963-A322-82006A7A14C7)中的Java平台，标准版国际指南。

### 删除了特定于macOS的功能

本节包括从JDK 9开始已删除的特定于macOS的功能。

### 特定于平台的桌面功能

本`java.awt.Desktop`类包含了苹果专用的API的替代品`com.apple.eawt`和`com.apple.eio`套餐。新API取代了macOS API，并且与平台无关。

`com.apple.eawt`和`com.apple.eio`包中的API 是封装的，因此您无法在JDK 9或更高版本中针对它们进行编译。但是，它们在运行时仍可访问，因此编译为旧版本的现有代码将继续运行。最终，使用`apple`和`com.apple` 包及其子包中的内部类的库或应用程序 将需要迁移到新的API。

在`com.apple.concurrent` 与`apple.applescript`包没有任何替代删除。

请参阅[JEP 272：特定于平台的桌面功能。](http://openjdk.java.net/jeps/272)

### 删除了AppleScript引擎

AppleScript引擎是一个特定于平台的javax.script实现，在JDK中没有任何替换，已被删除。

AppleScript引擎在最近的版本中几乎无法使用。该功能仅适用于已在系统上具有Apple版本`AppleScriptEngine.jar`文件的系统上的JDK 7或JDK 8 。

### 下一步

在JDK 11上运行应用程序之后，这里有一些建议可以帮助您从Java SE平台中获得最大收益：

* 如果需要，使用工具中的新`-–release`标志交叉编译到平台的旧版本[`javac`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-AEEC9F07-CB49-4E96-8BC7-BCC2C7F725C9)。

* 利用IDE的建议，使用最新功能更新代码。

* 通过运行静态分析工具，了解您的代码是否使用了弃用的API [`jdeprscan`](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-2B7588B0-92DB-4A88-88D4-24D183660A62)。正如本指南中已经提到的，API可以从JDK中删除，但只能提前通知。

* 熟悉多版本JAR文件等新功能（请参阅参考资料[`jar` ](https://www.oracle.com/pls/topic/lookup?ctx=en/java/javase/11/migrate&id=JSWOR-GUID-51C11B76-D9F6-4BC2-A805-3C847E857867)）。

### 文档可访问性

有关Oracle对可访问性的承诺的信息，请访问Oracle Accessibility Program网站[http://www.oracle.com/pls/topic/lookup?ctx=acc&id=docacc](http://www.oracle.com/pls/topic/lookup?ctx=acc&id=docacc)。

访问Oracle支持

已购买支持的Oracle客户可通过My Oracle Support获得电子支持。有关详细信息，请访问[http://www.oracle.com/pls/topic/lookup?ctx=acc&id=info](http://www.oracle.com/pls/topic/lookup?ctx=acc&id=info)或访问[http://www.oracle.com/pls/topic/lookup?ctx=acc&id=trs](http://www.oracle.com/pls/topic/lookup?ctx=acc&id=trs)如果您听力受损。

* * *

Java平台，标准版Oracle JDK迁移指南，版本11

E94894-01

版权所有©2017,2018，Oracle和/或其附属公司。版权所有。

本指南将帮助您将应用程序从Oracle JDK 8迁移到Oracle JDK 10。

本软件和相关文档根据许可协议提供，其中包含对使用和披露的限制，并受知识产权法保护。除非您的许可协议中明确允许或法律允许，否则您不得以任何形式使用，复制，复制，翻译，广播，修改，许可，传输，分发，展示，执行，发布或展示任何部分，或以任何方式。除非法律要求互操作性，否则禁止对该软件进行逆向工程，反汇编或反编译。

此处包含的信息如有更改，恕不另行通知，并且不保证没有错误。如果您发现任何错误，请以书面形式向我们报告。

如果这是交付给美国政府的软件或相关文档或代表美国政府许可的任何人，则以下通知适用：

美国政府最终用户：根据适用的联邦采购法规和代理机构，Oracle计划，包括任何操作系统，集成软件，安装在硬件上的任何程序和/或文档，都是“商业计算机软件”。具体的补充规定。因此，程序的使用，复制，披露，修改和调整，包括任何操作系统，集成软件，安装在硬件上的任何程序和/或文档，应受适用于程序的许可条款和许可限制的约束。 。没有其他权利授予美国政府。

该软件或硬件被开发用于各种信息管理应用中的一般用途。它不是为任何本质上危险的应用而开发或打算使用的，包括可能造成人身伤害风险的应用。如果您在危险应用程序中使用此软件或硬件，则您应负责采取所有适当的故障安全，备份，冗余和其他措施，以确保其安全使用。Oracle Corporation及其附属公司对因在危险应用中使用此软件或硬件而造成的任何损害不承担任何责任。

Oracle和Java是Oracle和/或其附属公司的注册商标。其他名称可能是其各自所有者的商标。

Intel和Intel Xeon是Intel Corporation的商标或注册商标。所有SPARC商标均经许可使用，是SPARC International，Inc。的商标或注册商标.AMD，Opteron，AMD徽标和AMD Opteron徽标是Advanced Micro Devices的商标或注册商标。UNIX是The Open Group的注册商标。

该软件或硬件和文档可以提供对来自第三方的内容，产品和服务的访问或信息。除非您与Oracle之间的适用协议另有规定，否则Oracle Corporation及其附属公司不对第三方内容，产品和服务的任何形式的保证承担任何责任，并且明确拒绝承担任何形式的保证。Oracle Corporation及其附属公司对由于您访问或使用第三方内容，产品或服务而导致的任何损失，成本或损害不承担任何责任，但您与Oracle之间的适用协议中规定的除外。



