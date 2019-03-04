# 深入理解类加载


类加载器:同一个类只会被加载一次（一个类用其全限定名+加载器作为唯一标识）

## Bootstrap ClassLoader:根类加载器，JVM自身实现的，负责加载核心类

## Extendsion ClassLoader:扩展类加载器，加载自定义的类库，放在lib.ext下

## System ClassLoader:系统类加载器  加载classpath路径下的类
        
用户自定义类加载器(继承ClassLoader类)


## 类加载机制

1. 全盘负责
2. 父类委托
3. 缓存机制
