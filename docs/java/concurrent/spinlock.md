# 深入理解自旋锁

### 简单回顾一下 CAS 算法

**CAS 算法** 即 compare and swap（比较与交换），是一种有名的无锁算法。无锁编程，即不使用锁的情况下实现多线程之间的变量同步，也就是在没有线程被阻塞的情况下实现变量的同步，所以也叫非阻塞同步（Non-blocking Synchronization）。CAS 算法涉及到三个操作数

- 需要读写的内存值 V
- 进行比较的值 A
- 拟写入的新值 B

当且仅当 V 的值等于 A 时，CAS 通过原子方式用新值 B 来更新 V 的值，否则不会执行任何操作（比较和替换是一个原子操作）。一般情况下是一个自旋操作，即不断的重试。

### 什么是自旋锁？

自旋锁（spinlock）：是指当一个线程在获取锁的时候，如果锁已经被其它线程获取，那么该线程将循环等待，然后不断的判断锁是否能够被成功获取，直到获取到锁才会退出循环。

获取锁的线程一直处于活跃状态，但是并没有执行任何有效的任务，使用这种锁会造成 [busy-waiting](https://en.wikipedia.org/wiki/Busy_waiting)。

它是为实现保护共享资源而提出一种锁机制。其实，自旋锁与互斥锁比较类似，它们都是为了解决对某项资源的互斥使用。无论是互斥锁，还是自旋锁，在任何时刻，最多只能有一个保持者，也就说，在任何时刻最多只能有一个执行单元获得锁。但是两者在调度机制上略有不同。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠状态。但是自旋锁不会引起调用者睡眠，如果自旋锁已经被别的执行单元保持，调用者就一直循环在那里看是否该自旋锁的保持者已经释放了锁，” 自旋” 一词就是因此而得名。

### Java 如何实现自旋锁？

下面是个简单的例子：

```java
public class SpinLock {
    private AtomicReference<Thread> cas = new AtomicReference<Thread>();
    public void lock() {
        Thread current = Thread.currentThread();
        // 利用CAS
        while (!cas.compareAndSet(null, current)) {
            // DO nothing
        }
    }
    public void unlock() {
        Thread current = Thread.currentThread();
        cas.compareAndSet(current, null);
    }
}
```

lock（) 方法利用的 CAS，当第一个线程 A 获取锁的时候，能够成功获取到，不会进入 while 循环，如果此时线程 A 没有释放锁，另一个线程 B 又来获取锁，此时由于不满足 CAS，所以就会进入 while 循环，不断判断是否满足 CAS，直到 A 线程调用 unlock 方法释放了该锁。

### 自旋锁存在的问题

1. 如果某个线程持有锁的时间过长，就会导致其它等待获取锁的线程进入循环等待，消耗 CPU。使用不当会造成 CPU 使用率极高。
2. 上面 Java 实现的自旋锁不是公平的，即无法满足等待时间最长的线程优先获取锁。不公平的锁就会存在 “线程饥饿” 问题。

### 自旋锁的优点

1. 自旋锁不会使线程状态发生切换，一直处于用户态，即线程一直都是 active 的；不会使线程进入阻塞状态，减少了不必要的上下文切换，执行速度快
2. 非自旋锁在获取不到锁的时候会进入阻塞状态，从而进入内核态，当获取到锁的时候需要从内核态恢复，需要线程上下文切换。 （线程被阻塞后便进入内核（Linux）调度状态，这个会导致系统在用户态与内核态之间来回切换，严重影响锁的性能）

### 可重入的自旋锁和不可重入的自旋锁

文章开始的时候的那段代码，仔细分析一下就可以看出，它是不支持重入的，即当一个线程第一次已经获取到了该锁，在锁释放之前又一次重新获取该锁，第二次就不能成功获取到。由于不满足 CAS，所以第二次获取会进入 while 循环等待，而如果是可重入锁，第二次也是应该能够成功获取到的。

而且，即使第二次能够成功获取，那么当第一次释放锁的时候，第二次获取到的锁也会被释放，而这是不合理的。

为了实现可重入锁，我们需要引入一个计数器，用来记录获取锁的线程数。

```java
public class ReentrantSpinLock {
    private AtomicReference<Thread> cas = new AtomicReference<Thread>();
    private int count;
    public void lock() {
        Thread current = Thread.currentThread();
        if (current == cas.get()) { // 如果当前线程已经获取到了锁，线程数增加一，然后返回
            count++;
            return;
        }
        // 如果没获取到锁，则通过CAS自旋
        while (!cas.compareAndSet(null, current)) {
            // DO nothing
        }
    }
    public void unlock() {
        Thread cur = Thread.currentThread();
        if (cur == cas.get()) {
            if (count > 0) {// 如果大于0，表示当前线程多次获取了该锁，释放锁通过count减一来模拟
                count--;
            } else {// 如果count==0，可以将锁释放，这样就能保证获取锁的次数与释放锁的次数是一致的了。
                cas.compareAndSet(cur, null);
            }
        }
    }
}
```

### 自旋锁的其他变种

#### 1. TicketLock

**TicketLock 主要解决的是公平性的问题。**

思路：每当有线程获取锁的时候，就给该线程分配一个递增的 id，我们称之为排队号，同时，锁对应一个服务号，每当有线程释放锁，服务号就会递增，此时如果服务号与某个线程排队号一致，那么该线程就获得锁，由于排队号是递增的，所以就保证了最先请求获取锁的线程可以最先获取到锁，就实现了公平性。

可以想象成银行办理业务排队，排队的每一个顾客都代表一个需要请求锁的线程，而银行服务窗口表示锁，每当有窗口服务完成就把自己的服务号加一，此时在排队的所有顾客中，只有自己的排队号与服务号一致的才可以得到服务。

实现代码：

```java
public class TicketLock {
    /**
     * 服务号
     */
    private AtomicInteger serviceNum = new AtomicInteger();
    /**
     * 排队号
     */
    private AtomicInteger ticketNum = new AtomicInteger();
    /**
     * lock:获取锁，如果获取成功，返回当前线程的排队号，获取排队号用于释放锁. <br/>
     *
     * @return
     */
    public int lock() {
        int currentTicketNum = ticketNum.incrementAndGet();
        while (currentTicketNum != serviceNum.get()) {
            // Do nothing
        }
        return currentTicketNum;
    }
    /**
     * unlock:释放锁，传入当前持有锁的线程的排队号 <br/>
     *
     * @param ticketnum
     */
    public void unlock(int ticketnum) {
        serviceNum.compareAndSet(ticketnum, ticketnum + 1);
    }
}
```

上面的实现方式是，线程获取锁之后，将它的排队号返回，等该线程释放锁的时候，需要将该排队号传入。但这样是有风险的，因为这个排队号是可以被修改的，一旦排队号被不小心修改了，那么锁将不能被正确释放。一种更好的实现方式如下：

```java
public class TicketLockV2 {
    /**
     * 服务号
     */
    private AtomicInteger serviceNum = new AtomicInteger();
    /**
     * 排队号
     */
    private AtomicInteger ticketNum = new AtomicInteger();
    /**
     * 新增一个ThreadLocal，用于存储每个线程的排队号
     */
    private ThreadLocal<Integer> ticketNumHolder = new ThreadLocal<Integer>();
    public void lock() {
        int currentTicketNum = ticketNum.incrementAndGet();
        // 获取锁的时候，将当前线程的排队号保存起来
        ticketNumHolder.set(currentTicketNum);
        while (currentTicketNum != serviceNum.get()) {
            // Do nothing
        }
    }
    public void unlock() {
        // 释放锁，从ThreadLocal中获取当前线程的排队号
        Integer currentTickNum = ticketNumHolder.get();
        serviceNum.compareAndSet(currentTickNum, currentTickNum + 1);
    }
}
```

上面的实现方式是将每个线程的排队号放到了 ThreadLocal 中。

**TicketLock 存在的问题:**

多处理器系统上，每个进程 / 线程占用的处理器都在读写同一个变量 serviceNum ，每次读写操作都必须在多个处理器缓存之间进行缓存同步，这会导致繁重的系统总线和内存的流量，大大降低系统整体的性能。

> 下面介绍的 MCSLock 和 CLHLock 就是解决这个问题的。

#### 2. CLHLock

CLH 锁是一种基于链表的可扩展、高性能、公平的自旋锁，申请线程只在本地变量上自旋，它不断轮询前驱的状态，如果发现前驱释放了锁就结束自旋，获得锁。

实现代码如下：

```java
import java.util.concurrent.atomic.AtomicReferenceFieldUpdater;
/**
 * CLH的发明人是：Craig，Landin and Hagersten。
 * 代码来源：http://ifeve.com/java_lock_see2/
 */
public class CLHLock {
    /**
     * 定义一个节点，默认的lock状态为true
     */
    public static class CLHNode {
        private volatile boolean isLocked = true;
    }
    /**
     * 尾部节点,只用一个节点即可
     */
    private volatile CLHNode tail;
    private static final ThreadLocal<CLHNode> LOCAL = new ThreadLocal<CLHNode>();
    private static final AtomicReferenceFieldUpdater<CLHLock, CLHNode> UPDATER = AtomicReferenceFieldUpdater.newUpdater(CLHLock.class, CLHNode.class,
            "tail");
    public void lock() {
        // 新建节点并将节点与当前线程保存起来
        CLHNode node = new CLHNode();
        LOCAL.set(node);
        // 将新建的节点设置为尾部节点，并返回旧的节点（原子操作），这里旧的节点实际上就是当前节点的前驱节点
        CLHNode preNode = UPDATER.getAndSet(this, node);
        if (preNode != null) {
            // 前驱节点不为null表示当锁被其他线程占用，通过不断轮询判断前驱节点的锁标志位等待前驱节点释放锁
            while (preNode.isLocked) {
            }
            preNode = null;
            LOCAL.set(node);
        }
        // 如果不存在前驱节点，表示该锁没有被其他线程占用，则当前线程获得锁
    }
    public void unlock() {
        // 获取当前线程对应的节点
        CLHNode node = LOCAL.get();
        // 如果tail节点等于node，则将tail节点更新为null，同时将node的lock状态职位false，表示当前线程释放了锁
        if (!UPDATER.compareAndSet(this, node, null)) {
            node.isLocked = false;
        }
        node = null;
    }
}
```

#### 3. MCSLock

MCSLock 则是对本地变量的节点进行循环。

```java
/**
 * MCS:发明人名字John Mellor-Crummey和Michael Scott
 * 代码来源：http://ifeve.com/java_lock_see2/
 */
public class MCSLock {
    /**
     * 节点，记录当前节点的锁状态以及后驱节点
     */
    public static class MCSNode {
        volatile MCSNode next;
        volatile boolean isLocked = true;
    }
    private static final ThreadLocal<MCSNode> NODE = new ThreadLocal<MCSNode>();
    // 队列
    @SuppressWarnings("unused")
    private volatile MCSNode queue;
    // queue更新器
    private static final AtomicReferenceFieldUpdater<MCSLock, MCSNode> UPDATER = AtomicReferenceFieldUpdater.newUpdater(MCSLock.class, MCSNode.class,
            "queue");
    public void lock() {
        // 创建节点并保存到ThreadLocal中
        MCSNode currentNode = new MCSNode();
        NODE.set(currentNode);
        // 将queue设置为当前节点，并且返回之前的节点
        MCSNode preNode = UPDATER.getAndSet(this, currentNode);
        if (preNode != null) {
            // 如果之前节点不为null，表示锁已经被其他线程持有
            preNode.next = currentNode;
            // 循环判断，直到当前节点的锁标志位为false
            while (currentNode.isLocked) {
            }
        }
    }
    public void unlock() {
        MCSNode currentNode = NODE.get();
        // next为null表示没有正在等待获取锁的线程
        if (currentNode.next == null) {
            // 更新状态并设置queue为null
            if (UPDATER.compareAndSet(this, currentNode, null)) {
                // 如果成功了，表示queue==currentNode,即当前节点后面没有节点了
                return;
            } else {
                // 如果不成功，表示queue!=currentNode,即当前节点后面多了一个节点，表示有线程在等待
                // 如果当前节点的后续节点为null，则需要等待其不为null（参考加锁方法）
                while (currentNode.next == null) {
                }
            }
        } else {
            // 如果不为null，表示有线程在等待获取锁，此时将等待线程对应的节点锁状态更新为false，同时将当前线程的后继节点设为null
            currentNode.next.isLocked = false;
            currentNode.next = null;
        }
    }
}
```

#### 4. CLHLock 和 MCSLock

- 都是基于链表，不同的是 CLHLock 是基于隐式链表，没有真正的后续节点属性，MCSLock 是显示链表，有一个指向后续节点的属性。
- 将获取锁的线程状态借助节点 (node) 保存，每个线程都有一份独立的节点，这样就解决了 TicketLock 多处理器缓存同步的问题。

### 自旋锁与互斥锁

- 自旋锁与互斥锁都是为了实现保护资源共享的机制。
- 无论是自旋锁还是互斥锁，在任意时刻，都最多只能有一个保持者。
- 获取互斥锁的线程，如果锁已经被占用，则该线程将进入睡眠状态；获取自旋锁的线程则不会睡眠，而是一直循环等待锁释放。

### 总结：

- 自旋锁：线程获取锁的时候，如果锁被其他线程持有，则当前线程将循环等待，直到获取到锁。
- 自旋锁等待期间，线程的状态不会改变，线程一直是用户态并且是活动的 (active)。
- 自旋锁如果持有锁的时间太长，则会导致其它等待获取锁的线程耗尽 CPU。
- 自旋锁本身无法保证公平性，同时也无法保证可重入性。
- 基于自旋锁，可以实现具备公平性和可重入性质的锁。
- TicketLock: 采用类似银行排号叫好的方式实现自旋锁的公平性，但是由于不停的读取 serviceNum，每次读写操作都必须在多个处理器缓存之间进行缓存同步，这会导致繁重的系统总线和内存的流量，大大降低系统整体的性能。
- CLHLock 和 MCSLock 通过链表的方式避免了减少了处理器缓存同步，极大的提高了性能，区别在于 CLHLock 是通过轮询其前驱节点的状态，而 MCS 则是查看当前节点的锁状态。
- CLHLock 在 NUMA 架构下使用会存在问题。在没有 cache 的 NUMA 系统架构中，由于 CLHLock 是在当前节点的前一个节点上自旋，NUMA 架构中处理器访问本地内存的速度高于通过网络访问其他节点的内存，所以 CLHLock 在 NUMA 架构上不是最优的自旋锁。

### 参考资料

1. [http://www.searchtb.com/2011/06/spinlock%E5%89%96%E6%9E%90%E4%B8%8E%E6%94%B9%E8%BF%9B.html](http://www.searchtb.com/2011/06/spinlock剖析与改进.html)
2. https://en.wikipedia.org/wiki/Spinlock
3. https://en.wikipedia.org/wiki/Busy_waiting
4. [http://blog.csdn.net/chen77716/article/details/6618779](http://blog.csdn.net/chen77716/article/details/6618779)
5. [http://ifeve.com/java_lock_see4/](http://ifeve.com/java_lock_see4/)
6. [http://ifeve.com/java_lock_see2/](http://ifeve.com/java_lock_see2/)
7. [http://coderbee.net/index.php/concurrent/20131115/577](http://coderbee.net/index.php/concurrent/20131115/577)