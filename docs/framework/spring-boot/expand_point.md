# [SpringBoot各类扩展点详解](https://www.cnblogs.com/hafiz/p/9155017.html)


### 一、前言

　　上篇文章我们深入分析了SpringBoot的一站式启动流程。然后我们知道SpringBoot的主要功能都是依靠它内部很多的扩展点来完成的，那毋容置疑，这些扩展点是我们应该深入了解的，那么本次且听我一一道来SpringBoot的各类扩展点。

### 二、SpringBoot各类扩展点详解

　　下面我们就一一为大家来解析这些必须的扩展点:

#### 1.SpringApplicationRunListener

​ 　　从命名我们就可以知道它是一个监听者，那纵观整个启动流程我们会发现，它其实是用来在整个启动流程中接收不同执行点事件通知的监听者。源码如下：

```java
public interface SpringApplicationRunListener {
    void starting();
    void environmentPrepared(ConfigurableEnvironment environment);
    void contextPrepared(ConfigurableApplicationContext context);
    void contextLoaded(ConfigurableApplicationContext context);
    void finished(ConfigurableApplicationContext context, Throwable exception);
}
```

​ 　　对于开发者来说，基本没有什么常见的场景要求我们必须实现一个自定义的SpringApplicationRunListener，即使是SpringBoot中也只默认实现了一个`org.springframework.boot.context.eventEventPublishingRunListener`, 用来在SpringBoot的整个启动流程中的不同时间点发布不同类型的应用事件(SpringApplicationEvent)。那些对这些应用事件感兴趣的ApplicationListener可以接受并处理(这也解释了为什么在SpringApplication实例化的时候加载了一批ApplicationListener，但在run方法执行的过程中并没有被使用)。

​　　如果我们真的在实际场景中自定义实现SpringApplicationRunListener,有一个点需要注意：**任何一个SpringApplicationRunListener实现类的构造方法都需要有两个构造参数，一个参数的类型就是我们的org.springframework.boot.SpringApplication,另外一个参数就是args参数列表的String[]**:

```java
package com.hafiz.springbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringApplicationRunListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

/**
 * @author hafiz.zhang
 * @description:
 * @date Created in 2018/6/7 20:07.
 */
public class DemoSpringApplicationRunListener implements SpringApplicationRunListener {
    private final SpringApplication application;
    private final String[] args;
    public DemoSpringApplicationRunListener(SpringApplication sa, String[] args) {
        this.application = sa;
        this.args = args;
    }

    @Override
    public void starting() {
        System.out.println("自定义starting");
    }

    @Override
    public void environmentPrepared(ConfigurableEnvironment environment) {
        System.out.println("自定义environmentPrepared");
    }

    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        System.out.println("自定义contextPrepared");
    }

    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        System.out.println("自定义contextLoaded");
    }

    @Override
    public void finished(ConfigurableApplicationContext context, Throwable exception) {
        System.out.println("自定义finished");
    }
}

```

​ 　　接着，我们还要满足SpringFactoriesLoader的约定，在当前SpringBoot项目的classpath下新建META-INF目录，并在该目录下新建spring.fatories文件，文件内容如下:

```
org.springframework.boot.SpringApplicationRunListener=\
    com.hafiz.springbootdemo.DemoSpringApplicationRunListener
```

#### 2.ApplicationListener

​　　ApplicationListener不是新东西，它属于Spring框架对Java中实现的监听者模式的一种框架实现，这里需要注意的是：对于刚接触SpringBoot，但是对于Spring框架本身又没有过多地接触的开发人员来说，可能会将这个名字与SpringApplicationRunListener弄混。

​如果我们有需要为SpringBoot应用添加我们自定义的ApplicationListener,那么有两种方式：

1. 通过SpringApplication.addListeners(…)或者SpringApplication.setListener(…)方法添加一个或者多个自定义的ApplicationListener。

2. 借助SpringFactoriesLoader机制，在SpringBoot的项目自定义的META-INF/spring.factories文件中添加配置(以下是SpringBoot默认的ApplicationListener配置)：

    ```
org.springframework.context.ApplicationListener=\
org.springframework.boot.ClearCachesApplicationListener,\
org.springframework.boot.builder.ParentContextCloserApplicationListener,\
org.springframework.boot.context.FileEncodingApplicationListener,\
org.springframework.boot.context.config.AnsiOutputApplicationListener,\
org.springframework.boot.context.config.ConfigFileApplicationListener,\
org.springframework.boot.context.config.DelegatingApplicationListener,\
org.springframework.boot.liquibase.LiquibaseServiceLocatorApplicationListener,\
org.springframework.boot.logging.ClasspathLoggingApplicationListener,\
org.springframework.boot.logging.LoggingApplicationListener
    ```

#### 3.ApplicationContextInitializer

​ 　　这货也是Spring框架原有的东西，这个类的主要作用就是在ConfigurableApplicationContext类型(或者子类型)的ApplicationContext做refresh之前，允许我们对ConfiurableApplicationContext的实例做进一步的设置和处理。

​ 　　我们要实现一个自定义的App StoreplicationContextInitializer也很简单，它只有一个方法需要我们的自定义类实现：

```
package com.hafiz.springbootdemo;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * @author hafiz.zhang
 * @description:
 * @date Created in 2018/6/7 20:33.
 */
public class DemoApplicationContextInitializer implements ApplicationContextInitializer {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        System.out.println("自定义Darraydsj@163.comoApp StoreplicationContextInitializer的initialize方法");
    }
}
```

然后也需要在项目自定义的META-INF/spring.factories文件中注册：

```
org.springframework.context.ApplicationContextInitializer=\
  com.hafiz.springbootdemo.DemoApplicationContextInitializer

```

　　不过我们一般情况下是不需要自定义一个App StoreplicationContextInitializer,即使SpringBoot框架默认也只有以下四个实现而已：

```
org.springframework.context.ApplicationContextInitializer=\
org.springframework.boot.context.ConfigurationWarningsApplicationContextInitializer,\
org.springframework.boot.context.ContextIdApplicationContextInitializer,\
org.springframework.boot.context.config.DelegatingApplicationContextInitializer,\
org.springframework.boot.context.embedded.ServerPortInfoApplicationContextInitializer
```

#### 4.CommandLineRunner

​ 　　CommandLineRunner并不是Spring框架原有的概念，它属于SpringBoot应用特定的回调扩展接口：

```
public interface CommandLineRunner {
    /**
     * Callback used to run the bean.
     * @param args incoming main method arguments
     * @throws Exception on error
     */
    void run(String... args) throws Exception;

}
```

关于这货，我们需要关注的点有两个：

1. 所有CommandLineRunner的执行时间点是在SpringBoot应用的Application完全初始化工作之后(这里我们可以认为是SpringBoot应用启动类main方法执行完成之前的最后一步)。
2. 当前SpringBoot应用的ApplicationContext中的所有CommandLinerRunner都会被加载执行(无论是手动注册还是被自动扫描注册到IoC容器中)。

　　跟其他几个扩展点接口类型相似，我们建议CommandLineRunner的实现类使用@org.springframework.core.annotation.Order进行标注或者实现`org.springframework.core.Ordered`接口，便于对他们的执行顺序进行排序调整，这是非常有必要的，因为我们不希望不合适的CommandLineRunner实现类阻塞了后面其他CommandLineRunner的执行。**这个接口非常有用和重要，我们需要重点关注。**

### 三、你不知道的自动配置奥秘

​ 　　上篇文章我们知道了，`@EnableAutoConfiguration`借助SpringFactoriesLoader可以将标注了`@Configuration`这个注解的JavaConfig类一并汇总并加载到最终的ApplicationContext，这么说只是很简单的解释，其实基于`@EnableAutoConfiguration`的自动配置功能拥有非常强大的调控能力。比如我们可以通过配合基于条件的配置能力或定制化加载顺序，对自动化配置进行更加细粒度的调整和控制。

#### 1.基于条件的自动配置

​　　这个基于条件的自动配置来源于Spring框架中的"基于条件的配置"特性。在Spring框架中，我们可以使用`@Conditional`这个注解配合`@Configuration`或`@Bean`等注解来干预一个配置或bean定义是否能够生效，它最终实现的效果或者语义类如下伪代码：

```
if (复合@Conditional规定的条件) {
    加载当前配置（Enable Current Configuration）或者注册当前bean定义;
}
```

　　要实现基于条件的配置，我们需要通过`@Conditional`注解指定自己Condition实现类就可以了(可以应用于类型Type的注解或者方法Method的注解)

```
@Conditional({DemoCondition1.class, DemoCondition2.class})
```

　　最重要的是，`@Conditional`注解可以作为一个Meta Annotaion用来标注其他注解实现类，从而构建各种复合注解，比如SpringBoot的autoconfigre模块就基于这一优良的革命传统，实现了一批这样的注解(在org.springframework.boot.autoconfigure.condition包下):

* @ConditionOnClass
* @ConditionOnBean
* @CondtionOnMissingClass
* @CondtionOnMissingBean
* @CondtionOnProperty
* ……

​　　有了这些复合Annotation的配合，我们就可以结合@EnableAutoConfiguration实现基于条件的自动配置了。其实说白了，SpringBoot能够如此的盛行，很重要的一部分就是它默认提供了一系列自动配置的依赖模块，而这些依赖模块都是基于以上的@Conditional复合注解实现的，这也就说明这些所有的依赖模块都是按需加载的，只有复合某些特定的条件，这些依赖模块才会生效，这也解释了为什么自动配置是“智能”的。

#### 2.定制化自动配置的顺序

​　　在实现自动配置的过程中，我们除了可以提供基于条件的配置之外，我们还能对当前要提供的配置或组件的加载顺序进行个性化调整，以便让这些配置或者组件之间的依赖分析和组装能够顺利完成。

​　　最经典的是我们可以通过使用`@org.springframework.boot.autoconfigure.AutoConfigureBefore`或者`@org.springframework.boot.autoconfigure.AutoConfigureAfter`让当前配置或者组件在某个其他组件之前或者之后进行配置。例如，假如我们希望某些JMX操作相关的bean定义在MBeanServer配置完成以后在进行配置，那我们就可以提供如下配置：

```
@Configuration@AutoConfigureAfter(JmxAutoConfiguration.class)public class AfterMBeanServerReadyConfiguration {    @Autowired    MBeanServer mBeanServer;    // 通过@Bean添加其他必要的bean定义}
```

### 四、总结

​　　截至目前，我们已经完成了对SpringBoot的核心组件一一解析，总结来说，SpringBoot中大部分东西都是Spring框架中已经存在原有概念和实践方式，SpringBoot只是在这基础上对特定的场景进行定制、固化以及升级。然后正式这些固化升级让我们感受到了SpringBoot开发的便捷以及高效。

​　　然后，你会突然发现，SpringBoot原来是这么的简单，其中并无任何秘密。但是Spring团队通过对Spring应用的固化和升级，让SpringBoot可以完成开发只关注业务逻辑开发的神奇事件，整个开发过程更加高效以及简单，但是对于SpringBoot的设计者来说，他们并没有耗费巨大的精力。另一方面来说，开箱即用才是未来发展的趋势，"约定大于配置(Convention Over Configuration)"也必将统领江山！





