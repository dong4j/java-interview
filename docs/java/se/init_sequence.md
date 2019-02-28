# Java 中父类和子类初始化顺序

```java
public class Father {
    public String fStr1 = "father1";
    protected String fStr2 = "father2";
    private String fStr3 = "father3";
 
    {
        System.out.println("Father common block be called");
    }
 
    static {
        System.out.println("Father static block be called");
    }
 
    public Father() {
        System.out.println("Father constructor be called");
    }
}
```

```java

public class Son extends Father{
    public String SStr1 = "Son1";
    protected String SStr2 = "Son2";
    private String SStr3 = "Son3";
 
    {
        System.out.println("Son common block be called");
    }
 
    static {
        System.out.println("Son static block be called");
    }
 
    public Son() {
        System.out.println("Son constructor be called");
    }
 
    public static void main(String[] args) {
        new Son();
        System.out.println();
        new Son();
    }
}
```

```java

Father static block be called
Son static block be called
Father common block be called
Father constructor be called
Son common block be called
Son constructor be called
 
Father common block be called
Father constructor be called
Son common block be called
```

## 总结:

1. 在类加载的时候执行父类的 static 代码块, 并且只执行一次（因为类只加载一次）;
2. 执行子类的 static 代码块, 并且只执行一次（因为类只加载一次）;
3. 执行父类的类成员初始化, 并且是从上往下按出现顺序执行（在debug时可以看出）.
4. 执行父类的构造函数;
5. 执行子类的类成员初始化, 并且是从上往下按出现顺序执行.
6. 执行子类的构造函数.