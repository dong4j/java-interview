# String.valueof() 和 Integer.toString() 的区别

[👈 **相关面试题**](./README.md#👉-string-valueof-和-integer-tostring-的区别)

平常经常使用这两个方法进行 int 类型转 String，一般情况也不区分，今天就深究一下，它们的区别，平常应该使用哪个方法更好一些。

## Integer.toString()方法

**作用**：该方法返回指定整数的有符号位的 String 对象，以 10 进制字符串形式返回。

**内部实现**：

```java
public static String toString(int i) {
  	// 等于最小值直接返回最小值字符串，避免getChars方法遇到最小值发生错误
    if (i == Integer.MIN_VALUE) 
        return "-2147483648"; 
    // 判断i的位数，若位负数增加1位用来保存符号位
    int size = (i < 0) ? stringSize(-i) + 1 : stringSize(i);
    char[] buf = new char[size];
    // 将i转换位buf符号数组
    getChars(i, size, buf);
    // 因为buf数组是在方法内部生成，其他地方不会有其引用，所以直接将其引用给String内部的value保存，用来初始化String
    return new String(buf, true);
}
```

可以看出 Integer.toString() 方法用来执行将 int 转换为 String 的操作，那么根据方法复用的原则，可以推断出String.toString(int) 也应该是使用来该方法。那么我们接着往下看。

## String.valueof()方法

不同于 Integer.toString(int)，valueof 有大量的重载方法，我们一一对其介绍。

**public static String valueOf(Object obj)** 
**作用**：将对象转换成 String 类型 
**源码**：

```java
public static String valueOf(Object obj) {
    return (obj == null) ? "null" : obj.toString();
}
```

可以看出这里调用对象的 toString()，所以写对象时，**最好重写其toString()方法**。

**public static String valueOf(char data[])** 
**作用**：将字符数组转换成 String 类型 
**源码**：

```java
public static String valueOf(char data[]) {
    return new String(data);
}
```

直接将字符数组作为 String 的构造参数入参，内部是将数组复制了一份保存在了 String 中，用来初始化 String。

**public static String valueOf(char data[], int offset, int count)** 
**作用**：将 offset 位置至 offset+count 位置的 data[] 数组转换成 String 类型 
**源码**：

```java
public static String valueOf(char data[], int offset, int count) {
    return new String(data, offset, count);
}
```

**public static String valueOf(boolean b)** 
**作用**：将布尔转换成 String 类型 
**源码**：

```java
public static String valueOf(boolean b) {
    return b ? "true" : "false"; 
}
```

可以看出并不能直接从 boolean 转换成字符，而是判断后，返回指定的字符串。

**public static String valueOf(char c)** 
**作用**：将字符转换成 String 类型 
**源码**：

```java
public static String valueOf(char c) {
    char data[] = {c};
    return new String(data, true);
}
```

这里先将字符转换成字符数组，**可能好奇 String(data，true) 这个构造方法与上面的 String(data) 有什么不同**，String(data, true) 构造方法将引用传递给了 String 内部的 value 用来创建字符串，**data 在方法内部创建没有其他引用，所以可以直接传递，节约内存空间**。

**public static String valueOf(int i)** 
**作用**：将 int 类型转换成 String 类型 
**源码**：

```java
public static String valueOf(int i) {
    return Integer.toString(i);
}
```

与我们的推测相似，这里调用了 Integer.toString() 的方法，可以看出 String 的 valueof 方法是将各种类型转换成String，**内部重载了不同类型转 String 的处理，所以推荐使用 valueof 方法。**

**public static String valueOf(long l)** 
**作用**：将 long 类型转换成 String 类型 
**源码**：

```java
public static String valueOf(long l) {
    return Long.toString(l);
}
```

**public static String valueOf(float f)** 
**作用**：将 float 类型转换成 String 类型 
**源码**：

```java
public static String valueOf(float f) {
    return Float.toString(f);
}
```

**public static String valueOf(double d)** 
**作用**：将 double 类型转换成 String 类型 
**源码**：

```java
public static String valueOf(double d) {
    return Double.toString(d);
}
```

[👈 **相关面试题**](./README.md#👉-string-valueof-和-integer-tostring-的区别)