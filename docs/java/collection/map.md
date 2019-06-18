# Map

![](./imgs/006tKfTcgw1fbewpd4x40j30lm09sjro.jpg)

- Map 是映射接口, Map 中存储的内容是键值对 (key-value).
- AbstractMap 是继承于 Map 的抽象类, 它实现了 Map 中的大部分 API. 其它 Map 的实现类可以通过继承AbstractMap 来减少重复编码.
- SortedMap 是继承于 Map 的接口. SortedMap 中的内容是排序的键值对, 排序的方法是通过比较器(Comparator).
- NavigableMap 是继承于 SortedMap 的接口. 相比于 SortedMap,  NavigableMap 有一系列的导航方法；如"获取大于/等于某对象的键值对"、“获取小于/等于某对象的键值对”等等.
- TreeMap 继承于 AbstractMap, 且实现了 NavigableMap 接口；因此 TreeMap 中的内容是“有序的键值对”！
- HashMap 继承于 AbstractMap , 但没实现 NavigableMap 接口；因此 HashMap 的内容是“键值对, 但不保证次序”！
- Hashtable 虽然不是继承于 AbstractMap , 但它继承于 Dictionary(Dictionary也是键值对的接口) , 而且也实现 Map接口；因此 Hashtable 的内容也是“键值对, 也不保证次序”.但和 HashMap 相比,  Hashtable 是线程安全的, 而且它支持通过 Enumeration 去遍历.
- WeakHashMap 继承于 AbstractMap .它和 HashMap 的键类型不同,  WeakHashMap 的键是“弱键”.

在 JDK1.6中,新添加的节点是放在头节点, JDK1.8则是放在尾节点的
JDK1.8中,如果链表足够大时,将自动转换成红黑树保存


## API

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

## HashMap

HashMap 是一个散列表, 它存储的内容是键值对(key-value)映射.
HashMap 继承于AbstractMap, 实现了Map、Cloneable、java.io.Serializable接口.
HashMap 的实现不是同步的, 这意味着它不是线程安全的.

它的 key、value都可以为 null. 此外, HashMap 中的映射不是有序的.

::: tip

JDK1.8 之前 HashMap 由 数组+链表 组成的，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的（“拉链法”解决冲突）.JDK1.8 以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为 8）时，将链表转化为红黑树，以减少搜索时间。

:::



HashMap 的实例有两个参数影响其性能: `初始容量` 和 `加载因子`.

容量 是哈希表中桶的数量, 初始容量 只是哈希表在创建时的容量.

加载因子 是哈希表在其容量自动增加之前可以达到多满的一种尺度.

当哈希表中的条目数超出了加载因子与当前容量的乘积时, 则要对该哈希表进行 rehash 操作（即重建内部数据结构）, 从而哈希表将具有大约两倍的桶数.
通常默认加载因子是 `0.75`,  这是在时间和空间成本上寻求一种折衷. 加载因子过高虽然减少了空间开销, 但同时也增加了查询成本（在大多数 HashMap 类的操作中, 包括 get 和 put 操作, 都反映了这一点）.

在设置初始容量时应该考虑到映射中所需的条目数及其加载因子, 以便最大限度地减少 rehash 操作次数. 如果初始容量大于最大条目数除以加载因子, 则不会发生 rehash 操作.

![](./imgs/006tKfTcgw1fbfmfc7zjfj30cv0fk74k.jpg)

### 源码 (JDK7)

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
    // h & (length-1) 保证返回值的小于length
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



### 存储结构

内部包含了一个 Entry 类型的数组 table。

```java
transient Entry[] table;
```

Entry 存储着键值对。它包含了四个字段，从 next 字段我们可以看出 Entry 是一个链表。即数组中的每个位置被当成一个桶，一个桶存放一个链表。HashMap 使用拉链法来解决冲突，同一个链表中存放哈希值和散列桶取模运算结果相同的 Entry。

![](./imgs/409b5331.png)

```java
static class Entry<K,V> implements Map.Entry<K,V> {
    final K key;
    V value;
    Entry<K,V> next;
    int hash;

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

    public final int hashCode() {
        return Objects.hashCode(getKey()) ^ Objects.hashCode(getValue());
    }

    public final String toString() {
        return getKey() + "=" + getValue();
    }
}
```

### 拉链法原理(JDK8 之前)

所谓 **“拉链法”** 就是：将链表和数组相结合。也就是说创建一个链表数组，数组中每一格就是一个链表。若遇到哈希冲突，则将冲突的值加到链表中即可。

```java
HashMap<String, String> map = new HashMap<>();
map.put("K1", "V1");
map.put("K2", "V2");
map.put("K3", "V3");
```

- 新建一个 HashMap，默认大小为 16；
- 插入 <K1,V1> 键值对，先计算 K1 的 hashCode 为 115，使用除留余数法得到所在的桶下标 115%16=3 (为了简便这里直接使用取模, HashMap 则使用通过 `(length - 1) & hash(key)`来提高效率)。
- 插入 <K2,V2> 键值对，先计算 K2 的 hashCode 为 118，使用除留余数法得到所在的桶下标 118%16=6。
- 插入 <K3,V3> 键值对，先计算 K3 的 hashCode 为 118，使用除留余数法得到所在的桶下标 118%16=6，插在 <K2,V2> 前面。

应该注意到链表的插入是以**头插法**方式进行的，例如上面的 <K3,V3> 不是插在 <K2,V2> 后面，而是插入在链表头部。

查找需要分成两步进行：

- 计算键值对所在的桶；
- 在链表上顺序查找，时间复杂度显然和链表的长度成正比。

![](./imgs/e35ca295.png)





### 底层数据结构分析

#### JDK8 之前

JDK1.8 之前 HashMap 底层是 **数组和链表** 结合在一起使用也就是 **链表散列**。**HashMap 通过 key 的 hashCode 经过扰动函数处理过后得到 hash 值，然后通过 `(length - 1) & hash` 判断当前元素存放的位置，如果当前位置存在元素的话，就判断该元素与要存入的元素的 hash 值以及 key 是否相同，如果相同的话，直接覆盖，不相同就通过拉链法解决冲突。**

**所谓扰动函数指的就是 HashMap 的 hash 方法。使用 hash 方法也就是扰动函数是为了防止一些实现比较差的 hashCode() 方法 换句话说使用扰动函数之后可以减少碰撞。**

**JDK 1.8 HashMap 的 hash 方法源码:**

JDK 1.8 的 hash 方法 相比于 JDK 1.7 hash 方法更加简化，但是原理不变。

```java
static final int hash(Object key) {
  	int h;
  	// key.hashCode()：返回散列值也就是hashcode
  	// ^ ：按位异或
  	// >>>:无符号右移，忽略符号位，空位都以0补齐
  	return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

对比一下 JDK1.7 的 HashMap 的 hash 方法源码.

```java
final int hash(Object k) {
    int h = hashSeed;
    // 如果 key 是字符串，调用 sun.misc.Hashing.stringHash32 生成 hash 值
    // Oracle 表示能生成更好的 hash 分布，不过这在 jdk8 中已删除
    if (0 != h && k instanceof String) {
      return sun.misc.Hashing.stringHash32((String) k);
    }

    // 一次散列，调用 k 的 hashCode 方法，与 hashSeed 做异或操作
    h ^= k.hashCode();

    // 二次散列
    // This function ensures that hashCodes that differ only by
    // constant multiples at each bit position have a bounded
    // number of collisions (approximately 8 at default load factor).
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}
```

相比于 JDK1.8 的 hash 方法 ，JDK 1.7 的 hash 方法的性能会稍差一点点，因为毕竟扰动了 4 次。

##### put()

```java
public V put(K key, V value) {
    if (table == EMPTY_TABLE) {
        inflateTable(threshold);
    }
    // 键为 null 单独处理
    if (key == null)
        return putForNullKey(value);
    int hash = hash(key);
    // 确定桶下标
    int i = indexFor(hash, table.length);
    // 先找出是否已经存在键为 key 的键值对，如果存在的话就更新这个键值对的值为 value
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }

    modCount++;
    // 插入新键值对
    addEntry(hash, key, value, i);
    return null;
}
```



::: tip

HashMap 允许插入键为 null 的键值对。但是因为无法调用 null 的 hashCode() 方法，也就无法确定该键值对的桶下标，只能通过强制指定一个桶下标来存放。HashMap 使用第 0 个桶存放键为 null 的键值对。

:::

```java
private V putForNullKey(V value) {
    for (Entry<K,V> e = table[0]; e != null; e = e.next) {
        if (e.key == null) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    modCount++;
    addEntry(0, null, value, 0);
    return null;
}
```



JDK8 之前的 put 步骤如下:

1. 首先判断是否需要初始化;
2. 优先处理 key = null 的情况, 将元素存储到 table[0] 的桶中, 如果存在相同的元素, 则直接替换( HashMap 只允许存在一个 key = null 的元素);
3. 根据 key 生成 hash 从而找到桶的位置;
4. 然后遍历整个链表, 先对比 hash, 然后判断 key 是否相同来执行是否覆盖原有值, 如果相同则覆盖并返回原来的值;
5. 如果没有链表或者没有找到相同的值, 则在**表头**插入新的节点, 并将 modCount + 1, 最后返回 null;

使用链表的头插法，也就是新的键值对插在链表的头部，而不是链表的尾部。

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
  	// 先判断是否需要扩容
    if ((size >= threshold) && (null != table[bucketIndex])) {
        resize(2 * table.length);
        hash = (null != key) ? hash(key) : 0;
        bucketIndex = indexFor(hash, table.length);
    }

    createEntry(hash, key, value, bucketIndex);
}

void createEntry(int hash, K key, V value, int bucketIndex) {
    Entry<K,V> e = table[bucketIndex];
    // 头插法，链表头部指向新的键值对
    table[bucketIndex] = new Entry<>(hash, key, value, e);
    size++;
}
```

##### 确定桶下标

很多操作都需要先确定一个键值对所在的桶下标。

```
int hash = hash(key);
int i = indexFor(hash, table.length);
```

###### 计算 hash 值

```java
final int hash(Object k) {
    int h = hashSeed;
    if (0 != h && k instanceof String) {
        return sun.misc.Hashing.stringHash32((String) k);
    }

    h ^= k.hashCode();

    // This function ensures that hashCodes that differ only by
    // constant multiples at each bit position have a bounded
    // number of collisions (approximately 8 at default load factor).
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}

public final int hashCode() {
    return Objects.hashCode(key) ^ Objects.hashCode(value);
}
```

###### 取模

令 x = 1<<4，即 x 为 2 的 4 次方，它具有以下性质：

```
x   : 00010000
x-1 : 00001111
```

令一个数 y 与 x-1 做与运算，可以去除 y 位级表示的第 4 位以上数：

```
y       : 10110010
x-1     : 00001111
y&(x-1) : 00000010
```

这个性质和 y 对 x 取模效果是一样的：

```
y   : 10110010
x   : 00010000
y%x : 00000010
```

我们知道，位运算的代价比求模运算小的多，因此在进行这种计算时用位运算的话能带来更高的性能。

确定桶下标的最后一步是将 key 的 hash 值对桶个数取模：hash%capacity，如果能保证 capacity 为 2 的 n 次方，那么就可以将这个操作转换为位运算。

```java
static int indexFor(int h, int length) {
    return h & (length-1);
}
```

##### 扩容

设 HashMap 的 table 长度为 M，需要存储的键值对数量为 N，如果哈希函数满足均匀性的要求，那么每条链表的长度大约为 N/M，因此平均查找次数的复杂度为 O(N/M)。

为了让查找的成本降低，应该尽可能使得 N/M 尽可能小，因此需要保证 M 尽可能大，也就是说 table 要尽可能大。HashMap 采用动态扩容来根据当前的 N 值来调整 M 值，使得空间效率和时间效率都能得到保证。

和扩容相关的参数主要有：capacity、size、threshold 和 load_factor。

| 参数       | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| capacity   | table 的容量大小，默认为 16。需要注意的是 capacity 必须保证为 2 的 n 次方。 |
| size       | 键值对数量。                                                 |
| threshold  | size 的临界值，当 size 大于等于 threshold 就必须进行扩容操作。 |
| loadFactor | 装载因子，table 能够使用的比例，threshold = capacity * loadFactor。 |

```java
static final int DEFAULT_INITIAL_CAPACITY = 16;

static final int MAXIMUM_CAPACITY = 1 << 30;

static final float DEFAULT_LOAD_FACTOR = 0.75f;

transient Entry[] table;

transient int size;

int threshold;

final float loadFactor;

transient int modCount;
```

从下面的添加元素代码中可以看出，当需要扩容时，令 capacity 为原来的两倍。

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
    Entry<K,V> e = table[bucketIndex];
    table[bucketIndex] = new Entry<>(hash, key, value, e);
    if (size++ >= threshold)
        resize(2 * table.length);
}
```

扩容使用 resize() 实现，需要注意的是，扩容操作同样需要把 oldTable 的所有键值对重新插入 newTable 中，因此这一步是很费时的。

```java
void resize(int newCapacity) {
    Entry[] oldTable = table;
    int oldCapacity = oldTable.length;
    if (oldCapacity == MAXIMUM_CAPACITY) {
        threshold = Integer.MAX_VALUE;
        return;
    }
    Entry[] newTable = new Entry[newCapacity];
    transfer(newTable);
    table = newTable;
    threshold = (int)(newCapacity * loadFactor);
}

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
```

###### 重新计算桶下标

在进行扩容时，需要把键值对重新放到对应的桶上。HashMap 使用了一个特殊的机制，可以降低重新计算桶下标的操作。

假设原数组长度 capacity 为 16，扩容之后 new capacity 为 32：

```java
capacity     : 00010000
new capacity : 00100000
```

对于一个 Key，

- 它的哈希值如果在第 5 位上为 0，那么取模得到的结果和之前一样；
- 如果为 1，那么得到的结果为原来的结果 +16。

###### 计算数组容量

HashMap 构造函数允许用户传入的容量不是 2 的 n 次方，因为它可以自动地将传入的容量转换为 2 的 n 次方。

先考虑如何求一个数的掩码，对于 10010000，它的掩码为 11111111，可以使用以下方法得到：

```java
mask |= mask >> 1    11011000
mask |= mask >> 2    11111110
mask |= mask >> 4    11111111
```

mask+1 是大于原始数字的最小的 2 的 n 次方。

```java
num     10010000
mask+1 100000000
```

以下是 HashMap 中计算数组容量的代码：

```java
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

#### JDK8 之后

相比于之前的版本，JDK8 在解决哈希冲突时有了较大的变化，当链表长度大于阈值(默认为 `8`)时，将链表转化为红黑树，以减少搜索时间, 当链表长度小于阈值时, 将红黑树转为链表(默认为  `6`)。

![](./imgs/23431c20.png)

**类的属性：**

```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable {
    // 序列号
    private static final long serialVersionUID = 362498820763181265L;    
    // 默认的初始容量是16
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;   
    // 最大容量
    static final int MAXIMUM_CAPACITY = 1 << 30; 
    // 默认的填充因子
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    // 当桶(bucket)上的结点数大于这个值时会转成红黑树
    static final int TREEIFY_THRESHOLD = 8; 
    // 当桶(bucket)上的结点数小于这个值时树转链表
    static final int UNTREEIFY_THRESHOLD = 6;
    // 桶中结构转化为红黑树对应的table的最小大小
    static final int MIN_TREEIFY_CAPACITY = 64;
    // 存储元素的数组，总是2的幂次倍
    transient Node<k,v>[] table; 
    // 存放具体元素的集
    transient Set<map.entry<k,v>> entrySet;
    // 存放元素的个数，注意这个不等于数组的长度。
    transient int size;
    // 每次扩容和更改map结构的计数器
    transient int modCount;   
    // 临界值 当实际大小(容量*填充因子)超过临界值时，会进行扩容
    int threshold;
    // 加载因子
    final float loadFactor;
}
```

- **loadFactor 加载因子**

  loadFactor加载因子是控制数组存放数据的疏密程度，loadFactor越趋近于1，那么 数组中存放的数据(entry)也就越多，也就越密，也就是会让链表的长度增加，loadFactor 越小，也就是趋近于 0，数组中存放的数据(entry)也就越少，也就越稀疏。

  **loadFactor 太大导致查找元素效率低，太小导致数组的利用率低，存放的数据会很分散。loadFactor 的默认值为 `0.75f` 是官方给出的一个比较好的临界值**。

  给定的默认容量为 `16`，负载因子为 `0.75`。Map 在使用过程中不断的往里面存放数据，当数量达到了 16 * 0.75 = 12 就需要将当前 16 的容量进行扩容，而扩容这个过程涉及到 **rehash**、**复制数据**等操作，所以非常消耗性能。

- **threshold**

  **threshold = capacity \* loadFactor**，当 **size >= threshold **的时候，那么就要考虑对数组的扩增了，也就是说，这个的意思就是 **衡量数组是否需要扩增的一个标准**。

**Node节点类源码:**

```java
// 继承自 Map.Entry<K,V>
static class Node<K,V> implements Map.Entry<K,V> {
       final int hash;// 哈希值，存放元素到hashmap中时用来与其他元素hash值比较
       final K key;//键
       V value;//值
       // 指向下一个节点
       Node<K,V> next;
       Node(int hash, K key, V value, Node<K,V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }
        public final K getKey()        { return key; }
        public final V getValue()      { return value; }
        public final String toString() { return key + "=" + value; }
        // 重写hashCode()方法
        public final int hashCode() {
            return Objects.hashCode(key) ^ Objects.hashCode(value);
        }

        public final V setValue(V newValue) {
            V oldValue = value;
            value = newValue;
            return oldValue;
        }
        // 重写 equals() 方法
        public final boolean equals(Object o) {
            if (o == this)
                return true;
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                if (Objects.equals(key, e.getKey()) &&
                    Objects.equals(value, e.getValue()))
                    return true;
            }
            return false;
        }
}
```

**树节点类源码:**

```java
static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
        TreeNode<K,V> parent;  // 父
        TreeNode<K,V> left;    // 左
        TreeNode<K,V> right;   // 右
        TreeNode<K,V> prev;    // needed to unlink next upon deletion
        boolean red;           // 判断颜色
        TreeNode(int hash, K key, V val, Node<K,V> next) {
            super(hash, key, val, next);
        }
        // 返回根节点
        final TreeNode<K,V> root() {
            for (TreeNode<K,V> r = this, p;;) {
                if ((p = r.parent) == null)
                    return r;
                r = p;
       }
```

##### 构造方法

```java
// 默认构造函数。
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all   other fields defaulted
 }
 
 // 包含另一个“Map”的构造函数
 public HashMap(Map<? extends K, ? extends V> m) {
     this.loadFactor = DEFAULT_LOAD_FACTOR;
     putMapEntries(m, false);//下面会分析到这个方法
 }
 
 // 指定“容量大小”的构造函数
 public HashMap(int initialCapacity) {
     this(initialCapacity, DEFAULT_LOAD_FACTOR);
 }
 
 // 指定“容量大小”和“加载因子”的构造函数
 public HashMap(int initialCapacity, float loadFactor) {
     if (initialCapacity < 0)
         throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
     if (initialCapacity > MAXIMUM_CAPACITY)
         initialCapacity = MAXIMUM_CAPACITY;
     if (loadFactor <= 0 || Float.isNaN(loadFactor))
         throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
     this.loadFactor = loadFactor;
     this.threshold = tableSizeFor(initialCapacity);
 }
```

**putMapEntries()**

```java
final void putMapEntries(Map<? extends K, ? extends V> m, boolean evict) {
    int s = m.size();
    if (s > 0) {
        // 判断table是否已经初始化
        if (table == null) { // pre-size
            // 未初始化，s为m的实际元素个数
            float ft = ((float)s / loadFactor) + 1.0F;
            int t = ((ft < (float)MAXIMUM_CAPACITY) ?
                    (int)ft : MAXIMUM_CAPACITY);
            // 计算得到的t大于阈值，则初始化阈值
            if (t > threshold)
                threshold = tableSizeFor(t);
        }
        // 已初始化，并且m元素个数大于阈值，进行扩容处理
        else if (s > threshold)
            resize();
        // 将m中的所有元素添加至HashMap中
        for (Map.Entry<? extends K, ? extends V> e : m.entrySet()) {
            K key = e.getKey();
            V value = e.getValue();
            putVal(hash(key), key, value, false, evict);
        }
    }
}
```

##### put()

HashMap 只提供了 put 用于添加元素，putVal 方法只是给 put 方法调用的一个方法，并没有提供给用户使用。

**对 putVal() 添加元素的分析如下：**

- 如果定位到的数组位置没有元素 就直接插入。
- 如果定位到的数组位置有元素就和要插入的 key 比较，如果 key 相同就直接覆盖，如果 key 不相同，就判断 p是否是一个树节点，如果是就调用 `e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value)` 将元素添加进入。如果不是就遍历链表插入(插入的是**链表尾部**)。

![](./imgs/1d00a19e.png)

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // table未初始化或者长度为0，进行扩容
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // (n - 1) & hash 确定元素存放在哪个桶中，桶为空，新生成结点放入桶中(此时，这个结点是放在数组中)
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    // 桶中已经存在元素
    else {
        Node<K,V> e; K k;
        // 比较桶中第一个元素(数组中的结点)的hash值相等，key相等
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
                // 将第一个元素赋值给e，用e来记录
                e = p;
        // hash值不相等，即key不相等；为红黑树结点
        else if (p instanceof TreeNode)
            // 放入树中
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 为链表结点
        else {
            // 在链表最末插入结点
            for (int binCount = 0; ; ++binCount) {
                // 到达链表的尾部
                if ((e = p.next) == null) {
                    // 在尾部插入新结点
                    p.next = newNode(hash, key, value, null);
                    // 结点数量达到阈值，转化为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    // 跳出循环
                    break;
                }
                // 判断链表中结点的key值与插入的元素的key值是否相等
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    // 相等，跳出循环
                    break;
                // 用于遍历桶中的链表，与前面的e = p.next组合，可以遍历链表
                p = e;
            }
        }
        // 表示在桶中找到key值、hash值与插入元素相等的结点
        if (e != null) { 
            // 记录e的value
            V oldValue = e.value;
            // onlyIfAbsent为false或者旧值为null
            if (!onlyIfAbsent || oldValue == null)
                //用新值替换旧值
                e.value = value;
            // 访问后回调
            afterNodeAccess(e);
            // 返回旧值
            return oldValue;
        }
    }
    // 结构性修改
    ++modCount;
    // 实际大小大于阈值则扩容
    if (++size > threshold)
        resize();
    // 插入后回调
    afterNodeInsertion(evict);
    return null;
} 
```

JDK8 之后的 put 步骤如下:

1. 判断当前桶是否为空，空的就需要初始化（resize 中会判断是否进行初始化）。
2. 根据当前 key 的 hashcode 定位到具体的桶中并判断是否为空，为空表明没有 Hash 冲突就直接在当前位置创建一个新桶即可。
3. 如果当前桶有值（ Hash 冲突），那么就要比较当前桶中的 `key、key 的 hashcode`与写入的 key 是否相等，相等就赋值给 `e`, 在第 8 步的时候会统一进行赋值及返回。
4. 如果当前桶为红黑树，那就要按照红黑树的方式写入数据。
5. 如果是个链表，就需要将当前的 key、value 封装成一个新节点写入到当前桶的后面（形成链表）。
6. 接着判断当前链表的大小是否大于预设的阈值，大于时就要转换为红黑树。
7. 如果在遍历过程中找到 key 相同时直接退出遍历。
8. 如果 `e != null` 就相当于存在相同的 key, 那就需要将值覆盖。
9. 最后判断是否需要进行扩容。



我们再来对比一下 JDK1.7 put 方法的代码**

**对于 put() 的分析如下：**

- 如果定位到的数组位置没有元素 就直接插入。
- 如果定位到的数组位置有元素，遍历以这个元素为头结点的链表，依次和插入的 key 比较，如果 key 相同就直接覆盖，不同就采用**头插法**插入元素。

```java
public V put(K key, V value)
    if (table == EMPTY_TABLE) { 
    inflateTable(threshold); 
}  
    if (key == null)
        return putForNullKey(value);
    int hash = hash(key);
    int i = indexFor(hash, table.length);
    for (Entry<K,V> e = table[i]; e != null; e = e.next) { // 先遍历
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue; 
        }
    }

    modCount++;
    addEntry(hash, key, value, i);  // 再插入
    return null;
}
```

##### get()

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        // 数组元素相等
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        // 桶中不止一个节点
        if ((e = first.next) != null) {
            // 在树中get
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            // 在链表中get
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

- 首先将 key hash 之后取得所定位的桶。
- 如果桶为空则直接返回 null 。
- 否则判断桶的第一个位置 (有可能是链表、红黑树) 的 key 是否为查询的 key，是就直接返回 value。
- 如果第一个不匹配，则判断它的下一个是红黑树还是链表。
- 红黑树就按照树的查找方式返回值。
- 不然就按照链表的方式遍历匹配返回值。

##### resize()

进行扩容，会伴随着一次重新 hash 分配，并且会遍历 hash 表中所有的元素，是非常耗时的。在编写程序中，要尽量避免 resize。

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        // 超过最大值就不再扩充了，就只好随你碰撞去吧
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 没超过最大值，就扩充为原来的2倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else { 
        // signifies using defaults
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    // 计算新的resize上限
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ? (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    if (oldTab != null) {
        // 把每个bucket都移动到新的buckets中
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { 
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        // 原索引
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        // 原索引+oldCap
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 原索引放到bucket里
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    // 原索引+oldCap放到bucket里
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

#### JDK8 对 HashMap 的优化点

1.  JDK8 中没有 indexFor 函数，直接使用 `table [index = (n – 1) & hash]`（与运算交换左右，结果不变）。其中 table 数组为 HashMap 解决哈希冲突的数组 + 链表法中的数组;
2.  旧版本的 HashMap 存在一个问题，即使负载因子和 Hash 算法设计的再合理，也免不了会出现拉链过长的情况，一旦出现拉链过长，则会严重影响 HashMap 的性能 (时间复杂度是 `O(n)`)。于是，在 JDK8 版本中，对数据结构做了进一步的优化，引入了**红黑树**。而当链表长度太长（TREEIFY_THRESHOLD 默认超过  **8**, 并且 `table` 的长度不小于64(否则扩容一次)）时，链表就转换为红黑树，利用红黑树快速增删改查的特点提高 HashMap 的性能（`O (logn)`）。当长度小于（UNTREEIFY_THRESHOLD 默认为 **6**），就会退化成链表;

3. JDK8 充分利用缓存的 hash, 避免像 JDK7 每次 resize 时都要重新计算 hash;

经过观测可以发现，HashMap 使用的是 2 次幂的扩容 (指长度扩为原来 2 倍)。所以元素的位置要么是在原位置，要么是在原位置再移动 2 次幂的位置。看下图可以明白这句话的意思，n 为 table 的长度，图 (a) 表示扩容前的 key1 和 key2 两种 key 确定索引位置的示例，图 (b) 表示扩容后 key1 和 key2 两种 key 确定索引位置的示例，其中 hash1 是 key1 对应的哈希与高位运算（即 hash () 函数）结果。

![](./imgs/058e3ded.png)


   扩容后，table 长度 (n) 变为原来两倍，即 n 由

    0000 0000 0000 0000 0000 0000 0001 0000
    
    变为
    
    0000 0000 0000 0000 0000 0000 0010 0000

  因此 n-1 由

    0000 0000 0000 0000 0000 0000 0000 1111
    
    变为
    
    0000 0000 0000 0000 0000 0000 0001 1111

元素在重新计算 hash 之后，因为 n 变为 2 倍，那么 n-1 的 mask 范围在高位多 1bit (红色)，因此新的 index 就会发生这样的变化：

![](./imgs/ebc103f6.png)

因此，我们在扩充 HashMap 的时候，不需要像 JDK7 的实现那样重新计算 hash，**只需要看看原来的 hash 值新增的那个 bit 是 1 还是 0 就好了，是 0 的话索引没变，是 1 的话索引变成 `原索引 + oldCap`**。(每个节点 e 的 hash 早就计算好，并保存在 final hash 中)。通过 `if ((e.hash & oldCap) == 0)` 判定前面那个 bit 是不是 1，如果是 1 则加上 oldCap。

```java
if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
```

### HashMap 常用方法测试

```java
package map;

import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

public class HashMapDemo {

    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<String, String>();
        // 键不能重复，值可以重复
        map.put("san", "张三");
        map.put("si", "李四");
        map.put("wu", "王五");
        map.put("wang", "老王");
        map.put("wang", "老王2");// 老王被覆盖
        map.put("lao", "老王");
        System.out.println("-------直接输出hashmap:-------");
        System.out.println(map);
        /**
         * 遍历HashMap
         */
        // 1.获取Map中的所有键
        System.out.println("-------foreach获取Map中所有的键:------");
        Set<String> keys = map.keySet();
        for (String key : keys) {
            System.out.print(key+"  ");
        }
        System.out.println();//换行
        // 2.获取Map中所有值
        System.out.println("-------foreach获取Map中所有的值:------");
        Collection<String> values = map.values();
        for (String value : values) {
            System.out.print(value+"  ");
        }
        System.out.println();//换行
        // 3.得到key的值的同时得到key所对应的值
        System.out.println("-------得到key的值的同时得到key所对应的值:-------");
        Set<String> keys2 = map.keySet();
        for (String key : keys2) {
            System.out.print(key + "：" + map.get(key)+"   ");

        }
        /**
         * 另外一种不常用的遍历方式
         */
        // 当我调用put(key,value)方法的时候，首先会把key和value封装到
        // Entry这个静态内部类对象中，把Entry对象再添加到数组中，所以我们想获取
        // map中的所有键值对，我们只要获取数组中的所有Entry对象，接下来
        // 调用Entry对象中的getKey()和getValue()方法就能获取键值对了
        Set<java.util.Map.Entry<String, String>> entrys = map.entrySet();
        for (java.util.Map.Entry<String, String> entry : entrys) {
            System.out.println(entry.getKey() + "--" + entry.getValue());
        }
        
        /**
         * HashMap其他常用方法
         */
        System.out.println("after map.size()："+map.size());
        System.out.println("after map.isEmpty()："+map.isEmpty());
        System.out.println(map.remove("san"));
        System.out.println("after map.remove()："+map);
        System.out.println("after map.get(si)："+map.get("si"));
        System.out.println("after map.containsKey(si)："+map.containsKey("si"));
        System.out.println("after containsValue(李四)："+map.containsValue("李四"));
        System.out.println(map.replace("si", "李四2"));
        System.out.println("after map.replace(si, 李四2):"+map);
    }

}
```

### 遍历

遍历 HashMap 的键值对:

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

遍历 HashMap 的键

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

遍历 HashMap 的值

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



### 并发问题

HashMap 并发场景下使用时容易出现死循环

```java
final HashMap<String, String> map = new HashMap<>();
for (int i = 0; i < 10000; i++) {
    new Thread(new Runnable() {
        @Override
        public void run() {
            map.put(UUID.randomUUID().toString(), "");
        }
    }).start();
}
```

#### 原因

Hash 表的尺寸和容量非常的重要。一般来说，Hash 表这个容器当有数据要插入时，都会检查容量有没有超过设定的 threshold，如果超过，需要增大 Hash 表的尺寸，但是这样一来，整个 Hash 表里的元素都需要被重算一遍。这叫 rehash，这个成本相当的大

HashMap 在并发下发生死链涉及到 4 个方法, 最初的起因是调用 put():

```java
public V put(K key, V value) {
    ......
    //计算Hash值
    int hash = hash(key.hashCode());
    int i = indexFor(hash, table.length);
    // 如果该 key 已存在，则替换掉旧的 value
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    modCount++;
    // 该key 不存在，需要增加一个结点
    addEntry(hash, key, value, i);
    return null;
}
```

当 key 不存在时，调用 addEntry () 方法添加新节点:

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
  	// 查看当前的 size 是否超过了设定的阈值 threshold，如果超过，需要 resize
  	if ((size >= threshold) && (null != table[bucketIndex])) {
    		resize(2 * table.length);
    		hash = (null != key) ? hash(key) : 0;
    		bucketIndex = indexFor(hash, table.length);
  	}

  	createEntry(hash, key, value, bucketIndex);
}
```

resize () 方法就是产生并发死锁的原因:

```java
void resize(int newCapacity) {
  	Entry[] oldTable = table;
  	int oldCapacity = oldTable.length;
  	if (oldCapacity == MAXIMUM_CAPACITY) {
    	threshold = Integer.MAX_VALUE;
    	return;
  	}
    // 创建一个指定大小的数组
    Entry[] newTable = new Entry[newCapacity];
  	// 将 Old Hash Table 上的数据迁移到 New Hash Table 上
    transfer(newTable, initHashSeedAsNeeded(newCapacity));
    // table 索引替换成新数组
    table = newTable;
    // 重新计算阈值
    threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
}
```

resize () 方法的本质就是创建新的 Entry 数组，将原 Map 中的元素重新计算位置，加入到新的 Map 中。虽然死锁的成因是扩充时调用 resize () 方法，但真正的产生是发生在 `transfer()` 中。

```java
void transfer(Entry[] newTable, boolean rehash) {
    int newCapacity = newTable.length;
    // 遍历旧的数组, 从 OldTable 将元素一个个拿出来，然后放到 NewTable 中
    for (Entry<K,V> e : table) {
        while(null != e) {
          Entry<K,V> next = e.next;
          if (rehash) {
            e.hash = null == e.key ? 0 : hash(e.key);
          }
          // 根据新的数组长度，重新计算索引
          int i = indexFor(e.hash, newCapacity);
          // 重设 e.next 指向节点
          e.next = newTable[i];
          // 将 e 放到索引为 i 处
          newTable[i] = e;
          // 将 e 设置成下个节点
          e = next;
        }
    }
}
```

该方法实现的机制就是将每个链表转化到新链表，并且链表中的**位置发生反转**，而这在多线程情况下是很容易造成链表回路，从而发生 get() 死循环。所以只要保证建新链时还是按照原来的顺序的话就不会产生循环（JDK 8 的改进）

整个过程如下:

![](./imgs/3ec6ae8e.png)

transfe 过程

假设 hash 算法就是简单的用 key mod Entry 数组的长度。这里一定注意 e 和 next 的指向，当并发 resize () 时，这两个指针对于死锁产生起着至关重要的作用。根据方法执行情况，原 Map 中的链表元素在新的 Map 中将顺序颠倒，如上图所示，经过一次 resize () 后 key 为 7 的节点排在了 key 为 3 的节点之前。

```java
do {
  Entry<K,V> next = e.next;
  //计算节点在新的Map中的位置
  int i = indexFor(e.hash, newCapacity);
  e.next = newTable[i];
  newTable[i] = e;
   e = next;
} while (e != null);
```

再次黏贴这段代码就是强调这个 do while 循环就是产生死锁的罪魁祸首。下面模拟死锁产生的过程。
注意，并非所有情况下都会产生死锁，这也需要线程之间的默契配合，怎么讲呢，如图所示：

```java
do {
  Entry<K,V> next = e.next; //假设线程一执行至此被挂起，执行线程二
  int i = indexFor(e.hash, newCapacity);
  e.next = newTable[i];
  newTable[i] = e;
   e = next;
} while (e != null);
```

![线程一的记录状态](./imgs/f62e2471.png)


此时线程一，e 指向 key 为 3 的节点，next 指向 key 为 7 的节点。这点很重要，记下来。去执行线程二。
假设线程二正常执行，结束后的状态如下：

![线程二正常执行](./imgs/ada96706.png)

此时线程一被唤醒，线程一的工作空间里，e 和 next 指向的元素依旧是 key 为 3 和 7 的节点。线程一开始执行。

先是执行 newTalbe[i] = e。
然后是e = next，导致了e指向了key(7)。
而下一次循环的next = e.next导致了next指向了key(3)。

![线程一执行](./imgs/aa5d58c4.png)

目前还没发生问题，线程一接着工作。把 key (7) 摘下来，放到 newTable [i] 的第一个，然后把 e 和 next 往下移。

![线程一执行](./imgs/ba5cce2a.png)

e.next = newTable [i] 导致 key (3).next 指向了 key (7)。注意：此时的 key (7).next 已经指向了 key (3)， 环形链表就这样出现了。

![](./imgs/ca8acda6.png)

#### 修复

从 JDK1.8 开始修复了死循环问题，不再是头插方式，而是后插入的放在尾部, 并且扩容后不再是一边遍历一边从共享数组中取值，而是组装完毕链表后直接赋值给共享数组。

#### 为什么线程不安全

HashMap 在并发时可能出现的问题主要是两方面：

1. 如果多个线程同时使用 put 方法添加元素，而且假设正好存在两个 put 的 key 发生了碰撞（根据 hash 值计算的 bucket 一样），那么根据 HashMap 的实现，这两个 key 会添加到数组的同一个位置，这样最终就会发生其中一个线程 put 的数据被覆盖
2. 如果多个线程同时检测到元素个数超过数组大小 * loadFactor，这样就会发生多个线程同时对 Node 数组进行扩容，都在重新计算元素位置以及复制数据，但是最终只有一个线程扩容后的数组会赋给 table，也就是说其他线程的都会丢失，并且各自线程 put 的数据也丢失

## ConcurrentHashMap

在多线程环境下, 建议使用 ConcurrentHashMap

### JDK7



### JDK8



## EnumMap

## LinkedHashMap

## TreeMap

- TreeMap 是一个有序的key-value集合, 它是通过红黑树实现的.
- TreeMap 继承于AbstractMap, 所以它是一个Map, 即一个key-value集合.
- TreeMap 实现了NavigableMap接口, 意味着它支持一系列的导航方法.比如返回有序的key集合.
- TreeMap 实现了Cloneable接口, 意味着它能被克隆.
- TreeMap 实现了java.io.Serializable接口, 意味着它支持序列化.

TreeMap基于红黑树（Red-Black tree）实现.该映射根据其键的自然顺序进行排序, 或者根据创建映射时提供的 Comparator 进行排序, 具体取决于使用的构造方法.
TreeMap的基本操作 containsKey、get、put 和 remove 的时间复杂度是 log(n) .
另外, TreeMap是非同步的. 它的iterator 方法返回的迭代器是fail-fastl的.

![](./imgs/006tKfTcgw1fbfmrdz22fj308c0j10t0.jpg)

- TreeMap实现继承于AbstractMap, 并且实现了NavigableMap接口.
- TreeMap的本质是R-B Tree(红黑树), 它包含几个重要的成员变量: root, size, comparator.root 是红黑数的根节点.它是Entry类型, Entry是红黑数的节点, 它包含了红黑数的6个基本组成成分:key(键)、value(值)、left(左孩子)、right(右孩子)、parent(父节点)、color(颜色).Entry节点根据key进行排序, Entry节点包含的内容为value. 
- 红黑数排序时, 根据Entry中的key进行排序；Entry中的key比较大小是根据比较器comparator来进行判断的.
- size是红黑数中节点的个数.

## WeakHashMap

- WeakHashMap 继承于AbstractMap, 实现了Map接口.

- 和HashMap一样, WeakHashMap 也是一个散列表, 它存储的内容也是键值对(key-value)映射, 而且键和值都可以是null.

- 不过WeakHashMap的键是“弱键”.在 WeakHashMap 中, 当某个键不再正常使用时, 会被从WeakHashMap中被自动移除.更精确地说, 对于一个给定的键, 其映射的存在并不阻止垃圾回收器对该键的丢弃, 这就使该键成为可终止的, 被终止, 然后被回收.某个键被终止时, 它对应的键值对也就从映射中有效地移除了.

  这个“弱键”的原理呢？大致上就是, 通过WeakReference和ReferenceQueue实现的. WeakHashMap的key是“弱键”, 即是WeakReference类型的；ReferenceQueue是一个队列, 它会保存被GC回收的“弱键”.实现步骤是:

- 新建WeakHashMap, 将“键值对”添加到WeakHashMap中.
      实际上, WeakHashMap是通过数组table保存Entry(键值对)；每一个Entry实际上是一个单向链表, 即Entry是键值对链表.

- 当某“弱键”不再被其它对象引用, 并被GC回收时.在GC回收该“弱键”时, 这个“弱键”也同时会被添加到ReferenceQueue(queue)队列中.

- 当下一次我们需要操作WeakHashMap时, 会先同步table和queue.table中保存了全部的键值对, 而queue中保存被GC回收的键值对；同步它们, 就是删除table中被GC回收的键值对.

![](./imgs/006tKfTcgw1fbfn51abk9j30dl0fk0t2.jpg)

- WeakHashMap继承于AbstractMap, 并且实现了Map接口.
- WeakHashMap是哈希表, 但是它的键是"弱键".WeakHashMap中保护几个重要的成员变量:table, size, threshold, loadFactor, modCount, queue.
- table是一个Entry[]数组类型, 而Entry实际上就是一个单向链表.哈希表的"key-value键值对"都是存储在Entry数组中的. 
- size是Hashtable的大小, 它是Hashtable保存的键值对的数量. 
- threshold是Hashtable的阈值, 用于判断是否需要调整Hashtable的容量.threshold的值="容量*加载因子".
- loadFactor就是加载因子. 
- modCount是用来实现fail-fast机制的
- queue保存的是“已被GC清除”的“弱引用的键”.

## Map 总结

- Map 是“键值对”映射的抽象接口.
- AbstractMap 实现了Map中的绝大部分函数接口.它减少了“Map的实现类”的重复编码.
- SortedMap 有序的“键值对”映射接口.
- NavigableMap 是继承于SortedMap的, 支持导航函数的接口.
- HashMap, Hashtable, TreeMap, WeakHashMap这4个类是“键值对”映射的实现类.它们各有区别！
  - HashMap 是基于“拉链法”实现的散列表.一般用于单线程程序中.
  - Hashtable 也是基于“拉链法”实现的散列表.它一般用于多线程程序中.
  - WeakHashMap 也是基于“拉链法”实现的散列表, 它一般也用于单线程程序中.相比HashMap, WeakHashMap中的键是“弱键”, 当“弱键”被GC回收时, 它对应的键值对也会被从WeakHashMap中删除；而HashMap中的键是强键.
  - TreeMap 是有序的散列表, 它是通过红黑树实现的.它一般用于单线程中存储有序的映射.

### HashMap 和 Hashtable 异同

**相同点**:
HashMap和Hashtable都是存储“键值对(key-value)”的散列表, 而且都是采用拉链法实现的.
存储的思想都是:通过table数组存储, 数组的每一个元素都是一个Entry；而一个Entry就是一个单向链表, Entry链表中的每一个节点就保存了key-value键值对数据.

**添加key-value键值对**:首先, 根据key值计算出哈希值, 再计算出数组索引(即, 该key-value在table中的索引).然后, 根据数组索引找到Entry(即, 单向链表), 再遍历单向链表, 将key和链表中的每一个节点的key进行对比.若key已经存在Entry链表中, 则用该value值取代旧的value值；若key不存在Entry链表中, 则新建一个key-value节点, 并将该节点插入Entry链表的表头位置.
**删除key-value键值对**:删除键值对, 相比于“添加键值对”来说, 简单很多.首先, 还是根据key计算出哈希值, 再计算出数组索引(即, 该key-value在table中的索引).然后, 根据索引找出Entry(即, 单向链表).若节点key-value存在与链表Entry中, 则删除链表中的节点即可.

**不同点**:

- HashMap 继承于AbstractMap, 实现了Map、Cloneable、java.io.Serializable接口.
- Hashtable 继承于Dictionary, 实现了Map、Cloneable、java.io.Serializable接口.
- Hashtable 的几乎所有函数都是同步的, 即它是线程安全的, 支持多线程.
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

### HashMap 和 WeakHashMap 异同

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

### Collections.synchronizedMap 和 ConcurrentHashMap

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

![](./imgs/006y8lVagw1fbdjc2qqs8j308008ga9z.jpg)
