# 算法

→ 排序算法
稳定的排序:冒泡排序、插入排序、鸡尾酒排序、桶排序、计数排序、归并排序、原地归并排序、二叉排序树排序、鸽巢排序、基数排序、侏儒排序、图书馆排序、块排序

不稳定的排序:选择排序、希尔排序、Clover 排序算法、梳排序、堆排序、平滑排序、快速排序、内省排序、耐心排序

各种排序算法和时间复杂度 

→ 两个栈实现队列, 和两个队列实现栈
→ 深度优先和广度优先搜索
→ 全排列、贪心算法、KMP 算法、hash 算法
→ 海量数据处理
分治, hash 映射, 堆排序, 双层桶划分, Bloom Filter, bitmap, 数据库索引, mapreduce 等.

## 递归VS迭代

::: tip 问题
有 n 步台阶, 一次只能上 1 步或 2 步, 共有多少种走法
::: 

1. 找到走完前n步台阶和前n-1步台阶之间的关系
    为了走完n步台阶，只有两种方法：从n-1步台阶爬1步走到或从n-2步台阶处爬2步走到。如果f(n)是爬到第n步台阶的方法数，那么f(n) = f(n-1) + f(n-2)
2. 确保开始条件是正确的
    
```java
f(0) = 0;
f(1) = 1;
```

```java
public static int f(int n){
    if(n <= 2) return n;
    int x = f(n-1) + f(n-2);
    return x;
}
```

递归方法的时间复杂度是n的指数级，因为有很多冗余的计算

```java
f(5)
f(4) + f(3)
f(3) + f(2) + f(2) + f(1)
f(2) + f(1) + f(1) + f(0) + f(1) + f(0) + f(1)
f(1) + f(0) + f(1) + f(1) + f(0) + f(1) + f(0) + f(1)
```

直接的想法是将递归转换为迭代：

```java
public static int f(int n) {

    if (n <= 2){
        return n;
    }

    int first = 1, second = 2;
    int third = 0;

    for (int i = 3; i <= n; i++) {
        third = first + second;
        first = second;
        second = third;
    }

    return third;
}
```



## 动态规划

动态规划是解决下面这些性质类问题的技术：

1. 一个问题可以通过更小子问题的解决方法来解决（译者注：即问题的最优解包含了其子问题的最优解，也就是最优子结构性质）。
2. 有些子问题的解可能需要计算多次（译者注：也就是子问题重叠性质）。
3. 子问题的解存储在一张表格里，这样每个子问题只用计算一次。
4. 需要额外的空间以节省时间。

解决爬楼梯问题

```java
public static int[] A = new int[100];

public static int f3(int n) {
    if (n <= 2)
        A[n]= n;

    if(A[n] > 0)
        return A[n];
    else
        A[n] = f3(n-1) + f3(n-2);//store results so only calculate once!
    return A[n];
}
```