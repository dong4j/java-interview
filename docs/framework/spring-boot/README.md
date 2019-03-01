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

