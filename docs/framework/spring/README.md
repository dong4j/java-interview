# Spring

作者：柳树

链接：https://www.zhihu.com/question/21346206/answer/359268420

来源：知乎

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

从最基础的Hello World开始。

spring的Hello World就三行代码：

```java
public void test() {
	ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
	SomeBean someBean= (SomeBean) context.getBean("someBean");
	someBean.doSomething();
}
```

这个hello world非常简单，通过xml文件，创建一个容器context，然后从容器中获取一个bean。

运行完这段代码后，问自己两个问题：

- **容器创建时做了什么？**
- **getBean()时又做了什么？**

虽然这个例子是用的xml配置，但是搞懂这两个问题，对于另外两种配置方式，注解配置和Java Config，也就顺理成章了，原理都一样的。

如何才能知道？**调试**。

好，开始回答第一个问题，容器创建时做了什么？

不管是xml，还是注解、Java Config，这些都是为了方便使用者而设计的，JVM可不知道说 `<bean>`这个标签是啥意思，所以自然的，Spring需要对这些配置进行解析。

比如对于xml，就用XmlBeanDefinitionReader，把你写的beans.xml解析出来，你要创建什么对象，这些对象依赖哪些对象，是不是要懒加载（lazy-init）,是不是单例...... 通通解析出来，放到一个叫**BeanDefinition**的对象里头，有多少种对象，就有多少个BeanDefinition，然后把这些BeanDefinition放到一个**Map**里头。

BeanDefinition有什么用？当然是为了后面实例化Bean用的，为什么要把配置信息放到BeanDefinition里？自然是不想每次需要实例对象时都去解析配置信息。

创建完所有BeanDefinition之后，会马上实例化对象吗？

如果用的是BeanFactory作为容器，则不会，对象默认都是懒加载，也就是在你想获取的时候再创建；

如果用的是上面hello world里的ApplicationContext ，则会马上实例化所有非懒加载的bean。

怎么实例化呢？这时候BeanDefinition就派上用场了，利用BeanDefinition里面的类信息，再用上反射，很容易就可以new出一个实例；

那如果bean里面依赖其他bean呢？那就顺带把其他bean也实例化出来，然后通过构造函数或者set方法，注入到bean里面去。

实例化后的bean，就直接返回给你了吗？这可不行，单例对象可是要复用的，Spring容器会被new出来的对象，放到又一个Map里面，这也解释了为什么bean不会被GC回收，因为bean通过Map和容器关联了，而容器对象是GC Root。当然，上面讲的仅限于单例，多例可不会放到Map里，容器创建完就直接丢出去了，让对象自生自灭，该回收时就回收。

第一个问题回答结束。



理解了第一个问题，第二个问题就很简单了，获取bean时又做了什么？

很简单：

- 如果bean是单例，并且还没实例化，那就按照上面的流程new一个，如果已经实例化了，就直接返回；
- 如果是多例，new一个返回

第二个问题回答结束。



稍微总结一下。怎样读源码？**先学会怎么用，再去弄懂为什么。知其然知其所以然，首先要知其然啊。**

**读源码跟读书很像的，带着疑问去阅读，效率会高很多**，有兴趣可以看看我之前写的：

我读了这七本书，写了这篇关于如何高效阅读的文章www.jianshu.com



先粗读，也就是不断的单步调试，不必每个方法都step into想一看究竟，多step over，了解一下大概，然后记下疑问，进行第二版精读。

精读就要弄懂每一行代码吗？不必，只看你关心的，Spring IoC的实际逻辑比我上面讲的要复杂的多，包括一些如果放在bean在实例化的过程中，拒绝掉新的实例化请求等线程安全问题，这些都不是你关心的重点，看到了快速跳过即可，只看你关心的。

关于Spring IoC的一些基础用法，可以看看我写的一系列文章：

Javdroider Hong：用小说的形式讲解Spring（1） —— 为什么需要依赖注入zhuanlan.zhihu.com![图标](https://pic2.zhimg.com/v2-bc798901e64e576d2ccc5bf9a927824d_180x120.jpg)

Javdroider Hong：用小说的形式讲解Spring（2） —— 注入方式哪家强zhuanlan.zhihu.com![图标](https://pic1.zhimg.com/v2-d4bdb5aaf2318ac2305715deacdc165c_180x120.jpg)

Javdroider Hong：用小说的形式讲解Spring（3） —— xml、注解和Java Config到底选哪个zhuanlan.zhihu.com![图标](https://pic2.zhimg.com/v2-ce7e138602ff8a6a641a870a40b380c1_180x120.jpg)

看完之后，你如果想了解具体实现原理的话，可以直接用我Github里面的代码调试。

最后，推荐一本讲Spring源码的超级好书，王福强老师的[《Spring揭秘》](https://link.zhihu.com/?target=https%3A//book.douban.com/subject/3897837/)，不过现在买不到了，可以在某东上面买电子书。

[怎么怎样一步步开发 Spring](https://github.com/dong4j/tiny-spring)

# Spring 

90.为什么要使用 spring？

## IOC 原理

91.解释一下什么是 aop？

AOP(Aspect Oriented Programming) 面向切面编程，是目前软件开发中的一个热点，是Spring框架内容，利用AOP可以对业务逻辑的各个部分隔离，从而使的业务逻辑各部分的耦合性降低，提高程序的可重用性，踢开开发效率，主要功能：日志记录，性能统计，安全控制，事务处理，异常处理等。

AOP实现原理是java动态代理，但是jdk的动态代理必须实现接口，所以spring的aop是用cglib这个库实现的，cglis使用里asm这个直接操纵字节码的框架，所以可以做到不使用接口的情况下实现动态代理。

## IOC 初始化流程

## AOP 原理

## OOP是什么

OOP面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。

## AOP与OOP的区别

OOP面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。而AOP则是针对业务处理过程中的切面进行提取，它所面对的是处理过程的某个步骤或阶段，以获得逻辑过程的中各部分之间低耦合的隔离效果。这两种设计思想在目标上有着本质的差异。

举例：

对于“雇员”这样一个业务实体进行封装，自然是OOP的任务，我们可以建立一个“Employee”类，并将“雇员”相关的属性和行为封装其中。而用AOP 设计思想对“雇员”进行封装则无从谈起。

同样，对于“权限检查”这一动作片段进行划分，则是AOP的目标领域。

OOP面向名次领域，AOP面向动词领域。

总之AOP可以通过预编译方式和运行期动态代理实现在不修改源码的情况下，给程序动态同意添加功能的一项技术。

## 92.解释一下什么是 ioc？

93.spring 有哪些主要模块？

94.spring 常用的注入方式有哪些？

95.spring 中的 bean 是线程安全的吗？

96.spring 支持几种 bean 的作用域？

97.spring 自动装配 bean 有哪些方式？

## Spring Bean 的生命周期

## xml 中配置的 init、destroy 方法怎么可以做到调用具体的方法？

98.spring 事务实现方式有哪些？

99.说一下 spring 的事务隔离？

103.@Autowired 的作用是什么？

@Autowired 和 @Resource 的区别

构造器注入和 setter 依赖注入，那种方式更好？ 

## 简述Spring是怎么巧妙的解决bean循环依赖问题的？

[Spring-bean的循环依赖以及解决方式](https://blog.csdn.net/u010853261/article/details/77940767)
[Spring循环依赖的三种方式](https://blog.csdn.net/u010644448/article/details/59108799)

## # 手写一个 Spring

**1\. 什么是spring?**

Spring 是个java企业级应用的开源开发框架。Spring主要用来开发Java应用，但是有些扩展是针对构建J2EE平台的web应用。Spring 框架目标是简化Java企业级应用开发，并通过POJO为基础的编程模型促进良好的编程习惯。

**2\. 使用Spring框架的好处是什么？**

* **轻量：**Spring 是轻量的，基本的版本大约2MB

* **控制反转：**Spring通过控制反转实现了松散耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们

* **面向切面的编程(AOP)：**Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开

* **容器：**Spring 包含并管理应用中对象的生命周期和配置

* **MVC框架：**Spring的WEB框架是个精心设计的框架，是Web框架的一个很好的替代品

* **事务管理：**Spring 提供一个持续的事务管理接口，可以扩展到上至本地事务下至全局事务（JTA）

* **异常处理：**Spring 提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked 异常

**3\.  Spring由哪些模块组成？**

以下是Spring 框架的基本模块：

* Core module
* Bean module
* Context module
* Expression Language module
* JDBC module
* ORM module
* OXM module
* Java Messaging Service(JMS) module
* Transaction module
* Web module
* Web-Servlet module
* Web-Struts module
* Web-Portlet module

**4\. 核心容器（应用上下文) 模块**

这是基本的Spring模块，提供spring 框架的基础功能，BeanFactory 是 任何以spring为基础的应用的核心。Spring 框架建立在此模块之上，它使Spring成为一个容器。

**5\. BeanFactory – BeanFactory 实现举例**

Bean 工厂是工厂模式的一个实现，提供了控制反转功能，用来把应用的配置和依赖从正真的应用代码中分离。最常用的BeanFactory 实现是XmlBeanFactory 类。

**6\. XMLBeanFactory**

最常用的就是org.springframework.beans.factory.xml.XmlBeanFactory ，它根据XML文件中的定义加载beans。该容器从XML 文件读取配置元数据并用它去创建一个完全配置的系统或应用。

**7\. 解释AOP模块**

AOP模块用于发给我们的Spring应用做面向切面的开发， 很多支持由AOP联盟提供，这样就确保了Spring和其他AOP框架的共通性。这个模块将元数据编程引入Spring。

**8\. 解释JDBC抽象和DAO模块**

通过使用JDBC抽象和DAO模块，保证数据库代码的简洁，并能避免数据库资源错误关闭导致的问题，它在各种不同的数据库的错误信息之上，提供了一个统一的异常访问层。它还利用Spring的AOP 模块给Spring应用中的对象提供事务管理服务。

**9\. 解释对象/关系映射集成模块**

Spring 通过提供ORM模块，支持我们在直接JDBC之上使用一个对象/关系映射映射(ORM)工具，Spring 支持集成主流的ORM框架，如Hiberate,JDO和 iBATIS SQL Maps。Spring的事务管理同样支持以上所有ORM框架及JDBC。

**10\.  解释WEB 模块**

Spring的WEB模块是构建在application context 模块基础之上，提供一个适合web应用的上下文。这个模块也包括支持多种面向web的任务，如透明地处理多个文件上传请求和程序级请求参数的绑定到你的业务对象。它也有对Jakarta Struts的支持。

**12\.  Spring配置文件**

Spring配置文件是个XML 文件，这个文件包含了类信息，描述了如何配置它们，以及如何相互调用。

**13\.  什么是Spring IOC 容器？**

Spring IOC 负责创建对象，管理对象（通过依赖注入（DI），装配对象，配置对象，并且管理这些对象的整个生命周期。

**14\.  IOC的优点是什么？**

IOC 或 依赖注入把应用的代码量降到最低。它使应用容易测试，单元测试不再需要单例和JNDI查找机制。最小的代价和最小的侵入性使松散耦合得以实现。IOC容器支持加载服务时的饿汉式初始化和懒加载。

**15\. ApplicationContext通常的实现是什么？**

* **FileSystemXmlApplicationContext ：**此容器从一个XML文件中加载beans的定义，XML Bean 配置文件的全路径名必须提供给它的构造函数。

* **ClassPathXmlApplicationContext：**此容器也从一个XML文件中加载beans的定义，这里，你需要正确设置classpath因为这个容器将在classpath里找bean配置。

* **WebXmlApplicationContext：**此容器加载一个XML文件，此文件定义了一个WEB应用的所有bean。

**16\. Bean 工厂和 Application contexts  有什么区别？**

Application contexts提供一种方法处理文本消息，一个通常的做法是加载文件资源（比如镜像），它们可以向注册为监听器的bean发布事件。另外，在容器或容器内的对象上执行的那些不得不由bean工厂以程序化方式处理的操作，可以在Application contexts中以声明的方式处理。Application contexts实现了MessageSource接口，该接口的实现以可插拔的方式提供获取本地化消息的方法。

**17\. 一个Spring的应用看起来象什么？**

* 一个定义了一些功能的接口
* 这实现包括属性，它的Setter ， getter 方法和函数等
* Spring AOP
* Spring 的XML 配置文件
* 使用以上功能的客户端程序

### 依赖注入


**18\. 什么是Spring的依赖注入？**

依赖注入，是IOC的一个方面，是个通常的概念，它有多种解释。这概念是说你不用创建对象，而只需要描述它如何被创建。你不在代码里直接组装你的组件和服务，但是要在配置文件里描述哪些组件需要哪些服务，之后一个容器（IOC容器）负责把他们组装起来。

**19\.  有哪些不同类型的IOC（依赖注入）方式？**

* **构造器依赖注入：**构造器依赖注入通过容器触发一个类的构造器来实现的，该类有一系列参数，每个参数代表一个对其他类的依赖。
* **Setter方法注入：**Setter方法注入是容器通过调用无参构造器或无参static工厂 方法实例化bean之后，调用该bean的setter方法，即实现了基于setter的依赖注入。

**20\. 哪种依赖注入方式你建议使用，构造器注入，还是 Setter方法注入？**


你两种依赖方式都可以使用，构造器注入和Setter方法注入。最好的解决方案是用构造器参数实现强制依赖，setter方法实现可选依赖。

### Spring Beans


**21.什么是Spring beans？**


Spring beans 是那些形成Spring应用的主干的java对象。它们被Spring IOC容器初始化，装配，和管理。这些beans通过容器中配置的元数据创建。比如，以XML文件中 的形式定义。

Spring 框架定义的beans都是单件beans。在bean tag中有个属性”singleton”，如果它被赋为TRUE，bean 就是单件，否则就是一个 prototype bean。默认是TRUE，所以所有在Spring框架中的beans 缺省都是单件。点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484197&idx=1&sn=028543ecb1602022ca72e26d4aad181b&chksm=eb538613dc240f057a755cb1e4d7f6bd5388fe270a6b9b80ff5cd2336382381e3a658d8513d1&scene=21#wechat_redirect)一图Spring Bean的生命周期。

**22\. 一个 Spring Bean 定义 包含什么？**

一个Spring Bean 的定义包含容器必知的所有配置元数据，包括如何创建一个bean，它的生命周期详情及它的依赖。

**23\. 如何给Spring 容器提供配置元数据？**

这里有三种重要的方法给Spring 容器提供配置元数据。

XML配置文件。

基于注解的配置。

基于java的配置。

**24\. 你怎样定义类的作用域？**

当定义一个 在Spring里，我们还能给这个bean声明一个作用域。它可以通过bean 定义中的scope属性来定义。如，当Spring要在需要的时候每次生产一个新的bean实例，bean的scope属性被指定为prototype。另一方面，一个bean每次使用的时候必须返回同一个实例，这个bean的scope 属性 必须设为 singleton。

**25\. 解释Spring支持的几种bean的作用域**

Spring框架支持以下五种bean的作用域：

* **singleton : **bean在每个Spring ioc 容器中只有一个实例。
* **prototype：**一个bean的定义可以有多个实例。
* **request：**每次http请求都会创建一个bean，该作用域仅在基于web的Spring ApplicationContext情形下有效。
* **session：**在一个HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。
* **global-session：**在一个全局的HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。

缺省的Spring bean 的作用域是Singleton。

**26\. Spring框架中的单例bean是线程安全的吗？**

不，Spring框架中的单例bean不是线程安全的。

**27\. 解释Spring框架中bean的生命周期**

* Spring容器 从XML 文件中读取bean的定义，并实例化bean。
* Spring根据bean的定义填充所有的属性。
* 如果bean实现了BeanNameAware 接口，Spring 传递bean 的ID 到 setBeanName方法。
* 如果Bean 实现了 BeanFactoryAware 接口， Spring传递beanfactory 给setBeanFactory 方法。
* 如果有任何与bean相关联的BeanPostProcessors，Spring会在postProcesserBeforeInitialization()方法内调用它们。
* 如果bean实现IntializingBean了，调用它的afterPropertySet方法，如果bean声明了初始化方法，调用此初始化方法。
* 如果有BeanPostProcessors 和bean 关联，这些bean的postProcessAfterInitialization() 方法将被调用。
* 如果bean实现了 DisposableBean，它将调用destroy()方法。

点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484197&idx=1&sn=028543ecb1602022ca72e26d4aad181b&chksm=eb538613dc240f057a755cb1e4d7f6bd5388fe270a6b9b80ff5cd2336382381e3a658d8513d1&scene=21#wechat_redirect)一图Spring Bean的生命周期。

**28\.  哪些是重要的bean生命周期方法？ 你能重载它们吗？**

有两个重要的bean 生命周期方法，第一个是setup ， 它是在容器加载bean的时候被调用。第二个方法是 teardown  它是在容器卸载类的时候被调用。

The bean 标签有两个重要的属性（init-method和destroy-method）。用它们你可以自己定制初始化和注销方法。它们也有相应的注解（@PostConstruct和@PreDestroy）。

**29\. 什么是Spring的内部bean？**

当一个bean仅被用作另一个bean的属性时，它能被声明为一个内部bean，为了定义inner bean，在Spring 的 基于XML的 配置元数据中，可以在 或  元素内使用 元素，内部bean通常是匿名的，它们的Scope一般是prototype。

**30\. 在 Spring中如何注入一个java集合？**

Spring提供以下几种集合的配置元素：

* 类型用于注入一列值，允许有相同的值。
* 类型用于注入一组值，不允许有相同的值。
* 类型用于注入一组键值对，键和值都可以为任意类型。
* 类型用于注入一组键值对，键和值都只能为String类型。

**31\. 什么是bean装配？**

装配，或bean 装配是指在Spring 容器中把bean组装到一起，前提是容器需要知道bean的依赖关系，如何通过依赖注入来把它们装配到一起。

**32\. 什么是bean的自动装配？**

Spring 容器能够自动装配相互合作的bean，这意味着容器不需要和配置，能通过Bean工厂自动处理bean之间的协作。

**33\. 解释不同方式的自动装配**

有五种自动装配的方式，可以用来指导Spring容器用自动装配方式来进行依赖注入

* **no：**默认的方式是不进行自动装配，通过显式设置ref 属性来进行装配。
* **byName：**通过参数名 自动装配，Spring容器在配置文件中发现bean的autowire属性被设置成byname，之后容器试图匹配、装配和该bean的属性具有相同名字的bean。
* **byType：**通过参数类型自动装配，Spring容器在配置文件中发现bean的autowire属性被设置成byType，之后容器试图匹配、装配和该bean的属性具有相同类型的bean。如果有多个bean符合条件，则抛出错误。
* **constructor：**这个方式类似于byType， 但是要提供给构造器参数，如果没有确定的带参数的构造器参数类型，将会抛出异常。
* **autodetect：**首先尝试使用constructor来自动装配，如果无法工作，则使用byType方式。

**34.自动装配有哪些局限性？**

自动装配的局限性是：

* **重写：**你仍需用 和  配置来定义依赖，意味着总要重写自动装配。
* **基本数据类型：**你不能自动装配简单的属性，如基本数据类型，String字符串，和类。
* **模糊特性：**自动装配不如显式装配精确，如果有可能，建议使用显式装配。

**35\. 你可以在Spring中注入一个null 和一个空字符串吗？**

可以。


### Spring注解


**36\. 什么是基于Java的Spring注解配置? 给一些注解的例子**

基于Java的配置，允许你在少量的Java注解的帮助下，进行你的大部分Spring配置而非通过XML文件。
以@Configuration 注解为例，它用来标记类可以当做一个bean的定义，被Spring IOC容器使用。另一个例子是@Bean注解，它表示此方法将要返回一个对象，作为一个bean注册进Spring应用上下文。点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484195&idx=1&sn=e28f9c3a2f7628061fe15bef668f2ea7&chksm=eb538615dc240f030a66def589edf773ff3dab16902fce130e4bdeb246b3da8da6c3e25e44d6&scene=21#wechat_redirect)学习JAVA几大元注解。

**37\. 什么是基于注解的容器配置？**

相对于XML文件，注解型的配置依赖于通过字节码元数据装配组件，而非尖括号的声明。

开发者通过在相应的类，方法或属性上使用注解的方式，直接组件类中进行配置，而不是使用xml表述bean的装配关系。

**38\. 怎样开启注解装配？**

注解装配在默认情况下是不开启的，为了使用注解装配，我们必须在Spring配置文件中配置 元素。

**39\. @Required  注解**

这个注解表明bean的属性必须在配置的时候设置，通过一个bean定义的显式的属性值或通过自动装配，若@Required注解的bean属性未被设置，容器将抛出BeanInitializationException。

**40\. @Autowired 注解**

@Autowired 注解提供了更细粒度的控制，包括在何处以及如何完成自动装配。它的用法和@Required一样，修饰setter方法、构造器、属性或者具有任意名称和/或多个参数的PN方法。

**41\. @Qualifier 注解**

当有多个相同类型的bean却只有一个需要自动装配时，将@Qualifier 注解和@Autowire 注解结合使用以消除这种混淆，指定需要装配的确切的bean。点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484331&idx=1&sn=acf8750f5b4174cf238527498f06e307&chksm=eb53869ddc240f8bfebeb73cd5bae0fed5ebf4b349f37a62129afc7f0432fbf99500245f129a&scene=21#wechat_redirect)学习更多常用注解。


### Spring数据访问

**42.在Spring框架中如何更有效地使用JDBC？**

使用SpringJDBC 框架，资源管理和错误处理的代价都会被减轻。所以开发者只需写statements 和 queries从数据存取数据，JDBC也可以在Spring框架提供的模板类的帮助下更有效地被使用，这个模板叫JdbcTemplate （例子见这里here）

**43\. JdbcTemplate**

JdbcTemplate 类提供了很多便利的方法解决诸如把数据库数据转变成基本数据类型或对象，执行写好的或可调用的数据库操作语句，提供自定义的数据错误处理。

**44\. Spring对DAO的支持**

Spring对数据访问对象（DAO）的支持旨在简化它和数据访问技术如JDBC，Hibernate or JDO 结合使用。这使我们可以方便切换持久层。编码时也不用担心会捕获每种技术特有的异常。

**45\. 使用Spring通过什么方式访问Hibernate？**

在Spring中有两种方式访问Hibernate：

* 控制反转  Hibernate Template和 Callback

* 继承 HibernateDAOSupport提供一个AOP 拦截器

**46\. Spring支持的ORM**

Spring支持以下ORM：

* Hibernate
* iBatis
* JPA (Java Persistence API)
* TopLink
* JDO (Java Data Objects)
* OJB

**47.如何通过HibernateDaoSupport将Spring和Hibernate结合起来？**

用Spring的 SessionFactory 调用 LocalSessionFactory。集成过程分三步：

* 配置the Hibernate SessionFactory
* 继承HibernateDaoSupport实现一个DAO
* 在AOP支持的事务中装配

**48\. Spring支持的事务管理类型**

Spring支持两种类型的事务管理：

* **编程式事务管理：**这意味你通过编程的方式管理事务，给你带来极大的灵活性，但是难维护。
* **声明式事务管理：**这意味着你可以将业务代码和事务管理分离，你只需用注解和XML配置来管理事务。

**49\. Spring框架的事务管理有哪些优点？**

* 它为不同的事务API  如 JTA，JDBC，Hibernate，JPA 和JDO，提供一个不变的编程模式。
* 它为编程式事务管理提供了一套简单的API而不是一些复杂的事务API如
* 它支持声明式事务管理。
* 它和Spring各种数据访问抽象层很好得集成。

**50\. 你更倾向用那种事务管理类型？**


大多数Spring框架的用户选择声明式事务管理，因为它对应用代码的影响最小，因此更符合一个无侵入的轻量级容器的思想。声明式事务管理要优于编程式事务管理，虽然比编程式事务管理（这种方式允许你通过代码控制事务）少了一点灵活性。

### Spring面向切面编程（AOP）

**51\.  解释AOP**

面向切面的编程，或AOP， 是一种编程技术，允许程序模块化横向切割关注点，或横切典型的责任划分，如日志和事务管理。

**52\. Aspect 切面**

AOP核心就是切面，它将多个类的通用行为封装成可重用的模块，该模块含有一组API提供横切功能。比如，一个日志模块可以被称作日志的AOP切面。根据需求的不同，一个应用程序可以有若干切面。在Spring AOP中，切面通过带有@Aspect注解的类实现。

**52\. 在Spring AOP 中，关注点和横切关注的区别是什么？**

关注点是应用中一个模块的行为，一个关注点可能会被定义成一个我们想实现的一个功能。

横切关注点是一个关注点，此关注点是整个应用都会使用的功能，并影响整个应用，比如日志，安全和数据传输，几乎应用的每个模块都需要的功能。因此这些都属于横切关注点。

**54\. 连接点**

连接点代表一个应用程序的某个位置，在这个位置我们可以插入一个AOP切面，它实际上是个应用程序执行Spring AOP的位置。

**55\. 通知**

通知是个在方法执行前或执行后要做的动作，实际上是程序执行时要通过SpringAOP框架触发的代码段。

Spring切面可以应用五种类型的通知：

* **before：**前置通知，在一个方法执行前被调用
* **after：**在方法执行之后调用的通知，无论方法执行是否成功
* **after-returning：**仅当方法成功完成后执行的通知
* **after-throwing：**在方法抛出异常退出时执行的通知
* **around：**在方法执行之前和之后调用的通知

**56\. 切点**

切入点是一个或一组连接点，通知将在这些位置执行。可以通过表达式或匹配的方式指明切入点。

**57\. 什么是引入？**

引入允许我们在已存在的类中增加新的方法和属性。

**58\. 什么是目标对象？**

被一个或者多个切面所通知的对象。它通常是一个代理对象。也指被通知（advised）对象。

**59\. 什么是代理？**

代理是通知目标对象后创建的对象。从客户端的角度看，代理对象和目标对象是一样的。

**60\. 有几种不同类型的自动代理？**

BeanNameAutoProxyCreator

DefaultAdvisorAutoProxyCreator

Metadata autoproxying

**61\. 什么是织入。什么是织入应用的不同点？**

织入是将切面和到其他应用类型或对象连接或创建一个被通知对象的过程。

织入可以在编译时，加载时，或运行时完成。

**62\. 解释基于XML Schema方式的切面实现**

在这种情况下，切面由常规类以及基于XML的配置实现。

**63\. 解释基于注解的切面实现**

在这种情况下(基于@AspectJ的实现)，涉及到的切面声明的风格与带有java5标注的普通java类一致。

## 为什么 IDEA 推荐使用构造注入而不是 set 注入
