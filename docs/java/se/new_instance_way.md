# Java 中创建对象的几种方式

[👈 **相关面试题**](./README.md#创建一个对象用什么运算符-对象实体与对象引用有何不同)

| 方式 | 作用|
|:---|:---|
| 使用 new 关键字 | 调用了构造函数 |
| 使用 Class 类的 newInstance 方法 | 调用了构造函数 |
| 使用 Constructor 类的 newInstance 方法 | 调用了构造函数 |
| 使用 clone 方法 | 没有调用构造函数 |
| 使用反序列化 | 没有调用构造函数 |
| Objenesis | 调用了构造函数 |

## 1. 使用 new 关键字

这是最常见也是最简单的创建对象的方式了. 通过这种方式, 我们可以调用任意的构造函数(无参的和带参数的).

## 2. 使用 Class 类的 newInstance 方法

我们也可以使用 Class 类的 newInstance 方法创建对象. 这个 newInstance 方法调用**无参构造函数**创建对象.

我们可以通过下面方式调用 newInstance 方法创建对象:

```java
Employee emp2 = (Employee) Class.forName("org.xxx.Employee").newInstance();

or

Employee emp2 = Employee.class.newInstance();
```

## 3. 使用 Constructor 类的 newInstance 方法

和 Class 类的 newInstance 方法很像, `java.lang.reflect.Constructor` 类里也有一个 newInstance 方法可以创建对象.
我们可以通过这个 newInstance 方法调用**有参数的和私有的构造函数**.

```java
Constructor<Employee> constructor = Employee.class.getConstructor();
Employee emp3 = constructor.newInstance();
```

这两种 newInstance 方法就是大家所说的反射. 事实上 Class 的 newInstance 方法内部调用 Constructor 的newInstance 方法

### 4. Class.newInstance() 和 Constructor.newInstance() 之间的区别

1. Class.newInstance() 只能调用 no-arg 构造函数, Constructor.newInstance() 可以调用任何构造函数, 而不管参数的数量如何.
2. Class.newInstance() 要求构造函数应该是可见的, Constructor.newInstance() 也可以在某些情况下调用私有构造函数.
3. Class.newInstance() 抛出构造函数抛出的任何异常(已检查或未检查) , Constructor.newInstance() 始终使用 InvocationTargetException 包装抛出的异常

如上原因

Constructor.newInstance() 优于 Class.newInstance(), 因此 Spring, Guava, Zookeeper, Jackson, Servlet 都会使用 Constructor.newInstance()

## 5. 使用 clone 方法

无论何时我们调用一个对象的 clone 方法, JVM 就会创建一个新的对象, 将前面对象的内容全部拷贝进去.
用 clone 方法创建对象**并不会调用任何构造函数.**
要使用 clone 方法, 我们需要先实现 `Cloneable` 接口并实现其定义的 clone 方法.

```java
Employee emp4 = (Employee) emp3.clone();
```

## 6. 使用反序列化

当我们序列化和反序列化一个对象, JVM 会给我们创建一个单独的对象.
在反序列化时, JVM 创建对象并**不会调用任何构造函数**.
为了反序列化一个对象, 我们需要让我们的类实现 `Serializable` 接口

```java
ObjectInputStream in = new ObjectInputStream(new FileInputStream("data.obj"));
Employee emp5 = (Employee) in.readObject();
```

## 7. [Objenesis](https://blog.csdn.net/ghaohao/article/details/80472500)

Objenesis 是专门用于实例化一些特殊 Java 对象的一个工具, 如私有构造方法, 带参数的构造等不能通过 `class.newInstance()` 实例化的, 通过它可以轻松完成.

[👈 **相关面试题**](./README.md#创建一个对象用什么运算符-对象实体与对象引用有何不同)

