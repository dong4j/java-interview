# Java 中的异常处理

## 概述
- Java 异常是 Java 提供的一种识别及响应错误的一致性机制.
- Java 异常机制可以使程序中异常处理代码和正常业务代码分离, 保证程序代码更加优雅, 并提高程序健壮性.
- 在有效使用异常的情况下, 异常能清晰的回答 what, where, why 这3个问题:
    - **异常类型** : "什么"被抛出;
    - **异常堆栈跟踪** : "在哪"抛出;
    - **异常信息** : "为什么"会抛出;

### Java 异常类层次结构图

![img](./imgs/PPjwP.png)



在 Java 中, 所有的异常都有一个共同的祖先 java.lang 包中的 **Throwable类**.

Throwable: 有两个重要的子类:**Exception(异常)** 和 **Error(错误)** , 二者都是 Java 异常处理的重要子类, 各自都包含大量子类.

**Error(错误):是程序无法处理的错误**, 表示运行应用程序中较严重问题. 大多数错误与代码编写者执行的操作无关, 而表示代码运行时 JVM(Java 虚拟机)出现的问题.

例如, Java 虚拟机运行错误(Virtual MachineError), 当 JVM 不再有继续执行操作所需的内存资源时, 将出现 OutOfMemoryError. 这些异常发生时, Java虚拟机(JVM)一般会选择线程终止.

这些错误表示故障发生于虚拟机自身, 或者发生在虚拟机试图执行应用时, 如 Java虚拟机运行错误(Virtual MachineError), 类定义错误(NoClassDefFoundError)等.

这些错误是不可查的, 因为它们在应用程序的控制和处理能力之 外, 而且绝大多数是程序运行时不允许出现的状况.对于设计合理的应用程序来说, 即使确实发生了错误, 本质上也不应该试图去处理它所引起的异常状况.在 Java 中, 错误通过 Error 的子类描述.

**Exception(异常):是程序本身可以处理的异常**. Exception 类有一个重要的子类 **RuntimeException**.

RuntimeException 异常由 Java虚拟机抛出. **NullPointerException**(要访问的变量没有引用任何对象时, 抛出该异常), **ArithmeticException**(算术运算异常, 一个整数除以0时, 抛出该异常)和 **ArrayIndexOutOfBoundsException** (下标越界异常).

**注意:异常和错误的区别:异常能被程序本身可以处理, 错误是无法处理.**

### Throwable 类常用方法

- **public string getMessage()**:返回异常发生时的详细信息
- **public string toString()**:返回异常发生时的简要描述
- **public string getLocalizedMessage()**:返回异常对象的本地化信息.使用 Throwable 的子类覆盖这个方法, 可以声称本地化信息. 如果子类没有覆盖该方法, 则该方法返回的信息与 getMessage() 返回的结果相同
- **public void printStackTrace()**:在控制台上打印 Throwable 对象封装的异常信息

## Throwable类

![](imgs/173bd857.png)



Throwable是 Java 语言中所有错误或异常的超类.
Throwable 包含两个子类: Error 和 Exception.它们通常用于指示发生了异常情况.

Throwable包含了其线程创建时线程执行堆栈的快照, 它提供了printStackTrace() 等接口用于获取堆栈跟踪数据等信息.

### Exception
Exception 及其子类是 Throwable 的一种形式, 它指出了合理的应用程序想要捕获的条件.
### RuntimeException 
RuntimeException 是那些可能在 Java 虚拟机正常运行期间抛出的异常的超类.
编译器不会检查 RuntimeException异常.例如, 除数为零时, 抛出 ArithmeticException 异常.

RuntimeException 是 ArithmeticException 的超类. 当代码发生除数为零的情况时, 倘若既"没有通过throws声明抛出ArithmeticException异常", 也"没有通过try...catch...处理该异常", 也能通过编译. 这就是我们所说的"编译器不会检查RuntimeException异常"！

如果代码会产生 RuntimeException 异常, 则需要通过修改代码进行避免.例如, 若会发生除数为零的情况, 则需要通过代码避免该情况的发生！

### Error
和 Exception 一样, Error 也是 Throwable 的子类.它用于指示合理的应用程序不应该试图捕获的严重问题, 大多数这样的错误都是异常条件.
和 RuntimeException 一样, 编译器也不会检查 Error.


##  异常分类(Exception):
Java 将可抛出 (Throwable) 的结构分为三种类型:
1. 被检查的异常 (CheckedException)
2. 运行时异常 (RuntimeException)
3. 错误 (Error)
### **运行时异常**
- 定义: 
    RuntimeException 及其子类都被称为运行时异常.
- 特点: 
    Java 编译器不会检查它.也就是说, 当程序中可能出现这类异常时, 倘若既 "**没有通过throws声明抛出它**" , 也"**没有用try-catch语句捕获它**", 还是会编译通过.例如, 除数为零时产生的 ArithmeticException 异常, 数组越界时产生的 IndexOutOfBoundsException 异常, fail-fast 机制产生的 ConcurrentModificationException 异常等, 都属于运行时异常.
虽然 Java 编译器不会检查运行时异常, 但是我们也可以通过 throws 进行声明抛出, 也可以通过 try-catch 对它进行捕获处理.
如果产生运行时异常, 则需要通过修改代码来进行避免.例如, 若会发生除数为零的情况, 则需要通过代码避免该情况的发生！
### **被检查的异常**(编译期异常)
- 定义: 
    Exception 类本身, 以及 Exception 的子类中除了"运行时异常"之外的其它子类都属于被检查异常.
- 特点: 
    Java 编译器会检查它. 此类异常, 要么通过 throws 进行声明抛出, 要么通过 try-catch 进行捕获处理, 否则不能通过编译.例如, CloneNotSupportedException 就属于被检查异常.当通过 clone() 接口去克隆一个对象, 而该对象对应的类没有实现 Cloneable 接口, 就会抛出 CloneNotSupportedException 异常.
被检查异常通常都是可以恢复的.
### **错误**
- 定义: 
Error 类及其子类.
- 特点: 
和运行时异常一样, 编译器也不会对错误进行检查.
当资源不足、约束失败、或是其它程序无法继续运行的条件发生时, 就产生错误.程序本身无法修复这些错误的.例如, VirtualMachineError就属于错误.
按照 Java 惯例, **我们是不应该实现任何新的 Error 子类的！**
对于上面的3种结构, 我们在抛出异常或错误时, 到底该哪一种？《Effective Java》中给出的建议是:

::: tip

**对于可以恢复的条件使用被检查异常, 对于程序错误使用运行时异常**.

:::


## 异常处理关键字

- **try** :  用于监听.将要被监听的代码(可能抛出异常的代码)放在 try 语句块之内, 当 try 语句块内发生异常时, 异常就被抛出.
- **catch** :  用于捕获异常. catch 用来捕获 try 语句块中发生的异常.
- **finally** :  finally 语句块总是会被执行.它主要用于回收在 try 块里打开的物力资源(如数据库连接、网络连接和磁盘文件).只有 finally 块, 执行完成之后, 才会回来执行 try 或者 catch 块中的 return 或者 throw 语句, 如果finally 中使用了 return 或者 throw 等终止方法的语句, 则就不会跳回执行, 直接停止.



::: tip

finalize() 是Object类的一个方法,用来回收没有被引用的对象,被GC调用;

finally 是异常处理语句

:::

- **throw** :  用于抛出异常.
- **throws** :  用在方法签名中, 用于声明该方法可能抛出的异常.

## 异常的控制流程
在 Java 中, 异常是被一个方法抛出的对象. 当一个方法抛出异常时,该方法从调用栈中被弹出,同时把产生的异常的对象抛给栈中的前一个方法.


### 异常处理
- 捕获这个异常,不让它沿着调用栈继续向下抛出
- 捕获这个异常,并继续向下抛出
- 不捕获这个异常,从而导致方法从调用栈中被弹出,异常对象继续抛给调用栈的下面的方法
- try 程序块里面的语句是按顺序执行的语句
- 当 try 程序块里面的语句抛出一个异常的时候, 程序的控制转向了相匹配的 catch 程序块, catch 程序块里面的语句被执行.
- 当异常发生后, 程序执行将忽略 try 程序块中剩余的语句, 继续执行程序块后面的语句.
- 如果在 try 程序块中没有抛出异常, 那么 catch 块将被忽略.程序将继续执行 try-catch 下面的语句
- 在一个 try-catch 语句中, 当有多个 catch 块的时候, 它们被顺序检查
- 在检查过程中, 注意异常的匹配关系是很重要的
- 当一个异常被抛出, 与它相匹配的 catch 块被执行, 其它的 catch 块, 就被忽略掉不再执行
- 如果没有 catch 块匹配抛出的异常, 那么系统会在堆栈中搜索, 找到一个匹配的捕获方法.
- 如果仍然没有找到, 那么系统将处理抛出异常
- 即使在 try 程序块内部有一个 return 语句, finally 语句块也要被执行
- 当在 try 程序块中, 遇到 return 语句, finally 块中的语句在方法返回之前被执行

## 异常处理流程
1. 如果程序产生了异常, 那么会自动的由 JVM根据异常的类型,实例化一个指定异常类的对象;
2. 如果没有处理异常的操作,
    - 就交给 JVM 默认处理-->输出异常信息
3. 如果有异常处理,
    - 则由 try 语句捕获异常类对象;
    - 然后匹配后面的 catch语句,
        - 如果成功,则使用指定的处理语句
        - 如果都不匹配,则由JVM默认处理
4. 不管是否有异常,都会执行 finally 语句,如果没有异常,执行完 finally ,则会继续执行之后的其他语句;如果此时有异常没有处理(没有 catch 匹配),那么就会执行 finally 语句,但是执行完 finally 后,将默认交给 JVM 进行异常的输出,并且程序中断.

![](imgs/41da06a7.png)

## 异常的抛出
### **throws**
一个完整的方法声明:
`访问修饰符 可选修饰符 返回类型 方法名(参数列表) throws 异常类型`
作用:

- 通知本方法的调用者,本方法**有可能**有某种或几种类型的异常
- 子类重写的方法不能抛出比父类更多(范围)的异常;

3种类:
- 表示层类:主要负责UI的,跟用户打交道,放在最外面的一层;
- 业务层类:处理表示层接受到的数据;
- 持久层类:存储数据;

### **throw** 
抛出异常对象 
throw new 异常类();
执行到throw时一定会有异常的抛出,就会执行异常抛出执行流程

## 自定义异常类
- 继承 Exception 类;
- 重载Exception的构造方法,一般都是构造3个带参构造方法;  
    - 目的是把其他异常的信息封装到自定义异常信息中;
    - 自定义需要的业务上的异常欣喜;
- 添加自定义异常的特有方法;
    - 大概思路:
        - 新定义一个异常类,继承Exception类
        - 在B内中的方法中声明抛出自定义异常
        - 在B方法内会出现异常的语句用try - catch 包起来
        - 在catch语句中throw new 自定义异常类名(参数列表);
        - 如果 A 类是 B 类的方法的调用者,如果不处理异常,必须在方法中声明 throws 自定义异常类名 
        - 如果mian方法是A的调用者,如果不抛出异常,就必须处理这个异常;
        - 如果抛出异常,可以不处理,交给JVM处理;



----

## finally 关键字
```java
public classTest {
    public static void main (String[] args) {
        System.out.println (new Test().test() );
    }
    static int test() {
        int x = 1;
        try {
            return x;
        }
        finally {
            ++x;
        }
    }
}
```

::: tip 输出:
1
:::

```java
public class smallT {
    public static void main (String args[]) {
        smallT t = new smallT();
        int b = t.get();
        System.out.println (b);
    }

    public int get() {
        try {
            return 1 ;
        }
        finally {
            return 2 ;
        }
    }
}
```

::: tip 输出:
2
:::

```java
public class FinallyTest {
    public static void main(String[] args) {
        System.out.println(new FinallyTest().test());
    }

    private int test() {
        try {
            return func1();
        } finally {
            return func2();
        }
    }

    private int func1() {
        System.out.println("func1");
        return 1;
    }

    private int func2() {
        System.out.println("func2");
        return 2;
    }
}
```

::: tip 输出:
func1
func2
2
:::


### 异常处理总结

- try 块: 用于捕获异常.其后可接零个或多个 catch 块, 如果没有 catch 块, 则必须跟一个 finally 块.
- catch 块: 用于处理try捕获到的异常.
- finally 块: 无论是否捕获或处理异常, finally 块里的语句都会被执行. 当在 try 块或 catch 块中遇到 return 语句时, finally 语句块将在方法返回之前被执行.

**在以下 4 种特殊情况下, finally 块不会被执行:**

1. 在 finally 语句块中发生了异常.
2. 在前面的代码中用了System.exit()退出程序.
3. 程序所在的线程死亡.
4. 关闭CPU.