# int 和 [Integer](./integer.md) 的区别

1. Integer 是 int 的包装类, int 则是 Java 的一种基本数据类型
2. Integer 变量必须实例化后才能使用, 而 int 变量不需要
3. Integer 实际是对象的引用, 当 new 一个 Integer 时, 实际上是生成一个指针指向此对象；而 int 则是直接存储数据值
4. Integer 的默认值是 null, int 的默认值是0

关于 Integer 和 int 的比较

1. 由于 Integer 变量实际上是对一个 Integer 对象的引用, 所以两个通过 new 生成的 Integer 变量永远是不相等的（因为 new 生成的是两个对象, 其内存地址不同, 使用“==”时, 比较的是地址, 可以用String类比）.

```java
Integer i = new Integer(100);
Integer j = new Integer(100);
System.out.print(i == j); //false
```

2. Integer变量和int变量比较时, 只要两个变量的值是相等的, 则结果为true（因为包装类Integer和基本数据类型int比较时, java会自动拆包装为int, 然后进行比较, 实际上就变为两个int变量的比较）

```java
Integer i = new Integer(100);
int j = 100；
System.out.print(i == j); //true
```

> 此处的Integer(num)中的num不局限于-128-127

3. 非new生成的Integer变量和new Integer()生成的变量比较时, 结果为false.（因为非new生成的Integer变量指向的是java常量池中的对象, 而new Integer()生成的变量指向堆中新建的对象, 两者在内存中的地址不同）

```java
Integer i = new Integer(100);
Integer j = 100;
System.out.print(i == j); //false
```

4. 对于两个非new生成的Integer对象, 进行比较时, 如果两个变量的值在区间-128到127之间, 则比较结果为true, 如果两个变量的值不在此区间, 则比较结果为false

```java
Integer i = 100;
Integer j = 100;
System.out.print(i == j); //true
Integer i = 128;
Integer j = 128;
System.out.print(i == j); //false
```

对于第4条的原因:
java在编译Integer i = 100 ;时, 会翻译成为Integer i = Integer.valueOf(100)；, 而java API中对Integer类型的valueOf的定义如下:

```java
public static Integer valueOf(int i){
    assert IntegerCache.high >= 127;
    if (i >= IntegerCache.low && i <= IntegerCache.high){
        return IntegerCache.cache[i + (-IntegerCache.low)];
    }
    return new Integer(i);
}
```

java对于-128到127之间的数, 会进行缓存, Integer i = 127时, 会将127进行缓存, 下次再写Integer j = 127时, 就会直接从缓存中取, 就不会new了.



