# Java switch 对 String 类型的支持

先看代码

```java
public static void main(String[] args) {
    switch (args[0]) {
        case "A":
            break;
        case "B":
            break;
        default:
    }
}
```

反编译后:

```java
public static void main(String[] args) {
    String var1 = args[0];
    byte var2 = -1;
    switch(var1.hashCode()) {
    case 65:
        if (var1.equals("A")) {
            var2 = 0;
        }
        break;
    case 66:
        if (var1.equals("B")) {
            var2 = 1;
        }
    }

    switch(var2) {
    case 0:
    case 1:
    default:
    }
}
```

这里我们看到, jvm 是先调用 String 的 hashCode 方法得到 hash 值，然后将 case 中的常量换掉.
替换掉之后, 会使用 equals 进行比较, 因为 **不同的字符串 hash 后的 hashcode 可能相同**, 因此需要使用 equals 进行对比

因此我们得出结论:

::: tip
Java 中 switch 支持 String，是利用 String 的 hash 值，本质上是 `switch-int` 结构。

并且利用到了 equals 方法来防止 hash 冲突的问题。

最后利用 switch-byte 结构，精确匹配
:::

字节码如下

```java
public class com.iflytek.test.common.StringTest {
  public com.iflytek.test.common.StringTest();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: aload_0
       1: iconst_0
       2: aaload
       3: astore_1
       4: iconst_m1
       5: istore_2
       6: aload_1
       7: invokevirtual #2                  // Method java/lang/String.hashCode:()I
      10: lookupswitch  { // 2
                    65: 36
                    66: 50
               default: 61
          }
      36: aload_1
      37: ldc           #3                  // String A
      39: invokevirtual #4                  // Method java/lang/String.equals:(Ljava/lang/Object;)Z
      42: ifeq          61
      45: iconst_0
      46: istore_2
      47: goto          61
      50: aload_1
      51: ldc           #5                  // String B
      53: invokevirtual #4                  // Method java/lang/String.equals:(Ljava/lang/Object;)Z
      56: ifeq          61
      59: iconst_1
      60: istore_2
      61: iload_2
      62: lookupswitch  { // 2
                     0: 88
                     1: 91
               default: 94
          }
      88: goto          94
      91: goto          94
      94: return
}
```



