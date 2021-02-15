# Spring Boot

# [SpringBoot就是这么简单](https://segmentfault.com/a/1190000013849884)

# 一、SpringBoot入门

今天在慕课网中看见了Spring Boot这么一个教程，这个Spring Boot作为JavaWeb的学习者肯定至少会听过，但我是不知道他是什么玩意。

只是大概了解过他是用起来很方便，不用什么配置的。于是我就花了点时间去跟着学习了。

视频地址:[http://www.imooc.com/learn/767](http://www.imooc.com/learn/767)

教程中的代码：[https://gitee.com/liaoshixiong/girl](https://gitee.com/liaoshixiong/girl)

## 1.1SpringBoot启动

在教程中，启动SpirngBoot有三种方式：

* 在idea中直接使用启动（最常用）
* 使用mvn 命令来启动
* 使用mvn编译，而后在class目录生成jar包，使用Java命令来启动

## 1.2项目属性配置

使用SpringBoot作为我们的框架，连Tomcat都不用自己配置。Tomcat默认的端口是8080。那如果我们要改端口的话，怎么改呢？？项目中可能有一些属性变量，那怎么配置呢？？？

SpringBoot是提供了application.properties这种配置文件供我们使用的。

但是，我们可以有更好的配置方式，使用yml文件，这种配置文件使用起来就更加简洁了。

在yml文件中配置属性，那么我们在Controller中可以使用`@value`属性来进行获取。

![](https://segmentfault.com/img/remote/1460000013849887?w=566&h=132)

![](https://segmentfault.com/img/remote/1460000013849888?w=349&h=199)

如果我们的配置属性是有规律的（是分类的），比如为System系统配置的属性，我们可以创建一个Java类来进行管理。

那么在获取的时候就不需要使用`@value`属性来分别获取了。直接获取Java类的成员变量就行了。

![](https://segmentfault.com/img/remote/1460000013849889?w=589&h=288)

![](https://segmentfault.com/img/remote/1460000013849890?w=214&h=117)

当然了，这里涉及到了两个注解：

* `@configurationProperties`
* `@Component`

再举个例子，我们的生产环境和开发环境的配置变量很有可能是不一样的，比如：我们的path变量在开发环境中是：`http://localhost:8080`。而我们的生产环境中的path路径是:`zhognfucheng.site`。这就造成了差异，在springBoot中，这种差异就很好解决了。

![](https://segmentfault.com/img/remote/1460000013849891?w=531&h=263)

* **可以将开发环境的配置文件和生产环境的配置文件分开，使用总配置文件指定使用的是哪个配置文件。**
* 在使用java变量启动Springboot项目的时候，可以指定使用哪个配置文件。

# 二、回顾

## 2.1Controller的使用

SpringBoot已经不推荐使用JSP了，推荐使用模版来返回页面。thymeleaf这个模版，如果在返回页面的时候出错了，看看是不是没有使用模版。

`@RestController = @Controller + @ResponseBody`

## 2.2统一处理异常

统一处理异常我在Struts2、springMVC的时候都已经接触过了，方法都是类似的。定义一个自己系统的异常，为了更好地排查出错误所在。

而这个课程的统一处理异常我又学到了不少的东西：

* 我们在Controller一般返回的是JSON数据给前端页面，如果**出现了异常，你单独抛出了异常，如果没有做任何的处理，返回的JSON格式一定和成功的访问的是不一样的，那么这就会造成前台在解析的时候可能会有混乱。为了解决这种情况，**我们可以单独封装一个类来进行返回，类的成员变量：code,message,data。有了这个类，那么返回的JSON格式就是相同的了。
* 前边说到了返回类的code，这个code最好就不要单独写出来。可以使用一个枚举来进行维护。这样的话就非常方便我们去操作了。
* service抛出自定义异常、controller也抛出自定义异常。由Spring的异常处理器来进行捕获、对其进行输出、返回JSON给前台页面。

## 2.3AOP

SpringBoot环境下使用AOP，也是需要导入maven坐标的。知识点都和spring学习的差不多...

使用日志记录可以使用sl4jlog，这个是Spring自带的。

![](https://segmentfault.com/img/remote/1460000013849892?w=1042&h=621)

在返回给浏览器前记录返回的数据：

![](https://segmentfault.com/img/remote/1460000013849893?w=719&h=124)

# 三、知新

## 3.1 SpringData JPA

SpringData JPA直接倒是听过，但是没了解过。课程说它就是一个标准，能够方便我们对数据库的CURD。

也去网上看了些资料，它的默认实现是Hibernate，因此，使用JPA，就相当于使用Hibernate了。

我认为它实际上就是封装了Hibernate的API，另Hibernate的开发又更加简单了。

创建一个接口，实现JPA所给出的接口，那么我们自己创建的接口就有了JPA也就是Hibernate的API了。

课程中使用的是RESTful风格的API实现增删改查：

![](https://segmentfault.com/img/remote/1460000013849894?w=991&h=596)

## 3.2IDEA类似与POSTMAN

视频作者使用的是POSTMAN软件来进行对http请求的测试的，在评论留言说IDEA也有这样的功能：

> idea 有个 rest client 可以代替postman Tools -> Test RESTful web service

我也顺利找到了..
![](https://segmentfault.com/img/remote/1460000013849895?w=1913&h=993)

既然是使用了RESTful的风格，那么在Controller了就可以使用GetMapping、PutMapping、DeleteMapping这样的注解了。

## 3.3单元测试

在service层做单元测试的和我之前学过的单元测试是一样的，就是autowired一个service对象然后就测试方法就行了。

而测试Controller、在教程中也称之为测试API，这就是我第一次接触了。测试API其实就是模拟使用HTTP来进行测试。

使用到了MOCK这么一个对象来帮我们进行测试：

![](https://segmentfault.com/img/remote/1460000013849896?w=878&h=385)

还有要注意的是：如果使用mvn来进行打包的话，那么打包的时候会自动帮我们进行单元测试的。因此，我们有的时候不想他打包的时候进行单元测试，就需要写以下的参数了：

![](https://segmentfault.com/img/remote/1460000013849897?w=981&h=40)

## 3.4热部署和热加载

在学习完上面SpringBoot以后，我觉得并不过瘾、随后又发现了一个课程：[http://www.imooc.com/learn/915](http://www.imooc.com/learn/915)

在标题上写着的是SpringBoot和热部署。于是我又进去学习了。

好的，回到热部署和热加载。------

热部署和热加载这两个名词其实我刚开始是搞不清的，不过这两个名词我都是听过的。因为我在Idea中使用了JRebel这个插件了，了解了大概的。

热部署代表的是：**我们不需要重启服务器，能够将新war包替换旧的war包**。

热加载代表的是：**我们不需要重启服务器，就能够类检测得到，重新生成类的字节码文件**

无论是热部署或者是热加载、都是基于Java类加载器来完成的。

### 3.4.1Java类加载过程

![](https://segmentfault.com/img/remote/1460000013849898?w=1196&h=432)

Java文件被编译成字节码文件、classloader将字节码文件放在JVM上运行。

![](https://segmentfault.com/img/remote/1460000013849899?w=599&h=200)

验证阶段：字节码文件不会对JVM造成危害

准备阶段：是会赋初始值，并不是程序中的值。比如：int=0

解析阶段：符号引用变成直接引用

初始化阶段：初始化程序的值、有5个情况会导致执行初始化时机：**new、reflect、先初始化父类再初始化子类、main方法、JDK1.7动态语言 ref_**

final修饰的并不会触发，因为他会放在常量池中。

![](https://segmentfault.com/img/remote/1460000013849900?w=1141&h=399)

![](https://segmentfault.com/img/remote/1460000013849901?w=1160&h=401)

在里边还有使用java代码的时候来实现热加载的，我就没有去敲了。用到再回过去吧。！

### 3.4.2Tomcat热部署

tomcat 可以使用3种方式实现热部署:

1. 直接启动tomcat后再把项目放进webapp
2. 修改servlet.xml中,context标签中加入属性实现
3. 通过自定义xml文件,放在localhost文件下面。我觉得就是第二点的延伸

### 3.4.3SpringBoot热部署

```
springBoot热部署3种方式：
1、在plugin标签中加入插件
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>springloaded</artifactId>
        <version>1.2.6.RELEASE</version>
    </dependency>
</dependencies>

进入pom文件的目录输入 mvn spring-boot:run启动

2、启动的加入参数 引用springloaded jar包
    -javaagent:'jar包路径' -noverify

3、pom文件加入依赖
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>

```

2018年1月2日15:02:13

最后根据下面这篇博文来使用SpringBoot热部署:[http://blog.csdn.net/u013938484/article/details/77541050](http://blog.csdn.net/u013938484/article/details/77541050)

**值得注意的是:在IDEA下不是自动编译的，因此是需要按Ctrl+F9才能实现!**

# 四、扩展阅读

后来我使用了SpringBoot搭建了一个简单的项目，从中也遇到了不少的问题和相关的没有接触到的知识点。下面我会给出当时**搜索到的资料和遇到的问题以及解决方案**

## 4.1 SpringBoot教程参考资料:

* [http://blog.didispace.com/Spring-Boot%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B/](http://blog.didispace.com/Spring-Boot%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B/)
* [http://www.cnblogs.com/magicalSam/p/7196340.html](http://www.cnblogs.com/magicalSam/p/7196340.html)
* springBoot整合mybatis，这次是没有用到的，可能以后会用到:

    * [http://www.cnblogs.com/elvinle/p/7999612.html](http://www.cnblogs.com/elvinle/p/7999612.html)
* springBoot Github Demo:

    * [https://github.com/t-hong/springboot-examples](https://github.com/t-hong/springboot-examples)
* 与流行框架整合的Demo(慕课网，对应有课程的)

    * [https://github.com/leechenxiang/imooc-springboot-starter](https://github.com/leechenxiang/imooc-springboot-starter)

## 4.2 SpringBoot遇到的问题以及解决资料

* 测试Controller使用MockMVC测试

    * [http://www.cnblogs.com/xd03122049/p/6001457.html](http://www.cnblogs.com/xd03122049/p/6001457.html)
    * [http://blog.csdn.net/xiao_xuwen/article/details/52890730](http://blog.csdn.net/xiao_xuwen/article/details/52890730)
    * [http://www.cnblogs.com/xiaohunshi/p/5706943.html](http://www.cnblogs.com/xiaohunshi/p/5706943.html)
* springBoot拦截器

    * [http://blog.csdn.net/catoop/article/details/50501696](http://blog.csdn.net/catoop/article/details/50501696)
* SpringBoot拦截器无法注入Bean

    * [https://my.oschina.net/u/1790105/blog/1490098](https://my.oschina.net/u/1790105/blog/1490098)
    * [http://blog.csdn.net/mjlfto/article/details/65635135](http://blog.csdn.net/mjlfto/article/details/65635135)
* 出现: Could not find acceptable representation原因及解决方法

    * [http://blog.csdn.net/neosmith/article/details/51557957](http://blog.csdn.net/neosmith/article/details/51557957)
    * 或者是因为返回的JSON数据，而你返回了一个页面(使用RESTCONTROLLER没有注意）
* springBoot下使用统一异常处理方法：

    * [http://www.cnblogs.com/magicalSam/p/7198420.html](http://www.cnblogs.com/magicalSam/p/7198420.html)
* springBoot集成Freemarker

    * [http://ifeve.com/spring-boot-%E9%9B%86%E6%88%90-freemarker-%E8%AF%A6%E8%A7%A3%E6%A1%88%E4%BE%8B/](http://ifeve.com/spring-boot-%E9%9B%86%E6%88%90-freemarker-%E8%AF%A6%E8%A7%A3%E6%A1%88%E4%BE%8B/)
    * [http://blog.csdn.net/z69183787/article/details/73850417](http://blog.csdn.net/z69183787/article/details/73850417)

# 五、最后

![](https://segmentfault.com/img/remote/1460000013849902?w=1043&h=315)

![](https://segmentfault.com/img/remote/1460000013849903)

![](https://segmentfault.com/img/remote/1460000013849904?w=894&h=185)

**SpringBoot能使我们简化繁琐的配置，简化Maven包的依赖(缺点:同时加入一些我们不需要的包)。总体来看的是一个非常好用的框架(集成了很多有用的功能，与其他框架整合十分方便)，学习成本很低(如果学过SpringMVC，分分钟就上手)，非常合适用来搭建环境。**

# Spring Boot 

104.什么是 spring boot？

105.为什么要用 spring boot？

106.spring boot 核心配置文件是什么？

107.spring boot 配置文件有哪几种类型？它们有什么区别？

108.spring boot 有哪些方式可以实现热部署？

109.jpa 和 hibernate 有什么区别？

**1、什么是 Spring Boot？**

Spring Boot 是 Spring 开源组织下的子项目，是 Spring 组件一站式解决方案，主要是简化了使用 Spring 的难度，简省了繁重的配置，提供了各种启动器，开发者能快速上手。

更多 Spring Boot 详细介绍请看这篇文章《[什么是Spring Boot?](https://mp.weixin.qq.com/s/jWLcPxTg9bH3D9_7qbYbfw)》。

**2、为什么要用 Spring Boot？**

Spring Boot 优点非常多，如：

* 独立运行
* 简化配置
* 自动配置
* 无代码生成和XML配置
* 应用监控
* 上手容易
* ...

Spring Boot 集这么多优点于一身，还有理由不使用它呢？

**3、Spring Boot 的核心配置文件有哪几个？它们的区别是什么？**

Spring Boot 的核心配置文件是 application 和 bootstrap 配置文件。

application 配置文件这个容易理解，主要用于 Spring Boot 项目的自动化配置。

bootstrap 配置文件有以下几个应用场景。

* 使用 Spring Cloud Config 配置中心时，这时需要在 bootstrap 配置文件中添加连接到配置中心的配置属性来加载外部配置中心的配置信息；
* 一些固定的不能被覆盖的属性；
* 一些加密/解密的场景；

具体请看这篇文章《[Spring Boot 核心配置文件详解](https://mp.weixin.qq.com/s/BzXNfBzq-2TOCbiHG3xcsQ)》。

**4、Spring Boot 的配置文件有哪几种格式？它们有什么区别？**

.properties 和 .yml，它们的区别主要是书写格式不同。

1).properties

```
app.user.name = javastack

```

2).yml

```
app:
  user:
    name: javastack

```

另外，.yml 格式不支持 `@PropertySource` 注解导入配置。

**5、Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？**

启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：

@SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。

@EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。

@ComponentScan：Spring组件扫描。

**6、开启 Spring Boot 特性有哪几种方式？**

1）继承spring-boot-starter-parent项目

2）导入spring-boot-dependencies项目依赖

具体请参考这篇文章《[Spring Boot开启的2种方式](https://mp.weixin.qq.com/s/PYM_iV-u3dPMpP3MNz7Hig)》。

**7、Spring Boot 需要独立的容器运行吗？**

可以不需要，内置了 Tomcat/ Jetty 等容器。

**8、运行 Spring Boot 有哪几种方式？**

1）打包用命令或者放到容器中运行

2）用 Maven/ Gradle 插件运行

3）直接执行 main 方法运行

**9、Spring Boot 自动配置原理是什么？**

注解 @EnableAutoConfiguration, @Configuration, @ConditionalOnClass 就是自动配置的核心，首先它得是一个配置文件，其次根据类路径下是否有这个类去自动配置。

具体看这篇文章《[Spring Boot自动配置原理、实战](https://mp.weixin.qq.com/s/gs2zLSH6m9ijO0-pP2sr9Q)》。

**10、Spring Boot 的目录结构是怎样的？**

```
cn
 +- javastack
     +- MyApplication.java
     |
     +- customer
     |   +- Customer.java
     |   +- CustomerController.java
     |   +- CustomerService.java
     |   +- CustomerRepository.java
     |
     +- order
         +- Order.java
         +- OrderController.java
         +- OrderService.java
         +- OrderRepository.java

```

这个目录结构是主流及推荐的做法，而在主入口类上加上 @SpringBootApplication 注解来开启 Spring Boot 的各项能力，如自动配置、组件扫描等。具体看这篇文章《[Spring Boot 主类及目录结构介绍](https://mp.weixin.qq.com/s/auJGrOFVGlH8uzdk9SIHPw)》。

**11、你如何理解 Spring Boot 中的 Starters？**

Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成 Spring 及其他技术，而不需要到处找示例代码和依赖包。如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。

Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。具体请看这篇文章《[Spring Boot Starters启动器](https://mp.weixin.qq.com/s/9HJVGlplze5p0eBayvhFCA)》。

**12、如何在 Spring Boot 启动的时候运行一些特定的代码？**

可以实现接口 ApplicationRunner 或者 CommandLineRunner，这两个接口实现方式一样，它们都只提供了一个 run 方法，具体请看这篇文章《[Spring Boot Runner启动器](https://mp.weixin.qq.com/s/WeO2kJLV6LKez56T5GG35Q)》。

**13、Spring Boot 有哪几种读取配置的方式？**

Spring Boot 可以通过 @PropertySource,@Value,@Environment, @ConfigurationProperties 来绑定变量，具体请看这篇文章《[Spring Boot读取配置的几种方式](https://mp.weixin.qq.com/s/aen2PIh0ut-BSHad-Bw7hg)》。

**14、Spring Boot 支持哪些日志框架？推荐和默认的日志框架是哪个？**

Spring Boot 支持 Java Util Logging, Log4j2, Lockback 作为日志框架，如果你使用 Starters 启动器，Spring Boot 将使用 Logback 作为默认日志框架，具体请看这篇文章《[Spring Boot日志集成](https://mp.weixin.qq.com/s/OAyzUNIgBPkPVCy23gh-WA)》。

**15、SpringBoot 实现热部署有哪几种方式？**

主要有两种方式：

* Spring Loaded
* Spring-boot-devtools

Spring-boot-devtools 使用方式可以参考这篇文章《[Spring Boot实现热部署](https://mp.weixin.qq.com/s/uv8jIztilO_QvGc7qGhSAA)》。

**16、你如何理解 Spring Boot 配置加载顺序？**

在 Spring Boot 里面，可以使用以下几种方式来加载配置。

1）properties文件；

2）YAML文件；

3）系统环境变量；

4）命令行参数；

等等……

具体请看这篇文章《[Spring Boot 配置加载顺序详解](https://mp.weixin.qq.com/s/tFrRMM25LVE_2AG23lK5qQ)》。

**17、Spring Boot 如何定义多套不同环境配置？**

提供多套配置文件，如：

```
applcation.properties

application-dev.properties

application-test.properties

application-prod.properties

```

运行时指定具体的配置文件，具体请看这篇文章《[Spring Boot Profile 不同环境配置](https://mp.weixin.qq.com/s/K0kdQwoo2t5FDsTUJttSAA)》。

**18、Spring Boot 可以兼容老 Spring 项目吗，如何做？**

可以兼容，使用 `@ImportResource` 注解导入老 Spring 项目配置文件。

**19、保护 Spring Boot 应用有哪些方法？**

* 在生产中使用HTTPS
* 使用Snyk检查你的依赖关系
* 升级到最新版本
* 启用CSRF保护
* 使用内容安全策略防止XSS攻击
* ...

更多请看这篇文章《[10 种保护 Spring Boot 应用的绝佳方法](https://mp.weixin.qq.com/s/HG4_StZyNCoWx02mUVCs1g)》。

**20、Spring Boot 2.X 有什么新特性？与 1.X 有什么区别？**

* 配置变更
* JDK 版本升级
* 第三方类库升级
* 响应式 Spring 编程支持
* HTTP/2 支持
* 配置属性绑定
* 更多改进与加强...

具体请看这篇文章《[Spring Boot 2.x 新特性总结及迁移指南](https://mp.weixin.qq.com/s/-WWBvWpD0Prib02XoU1sjw)》。



# Spring Boot除了自动配置，相比传统的 Spring 有什么其他的区别？

**1、什么是 Spring Boot？**

Spring Boot 是 Spring 开源组织下的子项目，是 Spring 组件一站式解决方案，主要是简化了使用 Spring 的难度，简省了繁重的配置，提供了各种启动器，开发者能快速上手。

更多 Spring Boot 详细介绍请看这篇文章《[什么是Spring Boot?](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484224&idx=1&sn=94a5a2865da38f93941b05f2de006966&scene=21#wechat_redirect)》。

**2、为什么要用 Spring Boot？**

Spring Boot 优点非常多，如：

* 独立运行

* 简化配置

* 自动配置

* 无代码生成和XML配置

* 应用监控

* 上手容易

* …

Spring Boot 集这么多优点于一身，还有理由不使用它呢？

**3、Spring Boot 的核心配置文件有哪几个？它们的区别是什么？**

Spring Boot 的核心配置文件是 application 和 bootstrap 配置文件。

application 配置文件这个容易理解，主要用于 Spring Boot 项目的自动化配置。

bootstrap 配置文件有以下几个应用场景。

* 使用 Spring Cloud Config 配置中心时，这时需要在 bootstrap 配置文件中添加连接到配置中心的配置属性来加载外部配置中心的配置信息；

* 一些固定的不能被覆盖的属性；

* 一些加密/解密的场景；

具体请看这篇文章《[Spring Boot 核心配置文件详解](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486541&idx=2&sn=436ab454a6367fdc33912162855c02c7&scene=21#wechat_redirect)》。

**4、Spring Boot 的配置文件有哪几种格式？它们有什么区别？**

.properties 和 .yml，它们的区别主要是书写格式不同。

1).properties

```
app.user.name = javastack
```

2).yml

```
app:  user:    name: javastack
```

另外，.yml 格式不支持 `@PropertySource` 注解导入配置。

**5、Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？**

启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：

@SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。

@EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。

@ComponentScan：Spring组件扫描。

**6、开启 Spring Boot 特性有哪几种方式？**

1）继承spring-boot-starter-parent项目

2）导入spring-boot-dependencies项目依赖

具体请参考这篇文章《[Spring Boot开启的2种方式](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484256&idx=1&sn=f9ac0ef6651e431221e477217375cdf1&scene=21#wechat_redirect)》。

**7、Spring Boot 需要独立的容器运行吗？**

可以不需要，内置了 Tomcat/ Jetty 等容器。

**8、运行 Spring Boot 有哪几种方式？**

1）打包用命令或者放到容器中运行

2）用 Maven/ Gradle 插件运行

3）直接执行 main 方法运行

**9、Spring Boot 自动配置原理是什么？**

注解 @EnableAutoConfiguration, @Configuration, @ConditionalOnClass 就是自动配置的核心，首先它得是一个配置文件，其次根据类路径下是否有这个类去自动配置。

具体看这篇文章《[Spring Boot自动配置原理、实战](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484365&idx=1&sn=a4ab1d977d6b03bf122b4d596d7ee1ab&scene=21#wechat_redirect)》。

**10、Spring Boot 的目录结构是怎样的？**

```
cn +- javastack     +- MyApplication.java     |     +- customer     |   +- Customer.java     |   +- CustomerController.java     |   +- CustomerService.java     |   +- CustomerRepository.java     |     +- order         +- Order.java         +- OrderController.java         +- OrderService.java         +- OrderRepository.java
```

这个目录结构是主流及推荐的做法，而在主入口类上加上 @SpringBootApplication 注解来开启 Spring Boot 的各项能力，如自动配置、组件扫描等。具体看这篇文章《[Spring Boot 主类及目录结构介绍](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487024&idx=2&sn=cfa57752f041e00b7a48739bc5178854&scene=21#wechat_redirect)》。

**11、你如何理解 Spring Boot 中的 Starters？**

Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成 Spring 及其他技术，而不需要到处找示例代码和依赖包。如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。

Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。具体请看这篇文章《[Spring Boot Starters启动器](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484257&idx=1&sn=f06b553cb8695448f7a7e6d07aacae70&scene=21#wechat_redirect)》。

**12、如何在 Spring Boot 启动的时候运行一些特定的代码？**

可以实现接口 ApplicationRunner 或者 CommandLineRunner，这两个接口实现方式一样，它们都只提供了一个 run 方法，具体请看这篇文章《[Spring Boot Runner启动器](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484366&idx=1&sn=7dc94038861fe9e10cdf132ffc83092f&scene=21#wechat_redirect)》。

**13、Spring Boot 有哪几种读取配置的方式？**

Spring Boot 可以通过 @PropertySource,@Value,@Environment, @ConfigurationProperties 来绑定变量，具体请看这篇文章《[Spring Boot读取配置的几种方式](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484575&idx=1&sn=56c88cd7283374345d891e85a800539b&scene=21#wechat_redirect)》。

**14、Spring Boot 支持哪些日志框架？推荐和默认的日志框架是哪个？**

Spring Boot 支持 Java Util Logging, Log4j2, Lockback 作为日志框架，如果你使用 Starters 启动器，Spring Boot 将使用 Logback 作为默认日志框架，具体请看这篇文章《[Spring Boot日志集成](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484653&idx=1&sn=8a71809471fe69b1fc3b8dec44ed1498&scene=21#wechat_redirect)》。

**15、SpringBoot 实现热部署有哪几种方式？**

主要有两种方式：

* Spring Loaded

* Spring-boot-devtools

Spring-boot-devtools 使用方式可以参考这篇文章《[Spring Boot实现热部署](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484791&idx=1&sn=ee172b4fdd6253720807c84d4425a8ee&scene=21#wechat_redirect)》。

**16、你如何理解 Spring Boot 配置加载顺序？**

在 Spring Boot 里面，可以使用以下几种方式来加载配置。

1）properties文件；

2）YAML文件；

3）系统环境变量；

4）命令行参数；

等等……

具体请看这篇文章《[Spring Boot 配置加载顺序详解](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486895&idx=2&sn=1d49a0de72f9dee2c434ae905d5bc2e4&scene=21#wechat_redirect)》。

**17、Spring Boot 如何定义多套不同环境配置？**

提供多套配置文件，如：

```
applcation.propertiesapplication-dev.propertiesapplication-test.propertiesapplication-prod.properties
```

运行时指定具体的配置文件，具体请看这篇文章《[Spring Boot Profile 不同环境配置](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484369&idx=1&sn=1155fccb4fef1db88cb76fd17b1756d7&scene=21#wechat_redirect)》。

**18、Spring Boot 可以兼容老 Spring 项目吗，如何做？**

可以兼容，使用 `@ImportResource` 注解导入老 Spring 项目配置文件。

**19、保护 Spring Boot 应用有哪些方法？**

* 在生产中使用HTTPS

* 使用Snyk检查你的依赖关系

* 升级到最新版本

* 启用CSRF保护

* 使用内容安全策略防止XSS攻击

* …

更多请看这篇文章《[10 种保护 Spring Boot 应用的绝佳方法](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247487049&idx=1&sn=5a2ee3aa80a288cea3c86a3f58b931e0&scene=21#wechat_redirect)》。

**20、Spring Boot 2.X 有什么新特性？与 1.X 有什么区别？**

* 配置变更

* JDK 版本升级

* 第三方类库升级

* 响应式 Spring 编程支持

* HTTP/2 支持

* 配置属性绑定

* 更多改进与加强…

具体请看这篇文章《[Spring Boot 2.x 新特性总结及迁移指南](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486395&idx=1&sn=acad48d7672a796db39fa2d09dc59caf&scene=21#wechat_redirect)》。
