---
sidebar: auto
---

# 面向对象之访问修饰符

## public
>谁都可以操作

- 当在方法或属性前面显显式的给定public限定符的时候,其具有该权限控制.
- public权限是最为宽松的一种权限控制,对包的内,外部都是完全可见的.
- java最多只允许一个java文件中出现一个public类.(该类向外间提供接口,并与该java文件的名称完全一致)
- 当一个java文件中无一个public类时,表明其仅供包访问,对外界不可见.
- **注意:**类只有包访问权限和public访问权限.

## 默认访问修饰符 (friendly) 

>同一个包内可以操作

- 当方法或属性未给定访问修饰符时,其默认具有该权限.
- 具有该权限的方法和成员,其包内是完全可见的,而包外不可见.

```java
//Animal.java和Test.java在同一包下;
//Animal.java
public class Animal{
	void eat(){
		System.out.println("Animal吃东西的方法");
	}
}
//Test.java
public class Test{
	public static void main(String[] args){
		Animal a = new Animal();
		a.eat();
	}
}
```
由于Animal类和Test类都被打包在同一个package下,Animal类中的eat()方法为默认访问权限,故对Test可见.
对java文件中的类也是如此,如果未指定访问权限,其默认为包访问权限,只能在包内被访问.
包外是无法利用其实例化对象的.

**注意:**当决定一个类对包外可见的时候,
除了要将类的访问修饰符改为public外,自定义的构造方法限定符也必须改为public,不然将导致外部不可见.

## protected
>同包或者导出类可以操作

- protected权限是一种严格程度介于public和private之间的访问修饰符.
- 具有protected权限的或方法只能对自身和导出类可见.

## private
>除了自己,谁都不能操作

- private是访问修饰符中最为严格的一种权限.
- 当方法或属性为private权限的时候,表明其只针对该类的内部可见,类的外部(包括同包内的其他类)都是不可以见的.

```java
//Animal.java和Test.java在同一包下;
//Animal.java
public class Animal{
	private void eat(){
	System.out.println("Animal吃东西的方法");
	}
}

//Test.java
public class Test{
	public static void main(String[] args){
		Animal a = new Animal();
		a.eat();//将造成编译错误,eat()方法为private,仅对Animal类内部可见,现在在Test类内部,所以不可见.
	}
}
```
##总结
- 在面向对象的设计当中,最常见的为public和private权限修饰符.
- 一般情况下将定义为private,将方法定义为public.外界使用该类时,通过public方法是用其接口,而具体的成员则对外屏蔽,只能通过类提供的节后间接访问.
```java
public class Dog{
	private int age ;
	public void setAge(int num){
		age = num + 1 ;
	}
}
```

|作用域     |     当前类 |   同包   |   子类   |   其他包   |
| :--------: | :--------:| :------: | :------: | :------: |
| public    |   √ |  √  |√  |√  |
| protected    |   √ |  √  |√  |×  |
| 默认    |   √ |  √  |×  |×  |
| private    |   √ |  ×  |×  |×  |


此处,age对外部不可见,要想对其进行操作,必须使用Dog类提供的接口setAge(int num).
这就是封装的概念.

