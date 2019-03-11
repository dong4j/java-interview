# JDK7 中的 Try-with-resources

Try-with-resources 是 JDK7 中一个新的异常处理机制, 它能够很容易地关闭在 try-catch 语句块中使用的资源. 

## 利用 Try-Catch-Finally 管理资源（旧的代码风格）

在 JDK7 以前, 程序中使用的资源需要被明确地关闭, 这个体验有点繁琐. 

下面的方法读取文件, 然后用 System.out 打印: 

```java
private static void printFile() throws IOException {
    InputStream input = null;

    try {
        input = <strong>new FileInputStream("file.txt")</strong>;

        int data = <strong>input.read()</strong>;
        while(data != -1){
            System.out.print((char) data);
            data = <strong>input.read()</strong>;
        }
    } finally {
        if(input != null){
            <strong>input.close()</strong>;
        }
    }
}
```


上面代码中黑体字的程序可能会抛出异常. 正如你所看到的, try 语句块中有 3 个地方能抛出异常, finally 语句块中有一个地方会能出异常. 

不论 try 语句块中是否有异常抛出, finally 语句块始终会被执行. 这意味着, 不论 try 语句块中发生什么, InputStream 都会被关闭, 或者说都会试图被关闭. 如果关闭失败, InputStream’s close() 方法也可能会抛出异常. 

假设 try 语句块抛出一个异常, 然后 finally 语句块被执行. 同样假设 finally 语句块也抛出了一个异常. 那么哪个异常会根据调用栈往外传播？

即使 try 语句块中抛出的异常与异常传播更相关, 最终还是 finally 语句块中抛出的异常会根据调用栈向外传播. 

在 JDK7 中, 对于上面的例子可以用 try-with-resource 结构这样写: 


```java
private static void printFileJava7() throws IOException {

    try(FileInputStream input = new FileInputStream("file.txt")) {

        int data = input.read();
        while(data != -1){
            System.out.print((char) data);
            data = input.read();
        }
    }
}
```


注意方法中的第一行: 

```java
try(FileInputStream input = new FileInputStream("file.txt")) {
```

这就是 try-with-resource 结构的用法. FileInputStream 类型变量就在 try 关键字后面的括号中声明. 而且一个 FileInputStream 类型被实例化并被赋给了这个变量. 

当 try 语句块运行结束时, FileInputStream 会被自动关闭. 这是因为 FileInputStream 实现了 java 中的 java.lang.AutoCloseable 接口. 所有实现了这个接口的类都可以在 try-with-resources 结构中使用. 

当 try-with-resources 结构中抛出一个异常, 同时 FileInputStreami 被关闭时（调用了其 close 方法）也抛出一个异常, try-with-resources 结构中抛出的异常会向外传播, 而 FileInputStreami 被关闭时抛出的异常被抑制了. 这与文章开始处利用旧风格代码的例子（在 finally 语句块中关闭资源）相反. 

## 使用多个资源

你可以在块中使用多个资源而且这些资源都能被自动地关闭. 下面是例子: 

```java
private static void printFileJava7() throws IOException {

    try(  FileInputStream     input         = new FileInputStream("file.txt");
          BufferedInputStream bufferedInput = new BufferedInputStream(input)
    ) {

        int data = bufferedInput.read();
        while(data != -1){
            System.out.print((char) data);
    data = bufferedInput.read();
        }
    }
}
```

上面的例子在 try 关键字后的括号里创建了两个资源——FileInputStream 和 BufferedInputStream. 当程序运行离开 try 语句块时, 这两个资源都会被自动关闭. 

这些资源将按照他们被创建顺序的逆序来关闭. 首先 BufferedInputStream 会被关闭, 然后 FileInputStream 会被关闭. 

## 自定义 AutoClosable 实现

这个 try-with-resources 结构里不仅能够操作 java 内置的类. 你也可以在自己的类中实现 java.lang.AutoCloseable 接口, 然后在 try-with-resources 结构里使用这个类. 

AutoClosable 接口仅仅有一个方法, 接口定义如下: 

```java
public interface AutoClosable {
    public void close() throws Exception;
}
```

任何实现了这个接口的方法都可以在 try-with-resources 结构中使用. 下面是一个简单的例子: 

```java
public class MyAutoClosable implements AutoCloseable {

    public void doIt() {
        System.out.println("MyAutoClosable doing it!");
    }

    @Override
    public void close() throws Exception {
        System.out.println("MyAutoClosable closed!");
    }
}
```

doIt() 是方法不是 AutoClosable 接口中的一部分, 之所以实现这个方法是因为我们想要这个类除了关闭方法外还能做点其他事. 

下面是 MyAutoClosable 在 try-with-resources 结构中使用的例子: 

```java
private static void myAutoClosable() throws Exception {

    try(MyAutoClosable myAutoClosable = new MyAutoClosable()){
        myAutoClosable.doIt();
    }
}
```
当方法 myAutoClosable.doIt() 被调用时, 下面是打印到 System.out 的输出: 

```java
MyAutoClosable doing it!
MyAutoClosable closed!
```

通过上面这些你可以看到, 不论 try-catch 中使用的资源是自己创造的还是 java 内置的类型, try-with-resources 都是一个能够确保资源能被正确地关闭的强大方法. 





