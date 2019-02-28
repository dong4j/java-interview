# final finally finalize 的区别

这是一道再经典不过的面试题了, 我们在各个公司的面试题中几乎都能看到它的身影.final、finally 和 finalize 虽然长得像孪生三兄弟一样, 但是它们的含义和用法却是大相径庭.这一次我们就一起来回顾一下这方面的知识.
***final 关键字***

我们首先来说说 final.它可以用于以下四个地方:

1. 定义变量, 包括静态的和非静态的.
2. 定义方法的参数.
3. 定义方法.
4. 定义类.

我们依次来回顾一下每种情况下 final 的作用.首先来看第一种情况, 如果 final 修饰的是一个基本类型, 就表示这个变量被赋予的值是不可变 的, 即它是个常量；如果 final 修饰的是一个对象, 就表示这个变量被赋予的引用是不可变的, 这里需要提醒大家注意的是, 不可改变的只是这个变量所保存的 引用, 并不是这个引用所指向的对象.在第二种情况下, final 的含义与第一种情况相同.实际上对于前两种情况, 有一种更贴切的表述 final 的含义的描 述, 那就是, 如果一个变量或方法参数被 final 修饰, 就表示它只能被赋值一次, 但是 JAVA 虚拟机为变量设定的默认值不记作一次赋值.

被 final 修饰的变量必须被初始化.初始化的方式有以下几种:

1. 在定义的时候初始化.
2. final 变量可以在初始化块中初始化, 不可以在静态初始化块中初始化.
3. 静态 final 变量可以在静态初始化块中初始化, 不可以在初始化块中初始化.
4. final 变量还可以在类的构造器中初始化, 但是静态 final 变量不可以.

通过下面的代码可以验证以上的观点:

```java
public class FinalTest {  
    // 在定义时初始化  
    public final int A = 10;  
  
    public final int B;  
    // 在初始化块中初始化  
    {  
        B = 20;  
    }  
  
    // 非静态 final 变量不能在静态初始化块中初始化  
    // public final int C;  
    // static {  
    // C = 30;  
    // }  
  
    // 静态常量, 在定义时初始化  
    public static final int STATIC_D = 40;  
  
    public static final int STATIC_E;  
    // 静态常量, 在静态初始化块中初始化  
    static {  
        STATIC_E = 50;  
    }  
  
    // 静态变量不能在初始化块中初始化  
    // public static final int STATIC_F;  
    // {  
    // STATIC_F = 60;  
    // }  
  
    public final int G;  
  
    // 静态 final 变量不可以在构造器中初始化  
    // public static final int STATIC_H;  
  
    // 在构造器中初始化  
    public FinalTest() {  
        G = 70;  
        // 静态 final 变量不可以在构造器中初始化  
        // STATIC_H = 80;  
  
        // 给 final 的变量第二次赋值时, 编译会报错  
        // A = 99;  
        // STATIC_D = 99;  
    }  
  
    // final 变量未被初始化, 编译时就会报错  
    // public final int I;  
  
    // 静态 final 变量未被初始化, 编译时就会报错  
    // public static final int STATIC_J;  
}  
```

我们运行上面的代码之后出了可以发现 final 变量（常量）和静态 final 变量（静态常量）未被初始化时, 编译会报错.

用 final 修饰的变量（常量）比非 final 的变量（普通变量）拥有更高的效率, 因此我们在实际编程中应该尽可能多的用常量来代替普通变量, 这也是一个很好的编程习惯.

当 final 用来定义一个方法时, 会有什么效果呢？正如大家所知, 它表示这个方法不可以被子类重写, 但是它这不影响它被子类继承.我们写段代码来验证一下:

```java
class ParentClass {  
    public final void TestFinal() {  
        System.out.println("父类 -- 这是一个 final 方法");  
    }  
}  
  
public class SubClass extends ParentClass {  
    /** 
     * 子类无法重写（override）父类的 final 方法, 否则编译时会报错 
     */  
    // public void TestFinal() {  
    // System.out.println("子类 -- 重写 final 方法");  
    // }  
      
    public static void main(String[] args) {  
        SubClass sc = new SubClass();  
        sc.TestFinal();  
    }  
}
```

这里需要特殊说明的是, 具有 private 访问权限的方法也可以增加 final 修饰, 但是由于子类无法继承 private 方法, 因此也无法重写它.编译器在处理 private 方法时, 是按照 final 方法来对待的, 这样可以提高该方法被调用时的效率.
不过子类仍然可以定义同父类中的 private 方法具有同样结构的方法, 但是这并不会产生重写的效果, 而且它们之间也不存在必然联系.

最后我们再来回顾一下 final 用于类的情况.这个大家应该也很熟悉了, 因为我们最常用的 String 类就是 final 的.由于 final 类不允 许被继承, 编译器在处理时把它的所有方法都当作 final 的, 因此 final 类比普通类拥有更高的效率.final 的类的所有方法都不能被重写, 但这并不 表示 final 的类的属性（变量）值也是不可改变的, 要想做到 final 类的属性值不可改变, 必须给它增加 final 修饰, 请看下面的例子:

```java
public final class FinalTest {  
  
    int i = 10;  
  
    public static void main(String[] args) {  
        FinalTest ft = new FinalTest();  
        ft.i = 99;  
        System.out.println(ft.i);  
    }  
} 
```

运行上面的代码试试看, 结果是 99, 而不是初始化时的 10.

***finally 语句***

接下来我们一起回顾一下 finally 的用法.这个就比较简单了, 它只能用在 try/catch 语句中, 并且附带着一个语句块, 表示这段语句最终总是被执行.请看下面的代码:


```java
public final class FinallyTest {  
    public static void main(String[] args) {  
        try {  
            throw new NullPointerException();  
        } catch (NullPointerException e) {  
            System.out.println("程序抛出了异常");  
        } finally {  
            System.out.println("执行了 finally 语句块");  
        }  
    }  
}  
```

运行结果说明了 finally 的作用:

1. 程序抛出了异常
2. 执行了 finally 语句块

请大家注意, 捕获程序抛出的异常之后, 既不加处理, 也不继续向上抛出异常, 并不是良好的编程习惯, 它掩盖了程序执行中发生的错误, 这里只是方便演示, 请不要学习.

那么, 有没有一种情况使 finally 语句块得不到执行呢？大家可能想到了 return、continue、break 这三个可以打乱代码顺序执行语句的规律.那我们就来试试看, 这三个语句是否能影响 finally 语句块的执行:

```java
public final class FinallyTest {  
  
    // 测试 return 语句  
    public ReturnClass testReturn() {  
        try {  
            return new ReturnClass();  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            System.out.println("执行了 finally 语句");  
        }  
        return null;  
    }  
  
    // 测试 continue 语句  
    public void testContinue() {  
        for (int i = 0; i < 3; i++) {  
            try {  
                System.out.println(i);  
                if (i == 1) {  
                    continue;  
                }  
            } catch (Exception e) {  
                e.printStackTrace();  
            } finally {  
                System.out.println("执行了 finally 语句");  
            }  
        }  
    }  
  
    // 测试 break 语句  
    public void testBreak() {  
        for (int i = 0; i < 3; i++) {  
            try {  
                System.out.println(i);  
                if (i == 1) {  
                    break;  
                }  
            } catch (Exception e) {  
                e.printStackTrace();  
            } finally {  
                System.out.println("执行了 finally 语句");  
            }  
        }  
    }  
  
    public static void main(String[] args) {  
        FinallyTest ft = new FinallyTest();  
        // 测试 return 语句  
        ft.testReturn();  
        System.out.println();  
        // 测试 continue 语句  
        ft.testContinue();  
        System.out.println();  
        // 测试 break 语句  
        ft.testBreak();  
    }  
}  
  
class ReturnClass {  
    public ReturnClass() {  
        System.out.println("执行了 return 语句");  
    }  
}  
```

上面这段代码的运行结果如下:

```
执行了 return 语句
执行了 finally 语句
0
执行了 finally 语句
1
执行了 finally 语句
2
执行了 finally 语句
0
执行了 finally 语句
1
执行了 finally 语句
```

很明显, return、continue 和 break 都没能阻止 finally 语句块的执行.从输出的结果来看, return 语句似乎在 finally 语句块之前执行了, 事实真的如此吗？我们来想想看, return 语句的作用是什么呢？是退出当前的方法, 并将值或对象返回.如果 finally 语句块是在 return 语句之后执行的, 那么 return 语句被执行后就已经退出当前方法了, finally 语句块又如何能被执行呢？因 此, 正确的执行顺序应该是这样的:编译器在编译 return new ReturnClass(); 时, 将它分成了两个步骤, new ReturnClass() 和 return, 前一个创建对象的语句是在 finally 语句块之前被执行的, 而后一个 return 语句是在 finally 语 句块之后执行的, 也就是说 finally 语句块是在程序退出方法之前被执行的.同样, finally 语句块是在循环被跳过（continue）和中断 （break）之前被执行的.

***finalize 方法***

最后, 我们再来看看 finalize, 它是一个方法, 属于 java.lang.Object 类, 它的定义如下:

`protected void finalize() throws Throwable { }  `

众所周知, finalize() 方法是 GC（garbage collector）运行机制的一部分, 关于 GC 的知识我们将在后续的章节中来回顾.

在此我们只说说 finalize() 方法的作用是什么呢？

finalize() 方法是在 GC 清理它所从属的对象时被调用的, 如果执行它的过程中抛出了无法捕获的异常（uncaught exception）, GC 将终止对改对象的清理, 并且该异常会被忽略；直到下一次 GC 开始清理这个对象时, 它的 finalize() 会被再次调用.

请看下面的示例:

```java
public final class FinallyTest {  
    // 重写 finalize() 方法  
    protected void finalize() throws Throwable {  
        System.out.println("执行了 finalize() 方法");  
    }  
  
    public static void main(String[] args) {  
        FinallyTest ft = new FinallyTest();  
        ft = null;  
        System.gc();  
    }  
} 
```

运行结果如下:

* 执行了 finalize() 方法

程序调用了 java.lang.System 类的 gc() 方法, 引起 GC 的执行, GC 在清理 ft 对象时调用了它的 finalize() 方法, 因此才有了上面的输出结果.调用 System.gc() 等同于调用下面这行代码:

`Runtime.getRuntime().gc();  `

调用它们的作用只是建议垃圾收集器（GC）启动, 清理无用的对象释放内存空间, 但是 GC 的启动并不是一定的, 这由 JAVA 虚拟机来决定.直到 JAVA 虚拟机停止运行, 有些对象的 finalize() 可能都没有被运行过, 那么怎样保证所有对象的这个方法在 JAVA 虚拟机停止运行之前一定被调用 呢？答案是我们可以调用 System 类的另一个方法:

```java
public static void runFinalizersOnExit(boolean value) {  
    //other code  
}  
```


给这个方法传入 true 就可以保证对象的 finalize() 方法在 JAVA 虚拟机停止运行前一定被运行了, 不过遗憾的是这个方法是不安全的, 它会导致有用的对象 finalize() 被误调用, 因此已经不被赞成使用了.

由于 finalize() 属于 Object 类, 因此所有类都有这个方法, Object 的任意子类都可以重写（override）该方法, 在其中释放系统资源或者做其它的清理工作, 如关闭输入输出流.

通过以上知识的回顾, 我想大家对于 final、finally、finalize 的用法区别已经很清楚了.



