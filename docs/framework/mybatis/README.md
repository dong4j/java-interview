# Mybatis 

125.mybatis 中 #{}和 ${}的区别是什么？

126.mybatis 有几种分页方式？

127.RowBounds 是一次性查询全部结果吗？为什么？

128.mybatis 逻辑分页和物理分页的区别是什么？

129.mybatis 是否支持延迟加载？延迟加载的原理是什么？

130.说一下 mybatis 的一级缓存和二级缓存？

131.mybatis 和 hibernate 的区别有哪些？

132.mybatis 有哪些执行器（Executor）？

133.mybatis 分页插件的实现原理是什么？

134.mybatis 如何编写一个自定义插件？

## `#{}和${}`的区别是什么？

> `#{}和${}的区别是什么？`

在Mybatis中，有两种占位符

* `#{}`解析传递进来的参数数据
* ${}对传递进来的参数**原样**拼接在SQL中
* **`#{}`是预编译处理，${}是字符串替换**。
* 使用#{}可以有效的防止SQL注入，提高系统安全性。

## 当实体类中的属性名和表中的字段名不一样 ，怎么办 ？

> 当实体类中的属性名和表中的字段名不一样 ，怎么办 ？

第1种： 通过在查询的sql语句中**定义字段名的别名，让字段名的别名和实体类的属性名一致**

```

 	<select id=”selectorder” parametertype=”int” resultetype=”me.gacl.domain.order”> 
       select order_id id, order_no orderno ,order_price price form orders where order_id=#{id}; 
    </select> 

复制代码
```

第2种： **通过来映射字段名和实体类属性名的一一对应的关系**

```
 <select id="getOrder" parameterType="int" resultMap="orderresultmap">
        select * from orders where order_id=#{id}
    </select>
   <resultMap type=”me.gacl.domain.order” id=”orderresultmap”> 
        <!–用id属性来映射主键字段–> 
        <id property=”id” column=”order_id”> 
        <!–用result属性来映射非主键字段，property为实体类属性名，column为数据表中的属性–> 
        <result property = “orderno” column =”order_no”/> 
        <result property=”price” column=”order_price” /> 
    </reslutMap>
复制代码
```

我认为第二种方式会好一点。

## 如何获取自动生成的(主)键值?

> 如何获取自动生成的(主)键值?

如果我们一般插入数据的话，**如果我们想要知道刚刚插入的数据的主键是多少，我们可以通过以下的方式来获取**

需求：

* user对象插入到数据库后，新记录的主键要通过user对象返回，通过user获取主键值。

解决思路：

* 通过LAST_INSERT_ID()获取刚插入记录的自增主键值，**在insert语句执行后，执行select LAST_INSERT_ID()就可以获取自增主键。**

mysql:

```
	<insert id="insertUser" parameterType="cn.itcast.mybatis.po.User">
		<selectKey keyProperty="id" order="AFTER" resultType="int">
			select LAST_INSERT_ID()
		</selectKey>
		INSERT INTO USER(username,birthday,sex,address) VALUES(#{username},#{birthday},#{sex},#{address})
	</insert>
复制代码
```

oracle:

实现思路：

* **先查询序列得到主键，将主键设置到user对象中，将user对象插入数据库。**

```

	<!-- oracle
	在执行insert之前执行select 序列.nextval() from dual取出序列最大值，将值设置到user对象 的id属性
	 -->
	<insert id="insertUser" parameterType="cn.itcast.mybatis.po.User">
		<selectKey keyProperty="id" order="BEFORE" resultType="int">
			select 序列.nextval() from dual
		</selectKey>

		INSERT INTO USER(id,username,birthday,sex,address) VALUES( 序列.nextval(),#{username},#{birthday},#{sex},#{address})
	</insert> 
复制代码
```

## 在mapper中如何传递多个参数?

> 在mapper中如何传递多个参数?

**第一种：使用占位符的思想**

* **在映射文件中使用#{0},#{1}代表传递进来的第几个参数**

* **使用@param注解:来命名参数 **

* #{0},#{1}方式

```

//对应的xml,#{0}代表接收的是dao层中的第一个参数，#{1}代表dao层中第二参数，更多参数一致往后加即可。

<select id="selectUser"resultMap="BaseResultMap">  
    select *  fromuser_user_t   whereuser_name = #{0} anduser_area=#{1}  
</select>  
复制代码
```

* @param注解方式

```

		public interface usermapper { 
         user selectuser(@param(“username”) string username, 
         @param(“hashedpassword”) string hashedpassword); 
        }
复制代码
```

```
 <select id=”selectuser” resulttype=”user”> 
         select id, username, hashedpassword 
         from some_table 
         where username = #{username} 
         and hashedpassword = #{hashedpassword} 
    </select>

复制代码
```

**第二种：使用Map集合作为参数来装载**

```

 	try{
            //映射文件的命名空间.SQL片段的ID，就可以调用对应的映射文件中的SQL

            /**
             * 由于我们的参数超过了两个，而方法中只有一个Object参数收集
             * 因此我们使用Map集合来装载我们的参数
             */
            Map<String, Object> map = new HashMap();
            map.put("start", start);
            map.put("end", end);
            return sqlSession.selectList("StudentID.pagination", map);
        }catch(Exception e){
            e.printStackTrace();
            sqlSession.rollback();
            throw e;
        }finally{
            MybatisUtil.closeSqlSession();
        }
复制代码
```

```

	<!--分页查询-->
	<select id="pagination" parameterType="map" resultMap="studentMap">

		/*根据key自动找到对应Map集合的value*/
		select * from students limit #{start},#{end};

	</select>

复制代码
```

## Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？

> Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？

* Mybatis动态sql可以让我们在Xml映射文件内，**以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能**。
* Mybatis提供了9种动态sql标签：trim|where|set|foreach|if|choose|when|otherwise|bind。
* 其执行原理为，使用OGNL从sql参数对象中计算表达式的值，**根据表达式的值动态拼接sql，以此来完成动态sql的功能**。

详情Demo可参考我别的文章：

* [zhongfucheng.bitcron.com/post/mybati…](https://link.juejin.im/?target=https%3A%2F%2Fzhongfucheng.bitcron.com%2Fpost%2Fmybatis%2Fmybatisru-men-kan-zhe-yi-pian-jiu-gou-liao)

## Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？

> Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？

**如果配置了namespace那么当然是可以重复的，因为我们的Statement实际上就是namespace+id**

如果没有配置namespace的话，那么相同的id就会导致覆盖了。

## 为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？

> 为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？

* Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。
* 而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。

## 通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

> 通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

* Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。
* Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement

举例：

```
com.mybatis3.mappers.StudentDao.findStudentById，

```

可以唯一找到namespace为com.mybatis3.mappers.StudentDao下面id = findStudentById的MappedStatement。在Mybatis中，每一个 `<select>`、`<insert>`、`<update>`、`<delete>` 标签，都会被解析为一个MappedStatement对象。


Dao接口里的方法，**是不能重载的，因为是全限名+方法名的保存和寻找策略**。

**Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。**

详情可参考：

* [www.cnblogs.com/soundcode/p…](https://link.juejin.im/?target=https%3A%2F%2Fwww.cnblogs.com%2Fsoundcode%2Fp%2F6497291.html)

## Mybatis比IBatis比较大的几个改进是什么

> Mybatis比IBatis比较大的几个改进是什么

* a.**有接口绑定,包括注解绑定sql和xml绑定Sql** ,
* b.动态sql由原来的节点配置变成OGNL表达式,
* c. 在一对一,一对多的时候引进了association,在一对多的时候引入了collection节点,不过都是在resultMap里面配置

## 接口绑定有几种实现方式,分别是怎么实现的?

> 接口绑定有几种实现方式,分别是怎么实现的?

接口绑定有两种实现方式：

* 一种是通过注解绑定,就是在接口的方法上面加上@Select@Update等注解里面包含Sql语句来绑定
* 另外一种就是通过xml里面写SQL来绑定,在这种情况下,要指定xml映射文件里面的namespace必须为接口的全路径名.

## Mybatis是如何进行分页的？分页插件的原理是什么？

> Mybatis是如何进行分页的？分页插件的原理是什么？

Mybatis使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

**分页插件的基本原理是使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。**

举例：`select * from student，拦截sql后重写为：select t.* from （select * from student）t limit 0，10`

分页插件使用参考资料：

* [www.cnblogs.com/kangoroo/p/…](https://link.juejin.im/?target=https%3A%2F%2Fwww.cnblogs.com%2Fkangoroo%2Fp%2F7998433.html)
* [blog.csdn.net/yuchao2015/…](https://link.juejin.im/?target=http%3A%2F%2Fblog.csdn.net%2Fyuchao2015%2Farticle%2Fdetails%2F55001182)
* [www.cnblogs.com/ljdblog/p/6…](https://link.juejin.im/?target=https%3A%2F%2Fwww.cnblogs.com%2Fljdblog%2Fp%2F6725094.html)

## 简述Mybatis的插件运行原理，以及如何编写一个插件

> 简述Mybatis的插件运行原理，以及如何编写一个插件

Mybatis仅可以**编写针对ParameterHandler、ResultSetHandler、StatementHandler、Executor这4种接口的插件，Mybatis使用JDK的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能**，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是InvocationHandler的invoke()方法，当然，只会拦截那些你指定需要拦截的方法。

实现Mybatis的Interceptor接口并复写intercept()方法，**然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。**

## Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

> Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

Mybatis仅支持association关联对象和collection关联集合对象的延迟加载，association指的就是一对一，collection指的就是一对多查询。在Mybatis配置文件中，**可以配置是否启用延迟加载lazyLoadingEnabled=true|false。**

它的原理是，**使用CGLIB创建目标对象的代理对象**，当调用目标方法时，**进入拦截器方法**，比如调用a.getB().getName()，拦截器invoke()方法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调用a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()方法的调用。这就是延迟加载的基本原理。

当然了，不光是Mybatis，几乎所有的包括Hibernate，支持延迟加载的原理都是一样的。

## Mybatis都有哪些Executor执行器？它们之间的区别是什么？

> Mybatis都有哪些Executor执行器？它们之间的区别是什么？

Mybatis有三种基本的Executor执行器，**SimpleExecutor、ReuseExecutor、BatchExecutor**。

* SimpleExecutor：每执行一次update或select，就开启一个Statement对象，**用完立刻关闭Statement对象**。
* ReuseExecutor：执行update或select，以sql作为key查找Statement对象，存在就使用，不存在就创建，用完后，不关闭Statement对象，而是放置于Map内，供下一次使用。简言之，**就是重复使用Statement对象**。
* BatchExecutor：执行update（没有select，JDBC批处理不支持select），将所有sql都添加到批处理中（addBatch()），等待统一执行（executeBatch()），**它缓存了多个Statement对象，每个Statement对象都是addBatch()完毕后，等待逐一执行executeBatch()批处理。与JDBC批处理相同**。

作用范围：Executor的这些特点，都严格限制在SqlSession生命周期范围内。

## MyBatis与Hibernate有哪些不同？

> MyBatis与Hibernate有哪些不同？

Mybatis和hibernate不同，它不完全是一个ORM框架，因为MyBatis需要程序员自己编写Sql语句，不过mybatis可以通过XML或注解方式灵活配置要运行的sql语句，并将java对象和sql语句映射生成最终执行的sql，最后将sql执行的结果再映射生成java对象。

Mybatis学习门槛低，简单易学，程序员直接编写原生态sql，可严格控制sql执行性能，灵活度高，非常适合对关系数据模型要求不高的软件开发，例如互联网软件、企业运营类软件等，因为这类软件需求变化频繁，一但需求变化要求成果输出迅速。但是灵活的前提是mybatis无法做到数据库无关性，如果需要实现支持多种数据库的软件则需要自定义多套sql映射文件，工作量大。

Hibernate对象/关系映射能力强，数据库无关性好，对于关系模型要求高的软件（例如需求固定的定制化软件）如果用hibernate开发可以节省很多代码，提高效率。但是Hibernate的缺点是学习门槛高，要精通门槛更高，而且怎么设计O/R映射，在性能和对象模型之间如何权衡，以及怎样用好Hibernate需要具有很强的经验和能力才行。 总之，按照用户的需求在有限的资源环境下只要能做出维护性、扩展性良好的软件架构都是好架构，所以框架只有适合才是最好。

## 1、什么是mybatis？

1. mybatis是一个优秀的基于java的持久层框架，它内部封装了jdbc，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。
2. mybatis通过xml或注解的方式将要执行的各种statement配置起来，并通过java对象和statement中sql的动态参数进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射为java对象并返回。
3. MyBatis 支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJO映射成数据库中的记录。

## 2、Mybait的优点：

1. 简单易学，容易上手（相比于Hibernate） —- 基于SQL编程；
2. JDBC相比，减少了50%以上的代码量，消除了JDBC大量冗余的代码，不需要手动开关连接；
3. 很好的与各种数据库兼容（因为MyBatis使用JDBC来连接数据库，所以只要JDBC支持的数据库MyBatis都支持，而JDBC提供了可扩展性，所以只要这个数据库有针对Java的jar包就可以就可以与MyBatis兼容），开发人员不需要考虑数据库的差异性。
4. 提供了很多第三方插件（分页插件 / 逆向工程）；
5. 能够与Spring很好的集成；
6. MyBatis相当灵活，不会对应用程序或者数据库的现有设计强加任何影响，SQL写在XML里，从程序代码中彻底分离，解除sql与程序代码的耦合，便于统一管理和优化，并可重用。
7. 提供XML标签，支持编写动态SQL语句。
8. 提供映射标签，支持对象与数据库的ORM字段关系映射。
9. 提供对象关系映射标签，支持对象关系组建维护。

## 3、MyBatis框架的缺点：

1. SQL语句的编写工作量较大，尤其是字段多、关联表多时，更是如此，对开发人员编写SQL语句的功底有一定要求。
2. SQL语句依赖于数据库，导致数据库移植性差，不能随意更换数据库。

## 4、MyBatis框架适用场合：

1. MyBatis专注于SQL本身，是一个足够灵活的DAO层解决方案。
2. 对性能的要求很高，或者需求变化较多的项目，如互联网项目，MyBatis将是不错的选择。


## 5、MyBatis与Hibernate有哪些不同？

1. Mybatis和hibernate不同，它不完全是一个ORM框架，因为MyBatis需要程序员自己编写Sql语句，不过mybatis可以通过XML或注解方式灵活配置要运行的sql语句，并将java对象和sql语句映射生成最终执行的sql，最后将sql执行的结果再映射生成java对象。
2. Mybatis学习门槛低，简单易学，程序员直接编写原生态sql，可严格控制sql执行性能，灵活度高，非常适合对关系数据模型要求不高的软件开发，例如互联网软件、企业运营类软件等，因为这类软件需求变化频繁，一但需求变化要求成果输出迅速。但是灵活的前提是mybatis无法做到数据库无关性，如果需要实现支持多种数据库的软件则需要自定义多套sql映射文件，工作量大。
3. Hibernate对象/关系映射能力强，数据库无关性好，对于关系模型要求高的软件（例如需求固定的定制化软件）如果用hibernate开发可以节省很多代码，提高效率。但是Hibernate的缺点是学习门槛高，要精通门槛更高，而且怎么设计O/R映射，在性能和对象模型之间如何权衡，以及怎样用好Hibernate需要具有很强的经验和能力才行。

## 6、#{}和${}的区别是什么？
`#{}`是预编译处理，`${}`是字符串替换。

Mybatis在处理#{}时，会将sql中的#{}替换为?号，调用PreparedStatement的set方法来赋值；
Mybatis在处理时，就是把 {}时，就是把时，就是把{}替换成变量的值。
使用#{}可以有效的防止SQL注入，提高系统安全性。

## 7、当实体类中的属性名和表中的字段名不一样 ，怎么办 ？

- 通过在查询的sql语句中定义字段名的别名，让字段名的别名和实体类的属性名一致。
- 通过来映射字段名和实体类属性名的一一对应的关系

## 8、 模糊查询like语句该怎么写?

在Java代码中添加sql通配符。

```sql
String wildcardname = “%smi%”;
list<name> names = mapper.selectlike(wildcardname);

<select id=”selectlike”>
    select * from foo where bar like #{value}
</select>
```

在sql语句中拼接通配符，会引起sql注入 所以尽量不要这么使用

```sql
String wildcardname = “smi”;
list<name> names = mapper.selectlike(wildcardname);

<select id=”selectlike”>
     select * from foo where bar like "%"#{value}"%"
</select>
```

## 9、通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？
Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement，

举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到namespace为com.mybatis3.mappers.StudentDao下面id = findStudentById的MappedStatement。在Mybatis中，每一个 `<select>`、`<insert>`、`<update>`、`<delete>`标签，都会被解析为一个MappedStatement对象。

Dao接口里的方法，是不能重载的，因为是全限名+方法名的保存和寻找策略。
Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。

## 10、Mybatis是如何进行分页的？分页插件的原理是什么？
Mybatis使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

分页插件的基本原理是使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。

## 11、Mybatis是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式？
第一种是使用标签，逐一定义列名和对象属性名之间的映射关系。第二种是使用sql列的别名功能，将列别名书写为对象属性名，比如T_NAME AS NAME，对象属性名一般是name，小写，但是列名不区分大小写，Mybatis会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成T_NAME AS NaMe，Mybatis一样可以正常工作。

有了列名与属性名的映射关系后，Mybatis通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

## 12、如何执行批量插入?
方法一：for循环调用insert方法 这是最普通的方法，可以应付大多少情况，比如量不是很大的情况 缺点是没有事务管理，且消耗链接 性能低
方法二：采用MySQL类似语法，insert多条，然后xml里面用foreach标签循环。有点是效率不错，在一个sesson内完成。缺点是sql变得复杂些了
方案三：采用批处理器处理 (最好的方式)，处理特殊情况、两大的情况，建议这么处理

```sql
// 注意这里 executortype.batch   获取到了批处理器
Sqlsession sqlsession = sqlsessionfactory.openSession(Executortype.batch);

try {

namemapper mapper = sqlsession.getmapper(namemapper.class);

for (string name : names) {

mapper.insertname(name);

}

sqlsession.commit(); //提交批处理事务

}catch(Exception e){

e.printStackTrace();

sqlSession.rollback(); //回滚

throw e;

 } finally {
    sqlsession.close(); //关闭sesson
}
```

## 13、如何获取自动生成的(主)键值?
insert 方法总是返回一个int值 - 这个值代表的是插入的行数。
而自动生成的键值在 insert 方法执行完后可以被设置到传入的参数对象中。

```sql
<insert id=”insertname” usegeneratedkeys=”true” keyproperty=”id”>
insert into names (name) values (#{name})
</insert>
```

## 14、在mapper中如何传递多个参数?
第一种：xml里取值按照顺序取 比如#{0} #{1} 极力不推荐
第二种：多个参数封装成map 这个还行，但是也不太推荐
第三种：使用@param注解 推荐使用
第四种：使用对象传值 推荐使用

## 15、Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？
Mybatis动态sql可以让我们在Xml映射文件内，以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能。
Mybatis提供了9种动态sql标签trim|where|set|foreach|if|choose|when|otherwise|bind。

其执行原理为，使用OGNL从sql参数对象中计算表达式的值，根据表达式的值动态拼接sql，以此来完成动态sql的功能。

## 16、Xml映射文件中，除了常见的select|insert|updae|delete标签之外，还有哪些标签？
还有很多其他的标签，resultMap>、parameterMap>、sql>、include>、selectKey>，加上动态sql的9个标签，trim|where|set|foreach|if|choose|when|otherwise|bind等，其中为sql片段标签，通过标签引入sql片段，为不支持自增的主键生成策略标签。

## 17、Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？
不同的Xml映射文件，如果配置了namespace，那么id可以重复；如果没有配置namespace，那么id不能重复；毕竟namespace不是必须的，只是最佳实践而已。

原因就是namespace+id是作为Map<String, MappedStatement>的key使用的，如果没有namespace，就剩下id，那么，id重复会导致数据互相覆盖。有了namespace，自然id就可以重复，namespace不同，namespace+id自然也就不同。

## 18、为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？
Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。

## 19、 一对一、一对多的关联查询 ？
这个略，因为在互联网环境，不建议使用association / 等标签

## 20、MyBatis实现一对一有几种方式?具体怎么操作的？
有联合查询和嵌套查询,联合查询是几个表联合查询,只查询一次, 通过在resultMap里面配置association节点配置一对一的类就可以完成; 嵌套查询是先查一个表,根据这个表里面 的结果的外键id,去再另外一个表里面查询数据,也是通过association配置,但另外一个表的查询通过select属性配置。

## 21、MyBatis实现一对多有几种方式,怎么操作的？
基本同上

## 22、简述Mybatis的插件运行原理，以及如何编写一个插件。
Mybatis仅可以编写针对ParameterHandler、ResultSetHandler、StatementHandler、Executor这4种接口的插件，Mybatis使用JDK的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是InvocationHandler的invoke()方法，当然，只会拦截那些你指定需要拦截的方法。

编写插件：实现Mybatis的Interceptor接口并复写intercept()方法，然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。

## 23、Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？
Mybatis仅支持association关联对象和collection关联集合对象的延迟加载，association指的就是一对一，collection指的就是一对多查询。在Mybatis配置文件中，可以配置是否启用延迟加载lazyLoadingEnabled=true|false。

它的原理是，使用CGLIB创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用a.getB().getName()，拦截器invoke()方法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调用a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()方法的调用。这就是延迟加载的基本原理。

当然了，不光是Mybatis，几乎所有的包括Hibernate，支持延迟加载的原理都是一样的。

## 24、Mybatis的一级、二级缓存:
1）一级缓存: 基于 PerpetualCache 的 HashMap 本地缓存，其存储作用域为 Session，当 Session flush 或 close 之后，该 Session 中的所有 Cache 就将清空，默认打开一级缓存。

2）二级缓存与一级缓存其机制相同，默认也是采用 PerpetualCache，HashMap 存储，不同在于其存储作用域为 Mapper(Namespace)，并且可自定义存储源，如 Ehcache。默认不打开二级缓存，要开启二级缓存，使用二级缓存属性类需要实现Serializable序列化接口(可用来保存对象的状态),可在它的映射文件中配置cache/> ；

3）对于缓存数据更新机制，当某一个作用域(一级缓存 Session/二级缓存Namespaces)的进行了C/U/D 操作后，默认该作用域下所有 select 中的缓存将被 clear。

## 25、什么是MyBatis的接口绑定,有什么好处？
接口映射就是在MyBatis中任意定义接口,然后把接口里面的方法和SQL语句绑定, 我们直接调用接口方法就可以,这样比起原来了SqlSession提供的方法我们可以有更加灵活的选择和设置。

## 26、接口绑定有几种实现方式,分别是怎么实现的?
接口绑定有两种实现方式,一种是通过注解绑定,就是在接口的方法上面加上 @Select、@Update等注解，里面包含Sql语句来绑定；另外一种就是通过xml里面写SQL来绑定, 在这种情况下,要指定xml映射文件里面的namespace必须为接口的全路径名

## 27、什么情况下用注解绑定,什么情况下用xml绑定 ？
当Sql语句比较简单时候,用注解绑定, 当SQL语句比较复杂时候,用xml绑定,一般用xml绑定的比较多。

## 28、使用MyBatis的mapper接口调用时有哪些要求？
① Mapper接口方法名和mapper.xml中定义的每个sql的id相同
② Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同
③ Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同
④ Mapper.xml文件中的namespace即是mapper接口的类路径。

## 29、Mapper接口编写有哪几种方式？
第一种：编程式 接口实现类继承SqlSessionDaoSupport：
第二种：编程式 使用org.mybatis.spring.mapper.MapperFactoryBean：
第三种：使用mapper扫描器（最常用）

## 30、Mybatis比IBatis比较大的几个改进是什么？
（1）有接口绑定,包括注解绑定sql和xml绑定Sql ,

（2）动态sql由原来的节点配置变成OGNL表达式,

（3）在一对一,一对多的时候引进了association,在一对多的时候引入了collection 节点,不过都是在resultMap里面配置。

## 31、IBatis和MyBatis在核心处理类分别叫什么？
IBatis里面的核心处理类交SqlMapClient, MyBatis里面的核心处理类叫做SqlSession

## 32、IBatis和MyBatis在细节上的不同有哪些？
（1）在sql里面变量命名有原来的#变量# 变成了#{变量} 原来的变量 变量变量变成了${变量},；
（2）原来在sql节点里面的class都换名字交type；
（3）原来的queryForObject、queryForList 变成了selectOne、selectList；
（4）原来的别名设置在映射文件里面放在了核心配置文件；

## 33、MyBatis接口没有实现类，为什么可以直接使用呢？
精髓所在就在于MyBatis使用了JDK的动态代理，并且没有使用目标对象。所以不需要实现类，也能达到效果。

```java
@Override
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    System.out.println("=========================");
    System.out.println("方法名:" + method.getName());
    //针对不同的方法进行不同的操作
    return null;
}
```

这里针对invoke方法简单说说MyBatis的实现原理，在该方法中，我们通过Method能够获取接口和方法名，接口的全名相当于MyBatis XML中的namespace，方法名相当于具体一个方法中的id。也就是说通过动态代理后，可以通过SqlSession来通过namespace.id方式来调用相应的方法。






# 简介：

MyBatis是一个优秀的持久层ORM框架，它对jdbc的操作数据库的过程进行封装，使开发者只需要关注SQL 本身，而不需要花费精力去处理例如注册驱动、创建connection、创建statement、手动设置参数、结果集检索等jdbc繁杂的过程代码。

Mybatis通过xml或注解的方式将要执行的statement配置起来，并通过java对象和statement中的sql进行**映射**生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射成java对象并返回。

# Mybatis要解决的问题：

**1\. 将sql语句硬编码到java代码中，如果修改sql语句，需要修改java代码，重新编译。系统可维护性不高。**

设想如何解决？

能否将sql单独配置在配置文件中。

**2\. 数据库连接频繁开启和释放，对数据库的资源是一种浪费。**

设想如何解决？

使用数据库连接池管理数据库连接。

**3\. 向preparedStatement中占位符的位置设置参数时，存在硬编码（占位符的位置，设置的变量值）**

设想如何解决？

能否也通过配置的方式，配置设置的参数，自动进行设置参数

**4\. 解析结果集时存在硬编码（表的字段名、字段的类型）**

设想如何解决？

能否将查询结果集映射成java对象。





![](//upload-images.jianshu.io/upload_images/7378149-dff06e3ae5947d57?imageMogr2/auto-orient/strip%7CimageView2/2/w/746/format/webp)



image



# 问题一. #{}和${}的区别是什么？

#{}是预编译处理，${}是字符串替换。

Mybatis在处理#{}时，会将sql中的#{}替换为?号，调用PreparedStatement的set方法来赋值；

Mybatis在处理![{}时，就是把](media/15476442917269/math.){}替换成变量的值。

使用#{}可以有效的防止SQL注入，提高系统安全性。

# 问题二. 当实体类中的属性名和表中的字段名不一样 ，怎么办 ？

第1种： 通过在查询的sql语句中定义字段名的别名，让字段名的别名和实体类的属性名一致

```
    <select id=”selectorder” parametertype=”int” resultetype=”me.gacl.domain.order”> 
       select order_id id, order_no orderno ,order_price price form orders where order_id=#{id}; 
    </select> 

```

第2种： 通过来映射字段名和实体类属性名的一一对应的关系

```
<select id="getOrder" parameterType="int" resultMap="orderresultmap">
        select * from orders where order_id=#{id}
    </select>
<resultMap type=”me.gacl.domain.order” id=”orderresultmap”> 
        <!–用id属性来映射主键字段–> 
        <id property=”id” column=”order_id”> 
        <!–用result属性来映射非主键字段，property为实体类属性名，column为数据表中的属性–> 
        <result property = “orderno” column =”order_no”/> 
        <result property=”price” column=”order_price” /> 
</reslutMap>

```

# 问题三. 模糊查询like语句该怎么写?

```
    string wildcardname = “smi”; 
    list<name> names = mapper.selectlike(wildcardname);

    <select id=”selectlike”> 
        select * from foo where bar like "%"#{value}"%"
    </select>

```

1.表达式: name like"%"#{name}"%" #起到占位符的作用

2.表达式: name like '%${name}%' $进行字符串的拼接,直接把传入的值,拼接上去了,没有任何问题

1. 表达式: name likeconcat(concat('%',#{username}),'%') 这是使用了cancat进行字符串的连接,同时使用了#进行占位

2. 表达式:name like CONCAT('%','${name}','%') 对上面的表达式进行了简化,更方便了

# 问题四. 通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。

Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement，举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到namespace为com.mybatis3.mappers.StudentDao下面id = findStudentById的MappedStatement。在Mybatis中，每一个、、、标签，都会被解析为一个MappedStatement对象。

Dao接口里的方法，是不能重载的，因为是全限名+方法名的保存和寻找策略。

Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象（如使用spring会注入到容器中），代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。

# 问题五. Mybatis是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式？

答：第一种是使用标签，逐一定义列名和对象属性名之间的映射关系。

第二种是使用sql列的别名功能，将列别名书写为对象属性名，比如T_NAME AS NAME，对象属性名一般是name，小写，但是列名不区分大小写，Mybatis会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成T_NAME AS NaMe，Mybatis一样可以正常工作。

有了列名与属性名的映射关系后，Mybatis通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

# 问题六. 如何获取自动生成的(主)键值?

insert 方法总是返回一个int值 - 这个值代表的是插入的行数。
而自动生成的键值在 insert 方法执行完后可以被设置到传入的参数对象中。
示例：

```
<insert id="insertUserMessage" parameterType="com.xxx.xxx.model.UserMessage"
            useGeneratedKeys="true" keyProperty="userMessage.id">
        insert into my_news
        (orderid,commentid,type,title,content,createtime)
        values
        (#{userMessage.orderid},#{userMessage.commentid},#{userMessage.type},#{userMessage.title}
        ,#{userMessage.content},#{userMessage.createtime})
    </insert>

```

这里需要注意的是需要把实体类传进来。keyProperty为自增的id字段。调用insert后自动将自增id赋值进insert调用的实体类中

```
//新建对象
UserMessage userMessage = new UserMessage();
userMessage.setXxxxxx(xxxxxx); 
userMessageDao.insertUserMessage(userMessage);

//这时userMessage.getId()就可以获取到自增主键了
BigInteger id = userMessage.getId();

```

# 问题七. 在mapper中如何传递多个参数?

第1种：

```
//DAO层的函数
Public UserselectUser(String name,String area);  

```

```
//对应的xml,#{0}代表接收的是dao层中的第一个参数，#{1}代表dao层中第二参数，更多参数一致往后加即可。
<select id="selectUser"resultMap="BaseResultMap">  
    select *  fromuser_user_t   whereuser_name = #{0} anduser_area=#{1}  
</select>  

```

第2种： 使用 @param 注解:

```
import org.apache.ibatis.annotations.param; 
public interface usermapper { 
         user selectuser(@param(“username”) string username, 
         @param(“hashedpassword”) string hashedpassword); 
        }

```

然后,就可以在xml像下面这样使用(推荐封装为一个map,作为单个参数传递给mapper

```
<select id=”selectuser” resulttype=”user”> 
         select id, username, hashedpassword 
         from some_table 
         where username = #{username} 
         and hashedpassword = #{hashedpassword} 
    </select>

```

# 问题八. Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？

Mybatis动态sql可以让我们在Xml映射文件内，以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能。
Mybatis提供了9种动态sql标签：trim|where|set|foreach|if|choose|when|otherwise|bind。
其执行原理为，从sql参数对象中计算表达式的值，根据表达式的值动态拼接sql，以此来完成动态sql的功能。
比如：

```
<select id="findUserById" resultType="user">
           select * from user where 
           <if test="id != null">
               id=#{id}
           </if>
            and deleteFlag=0;
</select>
更多例子见：https://www.cnblogs.com/ysocean/p/7289529.html

```

# 问题九. Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？

不同的Xml映射文件，如果配置了namespace，那么id可以重复；如果没有配置namespace，那么id不能重复；毕竟namespace不是必须的，只是最佳实践而已。

原因就是namespace+id是作为Map的key使用的，如果没有namespace，就剩下id，那么，id重复会导致数据互相覆盖。有了namespace，自然id就可以重复，namespace不同，namespace+id自然也就不同。

# 问题十. 为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？

Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。

# 问题十一. 一对一、一对多的关联查询 ？

```
<mapper namespace="com.lcb.mapping.userMapper">  
    <!--association  一对一关联查询 -->  
    <select id="getClass" parameterType="int" resultMap="ClassesResultMap">  
        select * from class c,teacher t where c.teacher_id=t.t_id and c.c_id=#{id}  
    </select>  
    <resultMap type="com.lcb.user.Classes" id="ClassesResultMap">  
        <!-- 实体类的字段名和数据表的字段名映射 -->  
        <id property="id" column="c_id"/>  
        <result property="name" column="c_name"/>  
        <association property="teacher" javaType="com.lcb.user.Teacher">  
            <id property="id" column="t_id"/>  
            <result property="name" column="t_name"/>  
        </association>  
    </resultMap>  

    <!--collection  一对多关联查询 -->  
    <select id="getClass2" parameterType="int" resultMap="ClassesResultMap2">  
        select * from class c,teacher t,student s where c.teacher_id=t.t_id and c.c_id=s.class_id and c.c_id=#{id}  
    </select>  
    <resultMap type="com.lcb.user.Classes" id="ClassesResultMap2">  
        <id property="id" column="c_id"/>  
        <result property="name" column="c_name"/>  
        <association property="teacher" javaType="com.lcb.user.Teacher">  
            <id property="id" column="t_id"/>  
            <result property="name" column="t_name"/>  
        </association>  
        <collection property="student" ofType="com.lcb.user.Student">  
            <id property="id" column="s_id"/>  
            <result property="name" column="s_name"/>  
        </collection>  
    </resultMap>  

</mapper>  
```

#### 1、#{}和${}的区别是什么？

注：这道题是面试官面试我同事的。

答：${}是Properties文件中的变量占位符，它可以用于标签属性值和sql内部，属于静态文本替换，比如${driver}会被静态替换为com.mysql.jdbc.Driver。#{}是sql的参数占位符，Mybatis会将sql中的#{}替换为?号，在sql执行前会使用PreparedStatement的参数设置方法，按序给sql的?号占位符设置参数值，比如ps.setInt(0, parameterValue)，#{item.name}的取值方式为使用反射从参数对象中获取item对象的name属性值，相当于param.getItem().getName()。

#### 2、Xml映射文件中，除了常见的select|insert|updae|delete标签之外，还有哪些标签？

注：这道题是京东面试官面试我时问的。

答：还有很多其他的标签，、、、、，加上动态sql的9个标签，trim|where|set|foreach|if|choose|when|otherwise|bind等，其中为sql片段标签，通过标签引入sql片段，为不支持自增的主键生成策略标签。

#### 3、最佳实践中，通常一个Xml映射文件，都会写一个Dao接口与之对应，请问，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？

注：这道题也是京东面试官面试我时问的。

答：Dao接口，就是人们常说的Mapper接口，接口的全限名，就是映射文件中的namespace的值，接口的方法名，就是映射文件中MappedStatement的id值，接口方法内的参数，就是传递给sql的参数。Mapper接口是没有实现类的，当调用接口方法时，接口全限名+方法名拼接字符串作为key值，可唯一定位一个MappedStatement，举例：com.mybatis3.mappers.StudentDao.findStudentById，可以唯一找到namespace为com.mybatis3.mappers.StudentDao下面id = findStudentById的MappedStatement。在Mybatis中，每一个、、、标签，都会被解析为一个MappedStatement对象。

Dao接口里的方法，是不能重载的，因为是全限名+方法名的保存和寻找策略。

Dao接口的工作原理是JDK动态代理，Mybatis运行时会使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行MappedStatement所代表的sql，然后将sql执行结果返回。

#### 4、Mybatis是如何进行分页的？分页插件的原理是什么？

注：我出的。

答：Mybatis使用RowBounds对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

分页插件的基本原理是使用Mybatis提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的sql，然后重写sql，根据dialect方言，添加对应的物理分页语句和物理分页参数。

举例：select * from student，拦截sql后重写为：select t.* from （select * from student）t limit 0，10

#### 5、简述Mybatis的插件运行原理，以及如何编写一个插件。

注：我出的。

答：Mybatis仅可以编写针对ParameterHandler、ResultSetHandler、StatementHandler、Executor这4种接口的插件，Mybatis使用JDK的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是InvocationHandler的invoke()方法，当然，只会拦截那些你指定需要拦截的方法。

实现Mybatis的Interceptor接口并复写intercept()方法，然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。

#### 6、Mybatis执行批量插入，能返回数据库主键列表吗？

注：我出的。

答：能，JDBC都能，Mybatis当然也能。

#### 7、Mybatis动态sql是做什么的？都有哪些动态sql？能简述一下动态sql的执行原理不？

注：我出的。

答：Mybatis动态sql可以让我们在Xml映射文件内，以标签的形式编写动态sql，完成逻辑判断和动态拼接sql的功能，Mybatis提供了9种动态sql标签trim|where|set|foreach|if|choose|when|otherwise|bind。

其执行原理为，使用OGNL从sql参数对象中计算表达式的值，根据表达式的值动态拼接sql，以此来完成动态sql的功能。

#### 8、Mybatis是如何将sql执行结果封装为目标对象并返回的？都有哪些映射形式？

注：我出的。

答：第一种是使用标签，逐一定义列名和对象属性名之间的映射关系。第二种是使用sql列的别名功能，将列别名书写为对象属性名，比如T_NAME AS NAME，对象属性名一般是name，小写，但是列名不区分大小写，Mybatis会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成T_NAME AS NaMe，Mybatis一样可以正常工作。

有了列名与属性名的映射关系后，Mybatis通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

#### 9、Mybatis能执行一对一、一对多的关联查询吗？都有哪些实现方式，以及它们之间的区别。

注：我出的。

答：能，Mybatis不仅可以执行一对一、一对多的关联查询，还可以执行多对一，多对多的关联查询，多对一查询，其实就是一对一查询，只需要把selectOne()修改为selectList()即可；多对多查询，其实就是一对多查询，只需要把selectOne()修改为selectList()即可。

关联对象查询，有两种实现方式，一种是单独发送一个sql去查询关联对象，赋给主对象，然后返回主对象。另一种是使用嵌套查询，嵌套查询的含义为使用join查询，一部分列是A对象的属性值，另外一部分列是关联对象B的属性值，好处是只发一个sql查询，就可以把主对象和其关联对象查出来。

那么问题来了，join查询出来100条记录，如何确定主对象是5个，而不是100个？其去重复的原理是标签内的子标签，指定了唯一确定一条记录的id列，Mybatis根据列值来完成100条记录的去重复功能，可以有多个，代表了联合主键的语意。

同样主对象的关联对象，也是根据这个原理去重复的，尽管一般情况下，只有主对象会有重复记录，关联对象一般不会重复。

举例：下面join查询出来6条记录，一、二列是Teacher对象列，第三列为Student对象列，Mybatis去重复处理后，结果为1个老师6个学生，而不是6个老师6个学生。

       t_id    t_name           s_id

|          1 | teacher      |      38 |
|          1 | teacher      |      39 |
|          1 | teacher      |      40 |
|          1 | teacher      |      41 |
|          1 | teacher      |      42 |
|          1 | teacher      |      43 |

#### 10、Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？

注：我出的。

答：Mybatis仅支持association关联对象和collection关联集合对象的延迟加载，association指的就是一对一，collection指的就是一对多查询。在Mybatis配置文件中，可以配置是否启用延迟加载lazyLoadingEnabled=true|false。

它的原理是，使用CGLIB创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用a.getB().getName()，拦截器invoke()方法发现a.getB()是null值，那么就会单独发送事先保存好的查询关联B对象的sql，把B查询上来，然后调用a.setB(b)，于是a的对象b属性就有值了，接着完成a.getB().getName()方法的调用。这就是延迟加载的基本原理。

当然了，不光是Mybatis，几乎所有的包括Hibernate，支持延迟加载的原理都是一样的。

#### 11、Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？

注：我出的。

答：不同的Xml映射文件，如果配置了namespace，那么id可以重复；如果没有配置namespace，那么id不能重复；毕竟namespace不是必须的，只是最佳实践而已。

原因就是namespace+id是作为Map的key使用的，如果没有namespace，就剩下id，那么，id重复会导致数据互相覆盖。有了namespace，自然id就可以重复，namespace不同，namespace+id自然也就不同。

#### 12、Mybatis中如何执行批处理？

注：我出的。

答：使用BatchExecutor完成批处理。

#### 13、Mybatis都有哪些Executor执行器？它们之间的区别是什么？

注：我出的

答：Mybatis有三种基本的Executor执行器，**SimpleExecutor、ReuseExecutor、BatchExecutor。**

**SimpleExecutor：**每执行一次update或select，就开启一个Statement对象，用完立刻关闭Statement对象。

**ReuseExecutor：**执行update或select，以sql作为key查找Statement对象，存在就使用，不存在就创建，用完后，不关闭Statement对象，而是放置于Map内，供下一次使用。简言之，就是重复使用Statement对象。

**BatchExecutor：**执行update（没有select，JDBC批处理不支持select），将所有sql都添加到批处理中（addBatch()），等待统一执行（executeBatch()），它缓存了多个Statement对象，每个Statement对象都是addBatch()完毕后，等待逐一执行executeBatch()批处理。与JDBC批处理相同。

作用范围：Executor的这些特点，都严格限制在SqlSession生命周期范围内。

#### 14、Mybatis中如何指定使用哪一种Executor执行器？

注：我出的

答：在Mybatis配置文件中，可以指定默认的ExecutorType执行器类型，也可以手动给DefaultSqlSessionFactory的创建SqlSession的方法传递ExecutorType类型参数。

#### 15、Mybatis是否可以映射Enum枚举类？

注：我出的

答：Mybatis可以映射枚举类，不单可以映射枚举类，Mybatis可以映射任何对象到表的一列上。映射方式为自定义一个TypeHandler，实现TypeHandler的setParameter()和getResult()接口方法。TypeHandler有两个作用，一是完成从javaType至jdbcType的转换，二是完成jdbcType至javaType的转换，体现为setParameter()和getResult()两个方法，分别代表设置sql问号占位符参数和获取列查询结果。

#### 16、Mybatis映射文件中，如果A标签通过include引用了B标签的内容，请问，B标签能否定义在A标签的后面，还是说必须定义在A标签的前面？

注：我出的

答：虽然Mybatis解析Xml映射文件是按照顺序解析的，但是，被引用的B标签依然可以定义在任何地方，Mybatis都可以正确识别。

原理是，Mybatis解析A标签，发现A标签引用了B标签，但是B标签尚未解析到，尚不存在，此时，Mybatis会将A标签标记为未解析状态，然后继续解析余下的标签，包含B标签，待所有标签解析完毕，Mybatis会重新解析那些被标记为未解析的标签，此时再解析A标签时，B标签已经存在，A标签也就可以正常解析完成了。

#### 17、简述Mybatis的Xml映射文件和Mybatis内部数据结构之间的映射关系？

注：我出的

答：Mybatis将所有Xml配置信息都封装到All-In-One重量级对象Configuration内部。在Xml映射文件中，标签会被解析为ParameterMap对象，其每个子元素会被解析为ParameterMapping对象。标签会被解析为ResultMap对象，其每个子元素会被解析为ResultMapping对象。每一个、、、标签均会被解析为MappedStatement对象，标签内的sql会被解析为BoundSql对象。

#### 18、为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里？

注：我出的

答：Hibernate属于全自动ORM映射工具，使用Hibernate查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而Mybatis在查询关联对象或关联集合对象时，需要手动编写sql来完成，所以，称之为半自动ORM映射工具。

面试题看似都很简单，但是想要能正确回答上来，必定是研究过源码且深入的人，而不是仅会使用的人或者用的很熟的人，以上所有面试题及其答案所涉及的内容，在我的Mybatis系列博客中都有详细讲解和原理分析。

