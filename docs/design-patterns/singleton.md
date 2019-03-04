# 单例模式 

## 什么是单例模式 

许多时候整个系统只需要拥有一个的全局对象，这样有利于我们协调系统整体的行为。
比如在某个服务器程序中，该服务器的配置信息存放在一个文件中，这些配置数据由一个单例对象统一读取，然后服务进程中的其他对象再通过这个单例对象获取这些配置信息。
这种方式简化了在复杂环境下的配置管理.

系统内存中该类只存在一个对象，节省了系统资源，对于一些需要频繁创建销毁的对象，使用单例模式可以提高系统性能。

**基本的实现思路**

单例模式要求类能够有返回对象一个引用(永远是同一个)和一个获得该实例的方法（必须是静态方法，通常使用getInstance这个名称）。

单例的实现主要是通过以下两个步骤：

1. 将该类的构造方法定义为私有方法
    这样其他处的代码就无法通过调用该类的构造方法来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例；
2. 在该类内提供一个静态方法，当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用。

**值得注意的是**:

单例模式在多线程的应用场合下必须小心使用。
如果当唯一实例尚未创建时，有两个线程同时调用创建方法，那么它们同时没有检测到唯一实例的存在，从而同时各自创建了一个实例，这样就有两个实例被构造出来，从而违反了单例模式中实例唯一的原则。 
解决这个问题的办法是为指示类是否已经实例化的变量提供一个互斥锁(虽然这样会降低效率)。

## 单例模式的几种实现方式

### 1. 饿汉模式-静态常量

```java
public class Singleton {

    private final static Singleton INSTANCE = new Singleton();

    private Singleton(){}

    public static Singleton getInstance(){
        return INSTANCE;
    }
}
```

**优点**:
这种写法比较简单，就是在类装载的时候就完成实例化。避免了线程同步问题。

**缺点**:
在类装载的时候就完成实例化，没有达到Lazy Loading的效果。如果从始至终从未使用过这个实例，则会造成内存的浪费。

### 2. 饿汉模式-静态代码块

```java
public class Singleton {

    private static Singleton instance;

    static {
        instance = new Singleton();
    }

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

这种方式和上面的方式其实类似，只不过将类实例化的过程放在了静态代码块中，也是在类装载的时候，就执行静态代码块中的代码，初始化类的实例。优缺点和上面是一样的。

### 3. 懒汉式-线程不安全

```java
public class Singleton {

    private static Singleton singleton;

    private Singleton() {}

    public static Singleton getInstance() {
        if (singleton == null) {
            singleton = new Singleton();
        }
        return singleton;
    }
}
```

这种写法起到了Lazy Loading的效果，但是只能在单线程下使用。
如果在多线程下，一个线程进入了if (singleton == null)判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。
所以在多线程环境下不可使用这种方式

### 4. 懒汉模式-线程安全(同步方法)

```java
public class Singleton {

    private static Singleton singleton;

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (singleton == null) {
            singleton = new Singleton();
        }
        return singleton;
    }
}
```

解决上面第三种实现方式的线程不安全问题，做个线程同步就可以了，于是就对getInstance()方法进行了线程同步。

**缺点**:
效率太低了，每个线程在想获得类的实例时候，执行getInstance()方法都要进行同步。
而其实这个方法只执行一次实例化代码就够了，后面的想获得该类实例，直接return就行了。
方法进行同步效率太低要改进。

### 5. 懒汉模式-线程安全(同步代码块)

```java
public class Singleton {

    private static Singleton singleton;

    private Singleton() {}

    public static Singleton getInstance() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                singleton = new Singleton();
            }
        }
        return singleton;
    }
}
```

由于第四种实现方式同步效率太低，所以摒弃同步方法，改为同步产生实例化的的代码块。
但是这种同步并不能起到线程同步的作用。
跟第3种实现方式遇到的情形一致

假如一个线程进入了if (singleton == null)判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。

### 6. DCL

[DCL 失效问题](../java/jvm/dcl.md)

```java
public class Singleton {

    private static volatile Singleton singleton;

    private Singleton() {}

    public static Singleton getInstance() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

Double-Check概念对于多线程开发者来说不会陌生，如代码中所示，我们进行了两次if (singleton == null)检查，这样就可以保证线程安全了。
这样，实例化代码只用执行一次，后面再次访问时，判断if (singleton == null)，直接return实例化对象。

**优点**:

线程安全；延迟加载；效率较高

### 7. 静态内部类

```java
public class Singleton {

    private Singleton() {}

    private static class SingletonInstance {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonInstance.INSTANCE;
    }
}
```

这种方式跟饿汉式方式采用的机制类似，但又有不同。

两者都是采用了类装载的机制来保证初始化实例时只有一个线程。
不同的地方在饿汉式方式是只要Singleton类被装载就会实例化，没有Lazy-Loading的作用，而静态内部类方式在Singleton类被装载时并不会立即实例化，而是在需要实例化时，调用getInstance方法，才会装载SingletonInstance类，从而完成Singleton的实例化。

类的静态属性只会在第一次加载类的时候初始化，所以在这里，JVM帮助我们保证了线程的安全性，在类进行初始化时，别的线程是无法进入的。

**优点**:

避免了线程不安全，延迟加载，效率高。

### 8. 枚举

```java
public enum Singleton {
    INSTANCE;
    public void whateverMethod() {

    }
}
```

借助JDK1.5中添加的枚举来实现单例模式。不仅能避免多线程同步问题，而且还能防止反序列化重新创建新的对象。
可能是因为枚举在JDK1.5中才添加，所以在实际项目开发中，很少见人这么写过。

[为什么强烈建议大家使用枚举来实现单例](https://mp.weixin.qq.com/s?__biz=MzI3NzE0NjcwMg==&mid=2650121482&idx=1&sn=e5b86797244d8879bbe9a69fb72641b5&chksm=f36bb82bc41c313d739f485383d3a868a79020c995ee86daef026a589f4782916c42a8d3f6c7&mpshare=1&scene=1&srcid=0614J9OX5zkoAnHiPYX2sHiH#rd)

## 适用场合

1. 需要频繁的进行创建和销毁的对象；
2. 创建对象时耗时过多或耗费资源过多，但又经常用到的对象；
3. 工具类对象；
4. 频繁访问数据库或文件的对象。

## 单例模式的攻与守

https://blog.csdn.net/AnIllusion/article/details/81388273

https://blog.csdn.net/u013256816/article/details/50525335


1. 懒汉模式
2. 饿汉模式
3. 同步锁
4. 双锁机制
5. 枚举实现
6. 静态内部类实现

因为加载外部类时,是不会加载内部类的

```java
//一个延迟实例化的内部类的单例模式
public final class Singleton {
    //一个内部类的容器, 调用getInstance时, JVM加载这个类
    private static final class SingletonHolder {
        static final Singleton singleton =  new Singleton();
    }
    private Singleton() {}
    public static Singleton getInstance() {
        return SingletonHolder.singleton;
    }
 }
```

**防止反射实例化对象**

利用反射生成对象

```java
// 使用反射破坏单例模式
Class c = Class.forName(Singleton.class.getName());  
Constructor constructor = c.getDeclaredConstructor();  
constructor.setAccessible(true);  
Singleton singleton = (Singleton)ct.newInstance(); 
```

调用私有构造方法抛出异常

**防止反序列化实例化对象**

```java
import java.io.Serializable;
/**
 * Created by hollis on 16/2/5.
 * 使用双重校验锁方式实现单例
 */
public class Singleton implements Serializable{
    private volatile static Singleton singleton;
    private Singleton (){}
    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

```java
public class SerializableDemo1 {
    //为了便于理解, 忽略关闭流操作及删除文件操作.真正编码时千万不要忘记
    //Exception直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("tempFile"));
        oos.writeObject(Singleton.getSingleton());
        //Read Obj from file
        File file = new File("tempFile");
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        Singleton newInstance = (Singleton) ois.readObject();
        //判断是否是同一个对象
        System.out.println(newInstance == Singleton.getSingleton());
    }
}
```

防止序列化反序列化破坏单例的方法:
添加 readResolve 方法

```java
private Object readResolve() {
        return singleton;
    }
```

利用枚举创建单例

```java
/**
* Singleton pattern example using Java Enumj
*/
public enum EasySingleton{
    INSTANCE
}
```

**使用反射破解枚举单例:**
运行结果是抛出异常: `Exception in thread "main" java.lang.NoSuchMethodException: cn.xing.test.Weekday.<init>()`
明明Weekday有一个无参的构造函数, 为何不能通过暴力反射访问?
最新的Java Language Specification (§8.9)规定:  Reflective instantiation of enum types is prohibited. 这是java语言的内置规范.

**使用 clone 破解枚举单例**
所有的枚举类都继承自java.lang.Enum类, 而不是Object类. 在java.lang.Enum类中clone方法如下:

```java
protected final Object clone() throws CloneNotSupportedException {  
    throw new CloneNotSupportedException();  
}  
```
调用该方法将抛出异常, 且final意味着子类不能重写clone方法, 所以通过clone方法获取新的对象是不可取的.

**使用序列化破解枚举单例**
java.lang.Enum类的readObject方法如下:

```java
private void readObject(ObjectInputStream in) throws IOException,  
        ClassNotFoundException {  
            throw new InvalidObjectException("can't deserialize enum");  
}  
private void readObjectNoData() throws ObjectStreamException {  
        throw new InvalidObjectException("can't deserialize enum");  
} 
```

同暴力反射一样, Java Language Specification (§8.9)有着这样的规定: 

the special treatment by the serialization mechanism ensures that duplicate instances are never created as a result of deserialization.

### 使用 Unsafe 破坏单例

```java
@Slf4j
public class DestroySingleton {

    public static void main(String[] args) throws InvocationTargetException,
                                                  NoSuchMethodException,
                                                  InstantiationException,
                                                  IllegalAccessException,
                                                  NoSuchFieldException {
        destroyByUnsafeApi();
    }

    private static void destroyByUnsafeApi() throws NoSuchFieldException, IllegalAccessException, InstantiationException {
        Field theUnsafeField = Unsafe.class.getDeclaredField("theUnsafe");
        theUnsafeField.setAccessible(true);
        Unsafe unsafeInstance = (Unsafe) theUnsafeField.get(null);

        Singleton instanceA = (Singleton) unsafeInstance.allocateInstance(Singleton.class);
        Singleton instanceB = (Singleton) unsafeInstance.allocateInstance(Singleton.class);

        log.info("destroyByUnsafeApi: {}", instanceA == instanceB ? "相等" : "不相等");
    }
}


/**
 * DCL方式获取单例
 */
class Singleton {
    private volatile static Singleton singleton;

    private Singleton() {
    }

    static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                    return singleton;
                }
            }
        }
        return singleton;
    }
}
```