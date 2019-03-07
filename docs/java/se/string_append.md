---
sidebar: auto
title: Java 中拼接字符串的几种方法效率对比
date: 2019-03-05 15:39
author: dong4j
tags:
- String
---

::: tip 执行效率
StringBuffer > StringBuilder > StringUtils.join > concat > +
:::

<!-- more -->

[👈 **相关面试题**](./README.md#_54-👉-string-对-的重载-字符串拼接的几种方式和区别)

先来做一个测试

```java
@Before
public void init(){
    IntStream.range(0, 100000).forEach((index) -> {
        list.add("str" + index);
    });
}

@Test
public void test1() {
    String ss = "";
    StopWatch stopWatch = new StopWatch("字符串拼接效率对比");
    stopWatch.start("+");
    for (String s : list) {
        ss += s;
    }
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());

    stopWatch.start("concat");
    ss = "";
    for (String s : list) {
        ss=ss.concat(s);
    }
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());

    stopWatch.start("StringBuilder");
    StringBuilder stringBuilder = new StringBuilder();
    for (String s : list) {
        stringBuilder.append(s);
    }
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());

    stopWatch.start("join");
    StringUtils.join(list);
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());

    stopWatch.start("StringBuffer");
    StringBuffer stringBuffer = new StringBuffer();
    for (String s : list) {
        stringBuffer.append(s);
    }
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());
}
```

输出:

```java
StopWatch '字符串拼接效率对比': running time (millis) = 57700
-----------------------------------------
ms     %     Task name
-----------------------------------------
44915  078%  +
12758  022%  concat
00003  000%  StringBuilder
00016  000%  join
00008  000%  StringBuffer
```

结论:

```
StringBuffer > StringBuilder > StringUtils.join > concat > +
```

## StringBuilder

每次字符串拼接都只是扩展内部 char 数组，只生产一个最终的 string，所以这种效率最高

```java
public AbstractStringBuilder append(String str) {
    if (str == null)
        return appendNull();
    int len = str.length();
    ensureCapacityInternal(count + len);
    str.getChars(0, len, value, count);
    count += len;
    return this;
}
```

## StringBuffer

与 StringBuilder 唯一的区别就是使用了同步方法, 所以在单线程下区别并不大

```java
public synchronized StringBuffer append(String str) {
    toStringCache = null;
    super.append(str);
    return this;
}
```

## StringUtils.join

内部还是用的 StringBuilder, 只是多了很多判断, 造成耗时增加

```java
public static String join(final Object[] array, String separator, final int startIndex, final int endIndex) {
    if (array == null) {
        return null;
    }
    if (separator == null) {
        separator = EMPTY;
    }

    // endIndex - startIndex > 0:   Len = NofStrings *(len(firstString) + len(separator))
    //           (Assuming that all Strings are roughly equally long)
    final int noOfItems = endIndex - startIndex;
    if (noOfItems <= 0) {
        return EMPTY;
    }

    final StringBuilder buf = new StringBuilder(noOfItems * 16);

    for (int i = startIndex; i < endIndex; i++) {
        if (i > startIndex) {
            buf.append(separator);
        }
        if (array[i] != null) {
            buf.append(array[i]);
        }
    }
    return buf.toString();
}
```

## concat

每次都会生成一个新的字符串, 所以效率很低

```java
public String concat(String str) {
    int otherLen = str.length();
    if (otherLen == 0) {
        return this;
    }
    int len = value.length;
    char buf[] = Arrays.copyOf(value, len + otherLen);
    str.getChars(buf, len);
    return new String(buf, true);
}
```

## JDK 对 String "+" 的优化

让我们来看下面的代码

```java
public static void main(String[] args) throws InterruptedException {
    List<String> list = new ArrayList<>();

    IntStream.range(0, 100000).forEach((index) -> {
        list.add("str" + index);
    });

    String ss = "";
    for (String s : list) {
        ss += s;
    }
    
    Thread.currentThread().join();
}
```

这段代码反编译后:

```java
public static void main(String[] args) throws InterruptedException {
    List<String> list = new ArrayList();
    IntStream.range(0, 100000).forEach((index) -> {
        list.add("str" + index);
    });
    String ss = "";

    String s;
    for(Iterator var3 = list.iterator(); var3.hasNext(); ss = ss + s) {
        s = (String)var3.next();
    }

    Thread.currentThread().join();
}
```

使用 `javap` 查看字节码

```java
Compiled from "StringTest.java"
public class com.iflytek.test.common.StringTest {
  public com.iflytek.test.common.StringTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]) throws java.lang.InterruptedException;
    Code:
       0: new           #2                  // class java/util/ArrayList
       3: dup
       4: invokespecial #3                  // Method java/util/ArrayList."<init>":()V
       7: astore_1
       8: iconst_0
       9: ldc           #4                  // int 100000
      11: invokestatic  #5                  // InterfaceMethod java/util/stream/IntStream.range:(II)Ljava/util/stream/IntStream;
      14: aload_1
      15: invokedynamic #6,  0              // InvokeDynamic #0:accept:(Ljava/util/List;)Ljava/util/function/IntConsumer;
      20: invokeinterface #7,  2            // InterfaceMethod java/util/stream/IntStream.forEach:(Ljava/util/function/IntConsumer;)V
      25: ldc           #8                  // String
      27: astore_2
      28: aload_1
      29: invokeinterface #9,  1            // InterfaceMethod java/util/List.iterator:()Ljava/util/Iterator;
      34: astore_3
      35: aload_3
      36: invokeinterface #10,  1           // InterfaceMethod java/util/Iterator.hasNext:()Z
      41: ifeq          78
      44: aload_3
      45: invokeinterface #11,  1           // InterfaceMethod java/util/Iterator.next:()Ljava/lang/Object;
      50: checkcast     #12                 // class java/lang/String
      53: astore        4
      55: new           #13                 // class java/lang/StringBuilder
      58: dup
      59: invokespecial #14                 // Method java/lang/StringBuilder."<init>":()V
      62: aload_2
      63: invokevirtual #15                 // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      66: aload         4
      68: invokevirtual #15                 // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      71: invokevirtual #16                 // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      74: astore_2
      75: goto          35
      78: invokestatic  #17                 // Method java/lang/Thread.currentThread:()Ljava/lang/Thread;
      81: invokevirtual #18                 // Method java/lang/Thread.join:()V
      84: return
}
```

从 55 开始, 会创建一个 StringBuilder, 在执行完 append方法后 (63), 继续循环从 15 开始执行. 
循环结束后, 最后调用 toString()

从 JDK6 开始, JVM 对 String 使用 "+", 做了优化, 每次使用 "+" 操作符时, 会 `new StringBuilder()`, 然后使用 `append` 进行拼接.

因此在 JDK5 之后, 循环外字符串拼接可以直接使用 String 的 + 操作，没有必要通过 StringBuilder 进行 append;
但是在循环内时, 应该使用 StringBuilder, 原因上面已经说过了, 会造成过多的 StringBuilder 对象产生, 可能会产生频繁的 GC

## 字符串拼接 + 和 concat 的区别

```java
public static void main(String[] args) {
    // example1
    String str1 = "s1";
    System.out.println(str1 + 100);//s1100
    System.out.println(100 + str1);//100s1

    String str2 = "s2";
    str2 = str2.concat("a").concat("bc");
    System.out.println(str2);//s2abc

    // example2
    String str3 = "s3";
    System.out.println(str3 + null);//s3null
    System.out.println(null + str3);//nulls3

    String str4 = null;
    System.out.println(str4.concat("a"));//NullPointerException
    System.out.println("a".concat(str4));//NullPointerException
}
```

**区别**:

1. +可以是字符串或者数字及其他基本类型数据，而concat只能接收字符串。
2. +左右可以为null，concat为会空指针。
3. 如果拼接空字符串，concat会稍快，在速度上两者可以忽略不计，如果拼接更多字符串建议用StringBuilder。
4. 从字节码来看 + 号编译后就是使用 了StringBuiler 来拼接，所以一行 + 的语句就会创建一个 StringBuilder，多条 + 语句就会创建多个，所以建议在循环内拼接时用 StringBuilder.

[👈 **相关面试题**](./README.md#_54-👉-string-对-的重载-字符串拼接的几种方式和区别)
