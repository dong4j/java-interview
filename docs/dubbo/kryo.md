# 浅析 kryo

kryo 是一个高性能的序列化 / 反序列化工具，由于其变长存储特性并使用了字节码生成机制，拥有较高的运行速度和较小的体积。

### 依赖

引入 maven 依赖

```
<dependency>
    <groupId>com.esotericsoftware</groupId>
    <artifactId>kryo</artifactId>
    <version>4.0.2</version>
</dependency>
```

需要注意的是，由于 kryo 使用了较高版本的 asm，可能会与业务现有依赖的 asm 产生冲突，这是一个比较常见的问题。只需将依赖改成：

```
<dependency>
    <groupId>com.esotericsoftware</groupId>
    <artifactId>kryo-shaded</artifactId>
    <version>4.0.2</version>
</dependency>
```

### 记录类型信息

这算是 kryo 的一个特点，可以把对象信息直接写到序列化数据里，反序列化的时候可以精确地找到原始类信息，不会出错，这意味着在写 readxxx 方法时，无需传入 Class 或 Type 类信息。

相应的，kryo 提供两种读写方式。记录类型信息的 writeClassAndObject/readClassAndObject 方法，以及传统的 writeObject/readObject 方法。

### 线程安全

kryo 的对象本身不是线程安全的，所以我们有两种选择来保障线程安全。

使用 Threadlocal 来保障线程安全:

```
private static final ThreadLocal<Kryo> kryoLocal = new ThreadLocal<Kryo>() {
    protected Kryo initialValue() {
        Kryo kryo = new Kryo();
        kryo.setInstantiatorStrategy(new Kryo.DefaultInstantiatorStrategy(
                    new StdInstantiatorStrategy()));
        return kryo;
    };
};
```

或者使用 kryo 提供的 pool:

```
public KryoPool newKryoPool() {
        return new KryoPool.Builder(() -> {
            final Kryo kryo = new Kryo();
            kryo.setInstantiatorStrategy(new Kryo.DefaultInstantiatorStrategy(
                    new StdInstantiatorStrategy()));
            return kryo;
        }).softReferences().build();
    }
```

### 实例化器

在上面注意到 `kryo.setInstantiatorStrategy(new Kryo.DefaultInstantiatorStrategy(new StdInstantiatorStrategy()));` 这句话显示指定了实例化器。

在一些依赖了 kryo 的开源软件中，可能由于实例化器指定的问题而抛出空指针异常。例如 hive 的某些版本中，默认指定了 StdInstantiatorStrategy。

```
public static ThreadLocal<Kryo> runtimeSerializationKryo = new ThreadLocal<Kryo>() {
    @Override
    protected synchronized Kryo initialValue() {
      Kryo kryo = new Kryo();
      kryo.setClassLoader(Thread.currentThread().getContextClassLoader());
      kryo.register(java.sql.Date.class, new SqlDateSerializer());
      kryo.register(java.sql.Timestamp.class, new TimestampSerializer());
      kryo.register(Path.class, new PathSerializer());
      kryo.setInstantiatorStrategy(new StdInstantiatorStrategy());
      ......
      return kryo;
    };
  };
```

而 StdInstantiatorStrategy 在是依据 JVM version 信息及 JVM vendor 信息创建对象的，可以不调用对象的任何构造方法创建对象。

那么例如碰到 ArrayList 这样的对象时候，就会出问题。观察一下 ArrayList 的源码：

```
public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
```

既然没有调用构造器，那么这里 elementData 会是 NULL，那么在调用类似 ensureCapacity 方法时，就会抛出一个异常。

```
 public void ensureCapacity(int minCapacity) {
        if (minCapacity > elementData.length
            && !(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
                 && minCapacity <= DEFAULT_CAPACITY)) {
            modCount++;
            grow(minCapacity);
        }
    }
```

解决方案很简单，就如框架中代码写的一样，显示指定实例化器，首先使用默认无参构造策略 DefaultInstantiatorStrategy，若创建对象失败再采用 StdInstantiatorStrategy。

### 类注册

当 kryo 写一个对象的实例的时候，默认需要将类的完全限定名称写入。将类名一同写入序列化数据中是比较低效的，所以 kryo 支持通过类注册进行优化。

```
kryo.register(SomeClassA.class);
kryo.register(SomeClassB.class);
kryo.register(SomeClassC.class);
```

注册会给每一个 class 一个 int 类型的 Id 相关联，这显然比类名称高效，但同时要求反序列化的时候的 Id 必须与序列化过程中一致。这意味着注册的顺序非常重要。

但是由于现实原因，同样的代码，同样的 Class 在不同的机器上注册编号任然不能保证一致，所以多机器部署时候反序列化可能会出现问题。

所以 kryo 默认会禁止类注册，当然如果想要打开这个属性，可以通过 `kryo.setRegistrationRequired(true);` 打开。

### 循环引用

这是对循环引用的支持，可以有效防止栈内存溢出，kryo 默认会打开这个属性。当你确定不会有循环引用发生的时候，可以通过 `kryo.setReferences(false);` 关闭循环引用检测，从而提高一些性能。

### 可变长存储

kryo 对 int 和 long 类型都采用了可变长存储的机制，以 int 为例，一般需要 4 个字节去存储，而对 kryo 来说，可以通过 1-5 个变长字节去存储，从而避免高位都是 0 的浪费。

最多需要 5 个字节存储是因为，在变长存储 int 过程中，一个字节的 8 位用来存储有效数字的只有 7 位，最高位用于标记是否还需读取下一个字节，1 表示需要，0 表示不需要。

在对 string 的存储中也有变长存储的应用，string 序列化的整体结构为 length + 内容，那么 length 也会使用变长 int 写入字符的长度。

### 如果使用缓存

在实际开发中，class 增删字段是很常见的事情，但对于 kryo 来说，确是不支持的，而如果恰好需要使用缓存，那么这个问题会被放得更大。

例如一个对象使用 kryo 序列化后，数据放入了缓存中，而这时候如果这个对象增删了一个属性，那么缓存中反序列化的时候就会报错。所以频繁使用缓存的场景，可以尽量避免 kryo。

不过现在的 Kryo 提供了兼容性的支持，使用 CompatibleFieldSerializer.class，在 kryo.writeClassAndObject 时候写入的信息如下:

```
class name|field length|field1 name|field2 name|field1 value| filed2 value
```

而在读入 kryo.readClassAndObject 时，会先读入 field names，然后匹配当前反序列化类的 field 和顺序再构造结果。

当然如果在做好缓存隔离的情况下，这一切都不用在意。