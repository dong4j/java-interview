# 强引用 软引用 弱引用 虚引用

## 强引用

- 如果一个对象具有强引用, GC绝不会回收它；
- 当内存空间不足, JVM宁愿抛出OutOfMemoryError错误.
- 一般new出来的对象都是强引用, 如下

```java
//强引用 
User strangeReference=new User();  
```

::: tip
以前我们使用的大部分引用实际上都是强引用, 这是使用最普遍的引用.如果一个对象具有强引用, 那就类似于必不可少的生活用品, 垃圾回收器绝不会回收它.当内存空 间不足, Java虚拟机宁愿抛出OutOfMemoryError错误, 使程序异常终止, 也不会靠随意回收具有强引用的对象来解决内存不足问题.
:::
    
## 软引用 

如果一个对象具有软引用, 当内存空间不足, GC会回收这些对象的内存, 使用软引用构建敏感数据的缓存. 
在JVM中, 软引用是如下定义的, 可以通过一个时间戳来回收, 下面引自JVM:

```java
 public class SoftReference<T> extends Reference<T> {

    /**
     * Timestamp clock, updated by the garbage collector
     */
    static private long clock;

    /**
     * Timestamp updated by each invocation of the get method.  The VM may use
     * this field when selecting soft references to be cleared, but it is not
     * required to do so.
     */
    private long timestamp;

    /**
     * Creates a new soft reference that refers to the given object.  The new
     * reference is not registered with any queue.
     *
     * @param referent object the new soft reference will refer to
     */
    public SoftReference(T referent) {
        super(referent);
        this.timestamp = clock;
    }

    /**
     * Creates a new soft reference that refers to the given object and is
     * registered with the given queue.
     *
     * @param referent object the new soft reference will refer to
     * @param q the queue with which the reference is to be registered,
     *          or <tt>null</tt> if registration is not required
     *
     */
    public SoftReference(T referent, ReferenceQueue<? super T> q) {
        super(referent, q);
        this.timestamp = clock;
    }

    /**
     * Returns this reference object's referent.  If this reference object has
     * been cleared, either by the program or by the garbage collector, then
     * this method returns <code>null</code>.
     *
     * @return   The object to which this reference refers, or
     *           <code>null</code> if this reference object has been cleared
     */
    public T get() {
        T o = super.get();
        if (o != null && this.timestamp != clock)
            this.timestamp = clock;
        return o;
    }
}
```

软引用的声明的借助强引用或者匿名对象, 使用泛型SoftReference；可以通过get方法获得强引用.具体如下:

```java
//软引用
SoftReference<User>softReference=new SoftReference<User>(new User());
strangeReference=softReference.get();//通过get方法获得强引用
```

::: tip
如果一个对象只具有软引用, 那就类似于可有可物的生活用品.如果内存空间足够, 垃圾回收器就不会回收它, 如果内存空间不足了, 就会回收这些对象的内存.只要垃圾回收器没有回收它, 该对象就可以被程序使用.软引用可用来实现内存敏感的高速缓存.
软引用可以和一个引用队列（ReferenceQueue）联合使用, 如果软引用所引用的对象被垃圾回收, JAVA虚拟机就会把这个软引用加入到与之关联的引用队列中.
:::

## 弱引用
如果一个对象具有弱引用, 在GC线程扫描内存区域的过程中, 不管当前内存空间足够与否, 都会回收内存, 使用弱引用 构建非敏感数据的缓存. 
在JVM中, 弱引用是如下定义的, 下面引自JVM:

```java
public class WeakReference<T> extends Reference<T> {
    /**
     * Creates a new weak reference that refers to the given object.  The new
     * reference is not registered with any queue.
     *
     * @param referent object the new weak reference will refer to
     */
    public WeakReference(T referent) {
        super(referent);
    }

    /**
     * Creates a new weak reference that refers to the given object and is
     * registered with the given queue.
     *
     * @param referent object the new weak reference will refer to
     * @param q the queue with which the reference is to be registered,
     *          or <tt>null</tt> if registration is not required
     */
    public WeakReference(T referent, ReferenceQueue<? super T> q) {
        super(referent, q);
    }
}
```

弱引用的声明的借助强引用或者匿名对象, 使用泛型 `WeakReference<T>`, 具体如下:

```java
//弱引用
WeakReference<User>weakReference=new WeakReference<User>(new User());
```

::: tip
如果一个对象只具有弱引用, 那就类似于可有可物的生活用品.弱引用与软引用的区别在于:只具有弱引用的对象拥有更短暂的生命周期.在垃圾回收器线程扫描它 所管辖的内存区域的过程中, 一旦发现了只具有弱引用的对象, 不管当前内存空间足够与否, 都会回收它的内存.不过, 由于垃圾回收器是一个优先级很低的线程,  因此不一定会很快发现那些只具有弱引用的对象. 
    弱引用可以和一个引用队列（ReferenceQueue）联合使用, 如果弱引用所引用的对象被垃圾回收, Java虚拟机就会把这个弱引用加入到与之关联的引用队列中.
:::

## 虚引用

如果一个对象仅持有虚引用, 在任何时候都可能被垃圾回收, 虚引用与软引用和弱引用的一个区别在于:虚引用必须和引用队列联合使用, 虚引用主要用来**跟踪对象被垃圾回收的活动**. 
在JVM中, 虚引用是如下定义的, 下面引自JVM:

```java
public class PhantomReference<T> extends Reference<T> {

    /**
     * Returns this reference object's referent.  Because the referent of a
     * phantom reference is always inaccessible, this method always returns
     * <code>null</code>.
     *
     * @return  <code>null</code>
     */
    public T get() {
        return null;
    }

    /**
     * Creates a new phantom reference that refers to the given object and
     * is registered with the given queue.
     *
     * <p> It is possible to create a phantom reference with a <tt>null</tt>
     * queue, but such a reference is completely useless: Its <tt>get</tt>
     * method will always return null and, since it does not have a queue, it
     * will never be enqueued.
     *
     * @param referent the object the new phantom reference will refer to
     * @param q the queue with which the reference is to be registered,
     *          or <tt>null</tt> if registration is not required
     */
    public PhantomReference(T referent, ReferenceQueue<? super T> q) {
        super(referent, q);
    }
}
```
虚引用 `PhantomReference<T>` 的声明的借助强引用或者匿名对象,结合泛型 `ReferenceQueue<T>` 初始化, 具体如下:

```java
//虚引用
PhantomReference<User> phantomReference=new PhantomReference<User>(new User(),
```

::: tip
"虚引用"顾名思义, 就是形同虚设, 与其他几种引用都不同, 虚引用并不会决定对象的生命周期.如果一个对象仅持有虚引用, 那么它就和没有任何引用一样, 在任何时候都可能被垃圾回收.
    虚引用主要用来**跟踪对象被垃圾回收的活动**.虚引用与软引用和弱引用的一个区别在于:虚引用必须和引用队列（ReferenceQueue）联合使用.当垃 圾回收器准备回收一个对象时, 如果发现它还有虚引用, 就会在回收对象的内存之前, 把这个虚引用加入到与之关联的引用队列中.程序可以通过判断引用队列中是 否已经加入了虚引用, 来了解
    被引用的对象是否将要被垃圾回收.程序如果发现某个虚引用已经被加入到引用队列, 那么就可以在所引用的对象的内存被回收之前采取必要的行动.
:::

```java
import java.lang.ref.*;
import java.util.HashSet;
import java.util.Set;

class User {

    private String name;

    public User()
    {}

    public User(String name)
    {
        this.name=name;
    }

    @Override
    public String toString() {
        return name;
    }

    public void finalize(){
        System.out.println("Finalizing ... "+name);
    }
}

/**
 * Created by jinxu on 15-4-25.
 */
public class ReferenceDemo {

    private static ReferenceQueue<User> referenceQueue = new ReferenceQueue<User>();
    private static final int size = 10;

    public static void checkQueue(){
       /* Reference<? extends User> reference = null;
        while((reference = referenceQueue.poll())!=null){
            System.out.println("In queue : "+reference.get());
        }*/
        Reference<? extends User> reference = referenceQueue.poll();
        if(reference!=null){
            System.out.println("In queue : "+reference.get());
        }
    }

    public static void testSoftReference()
    {
        Set<SoftReference<User>> softReferenceSet = new HashSet<SoftReference<User>>();
        for (int i = 0; i < size; i++) {
            SoftReference<User> ref = new SoftReference<User>(new User("Soft " + i), referenceQueue);
            System.out.println("Just created: " + ref.get());
            softReferenceSet.add(ref);
        }
        System.gc();
        checkQueue();
    }

    public static void testWeaKReference()
    {
        Set<WeakReference<User>> weakReferenceSet = new HashSet<WeakReference<User>>();
        for (int i = 0; i < size; i++) {
            WeakReference<User> ref = new WeakReference<User>(new User("Weak " + i), referenceQueue);
            System.out.println("Just created: " + ref.get());
            weakReferenceSet.add(ref);
        }
        System.gc();
        checkQueue();
    }

    public static void testPhantomReference()
    {
        Set<PhantomReference<User>> phantomReferenceSet = new HashSet<PhantomReference<User>>();
        for (int i = 0; i < size; i++) {
            PhantomReference<User> ref =
                    new PhantomReference<User>(new User("Phantom " + i), referenceQueue);
            System.out.println("Just created: " + ref.get());
            phantomReferenceSet.add(ref);
        }
        System.gc();
        checkQueue();
    }

    public static void main(String[] args) {
        testSoftReference();
        testWeaKReference();
        testPhantomReference();
    }
}
```