# 单例模式

实现单例模式的几种方式

1. 懒汉模式
2. 饿汉模式
3. 同步锁
4. 双锁机制
5. 枚举实现
6. 静态内部类实现

因为加载外部类时,是不会加载内部类的

```java
//一个延迟实例化的内部类的单例模式
public final class Singleton {
    //一个内部类的容器, 调用getInstance时, JVM加载这个类
    private static final class SingletonHolder {
        static final Singleton singleton =  new Singleton();
    }
    private Singleton() {}
    public static Singleton getInstance() {
        return SingletonHolder.singleton;
    }
 }
```

**防止反射实例化对象**
利用反射生成对象

```java
//使用反射破坏单例模式
Class c = Class.forName(Singleton.class.getName());  
Constructor constructor = c.getDeclaredConstructor();  
constructor.setAccessible(true);  
Singleton singleton = (Singleton)ct.newInstance(); 
```

调用私有构造方法抛出异常
**防止反序列化实例化对象**

```java
import java.io.Serializable;
/**
 * Created by hollis on 16/2/5.
 * 使用双重校验锁方式实现单例
 */
public class Singleton implements Serializable{
    private volatile static Singleton singleton;
    private Singleton (){}
    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

```java
public class SerializableDemo1 {
    //为了便于理解, 忽略关闭流操作及删除文件操作.真正编码时千万不要忘记
    //Exception直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("tempFile"));
        oos.writeObject(Singleton.getSingleton());
        //Read Obj from file
        File file = new File("tempFile");
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        Singleton newInstance = (Singleton) ois.readObject();
        //判断是否是同一个对象
        System.out.println(newInstance == Singleton.getSingleton());
    }
}
```

防止序列化反序列化破坏单例的方法:
添加 readResolve 方法

```java
private Object readResolve() {
        return singleton;
    }
```

利用枚举创建单例

```java
/**
* Singleton pattern example using Java Enumj
*/
public enum EasySingleton{
    INSTANCE;
}
```

**使用反射破解枚举单例:**
运行结果是抛出异常:Exception in thread "main" java.lang.NoSuchMethodException: cn.xing.test.Weekday.<init>()
明明Weekday有一个无参的构造函数, 为何不能通过暴力反射访问?
最新的Java Language Specification (§8.9)规定:  Reflective instantiation of enum types is prohibited. 这是java语言的内置规范.

**使用 clone 破解枚举单例**
所有的枚举类都继承自java.lang.Enum类, 而不是Object类. 在java.lang.Enum类中clone方法如下:

```java
protected final Object clone() throws CloneNotSupportedException {  
    throw new CloneNotSupportedException();  
}  
```
调用该方法将抛出异常, 且final意味着子类不能重写clone方法, 所以通过clone方法获取新的对象是不可取的.

**使用序列化破解枚举单例**
java.lang.Enum类的readObject方法如下:

```java
private void readObject(ObjectInputStream in) throws IOException,  
        ClassNotFoundException {  
            throw new InvalidObjectException("can't deserialize enum");  
}  
private void readObjectNoData() throws ObjectStreamException {  
        throw new InvalidObjectException("can't deserialize enum");  
} 
```
同暴力反射一样, Java Language Specification (§8.9)有着这样的规定: the special treatment by the serialization mechanism ensures that duplicate instances are never created as a result of deserialization.