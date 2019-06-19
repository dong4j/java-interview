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

看过 `HashSet` 源码的话就应该知道：HashSet 底层就是基于 HashMap 实现的。（HashSet 的源码非常非常少，因为除了 `clone() `、`writeObject()`、`readObject()`是 HashSet 自己不得不实现之外，其他方法都是直接调用 HashMap 中的方法。

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

## [👉 JDK7](./map.md#底层数据结构分析) 与 [👉 JDK8](./map.md#底层数据结构分析) 中 HashMap 的实现

## HashMap 的长度为什么是 2 的幂次方

为了能让 HashMap 存取高效，尽量较少碰撞，也就是要尽量把数据分配均匀。我们上面也讲到了过了，Hash 值的范围值-2147483648到2147483647，前后加起来大概40亿的映射空间，只要哈希函数映射得比较均匀松散，一般应用是很难出现碰撞的。但问题是一个40亿长度的数组，内存是放不下的。所以这个散列值是不能直接拿来用的。用之前还要先做对数组的长度取模运算，得到的余数才能用来要存放的位置也就是对应的数组下标。这个数组下标的计算方法是“ `(n - 1) & hash`”。（n代表数组长度）。这也就解释了 HashMap 的长度为什么是2的幂次方。

**这个算法应该如何设计呢？**

我们首先可能会想到采用%取余的操作来实现。但是，重点来了：**“取余(%)操作中如果除数是2的幂次则等价于与其除数减一的与(&)操作（也就是说 hash%length==hash&(length-1)的前提是 length 是2的 n 次方；）。”** 并且 **采用二进制位操作 &，相对于%能够提高运算效率，这就解释了 HashMap 的长度为什么是2的幂次方。**

## ConcurrentHashMap 和 Hashtable 的区别

ConcurrentHashMap 和 Hashtable 的区别主要体现在实现线程安全的方式上不同。

- **底层数据结构：** JDK1.7的 ConcurrentHashMap 底层采用 **分段的数组+链表** 实现，JDK1.8 采用的数据结构跟HashMap1.8的结构一样，数组+链表/红黑二叉树。Hashtable 和 JDK1.8 之前的 HashMap 的底层数据结构类似都是采用 **数组+链表** 的形式，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的；
- **实现线程安全的方式（重要）：** 
  - **在JDK1.7的时候，ConcurrentHashMap（分段锁）** 对整个桶数组进行了分割分段(Segment)，每一把锁只锁容器其中一部分数据，多线程访问容器里不同数据段的数据，就不会存在锁竞争，提高并发访问率。 **到了 JDK1.8 的时候已经摒弃了Segment的概念，而是直接用 Node 数组+链表+红黑树的数据结构来实现，并发控制使用 synchronized 和 CAS 来操作。（JDK1.6以后 对 synchronized锁做了很多优化）** 整个看起来就像是优化过且线程安全的 HashMap，虽然在JDK1.8中还能看到 Segment 的数据结构，但是已经简化了属性，只是为了兼容旧版本；
  - **Hashtable(同一把锁)** :使用 synchronized 来保证线程安全，效率非常低下。当一个线程访问同步方法时，其他线程也访问同步方法，可能会进入阻塞或轮询状态，如使用 put 添加元素，另一个线程不能使用 put 添加元素，也不能使用 get，竞争会越来越激烈效率越低。

## 为什么HashMap是线程不安全的

1. put 的时候导致的多线程数据不一致。
    这个问题比较好想象，比如有两个线程 A 和 B，首先 A 希望插入一个 key-value 对到 HashMap 中，首先计算记录所要落到的桶的索引坐标，然后获取到该桶里面的链表头结点，此时线程 A 的时间片用完了，而此时线程 B 被调度得以执行，和线程 A 一样执行，只不过线程 B 成功将记录插到了桶里面，假设线程 A 插入的记录计算出来的桶索引和线程 B 要插入的记录计算出来的桶索引是一样的，那么当线程 B 成功插入之后，线程 A 再次被调度运行时，它依然持有过期的链表头但是它对此一无所知，以至于它认为它应该这样做，如此一来就覆盖了线程 B 插入的记录，这样线程 B 插入的记录就凭空消失了，造成了数据不一致的行为。

2. 另外一个比较明显的线程不安全的问题是 HashMap 的 get 操作可能因为 resize 而引起死循环（cpu100%）

## 如何线程安全的使用 HashMap

```java
//Hashtable
Map<String, String> hashtable = new Hashtable<>();
  
//synchronizedMap
Map<String, String> synchronizedHashMap = Collections.synchronizedMap(new HashMap<String, String>());
  
//ConcurrentHashMap
Map<String, String> concurrentHashMap = new ConcurrentHashMap<>();
```

## 多并发情况下 HashMap 是否还会产生死循环

JDK8 已经修复了这个问题, JDK8 在 resize 时将元素插入尾部而不是插入头部, 避免死循环.

## TreeMap、HashMap、LindedHashMap的区别

1. LinkedHashMap 可以保证 HashMap 集合有序。存入的顺序和取出的顺序一致。

2. TreeMap 实现 SortMap 接口，能够把它保存的记录根据键排序，默认是按键值的升序排序，也可以指定排序的比较器，当用 Iterator 遍历 TreeMap 时，得到的记录是排过序的。

3. HashMap 不保证顺序，即为无序的， 具有很快的访问速度。HashMap 最多只允许一条记录的键为 Null; 允许多条记录的值为 Null; HashMap 不支持线程的同步。

## 如何决定选用 HashMap 还是 TreeMap

对于在 Map 中插入、删除和定位元素这类操作, HashMap 是最好的选择. 然而, 假如你需要对一个有序的 key 集合进行遍历, TreeMap  是更好的选择.基于你的 collection 的大小, 也许向 HashMap 中添加元素会更快, 将 map 换为TreeMap 进行有序 key 的遍历.

## Arrays.asList 获得的 List 使用时需要注意什么

在 asList () 方法中返回的 ArrayList 并不是我们常见的 java.util.ArrayList，而是在 Arrays 类中定义的一个静态内部类的实例.

它虽然继承了 AbstractList 抽象类，但并没有实现 add ()/remove ()/clear () 等方法，并且它内部存储元素的数组 a 用了 final 关键字修饰，说明它确实不支持使其长度发生改变的修改操作

## Iterater 和 ListIterator 之间有什么区别
- 使用 Iterator 来遍历 Set 和 List 集合, 而 ListIterator 只能遍历 List.
- iterator 只可以向前遍历, 而 LIstIterator 可以双向遍历.
- ListIterato r从 Iterator 接口继承, 然后添加了一些额外的功能, 比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置.

## 通过迭代器 fail-fast 属性, 你明白了什么
每次我们尝试获取下一个元素的时候, Iterator fail-fast 属性检查当前集合结构里的任何改动. 如果发现任何改动, 它抛出 ConcurrentModificationException. Collection 中所有 Iterator 的实现都是按 fail-fast 来设计的（ConcurrentHashMap 和 CopyOnWriteArrayList 这类并发集合类除外）.

fail-fast 机制是 Java 集合中的一种错误机制. 当多个线程对同一个集合的内容进行操作时, 就可能会产生 fail-fast 事件.
例如当某一个线程 A 通过 iterator 去遍历某集合的过程中, 若该集合的内容被其他线程所改变了; 那么线程 A 访问集合时,  就会抛出 ConcurrentModificationException 异常, 产生 fail-fast 事件.

#### 发生原因

在调用 next() 和 remove()时, 都会执行 checkForComodification().若 “modCount 不等于 expectedModCount”, 则抛出ConcurrentModificationException 异常, 产生 fail-fast 事件.

#### 解决方法

只需要将 ArrayList 替换成 java.util.concurrent 包下对应的类即可.
即, 将代码
`private static List<String> list = new ArrayList<String>();`
替换为
`private static List<String> list = new CopyOnWriteArrayList<String>();`

#### 解决原理

- 和 ArrayList 继承于 AbstractList 不同, CopyOnWriteArrayList 没有继承于 AbstractList , 它仅仅只是实现了 List 接口.
- ArrayList 的 iterator() 函数返回的 Iterator 是在 AbstractList 中实现的；而 CopyOnWriteArrayList 是自己实现Iterator.
- ArrayList 的 Iterator 实现类中调用 next() 时, 会调用 checkForComodification() 比较 expectedModCount 和 modCount 的大小；但是 CopyOnWriteArrayList 的 Iterator 实现类中, 没有所谓的 checkForComodification(),  更不会抛出 ConcurrentModificationException 异常！ 

## fail-fast 与 fail-safe 有什么区别
Iterator 的 fail-fast 属性与当前的集合共同起作用, 因此它不会受到集合中任何改动的影响. Java.util 包中的所有集合类都被设计为 fail-fast 的, 而 java.util.concurrent 中的集合类都为 fail-safe 的. Fail-fast 迭代器抛出ConcurrentModificationException, 而 fail-safe 迭代器从不抛出 ConcurrentModificationException.

## UnsupportedOperationException 是什么
UnsupportedOperationException 是用于表明操作不支持的异常. 在JDK类中已被大量运用, 在集合框架java.util.Collections.UnmodifiableCollection 将会在所有 add 和 remove 操作中抛出这个异常.

## 在 Java 中, HashMap 是如何工作的
HashMap 在 Map.Entry 静态内部类实现中存储 key-value 对. HashMap 使用哈希算法, 在 put 和 get 方法中, 它使用hashCode() 和 equals( )方法.当我们通过传递 key-value 对调用 put 方法的时候, HashMap 使用 Key hashCode() 和哈希算法来找出存储 key-value 对的索引. Entry 存储在 LinkedList 中, 所以如果存在 entry , 它使用 equals() 方法来检查传递的 key 是否已经存在, 如果存在, 它会覆盖 value, 如果不存在, 它会创建一个新的 entry 然后保存.当我们通过传递 key 调用 get 方法时, 它再次使用 hashCode() 来找到数组中的索引, 然后使用 equals() 方法找出正确的 Entry , 然后返回它的值

 其它关于 HashMap 比较重要的问题是 容量、负荷系数 和 阀值调整. HashMap 默认的初始容量是16 , 负荷系数是0.75 .阀值是为负荷系数乘以容量, 无论何时我们尝试添加一个 entry , 如果 map 的大小比阀值大的时候, HashMap 会对 map 的内容进行重新哈希, 且使用更大的容量.容量总是 2 的幂, 所以如果你知道你需要存储大量的 key-value 对, 比如缓存从数据库里面拉取的数据, 使用正确的容量和负荷系数对 HashMap 进行初始化是个不错的做法.

## hashCode() 和 equals() 方法有何重要性
HashMap 使用 Key 对象的 hashCode() 和 equals() 方法去决定 key-value 对的索引.当我们试着从 HashMap 中获取值的时候, 这些方法也会被用到.如果这些方法没有被正确地实现, 在这种情况下, 两个不同 Key 也许会产生相同的hashCode() 和 equals() 输出, HashMap 将会认为它们是相同的, 然后覆盖它们, 而非把它们存储到不同的地方.同样的, 所有不允许存储重复数据的集合类都使用 hashCode() 和 equals() 去查找重复, 所以正确实现它们非常重要. equals() 和 hashCode() 的实现应该遵循以下规则:

- 如果 o1.equals(o2) 为 true , 那么 o1.hashCode() == o2.hashCode() 总是为 true 的.
- 如果 o1.hashCode() == o2.hashCode() , 并不意味着 o1.equals(o2) 会为 true.

## Comparable 和 Comparator 接口是什么

- comparable 接口实际上是出自java.lang包 它有一个 `compareTo(Object obj)`方法用来排序
- comparator 接口实际上是出自 java.util 包它有一个`compare(Object obj1, Object obj2)`方法用来排序

如果我们想使用 Array 或 Collection 的排序方法时, 需要在自定义类里实现 Java 提供 Comparable 接口. Comparable接口有 compareTo(T OBJ) 方法, 它被排序方法所使用. 我们应该重写这个方法, 如果“this”对象比传递的对象参数更小、相等或更大时, 它返回一个负整数、0或正整数. 但是, 在大多数实际情况下, 我们想根据不同参数进行排序.比如, 作为一个 CEO, 我想对雇员基于薪资进行排序, 一个 HR 想基于年龄对他们进行排序. 这就是我们需要使用 Comparator 接口的情景, 因为 `Comparable.compareTo(Object o)` 方法实现只能基于一个字段进行排序, 我们不能根据对象排序的需要选择字段.
Comparator 接口的 `compare(Object o1, Object o2) `方法的实现需要传递两个对象参数, 若第一个参数比第二个小, 返回负整数；若第一个等于第二个, 返回0；若第一个比第二个大, 返回正整数.

## 我们如何对一组对象进行排序

如果我们需要对一个对象数组进行排序，我们可以使用 Arrays.sort() 方法. 如果我们需要排序一个对象列表，我们可以使用 Collection.sort() 方法. 

两个类都有用于自然排序（使用Comparable）或基于标准的排序（使用Comparator）的重载方法sort(). Collections内部使用数组排序方法，所有它们两者都有相同的性能，只是Collections需要花时间将列表转换为数组. 

## 当一个集合被作为参数传递给一个函数时, 如何才可以确保函数不能修改它
在作为参数传递之前, 我们可以使用 `Collections.unmodifiableCollection(Collection c)` 方法创建一个只读集合, 这将确保改变集合的任何操作都会抛出 UnsupportedOperationException.

## 大写的 O 是什么
大写的 O 描述的是, 就数据结构中的一系列元素而言, 一个算法的性能. Collection 类就是实际的数据结构, 我们通常基于时间、内存和性能, 使用大写的O来选择集合实现.
比如:
例子1: ArrayList 的 get(index i) 是一个常量时间操作, 它不依赖 list 中元素的数量.所以它的性能是 O(1).
例子2: 一个对于数组或列表的线性搜索的性能是 O(n) , 因为我们需要遍历所有的元素来查找需要的元素.

## 与 Java 集合框架相关的有哪些最好的实践？
- 根据需要选择正确的集合类型. 比如, 如果指定了大小, 我们会选用 Array 而非 ArrayList .如果我们想根据插入顺序遍历一个 Map, 我们需要使用 LinkedHashMap . 如果我们不想重复, 我们应该使用 Set.
- 一些集合类允许指定初始容量, 所以如果我们能够估计到存储元素的数量, 我们可以使用它, 就避免了重新哈希或大小调整.
- 基于接口编程, 而非基于实现编程, 它允许我们后来轻易地改变实现.
- 总是使用类型安全的泛型, 避免在运行时出现 ClassCastException.
- 使用 JDK 提供的不可变类作为 Map 的 key, 可以避免自己实现 hashCode() 和 equals().
- 尽可能使用 Collections 工具类, 或者获取只读、同步或空的集合, 而非编写自己的实现.它将会提高代码重用性, 它有着更好的稳定性和可维护性.

## HashMap 连环问题

### 你用过 HashMap 吗？什么是 HashMap？你为什么用到它？
HashMap 可以接受 null 键值和值, 而 Hashtable 则不能；
HashMap 是非 synchronized ; HashMap 很快；
以及 HashMap 储存的是键值对等等.

### 你知道 HashMap 的工作原理吗？ 你知道 HashMap 的 get() 方法的工作原理吗？
HashMap 是基于 hashing 的原理, 我们使用 put(key, value) 存储对象到 HashMap 中, 使用 get(key) 从 HashMap 中获取对象.
当我们给 put() 方法传递键和值时, 我们先对键调用 hashCode() 方法, 返回的 hashCode 用于找到 bucket 位置来储存 Entry 对象.

### 当两个对象的 hashcode 相同会发生什么？
hashcode相同, 所以它们的bucket 位置相同, ‘碰撞’会发生.
因为 HashMap 使用链表存储对象, 这个 Entry(包含有键值对的Map.Entry对象) 会存储在链表中.

### 如果两个键的 hashcode 相同, 你如何获取值对象？
当我们调用 get() 方法, HashMap 会使用键对象的 hashcode 找到 bucket 位置, 然后获取值对象.
如果存在链表, 会遍历链表, 首先使用 hash 对比, 然后再使用 equals 对比, 直到遍历完成.

### 如果 HashMap 的大小超过了负载因子(load factor)定义的容量, 怎么办？
默认的负载因子大小为 0.75, 也就是说, 当一个 map 填满了 75% 的 bucket 时候, 和其它集合类(如 ArrayList 等)一样, 将会创建原来 HashMap 大小的两倍的 bucket 数组, 来重新调整 map 的大小, 并将原来的对象放入新的 bucket 数组中. 这个过程叫作 rehashing , 因为它调用 hash 方法找到新的 bucket 位置.

### 你了解重新调整 HashMap 大小存在什么问题吗？
可能产生条件竞争(race condition).
当重新调整 HashMap 大小的时候, 确实存在条件竞争, 因为如果两个线程都发现 HashMap 需要重新调整大小了, 它们会同时试着调整大小.在调整大小的过程中, 存储在链表中的元素的次序会反过来, 因为移动到新的 bucket 位置的时候, HashMap 并不会将元素放在链表的尾部, 而是放在头部, 这是为了避免尾部遍历(tail traversing).如果条件竞争发生了, 那么就死循环了.


### 为什么 String, Interger 这样的 wrapper 类适合作为键？ 
String, Interger 这样的 wrapper 类作为 HashMap 的键是再适合不过了, 而且 String 最为常用.因为 String 是不可变的,  而且已经重写了 equals() 和 hashCode() 方法了.其他的 wrapper 类也有这个特点. 不可变性是必要的, 因为为了要计算 hashCode() , 就要防止键值改变, 如果键值在放入时和获取时返回不同的 hashcode 的话, 那么就不能从 HashMap中找到你想要的对象.不可变性还有其他的优点如线程安全.如果你可以仅仅通过将某个 field 声明成 final 就能保证hashCode 是不变的, 那么请这么做吧.因为获取对象的时候要用到 equals() 和 hashCode() 方法, 那么键对象正确的重写这两个方法是非常重要的.如果两个不相等的对象返回不同的 hashcode 的话, 那么碰撞的几率就会小些, 这样就能提高 HashMap 的性能.

### 我们可以使用自定义的对象作为键吗？ 
当然你可能使用任何对象作为键, 只要它遵守了 equals() 和 hashCode() 方法的定义规则, 并且当对象插入到 Map 中之后将不会再改变了.如果这个自定义对象时不可变的, 那么它已经满足了作为键的条件, 因为当它创建之后就已经不能改变了.

### 我们可以使用 ConcurrentHashMap 来代替 Hashtable 吗？
Hashtable 是 synchronized 的, 但是 ConcurrentHashMap 同步性能更好, 因为它仅仅根据同步级别对 map 的一部分进行上锁.

HashTable 虽然性能上不如 ConcurrentHashMap，但并不能完全被取代，两者的迭代器的一致性不同的，HashTable 的迭代器是强一致性的，而 ConcurrentHashMap 是弱一致的.  ConcurrentHashMap 的 get，clear，iterator 都是弱一致性的.  Doug Lea 也将这个判断留给用户自己决定是否使用 ConcurrentHashMap. 

那么什么是强一致性和弱一致性呢？

get 方法是弱一致的，是什么含义？可能你期望往 ConcurrentHashMap 底层数据结构中加入一个元素后，立马能对 get 可见，但 ConcurrentHashMap 并不能如你所愿. 换句话说，put 操作将一个元素加入到底层数据结构后，get 可能在某段时间内还看不到这个元素，若不考虑内存模型，单从代码逻辑上来看，却是应该可以看得到的.

### 如何衡量一个 hash 算法的好坏，你知道的常用 hash 算法有哪些？

如果面试者的技术面比较宽，或者算法基础以及数论基础比较好，这个问题才可以做很好的回答. 首先，hashCode () 不要求唯一但是要尽可能的均匀分布，而且算法效率要尽可能的快. 如果面试者能回答出一些常用的算法，比如 MurMurHash（萌萌哒的名字）基本上已经可以俘获面试官了. 如果面试者有编译器的背景说出了如何在编译领域使用完美哈希的场景，那就太棒了，毕竟编译原理学的好的人太少了. 当然不要忘记了，还可以再考察一下 java 中 String 类的 hashCode () 的实现：

```java
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

### java.util.Arrays
Array 是 Java 特有的数组,而  Arrays 是处理数据的工具类

- Arrays.asList: 可以从 Array 转换成 List. 可以作为其他集合类型构造器的参数.
- Arrays.binarySearch: 在一个已排序的或者其中一段中快速查找.
- Arrays.copyOf: 如果你想扩大数组容量又不想改变它的内容的时候可以使用这个方法.
- Arrays.copyOfRange: 可以复制整个数组或其中的一部分.
- Arrays.deepEquals、Arrays.deepHashCode:Arrays.equals/hashCode 的高级版本, 支持子数组的操作.
- Arrays.equals: 如果你想要比较两个数组是否相等, 应该调用这个方法而不是数组对象中的 equals 方法（数组对象中没有重写 equals()方 法, 所以这个方法之比较引用而不比较内容）.这个方法集合了Java 5 的自动装箱和无参变量的特性, 来实现将一个变量快速地传给 equals() 方法——所以这个方法在比较了对象的类型之后是直接传值进去比较的.
- Arrays.fill: 用一个给定的值填充整个数组或其中的一部分.
- Arrays.hashCode: 用来根据数组的内容计算其哈希值（数组对象的 hashCode() 不可用）.这个方法集合了 Java 5的自动装箱和无参变量的特性, 来实现将一个变量快速地传给  Arrays.hashcode 方法——只是传值进去, 不是对象.
- Arrays.sort: 对整个数组或者数组的一部分进行排序.也可以使用此方法用给定的比较器对对象数组进行排序.
- Arrays.toString: 打印数组的内容.

如果想要复制整个数组或其中一部分到另一个数组, 可以调用 System.arraycopy方法.此方法从源数组中指定的位置复制指定个数的元素到目标数组里.这无疑是一个简便的方法.（有时候用 ByteBuffer bulk复制会更快.

## Iterator是什么

Iterator 接口提供遍历任何 Collection 的接口. 我们可以从一个 Collection 中使用迭代器方法来获取迭代器实例. 迭代器取代了 Java 集合框架中的 Enumeration. 迭代器允许调用者在迭代过程中移除元素. 

## Enumeration 和 Iterator 接口的区别

Enumeration 的速度是 Iterator 的两倍，也使用更少的内存. Enumeration 是非常基础的，也满足了基础的需要. 但是与 Enumeration 相比，Iterator 更加安全，因为当一个集合正在被遍历的时候，它会阻止其它线程去修改集合. 

迭代器取代了 Java 集合框架中的 Enumeration. 迭代器允许调用者从集合中移除元素，而 Enumeration 不能做到. 为了使它的功能更加清晰，迭代器方法名已经经过改善. 

## 如何决定选用 HashMap 还是 TreeMap

对于在 Map 中插入、删除和定位元素这类操作，HashMap 是最好的选择. 然而，假如你需要对一个有序的 key 集合进行遍历，TreeMap 是更好的选择. 

基于你的 collection 的大小，也许向 HashMap 中添加元素会更快，将 map 换为 TreeMap 进行有序 key 的遍历. 

## ArrayList 和 Vector 有何异同点

ArrayList 和 Vector 在很多时候都很类似. 

1. 两者都是基于索引的，内部由一个数组支持. 

2. 两者维护插入的顺序，我们可以根据插入顺序来获取元素. 

3. ArrayList 和 Vector 的迭代器实现都是 fail-fast 的. 

4. ArrayList 和 Vector 两者允许 null 值，也可以使用索引值对元素进行随机访问. 

以下是 ArrayList 和 Vector 的不同点. 

1. Vector 是同步的，而 ArrayList 不是. 然而，如果你寻求在迭代的时候对列表进行改变，你应该使用CopyOnWriteArrayList. 

2. ArrayList 比 Vector 快，它因为有同步，不会过载. 

3. ArrayList 更加通用，因为我们可以使用 Collections 工具类轻易地获取同步列表和只读列表. 

## Array 和 ArrayList 有何区别？什么时候更适合用 Array

Array 可以容纳基本类型和对象，而 ArrayList 只能容纳对象. 

Array 是指定大小的，而 ArrayList 大小是固定的. 

Array 没有提供 ArrayList 那么多功能，比如 addAll、removeAll 和 iterator 等. 尽管 ArrayList 明显是更好的选择，但也有些时候 Array 比较好用. 

1. 如果列表的大小已经指定，大部分情况下是存储和遍历它们. 

2. 对于遍历基本数据类型，尽管 Collections 使用自动装箱来减轻编码任务，在指定大小的基本类型的列表上工作也会变得很慢. 

3. 如果你要使用多维数组，使用 Array 比 ArrayList 更容易. 

## ArrayList 和 LinkedList 有何区别

ArrayList 和 LinkedList 两者都实现了 List 接口，但是它们之间有些不同. 

1. ArrayList 是由 Array 所支持的基于一个索引的数据结构，所以它提供对元素的随机访问，复杂度为O(1)，但LinkedList 存储一系列的节点数据，每个节点都与前一个和下一个节点相连接. 所以，尽管有使用索引获取元素的方法，内部实现是从起始点开始遍历，遍历到索引的节点然后返回元素，时间复杂度为O(n)，比 ArrayList 要慢. 

2. 与 ArrayList 相比，在 LinkedList 中插入、添加和删除一个元素会更快，因为在一个元素被插入到中间的时候，不会涉及改变数组的大小，或更新索引. 

3. LinkedList 比 ArrayList 消耗更多的内存，因为 LinkedList 中的每个节点存储了前后节点的引用. 

## 哪些集合类提供对元素的随机访问

ArrayList、HashMap、TreeMap 和 HashTable 类提供对元素的随机访问. 

## 哪些集合类是线程安全的

Vector、HashTable、Properties 和 Stack 是同步类，所以它们是线程安全的，可以在多线程环境下使用. Java1.5并发 API 包括一些集合类，允许迭代时修改，因为它们都工作在集合的克隆上，所以它们在多线程环境中是安全的. 

## 并发集合类是什么

Java1.5 并发包（java.util.concurrent）包含线程安全集合类，允许在迭代时修改集合. 

迭代器被设计为 fail-fast 的，会抛出 ConcurrentModificationException. 一部分类为：CopyOnWriteArrayList、 ConcurrentHashMap、CopyOnWriteArraySet. 

## 队列和栈是什么，列出它们的区别

栈和队列两者都被用来预存储数据.  java.util.Queue 是一个接口，它的实现类在 Java 并发包中. 队列允许先进先出（FIFO）检索元素，但并非总是这样. Deque 接口允许从两端检索元素. 

栈与队列很相似，但它允许对元素进行后进先出（LIFO）进行检索. Stack 是一个扩展自 Vector 的类，而 Queue 是一个接口. 

## Collections 类是什么

Java.util.Collections 是一个工具类仅包含静态方法，它们操作或返回集合. 

它包含操作集合的多态算法，返回一个由指定集合支持的新集合和其它一些内容. 这个类包含集合框架算法的方法，比如折半搜索、排序、混编和逆序等. 

## 当一个集合被作为参数传递给一个函数时，如何才可以确保函数不能修改它

在作为参数传递之前，我们可以使用Collections.unmodifiableCollection(Collection c)方法创建一个只读集合，

这将确保改变集合的任何操作都会抛出UnsupportedOperationException. 
