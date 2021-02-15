# [如何创建完美的单例模式](http://sunluyao.com/2017/10/12/perfect-singleton.html)

![](./imgs/bbb4dfa8.png)

设计模式在软件开发者中十分受欢迎。设计模式是对于常见软件问题的良好解决方案。单例模式是 Java 中[创建型设计模式](https://en.wikipedia.org/wiki/Creational_pattern)的一种。

## 单例模式的目的是什么？

单例类的目的是控制对象创建，约束对象的数量有且只有一个。单例模式只允许有一个入口来创建类实例。

因为只有一个单例类实例，任何单例类的实例都将只会产生一个类，就像静态域一样。当你需要控制资源的时候，例如在数据库连接或者使用 `sockets` ，单例模式是非常有用的。

这看起来是一个很简单的设计模式，但是当我们真正去实现的时候，会带来许多的实现问题。单例模式的实现在开发者当中总是存在一定争议。现在，我们将会讨论一下如何创建一个单例类以完成下列目的：

::: tip
限制类的实例并且保证在 JVM 中只存在一个类实例。
:::

让我们在 Java 中创建单例类并在不同的情况下进行测试。

## 创建单例类

为了实现单例类，最简单方法是把构造器变为 private。有两种初始化方法。

### 饿汉式

饿汉式初始化，单例类的实例在类加载时被创建，这是创建单例类最简单的方法。

通过将构造器声明为 `private` ，不允许其他类来创建单例类实例。取而代之的是，创建一个静态方法（通常命名为 `getInstance`）来提供创建类实例的唯一入口。

```java
public class SingletonClass {
	private static volatile SingletonClass sSoleInstance = new SingletonClass();
	//private constructor.
	private SingletonClass(){}
	public static SingletonClass getInstance() {
    	return sSoleInstance;
	}
}
```

这种方法有一个缺陷，即使在程序没有使用到它的时候，实例已经被创建了。当你创建数据库连接或者 socket 时，这可能成为一个相当大的问题，会导致内存泄漏问题。解决方法是当需要的时候再创建实例，我们称之为懒汉式初始化。

### 懒汉式

与饿汉式相反，你在 `getInstance()` 方法中初始化类实例。方法中将会判断类实例是否已经创建，如果已经存在，将返回旧的实例，反之在 JVM 中创建新的实例并返回。

```java
public class SingletonClass {

	private static SingletonClass sSoleInstance;

	private SingletonClass(){}  //private constructor.

	public static SingletonClass getInstance(){
    	if (sSoleInstance == null){ //if there is no instance available... create new one
        sSoleInstance = new SingletonClass();
    	}

    return sSoleInstance;
	}
}
```

我们都知道在 Java 中，如果两个对象是相同的，那么他们的 `hashCode` 也是相同的。让我们测试一下，如果上面的单例类都正确实现，那么将会返回同样的哈希。

```java
public class SingletonTester {
   		public static void main(String[] args) {
    	//Instance 1
    	SingletonClass instance1 = SingletonClass.getInstance();

    	//Instance 2
    	SingletonClass instance2 = SingletonClass.getInstance();

    	//now lets check the hash key.
    	System.out.println("Instance 1 hash:" + instance1.hashCode());
    	System.out.println("Instance 2 hash:" + instance2.hashCode());  
   		}
}

```

下面是输出日志：


```java
15:04:341 I/System.out: Instance 1 hash:247127865
15:04:342 I/System.out: Instance 2 hash:247127865

```

可以看到两个实例拥有同样的 hashCode。所以，这就意味着上面的代码创建了完美的单例类，是吗？不。

## 让单例类反射安全

在上面的单例类中，通过反射可以创建不止一个实例。 [Java Reflection](https://docs.oracle.com/javase/tutorial/reflect/) 是一个在运行时检测或者修改类的运行时行为的过程。
通过在运行时修改构造器的可见性并通过构造器创建实例可以产生新的单例类实例。运行下面的代码，单例类还存在吗？

```java
public class SingletonTester {
   		public static void main(String[] args) {
    	//Create the 1st instance
    	SingletonClass instance1 = SingletonClass.getInstance();

    	//Create 2nd instance using Java Reflection API.
    	SingletonClass instance2 = null;
    	try {
        	Class<SingletonClass> clazz = SingletonClass.class;
        	Constructor<SingletonClass> cons = clazz.getDeclaredConstructor();
        	cons.setAccessible(true);
        	instance2 = cons.newInstance();
    	} catch (NoSuchMethodException | 	InvocationTargetException | 	IllegalAccessException | 	InstantiationException e) {
        	e.printStackTrace();
    	}

    	//now lets check the hash key.
    	System.out.println("Instance 1 hash:" + instance1.hashCode());
    	System.out.println("Instance 2 hash:" + instance2.hashCode());
   		}
}

```

下面是输出日志：


```java
15:21:48.216 I/System.out: Instance 1 hash:51110277
15:21:48.216 I/System.out: Instance 2 hash:212057050

```

每一个实例都有不同的 hashCode。显然这个单例类无法通过测试。

### 解决方案：

为了预防反射导致的单例失败，当构造器已经初始化并且其他类再次初始化时，抛出一个运行时异常。让我们更新 `SingletonClass.java`。


```java
public class SingletonClass {

	private static SingletonClass sSoleInstance;

	//private constructor.
	private SingletonClass(){

    	//Prevent form the reflection api.
    	if (sSoleInstance != null){
        	throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
    	}
	}

	public static SingletonClass getInstance(){
    	if (sSoleInstance == null){ //if there is no instance available... create new one
        	sSoleInstance = new SingletonClass();
    	}

    	return sSoleInstance;
	}
}

```

## 让单例类线程安全

如果两个线程几乎同时尝试初始化单例类，将会发生什么？让我们测试下面的代码，两个线程几乎同时被创建并且调用 `getInstance()`。

```java
public class SingletonTester {
   		public static void main(String[] args) {
    	//Thread 1
    	Thread t1 = new Thread(new Runnable() {
        	@Override
        	public void run() {
            	SingletonClass instance1 = SingletonClass.getInstance();
            	System.out.println("Instance 1 hash:" + instance1.hashCode());
        	}
    	});

    	//Thread 2
    	Thread t2 = new Thread(new Runnable() {
        	@Override
        	public void run() {
            	SingletonClass instance2 = SingletonClass.getInstance();
            	System.out.println("Instance 2 hash:" + instance2.hashCode());
        	}
    	});

    	//start both the threads
    	t1.start();
    	t2.start();
   		}
}

```

如果你多次运行这些代码，有时你会发现不同的线程创建了不同的实例。

```java
16:16:24.148 I/System.out: Instance 1 hash:247127865
16:16:24.148 I/System.out: Instance 2 hash:267260104

```

这说明了你的单例类不是线程安全的。所有的线程同时调用 `getInstance()`方法，`sSoleInstance == null` 条件对所有线程返回值，所以两个不同的实例被创建。这打破了单例原则。

### 解决方案

#### 同步 getInstance() 方法

```java
public class SingletonClass {

	private static SingletonClass sSoleInstance;

	//private constructor.
	private SingletonClass(){

    	//Prevent form the reflection api.
    	if (sSoleInstance != null){
        	throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
    	}
	}

	public synchronized static SingletonClass getInstance(){
    	if (sSoleInstance == null){ //if there is no instance available... create new one
        	sSoleInstance = new SingletonClass();
    	}

    	return sSoleInstance;
	}
}

```
在我们同步 `getInstance()` 方法之后，第二个线程必须等到第一个线程执行完 `getInstance()` 方法之后才能执行，这就保证了线程安全。

但是，这个方法同样有一些缺点：

* 锁的开销导致运行变慢
* 实例变量初始化之后的同步操作时不必要的

#### 双检查锁

使用 **双检查锁** 方法创建实例可以克服上面的问题。

这这种方法中，当实例为空时，在同步代码块中创建单例类，这样只有当 `sSoleInstance<span> </span>`为空时，同步代码块才会执行，避免了不必要的同步操作。

```java
public class SingletonClass {

	private static SingletonClass sSoleInstance;

	//private constructor.
	private SingletonClass(){

    	//Prevent form the reflection api.
    	if (sSoleInstance != null){
        	throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
    	}
	}

	public static SingletonClass getInstance() {
    	//Double check locking pattern
    	if (sSoleInstance == null) { //Check for the first time

        	synchronized (SingletonClass.class) {   //Check for the second time.
          	//if there is no instance available... create new one
          	if (sSoleInstance == null) sSoleInstance = new SingletonClass();
        	}
    	}

    	return sSoleInstance;
	}
}

```

#### 使用 volatile 关键字

表面上看，这个方法看起来很完美，你只需要付出一次静态代码块的代价。但是除非你使用 [volatile](http://www.javamex.com/tutorials/synchronization_volatile.shtml) 关键字，否则单例仍然会被打破。

没有 `volatile<span> </span>`修饰符，另一个线程可能在变量 `sSoleInstance` 正在初始化尚未完成时引用它。但是通过 `volatile` 的保证 `happens-before` 关系，所有对于 `sSoleInstance` 变量的写操作都会在读操作之前发生。

```java
public class SingletonClass {

	private static volatile SingletonClass sSoleInstance;

	//private constructor.
	private SingletonClass(){

    	//Prevent form the reflection api.
    	if (sSoleInstance != null){
        	throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
    	}
	}

	public static SingletonClass getInstance() {
    	//Double check locking pattern
    	if (sSoleInstance == null) { //Check for the first time

        	synchronized (SingletonClass.class) {   //Check for the second time.
          	//if there is no instance available... create new one
          	if (sSoleInstance == null) sSoleInstance = new SingletonClass();
        	}
    	}

    	return sSoleInstance;
	}
}

```

现在上面的单例类是线程安全的。在多线程应用环境中（比如安卓应用）保证单例类的线程安全是必需的。

## 让单例类序列化安全

在分布式系统中，有些情况下你需要在单例类中实现 `Serializable` 接口。这样你可以在文件系统中存储它的状态并且在稍后的某一时间点取出。

让我们测试一个这个单例类在序列化和反序列化之后是否仍然保持单例。

```java
public class SingletonTester {
   		public static void main(String[] args) {

  		try {
    	    SingletonClass instance1 = SingletonClass.getInstance();
    	    ObjectOutput out = null;

    	    out = new ObjectOutputStream(new FileOutputStream("filename.ser"));
    	    out.writeObject(instance1);
    	    out.close();

    	    //deserialize from file to object
    	    ObjectInput in = new ObjectInputStream(new FileInputStream("filename.ser"));
    	    SingletonClass instance2 = (SingletonClass) in.readObject();
    	    in.close();

    	    System.out.println("instance1 hashCode=" + instance1.hashCode());
    	    System.out.println("instance2 hashCode=" + instance2.hashCode());

    	} catch (IOException | ClassNotFoundException e) {
    	    e.printStackTrace();
    	}
 	  }
}

16:16:24.148 I/System.out: Instance 1 hash:247127865
16:16:24.148 I/System.out: Instance 2 hash:267260104

```

可以看到实例的 hashCode 是不同的，违反了单例原则。序列化单例类之后，当我们反序列化时，会创建一个新的类实例。为了预防另一个实例的产生，你需要提供 `readResolve()` 方法的实现。`readResolve(）`代替了从流中读取对象。这就确保了在序列化和反序列化的过程中没人可以创建新的实例。


```java
public class SingletonClass implements Serializable {

	private static volatile SingletonClass sSoleInstance;

	//private constructor.
	private SingletonClass(){

    	//Prevent form the reflection api.
    	if (sSoleInstance != null){
    	    throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
   	 }
	}

	public static SingletonClass getInstance() {
    	if (sSoleInstance == null) { //if there is no instance available... create new one
    	    synchronized (SingletonClass.class) {
    	        if (sSoleInstance == null) 	sSoleInstance = new SingletonClass();
    	    }
   	 }

    	return sSoleInstance;
	}

	//Make singleton from serialize and deserialize operation.
	protected SingletonClass readResolve() {
    	return getInstance();
	}
}

```

## 结论

在文章的最后，你可以创建线程，反射和序列化安全的单例类，但这仍然不是完美的单例，你可以使用克隆或者多个类加载器来创建不止一个实例。但是对于大多数应用，上面的实现方法已经可以很好的工作了。

