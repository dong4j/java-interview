# JDK 各版本新特性

## JDK5 新特性

::: tip 
Java5开发代号为Tiger(老虎),于2004-09-30发行
:::

### 1. 泛型
所谓类型擦除指的就是Java源码中的范型信息只允许停留在编译前期，而编译后的字节码文件中将不再保留任何的范型信息。也就是说，范型信息在编译时将会被全部删除，其中范型类型的类型参数则会被替换为Object类型，并在实际使用时强制转换为指定的目标数据类型。而C++中的模板则会在编译时将模板类型中的类型参数根据所传递的指定数据类型生成相对应的目标代码。

```java
Map<Integer, Integer> squares = new HashMap<Integer, Integer>();
```

- 通配符类型：避免unchecked警告，问号表示任何类型都可以接受

```java
public void printList(List<?> list, PrintStream out) throws IOException {
    for (Iterator<?> i = list.iterator(); i.hasNext(); ) {
      out.println(i.next().toString());
    }
  }
```

- 限制类型

```java
public static <A extends Number> double sum(Box<A> box1,Box<A> box2){
    double total = 0;
    for (Iterator<A> i = box1.contents.iterator(); i.hasNext(); ) {
      total = total + i.next().doubleValue();
    }
    for (Iterator<A> i = box2.contents.iterator(); i.hasNext(); ) {
      total = total + i.next().doubleValue();
    }
    return total;
  }
```

### 2. 枚举  

- EnumMap

```java
public void testEnumMap(PrintStream out) throws IOException {
    // Create a map with the key and a String message
    EnumMap<AntStatus, String> antMessages =
      new EnumMap<AntStatus, String>(AntStatus.class);
    // Initialize the map
    antMessages.put(AntStatus.INITIALIZING, "Initializing Ant...");
    antMessages.put(AntStatus.COMPILING,    "Compiling Java classes...");
    antMessages.put(AntStatus.COPYING,      "Copying files...");
    antMessages.put(AntStatus.JARRING,      "JARring up files...");
    antMessages.put(AntStatus.ZIPPING,      "ZIPping up files...");
    antMessages.put(AntStatus.DONE,         "Build complete.");
    antMessages.put(AntStatus.ERROR,        "Error occurred.");
    // Iterate and print messages
    for (AntStatus status : AntStatus.values() ) {
      out.println("For status " + status + ", message is: " +
                  antMessages.get(status));
    }
  }

```

- switch枚举

```java
public String getDescription() {
    switch(this) {
      case ROSEWOOD:      return "Rosewood back and sides";
      case MAHOGANY:      return "Mahogany back and sides";
      case ZIRICOTE:      return "Ziricote back and sides";
      case SPRUCE:        return "Sitka Spruce top";
      case CEDAR:         return "Wester Red Cedar top";
      case AB_ROSETTE:    return "Abalone rosette";
      case AB_TOP_BORDER: return "Abalone top border";
      case IL_DIAMONDS:   
        return "Diamonds and squares fretboard inlay";
      case IL_DOTS:
        return "Small dots fretboard inlay";
      default: return "Unknown feature";
    }
  }

```

### 3. 自动拆箱/装箱

将primitive类型转换成对应的wrapper类型：Boolean、Byte、Short、Character、Integer、Long、Float、Double

### 4. 可变参数

```java
private String print(Object... values) {
    StringBuilder sb = new StringBuilder();
    for (Object o : values) {
      sb.append(o.toString())
        .append(" ");
    }
    return sb.toString();
  }

```

### 5. 注解

- Inherited表示该注解是否对类的子类继承的方法等起作用
- Target类型
- Rentation表示annotation是否保留在编译过的class文件中还是在运行时可读。

```java
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
public @interface InProgress { }

```

###  6. 增强for循环 for/in

for/in循环办不到的事情：
（1）遍历同时获取index
（2）集合逗号拼接时去掉最后一个
（3）遍历的同时删除元素


### 7. 静态导入

```java
import static java.lang.System.err;
import static java.lang.System.out;

err.println(msg); 

```

### 8. print输出格式化

```java
System.out.println("Line %d: %s%n", i++, line);

```

### 9. 并发支持（JUC）

- 线程池
- uncaught exception（可以抓住多线程内的异常）

```java
class SimpleThreadExceptionHandler implements
    Thread.UncaughtExceptionHandler {
  public void uncaughtException(Thread t, Throwable e) {
    System.err.printf("%s: %s at line %d of %s%n",
        t.getName(), 
        e.toString(),
        e.getStackTrace()[0].getLineNumber(),
        e.getStackTrace()[0].getFileName());
  }

```

- blocking queue(BlockingQueue)
- JUC类库

### 10. Arrays、Queue、线程安全StringBuilder

- Arrays 工具类

```java
Arrays.sort(myArray);
Arrays.toString(myArray)
Arrays.binarySearch(myArray, 98)
Arrays.deepToString(ticTacToe)
Arrays.deepEquals(ticTacToe, ticTacToe3)

```

- Queue(Queue接口与List、Set同一级别，都是继承了Collection接口。LinkedList实现了Deque接 口。)
    避开集合的add/remove操作，使用offer、poll操作（不抛异常）
    
```java
Queue q = new LinkedList(); //采用它来实现queue
```

- Override返回类型
- 单线程StringBuilder
- java.lang.instrument

JDK5是java史上最重要的升级之一，具有非常重要的意义，虽然语法糖非常多。但可以使得我们的代码更加健壮，更加优雅。


## JDK6 新特性

::: tip
Java6开发代号为Mustang(野马),于2006-12-11发行.
:::

### 1. Web Services
优先支持编写 XML web service 客户端程序。你可以用过简单的annotaion将你的API发布成.NET交互的web services. Mustang 添加了新的解析和 XML 在 Java object-mapping APIs中, 之前只在Java EE平台实现或者Java Web Services Pack中提供.

### 2. Scripting（开启JS的支持，算是比较有用的）
现在你可以在Java源代码中混入JavaScript了，这对开发原型很有有用，你也可以插入自己的脚本引擎。

### 3. Database
Mustang 将联合绑定 Java DB (Apache Derby). JDBC 4.0 增加了许多特性例如支持XML作为SQL数据类型，更好的集成Binary Large OBjects (BLOBs) 和 Character Large OBjects (CLOBs) .

### 4. More Desktop APIs
GUI 开发者可以有更多的技巧来使用 SwingWorker utility ，以帮助GUI应用中的多线程。, JTable 分类和过滤，以及添加splash闪屏。

很显然，这对于主攻服务器开发的Java来说，并没有太多吸引力

### 5. Monitoring and Management.
绑定了不是很知名的 memory-heap 分析工具Jhat 来查看内核导出。

### 6. Compiler Access（这个很厉害）
compiler API提供编程访问javac，可以实现进程内编译，动态产生Java代码。

### 7. Pluggable Annotation

### 8. Desktop Deployment.
Swing拥有更好的 look-and-feel , LCD 文本呈现, 整体GUI性能的提升。Java应用程序可以和本地平台更好的集成，例如访问平台的系统托盘和开始菜单。Mustang将Java插件技术和Java Web Start引擎统一了起来。

### 9. Security
XML-数字签名(XML-DSIG) APIs 用于创建和操纵数字签名); 新的方法来访问本地平台的安全服务

### 10. The -ilities（很好的习惯）
质量，兼容性，稳定性。 80,000 test cases 和数百万行测试代码(只是测试活动中的一个方面). Mustang 的快照发布已经被下载15个月了，每一步中的Bug都被修复了，表现比J2SE 5还要好。


## JDK7 新特性

::: tip
Java7开发代号是Dolphin(海豚),于2011-07-28发行.
:::

### 1. switch中添加对String类型的支持

```java
public String generate(String name, String gender) {  
       String title = "";  
       switch (gender) {  
           case "男":  
               title = name + " 先生";  
               break;  
           case "女":  
               title = name + " 女士";  
               break;  
           default:  
               title = name;  
       }  
       return title;  
}

```
编译器在编译时先做处理：
①case仅仅有一种情况。直接转成if。
②假设仅仅有一个case和default，则直接转换为if…else…。
③有多个case。先将String转换为hashCode，然后相应的进行处理，JavaCode在底层兼容Java7曾经版本号。

### 2. 数字字面量的改进

Java7前支持十进制（123）、八进制（0123）、十六进制（0X12AB）
Java7添加二进制表示（0B11110001、0b11110001）
数字中可加入分隔符
Java7中支持在数字量中间添加’_'作为分隔符。更直观，如（12_123_456）。下划线仅仅能在数字中间。编译时编译器自己主动删除数字中的下划线。

```java
int one_million = 1_000_000;
```

### 3. 异常处理（捕获多个异常） try-with-resources

#### catch子句能够同一时候捕获多个异常

```java
public void testSequence() {  
    try {  
        Integer.parseInt("Hello");  
    }  
    catch (NumberFormatException | RuntimeException e) {  //使用'|'切割，多个类型，一个对象e  
         
    }  
}  
```

#### [try-with-resources](./jdk7_try_with_resources.md)
Java7之前须要在finally中关闭socket、文件、数据库连接等资源；
Java7中在try语句中申请资源，实现资源的自己主动释放（资源类必须实现java.lang.AutoCloseable接口，一般的文件、数据库连接等均已实现该接口，close方法将被自己主动调用）

```java
public void read(String filename) throws IOException {  
     try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {  
         StringBuilder builder = new StringBuilder();  
String line = null;  
while((line=reader.readLine())!=null){  
    builder.append(line);  
    builder.append(String.format("%n"));  
}  
return builder.toString();  
     }   
 }  

```

### 4. 增强泛型推断

```java
// 之前
Map<String, List<String>> map = new HashMap<String, List<String>>();   
// 之后
Map<String, List<String>> anagrams = new HashMap<>();

```

### 5. NIO2.0（AIO）新IO的支持

- bytebuffer

```java
public class ByteBufferUsage {
    public void useByteBuffer() {
        ByteBuffer buffer = ByteBuffer.allocate(32);
        buffer.put((byte)1);
        buffer.put(new byte[3]);
        buffer.putChar('A');
        buffer.putFloat(0.0f);
        buffer.putLong(10, 100L);
        System.out.println(buffer.getChar(4));
        System.out.println(buffer.remaining());
    }
    public void byteOrder() {
        ByteBuffer buffer = ByteBuffer.allocate(4);
        buffer.putInt(1);
        buffer.order(ByteOrder.LITTLE_ENDIAN);
        buffer.getInt(0); //值为16777216
    }
    public void compact() {
        ByteBuffer buffer = ByteBuffer.allocate(32);
        buffer.put(new byte[16]);
        buffer.flip();
        buffer.getInt();
        buffer.compact();
        int pos = buffer.position();
    }
    public void viewBuffer() {
        ByteBuffer buffer = ByteBuffer.allocate(32);
        buffer.putInt(1);
        IntBuffer intBuffer = buffer.asIntBuffer();
        intBuffer.put(2);
        int value = buffer.getInt(); //值为2
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ByteBufferUsage bbu = new ByteBufferUsage();
        bbu.useByteBuffer();
        bbu.byteOrder();
        bbu.compact();
        bbu.viewBuffer();
    }
}

```

- filechannel

```java
public class FileChannelUsage {
    public void openAndWrite() throws IOException {
        FileChannel channel = FileChannel.open(Paths.get("my.txt"), StandardOpenOption.CREATE, StandardOpenOption.WRITE);
        ByteBuffer buffer = ByteBuffer.allocate(64);
        buffer.putChar('A').flip();
        channel.write(buffer);
    }
    public void readWriteAbsolute() throws IOException {
        FileChannel channel = FileChannel.open(Paths.get("absolute.txt"), StandardOpenOption.READ, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
        ByteBuffer writeBuffer = ByteBuffer.allocate(4).putChar('A').putChar('B');
        writeBuffer.flip();
        channel.write(writeBuffer, 1024);
        ByteBuffer readBuffer = ByteBuffer.allocate(2);
        channel.read(readBuffer, 1026);
        readBuffer.flip();
        char result = readBuffer.getChar(); //值为'B'
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        FileChannelUsage fcu = new FileChannelUsage();
        fcu.openAndWrite();
        fcu.readWriteAbsolute();
    }
}

```

### 6. JSR292与InvokeDynamic

JSR 292: Supporting Dynamically Typed Languages on the JavaTM Platform，支持在JVM上运行动态类型语言。在字节码层面支持了InvokeDynamic。

- 方法句柄 MethodHandle

```java
public class ThreadPoolManager {
    private final ScheduledExecutorService stpe = Executors
            .newScheduledThreadPool(2);
    private final BlockingQueue<WorkUnit<String>> lbq;
    public ThreadPoolManager(BlockingQueue<WorkUnit<String>> lbq_) {
        lbq = lbq_;
    }
    public ScheduledFuture<?> run(QueueReaderTask msgReader) {
        msgReader.setQueue(lbq);
        return stpe.scheduleAtFixedRate(msgReader, 10, 10, TimeUnit.MILLISECONDS);
    }
    private void cancel(final ScheduledFuture<?> hndl) {
        stpe.schedule(new Runnable() {
            public void run() {
                hndl.cancel(true);
            }
        }, 10, TimeUnit.MILLISECONDS);
    }
    /**
     * 使用传统的反射api
     */
    public Method makeReflective() {
        Method meth = null;
        try {
            Class<?>[] argTypes = new Class[]{ScheduledFuture.class};
            meth = ThreadPoolManager.class.getDeclaredMethod("cancel", argTypes);
            meth.setAccessible(true);
        } catch (IllegalArgumentException | NoSuchMethodException
                | SecurityException e) {
            e.printStackTrace();
        }
        return meth;
    }
    /**
     * 使用代理类
     * @return
     */
    public CancelProxy makeProxy() {
        return new CancelProxy();
    }
    /**
     * 使用Java7的新api，MethodHandle
     * invoke virtual 动态绑定后调用 obj.xxx
     * invoke special 静态绑定后调用 super.xxx
     * @return
     */
    public MethodHandle makeMh() {
        MethodHandle mh;
        MethodType desc = MethodType.methodType(void.class, ScheduledFuture.class);
        try {
            mh = MethodHandles.lookup().findVirtual(ThreadPoolManager.class,
                    "cancel", desc);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            throw (AssertionError) new AssertionError().initCause(e);
        }
        return mh;
    }
    public static class CancelProxy {
        private CancelProxy() {
        }
        public void invoke(ThreadPoolManager mae_, ScheduledFuture<?> hndl_) {
            mae_.cancel(hndl_);
        }
    }
}

```

- 调用invoke

```java
public class ThreadPoolMain {
    /**
     * 如果被继承，还能在静态上下文寻找正确的class
     */
    private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
    private ThreadPoolManager manager;
    public static void main(String[] args) {
        ThreadPoolMain main = new ThreadPoolMain();
        main.run();
    }
    private void cancelUsingReflection(ScheduledFuture<?> hndl) {
        Method meth = manager.makeReflective();
        try {
            System.out.println("With Reflection");
            meth.invoke(hndl);
        } catch (IllegalAccessException | IllegalArgumentException
                | InvocationTargetException e) {
            e.printStackTrace();
        }
    }
    private void cancelUsingProxy(ScheduledFuture<?> hndl) {
        CancelProxy proxy = manager.makeProxy();
        System.out.println("With Proxy");
        proxy.invoke(manager, hndl);
    }
    private void cancelUsingMH(ScheduledFuture<?> hndl) {
        MethodHandle mh = manager.makeMh();
        try {
            System.out.println("With Method Handle");
            mh.invokeExact(manager, hndl);
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
    private void run() {
        BlockingQueue<WorkUnit<String>> lbq = new LinkedBlockingQueue<>();
        manager = new ThreadPoolManager(lbq);
        final QueueReaderTask msgReader = new QueueReaderTask(100) {
            @Override
            public void doAction(String msg_) {
                if (msg_ != null)
                    System.out.println("Msg recvd: " + msg_);
            }
        };
        ScheduledFuture<?> hndl = manager.run(msgReader);
        cancelUsingMH(hndl);
        // cancelUsingProxy(hndl);
        // cancelUsingReflection(hndl);
    }
}

```

### 7. Path接口(重要接口更新)

- Path

```java
public class PathUsage {
    public void usePath() {
        Path path1 = Paths.get("folder1", "sub1");
        Path path2 = Paths.get("folder2", "sub2");
        path1.resolve(path2); //folder1\sub1\folder2\sub2
        path1.resolveSibling(path2); //folder1\folder2\sub2
        path1.relativize(path2); //..\..\folder2\sub2
        path1.subpath(0, 1); //folder1
        path1.startsWith(path2); //false
        path1.endsWith(path2); //false
        Paths.get("folder1/./../folder2/my.text").normalize(); //folder2\my.text
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        PathUsage usage = new PathUsage();
        usage.usePath();
    }
}

```

- DirectoryStream

```java
public class ListFile {
    public void listFiles() throws IOException {
        Path path = Paths.get("");
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(path, "*.*")) {
            for (Path entry: stream) {
                //使用entry
                System.out.println(entry);
            }
        }
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        ListFile listFile = new ListFile();
        listFile.listFiles();
    }
}

```

- Files

```java
public class FilesUtils {
    public void manipulateFiles() throws IOException {
        Path newFile = Files.createFile(Paths.get("new.txt").toAbsolutePath());
        List<String> content = new ArrayList<String>();
        content.add("Hello");
        content.add("World");
        Files.write(newFile, content, Charset.forName("UTF-8"));
        Files.size(newFile);
        byte[] bytes = Files.readAllBytes(newFile);
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        Files.copy(newFile, output);
        Files.delete(newFile);
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        FilesUtils fu = new FilesUtils();
        fu.manipulateFiles();
    }
}

```

- WatchService

```java
public class WatchAndCalculate {
    public void calculate() throws IOException, InterruptedException {
        WatchService service = FileSystems.getDefault().newWatchService();
        Path path = Paths.get("").toAbsolutePath();
        path.register(service, StandardWatchEventKinds.ENTRY_CREATE);
        while (true) {
            WatchKey key = service.take();
            for (WatchEvent<?> event : key.pollEvents()) {
                Path createdPath = (Path) event.context();
                createdPath = path.resolve(createdPath);
                long size = Files.size(createdPath);
                System.out.println(createdPath + " ==> " + size);
            }
            key.reset();
        }
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Throwable {
        WatchAndCalculate wc = new WatchAndCalculate();
        wc.calculate();
    }
}

```

### 8. fork/join计算框架

Java7 提供的一个用于并行执行任务的框架，是一个把大任务分割成若干个小任务，最终汇总每个小任务结果后得到大任务结果的框架。

该框架为Java8的并行流打下了坚实的基础


## JDK8 新特性

::: tip 
Java5开发代号为Tiger(老虎),于2004-09-30发行
:::


### 1. Lambda表达式

Lambda 表达式，也可称为闭包，它是推动 Java 8 发布的最重要新特性。
Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）。
使用 Lambda 表达式可以使代码变的更加简洁紧凑。

Lambda表达式可以说是Java 8最大的卖点，她将函数式编程引入了Java。Lambda允许把函数作为一个方法的参数，或者把代码看成数据。

一个Lambda表达式可以由用逗号分隔的参数列表、–>符号与函数体三部分表示。例如：

```java
Arrays.asList( "p", "k", "u","f", "o", "r","k").forEach( e -> System.out.println( e ) );
```

为了使现有函数更好的支持Lambda表达式，Java 8引入了函数式接口的概念。函数式接口就是只有一个方法的普通接口。java.lang.Runnable与java.util.concurrent.Callable是函数式接口最典型的例子。为此，Java 8增加了一种特殊的注解@FunctionalInterface


### 2. 接口的默认方法与静态方法

我们可以在接口中定义默认方法，使用default关键字，并提供默认的实现。所有实现这个接口的类都会接受默认方法的实现，除非子类提供的自己的实现。例如：

```java
 public interface DefaultFunctionInterface {
     default String defaultFunction() {
         return "default function";
     }
 }
```

我们还可以在接口中定义静态方法，使用static关键字，也可以提供实现。例如：

```java
 public interface StaticFunctionInterface {
     static String staticFunction() {
         return "static function";
     }
 }

```

接口的默认方法和静态方法的引入，其实可以认为引入了C＋＋中抽象类的理念，以后我们再也不用在每个实现类中都写重复的代码了。

### 3. 方法引用（含构造方法引用）

通常与Lambda表达式联合使用，可以直接引用已有Java类或对象的方法。一般有四种不同的方法引用：

1. 构造器引用。语法是Class::new，或者更一般的Class< T >::new，要求构造器方法是没有参数；
2. 静态方法引用。语法是Class::static_method，要求接受一个Class类型的参数；
3. 特定类的任意对象方法引用。它的语法是Class::method。要求方法是没有参数的；
4. 特定对象的方法引用，它的语法是instance::method。要求方法接受一个参数，与3不同的地方在于，3是在列表元素上分别调用方法，而4是在某个对象上调用方法，将列表元素作为参数传入；

### 4. 重复注解

在Java 5中使用注解有一个限制，即相同的注解在同一位置只能声明一次。Java 8引入重复注解，这样相同的注解在同一地方也可以声明多次。重复注解机制本身需要用@Repeatable注解。Java 8在编译器层做了优化，相同注解会以集合的方式保存，因此底层的原理并没有变化。

### 5. 扩展注解的支持（类型注解）

Java 8扩展了注解的上下文，几乎可以为任何东西添加注解，包括局部变量、泛型类、父类与接口的实现，连方法的异常也能添加注解

```java
private @NotNull String name;

```

### 6. Optional

Java 8引入Optional类来防止空指针异常，Optional类最先是由Google的Guava项目引入的。Optional类实际上是个容器：它可以保存类型T的值，或者保存null。使用Optional类我们就不用显式进行空指针检查了

可以通过以下实例来更好的了解 Optional 类的使用：

```java
public static void main(String args[]) {
    Integer value1 = null;
    Integer value2 = new Integer(10);
    // 允许传递为null参数
    Optional<Integer> a = Optional.ofNullable(value1);
    // 如果传递的参数是null，抛出异常NullPointerException
    Optional<Integer> b = Optional.of(value2);
    System.out.println(sum(a, b));
}
public Integer sum(Optional<Integer>a, Optional<Integer>b) {
    // 判断值是否存在
    System.out.println("第一个参数值存在:" + a.isPresent());
    System.out.println("第二个参数值存在:" + b.isPresent());
    // 如果值存在，返回它，否则返回默认值
    Integer value1 = a.orElse(new Integer(0));
    // 获取值，值需要存在
    Integer value2 = b.get();
    return value1 + value2;
}
```

输出

```
第一个参数值存在: false
第二个参数值存在: true
10
```


### 7. Stream

Stream API是把真正的函数式编程风格引入到Java中。其实简单来说可以把Stream理解为MapReduce，当然Google的MapReduce的灵感也是来自函数式编程。她其实是一连串支持连续、并行聚集操作的元素。从语法上看，也很像linux的管道、或者链式编程，代码写起来简洁明了，非常酷帅！

### 8. Date/Time API (JSR 310)

Java 8新的Date-Time API (JSR 310)受Joda-Time的影响，提供了新的java.time包，可以用来替代 java.util.Date和java.util.Calendar。一般会用到Clock、LocaleDate、LocalTime、LocaleDateTime、ZonedDateTime、Duration这些类，对于时间日期的改进还是非常不错的。

### 9. JavaScript引擎Nashorn

Nashorn允许在JVM上开发运行JavaScript应用，允许Java与JavaScript相互调用。

### 10. Base64

在Java 8中，Base64编码成为了Java类库的标准。Base64类同时还提供了对URL、MIME友好的编码器与解码器。

以下实例演示了 Base64 的使用:

```java
@Test
public void base64Test() throws UnsupportedEncodingException {
    // 使用基本编码
    String base64encodedString = Base64.getEncoder().encodeToString("java@crankz".getBytes("utf-8"));
    System.out.println("Base64 编码字符串 (基本) :" + base64encodedString);
    // 解码
    byte[] base64decodedBytes = Base64.getDecoder().decode(base64encodedString);
    System.out.println("原始字符串: " + new String(base64decodedBytes, "utf-8"));
}
```

输出

```
Base64 编码字符串 (基本) :amF2YUBjcmFua3o=
原始字符串: java@crankz
```

### 11. JVM的PermGen空间被移除

取代它的是 [Metaspace(JEP 122)](../jvm/metaspace.md)

Java 8是一次变化巨大的更新，耗费了工程师大量的时间，还借鉴了很多其它语言和类库。我们无法在这里一一详细列举，以后有机会一定给大家详细解读一下。

### 12. HashMap 改进

## JDK9 新特性

### 1. Java平台模块化系统

该特性是Java 9 最大的一个特性，Java 9起初的代号就叫Jigsaw，最近被更改为Modularity，Modularity提供了类似于OSGI框架的功能，模块之间存在相互的依赖关系，可以导出一个公共的API，并且隐藏实现的细节，Java提供该功能的主要的动机在于，减少内存的开销，我们大家都知道，在JVM启动的时候，至少会有30～60MB的内存加载，主要原因是JVM需要加载rt.jar，不管其中的类是否被classloader加载，第一步整个jar都会被JVM加载到内存当中去，模块化可以根据模块的需要加载程序运行需要的class，那么JVM是如何知道需要加载那些class的呢？这就是在Java 9 中引入的一个新的文件module.java我们大致来看一下一个例子（module-info.java）

#### 1.1 模块描述器

模块化的 JAR 文件都包含一个额外的模块描述器。在这个模块描述器中, 对其它模块的依赖是通过 “requires” 来表示的。另外, “exports” 语句控制着内部的哪些包是可以被其它模块访问到的。所有不被导出的包默认都封装在模块的里面。如下是一个模块描述器的示例，存在于 “module-info.java” 文件中

```java
module blog {
 exports com.pluralsight.blog;

 requires cms;
}

```

![](./imgs/65fccdd6.png)

#### 1.2 jlink:Java连接器

### 2. 新工具

#### 2.1 JShell

Java 9首次为Java语言提供了REPL工具，名为JShell。我们可以在命令行或者在IntelliJ IDEA的终端中运行该REPL。


在Java 8 出来的时候，很多人都喊着，这是要抢夺Scala等基于JVM动态语言的市场啊，其中有人给出了一个Java做不到的方向，那就是Scala可以当作脚本语言，Java可以么？很明显在此之前Java不行，ta也不具备动态性，但是此次Java 9 却让Java也可以像脚本语言一样来运行了，主要得益于JShell，我们来看一下这个演示

```
jdk-9\bin>jshell.exe  
|  Welcome to JShell -- Version 9  
|  For an introduction type: /help intro  
jshell> "This is my long string. I want a part of it".substring(8,19);  
$5 ==> "my long string"  

```

这是我们在Jshell这个控制台下运行，我们如何运行脚本文件呢？

```
jshell> /save c:\develop\JShell_hello_world.txt  
jshell> /open c:\develop\JShell_hello_world.txt  
Hello JShell!  

```

#### 2.2 更多的诊断命令

记得在Java 8中，放弃了Jhat这个命令，但是很快在Java 9中增加了一些新的命令，比如我们要介绍到的jcmd,借助它你可以很好的看到类之间的依赖关系

```
jdk-9\bin>jcmd 14056 VM.class_hierarchy -i -s java.net.Socket  
14056:  
java.lang.Object/null  
|--java.net.Socket/null  
|  implements java.io.Closeable/null (declared intf)  
|  implements java.lang.AutoCloseable/null (inherited intf)  
|  |--org.eclipse.ecf.internal.provider.filetransfer.httpclient4.CloseMonitoringSocket  
|  |  implements java.lang.AutoCloseable/null (inherited intf)  
|  |  implements java.io.Closeable/null (inherited intf)  
|  |--javax.net.ssl.SSLSocket/null  
|  |  implements java.lang.AutoCloseable/null (inherited intf)  
|  |  implements java.io.Closeable/null (inherited intf)  

```

### 3. 多版本兼容Jar

我们最后要来着重介绍的这个特性对于库的维护者而言是个特别好的消息。当一个新版本的 Java 出现的时候，你的库用户要花费数年时间才会切换到这个新的版本。这就意味着库得去向后兼容你想要支持的最老的 Java 版本 (许多情况下就是 Java 6 或者 7)。这实际上意味着未来的很长一段时间，你都不能在库中运用 Java 9 所提供的新特性。幸运的是，多版本兼容 JAR 功能能让你创建仅在特定版本的 Java 环境中运行库程序时选择使用的 class 版本：

```bash
multirelease.jar
├── META-INF
│  └── versions
│    └── 9
│      └── multirelease
│        └── Helper.class
├── multirelease
  ├── Helper.class
  └── Main.class

```

在上述场景中， multirelease.jar 可以在 Java 9 中使用, 不过 Helper 这个类使用的不是顶层的 multirelease.Helper 这个 class, 而是处在“META-INF/versions/9”下面的这个。这是特别为 Java 9 准备的 class 版本，可以运用 Java 9 所提供的特性和库。同时，在早期的 Java 诸版本中使用这个 JAR 也是能运行的，因为较老版本的 Java 只会看到顶层的这个 Helper 类。

### 4. 新的安全性

#### 4.1 数据报传输层安全性(DTLS）

#### 4.2 禁用sha - 1证书

引入了SHA-3的hash算法

### 5. 核心库新内容

#### 5.1 轻量级的json文本处理api

#### 5.2 多线程新内容

新增ProcessHandle类，该类提供进程的本地进程ID、参数、命令、启动时间、累计CPU时间、用户、父进程和子进程。这个类还可以监控进程的活力和破坏进程。ProcessHandle。onExit方法，当进程退出时，复杂未来类的异步机制可以执行一个操作。
包括一个可互操作的发布-订阅框架，以及对CompletableFuture API的增强。
在Java很早的版本中，提供了Process这样的API可以获得进程的一些信息，包括runtime，甚至是用它来执行当前主机的一些命令，但是请大家思考一个问题，你如何获得你当前Java运行程序的PID？很显然通过Process是无法获得的，需要借助于JMX才能得到，但是在这一次的增强中，你将会很轻松的得到这样的信息，我们来看一个简单的例子

```java
ProcessHandle self = ProcessHandle.current();  
long PID = self.getPid();  
ProcessHandle.Info procInfo = self.info();  

Optional<String[]> args = procInfo.arguments();  
Optional<String> cmd =  procInfo.commandLine();  
Optional<Instant> startTime = procInfo.startInstant();  
Optional<Duration> cpuUsage = procInfo.totalCpuDuration();

```

已经获取到了JVM的进程，我们该如何将该进程优雅的停掉呢？下面的代码给出了答案

```java
childProc = ProcessHandle.current().children();  
childProc.forEach(procHandle -> {  
    assertTrue("Could not kill process " + procHandle.getPid(), procHandle.destroy());  
});  

```

通过上面的一小段代码，我们也发现了Java 9对断言机制同样增加了一些增强，多说一些题外话，我们目前的系统中运行一个严重依赖于Hive beelineServer的程序，beeline server不是很稳定，经常出现卡顿，甚至假死，假死后也不回复的问题，这样就导致我们的程序也会出现卡顿，如果运维人员不对其进行清理，系统运行几个月之后会发现很多僵尸进程，于是增加一个获取当前JVM PID的功能，然后判断到超过给定的时间对其进行主动杀死，完全是程序内部的行为，但是获取PID就必须借助于JMX的动作，另外杀死它也必须借助于操作系统的命令，诸如kill这样的命令，显得非常的麻烦，但是Java 9的方式明显要优雅方便许多。

#### 5.3 Publish-Subscribe Framework

在新版的JDK 9 中提供了消息发布订阅的框架，该框架主要是由Flow这个类提供的，他同样会在java.util.concurrent中出现，并且提供了Reactive编程模式。

#### 5.4 基础类新内容

用少量的元素创建集合和映射的实例更容易。在列表、设置和映射接口上的新静态工厂方法使创建这些集合的不可变实例变得更加简单 例子：

```java
Set<String> alphabet = Set.of("a", "b", "c");
List<String> strings = List.of("first", "second");

```

长期以来，Stream API 都是 Java 标准库最好的改进之一。通过这套 API 可以在集合上建立用于转换的申明管道。在 Java 9 中它会变得更好。Stream 接口中添加了 4 个新的方法：dropWhile, takeWhile, ofNullable。还有个 iterate 方法的新重载方法，可以让你提供一个 Predicate (判断条件)来指定什么时候结束迭代：

```java
IntStream.iterate(1, i -> i < 100, i -> i + 1).forEach(System.out::println);

```

第二个参数是一个 Lambda，它会在当前 IntStream 中的元素到达 100 的时候返回 true。因此这个简单的示例是向控制台打印 1 到 99。
除了对 Stream 本身的扩展，Optional 和 Stream 之间的结合也得到了改进。现在可以通过 Optional 的新方法 `stram` 将一个 Optional 对象转换为一个(可能是空的) Stream 对象：

```java
Stream<Integer> s = Optional.of(1).stream();

```

在组合复杂的 Stream 管道时，将 Optional 转换为 Stream 非常有用。

### 6. 增强的弃用标记

Java 9提供了另外一个看起来很小的特性，那就是增强的弃用标记，能够让开发人员更好地理解代码的影响。以前，我们只能将代码标记为deprecated并在Javadoc中添加一些原因说明的文档，现在@Deprecated新增了两个有用的属性：since和orRemoval。

### 7. Thread.onSpinWait

Java 9允许我们为JVM提供一些提示信息，便于实现性能的提升。具体来讲，如果你的代码需要在一个循环中等待某个条件发生的话，那么可以使用[Thread.onSpinWait](https://link.jianshu.com?t=http%3A%2F%2Fdownload.java.net%2Fjava%2Fjdk9%2Fdocs%2Fapi%2Fjava%2Flang%2FThread.html%23onSpinWait--)让运行时环境了解到这一点。

### 8. 私有接口方法

Java 8 为我们带来了接口的默认方法。 接口现在也可以包含行为，而不仅仅是方法签名。 但是，如果在接口上有几个默认方法，代码几乎相同，会发生什么情况？ 通常，您将重构这些方法，调用一个可复用的私有方法。 但默认方法不能是私有的。 将复用代码创建为一个默认方法不是一个解决方案，因为该辅助方法会成为公共API的一部分。 使用 Java 9，您可以向接口添加私有辅助方法来解决此问题：

```java
public interface MyInterface {

  void normalInterfaceMethod();

  default void interfaceMethodWithDefault() { init(); }

  default void anotherDefaultMethod() { init(); }

  // This method is not part of the public API exposed by MyInterface
  private void init() { System.out.println("Initializing"); }
}

```

如果您使用默认方法开发 API ，那么私有接口方法可能有助于构建其实现。

```java
interface InterfaceWithPrivateMethods {  

    private static String staticPrivate() {  
        return "static private";  
    }  

    private String instancePrivate() {  
        return "instance private";  
    }  

    default void check() {  
        String result = staticPrivate();  
        InterfaceWithPrivateMethods pvt = new InterfaceWithPrivateMethods() {  
            // anonymous class  
        };  
        result = pvt.instancePrivate();  
    }  
} 

```

该特性完全是为了Java 8中default方法和static方法服务的。

### 9. java.net 新内容

就目前而言，JDK提供的Http访问功能，几乎都需要依赖于HttpURLConnection，但是这个类大家在写代码的时候很少使用，我们一般都会选择Apache的Http Client，此次在Java 9的版本中引入了一个新的package:java.net.http，里面提供了对Http访问很好的支持，不仅支持Http1.1而且还支持HTTP2，以及WebSocket，据说性能可以超过Apache HttpClient，Netty，Jetty

```java
URI httpURI = new URI("http://www.94jiankang.com");  
HttpRequest request = HttpRequest.create(httpURI).GET();  
HttpResponse response = request.response();  
String responseBody = response.body(HttpResponse.asString());  

```

### 10. http/2

Java 9 中有新的方式来处理 HTTP 调用。这个迟到的特性用于代替老旧的 `HttpURLConnection` API，并提供对 WebSocket 和 HTTP/2 的支持。注意：新的 HttpClient API 在 Java 9 中以所谓的孵化器模块交付。也就是说，这套 API 不能保证 100% 完成

除了这个简单的请求/响应模型之外，HttpClient 还提供了新的 API 来处理 HTTP/2 的特性，比如流和服务端推送。

### 10. 其他

#### 10.1 Try-With-Resources的改变

我们都知道，Try-With-Resources是从JDK 7 中引入的一项重要特征，只要接口继承了Closable就可以使用Try-With-Resources，减少finally语句块的编写，在Java 9 中会更加的方便这一特征

```
MyAutoCloseable mac = new MyAutoCloseable();  
try (mac) {  
    // do some stuff with mac  
}  

try (new MyAutoCloseable() { }.finalWrapper.finalCloseable) {  
   // do some stuff with finalCloseable  
} catch (Exception ex) { }  

```

我们的Closeable完全不用写在try（）中。

#### 10.2 Unsafe类的命运

很早之前就传言Java 会将unsafe这一个类屏蔽掉，不给大家使用，这次看他的官方文档，貌似所有已sun开头的包都将不能在application中使用，但是java 9 提供了新的API供大家使用。
在JDK 9中提供了一个新的包，叫做java.lang.invoke里面有一系列很重要的类比如VarHandler和MethodHandles，提供了类似于原子操作以及Unsafe操作的功能。

#### 10.3 Мulti-Resolution Image API

接口java.awt.image.MultiResolutionImage封装了一系列的不同分辨率图像到一个单独对象的API，我么可以根据给定的DPI 矩阵获取resolution-specific。
关于AWT的东西，本人几乎不怎么接触，如果有用到的朋友，等JDK 9出来之后，自己体会使用一下吧。

### 11. JVM优化

1. 增强了Garbage-First(G1)并用它替代Parallel GC成为默认的垃圾收集器。
2. 统一了JVM 日志，为所有组件引入了同一个日志系统。
3. 删除了JDK 8中弃用的GC组合。（DefNew + CMS，ParNew + SerialOld，Incremental CMS）


## JDK10 新特性

1. 本地变量类型推断
2. 统一JDK仓库
3. 垃圾回收器接口
4. G1的并行Full GC
5. 应用程序类数据共享
6. ThreadLocal握手机制

### JDK11 新特性

::: tip
2018年9月26日，Oracle 官方宣布 Java 11 正式发布。这是 Java 大版本周期变化后的第一个长期支持版本（LTS版本，Long-Term-Support，持续支持到2026年9月），非常值得关注
:::

### 1. 本地变量类型推断

什么是局部变量类型推断？

```java
var javastack = "javastack";
System.out.println(javastack);

```

大家看出来了，局部变量类型推断就是左边的类型直接使用 var 定义，而不用写具体的类型，编译器能根据右边的表达式自动推断类型，如上面的 String 。

```java
var javastack = "javastack";
就等于：
String javastack = "javastack";

```

### 2. 字符串加强

Java 11 增加了一系列的字符串处理方法，如以下所示。

```java
// 判断字符串是否为空白
" ".isBlank(); // true
// 去除首尾空格
" Javastack ".strip(); // "Javastack"
// 去除尾部空格
" Javastack ".stripTrailing(); // " Javastack"
// 去除首部空格
" Javastack ".stripLeading(); // "Javastack "
// 复制字符串
"Java".repeat(3);// "JavaJavaJava"
// 行数统计
"A\nB\nC".lines().count(); // 3

```

### 3. 集合加强

自 Java 9 开始，Jdk 里面为集合（List/ Set/ Map）都添加了 of 和 copyOf 方法，它们两个都用来创建不可变的集合，来看下它们的使用和区别。
示例1：

```java
var list = List.of("Java", "Python", "C");
var copy = List.copyOf(list);
System.out.println(list == copy); // true

```

示例2:

```java
var list = new ArrayList<String>();
var copy = List.copyOf(list);
System.out.println(list == copy); // false

```

示例1和2代码差不多，为什么一个为true,一个为false?
来看下它们的源码：

```java
static <E> List<E> of(E... elements) {
  switch (elements.length) { // implicit null check of elements
    case 0:
        return ImmutableCollections.emptyList();
    case 1:
        return new ImmutableCollections.List12<>(elements[0]);
    case 2:
        return new ImmutableCollections.List12<>(elements[0], elements[1]);
    default:
        return new ImmutableCollections.ListN<>(elements);
  }
}
static <E> List<E> copyOf(Collection<? extends E> coll) {
    return ImmutableCollections.listCopy(coll);
}
static <E> List<E> listCopy(Collection<? extends E> coll) {
    if (coll instanceof AbstractImmutableList && coll.getClass() != SubList.class) {
        return (List<E>)coll;
    } else {
        return (List<E>)List.of(coll.toArray());
    }
}

```

可以看出 copyOf 方法会先判断来源集合是不是 AbstractImmutableList 类型的，如果是，就直接返回，如果不是，则调用 of 创建一个新的集合。

示例2因为用的 new 创建的集合，不属于不可变 AbstractImmutableList 类的子类，所以 copyOf 方法又创建了一个新的实例，所以为false.

::: tip
使用of和copyOf创建的集合为不可变集合，不能进行添加、删除、替换、排序等操作，不然会报 java.lang.UnsupportedOperationException 异常。
:::

上面演示了 List 的 of 和 copyOf 方法，Set 和 Map 接口都有。

```java
public static void main(String[] args) {
    Set<String> names = Set.of("Fred", "Wilma", "Barney", "Betty");
    //JDK11之前我们只能这么写
    System.out.println(Arrays.toString(names.toArray(new String[names.size()])));
    //JDK11之后  可以直接这么写了
    System.out.println(Arrays.toString(names.toArray(size -> new String[size])));
    System.out.println(Arrays.toString(names.toArray(String[]::new)));
}

```

**Collection.toArray(IntFunction)**

在java.util.Collection接口中添加了一个新的默认方法toArray（IntFunction）。此方法允许将集合的元素传输到新创建的所需运行时类型的数组

```java
 public static void main(String[] args) {
        Set<String> names = Set.of("Fred", "Wilma", "Barney", "Betty");
        //JDK11之前我们只能这么写
        System.out.println(Arrays.toString(names.toArray(new String[names.size()])));
        //JDK11之后  可以直接这么写了
        System.out.println(Arrays.toString(names.toArray(size -> new String[size])));
        System.out.println(Arrays.toString(names.toArray(String[]::new)));
    }

```

新方法是现有toArray（T []）方法的重载，该方法将数组实例作为参数。添加重载方法会导致次要源不兼容。以前，形式为coll.toArray（null）的代码将始终解析为现有的toArray方法。使用新的重载方法，此代码现在不明确，将导致编译时错误。 （这只是源不兼容。现有的二进制文件不受影响。）应该更改模糊代码以将null转换为所需的数组类型，例如toArray（（Object []）null）或其他一些数组类型。请注意，将null传递给toArray方法指定为抛出NullPointerException

### 4. Stream 加强

Stream 是 Java 8 中的新特性，Java 9 开始对 Stream 增加了以下 4 个新方法。

1. 增加单个参数构造方法，可为null

```java
Stream.ofNullable(null).count(); // 0
//JDK8木有ofNullable方法哦

```

源码可看看：

```java
/**
 * @since 9
 */
 public static<T> Stream<T> ofNullable(T t) {
     return t == null ? Stream.empty()
                      : StreamSupport.stream(new Streams.StreamBuilderImpl<>(t), false);
 }

```

2. 增加 takeWhile 和 dropWhile 方法

```java
Stream.of(1, 2, 3, 2, 1)
    .takeWhile(n -> n < 3)
    .collect(Collectors.toList()); // [1, 2]

```

takeWhile表示从开始计算，当 n < 3 时就截止。

```java
Stream.of(1, 2, 3, 2, 1)
    .dropWhile(n -> n < 3)
    .collect(Collectors.toList()); // [3, 2, 1]

```

dropWhile这个和上面的相反，一旦 n < 3 不成立就开始计算

3. iterate重载

这个 iterate 方法的新重载方法，可以让你提供一个 Predicate (判断条件)来指定什么时候结束迭代。

```java
    public static void main(String[] args) {
        // 这构造的是无限流  JDK8开始
        Stream.iterate(0, (x) -> x + 1);
        // 这构造的是小于10就结束的流  JDK9开始
        Stream.iterate(0, x -> x < 10, x -> x + 1);
    }

```

### 5. Optional 加强
Opthonal 也增加了几个非常酷的方法，现在可以很方便的将一个 Optional 转换成一个 Stream, 或者当一个空 Optional 时给它一个替代的。

```java
Optional.of("javastack").orElseThrow(); // javastack
Optional.of("javastack").stream().count(); // 1
Optional.ofNullable(null)
.or(() -> Optional.of("javastack"))
.get(); // javastack

```

or方法和stream方法显然都是新增的

### 6. InputStream 加强

InputStream 终于有了一个非常有用的方法：transferTo，可以用来将数据直接传输到 OutputStream，这是在处理原始数据流时非常常见的一种用法，如下示例。

```java
var classLoader = ClassLoader.getSystemClassLoader();
var inputStream = classLoader.getResourceAsStream("javastack.txt");
var javastack = File.createTempFile("javastack2", "txt");
try (var outputStream = new FileOutputStream(javastack)) {
    inputStream.transferTo(outputStream);
}

```

### 7. HTTP Client API(重磅)

::: tip
在java9及10被标记incubator的模块jdk.incubator.httpclient，在java11被标记为正式，改为java.net.http模块。
这是 Java 9 开始引入的一个处理 HTTP 请求的的孵化 HTTP Client API，该 API 支持同步和异步，而在 Java 11 中已经为正式可用状态，你可以在 java.net 包中找到这个 API。
:::

来看一下 HTTP Client 的用法：

```java
var request = HttpRequest.newBuilder()
.uri(URI.create("https://javastack.cn"))
.GET()
.build();
var client = HttpClient.newHttpClient();
// 同步
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
// 异步
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
.thenApply(HttpResponse::body)
.thenAccept(System.out::println);

```

上面的 .GET() 可以省略，默认请求方式为 Get！

更多使用示例可以看这个 API，后续有机会再做演示。

现在 Java 自带了这个 HTTP Client API，我们以后还有必要用 Apache 的 HttpClient 工具包吗？我觉得没啥必要了

### 8. 化繁为简，一个命令编译运行源代码

看下面代码

```
// 编译
javac Javastack.java
// 运行
java Javastack
```

在我们的认知里面，要运行一个 Java 源代码必须先编译，再运行，两步执行动作。而在未来的 Java 11 版本中，通过一个 java 命令就直接搞定了，如以下所示。

```
java Javastack.java
```

### 9. 移除项

1. 移除了com.sun.awt.AWTUtilities
2. 移除了sun.misc.Unsafe.defineClass，使用 java.lang.invoke.MethodHandles.Lookup.defineClass来替代
3. 移除了Thread.destroy()以及 Thread.stop(Throwable)方法
4. 移除了sun.nio.ch.disableSystarraydsj@163.comWideOverlappingFileLockCheck、sun.locale.formatasdefault属性
5. 移除了jdk.snmp模块
6. 移除了javafx，openjdk估计是从java10版本就移除了，oracle jdk10还尚未移除javafx，而java11版本则oracle的jdk版本也移除了javafx
7. 移除了Java Mission Control，从JDK中移除之后，需要自己单独下载
8. 移除了这些Root Certificates ：Baltimore Cybertrust Code Signing CA，SECOM ，AOL and Swisscom

### 10. 废弃项

1. 废弃了Nashorn JavaScript Engine
2. 废弃了-XX+AggressiveOpts选项
3. -XX:+UnlockCommercialFeatures以及-XX:+LogCommercialFeatures选项也不- 再需要
4. 废弃了Pack200工具及其API

[JDK11变化详解，JDK8升级JDK11详细指南](./jdk11_features.md)