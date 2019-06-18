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
HashMap 的实现不是同步的, 这意味着它不是线程安全的.它的key、value都可以为null.此外, HashMap中的映射不是有序的.

HashMap 的实例有两个参数影响其性能:“初始容量” 和 “加载因子”.容量 是哈希表中桶的数量, 初始容量 只是哈希表在创建时的容量.加载因子 是哈希表在其容量自动增加之前可以达到多满的一种尺度.当哈希表中的条目数超出了加载因子与当前容量的乘积时, 则要对该哈希表进行 rehash 操作（即重建内部数据结构）, 从而哈希表将具有大约两倍的桶数.
通常, 默认加载因子是 0.75, 这是在时间和空间成本上寻求一种折衷.加载因子过高虽然减少了空间开销, 但同时也增加了查询成本（在大多数 HashMap 类的操作中, 包括 get 和 put 操作, 都反映了这一点）.在设置初始容量时应该考虑到映射中所需的条目数及其加载因子, 以便最大限度地减少 rehash 操作次数.如果初始容量大于最大条目数除以加载因子, 则不会发生 rehash 操作.

![](./imgs/006tKfTcgw1fbfmfc7zjfj30cv0fk74k.jpg)

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



### 遍历

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

![](https://ww1.sinaimg.cn/large/006tKfTcgw1fbfmrdz22fj308c0j10t0.jpg)

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

### HashMap和Hashtable异同

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

### HashMap和WeakHashMap异同

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

### 强引用,软引用,弱引用,虚引用 