# 集合相关面试题

## ArrayList、LinkedList、Vector的区别
## Map、Set、List、Queue、Stack的特点与用法
## HashMap和HashTable的区别
## JDK7与JDK8中HashMap的实现
## HashMap和ConcurrentHashMap的区别, HashMap的底层源码
## ConcurrentHashMap能完全替代HashTable吗
## 为什么HashMap是线程不安全的
## 如何线程安全的使用HashMap
## 多并发情况下HashMap是否还会产生死循环
## TreeMap、HashMap、LindedHashMap的区别

48) List、Set、Map 和 Queue 之间的区别 
49）poll() 方法和 remove() 方法的区别？ 
50）Java 中 LinkedHashMap 和 PriorityQueue 的区别是什么？ 
51）ArrayList 与 LinkedList 的不区别？ 
52）用哪两种方式来实现集合的排序？ 
53）Java 中怎么打印数组？ 
54）Java 中的 LinkedList 是单向链表还是双向链表？ 
55）Java 中的 TreeMap 是采用什么树实现的？ 
56) Hashtable 与 HashMap 有什么不同之处？ 
57）Java 中的 HashSet，内部是如何工作的？ 
58）写一段代码在遍历 ArrayList 时移除一个元素？ 
59）我们能自己写一个容器类，然后使用 for-each 循环码？ 
60）ArrayList 和 HashMap 的默认大小是多数？ 
61）有没有可能两个不相等的对象有有相同的 hashcode？ 
62）两个相同的对象会有不同的的 hash code 吗？ 
63）我们可以在 hashcode() 中使用随机数字吗？ 
64）Java 中，Comparator 与 Comparable 有什么不同？

18.java 容器都有哪些？

19.Collection 和 Collections 有什么区别？

20.List、Set、Map 之间的区别是什么？

21.HashMap 和 Hashtable 有什么区别？

22.如何决定使用 HashMap 还是 TreeMap？

23.说一下 HashMap 的实现原理？

24.说一下 HashSet 的实现原理？

25.ArrayList 和 LinkedList 的区别是什么？

26.如何实现数组和 List 之间的转换？

27.ArrayList 和 Vector 的区别是什么？

28.Array 和 ArrayList 有何区别？

29.在 Queue 中 poll()和 remove()有什么区别？

30.哪些集合类是线程安全的？

31.迭代器 Iterator 是什么？

32.Iterator 怎么使用？有什么特点？

33.Iterator 和 ListIterator 有什么区别？

34.怎么确保一个集合不能被修改？

常用集合类的使用、ArrayList 和 LinkedList 和 Vector 的区别 、SynchronizedList 和 Vector 的区别、HashMap、HashTable、ConcurrentHashMap 区别、

Set 和 List 区别？Set 如何保证元素不重复？

Java 8 中 stream 相关用法、apache 集合处理工具类的使用、不同版本的 JDK 中 HashMap 的实现的区别以及原因

Collection 和 Collections 区别

Arrays.asList 获得的 List 使用时需要注意什么

Enumeration 和 Iterator 区别

fail-fast 和 fail-safe

CopyOnWriteArrayList、ConcurrentSkipListMap

## Iterater和ListIterator之间有什么区别？
- 使用Iterator来遍历Set和List集合, 而ListIterator只能遍历List.
- iterator只可以向前遍历, 而LIstIterator可以双向遍历.
- ListIterator从Iterator接口继承, 然后添加了一些额外的功能, 比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置.

## 通过迭代器fail-fast属性, 你明白了什么？
每次我们尝试获取下一个元素的时候, Iterator fail-fast属性检查当前集合结构里的任何改动.如果发现任何改动, 它抛出ConcurrentModificationException.Collection中所有Iterator的实现都是按fail-fast来设计的（ConcurrentHashMap和CopyOnWriteArrayList这类并发集合类除外）.

## fail-fast与fail-safe有什么区别？
Iterator的fail-fast属性与当前的集合共同起作用, 因此它不会受到集合中任何改动的影响.Java.util包中的所有集合类都被设计为fail-fast的, 而java.util.concurrent中的集合类都为fail-safe的.Fail-fast迭代器抛出ConcurrentModificationException, 而fail-safe迭代器从不抛出ConcurrentModificationException.

## UnsupportedOperationException是什么？
UnsupportedOperationException是用于表明操作不支持的异常.在JDK类中已被大量运用, 在集合框架java.util.Collections.UnmodifiableCollection将会在所有add和remove操作中抛出这个异常.

## 在Java中, HashMap是如何工作的？
HashMap在Map.Entry静态内部类实现中存储key-value对.HashMap使用哈希算法, 在put和get方法中, 它使用hashCode()和equals()方法.当我们通过传递key-value对调用put方法的时候, HashMap使用Key hashCode()和哈希算法来找出存储key-value对的索引.Entry存储在LinkedList中, 所以如果存在entry, 它使用equals()方法来检查传递的key是否已经存在, 如果存在, 它会覆盖value, 如果不存在, 它会创建一个新的entry然后保存.当我们通过传递key调用get方法时, 它再次使用hashCode()来找到数组中的索引, 然后使用equals()方法找出正确的Entry, 然后返回它的值.下面的图片解释了详细内容.

其它关于HashMap比较重要的问题是容量、负荷系数和阀值调整.HashMap默认的初始容量是32, 负荷系数是0.75.阀值是为负荷系数乘以容量, 无论何时我们尝试添加一个entry, 如果map的大小比阀值大的时候, HashMap会对map的内容进行重新哈希, 且使用更大的容量.容量总是2的幂, 所以如果你知道你需要存储大量的key-value对, 比如缓存从数据库里面拉取的数据, 使用正确的容量和负荷系数对HashMap进行初始化是个不错的做法.

## hashCode()和equals()方法有何重要性？
HashMap使用Key对象的hashCode()和equals()方法去决定key-value对的索引.当我们试着从HashMap中获取值的时候, 这些方法也会被用到.如果这些方法没有被正确地实现, 在这种情况下, 两个不同Key也许会产生相同的hashCode()和equals()输出, HashMap将会认为它们是相同的, 然后覆盖它们, 而非把它们存储到不同的地方.同样的, 所有不允许存储重复数据的集合类都使用hashCode()和equals()去查找重复, 所以正确实现它们非常重要.equals()和hashCode()的实现应该遵循以下规则:

- 如果o1.equals(o2)为true, 那么o1.hashCode() == o2.hashCode()总是为true的.
- 如果o1.hashCode() == o2.hashCode(), 并不意味着o1.equals(o2)会为true.

## 如何决定选用HashMap还是TreeMap？
对于在Map中插入、删除和定位元素这类操作, HashMap是最好的选择.然而, 假如你需要对一个有序的key集合进行遍历, TreeMap是更好的选择.基于你的collection的大小, 也许向HashMap中添加元素会更快, 将map换为TreeMap进行有序key的遍历.

## Comparable和Comparator接口是什么？
如果我们想使用Array或Collection的排序方法时, 需要在自定义类里实现Java提供Comparable接口.Comparable接口有compareTo(T OBJ)方法, 它被排序方法所使用.我们应该重写这个方法, 如果“this”对象比传递的对象参数更小、相等或更大时, 它返回一个负整数、0或正整数.但是, 在大多数实际情况下, 我们想根据不同参数进行排序.比如, 作为一个CEO, 我想对雇员基于薪资进行排序, 一个HR想基于年龄对他们进行排序.这就是我们需要使用Comparator接口的情景, 因为Comparable.compareTo(Object o)方法实现只能基于一个字段进行排序, 我们不能根据对象排序的需要选择字段.
Comparator接口的compare(Object o1, Object o2)方法的实现需要传递两个对象参数, 若第一个参数比第二个小, 返回负整数；若第一个等于第二个, 返回0；若第一个比第二个大, 返回正整数.

## 当一个集合被作为参数传递给一个函数时, 如何才可以确保函数不能修改它？
在作为参数传递之前, 我们可以使用**Collections.unmodifiableCollection(Collection c)**方法创建一个只读集合, 这将确保改变集合的任何操作都会抛出UnsupportedOperationException.

## 大写的O是什么？举几个例子？
大写的O描述的是, 就数据结构中的一系列元素而言, 一个算法的性能.Collection类就是实际的数据结构, 我们通常基于时间、内存和性能, 使用大写的O来选择集合实现.
比如:
例子1:ArrayList的get(index i)是一个常量时间操作, 它不依赖list中元素的数量.所以它的性能是O(1).
例子2:一个对于数组或列表的线性搜索的性能是O(n), 因为我们需要遍历所有的元素来查找需要的元素.

## 与Java集合框架相关的有哪些最好的实践？
- 根据需要选择正确的集合类型.比如, 如果指定了大小, 我们会选用Array而非ArrayList.如果我们想根据插入顺序遍历一个Map, 我们需要使用TreeMap.如果我们不想重复, 我们应该使用Set.
- 一些集合类允许指定初始容量, 所以如果我们能够估计到存储元素的数量, 我们可以使用它, 就避免了重新哈希或大小调整.
- 基于接口编程, 而非基于实现编程, 它允许我们后来轻易地改变实现.
- 总是使用类型安全的泛型, 避免在运行时出现ClassCastException.
- 使用JDK提供的不可变类作为Map的key, 可以避免自己实现hashCode()和equals().
- 尽可能使用Collections工具类, 或者获取只读、同步或空的集合, 而非编写自己的实现.它将会提高代码重用性, 它有着更好的稳定性和可维护性.

## HashMap 连环问题

### 你用过HashMap吗？什么是HashMap？你为什么用到它？
HashMap可以接受null键值和值, 而Hashtable则不能；
HashMap是非synchronized;HashMap很快；
以及HashMap储存的是键值对等等.

### 你知道HashMap的工作原理吗？ 你知道HashMap的get()方法的工作原理吗？
HashMap是基于hashing的原理, 我们使用put(key, value)存储对象到HashMap中, 使用get(key)从HashMap中获取对象.
当我们给put()方法传递键和值时, 我们先对键调用hashCode()方法, 返回的hashCode用于找到bucket位置来储存Entry对象.

### 当两个对象的hashcode相同会发生什么？
hashcode相同, 所以它们的bucket位置相同, ‘碰撞’会发生.
因为HashMap使用链表存储对象, 这个Entry(包含有键值对的Map.Entry对象)会存储在链表中.

### 如果两个键的hashcode相同, 你如何获取值对象？
当我们调用get()方法, HashMap会使用键对象的hashcode找到bucket位置, 然后获取值对象.
面试官提醒他如果有两个值对象储存在同一个bucket, 他给出答案:
将会遍历链表直到找到值对象.面试官会问因为你并没有值对象去比较, 你是如何确定确定找到值对象的？除非面试者直到HashMap在链表中存储的是键值对, 否则他们不可能回答出这一题.

其中一些记得这个重要知识点的面试者会说, 找到bucket位置之后, 会调用keys.equals()方法去找到链表中正确的节点, 最终找到要找的值对象.完美的答案！

许多情况下, 面试者会在这个环节中出错, 因为他们混淆了hashCode()和equals()方法.因为在此之前hashCode()屡屡出现, 而equals()方法仅仅在获取值对象的时候才出现.一些优秀的开发者会指出使用不可变的、声明作final的对象, 并且采用合适的equals()和hashCode()方法的话, 将会减少碰撞的发生, 提高效率.不可变性使得能够缓存不同键的hashcode, 这将提高整个获取对象的速度, 使用String, Interger这样的wrapper类作为键是非常好的选择.

### 如果HashMap的大小超过了负载因子(load factor)定义的容量, 怎么办？
默认的负载因子大小为0.75, 也就是说, 当一个map填满了75%的bucket时候, 和其它集合类(如ArrayList等)一样, 将会创建原来HashMap大小的两倍的bucket数组, 来重新调整map的大小, 并将原来的对象放入新的bucket数组中.这个过程叫作rehashing, 因为它调用hash方法找到新的bucket位置.

### 你了解重新调整HashMap大小存在什么问题吗？
可能产生条件竞争(race condition).
当重新调整HashMap大小的时候, 确实存在条件竞争, 因为如果两个线程都发现HashMap需要重新调整大小了, 它们会同时试着调整大小.在调整大小的过程中, 存储在链表中的元素的次序会反过来, 因为移动到新的bucket位置的时候, HashMap并不会将元素放在链表的尾部, 而是放在头部, 这是为了避免尾部遍历(tail traversing).如果条件竞争发生了, 那么就死循环了.这个时候, 你可以质问面试官, 为什么这么奇怪, 要在多线程的环境下使用HashMap呢


### 为什么String, Interger这样的wrapper类适合作为键？ 
String, Interger这样的wrapper类作为HashMap的键是再适合不过了, 而且String最为常用.因为String是不可变的, 也是final的, 而且已经重写了equals()和hashCode()方法了.其他的wrapper类也有这个特点.不可变性是必要的, 因为为了要计算hashCode(), 就要防止键值改变, 如果键值在放入时和获取时返回不同的hashcode的话, 那么就不能从HashMap中找到你想要的对象.不可变性还有其他的优点如线程安全.如果你可以仅仅通过将某个field声明成final就能保证hashCode是不变的, 那么请这么做吧.因为获取对象的时候要用到equals()和hashCode()方法, 那么键对象正确的重写这两个方法是非常重要的.如果两个不相等的对象返回不同的hashcode的话, 那么碰撞的几率就会小些, 这样就能提高HashMap的性能.

### 我们可以使用自定义的对象作为键吗？ 
这是前一个问题的延伸.当然你可能使用任何对象作为键, 只要它遵守了equals()和hashCode()方法的定义规则, 并且当对象插入到Map中之后将不会再改变了.如果这个自定义对象时不可变的, 那么它已经满足了作为键的条件, 因为当它创建之后就已经不能改变了.

### 我们可以使用CocurrentHashMap来代替Hashtable吗？
这是另外一个很热门的面试题, 因为ConcurrentHashMap越来越多人用了.我们知道Hashtable是synchronized的, 但是ConcurrentHashMap同步性能更好, 因为它仅仅根据同步级别对map的一部分进行上锁.ConcurrentHashMap当然可以代替HashTable, 但是HashTable提供更强的线程安全性.

* hashing的概念
* HashMap中解决碰撞的方法
* equals()和hashCode()的应用, 以及它们在HashMap中的重要性
* 不可变对象的好处
* HashMap多线程的条件竞争
* 重新调整HashMap的大小

总结
HashMap的工作原理
HashMap基于hashing原理, 我们通过put()和get()方法储存和获取对象.当我们将键值对传递给put()方法时, 它调用键对象的hashCode()方法来计算hashcode, 让后找到bucket位置来储存值对象.当获取对象时, 通过键对象的equals()方法找到正确的键值对, 然后返回值对象.HashMap使用链表来解决碰撞问题, 当发生碰撞了, 对象将会储存在链表的下一个节点中. HashMap在每个链表节点中储存键值对对象.
当两个不同的键对象的hashcode相同时会发生什么？ 它们会储存在同一个bucket位置的链表中.键对象的equals()方法用来找到键值对.



## 单线程集合
### List
#### ArrayList
![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbeveew8e8j30dc0biglt.jpg)

- 底层基于泛型数组
- 它允许所有元素, 包括null
-  ArrayList 实际上是通过一个数组去保存数据的.当我们构造ArrayList时；若使用默认构造函数, 则ArrayList的默认容量大小是10.
- 当ArrayList容量不足以容纳全部元素时, ArrayList会重新设置容量:新的容量=“(原始容量x3)/2 + 1”.
- ArrayList的克隆函数, 即是将全部元素克隆到一个数组中.
- ArrayList实现java.io.Serializable的方式.当写入到输出流时, 先写入“容量”, 再依次写入“每一个元素”；当读出输入流时, 先读取“容量”, 再依次读取“每一个元素”.

##### 遍历方式
使用迭代器遍历

```java
Integer value = null;
Iterator iter = list.iterator();
while (iter.hasNext()) {
    value = (Integer)iter.next();
}
```

使用 RandomAccess 提供的 get() 方法遍历 (最快)

```java
Integer value = null;
int size = list.size();
for (int i=0; i<size; i++) {
    value = (Integer)list.get(i);        
}
```

foreach

```java
Integer value = null;
for (Integer integ:list) {
    value = integ;
}
```
#### LinkedList
![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbevrl3gkcj30g30j73z0.jpg)

- LinkedList 是一个继承于AbstractSequentialList的双向链表.它也可以被当作堆栈、队列或双端队列进行操作.
- LinkedList 实现 List 接口, 能对它进行队列操作.
- LinkedList 实现 Deque 接口, 即能将LinkedList当作双端队列使用.
- LinkedList 实现了Cloneable接口, 即覆盖了函数clone(), 能克隆.
- LinkedList 实现java.io.Serializable接口, 这意味着LinkedList支持序列化, 能通过序列化去传输.
- LinkedList 是非同步的.

##### 遍历方式

```java
import java.util.List;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.NoSuchElementException;

/*
 * @desc 测试LinkedList的几种遍历方式和效率
 *
 * @author skywang
 */
public class LinkedListThruTest {
    public static void main(String[] args) {
        // 通过Iterator遍历LinkedList
        iteratorLinkedListThruIterator(getLinkedList()) ;
        
        // 通过快速随机访问遍历LinkedList
        iteratorLinkedListThruForeach(getLinkedList()) ;

        // 通过for循环的变种来访问遍历LinkedList
        iteratorThroughFor2(getLinkedList()) ;

        // 通过PollFirst()遍历LinkedList
        iteratorThroughPollFirst(getLinkedList()) ;

        // 通过PollLast()遍历LinkedList
        iteratorThroughPollLast(getLinkedList()) ;

        // 通过removeFirst()遍历LinkedList
        iteratorThroughRemoveFirst(getLinkedList()) ;

        // 通过removeLast()遍历LinkedList
        iteratorThroughRemoveLast(getLinkedList()) ;
    }
    
    private static LinkedList getLinkedList() {
        LinkedList llist = new LinkedList();
        for (int i=0; i<100000; i++)
            llist.addLast(i);

        return llist;
    }
    /**
     * 通过快迭代器遍历LinkedList
     */
    private static void iteratorLinkedListThruIterator(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        
        for(Iterator iter = list.iterator(); iter.hasNext();)
            iter.next();

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorLinkedListThruIterator:" + interval+" ms");
    }

    /**
     * 通过快速随机访问遍历LinkedList
     */
    private static void iteratorLinkedListThruForeach(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        
        int size = list.size();
        for (int i=0; i<size; i++) {
            list.get(i);        
        }
        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorLinkedListThruForeach:" + interval+" ms");
    }

    /**
     * 通过另外一种for循环来遍历LinkedList
     */
    private static void iteratorThroughFor2(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        
        for (Integer integ:list) 
            ;

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorThroughFor2:" + interval+" ms");
    }

    /**
     * 通过pollFirst()来遍历LinkedList
     */
    private static void iteratorThroughPollFirst(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        while(list.pollFirst() != null)
            ;

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorThroughPollFirst:" + interval+" ms");
    }

    /**
     * 通过pollLast()来遍历LinkedList
     */
    private static void iteratorThroughPollLast(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        while(list.pollLast() != null)
            ;

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorThroughPollLast:" + interval+" ms");
    }

    /**
     * 通过removeFirst()来遍历LinkedList
     */
    private static void iteratorThroughRemoveFirst(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        try {
            while(list.removeFirst() != null)
                ;
        } catch (NoSuchElementException e) {
        }

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorThroughRemoveFirst:" + interval+" ms");
    }

    /**
     * 通过removeLast()来遍历LinkedList
     */
    private static void iteratorThroughRemoveLast(LinkedList<Integer> list) {
        if (list == null)
            return ;

        // 记录开始时间
        long start = System.currentTimeMillis();
        try {
            while(list.removeLast() != null)
                ;
        } catch (NoSuchElementException e) {
        }

        // 记录结束时间
        long end = System.currentTimeMillis();
        long interval = end - start;
        System.out.println("iteratorThroughRemoveLast:" + interval+" ms");
    }
}
```
返回结果

```java
iteratorLinkedListThruIterator:8 ms
iteratorLinkedListThruForeach:3724 ms
iteratorThroughFor2:5 ms
iteratorThroughPollFirst:8 ms
iteratorThroughPollLast:6 ms
iteratorThroughRemoveFirst:2 ms
iteratorThroughRemoveLast:2 ms
```

- 采用ArrayList对随机访问比较快, 而for循环中的get()方法, 采用的即是随机访问的方法, 因此在ArrayList里, for循环较快
- 采用LinkedList则是顺序访问比较快, iterator中的next()方法, 采用的即是顺序访问的方法, 因此在LinkedList里, 使用iterator较快
- 从数据结构角度分析,for循环适合访问顺序结构,可以根据下标快速获取指定元素.而Iterator 适合访问链式结构,因为迭代器是通过next()和Pre()来定位的.可以访问没有顺序的集合.

#### Vector
![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbew3veltgj30ec0cgq39.jpg)

- 线程安全
- Vector实际上是通过一个数组去保存数据的.当我们构造Vecotr时；若使用默认构造函数, 则Vector的默认容量大小是10.
- 当Vector容量不足以容纳全部元素时, Vector的容量会增加.若容量增加系数 >0, 则将容量的值增加“容量增加系数”；否则, 将容量大小增加一倍.
- Vector的克隆函数, 即是将全部元素克隆到一个数组中.

##### 遍历方式

```java
import java.util.*;

/*
 * @desc Vector遍历方式和效率的测试程序.
 *
 * @author skywang
 */
public class VectorRandomAccessTest {

    public static void main(String[] args) {
        Vector vec= new Vector();
        for (int i=0; i<100000; i++)
            vec.add(i);
        iteratorThroughRandomAccess(vec) ;
        iteratorThroughIterator(vec) ;
        iteratorThroughFor2(vec) ;
        iteratorThroughEnumeration(vec) ;
    
    }

    private static void isRandomAccessSupported(List list) {
        if (list instanceof RandomAccess) {
            System.out.println("RandomAccess implemented!");
        } else {
            System.out.println("RandomAccess not implemented!");
        }

    }

    public static void iteratorThroughRandomAccess(List list) {

        long startTime;
        long endTime;
        startTime = System.currentTimeMillis();
        for (int i=0; i<list.size(); i++) {
            list.get(i);
        }
        endTime = System.currentTimeMillis();
        long interval = endTime - startTime;
        System.out.println("iteratorThroughRandomAccess:" + interval+" ms");
    }

    public static void iteratorThroughIterator(List list) {

        long startTime;
        long endTime;
        startTime = System.currentTimeMillis();
        for(Iterator iter = list.iterator(); iter.hasNext(); ) {
            iter.next();
        }
        endTime = System.currentTimeMillis();
        long interval = endTime - startTime;
        System.out.println("iteratorThroughIterator:" + interval+" ms");
    }


    public static void iteratorThroughFor2(List list) {

        long startTime;
        long endTime;
        startTime = System.currentTimeMillis();
        for(Object obj:list)
            ;
        endTime = System.currentTimeMillis();
        long interval = endTime - startTime;
        System.out.println("iteratorThroughFor2:" + interval+" ms");
    }

    public static void iteratorThroughEnumeration(Vector vec) {

        long startTime;
        long endTime;
        startTime = System.currentTimeMillis();
        for(Enumeration enu = vec.elements(); enu.hasMoreElements(); ) {
            enu.nextElement();
        }
        endTime = System.currentTimeMillis();
        long interval = endTime - startTime;
        System.out.println("iteratorThroughEnumeration:" + interval+" ms");
    }
}
```
返回结果

```
iteratorThroughRandomAccess:6 ms
iteratorThroughIterator:9 ms
iteratorThroughFor2:8 ms
iteratorThroughEnumeration:7 ms
```

#### List 总结
![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbew9l8evlj30m30eujrz.jpg)

- List 是一个接口, 它继承于Collection的接口.它代表着有序的队列.
- AbstractList 是一个抽象类, 它继承于AbstractCollection.AbstractList实现List接口中除size()、get(int location)之外的函数.
- AbstractSequentialList 是一个抽象类, 它继承于AbstractList.AbstractSequentialList 实现了“链表中, 根据index索引值操作链表的全部函数”.
- ArrayList, LinkedList, Vector, Stack是List的4个实现类.
    - ArrayList 是一个数组队列, 相当于动态数组.它由数组实现, 随机访问效率高, 随机插入、随机删除效率低.
    - LinkedList 是一个双向链表.它也可以被当作堆栈、队列或双端队列进行操作.LinkedList随机访问效率低, 但随机插入、随机删除效率低.
    - Vector 是矢量队列, 和ArrayList一样, 它也是一个动态数组, 由数组实现.但是ArrayList是非线程安全的, 而Vector是线程安全的.
     - Stack 是栈, 它继承于Vector.它的特性是:先进后出(FILO, First In Last Out).
     
##### 使用特点
如果涉及到“栈”、“队列”、“链表”等操作, 应该考虑用List, 具体的选择哪个List, 根据下面的标准来取舍.

- 对于需要快速插入, 删除元素, 应该使用LinkedList.
- 对于需要快速随机访问元素, 应该使用ArrayList.
- 对于“单线程环境” 或者 “多线程环境, 但List仅仅只会被单个线程操作”, 此时应该使用非同步的类(如ArrayList).
- 对于“多线程环境, 且List可能同时被多个线程操作”, 此时, 应该使用同步的类(如Vector).

##### ArrayList 和 LinkedList 比较
**LinkedList中插入元素很快, 而ArrayList中插入元素很慢！**

>LinkedList: 通过add(int index, E element)向LinkedList插入元素时.先是在双向链表中找到要插入节点的位置index；找到之后, 再插入一个新节点.
双向链表查找index位置的节点时, 有一个加速动作:若index < 双向链表长度的1/2, 则从前向后查找; 否则, 从后向前查找.

>ArrayList: ensureCapacity(size+1) 的作用是“确认ArrayList的容量, 若容量不够, 则增加容量.”
真正耗时的操作是 System.arraycopy(elementData, index, elementData, index + 1, size - index);

>System.arraycopy(elementData, index, elementData, index + 1, size - index); 会移动index之后所有元素即可.这就意味着, ArrayList的add(int index, E element)函数, 会引起index之后所有元素的改变！


**LinkedList中随机访问很慢, 而ArrayList中随机访问很快**

>LinkedList: 通过get(int index)获取LinkedList第index个元素时.先是在双向链表中找到要index位置的元素；找到之后再返回.
双向链表查找index位置的节点时, 有一个加速动作:若index < 双向链表长度的1/2, 则从前向后查找; 否则, 从后向前查找.

>ArrayList: 通过get(int index)获取ArrayList第index个元素时.直接返回数组中index位置的元素, 而不需要像LinkedList一样进行查找.

##### Vector和ArrayList比较
相同之处:

- 它们都继承于AbstractList, 并且实现List接口.

```java
// ArrayList的定义
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
// Vector的定义
public class Vector<E> extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable {}
```

- 它们都实现了RandomAccess和Cloneable接口
- 它们都是通过数组实现的, 本质上都是动态数组
- 它们的默认数组容量是10
- 它们都支持Iterator和listIterator遍历

不同之处:

- 线程安全性不一样,ArrayList适用于单线程, Vector适用于多线程
- 构造函数个数不同
- 容量增加方式不同
    - 逐个添加元素时, 若ArrayList容量不足时, “新的容量”=“(原始容量x3)/2 + 1”.
    - Vector
        - 增长系数 > 0 时 :“新的容量”=“原始容量+增长系数”
        - 增长系数 <= 0 时: “新的容量”=“原始容量 x 2”
-  对Enumeration的支持不同.Vector支持通过Enumeration去遍历, 而List不支持

### Map
![](https://ww4.sinaimg.cn/large/006tKfTcgw1fbewpd4x40j30lm09sjro.jpg)

- Map 是映射接口, Map中存储的内容是键值对(key-value).
- AbstractMap 是继承于Map的抽象类, 它实现了Map中的大部分API.其它Map的实现类可以通过继承AbstractMap来减少重复编码.
- SortedMap 是继承于Map的接口.SortedMap中的内容是排序的键值对, 排序的方法是通过比较器(Comparator).
- NavigableMap 是继承于SortedMap的接口.相比于SortedMap, NavigableMap有一系列的导航方法；如"获取大于/等于某对象的键值对"、“获取小于/等于某对象的键值对”等等.
- TreeMap 继承于AbstractMap, 且实现了NavigableMap接口；因此, TreeMap中的内容是“有序的键值对”！
- HashMap 继承于AbstractMap, 但没实现NavigableMap接口；因此, HashMap的内容是“键值对, 但不保证次序”！
- Hashtable 虽然不是继承于AbstractMap, 但它继承于Dictionary(Dictionary也是键值对的接口), 而且也实现Map接口；因此, Hashtable的内容也是“键值对, 也不保证次序”.但和HashMap相比, Hashtable是线程安全的, 而且它支持通过Enumeration去遍历.
- WeakHashMap 继承于AbstractMap.它和HashMap的键类型不同, WeakHashMap的键是“弱键”.

在 JDK1.6中,新添加的节点是放在头节点, JDK1.8则是放在尾节点的
JDK1.8中,如果链表足够大时,将自动转换成红黑树保存

#### API

```java
abstract void                 clear()
abstract boolean              containsKey(Object key)
abstract boolean              containsValue(Object value)
abstract Set<Entry<K, V>>     entrySet()
abstract boolean              equals(Object object)
abstract V                    get(Object key)
abstract int                  hashCode()
abstract boolean              isEmpty()
abstract Set<K>               keySet()
abstract V                    put(K key, V value)
abstract void                 putAll(Map<? extends K, ? extends V> map)
abstract V                    remove(Object key)
abstract int                  size()
abstract Collection<V>        values()
```

说明:

- Map提供接口分别用于返回 键集、值集或键-值映射关系集.
    - entrySet()用于返回键-值集的Set集合
    - keySet()用于返回键集的Set集合
    - values()用户返回值集的Collection集合
- 因为Map中不能包含重复的键；每个键最多只能映射到一个值.所以, 键-值集、键集都是Set, 值集时Collection.
- Map提供了“键-值对”、“根据键获取值”、“删除键”、“获取容量大小”等方法.

#### HashMap
HashMap 是一个散列表, 它存储的内容是键值对(key-value)映射.
HashMap 继承于AbstractMap, 实现了Map、Cloneable、java.io.Serializable接口.
HashMap 的实现不是同步的, 这意味着它不是线程安全的.它的key、value都可以为null.此外, HashMap中的映射不是有序的.

HashMap 的实例有两个参数影响其性能:“初始容量” 和 “加载因子”.容量 是哈希表中桶的数量, 初始容量 只是哈希表在创建时的容量.加载因子 是哈希表在其容量自动增加之前可以达到多满的一种尺度.当哈希表中的条目数超出了加载因子与当前容量的乘积时, 则要对该哈希表进行 rehash 操作（即重建内部数据结构）, 从而哈希表将具有大约两倍的桶数.
通常, 默认加载因子是 0.75, 这是在时间和空间成本上寻求一种折衷.加载因子过高虽然减少了空间开销, 但同时也增加了查询成本（在大多数 HashMap 类的操作中, 包括 get 和 put 操作, 都反映了这一点）.在设置初始容量时应该考虑到映射中所需的条目数及其加载因子, 以便最大限度地减少 rehash 操作次数.如果初始容量大于最大条目数除以加载因子, 则不会发生 rehash 操作.

![](https://ww4.sinaimg.cn/large/006tKfTcgw1fbfmfc7zjfj30cv0fk74k.jpg)

```java
package java.util;
import java.io.*;

public class HashMap<K,V>
    extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable
{

    // 默认的初始容量是16, 必须是2的幂.
    static final int DEFAULT_INITIAL_CAPACITY = 16;

    // 最大容量（必须是2的幂且小于2的30次方, 传入容量过大将被这个值替换）
    static final int MAXIMUM_CAPACITY = 1 << 30;

    // 默认加载因子
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    // 存储数据的Entry数组, 长度是2的幂.
    // HashMap是采用拉链法实现的, 每一个Entry本质上是一个单向链表
    transient Entry[] table;

    // HashMap的大小, 它是HashMap保存的键值对的数量
    transient int size;

    // HashMap的阈值, 用于判断是否需要调整HashMap的容量（threshold = 容量*加载因子）
    int threshold;

    // 加载因子实际大小
    final float loadFactor;

    // HashMap被改变的次数
    transient volatile int modCount;

    // 指定“容量大小”和“加载因子”的构造函数
    public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        // HashMap的最大容量只能是MAXIMUM_CAPACITY
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);

        // 找出“大于initialCapacity”的最小的2的幂
        int capacity = 1;
        while (capacity < initialCapacity)
            capacity <<= 1;

        // 设置“加载因子”
        this.loadFactor = loadFactor;
        // 设置“HashMap阈值”, 当HashMap中存储数据的数量达到threshold时, 就需要将HashMap的容量加倍.
        threshold = (int)(capacity * loadFactor);
        // 创建Entry数组, 用来保存数据
        table = new Entry[capacity];
        init();
    }


    // 指定“容量大小”的构造函数
    public HashMap(int initialCapacity) {
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }

    // 默认构造函数.
    public HashMap() {
        // 设置“加载因子”
        this.loadFactor = DEFAULT_LOAD_FACTOR;
        // 设置“HashMap阈值”, 当HashMap中存储数据的数量达到threshold时, 就需要将HashMap的容量加倍.
        threshold = (int)(DEFAULT_INITIAL_CAPACITY * DEFAULT_LOAD_FACTOR);
        // 创建Entry数组, 用来保存数据
        table = new Entry[DEFAULT_INITIAL_CAPACITY];
        init();
    }

    // 包含“子Map”的构造函数
    public HashMap(Map<? extends K, ? extends V> m) {
        this(Math.max((int) (m.size() / DEFAULT_LOAD_FACTOR) + 1,
                      DEFAULT_INITIAL_CAPACITY), DEFAULT_LOAD_FACTOR);
        // 将m中的全部元素逐个添加到HashMap中
        putAllForCreate(m);
    }

    static int hash(int h) {
        h ^= (h >>> 20) ^ (h >>> 12);
        return h ^ (h >>> 7) ^ (h >>> 4);
    }

    // 返回索引值
    // h & (length-1)保证返回值的小于length
    static int indexFor(int h, int length) {
        return h & (length-1);
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    // 获取key对应的value
    public V get(Object key) {
        if (key == null)
            return getForNullKey();
        // 获取key的hash值
        int hash = hash(key.hashCode());
        // 在“该hash值对应的链表”上查找“键值等于key”的元素
        for (Entry<K,V> e = table[indexFor(hash, table.length)];
             e != null;
             e = e.next) {
            Object k;
            if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
                return e.value;
        }
        return null;
    }

    // 获取“key为null”的元素的值
    // HashMap将“key为null”的元素存储在table[0]位置！
    private V getForNullKey() {
        for (Entry<K,V> e = table[0]; e != null; e = e.next) {
            if (e.key == null)
                return e.value;
        }
        return null;
    }

    // HashMap是否包含key
    public boolean containsKey(Object key) {
        return getEntry(key) != null;
    }

    // 返回“键为key”的键值对
    final Entry<K,V> getEntry(Object key) {
        // 获取哈希值
        // HashMap将“key为null”的元素存储在table[0]位置, “key不为null”的则调用hash()计算哈希值
        int hash = (key == null) ? 0 : hash(key.hashCode());
        // 在“该hash值对应的链表”上查找“键值等于key”的元素
        for (Entry<K,V> e = table[indexFor(hash, table.length)];
             e != null;
             e = e.next) {
            Object k;
            if (e.hash == hash &&
                ((k = e.key) == key || (key != null && key.equals(k))))
                return e;
        }
        return null;
    }

    // 将“key-value”添加到HashMap中
    public V put(K key, V value) {
        // 若“key为null”, 则将该键值对添加到table[0]中.
        if (key == null)
            return putForNullKey(value);
        // 若“key不为null”, 则计算该key的哈希值, 然后将其添加到该哈希值对应的链表中.
        int hash = hash(key.hashCode());
        int i = indexFor(hash, table.length);
        for (Entry<K,V> e = table[i]; e != null; e = e.next) {
            Object k;
            // 若“该key”对应的键值对已经存在, 则用新的value取代旧的value.然后退出！
            if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
                V oldValue = e.value;
                e.value = value;
                e.recordAccess(this);
                return oldValue;
            }
        }

        // 若“该key”对应的键值对不存在, 则将“key-value”添加到table中
        modCount++;
        addEntry(hash, key, value, i);
        return null;
    }

    // putForNullKey()的作用是将“key为null”键值对添加到table[0]位置
    private V putForNullKey(V value) {
        for (Entry<K,V> e = table[0]; e != null; e = e.next) {
            if (e.key == null) {
                V oldValue = e.value;
                e.value = value;
                e.recordAccess(this);
                return oldValue;
            }
        }
        // 这里的完全不会被执行到!
        modCount++;
        addEntry(0, null, value, 0);
        return null;
    }

    // 创建HashMap对应的“添加方法”, 
    // 它和put()不同.putForCreate()是内部方法, 它被构造函数等调用, 用来创建HashMap
    // 而put()是对外提供的往HashMap中添加元素的方法.
    private void putForCreate(K key, V value) {
        int hash = (key == null) ? 0 : hash(key.hashCode());
        int i = indexFor(hash, table.length);

        // 若该HashMap表中存在“键值等于key”的元素, 则替换该元素的value值
        for (Entry<K,V> e = table[i]; e != null; e = e.next) {
            Object k;
            if (e.hash == hash &&
                ((k = e.key) == key || (key != null && key.equals(k)))) {
                e.value = value;
                return;
            }
        }

        // 若该HashMap表中不存在“键值等于key”的元素, 则将该key-value添加到HashMap中
        createEntry(hash, key, value, i);
    }

    // 将“m”中的全部元素都添加到HashMap中.
    // 该方法被内部的构造HashMap的方法所调用.
    private void putAllForCreate(Map<? extends K, ? extends V> m) {
        // 利用迭代器将元素逐个添加到HashMap中
        for (Iterator<? extends Map.Entry<? extends K, ? extends V>> i = m.entrySet().iterator(); i.hasNext(); ) {
            Map.Entry<? extends K, ? extends V> e = i.next();
            putForCreate(e.getKey(), e.getValue());
        }
    }

    // 重新调整HashMap的大小, newCapacity是调整后的单位
    void resize(int newCapacity) {
        Entry[] oldTable = table;
        int oldCapacity = oldTable.length;
        if (oldCapacity == MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return;
        }

        // 新建一个HashMap, 将“旧HashMap”的全部元素添加到“新HashMap”中, 
        // 然后, 将“新HashMap”赋值给“旧HashMap”.
        Entry[] newTable = new Entry[newCapacity];
        transfer(newTable);
        table = newTable;
        threshold = (int)(newCapacity * loadFactor);
    }

    // 将HashMap中的全部元素都添加到newTable中
    void transfer(Entry[] newTable) {
        Entry[] src = table;
        int newCapacity = newTable.length;
        for (int j = 0; j < src.length; j++) {
            Entry<K,V> e = src[j];
            if (e != null) {
                src[j] = null;
                do {
                    Entry<K,V> next = e.next;
                    int i = indexFor(e.hash, newCapacity);
                    e.next = newTable[i];
                    newTable[i] = e;
                    e = next;
                } while (e != null);
            }
        }
    }

    // 将"m"的全部元素都添加到HashMap中
    public void putAll(Map<? extends K, ? extends V> m) {
        // 有效性判断
        int numKeysToBeAdded = m.size();
        if (numKeysToBeAdded == 0)
            return;

        // 计算容量是否足够, 
        // 若“当前实际容量 < 需要的容量”, 则将容量x2.
        if (numKeysToBeAdded > threshold) {
            int targetCapacity = (int)(numKeysToBeAdded / loadFactor + 1);
            if (targetCapacity > MAXIMUM_CAPACITY)
                targetCapacity = MAXIMUM_CAPACITY;
            int newCapacity = table.length;
            while (newCapacity < targetCapacity)
                newCapacity <<= 1;
            if (newCapacity > table.length)
                resize(newCapacity);
        }

        // 通过迭代器, 将“m”中的元素逐个添加到HashMap中.
        for (Iterator<? extends Map.Entry<? extends K, ? extends V>> i = m.entrySet().iterator(); i.hasNext(); ) {
            Map.Entry<? extends K, ? extends V> e = i.next();
            put(e.getKey(), e.getValue());
        }
    }

    // 删除“键为key”元素
    public V remove(Object key) {
        Entry<K,V> e = removeEntryForKey(key);
        return (e == null ? null : e.value);
    }

    // 删除“键为key”的元素
    final Entry<K,V> removeEntryForKey(Object key) {
        // 获取哈希值.若key为null, 则哈希值为0；否则调用hash()进行计算
        int hash = (key == null) ? 0 : hash(key.hashCode());
        int i = indexFor(hash, table.length);
        Entry<K,V> prev = table[i];
        Entry<K,V> e = prev;

        // 删除链表中“键为key”的元素
        // 本质是“删除单向链表中的节点”
        while (e != null) {
            Entry<K,V> next = e.next;
            Object k;
            if (e.hash == hash &&
                ((k = e.key) == key || (key != null && key.equals(k)))) {
                modCount++;
                size--;
                if (prev == e)
                    table[i] = next;
                else
                    prev.next = next;
                e.recordRemoval(this);
                return e;
            }
            prev = e;
            e = next;
        }

        return e;
    }

    // 删除“键值对”
    final Entry<K,V> removeMapping(Object o) {
        if (!(o instanceof Map.Entry))
            return null;

        Map.Entry<K,V> entry = (Map.Entry<K,V>) o;
        Object key = entry.getKey();
        int hash = (key == null) ? 0 : hash(key.hashCode());
        int i = indexFor(hash, table.length);
        Entry<K,V> prev = table[i];
        Entry<K,V> e = prev;

        // 删除链表中的“键值对e”
        // 本质是“删除单向链表中的节点”
        while (e != null) {
            Entry<K,V> next = e.next;
            if (e.hash == hash && e.equals(entry)) {
                modCount++;
                size--;
                if (prev == e)
                    table[i] = next;
                else
                    prev.next = next;
                e.recordRemoval(this);
                return e;
            }
            prev = e;
            e = next;
        }

        return e;
    }

    // 清空HashMap, 将所有的元素设为null
    public void clear() {
        modCount++;
        Entry[] tab = table;
        for (int i = 0; i < tab.length; i++)
            tab[i] = null;
        size = 0;
    }

    // 是否包含“值为value”的元素
    public boolean containsValue(Object value) {
    // 若“value为null”, 则调用containsNullValue()查找
    if (value == null)
            return containsNullValue();

    // 若“value不为null”, 则查找HashMap中是否有值为value的节点.
    Entry[] tab = table;
        for (int i = 0; i < tab.length ; i++)
            for (Entry e = tab[i] ; e != null ; e = e.next)
                if (value.equals(e.value))
                    return true;
    return false;
    }

    // 是否包含null值
    private boolean containsNullValue() {
    Entry[] tab = table;
        for (int i = 0; i < tab.length ; i++)
            for (Entry e = tab[i] ; e != null ; e = e.next)
                if (e.value == null)
                    return true;
    return false;
    }

    // 克隆一个HashMap, 并返回Object对象
    public Object clone() {
        HashMap<K,V> result = null;
        try {
            result = (HashMap<K,V>)super.clone();
        } catch (CloneNotSupportedException e) {
            // assert false;
        }
        result.table = new Entry[table.length];
        result.entrySet = null;
        result.modCount = 0;
        result.size = 0;
        result.init();
        // 调用putAllForCreate()将全部元素添加到HashMap中
        result.putAllForCreate(this);

        return result;
    }

    // Entry是单向链表.
    // 它是 “HashMap链式存储法”对应的链表.
    // 它实现了Map.Entry 接口, 即实现getKey(), getValue(), setValue(V value), equals(Object o), hashCode()这些函数
    static class Entry<K,V> implements Map.Entry<K,V> {
        final K key;
        V value;
        // 指向下一个节点
        Entry<K,V> next;
        final int hash;

        // 构造函数.
        // 输入参数包括"哈希值(h)", "键(k)", "值(v)", "下一节点(n)"
        Entry(int h, K k, V v, Entry<K,V> n) {
            value = v;
            next = n;
            key = k;
            hash = h;
        }

        public final K getKey() {
            return key;
        }

        public final V getValue() {
            return value;
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }

        // 判断两个Entry是否相等
        // 若两个Entry的“key”和“value”都相等, 则返回true.
        // 否则, 返回false
        public final boolean equals(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry e = (Map.Entry)o;
            Object k1 = getKey();
            Object k2 = e.getKey();
            if (k1 == k2 || (k1 != null && k1.equals(k2))) {
                Object v1 = getValue();
                Object v2 = e.getValue();
                if (v1 == v2 || (v1 != null && v1.equals(v2)))
                    return true;
            }
            return false;
        }

        // 实现hashCode()
        public final int hashCode() {
            return (key==null   ? 0 : key.hashCode()) ^
                   (value==null ? 0 : value.hashCode());
        }

        public final String toString() {
            return getKey() + "=" + getValue();
        }

        // 当向HashMap中添加元素时, 绘调用recordAccess().
        // 这里不做任何处理
        void recordAccess(HashMap<K,V> m) {
        }

        // 当从HashMap中删除元素时, 绘调用recordRemoval().
        // 这里不做任何处理
        void recordRemoval(HashMap<K,V> m) {
        }
    }

    // 新增Entry.将“key-value”插入指定位置, bucketIndex是位置索引.
    void addEntry(int hash, K key, V value, int bucketIndex) {
        // 保存“bucketIndex”位置的值到“e”中
        Entry<K,V> e = table[bucketIndex];
        // 设置“bucketIndex”位置的元素为“新Entry”, 
        // 设置“e”为“新Entry的下一个节点”
        table[bucketIndex] = new Entry<K,V>(hash, key, value, e);
        // 若HashMap的实际大小 不小于 “阈值”, 则调整HashMap的大小
        if (size++ >= threshold)
            resize(2 * table.length);
    }

    // 创建Entry.将“key-value”插入指定位置, bucketIndex是位置索引.
    // 它和addEntry的区别是:
    // (01) addEntry()一般用在 新增Entry可能导致“HashMap的实际容量”超过“阈值”的情况下.
    //   例如, 我们新建一个HashMap, 然后不断通过put()向HashMap中添加元素；
    // put()是通过addEntry()新增Entry的.
    //   在这种情况下, 我们不知道何时“HashMap的实际容量”会超过“阈值”；
    //   因此, 需要调用addEntry()
    // (02) createEntry() 一般用在 新增Entry不会导致“HashMap的实际容量”超过“阈值”的情况下.
    //   例如, 我们调用HashMap“带有Map”的构造函数, 它绘将Map的全部元素添加到HashMap中；
    // 但在添加之前, 我们已经计算好“HashMap的容量和阈值”.也就是, 可以确定“即使将Map中
    // 的全部元素添加到HashMap中, 都不会超过HashMap的阈值”.
    //   此时, 调用createEntry()即可.
    void createEntry(int hash, K key, V value, int bucketIndex) {
        // 保存“bucketIndex”位置的值到“e”中
        Entry<K,V> e = table[bucketIndex];
        // 设置“bucketIndex”位置的元素为“新Entry”, 
        // 设置“e”为“新Entry的下一个节点”
        table[bucketIndex] = new Entry<K,V>(hash, key, value, e);
        size++;
    }

    // HashIterator是HashMap迭代器的抽象出来的父类, 实现了公共了函数.
    // 它包含“key迭代器(KeyIterator)”、“Value迭代器(ValueIterator)”和“Entry迭代器(EntryIterator)”3个子类.
    private abstract class HashIterator<E> implements Iterator<E> {
        // 下一个元素
        Entry<K,V> next;
        // expectedModCount用于实现fast-fail机制.
        int expectedModCount;
        // 当前索引
        int index;
        // 当前元素
        Entry<K,V> current;

        HashIterator() {
            expectedModCount = modCount;
            if (size > 0) { // advance to first entry
                Entry[] t = table;
                // 将next指向table中第一个不为null的元素.
                // 这里利用了index的初始值为0, 从0开始依次向后遍历, 直到找到不为null的元素就退出循环.
                while (index < t.length && (next = t[index++]) == null)
                    ;
            }
        }

        public final boolean hasNext() {
            return next != null;
        }

        // 获取下一个元素
        final Entry<K,V> nextEntry() {
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            Entry<K,V> e = next;
            if (e == null)
                throw new NoSuchElementException();

            // 注意！！！
            // 一个Entry就是一个单向链表
            // 若该Entry的下一个节点不为空, 就将next指向下一个节点;
            // 否则, 将next指向下一个链表(也是下一个Entry)的不为null的节点.
            if ((next = e.next) == null) {
                Entry[] t = table;
                while (index < t.length && (next = t[index++]) == null)
                    ;
            }
            current = e;
            return e;
        }

        // 删除当前元素
        public void remove() {
            if (current == null)
                throw new IllegalStateException();
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            Object k = current.key;
            current = null;
            HashMap.this.removeEntryForKey(k);
            expectedModCount = modCount;
        }

    }

    // value的迭代器
    private final class ValueIterator extends HashIterator<V> {
        public V next() {
            return nextEntry().value;
        }
    }

    // key的迭代器
    private final class KeyIterator extends HashIterator<K> {
        public K next() {
            return nextEntry().getKey();
        }
    }

    // Entry的迭代器
    private final class EntryIterator extends HashIterator<Map.Entry<K,V>> {
        public Map.Entry<K,V> next() {
            return nextEntry();
        }
    }

    // 返回一个“key迭代器”
    Iterator<K> newKeyIterator()   {
        return new KeyIterator();
    }
    // 返回一个“value迭代器”
    Iterator<V> newValueIterator()   {
        return new ValueIterator();
    }
    // 返回一个“entry迭代器”
    Iterator<Map.Entry<K,V>> newEntryIterator()   {
        return new EntryIterator();
    }

    // HashMap的Entry对应的集合
    private transient Set<Map.Entry<K,V>> entrySet = null;

    // 返回“key的集合”, 实际上返回一个“KeySet对象”
    public Set<K> keySet() {
        Set<K> ks = keySet;
        return (ks != null ? ks : (keySet = new KeySet()));
    }

    // Key对应的集合
    // KeySet继承于AbstractSet, 说明该集合中没有重复的Key.
    private final class KeySet extends AbstractSet<K> {
        public Iterator<K> iterator() {
            return newKeyIterator();
        }
        public int size() {
            return size;
        }
        public boolean contains(Object o) {
            return containsKey(o);
        }
        public boolean remove(Object o) {
            return HashMap.this.removeEntryForKey(o) != null;
        }
        public void clear() {
            HashMap.this.clear();
        }
    }

    // 返回“value集合”, 实际上返回的是一个Values对象
    public Collection<V> values() {
        Collection<V> vs = values;
        return (vs != null ? vs : (values = new Values()));
    }

    // “value集合”
    // Values继承于AbstractCollection, 不同于“KeySet继承于AbstractSet”, 
    // Values中的元素能够重复.因为不同的key可以指向相同的value.
    private final class Values extends AbstractCollection<V> {
        public Iterator<V> iterator() {
            return newValueIterator();
        }
        public int size() {
            return size;
        }
        public boolean contains(Object o) {
            return containsValue(o);
        }
        public void clear() {
            HashMap.this.clear();
        }
    }

    // 返回“HashMap的Entry集合”
    public Set<Map.Entry<K,V>> entrySet() {
        return entrySet0();
    }

    // 返回“HashMap的Entry集合”, 它实际是返回一个EntrySet对象
    private Set<Map.Entry<K,V>> entrySet0() {
        Set<Map.Entry<K,V>> es = entrySet;
        return es != null ? es : (entrySet = new EntrySet());
    }

    // EntrySet对应的集合
    // EntrySet继承于AbstractSet, 说明该集合中没有重复的EntrySet.
    private final class EntrySet extends AbstractSet<Map.Entry<K,V>> {
        public Iterator<Map.Entry<K,V>> iterator() {
            return newEntryIterator();
        }
        public boolean contains(Object o) {
            if (!(o instanceof Map.Entry))
                return false;
            Map.Entry<K,V> e = (Map.Entry<K,V>) o;
            Entry<K,V> candidate = getEntry(e.getKey());
            return candidate != null && candidate.equals(e);
        }
        public boolean remove(Object o) {
            return removeMapping(o) != null;
        }
        public int size() {
            return size;
        }
        public void clear() {
            HashMap.this.clear();
        }
    }

    // java.io.Serializable的写入函数
    // 将HashMap的“总的容量, 实际容量, 所有的Entry”都写入到输出流中
    private void writeObject(java.io.ObjectOutputStream s)
        throws IOException
    {
        Iterator<Map.Entry<K,V>> i =
            (size > 0) ? entrySet0().iterator() : null;

        // Write out the threshold, loadfactor, and any hidden stuff
        s.defaultWriteObject();

        // Write out number of buckets
        s.writeInt(table.length);

        // Write out size (number of Mappings)
        s.writeInt(size);

        // Write out keys and values (alternating)
        if (i != null) {
            while (i.hasNext()) {
            Map.Entry<K,V> e = i.next();
            s.writeObject(e.getKey());
            s.writeObject(e.getValue());
            }
        }
    }


    private static final long serialVersionUID = 362498820763181265L;

    // java.io.Serializable的读取函数:根据写入方式读出
    // 将HashMap的“总的容量, 实际容量, 所有的Entry”依次读出
    private void readObject(java.io.ObjectInputStream s)
         throws IOException, ClassNotFoundException
    {
        // Read in the threshold, loadfactor, and any hidden stuff
        s.defaultReadObject();

        // Read in number of buckets and allocate the bucket array;
        int numBuckets = s.readInt();
        table = new Entry[numBuckets];

        init();  // Give subclass a chance to do its thing.

        // Read in size (number of Mappings)
        int size = s.readInt();

        // Read the keys and values, and put the mappings in the HashMap
        for (int i=0; i<size; i++) {
            K key = (K) s.readObject();
            V value = (V) s.readObject();
            putForCreate(key, value);
        }
    }

    // 返回“HashMap总的容量”
    int   capacity()     { return table.length; }
    // 返回“HashMap的加载因子”
    float loadFactor()   { return loadFactor;   }
}
```

##### 遍历
遍历HashMap的键值对:

```java
// 假设map是HashMap对象
// map中的key是String类型, value是Integer类型
Integer integ = null;
Iterator iter = map.entrySet().iterator();
while(iter.hasNext()) {
    Map.Entry entry = (Map.Entry)iter.next();
    // 获取key
    key = (String)entry.getKey();
        // 获取value
    integ = (Integer)entry.getValue();
}
```

遍历HashMap的键

```java
// 假设map是HashMap对象
// map中的key是String类型, value是Integer类型
String key = null;
Integer integ = null;
Iterator iter = map.keySet().iterator();
while (iter.hasNext()) {
        // 获取key
    key = (String)iter.next();
        // 根据key, 获取value
    integ = (Integer)map.get(key);
}
```

遍历HashMap的值

```java
// 假设map是HashMap对象
// map中的key是String类型, value是Integer类型
Integer value = null;
Collection c = map.values();
Iterator iter= c.iterator();
while (iter.hasNext()) {
    value = (Integer)iter.next();
}
```

#### EnumMap
#### LinkedHashMap
#### TreeMap
- TreeMap 是一个有序的key-value集合, 它是通过红黑树实现的.
- TreeMap 继承于AbstractMap, 所以它是一个Map, 即一个key-value集合.
- TreeMap 实现了NavigableMap接口, 意味着它支持一系列的导航方法.比如返回有序的key集合.
- TreeMap 实现了Cloneable接口, 意味着它能被克隆.
- TreeMap 实现了java.io.Serializable接口, 意味着它支持序列化.

TreeMap基于红黑树（Red-Black tree）实现.该映射根据其键的自然顺序进行排序, 或者根据创建映射时提供的 Comparator 进行排序, 具体取决于使用的构造方法.
TreeMap的基本操作 containsKey、get、put 和 remove 的时间复杂度是 log(n) .
另外, TreeMap是非同步的. 它的iterator 方法返回的迭代器是fail-fastl的.

![](https://ww1.sinaimg.cn/large/006tKfTcgw1fbfmrdz22fj308c0j10t0.jpg)

- TreeMap实现继承于AbstractMap, 并且实现了NavigableMap接口.
- TreeMap的本质是R-B Tree(红黑树), 它包含几个重要的成员变量: root, size, comparator.root 是红黑数的根节点.它是Entry类型, Entry是红黑数的节点, 它包含了红黑数的6个基本组成成分:key(键)、value(值)、left(左孩子)、right(右孩子)、parent(父节点)、color(颜色).Entry节点根据key进行排序, Entry节点包含的内容为value. 
- 红黑数排序时, 根据Entry中的key进行排序；Entry中的key比较大小是根据比较器comparator来进行判断的.
- size是红黑数中节点的个数.

#### WeakHashMap
- WeakHashMap 继承于AbstractMap, 实现了Map接口.
- 和HashMap一样, WeakHashMap 也是一个散列表, 它存储的内容也是键值对(key-value)映射, 而且键和值都可以是null.
- 不过WeakHashMap的键是“弱键”.在 WeakHashMap 中, 当某个键不再正常使用时, 会被从WeakHashMap中被自动移除.更精确地说, 对于一个给定的键, 其映射的存在并不阻止垃圾回收器对该键的丢弃, 这就使该键成为可终止的, 被终止, 然后被回收.某个键被终止时, 它对应的键值对也就从映射中有效地移除了.

    这个“弱键”的原理呢？大致上就是, 通过WeakReference和ReferenceQueue实现的. WeakHashMap的key是“弱键”, 即是WeakReference类型的；ReferenceQueue是一个队列, 它会保存被GC回收的“弱键”.实现步骤是:
- 新建WeakHashMap, 将“键值对”添加到WeakHashMap中.
           实际上, WeakHashMap是通过数组table保存Entry(键值对)；每一个Entry实际上是一个单向链表, 即Entry是键值对链表.
- 当某“弱键”不再被其它对象引用, 并被GC回收时.在GC回收该“弱键”时, 这个“弱键”也同时会被添加到ReferenceQueue(queue)队列中.
- 当下一次我们需要操作WeakHashMap时, 会先同步table和queue.table中保存了全部的键值对, 而queue中保存被GC回收的键值对；同步它们, 就是删除table中被GC回收的键值对.
   
![](https://ww2.sinaimg.cn/large/006tKfTcgw1fbfn51abk9j30dl0fk0t2.jpg)
   
- WeakHashMap继承于AbstractMap, 并且实现了Map接口.
- WeakHashMap是哈希表, 但是它的键是"弱键".WeakHashMap中保护几个重要的成员变量:table, size, threshold, loadFactor, modCount, queue.
- table是一个Entry[]数组类型, 而Entry实际上就是一个单向链表.哈希表的"key-value键值对"都是存储在Entry数组中的. 
- size是Hashtable的大小, 它是Hashtable保存的键值对的数量. 
- threshold是Hashtable的阈值, 用于判断是否需要调整Hashtable的容量.threshold的值="容量*加载因子".
-  loadFactor就是加载因子. 
- modCount是用来实现fail-fast机制的
- queue保存的是“已被GC清除”的“弱引用的键”.


#### Map 总结
- Map 是“键值对”映射的抽象接口.
- AbstractMap 实现了Map中的绝大部分函数接口.它减少了“Map的实现类”的重复编码.
- SortedMap 有序的“键值对”映射接口.
- NavigableMap 是继承于SortedMap的, 支持导航函数的接口.
- HashMap, Hashtable, TreeMap, WeakHashMap这4个类是“键值对”映射的实现类.它们各有区别！
    - HashMap 是基于“拉链法”实现的散列表.一般用于单线程程序中.
    - Hashtable 也是基于“拉链法”实现的散列表.它一般用于多线程程序中.
    - WeakHashMap 也是基于“拉链法”实现的散列表, 它一般也用于单线程程序中.相比HashMap, WeakHashMap中的键是“弱键”, 当“弱键”被GC回收时, 它对应的键值对也会被从WeakHashMap中删除；而HashMap中的键是强键.
    - TreeMap 是有序的散列表, 它是通过红黑树实现的.它一般用于单线程中存储有序的映射.

##### HashMap和Hashtable异同
相同点:
HashMap和Hashtable都是存储“键值对(key-value)”的散列表, 而且都是采用拉链法实现的.
存储的思想都是:通过table数组存储, 数组的每一个元素都是一个Entry；而一个Entry就是一个单向链表, Entry链表中的每一个节点就保存了key-value键值对数据.

**添加key-value键值对**:首先, 根据key值计算出哈希值, 再计算出数组索引(即, 该key-value在table中的索引).然后, 根据数组索引找到Entry(即, 单向链表), 再遍历单向链表, 将key和链表中的每一个节点的key进行对比.若key已经存在Entry链表中, 则用该value值取代旧的value值；若key不存在Entry链表中, 则新建一个key-value节点, 并将该节点插入Entry链表的表头位置.
**删除key-value键值对**:删除键值对, 相比于“添加键值对”来说, 简单很多.首先, 还是根据key计算出哈希值, 再计算出数组索引(即, 该key-value在table中的索引).然后, 根据索引找出Entry(即, 单向链表).若节点key-value存在与链表Entry中, 则删除链表中的节点即可.

不同点:

- HashMap 继承于AbstractMap, 实现了Map、Cloneable、java.io.Serializable接口.
- Hashtable 继承于Dictionary, 实现了Map、Cloneable、java.io.Serializable接口.
- Hashtable的几乎所有函数都是同步的, 即它是线程安全的, 支持多线程.
- HashMap的函数则是非同步的, 它不是线程安全的.若要在多线程中使用HashMap, 需要我们额外的进行同步处理. 对HashMap的同步处理可以使用Collections类提供的synchronizedMap静态方法, 或者直接使用JDK 5.0之后提供的java.util.concurrent包里的ConcurrentHashMap类.
- HashMap的key、value都可以为null.
- Hashtable的key、value都不可以为null.
- HashMap只支持Iterator(迭代器)遍历.
- Hashtable支持Iterator(迭代器)和Enumeration(枚举器)两种方式遍历.
- 通过Iterator迭代器遍历时, 遍历的顺序不同,HashMap是“从前向后”的遍历数组,Hashtabl是“从后往前”的遍历数组
- HashMap默认的容量大小是16；增加容量时, 每次将容量变为“原始容量x2”.
- Hashtable默认的容量大小是11；增加容量时, 每次将容量变为“原始容量x2 + 1”.
- HashMap添加元素时, 是使用自定义的哈希算法.
- Hashtable没有自定义哈希算法, 而直接采用的key的hashCode().

##### HashMap和WeakHashMap异同
相同点:

- 它们都是散列表, 存储的是“键值对”映射.
- 它们都继承于AbstractMap, 并且实现Map基础.
- 它们的构造函数都一样.
- 它们都包括4个构造函数, 而且函数的参数都一样.
- 默认的容量大小是16, 默认的加载因子是0.75.
- 它们的“键”和“值”都允许为null.
- 它们都是“非同步的”.

不同点:

- HashMap实现了Cloneable和Serializable接口, 而WeakHashMap没有.
- HashMap的“键”是“强引用(StrongReference)”, 而WeakHashMap的键是“弱引用(WeakReference)”

##### Collections.synchronizedMap 和 ConcurrentHashMap

Map m = Collections.synchronizedMap(new HashMap());

使用 Collections 工具类的 synchronizedMap 包装一个同步的 HashMap
适用于并发量小的情况
它的原理是将 HashMap 包装在这个类中,然后在 HashMap 的每个操作都加上 synchronized

```java
private final Map<K,V> m;     // Backing Map
        final Object      mutex;        // Object on which to synchronize

        SynchronizedMap(Map<K,V> m) {
            if (m==null)
                throw new NullPointerException();
            this.m = m;
            mutex = this;
        }

        SynchronizedMap(Map<K,V> m, Object mutex) {
            this.m = m;
            this.mutex = mutex;
        }

        public int size() {
            synchronized (mutex) {return m.size();}
        }
        public boolean isEmpty() {
            synchronized (mutex) {return m.isEmpty();}
        }
        public boolean containsKey(Object key) {
            synchronized (mutex) {return m.containsKey(key);}
        }
        public boolean containsValue(Object value) {
            synchronized (mutex) {return m.containsValue(value);}
        }
        public V get(Object key) {
            synchronized (mutex) {return m.get(key);}
        }

        public V put(K key, V value) {
            synchronized (mutex) {return m.put(key, value);}
        }
        public V remove(Object key) {
            synchronized (mutex) {return m.remove(key);}
        }
        public void putAll(Map<? extends K, ? extends V> map) {
            synchronized (mutex) {m.putAll(map);}
        }
        public void clear() {
            synchronized (mutex) {m.clear();}
        }
    ```

ComcurrentHashMap

```java
public V put(K key, V value) {
        Segment<K,V> s;
        if (value == null)
            throw new NullPointerException();
        int hash = hash(key);
        int j = (hash >>> segmentShift) & segmentMask;
        if ((s = (Segment<K,V>)UNSAFE.getObject          // nonvolatile; recheck
             (segments, (j << SSHIFT) + SBASE)) == null) //  in ensureSegment
            s = ensureSegment(j);
        return s.put(key, hash, value, false);
    }
```

在 ConcurrentHashMap内部有一个Segment段, 它将大的HashMap切分成若干个段（小的HashMap）, 然后让数据在每一段上Hash, 这样多个线程在不同段上的Hash操作一定是线程安全的, 所以只需要同步同一个段上的线程就可以了, 这样实现了锁的分离, 大大增加了并发量.

在使用ConcurrentHashMap.size时会比较麻烦, 因为它要统计每个段的数据和, 在这个时候, 要把每一个段都加上锁, 然后再做数据统计.这个就是把锁分离后的小小弊端, 但是size方法应该是不会被高频率调用的方法.

![](https://ww2.sinaimg.cn/large/006y8lVagw1fbdjc2qqs8j308008ga9z.jpg)

#### 强引用,软引用,弱引用,虚引用

### Set
![](https://ww2.sinaimg.cn/large/006tKfTcjw1fbfojhdxyvj30g70asmxf.jpg)

Set都是基于 Map 实现的 , HashSet是通过HashMap实现的, TreeSet是通过TreeMap实现的
#### HashSet
![](https://ww1.sinaimg.cn/large/006tKfTcgw1fbfokolhmcj30ag07j74c.jpg)

```java
public class HashSet<E>
       extends AbstractSet<E>
       implements Set<E>, Cloneable, java.io.Serializable
   {
       static final long serialVersionUID = -5024744406713321676L;
   
       // HashSet是通过map(HashMap对象)保存内容的
      private transient HashMap<E,Object> map;
  
      // PRESENT是向map中插入key-value对应的value
     // 因为HashSet中只需要用到key, 而HashMap是key-value键值对；
      // 所以, 向map中添加键值对时, 键值对的值固定是PRESENT
      private static final Object PRESENT = new Object();
  
      // 默认构造函数
      public HashSet() {
          // 调用HashMap的默认构造函数, 创建map
          map = new HashMap<E,Object>();
      }
      ....
}
 ```
#### 遍历方式
通过Iterator遍历HashSet

```java
// 假设set是HashSet对象
for(Iterator iterator = set.iterator();
       iterator.hasNext(); ) { 
    iterator.next();
}   
```

通过for-each遍历HashSet

```java
// 假设set是HashSet对象, 并且set中元素是String类型
String[] arr = (String[])set.toArray(new String[0]);
for (String str:arr)
    System.out.printf("for each : %s\n", str);
```

#### TreeSet
##### 遍历方式

```java
for(Iterator iter = set.iterator(); iter.hasNext(); ) { 
    iter.next();
} 
for(Iterator iter = set.descendingIterator(); iter.hasNext(); ) { 
    iter.next();
}
// 假设set是TreeSet对象, 并且set中元素是String类型
String[] arr = (String[])set.toArray(new String[0]);
for (String str:arr)
    System.out.printf("for each : %s\n", str);
```
TreeSet不支持快速随机遍历, 只能通过迭代器进行遍历！

### java.util.Arrays
Array是Java特有的数组,而 Arrays是处理数据的工具类

- Arrays.asList:可以从 Array 转换成 List.可以作为其他集合类型构造器的参数.
- Arrays.binarySearch:在一个已排序的或者其中一段中快速查找.
- Arrays.copyOf:如果你想扩大数组容量又不想改变它的内容的时候可以使用这个方法.
- Arrays.copyOfRange:可以复制整个数组或其中的一部分.
- Arrays.deepEquals、Arrays.deepHashCode:Arrays.equals/hashCode的高级版本, 支持子数组的操作.
- Arrays.equals:如果你想要比较两个数组是否相等, 应该调用这个方法而不是数组对象中的 equals方法（数组对象中没有重写equals()方法, 所以这个方法之比较引用而不比较内容）.这个方法集合了Java 5的自动装箱和无参变量的特性, 来实现将一个变量快速地传给 equals() 方法——所以这个方法在比较了对象的类型之后是直接传值进去比较的.
- Arrays.fill:用一个给定的值填充整个数组或其中的一部分.
- Arrays.hashCode:用来根据数组的内容计算其哈希值（数组对象的hashCode()不可用）.这个方法集合了Java 5的自动装箱和无参变量的特性, 来实现将一个变量快速地传给 Arrays.hashcode方法——只是传值进去, 不是对象.
- Arrays.sort:对整个数组或者数组的一部分进行排序.也可以使用此方法用给定的比较器对对象数组进行排序.
- Arrays.toString:打印数组的内容.

如果想要复制整个数组或其中一部分到另一个数组, 可以调用 System.arraycopy方法.此方法从源数组中指定的位置复制指定个数的元素到目标数组里.这无疑是一个简便的方法.（有时候用 ByteBuffer bulk复制会更快.

### java.util.Collections

### fail-fast 问题
>fail-fast 机制是java集合(Collection)中的一种错误机制.当多个线程对同一个集合的内容进行操作时, 就可能会产生fail-fast事件.
例如:当某一个线程A通过iterator去遍历某集合的过程中, 若该集合的内容被其他线程所改变了；那么线程A访问集合时, 就会抛出ConcurrentModificationException异常, 产生fail-fast事件.

#### 发生原因
在调用 next() 和 remove()时, 都会执行 checkForComodification().若 “modCount 不等于 expectedModCount”, 则抛出ConcurrentModificationException异常, 产生fail-fast事件.

#### 解决方法
只需要将ArrayList替换成java.util.concurrent包下对应的类即可.
即, 将代码
`private static List<String> list = new ArrayList<String>();`
替换为
`private static List<String> list = new CopyOnWriteArrayList<String>();`

#### 解决原理
- 和ArrayList继承于AbstractList不同, CopyOnWriteArrayList没有继承于AbstractList, 它仅仅只是实现了List接口.
- ArrayList的iterator()函数返回的Iterator是在AbstractList中实现的；而CopyOnWriteArrayList是自己实现Iterator.
- ArrayList的Iterator实现类中调用next()时, 会“调用checkForComodification()比较‘expectedModCount’和‘modCount’的大小”；但是, CopyOnWriteArrayList的Iterator实现类中, 没有所谓的checkForComodification(), 更不会抛出ConcurrentModificationException异常！ 

## 并发集合
### List
#### CopyOnWriteArrayList

### Set
#### ConcurrentSkipListSet
#### CopyOnWriteArraySet

### Map
#### ConcurrentHashMap
#### ConcurrentSkipListMap


