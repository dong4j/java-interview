# [Integer](http://sunluyao.com/2019/02/25/jdk-integer.html)

开发的越久，越能体会到基础知识的重要性。抽空捋一下 JDK 源码，权当查漏补缺。读完之后，你会发现 JDK 源码真的会给你很多惊喜。

`Integer` 是基本类型 `int` 的包装类，它提供了一些处理 `int` 数值的方法，`String` 和 `int` 相互转换的方法。另外，它还提供了一些位运算，这些位运算来自于 `Henry S. Warren Jr.` 的 [《Hacker's Delight》](https://link.juejin.im/?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F1784887%2F)。

## 类声明

首先看一下 `Integer` 的类声明：

```java
public final class Integer extends Number implements Comparable<Integer>{}
```

`Inetger` 是不可变类，无法被继承。关于 **不可变类** 的详细介绍，可以阅读 [👉String 为什么不可变](./string_immutable.md)。
`Integer` 继承了抽象类 `Number`，并实现了它的下列方法: `byteValue()` `shortValue()``intValue()` `longValue()` `floatValue()` `doubleValue()`，将 `int` 转换为其他基本类型的值，实现方法都是强转。
`Integer` 还实现了 `Comparable` 接口，因此也具备了比较对象大小的能力，其 `compareTo()` 方法具体实现如下：

```java
public int compareTo(Integer anotherInteger) {
    return compare(this.value, anotherInteger.value);
}

public static int compare(int x, int y) {
    return (x < y) ? -1 : ((x == y) ? 0 : 1);
}
```

## 字段

```java
private final int value; // Integer 类包装的值，真正用来存储 int 值
public static final int   MIN_VALUE = 0x80000000; // int 最小值为 -2^31
public static final int   MAX_VALUE = 0x7fffffff; // int 最大值为 2^31-1
public static final Class<Integer>  TYPE = (Class<Integer>) Class.getPrimitiveClass("int"); // 基本类型 int 包装类的实例
public static final int SIZE = 32; // 以二进制补码形式表示 int 值所需的比特数
public static final int BYTES = SIZE / Byte.SIZE; // 以二进制补码形式表示 int 值所需的字节数。1.8 新添加字段
private static final long serialVersionUID = 1360826667806852920L; // 序列化
```

`Integer` 只有一个非静态字段 `value`，用来表示其包装的 `int` 值。`0x80000000` 和 `0x7fffffff`分别是 int 最小值和最大值的十六进制表示，这里要注意十六进制 int 值在内存中的表示方法，有兴趣的同学可以了解一下，这里先占个坑，有时间单独写[一篇文章](https://juejin.im/post/5c76ad1ae51d4572c95835d0)。
我们都知道 `int` 是 4 字节，32 比特，和 C/C++ 不同的时，Java 中整型的取值范围和运行 Java 代码的机器是无关的。无论是 16 位系统，32 位系统，还是 64 位系统，`int` 永远都是 4字节。这也体现了 Java 的 “一次编写，到处运行”。

## 构造函数

`Integer` 有两个构造函数。第一个如下所示：

```java
public Integer(int value) {
    this.value = value;
}
```

直接传入基本类型数值，赋值给 `value` 字段。再看一下第二个构造函数：

```java
public Integer(String s) throws NumberFormatException {
    this.value = parseInt(s, 10);
}
```

参数是一个字符串，通过 `parseInt(String s,int radix)` 转换为 `int` 值，再赋给 `value` 字段。

`String` 转 `int`，举几个例子还是很容易理解的：

"1234" -> 123 
"-5678" -> 5678
"ff" -> 255

根据进制的不同，`Integer` 类中列举了所有可能用来表示数字的字符：

```java
final static char[] digits = {
    '0' , '1' , '2' , '3' , '4' , '5' ,
    '6' , '7' , '8' , '9' , 'a' , 'b' ,
    'c' , 'd' , 'e' , 'f' , 'g' , 'h' ,
    'i' , 'j' , 'k' , 'l' , 'm' , 'n' ,
    'o' , 'p' , 'q' , 'r' , 's' , 't' ,
    'u' , 'v' , 'w' , 'x' , 'y' , 'z'
};
复制代码
```

下面分析 `parseInt()` 函数的具体实现。

## 方法

#### parseInt(String,int) / parseInt(String)

```java
public static int parseInt(String s) throws NumberFormatException {
    return parseInt(s,10);
}
```

```java
public static int parseInt(String s, int radix)
            throws NumberFormatException
{
    /*
     * WARNING: This method may be invoked early during VM initialization
     * before IntegerCache is initialized. Care must be taken to not use
     * the valueOf method.
     */

    if (s == null) {
        throw new NumberFormatException("null");
    }

    if (radix < Character.MIN_RADIX) { // 进制最小值是 2
        throw new NumberFormatException("radix " + radix +
                                        " less than Character.MIN_RADIX");
    }

    if (radix > Character.MAX_RADIX) { // 进制最大值是 36
        throw new NumberFormatException("radix " + radix +
                                        " greater than Character.MAX_RADIX");
    }

    int result = 0;
    boolean negative = false;
    int i = 0, len = s.length();
    int limit = -Integer.MAX_VALUE;
    int multmin;
    int digit;

    if (len > 0) {
        char firstChar = s.charAt(0);
        // '0' == 48, 48 以下都是非数字和字母
        // '+' == 43, '-' == 45
        if (firstChar < '0') { // Possible leading "+" or "-"
            if (firstChar == '-') {
                negative = true;
                limit = Integer.MIN_VALUE;
            } else if (firstChar != '+') // 第一个字符非数字和字母，也不是 + 或者 -，抛出异常
                throw NumberFormatException.forInputString(s);

            if (len == 1) // Cannot have lone "+" or "-"
                throw NumberFormatException.forInputString(s);
            i++;
        }
        multmin = limit / radix;
        while (i < len) {
            // Accumulating negatively avoids surprises near MAX_VALUE
            // 将 char 转换为相应进制的 int 值
            digit = Character.digit(s.charAt(i++),radix);
            if (digit < 0) {
                throw NumberFormatException.forInputString(s);
            }
            /*
             * multmin = limit / radix,
             * 如果这里 result > multmin , 下一步 result *= radix 就会溢出
             */
            if (result < multmin) {
                throw NumberFormatException.forInputString(s);
            }
            result *= radix;
            // 也是溢出检查，例如 parseInt("2147483648",10) 就无法通过此检查
            // 2147483648 == Integer.MAX_VALUE + 1
            if (result < limit + digit) {
                throw NumberFormatException.forInputString(s);
            }
            result -= digit; // 这里采用负数相减的形式，而不是使用正数累加，防止溢出
        }
    } else {
        throw NumberFormatException.forInputString(s);
    }
    return negative ? result : -result;
}
```

代码挺长，其实逻辑很简单。以 `parseInt("1234",10)` 为例：

```java
1234 = (((1*10)+2)*10+3)*10+4
```

实际上并不是这样循环累加的，而是用负数累减的形式。因为 `int` 最大值为 `2^31-1`，最小值为 `-2^31`，采用正数累加的方式可能会导致溢出。`parseInt()` 中做了两次溢出检查，一旦溢出直接抛出异常。

除此之外，还需要注意的一点是进制的取值范围。最小进制为 `2`，最大进制为 `36`，不在此范围内的直接抛出异常。此范围对应的所有可能表示数字的字符存储在静态数组 `digits` 中：

```java
final static char[] digits = {
    '0' , '1' , '2' , '3' , '4' , '5' ,
    '6' , '7' , '8' , '9' , 'a' , 'b' ,
    'c' , 'd' , 'e' , 'f' , 'g' , 'h' ,
    'i' , 'j' , 'k' , 'l' , 'm' , 'n' ,
    'o' , 'p' , 'q' , 'r' , 's' , 't' ,
    'u' , 'v' , 'w' , 'x' , 'y' , 'z'
};
```

#### parseUnsignedInt(String,int) / parseUnsignedInt(String)

Java 中 `int` 都是有符号类型的，因此 `parseInt()` 也是针对有符号类型的。`Integer` 另外提供了 `parseUnsignedInt` 函数来处理无符号类型。但是归根结底，Java 根本没有无符号数，对于大于 `Integer.MAX_VALUE` 的数值，使用负数来表示，其实也就是溢出了。

```java
public static int parseInt(String s) throws NumberFormatException {
    return parseInt(s,10);
}
```

```java
public static int parseUnsignedInt(String s, int radix)
            throws NumberFormatException {
    if (s == null)  {
        throw new NumberFormatException("null");
    }

    int len = s.length();
    if (len > 0) {
        char firstChar = s.charAt(0);
        if (firstChar == '-') { // 无符号数以 - 开头，直接抛出异常
            throw new
                NumberFormatException(String.format("Illegal leading minus sign " +
                                                   "on unsigned string %s.", s));
        } else {
            /*
             *  确定再有符号 int 取值范围内，直接调用 parseInt() 当做有符号数处理
             *  其他情况当做 long 值处理，调用 Long.parseLong()
             */
            if (len <= 5 || // Integer.MAX_VALUE in Character.MAX_RADIX is 6 digits
                (radix == 10 && len <= 9) ) { // Integer.MAX_VALUE in base 10 is 10 digits
                return parseInt(s, radix);
            } else {
                long ell = Long.parseLong(s, radix);
                if ((ell & 0xffff_ffff_0000_0000L) == 0) { // 不超过无符号 int 的最大值，直接强转 int 返回
                    return (int) ell;
                } else { // 超过无符号 int 最大值，抛出异常
                    throw new
                        NumberFormatException(String.format("String value %s exceeds " +
                                                            "range of unsigned int.", s));
                }
            }
        }
    } else {
        throw NumberFormatException.forInputString(s);
    }
}
```

注意一下几点：

* 以 `-` 开头，直接抛出异常
* 确定是有符号类型的，仍调用 `parseInt()`,否则看做 `long` 处理

调动 `Long.parseLong()` 得到返回值后，需要判断是否超过无符号 int 的最大值。上面使用的判断方式是：

```java
if ((ell & 0xffff_ffff_0000_0000L) == 0)
```

满足此条件则意味着 `ell` 高八位必为 0，所以不会超过无符号 int 最大值。

除了 `parseInt()` 系列，还有几个 `String` 转 `int` 的方法也一并分析一下。

#### decode(String)

```java
public static Integer decode(String nm) throws NumberFormatException {
    int radix = 10;
    int index = 0;
    boolean negative = false;
    Integer result;

    if (nm.length() == 0)
        throw new NumberFormatException("Zero length string");
    char firstChar = nm.charAt(0);
    // Handle sign, if present
    if (firstChar == '-') { // 负数
        negative = true;
        index++;
    } else if (firstChar == '+') // 正数
        index++;

    // Handle radix specifier, if present
    // 以 "0x" "0X" "#" 开头表示十六进制
    // 以 "0" 开头表示八进制
    if (nm.startsWith("0x", index) || nm.startsWith("0X", index)) {
        index += 2;
        radix = 16;
    }
    else if (nm.startsWith("#", index)) {
        index ++;
        radix = 16;
    }
    else if (nm.startsWith("0", index) && nm.length() > 1 + index) {
        index ++;
        radix = 8;
    }

    if (nm.startsWith("-", index) || nm.startsWith("+", index))
        throw new NumberFormatException("Sign character in wrong position");

    try {
        result = Integer.valueOf(nm.substring(index), radix);
        result = negative ? Integer.valueOf(-result.intValue()) : result;
    } catch (NumberFormatException e) {
        // If number is Integer.MIN_VALUE, we'll end up here. The next line
        // handles this case, and causes any genuine format error to be
        // rethrown. Integer.MIN_VALUE 会进入此分支
        String constant = negative ? ("-" + nm.substring(index))
                                   : nm.substring(index);
        result = Integer.valueOf(constant, radix);
    }
    return result;
}
```

将特定的字符串转换为 `int` 值，可接受十进制、十六进制、八进制形式的字符串。其中，以 `0x`、`0X`、`#` 开头的字符串表示十六进制，以 `0` 开头表示八进制。确定进制 `radix` 之后，调用静态方法 `Integer.valueOf(String,int)` 方法。接着跟进这一方法。

#### Integer.valueOf(String,int)

```java
public static Integer valueOf(String s, int radix) throws NumberFormatException {
    return Integer.valueOf(parseInt(s,radix));
}
```

最终还是调用了 `parseInt()` 方法来进行转化得到对应的 `int` 值，并通过 `Integer.valueOf(int)`方法得到包装类 `Integer` 对象。接着看看 `Integer.valueOf(int)` 的具体实现。

#### Integer.valueOf(int)

再看这个方法之前，先看一道经典的面试题：

```java
Integer b1 = 127;
Integer b2 = 127;

Integer c1 = 128;
Integer c2 = 128;

System.out.println(b1 == b2); // true
System.out.println(c1 == c2); // false
```

相信大家对打印结果应该没有什么疑问。有疑问的话，带着疑问看源码。

通过 `javap` 命令看下上面的代码到底是如何执行，部分字节码如下：

```java
21: bipush        127
23: invokestatic  #8                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
26: astore_1
27 bipush        127
29: invokestatic  #8                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
32: astore_2
33: sipush        128
36: invokestatic  #8                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
39: astore_3
40: sipush        128
43: invokestatic  #8                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
```

通过上面的字节码可以发现，Java 通过 `Integer.valueOf(int)` 函数来进行基本数据类型 `int` 的自动装箱。`Integ.valueOf(int)` 源码如下：

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

逻辑很清晰，在 `IntegerCache.LOW` 和 `IntegerCache.HIGH` 之间的数值，直接返回缓存中已经创建好的对象，其余值每次都创建新的对象。`IntegerCache.LOW` 为 `-128`，`IntegerCache.HIGH` 默认为 `127`,可以通过设置 `-XX:AutoBoxCacheMax=<size>` 进行更改。

`IntegerCache` 的任务很简单，就是在 `VM` 加载 `Integer` 类的时候给缓存数组填充值。具体源码如下：

```java
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

`String` 转 `int` 的方法差不多就介绍完了，下面分析 `int` 转 `String` 的方法。

### toString() / toString(int)

```java
public String toString() {
    return toString(value);
}
```

```java
public static String toString(int i) {
    if (i == Integer.MIN_VALUE)
        return "-2147483648";
    // 获取长度，负数需 +1，表示符号 '-'
    int size = (i < 0) ? stringSize(-i) + 1 : stringSize(i);
    char[] buf = new char[size];
    getChars(i, size, buf);
    return new String(buf, true);
}
```

这是复写的 `toString()` 方法，默认将当前 `int` 值转化为十进制形式的字符串。这段源代码真的很精髓，开发者为了提升运行效率无所不用其极，让人心生敬佩。下面详细分析一下这个方法：

1. 对于 `Integer.MIN_VALUE` ，直接返回 `-2147483648`
2. 通过 `stringSize()` 方法获取需要的字符串长度 `size`
3. 新建字符数组 `buf`，用来存储字符串
4. 通过 `getChars()` 方法填充字符数组 `buf`
5. 通过 `String` 的构造函数生成字符串

核心函数就是 `stringSize()` 和 `getChars()`。

#### stringSize(int)

```java
final static int [] sizeTable = { 9, 99, 999, 9999, 99999, 999999, 9999999,
                                  99999999, 999999999, Integer.MAX_VALUE };

// Requires positive x
static int stringSize(int x) {
    for (int i=0; ; i++)
        if (x <= sizeTable[i])
            return i+1;
}
```

获取 `int` 值对应的十进制字符串的长度，只接收正数。巧妙的使用了一个 `sizeTable` 数组，循环匹配，可以很方便的获取对应的字符串长度。`sizeTable` 数组最大值为 `Integer.MAX_VALUE`,这也就解释了第一步中遇到 `Integer.MIN_VALUE` 时直接返回，并不进入 `stringSize()` 方法。

#### getChars(int,int,char[])

```java
static void getChars(int i, int index, char[] buf) {
    int q, r;
    int charPos = index;
    char sign = 0;

    if (i < 0) {
        sign = '-';
        i = -i;
    }

    // Generate two digits per iteration
    while (i >= 65536) {
        q = i / 100;
    // really: r = i - (q * 100);
        r = i - ((q << 6) + (q << 5) + (q << 2));
        i = q;
        buf [--charPos] = DigitOnes[r];
        buf [--charPos] = DigitTens[r];
    }

    // Fall thru to fast mode for smaller numbers
    // assert(i <= 65536, i);
    for (;;) {
        q = (i * 52429) >>> (16+3);
        r = i - ((q << 3) + (q << 1));  // r = i-(q*10) ...
        buf [--charPos] = digits [r];
        i = q;
        if (i == 0) break;
    }
    if (sign != 0) {
        buf [--charPos] = sign;
    }
}
```

`getChars()` 方法真的是将运行效率优化到了极致。其作用很简单，就是将数值 `i` 的每一位数字作为字符填充到字符数组 `buf` 中。如果是我来实现的话，可能是下面这样一个版本：

```java
public static void getChars(int i, int index, char[] buf) {
    int q, r;
    for (int n = index - 1; n >= 0; n--) {
        q = i / 10;
        r = i - q * 10;
        i = q;
        buf[n] = digits[r];
    }
}
```

从 `i` 的最低位数字开始，循环取出并塞到 `buf` 中。对，就是这么简单的逻辑，`Integer` 源码中还玩出来了这么多花样。下面仔细看一下源码的实现和我的版本有哪些不同。

源码中以 **`65536`** 为界限，分别执行两个不同的循环体。暂且不管这个 `65536` 从何而来，先看一下这两个循环体。

```java
// Generate two digits per iteration
// 每次取 i 的最后两位
while (i >= 65536) {
    q = i / 100;
// really: r = i - (q * 100);
    // r = i - (q * (2^6 + 2^5 + 2^2))
    r = i - ((q << 6) + (q << 5) + (q << 2));
    i = q;
    buf [--charPos] = DigitOnes[r]; // 取余操作
    buf [--charPos] = DigitTens[r]; // 除法操作
}
```

不知道它在干嘛的时候，debug 一下就很清晰了。每次循环取出 `i` 的最后两位数字作为一个 int 值 `r`，然后分别进行 `r/10` 和 `r%10` 分别得到这两个数字。源码中巧妙的使用了两个数组，避免进行算数运算，看一下这两个数组：

```java
final static char [] DigitOnes = {
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
} ;
```

`DigitOnes` 数组存储了 `0` 到 `99` 对 `10` 取余的运算结果。

```java
final static char [] DigitTens = {
    '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
    '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
    '2', '2', '2', '2', '2', '2', '2', '2', '2', '2',
    '3', '3', '3', '3', '3', '3', '3', '3', '3', '3',
    '4', '4', '4', '4', '4', '4', '4', '4', '4', '4',
    '5', '5', '5', '5', '5', '5', '5', '5', '5', '5',
    '6', '6', '6', '6', '6', '6', '6', '6', '6', '6',
    '7', '7', '7', '7', '7', '7', '7', '7', '7', '7',
    '8', '8', '8', '8', '8', '8', '8', '8', '8', '8',
    '9', '9', '9', '9', '9', '9', '9', '9', '9', '9',
} ;
```

`DigitTens` 数组存储了 `0` 到 `99` 除以 `10` 的运算结果。

还有一个需要注意的地方，看这行代码：

```java
/*
* equals -> r = i - (q * (2^6 + 2^5 + 2^2))
* equals -> r = i - q * 100;
*/
r = i - ((q << 6) + (q << 5) + (q << 2));
```

使用移位和加法代替了乘法运算，这也是一个提升运行效率的细节，相信日常开发中大家应该很少能想到。下一个循环中，你也可以看到类似的操作。在这里，先提前总结一下：

* 移位比加减乘除效率高
* 加减法比乘除法效率高
* 乘法比除法效率高

大于 `65536` 的循环体就先说到这，下面看小于 `65536` 时执行的循环体：

```java
// Fall thru to fast mode for smaller numbers
// assert(i <= 65536, i);
for (;;) {
    q = (i * 52429) >>> (16+3); // q = i * 10
    r = i - ((q << 3) + (q << 1));  // r = i-(q*10) ...
    // 此时 r 为数字 i 的最后一位
    buf [--charPos] = digits [r];
    i = q;
    if (i == 0) break;
}
```

每次取出最后一位数字，塞入字符数组 `buf` 中。有了上一个循环体的经验，这个循环体的前两行代码也很好理解了。

```java
/*
 * equals -> (i * 52429) / 2^19
 * equals -> (i * 52429) / 524288
 * equals -> i / 10
 */
q = (i * 52429) >>> (16+3);

/*
 * equals -> i - q * (2^3 + 2)
 * equals -> i - q * 10
 */
r = i - ((q << 3) + (q << 1));
```

第一行使用乘法和移位代替了除法，第二行使用加法和移位代替了乘法。

看到这里，你应该还有一些疑问，为什么是 `65536`？为什么是 `52429`？这两个数字的选取有什么依据吗？

回过头再想一下，我们用 `(i * 52429) >>> (16+3)` 来代替的是 `i / 10`，其中的数学关系是 `52429 = (2 ^ 19) / 10 +1`,倘若我们不用 `52429` ，换做其他的数，也就是改变 `19` 的值，我们来列举一下：

```java
2^10 / 10 + 1 = 103, 103 / 1024 = 0.100585938...
2^11 / 10 + 1 = 205, 205 / 2048 = 0.100097656...
2^12 / 10 + 1 = 410, 410 / 4096 = 0.100097656...
2^13 / 10 + 1 = 820, 820 / 8192 = 0.100097656...
2^14 / 10 + 1 = 1639, 1639 / 16384 = 0.100036621...
2^15 / 10 + 1 = 3277, 3277 / 32768 = 0.100006104...
2^16 / 10 + 1 = 6554, 6554 / 65536 = 0.100006104...
2^17 / 10 + 1 = 13108, 13108 / 131072 = 0.100006104...
2^18 / 10 + 1 = 26215, 26215 / 262144 = 0.100002289...
2^19 / 10 + 1 = 52429, 52429 / 524288 = 0.100000381...
2^20 / 10 + 1 = 104858, 104858 / 1048576 = 0.100000381...
2^21 / 10 + 1 = 209716, 209716 / 2097152 = 0.100000381...
2^22 / 10 + 1 = 419431, 419431 / 4194304 = 0.100000143...
```

从上面的计算结果可以看出来，大于等于 `19` 的时候精度会比较高。倘若我们这里取 `20`，即等式为:

```java
q = (i * 104858) >>> 20
```

那么，这时分隔两个循环的 `i` 值应该取多少呢？注意这里是无符号右移，所以 `i * 104858` 理论上可以达到无符号 `int` 的最大值 `2^32-1`，即 `4294967295`，分隔值 `i` 不能大于 `(2^32-1) / 104858 = 40659` ，比 `65536` 小了一些。倘若我们取 `21` ，则分隔值 `i` 不能大于 `(2^32-1) / 209716 = 20479`, 更小了一些。显然，选取 `19`，既保证了精度尽量的高，又保证了分隔值的取值尽量的高。`(2^32-1) / 52429 = 81919`，不超过 `81919`，从执行效率方面考虑，源码中就选择了 `65536` 这个数字。

综上，就有个这样的组合，`65536` `52429` `19`。最后还有一个疑问，源码中并不是直接写 `19` 的，而是用 `16 + 3` 代替，这样也能提高运行效率吗？

#### toString(int,int)

上面分析的 `toString(int)` 方法是指定转换为十进制字符串的，我们还可以使用两个参数的 `toString()` 方法转换为指定进制的字符串。代码比较简单，就直接在源码中注释。

```java
public static String toString(int i, int radix) {
    if (radix < Character.MIN_RADIX || radix > Character.MAX_RADIX)
        radix = 10; // 不合法的进制统一设置为 10

    /* Use the faster version
     * 十进制还是使用上面分析的方法
     */
    if (radix == 10) {
        return toString(i);
    }

    char buf[] = new char[33];
    boolean negative = (i < 0);
    int charPos = 32;

    if (!negative) {
        i = -i;
    }

    // 循环对进制 radix 取余
    while (i <= -radix) {
        buf[charPos--] = digits[-(i % radix)];
        i = i / radix;
    }
    buf[charPos] = digits[-i];

    if (negative) {
        buf[--charPos] = '-';
    }

    return new String(buf, charPos, (33 - charPos));
}
```

#### toUnsignedString(int)

```java
public static String toUnsignedString(int i, int radix) {
    return Long.toUnsignedString(toUnsignedLong(i), radix);
}
```

转成无符号字符串，这里转成 `long` 型再调用 `Long.toUnsignedString()`，这里不做过多分析。

#### getInteger()

最后还要一个 `getInteger()` 方法，用的不是很多，用于获取系统属性指定的 `int` 值。看一下简单的例子就明白了：

```java
Properties properties = System.getProperties();
properties.put("luyao","123456");
System.out.println(Integer.getInteger("luyao"));
System.out.println(Integer.getInteger("luyao",0));
System.out.println(Integer.getInteger("luyao",new Integer(0)));
```

打印结果都是 `1234`。区别就是，当指定属性名称不存在时，后面两个方法提供了默认值，第一个方法会返回 `null`。

```java
public static Integer getInteger(String nm, Integer val) {
    String v = null;
    try {
        v = System.getProperty(nm);
    } catch (IllegalArgumentException | NullPointerException e) {
    }
    if (v != null) {
        try {
            return Integer.decode(v);
        } catch (NumberFormatException e) {
        }
    }
    return val;
}
```

可以看到其实是调用了 `Integer.decode()` 方法，前面已经分析过 `decode()` 方法，这里就不再多说了。

`String` 和 `int` 相互转换的方法就说到这里了，大部分方法应该都提到了。最后简单说说一些位运算。

### 位运算

类注释中提到了一本书，`Henry S. Warren Jr.` 的 [《Hacker's Delight》](https://link.juejin.im/?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F1784887%2F)，`Integer` 中的位运算原理在这本书中都有介绍。我在这里仅仅说明方法的作用，关于详细原理有机会再单独写写。

```java
int highestOneBit(int i) : 返回以二进制补码形式，取左边最高位 1，后面全部填 0 表示的 int 值
int lowestOneBit(int i)  : 与 highestOneBit() 相反，取其二进制补码的右边最低位 1，其余填 0
int numberOfLeadingZeros(int i) : 返回左边最高位 1 之前的 0 的个数
int numberOfTrailingZeros(int i): 返回右边最低位 1 之后的 0 的个数
int bitCount(int i) : 二进制补码中 1 的个数
int rotateRight(int i, int distance) ： 将 i 的二进制补码循环右移 distance（注意与普通右移不同的是，右移的数字会移到最左边）
int rotateLeft(int i, int distance)  ： 与 rotateRight 相反
int reverse(int i) ： 反转二进制补码
int signum(int i)  ： 正数返回 1，负数返回 -1,0 返回 0
int reverseBytes(int i) ： 以字节为单位反转二进制补码
```

## 总结

一个小小的 `Integer` 类，从头到尾读完也花了不少时间，还是那句名言，`Read the fuck sorce code!`,源代码所能给予你的回馈，肯定是你意想不到的。

[👉带注释 `Integer.java` 源代码](./integer_source.md)

