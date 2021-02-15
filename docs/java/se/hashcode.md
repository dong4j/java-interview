# Hashcode的作用

[👈 **相关面试题**](./README.md#_49-👉-hashcode-与-equals)

## HashCode的特性

1. HashCode的存在主要是用于**查找的快捷性**, 如Hashtable, HashMap等, HashCode经常用于**确定对象的存储地址**.
2. **如果两个对象相同**, ?equals方法一定返回true, 并且这两个对象的**HashCode一定相同**.
3. **两个对象的HashCode相同, 并不一定表示两个对象就相同**, 即equals()不一定为true, 只能够说明这两个对象在一个散列存储结构中.
4. 如果对象的equals方法被重写, 那么对象**的HashCode也尽量重写**.

## HashCode作用

Java中的集合有两类, 一类是**List**, 再有一类**是Set**.前者集合内的元素是有序的, 元素可以重复；后者元素无序, 但元素**不可重复**.

**equals方法可用于保证元素不重复**, 但如果每增加一个元素就检查一次, 若集合中现在已经有1000个元素, 那么第1001个元素加入集合时, 就要调用1000次equals方法.这显然会大大降低效率.?于是, Java采用了**哈希表的原理**.

哈希算法也称为散列算法, 是将数据依特定算法直接指定到一个地址上.

这样一来, 当集合要**添加新的元素时**, 先调用这个**元素的HashCode方法**, 就一下子能**定位到它应该放置的物理位置上**.

1. 如果这个位置上没有元素, 它就可以直接存储在这个位置上, 不用再进行任何比较了.
2. 如果这个位置上已经有元素了, 就调用它的equals方法与新元素进行比较, 相同的话就不存了.
3. 不相同的话, 也就是发生了Hash key相同导致**冲突的情况**, 那么就在这个Hash key的地方产生一个链表, 将所有产生相同HashCode的对象放到这个单链表上去, 串在一起（很少出现）.

这样一来实际调用equals方法的次数就大大降低了, 几乎只需要一两次.

**如何理解HashCode的作用:**

从Object角度看, JVM每new一个Object, 它都会将这个Object丢到一个Hash表中去, 这样的话, 下次做Object的**比较或者取**这个对象的时候（读取过程）, 它会根据对象的HashCode再从Hash表中取这个对象.这样做的目的是**提高取对象的效率**.若HashCode相同再去调用equal.

## HashCode实践（如何用来查找）

**HashCode是用于查找使用的, 而equals是用于比较两个对象是否相等的**.

（1）例如内存中有这样的位置

```
0 1 2 3 4 5 6 7
```


而我有个类, 这个类有个字段叫ID, 我要把这个类存放在以上**8个位置之一**, 如果不用HashCode而任意存放, 那么当查找时就需要到这八个位置里挨个去找, 或者用二分法一类的算法.

**但以上问题如果用HashCode就会使效率提高很多** 定义我们的HashCode为ID％8, 比如我们的ID为9, 9除8的余数为1, 那么我们就把该类存在1这个位置, 如果ID是13, 求得的余数是5, 那么我们就把该类放在5这个位置.依此类推.

（2）但是如果两个类有相同的HashCode, 例如9除以8和17除以8的余数都是1, **也就是说, 我们先通过?HashCode来判断两个类是否存放某个桶里, 但这个桶里可能有很多类, 那么我们就需要再通过equals在这个桶里找到我们要的类**.

请看下面这个例子

```java
public class HashTest {
    private int i;
    public int getI() {
        return i;
    }
    public void setI(int i) {
        this.i = i;
    }
    public int hashCode() {
        return i % 10;
    }
    public final static void main(String[] args) {
        HashTest a = new HashTest();
        HashTest b = new HashTest();
        a.setI(1);
        b.setI(1);
        Set<HashTest> set = new HashSet<HashTest>();
        set.add(a);
        set.add(b);
        System.out.println(a.hashCode() == b.hashCode());
        System.out.println(a.equals(b));
        System.out.println(set);
    }
}

输出结果为:

true

False

[HashTest@1, HashTest@1]
```

以上这个示例, 我们只是重写了HashCode方法, 从上面的结果可以看出, **虽然两个对象的HashCode相等**, 但是实际上**两个对象并不是相等**, **因为我们没有重写equals方法**, 那么就会调用Object默认的equals方法, 显示这是两个不同的对象.

这里我们将生成的对象放到了HashSet中, 而HashSet中只能够存放唯一的对象, 也就是相同的（适用于equals方法）的对象只会存放一个, 但是这里实际上是两个对象ab都被放到了HashSet中, 这样HashSet就失去了他本身的意义了.

下面我们继续重写equals方法:

```java
public class HashTest {
    private int i;
    public int getI() {
        return i;
    }
    public void setI(int i) {
        this.i = i;
    }
    public boolean equals(Object object) {
        if (object == null) {
            return false;
        }
        if (object == this) {
            return true;
        }
        if (!(object instanceof HashTest)) {
            return false;
        }
        HashTest other = (HashTest) object;
        if (other.getI() == this.getI()) {
            return true;
        }
        return false;
    }
    public int hashCode() {
        return i % 10;
    }
    public final static void main(String[] args) {
        HashTest a = new HashTest();
        HashTest b = new HashTest();
        a.setI(1);
        b.setI(1);
        Set<HashTest> set = new HashSet<HashTest>();
        set.add(a);
        set.add(b);
        System.out.println(a.hashCode() == b.hashCode());
        System.out.println(a.equals(b));
        System.out.println(set);
    }
}
```

输出结果如下所示.

从结果我们可以看出, 现在两个对象就完全相等了, HashSet中也只存放了一份对象.

注意:

**hashCode()只是简单示例写的, 真正的生产换将不是这样的**

```
true
true
[HashTest@1]
```

## HashMap的hashcode的作用

**hashCode的存在主要是用于查找的快捷性**, 如Hashtable, HashMap等, hashCode是用来在散列存储结构中**确定对象的存储地址**的.

如果两个对象相同, 就是适用于equals(java.lang.Object) 方法, 那么这两个对象的hashCode一定要相同.

如果对象的**equals方法被重写**, 那么对象**的hashCode也尽量重写**, 并且产生hashCode使用的对象, 一定要和equals方法中使用的一致, 否则就会违反上面提到的第2点.

**两个对象的hashCode相同, 并不一定表示两个对象就相同**, 也就是不一定适用于equals(java.lang.Object) 方法, 只能够说明这两个对象在散列存储结构中, 如Hashtable, 他们“存放在同一个篮子里”.

**什么时候需要重写？**

一般的地方不需要重载hashCode, 只有当类需要放在HashTable、HashMap、HashSet等等hash结构的集合时才会重载hashCode, 那么为什么要重载hashCode呢？

要比较两个类的内容属性值, 是否相同时候, 根据hashCode 重写规则, 重写类的 指定字段的hashCode(), equals()方法.

例如

```java
public class EmpWorkCondition{
    /**
     * 员工ID
     */
    private Integer empId;
    /**
     * 员工服务总单数
     */
    private Integer orderSum;
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EmpWorkCondition that = (EmpWorkCondition) o;
        return Objects.equals(empId, that.empId);
    }
    @Override
    public int hashCode() {
        return Objects.hash(empId);
    }
    // 省略 getter setter
}
public static void main(String[] args) {
    List<EmpWorkCondition> list1 = new ArrayList<EmpWorkCondition>();
    EmpWorkCondition emp1 = new EmpWorkCondition();
    emp1.setEmpId(100);
    emp1.setOrderSum(90000);
    list1.add(emp1);
    List<EmpWorkCondition> list2 = new ArrayList<EmpWorkCondition>();
    EmpWorkCondition emp2 = new EmpWorkCondition();
    emp2.setEmpId(100);
    list2.add(emp2);
    System.out.println(list1.contains(emp2));
}
```

输出结果:true

[👈 **相关面试题**](./README.md#_49-👉-hashcode-与-equals)
