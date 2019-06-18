---
sidebar: auto
prev: ../io/
next: ../concurrent/
title: 集合
date: 2019-03-05 15:39
author: dong4j
tags:
- Java
- 面试题
- 集合
---

::: tip 

集合相关面试题整理

:::

<!-- more -->

[[toc]]

[TOC]

## List Set Map 三者的区别

- **[👉 List](./list.md)(对付顺序的好帮手)：** List接口存储一组不唯一（可以有多个元素引用相同的对象），有序的对象
- **[👉 Set](./set.md)(注重独一无二的性质):** 不允许重复的集合. 不会有多个元素引用相同的对象. 
- **[👉 Map](./map.md)(用Key来搜索的专家):** 使用键值对存储. Map会维护与Key有关联的值. 两个Key可以引用相同的对象，但Key不能重复，典型的Key是String类型，但也可以是任何对象. 

## ArrayList 和 LinkedList  的区别

- **是否保证线程安全：** `ArrayList` 和 `LinkedList` 都是不同步的，也就是不保证线程安全；
- **底层数据结构：** `Arraylist` 底层使用的是 **Object 数组**；`LinkedList` 底层使用的是 **双向链表** 数据结构（JDK1.6之前为循环链表，JDK1.7取消了循环. 注意双向链表和双向循环链表的区别，下面有介绍到！）
- **插入和删除是否受元素位置的影响：** 
  - **ArrayList 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响. ** 比如：执行`add(E e) `方法的时候， `ArrayList` 会默认在将指定的元素追加到此列表的末尾，这种情况时间复杂度就是O(1). 但是如果要在指定位置 i 插入和删除元素的话（`add(int index, E element) `）时间复杂度就为 O(n-i). 因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的(n-i)个元素都要执行向后位/向前移一位的操作.  
  - **LinkedList 采用链表存储，所以插入，删除元素时间复杂度不受元素位置的影响，都是近似 O（1）而数组为近似 O（n）. **
- **是否支持快速随机访问：** `LinkedList` 不支持高效的随机元素访问，而 `ArrayList` 支持. 快速随机访问就是通过元素的序号快速获取元素对象(对应于`get(int index) `方法). 
- **内存空间占用：** ArrayList的空 间浪费主要体现在在list列表的结尾会预留一定的容量空间，而LinkedList的空间花费则体现在它的每一个元素都需要消耗比ArrayList更多的空间（因为要存放直接后继和直接前驱以及数据）

## ArrayList 和 Vector 的区别

- Vector 是同步的，因此开销就比 ArrayList 要大，访问速度更慢。最好使用 ArrayList 而不是 Vector，因为同步操作完全可以由程序员自己来控制；
- Vector 每次扩容请求其大小的 `2` 倍空间，而 ArrayList 是 `1.5` 倍。

## HashMap 和 HashTable 的区别

1. **线程是否安全：** HashMap 是非线程安全的，HashTable 是线程安全的；HashTable 内部的方法基本都经过`synchronized` 修饰。（如果你要保证线程安全的话就使用 ConcurrentHashMap 吧！）；
2. **效率：** 因为线程安全的问题，HashMap 要比 HashTable 效率高一点。另外，HashTable 基本被淘汰，不要在代码中使用它；
3. **对 Null key 和 Null value 的支持：** HashMap 中，null 可以作为键，这样的键只有一个，可以有一个或多个键所对应的值为 null。但是在 HashTable 中 put 进的键值只要有一个 null，直接抛出 NullPointerException。

4. **初始容量大小和每次扩充容量大小的不同 ：** 
   1. 创建时如果不指定容量初始值，Hashtable 默认的初始大小为 `11`，之后每次扩充，容量变为原来的`2n+1`。HashMap 默认的初始化大小为 `16`。之后每次扩充，容量变为原来的 `2` 倍。
   2. 创建时如果给定了容量初始值，那么 Hashtable 会直接使用你给定的大小，而 HashMap 会将其扩充为 `2` 的幂次方大小（HashMap 中的`tableSizeFor()`方法保证）。也就是说 HashMap 总是使用 `2` 的幂作为哈希表的大小

5. **底层数据结构：** JDK1.8 以后的 HashMap 在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）时，将链表转化为红黑树，以减少搜索时间。Hashtable 没有这样的机制。

## HashMap 和 HashSet 区别

如果你看过 `HashSet` 源码的话就应该知道：HashSet 底层就是基于 HashMap 实现的。（HashSet 的源码非常非常少，因为除了 `clone() `、`writeObject()`、`readObject()`是 HashSet 自己不得不实现之外，其他方法都是直接调用 HashMap 中的方法。

| HashMap                            | HashSet                                                      |
| ---------------------------------- | ------------------------------------------------------------ |
| 实现了 Map 接口                    | 实现 Set 接口                                                |
| 存储键值对                         | 仅存储对象                                                   |
| 调用 `put（）`向 map 中添加元素    | 调用 `add（）`方法向 Set 中添加元素                          |
| HashMap 使用键（Key）计算 Hashcode | HashSet 使用成员对象来计算 hashcode 值，对于两个对象来说 hashcode 可能相同，所以 equals() 方法用来判断对象的相等性， |

## HashSet 如何检查重复

当你把对象加入`HashSet`时，HashSet 会先计算对象的`hashcode`值来判断对象加入的位置，同时也会与其他加入的对象的 hashcode 值作比较，如果没有相符的 hashcode，HashSet 会假设对象没有重复出现。

但是如果发现有相同 hashcode 值的对象，这时会调用 `equals（）` 方法来检查 hashcode 相等的对象是否真的相同。

如果两者相同，HashSet 就不会让加入操作成功

[👉 怎么向 Set 中存入相同的字符串](../se/string_kind.md#怎么向-set-中存入相同的字符串)

**hashCode（）与equals（）的相关规定：**

1. 如果两个对象相等，则hashcode一定也是相同的
2. 两个对象相等,对两个equals方法返回true
3. 两个对象有相同的hashcode值，它们也不一定是相等的
4. 综上，equals方法被覆盖过，则hashCode方法也必须被覆盖
5. hashCode()的默认行为是对堆上的对象产生独特值。如果没有重写hashCode()，则该class的两个对象无论如何都不会相等（即使这两个对象指向相同的数据）。

**== 与equals 的区别**

1. == 是判断两个变量或实例是不是指向同一个内存空间 equals是判断两个变量或实例所指向的内存空间的值是不是相同
2. == 是指对内存地址进行比较 equals()是对字符串的内容进行比较
3. == 指引用是否相同 equals()指的是值是否相同

## JDK7 与 JDK8 中 HashMap 的实现

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
* fail-fast 与 fail-safe 机制有什么区别

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
这是另外一个很热门的面试题, 因为ConcurrentHashMap越来越多人用了.我们知道Hashtable是synchronized的, 但是ConcurrentHashMap同步性能更好, 因为它仅仅根据同步级别对map的一部分进行上锁.

答案是不能，HashTable 的迭代器是强一致性的，而 ConcurrentHashMap 是弱一致性的. ConcurrentHashMap 的 get、clear、iterator 都是弱一致性的

ConcurrentHashMap 的弱一致性主要是为了提升效率，是一致性与效率之间的一种权衡. 要成为强一致性，就得到处使用锁，甚至是全局锁

HashTable 虽然性能上不如 ConcurrentHashMap，但并不能完全被取代，两者的迭代器的一致性不同的，HashTable 的迭代器是强一致性的，而 ConcurrentHashMap 是弱一致的.  ConcurrentHashMap 的 get，clear，iterator 都是弱一致性的.  Doug Lea 也将这个判断留给用户自己决定是否使用 ConcurrentHashMap. 

那么什么是强一致性和弱一致性呢？

get 方法是弱一致的，是什么含义？可能你期望往 ConcurrentHashMap 底层数据结构中加入一个元素后，立马能对 get 可见，但 ConcurrentHashMap 并不能如你所愿. 换句话说，put 操作将一个元素加入到底层数据结构后，get 可能在某段时间内还看不到这个元素，若不考虑内存模型，单从代码逻辑上来看，却是应该可以看得到的.

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



### 问题一：在日常开发中使用过的 java 集合类有哪些？

一般应聘者都会回答 ArrayList，LinkedList，HashMap，HashSet 等等. 如果连这几个集合类都不知道，基本上可以 pass 了. 

### 问题二：能描述一下 HashMap 的实现原理吗？

其实 HashMap 是典型的空间换时间的一种技术手段. 如果面试者在这个问题中不能很好的阐述 HashMap 的实现原理，比如不知道如何解决 hash 冲突，不知道 loadFactor 这样的核心概念以及扩容机制. 基本上我不会做深入考察了，可以 pass 了. 

### 问题三：平时在使用 HashMap 时一般使用什么类型的元素作为 Key？

面试者通常会回答，使用 String 或者 Integer 这样的类. 这个时候可以继续追问为什么使用 String、Integer 呢？这些类有什么特点？如果面试者有很好的思考，可以回答出这些类是 Immutable 的，并且这些类已经很规范的覆写了 hashCode () 以及 equals () 方法. 作为不可变类天生是线程安全的，而且可以很好的优化比如可以缓存 hash 值，避免重复计算等等，那么基本上这道题算是过关了. 

### 问题四：如果让你实现一个自定义的 class 作为 HashMap 的 key 该如何实现？

这个问题其实隐藏着几个知识点，覆写 hashCode 以及 equals 方法应该遵循的原则，在 jdk 文档以及《effective java》中都有明确的描述. 当然这也在考察应聘者是如何自实现一个 Immutable 类. 如果面试者这个问题也能回答的很好，基本上可以获得一点面试官的好感了. 

### 问题四延伸：你能设计一个算法（输入是 java 源文件），判断一个类是否是 Immutable 的吗？

这道题考察面非常非常广. 如果这个问题面试者回答上了，我觉得面试者的基础知识无需考察了. 可以继续考察高并发与分布式架构设计了. 

### 问题五：如何衡量一个 hash 算法的好坏，你知道的常用 hash 算法有哪些？

如果面试者的技术面比较宽，或者算法基础以及数论基础比较好，这个问题才可以做很好的回答. 首先，hashCode () 不要求唯一但是要尽可能的均匀分布，而且算法效率要尽可能的快. 如果面试者能回答出一些常用的算法，比如 MurMurHash（萌萌哒的名字）基本上已经可以俘获面试官了. 如果面试者有编译器的背景说出了如何在编译领域使用完美哈希的场景，那就太棒了，毕竟编译原理学的好的人太少了. 当然不要忘记了，还可以再考察一下 java 中 String 类的 hashCode () 的实现：

```
public int hashCode() {
    int h = hash;
    if (h == 0 && count > 0) {
       int off = offset;
        char val[] = value;
        int len = count;
        for (int i = 0; i < len; i++) {
            h = 31*h + val[off++];
       }
        hash = h;
   }
   return h;
}
```

为什么 `h = 31 * h + val[off++];` 这一行使用 `31` ，而不是别的数字，这是一个魔术吗？
 如果都结束了，不要忘了再问一句你知道 hash 攻击吗？有避免手段吗？就看面试者对各个 jdk 版本对 HashMap 的优化是否了解了. 这就引出了另一个数据结构红黑树了. 可以根据岗位需要继续考察 rb-tree，b-tree，lsm-tree 等常用数据结构以及典型应用场景. 

### 问题六： HashMap 是线程安全的吗？ 如果多个线程操作同一个 HashMap 对象会产生哪些非正常现象？

其实这已经开始考察面试者对并发知识的掌握情况了. HashMap 在 resize 时候如果多个线程并发操作如何导致死锁的. 面试者不一定知道，但是可以让面试者分析. 毕竟很多类库在并发场景中不恰当使用 HashMap 导致过生产问题. 

### 问题七： ConcurrentHashMap vs HashTable 他们是如何处理并发的？为什么有了 ConcurrentHashMap 没有把 HashTable 用 @Deprecated 注解废弃掉？

这个时候问题已经升级了，希望面试者分析过这两个类的源代码. 我们是希望面试者能够知道 ConcurrentHashMap 的内部实现原理，而且几乎是个硬性要求了. 后一个问题似乎更难一些，主要是进一步考察面试者对细节的一些思考. 

### 问题八：假如在一个没有 GC 的语言（比如 c 语言）中实现一个 HashMap，如何处理表扩容以及收缩问题？

现在很多内存数据库，比如 redis 内部使用的还是 HashMap 这种数据结构，但是在数据量特别大的时候比如 100W 的记录数，在遇到扩容的时候如果暴力的扩容 2 倍，然后做 rehash，肯定是有问题的. 那么如何避免呢？当缓存的数据不断的被删除或者到期失效，如何有效的管理内存空间呢？这些都是值得面试者思考的问题. 



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

> **1.Java集合框架是什么？说出一些集合框架的优点？**

每种编程语言中都有集合，最初的Java版本包含几种集合类：Vector、Stack、HashTable和Array. 

随着集合的广泛使用，Java1.2提出了囊括所有集合接口、实现和算法的集合框架. 在保证线程安全的情况下使用泛型和并发集合类，Java已经经历了很久. 它还包括在Java并发包中，阻塞接口以及它们的实现. 

集合框架的部分优点如下：

（1）使用核心集合类降低开发成本，而非实现我们自己的集合类. 

（2）随着使用经过严格测试的集合框架类，代码质量会得到提高. 

（3）通过使用JDK附带的集合类，可以降低代码维护成本. 

（4）复用性和可操作性. 

> **2.集合框架中的泛型有什么优点？**

1.Java1.5引入了泛型，所有的集合接口和实现都大量地使用它. 

2.泛型允许我们为集合提供一个可以容纳的对象类型，因此，如果你添加其它类型的任何元素，它会在编译时报错. 

3.这避免了在运行时出现ClassCastException，因为你将会在编译时得到报错信息. 

4.泛型也使得代码整洁，我们不需要使用显式转换和instanceOf操作符. 

5.它也给运行时带来好处，因为不会产生类型检查的字节码指令. 

> **3.Java集合框架的基础接口有哪些？**

Collection为集合层级的根接口. 一个集合代表一组对象，这些对象即为它的元素. Java平台不提供这个接口任何直接的实现. 

Set是一个不能包含重复元素的集合. 这个接口对数学集合抽象进行建模，被用来代表集合，就如一副牌. 

List是一个有序集合，可以包含重复元素. 你可以通过它的索引来访问任何元素. List更像长度动态变换的数组. 

Map是一个将key映射到value的对象.一个Map不能包含重复的key：每个key最多只能映射一个value. 

一些其它的接口有Queue、Dequeue、SortedSet、SortedMap和ListIterator. 

> **4.为何Collection不从Cloneable和Serializable接口继承？**

Collection接口指定一组对象，对象即为它的元素. 如何维护这些元素由Collection的具体实现决定. 例如，一些如List的Collection实现允许重复的元素，而其它的如Set就不允许. 

很多Collection实现有一个公有的clone方法. 然而，把它放到集合的所有实现中也是没有意义的. 这是因为Collection是一个抽象表现. 重要的是实现. 

当与具体实现打交道的时候，克隆或序列化的语义和含义才发挥作用. 所以，具体实现应该决定如何对它进行克隆或序列化，或它是否可以被克隆或序列化. 点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484372&idx=1&sn=381af66344b4b50d033c38e51bcb0e21&chksm=eb5386e2dc240ff4fbee79af445ffeb3856da484a8f5206bcaf4531f0d510564943b213f948c&scene=21#wechat_redirect)一文学会序列化. 

在所有的实现中授权克隆和序列化，最终导致更少的灵活性和更多的限制. 特定的实现应该决定它是否可以被克隆和序列化. 点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247484372&idx=1&sn=381af66344b4b50d033c38e51bcb0e21&chksm=eb5386e2dc240ff4fbee79af445ffeb3856da484a8f5206bcaf4531f0d510564943b213f948c&scene=21#wechat_redirect)一文学会序列化. 

> **5.为何Map接口不继承Collection接口？**

尽管Map接口和它的实现也是集合框架的一部分，但Map不是集合，集合也不是Map. 因此，Map继承Collection毫无意义，反之亦然. 

如果Map继承Collection接口，那么元素去哪儿？Map包含key-value对，它提供抽取key或value列表集合的方法，但是它不适合“一组对象”规范. 

> **6.Iterator是什么？**

Iterator接口提供遍历任何Collection的接口. 我们可以从一个Collection中使用迭代器方法来获取迭代器实例. 迭代器取代了Java集合框架中的Enumeration. 迭代器允许调用者在迭代过程中移除元素. 

> **7.Enumeration和Iterator接口的区别？**

Enumeration的速度是Iterator的两倍，也使用更少的内存. Enumeration是非常基础的，也满足了基础的需要. 但是，与Enumeration相比，Iterator更加安全，因为当一个集合正在被遍历的时候，它会阻止其它线程去修改集合. 

迭代器取代了Java集合框架中的Enumeration. 迭代器允许调用者从集合中移除元素，而Enumeration不能做到. 为了使它的功能更加清晰，迭代器方法名已经经过改善. 

> **8.为何没有像Iterator.add()这样的方法，向集合中添加元素？**

语义不明，已知的是，Iterator的协议不能确保迭代的次序. 然而要注意，ListIterator没有提供一个add操作，它要确保迭代的顺序. 

> **9.为何迭代器没有一个方法可以直接获取下一个元素，而不需要移动游标？**

它可以在当前Iterator的顶层实现，但是它用得很少，如果将它加到接口中，每个继承都要去实现它，这没有意义. 

> **10.Iterater和ListIterator之间有什么区别？**

（1）我们可以使用Iterator来遍历Set和List集合，而ListIterator只能遍历List. 

（2）Iterator只可以向前遍历，而LIstIterator可以双向遍历. 

（3）ListIterator从Iterator接口继承，然后添加了一些额外的功能，比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置. 

> **11.通过迭代器fail-fast属性，你明白了什么？**

每次我们尝试获取下一个元素的时候，Iterator fail-fast属性检查当前集合结构里的任何改动. 如果发现任何改动，它抛出ConcurrentModificationException. Collection中所有Iterator的实现都是按fail-fast来设计的（ConcurrentHashMap和CopyOnWriteArrayList这类并发集合类除外）. 

> **12.fail-fast与fail-safe有什么区别？**

Iterator的fail-fast属性与当前的集合共同起作用，因此它不会受到集合中任何改动的影响. Java.util包中的所有集合类都被设计为fail-fast的，

而java.util.concurrent中的集合类都为fail-safe的. 

Fall—fast迭代器抛出ConcurrentModificationException，

fall—safe迭代器从不抛出ConcurrentModificationException. 

> **13.在迭代一个集合的时候，如何避免？**

ConcurrentModificationException？

在遍历一个集合的时候我们可以使用并发集合类来避免ConcurrentModificationException，比如使用CopyOnWriteArrayList，而不是ArrayList. 

> **14.为何Iterator接口没有具体的实现？**

Iterator接口定义了遍历集合的方法，但它的实现则是集合实现类的责任. 每个能够返回用于遍历的Iterator的集合类都有它自己的Iterator实现内部类. 

这就允许集合类去选择迭代器是fail-fast还是fail-safe的. 比如，ArrayList迭代器是fail-fast的，而CopyOnWriteArrayList迭代器是fail-safe的. 

> **15.UnsupportedOperationException是什么？**

UnsupportedOperationException是用于表明操作不支持的异常. 在JDK类中已被大量运用，在集合框架java.util.Collections.UnmodifiableCollection将会在所有add和remove操作中抛出这个异常. 

> **16.hashCode()和equals()方法有何重要性？**

HashMap使用Key对象的hashCode()和equals()方法去决定key-value对的索引. 点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486439&idx=1&sn=3afb389bca737a1799f7cdee92a7dc99&chksm=eb538ed1dc2407c7782cdf71344786c3db5c32469fdfb1ab97e58364c2902dbcde09ed98e16a&scene=21#wechat_redirect)一文搞懂它们之间的关系. 

当我们试着从HashMap中获取值的时候，这些方法也会被用到. 如果这些方法没有被正确地实现，在这种情况下，两个不同Key也许会产生相同的hashCode()和equals()输出，HashMap将会认为它们是相同的，然后覆盖它们，而非把它们存储到不同的地方. 

同样的，所有不允许存储重复数据的集合类都使用hashCode()和equals()去查找重复，所以正确实现它们非常重要. equals()和hashCode()的实现应该遵循以下规则：

1.如果o1.equals(o2)，那么o1.hashCode() == o2.hashCode()总是为true的. 

2.如果o1.hashCode() == o2.hashCode()，并不意味着o1.equals(o2)会为true. 

> **17.Map接口提供了哪些不同的集合视图？**

Map接口提供三个集合视图：

1）Set keyset()：返回map中包含的所有key的一个Set视图. 集合是受map支持的，map的变化会在集合中反映出来，反之亦然. 当一个迭代器正在遍历一个集合时，若map被修改了（除迭代器自身的移除操作以外），迭代器的结果会变为未定义. 集合支持通过Iterator的Remove、Set.remove、removeAll、retainAll和clear操作进行元素移除，从map中移除对应的映射. 

它不支持add和addAll操作. 

2）Collection values()：返回一个map中包含的所有value的一个Collection视图. 这个collection受map支持的，map的变化会在collection中反映出来，反之亦然. 当一个迭代器正在遍历一个collection时，若map被修改了（除迭代器自身的移除操作以外），迭代器的结果会变为未定义. 集合支持通过Iterator的Remove、Set.remove、removeAll、retainAll和clear操作进行元素移除，从map中移除对应的映射. 它不支持add和addAll操作. 

3）Set> entrySet()：返回一个map钟包含的所有映射的一个集合视图. 这个集合受map支持的，map的变化会在collection中反映出来，反之亦然. 当一个迭代器正在遍历一个集合时，若map被修改了（除迭代器自身的移除操作，以及对迭代器返回的entry进行setValue外），迭代器的结果会变为未定义. 集合支持通过Iterator的Remove、Set.remove、removeAll、retainAll和clear操作进行元素移除，从map中移除对应的映射. 它不支持add和addAll操作. 

> **18.HashMap和HashTable有何不同？**

（1）HashMap允许key和value为null，而HashTable不允许. 

（2）HashTable是同步的，而HashMap不是. 所以HashMap适合单线程环境，HashTable适合多线程环境. 

（3）在Java1.4中引入了LinkedHashMap，HashMap的一个子类，假如你想要遍历顺序，你很容易从HashMap转向LinkedHashMap，但是HashTable不是这样的，它的顺序是不可预知的. 

（4）HashMap提供对key的Set进行遍历，因此它是fail-fast的，但HashTable提供对key的Enumeration进行遍历，它不支持fail-fast. 

（5）HashTable被认为是个遗留的类，如果你寻求在迭代的时候修改Map，你应该使用CocurrentHashMap. 

> **19.如何决定选用HashMap还是TreeMap？**

对于在Map中插入、删除和定位元素这类操作，HashMap是最好的选择. 然而，假如你需要对一个有序的key集合进行遍历，TreeMap是更好的选择. 基于你的collection的大小，也许向HashMap中添加元素会更快，将map换为TreeMap进行有序key的遍历. 

> **20.ArrayList和Vector有何异同点？**

ArrayList和Vector在很多时候都很类似. 

（1）两者都是基于索引的，内部由一个数组支持. 

（2）两者维护插入的顺序，我们可以根据插入顺序来获取元素. 

（3）ArrayList和Vector的迭代器实现都是fail-fast的. 

（4）ArrayList和Vector两者允许null值，也可以使用索引值对元素进行随机访问. 

以下是ArrayList和Vector的不同点. 

（1）Vector是同步的，而ArrayList不是. 然而，如果你寻求在迭代的时候对列表进行改变，你应该使用CopyOnWriteArrayList. 

（2）ArrayList比Vector快，它因为有同步，不会过载. 

（3）ArrayList更加通用，因为我们可以使用Collections工具类轻易地获取同步列表和只读列表. 

> **21.Array和ArrayList有何区别？什么时候更适合用Array？**

Array可以容纳基本类型和对象，而ArrayList只能容纳对象. 

Array是指定大小的，而ArrayList大小是固定的. 

Array没有提供ArrayList那么多功能，比如addAll、removeAll和iterator等. 尽管ArrayList明显是更好的选择，但也有些时候Array比较好用. 

（1）如果列表的大小已经指定，大部分情况下是存储和遍历它们. 

（2）对于遍历基本数据类型，尽管Collections使用自动装箱来减轻编码任务，在指定大小的基本类型的列表上工作也会变得很慢. 

（3）如果你要使用多维数组，使用[][]比List>更容易. 

> **22.ArrayList和LinkedList有何区别？**

ArrayList和LinkedList两者都实现了List接口，但是它们之间有些不同. 

1）ArrayList是由Array所支持的基于一个索引的数据结构，所以它提供对元素的随机访问，复杂度为O(1)，但LinkedList存储一系列的节点数据，每个节点都与前一个和下一个节点相连接. 所以，尽管有使用索引获取元素的方法，内部实现是从起始点开始遍历，遍历到索引的节点然后返回元素，时间复杂度为O(n)，比ArrayList要慢. 

2）与ArrayList相比，在LinkedList中插入、添加和删除一个元素会更快，因为在一个元素被插入到中间的时候，不会涉及改变数组的大小，或更新索引. 

3）LinkedList比ArrayList消耗更多的内存，因为LinkedList中的每个节点存储了前后节点的引用. 

> **23.哪些集合类提供对元素的随机访问？**

ArrayList、HashMap、TreeMap和HashTable类提供对元素的随机访问. 

> **24.哪些集合类是线程安全的？**

Vector、HashTable、Properties和Stack是同步类，所以它们是线程安全的，可以在多线程环境下使用. Java1.5并发API包括一些集合类，允许迭代时修改，因为它们都工作在集合的克隆上，所以它们在多线程环境中是安全的. 点击[这里](http://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486446&idx=2&sn=cb4f3aff0427c5ac3ffe5b61e150f506&chksm=eb538ed8dc2407ceb91fffe3c3bd559d9b15537446f84eb3bfb1a80e67f5efee176ca468a07b&scene=21#wechat_redirect)一文搞懂问什么线程不安全. 

> **25.并发集合类是什么？**

Java1.5并发包（java.util.concurrent）包含线程安全集合类，允许在迭代时修改集合. 迭代器被设计为fail-fast的，会抛出ConcurrentModificationException. 一部分类为：CopyOnWriteArrayList、 ConcurrentHashMap、CopyOnWriteArraySet. 

> **26.队列和栈是什么，列出它们的区别？**

栈和队列两者都被用来预存储数据. java.util.Queue是一个接口，它的实现类在Java并发包中. 队列允许先进先出（FIFO）检索元素，但并非总是这样. Deque接口允许从两端检索元素. 栈与队列很相似，但它允许对元素进行后进先出（LIFO）进行检索. Stack是一个扩展自Vector的类，而Queue是一个接口. 

> **27.Collections类是什么？**

Java.util.Collections是一个工具类仅包含静态方法，它们操作或返回集合. 

它包含操作集合的多态算法，返回一个由指定集合支持的新集合和其它一些内容. 这个类包含集合框架算法的方法，比如折半搜索、排序、混编和逆序等. 

> **28.Comparable和Comparator接口有何区别？**

Comparable和Comparator接口被用来对对象集合或者数组进行排序. Comparable接口被用来提供对象的自然排序，我们可以使用它来提供基于单个逻辑的排序. 

Comparator接口被用来提供不同的排序算法，我们可以选择需要使用的Comparator来对给定的对象集合进行排序. 

> **29.我们如何对一组对象进行排序？**

如果我们需要对一个对象数组进行排序，我们可以使用Arrays.sort()方法. 如果我们需要排序一个对象列表，我们可以使用Collection.sort()方法. 

两个类都有用于自然排序（使用Comparable）或基于标准的排序（使用Comparator）的重载方法sort(). Collections内部使用数组排序方法，所有它们两者都有相同的性能，只是Collections需要花时间将列表转换为数组. 

> **30.当一个集合被作为参数传递给一个函数时，如何才可以确保函数不能修改它？**

在作为参数传递之前，我们可以使用Collections.unmodifiableCollection(Collection c)方法创建一个只读集合，

这将确保改变集合的任何操作都会抛出UnsupportedOperationException. 
