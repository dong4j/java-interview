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

