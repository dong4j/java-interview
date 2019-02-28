# 深入理解泛型

## 什么是泛型

**泛型就是变量类型的参数化**.
在使用泛型前, 存入集合中的元素可以是任何类型的, 当从集合中取出时, 所有的元素都是 Object 类型, 需要进行向下的强制类型转换, 转换到特定的类型.而强制类型转换容易引起运行时错误.
泛型类型参数只能被类或接口类型赋值, 不能被原生数据类型赋值, 原生数据类型需要使用对应的包装类.

1. 不适用泛型

```java
class Test {
        private Object ob; // 定义一个通用类型成员
        public Test(Object ob) {
            this.ob = ob;
        }
        public Object getOb() {
            return ob;
        }
        public void setOb(Object ob) {
            this.ob = ob;
        }
        public void showTyep() {
            System.out.println("T的实际类型是: " + ob.getClass().getName());
        }
}
public class TestDemo {
        public static void main(String[] args) {
            // 定义类Gen2的一个Integer版本
            Test intOb = new Test(new Integer(88));
            intOb.showTyep();
            int i = (Integer) intOb.getOb();
            System.out.println("value= " + i);
            System.out.println("---------------------------------");
            // 定义类Gen2的一个String版本
            Test strOb = new Test("Hello Gen!");
            strOb.showTyep();
            String s = (String) strOb.getOb();
            System.out.println("value= " + s);
            }
}
```

2. 使用泛型

```java
class Test<T> {
        private T ob; // 定义泛型成员变量
        public Test(T ob) {
            this.ob = ob;
        }
        public T getOb() {
            return ob;
        }
        public void setOb(T ob) {
            this.ob = ob;
        }
        public void showType() {
            System.out.println("T的实际类型是: " + ob.getClass().getName());
        }
}
public class TestDemo {
        public static void main(String[] args) {
            // 定义泛型类Gen的一个Integer版本
            Test<Integer> intOb = new Test<Integer>(88);
            intOb.showType();
            int i = intOb.getOb();
            System.out.println("value= " + i);
            System.out.println("----------------------------------");
            // 定义泛型类Gen的一个String版本
            Test<String> strOb = new Test<String>("Hello Gen!");
            strOb.showType();
            String s = strOb.getOb();
            System.out.println("value= " + s);
            }
}
```

T 的实际类型是:
java.lang.Integer
value= 88

T 的实际类型是: 
java.lang.String
value= Hello Gen!


## 深入
有两个类如下, 要构造两个类的对象, 并打印出各自的成员 x.

```java
public class StringDemo {
    private String x;
    public StringDemo(String x) {
        this.x = x;
    }
    public String getX() {
        return x;
    }
    public void setX(String x) {
        this.x = x;
    }
}
public class DoubleDemo {
    private Double x;
    public DoubleDemo(Double x) {
        this.x = x;
    }
    public Double getX() {
        return x;
    }
    public void setX(Double x) {
        this.x = x;
    }
}
```

**重构**

因为上面的类中, 成员和方法的逻辑都一样, 就是类型不一样, 因此考虑重构.Object 是所有类的父类, 因此可以考虑用 Object 做为成员类型, 这样就可以实现通用了, 实际上就是 “Object 泛型”.

```java
public class ObjectDemo {
    private Object x;
    public ObjectDemo(Object x) {
        this.x = x;
    }
    public Object getX() {
        return x;
    }
    public void setX(Object x) {
        this.x = x;
    }
}
```

```java
public class ObjectDemoDemo {
    public static void main(String args[]) {
        ObjectDemo strDemo = new ObjectDemo(new StringDemo("Hello Generics!"));
        ObjectDemo douDemo = new ObjectDemo(new DoubleDemo(new Double("33")));
        ObjectDemo objDemo = new ObjectDemo(new Object());
        System.out.println("strFoo.getX=" + (StringDemo) strDemo.getX());
        System.out.println("douFoo.getX=" + (DoubleDemo) douDemo.getX());
        System.out.println("objFoo.getX=" + objDemo.getX());
    }
}
```

>运行结果如下:
strDemo.getX=StringDemo@5d748654
douDemo.getX=DoubleDemo@d1f24bb
objDemo.getX=java.lang.Object@19821f


在 Java 5 之前, 为了让类有通用性, 往往将参数类型、返回类型设置为 Object 类型, 当获取这些返回类型来使用时候, 必须将其 “强制” 转换为原有的类型或者接口, 然后才可以调用对象上的方法.

强制类型转换很麻烦, 我还要事先知道各个 Object 具体类型是什么, 才能做出正确转换.否则, 要是转换的类型不对, 比如将 “Hello Generics!” 字符串强制转换为 Double, 那么编译的时候不会报错, 可是运行的时候就挂了.那有没有不强制转换的办法 ---- 有, 改用 Java5 泛型来实现.

```java
class GenericsTest<T> {
    private T x;
    public GenericsTest(T x) {
        this.x = x;
    }
    public T getX() {
        return x;
    }
    public void setX(T x) {
        this.x = x;
    }
}

public class GenericsTestDemo {
    public static void main(String args[]) {
        GenericsTest<String> strFoo = new GenericsTest<String>("Hello Generics!");
        GenericsTest<Double> douFoo = new GenericsTest<Double>(new Double("33"));
        GenericsTest<Object> objFoo = new GenericsTest<Object>(new Object());
        System.out.println("strTest.getX=" + strTest.getX());
        System.out.println("douTest.getX=" + douTest.getX());
        System.out.println("objTest.getX=" + objTest.getX());
    }
}
```

>运行结果:
strTest.getX=Hello Generics!
douTest.getX=33.0
objTest.getX=java.lang.Object@19821f

和使用 “Object 泛型” 方式实现结果的完全一样, 但是这个 Demo 简单多了, 里面没有强制类型转换信息.
下面解释一下上面泛型类的语法:

使用 <T> 来声明一个类型持有者名称, 然后就可以把 T 当作一个类型代表来声明成员、参数和返回值类型.
当然 T 仅仅是个名字, 这个名字可以自行定义.

class GenericsTest<T> 声明了一个泛型类, 这个 T 没有任何限制, 实际上相当于 Object 类型, 实际上相当于 class GenericsTest<T extends Object>.

与 Object 泛型类相比, 使用泛型所定义的类在声明和构造实例的时候, 可以使用 “<实际类型>” 来一并指定泛型类型持有者的真实类型.
类如
`GenericsTest<Double> douTest=new GenericsTest<Double>(new Double("33"));`

当然, 也可以在构造对象的时候不使用尖括号指定泛型类型的真实类型, 但是你在使用该对象的时候, 就需要强制转换了.
比如:`GenericsTest douTest=new GenericsTest(new Double("33"));`

实际上, 当构造对象时不指定类型信息的时候, 默认会使用 Object 类型, 这也是要强制转换的原因.

## 高级用法

**限制泛型**

在上面的例子中, 由于没有限制 class GenericsTest<T> 类型持有者 T 的范围, 实际上这里的限定类型相当于 Object, 这和 “Object 泛型” 实质是一样的.

比如我们要限制 T 为集合接口类型.只需要这么做:
`class GenericsTest<T extends Collection>`

这样类中的泛型 T 只能是 Collection 接口的实现类, 传入非 Collection 接口编译会出错.

注意:<T extends Collection> 这里的限定使用关键字 extends, 后面可以是类也可以是接口.

但这里的 extends 已经不是继承的含义了, 
**应该理解为 T 类型是实现 Collection 接口的类型**, 或者 **T 是继承了 XX 类的类型**.

下面继续对上面的例子改进, 我只要实现了集合接口的类型:

```java
public class CollectionGenTest<T extends Collection> {
    private T x;
    public CollectionGenTest(T x) {
        this.x = x;
    }
    public T getX() {
        return x;
    }
    public void setX(T x) {
        this.x = x;
    }
}
```

实例化的时候可以这么写

```java
public class CollectionGenTestDemo {
    public static void main(String args[]) {
        CollectionGenTest<ArrayList> listTest = new CollectionGenTest<ArrayList>(new ArrayList(10));
        System.out.println(listTest.getX().size());
    }
}
```

**多接口限制**

虽然 Java 泛型简单的用 extends 统一的表示了原有的 extends 和 implements 的概念, 但仍要遵循应用的体系, Java 只能继承一个类, 但可以实现多个接口, 所以你的某个类型需要用 extends 限定, 且有多种类型的时候, 只能存在一个是类, 并且类写在第一位, 接口列在后面, 也就是:

`<T extends SomeClass & interface1 & interface2 & interface3>`

这里的例子仅演示了泛型方法的类型限定, 对于泛型类中类型参数的限制用完全一样的规则, 只是加在类声明的头部, 如:

```java
public class Demo<T extends Comparable & Serializable> {
    // T类型就可以用Comparable声明的方法和Seriablizable所拥有的特性了
}
```

**通配符泛型**

为了解决类型被限制死了不能动态根据实例来确定的缺点, 引入了 “通配符泛型”, 针对上面的例子, 使用通配泛型格式为 <? extends Collection>

"?" 代表未知类型, 这个类型是实现 Collection 接口.那么上面实现的方式可以写为:

```java
public class CollectionGenTestDemo {
    public static void main(String args[]) {
        CollectionGenTest<?> listTest= new CollectionGenTest<ArrayList>(new ArrayList());
        System.out.println("实例化成功!");
    }
}
```

1. 如果只指定了 <?>, 而没有 extends, 则默认是允许 Object 及其下的任何 Java 类了.也就是任意类.
2. 通配符泛型不单可以向上限制, 如 <? extends Collection>, 还可以向下限制, 如 <? super Double>, 表示类型只能接受 Double 及其上层父类类型, 如 Number、Object 类型的实例.
3. 泛型类定义可以有多个泛型参数, 中间用逗号隔开, 还可以定义泛型接口, 泛型方法.这些都与泛型类中泛型的使用规则类似.

### 泛型方法

是否拥有泛型方法, 与其所在的类是否泛型没有关系.要定义泛型方法, 只需将泛型参数列表置于返回值前.如:

```java
public class ExampleA {
    private <T> void f(T x) {
        System.out.println(x.getClass().getName());
    }

    public static void main(String[] args) {
        ExampleA ea = new ExampleA();
        ea.f(" ");
        ea.f(10);
        ea.f('a');
        ea.f(ea);
    }
}
```

使用泛型方法时, 不必指明参数类型, 编译器会自己找出具体的类型.泛型方法除了定义不同, 调用就像普通方法一样.

需要注意, 一个 static 方法, 无法访问泛型类的类型参数, 所以, 若要 static 方法需要使用泛型能力, 必须使其成为泛型方法.
比如:

```java
public class Demo{
    public static <T> T test(T a){
        return a;
    }
}
```

## List<?> 和 List<T > 的区别

类型参数 "<T>" 和无界通配符 "<?>"

**<T> 声明一个泛型类或泛型方法.**
**<?> 使用泛型类或泛型方法.**

https://www.zhihu.com/question/31429113

## Java 泛型 <? super T> 中 super 怎么 理解？与 extends 有何不同

https://www.zhihu.com/question/20400700/answer/117464182


