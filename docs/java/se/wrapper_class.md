# 包装类

[👈 **相关面试题**](./README.md#_42-👉-自动装箱与拆箱)

Java 有 8 种基本数据类型, 为什么又要出现对应的 8 种包装类:

1. Java 的 8 种基本数据类型不支持面向对象编程机制
2. 8 种基本数据类型不具备“对象”的特性:没有成员变量、方法可供调用
3. 例如:某个方法需要 Object 类型的参数, 但实际需要的却是2、3这种值, 只靠基本的数据类型无法转换成 Object 参数传递过去
4. 为解决 8 种基本数据类型不能当成 Object 类型使用的问题, Java 提供了包装类的概念

**下面是基本数据类型与对应的包装类型**

| 基本数据类型 | 包装类型 |
| --- | --- |
| byte | Byte |
| boolean | Boolean |
| short | Short |
| char | Character |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |

## 自动拆箱和装箱

::: tip
在自动装箱时, 编译器调用包装类型的 valueOf() 方法
在自动拆箱时, 编译器调用了相应的 xxxValue() 方法
:::

### 装箱

```java
int a = 0;
// 手动装箱
Integer b = new Integer(a);
// 自动装箱
Integer c = a;
```

### 拆箱

```java
Double d = 9.2;
// 手动拆箱
double e = d.doubleValue();
// 自动拆箱
double f = d;
```

## 基本类型与字符串之间的转换

### 基本类型转换为字符串 

1. 使用包装类中的 toString() 方法 
2. 使用String类的 valueOf() 方法 
3. 加入空字符

```java
// 使用包装类中的toString()方法
String i = Integer.toString(h);
// 使用String类的valueOf()方法
String i = String.valueOf(h);
// 加入空字符
String i = h + "";
```

### 字符串转换为基本类型

1. 使用包装类中的 parseXXX() 方法 
2. 使用包装类中的 valueOf() 方法

```java
// 使用包装类中的 parseXXX() 方法
int j = Integer.parseInt(i);
// 使用包装类中的 valueOf() 方法
int j = Integer.valueOf(i);
```

## 自动装箱的内存复用

以 Integer 为例:

```java
public final class Integer extends Number implements Comparable<Integer> {  
	 private final int value;  
	  
	 /*Integer的构造方法, 接受一个整型参数,Integer对象表示的int值, 保存在value中*/  
	 public Integer(int value) {  
			this.value = value;  
	 }  
	   
	 /*equals()方法判断的是:所代表的int型的值是否相等*/  
	 public boolean equals(Object obj) {  
			if (obj instanceof Integer) {  
				return value == ((Integer)obj).intValue();  
			}  
			return false;  
	 }  
	   
	 /*返回这个Integer对象代表的int值, 也就是保存在value中的值*/  
	 public int intValue() {  
			return value;  
	 }  
	   
	 /** 
	  * 首先会判断i是否在[IntegerCache.low,Integer.high]之间 
	  * 如果是, 直接返回Integer.cache中相应的元素 
	  * 否则, 调用构造方法, 创建一个新的Integer对象 
	  */  
	 public static Integer valueOf(int i) {  
		assert IntegerCache.high >= 127;  
		if (i >= IntegerCache.low && i <= IntegerCache.high)  
			return IntegerCache.cache[i + (-IntegerCache.low)];  
		return new Integer(i);  
	 }  
      
	/** 
	 * 静态内部类, 缓存了从[low,high]对应的Integer对象 
	 * low -128这个值不会被改变 
	 * high 默认是127, 可以改变, 最大不超过:Integer.MAX_VALUE - (-low) -1 
	 * cache 保存从[low,high]对象的Integer对象 
	 */  
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
				int i = parseInt(integerCacheHighPropValue);  
				i = Math.max(i, 127);  
				// Maximum array size is Integer.MAX_VALUE  
				h = Math.min(i, Integer.MAX_VALUE - (-low) -1);  
			}  
			high = h;  
		
			cache = new Integer[(high - low) + 1];  
			int j = low;  
			for(int k = 0; k < cache.length; k++)  
				cache[k] = new Integer(j++);  
		}  
		
		private IntegerCache() {}  
	}  
}  
```

通过分析上面的代码, 得到:

1. Integer 有一个实例域 value, 它保存了这个 Integer 所代表的 int 型的值, 且它是 final 的, 也就是说这个 Integer 对象一经构造完成, 它所代表的值就不能再被改变.
2. Integer 重写了 equals() 方法, 它通过比较两个 Integer 对象的 value, 来判断是否相等.
3. 重点是静态内部类 IntegerCache, 通过类名就可以发现:它是用来缓存数据的.它有一个数组, 里面保存的是连续的 Integer 对象.
   1. low: 代表缓存数据中最小的值, 固定是-128.
   2. high: 代表缓存数据中最大的值, 它可以被该改变, 默认是127.high最小是127, 最大是 Integer.MAX_VALUE-(-low)-1 , 如果high超过了这个值, 那么cache[ ]的长度就超过Integer.MAX_VALUE了, 也就溢出了.
   3. cache[]: 里面保存着从 [low,high] 所对应的 Integer 对象, 长度是 high-low+1 (因为有元素0, 所以要加1).
4. 调用valueOf(int i)方法时, 首先判断i是否在[low,high]之间, 如果是, 则复用Integer.cache[i-low].比如, 如果Integer.valueOf(3), 直接返回Integer.cache[131]；如果i不在这个范围, 则调用构造方法, 构造出一个新的Integer对象.
5. 调用intValue(), 直接返回value的值.

通过 3 和 4 可以发现, 默认情况下, 在使用自动装箱时, VM会复用[-128,127]之间的Integer对象.

```java
Integer  a1 = 1;  
Integer  a2 = 1;  
Integer  a3 = new Integer(1);  
// 会打印true, 因为a1和a2是同一个对象,都是Integer.cache[129]  
System.out.println(a1 == a2);  
// false, a3构造了一个新的对象, 不同于a1,a2  
System.out.println(a1 == a3);  
```

一个经典的例子

```java
public class AutoWrapperTrap {  
    public static void main(String[] args) {  
        //[-128,127]之间, 自动装箱会复用对象  
        Integer a = 1;  
        Integer b = 2;  
        Integer c = 3;  
        Integer d = 3;  
        //不会复用  
        Integer e = 321;  
        Integer f = 321;  
          
        int base = 3;  
          
        Long g = 3L;  
          
        System.out.println(c == base);//true c自动拆箱  
        System.out.println(c == d);//true  
        System.out.println(e == f);//false  
        System.out.println(c == (a + b));//true 遇到算术运算, 自动拆箱  
        System.out.println(c.equals(a + b));//true 需要对象, 自动装箱  
        System.out.println(g == (a + b));//true  
        System.out.println(g.equals(a + b));//false 只会自动装箱为对应的包装类型  
    }  
} 
```

经过反编译后

```java
public class AutoWrapperTrap  
{  
  public static void main(String[] args)  
  {  
    Integer a = Integer.valueOf(1);  
    Integer b = Integer.valueOf(2);  
    Integer c = Integer.valueOf(3);  
    Integer d = Integer.valueOf(3);  
  
  
    Integer e = Integer.valueOf(321);  
    Integer f = Integer.valueOf(321);  
  
  
    int base = 3;  
  
  
    Long g = Long.valueOf(3L);  
  
  
    System.out.println(c.intValue() == base);  
    System.out.println(c == d);  
    System.out.println(e == f);  
    System.out.println(c.intValue() == a.intValue() + b.intValue());  
    System.out.println(c.equals(Integer.valueOf(a.intValue() + b.intValue())));  
    System.out.println(g.longValue() == a.intValue() + b.intValue());  
    System.out.println(g.equals(Integer.valueOf(a.intValue() + b.intValue())));  
  }  
} 
```

## 总结

在JDK 1.5中提供了自动装箱与自动拆箱, 这其实是Java 编译器的语法糖, 编译器通过调用包装类型的valueOf()方法实现自动装箱, 调用xxxValue()方法自动拆箱.自动装箱和拆箱会有一些陷阱, 那就是包装类型复用了某些对象.

1. Integer默认复用了[-128,127]这些对象, 其中高位置可以修改；
2. Byte复用了全部256个对象[-128,127]；
3. Short服用了[-128,127]这些对象；
4. Long服用了[-128,127];
5. Character复用了[0,127],Charater不能表示负数;

Double 和 Float 是连续不可数的, 所以没法复用对象, 也就不存在自动装箱复用陷阱.

Boolean 没有自动装箱与拆箱, 它也复用了 Boolean.TRUE 和 Boolean.FALSE, 通过Boolean.valueOf(boolean b)返回的Blooean对象要么是 TRUE, 要么是FALSE, 这点也要注意.

## Java 中的基本数据类型转换（自动、强制、提升）

::: tip 自动类型转换
数字表示范围小的数据类型可以自动转换成范围大的数据类型
:::

自动类型转换需要考虑数据溢出的问题

::: tip 强制类型转换
即强制显示的把一个数据类型转换为另外一种数据类型.
:::

::: tip 类型提升
指在多种不同数据类型的表达式中, 类型会自动向范围表示大的值的数据类型提升.
:::

::: tip 扩展阅读
[👉 一个简单问题不简单实现](./swap_integer.md)
:::

[👈 **相关面试题**](./README.md#_42-👉-自动装箱与拆箱)
