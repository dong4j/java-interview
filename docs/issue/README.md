# 运到的问题

线上问题分析


→ dump 获取

线程 Dump、内存 Dump、gc 情况

→ dump 分析
分析死锁、分析内存泄露

→ dump 分析及获取工具
jstack、jstat、jmap、jhat、Arthas

→ 自己编写各种 outofmemory，stackoverflow 程序
HeapOutOfMemory、 Young OutOfMemory、

MethodArea OutOfMemory、ConstantPool OutOfMemory、

DirectMemory OutOfMemory、Stack OutOfMemory Stack OverFlow

→ Arthas
jvm 相关、class/classloader 相关、monitor/watch/trace 相关、

options、管道、后台异步任务

文档：https://alibaba.github.io/arthas/advanced-use.html

→ 常见问题解决思路
内存溢出、线程死锁、类加载冲突

→ 使用工具尝试解决以下问题，并写下总结
当一个 Java 程序响应很慢时如何查找问题

当一个 Java 程序频繁 FullGC 时如何解决问题

如何查看垃圾回收日志

当一个 Java 应用发生 OutOfMemory 时该如何解决

如何判断是否出现死锁

如何判断是否存在内存泄露

使用 Arthas 快速排查 Spring Boot 应用404/401问题

使用 Arthas 排查线上应用日志打满问题

利用 Arthas 排查 Spring Boot 应用 NoSuchMethodError



