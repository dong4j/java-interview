module.exports = {
  locales: {
    "/": {
      lang: "zh-CN",
      title: 'Java-Interview',
      description: 'Fuck Java, fuck interview.'
    }
  },

  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.png'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#00ABE9'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/favicon.png'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/favicon.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#06BDFF'
    }]
  ],
  host: '127.0.0.1',
  // 默认 8080
  port: '9527',
  // 自动生成并且注册一个 service worker, 它缓存了那些已访问过的页面的内容, 用于离线访问（仅在生产环境生效）
  // serviceWorker: true,
  // theme: 'vue',
  // base: '/web_accumulate/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    // 代码块显示行号
    lineNumbers: false,
    anchor: {
      permalink: true
    },
    toc: {
      includeLevel: [1, 2]
    }
    ,
    config: md => {
      // 使用更多 markdown-it 插件！
      md.use(require('markdown-it-task-lists'))
      .use(require('markdown-it-imsize'), { autofill: true })
    }
  },
  themeConfig: {
    // github 设置
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'https://github.com/dong4j',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Github',
    // Optional options for generating "Edit this page" link
    // if your docs are in a different repo from your main project:
    docsRepo: 'https://github.com/dong4j/java-interview',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: '在 GitHub 上编辑此页面',

    sidebar: 'auto',
    searchMaxSuggestions: 10,
    // e'b将同时提取markdown中h2 和 h3 标题, 显示在侧边栏上.
    sidebarDepth: 2,
    serviceWorker: {
      // 当网站更新（即 Service Worker 更新）时, 它会提供一个 refresh 按钮, 允许用户立刻刷新内容
      // Boolean | Object, 默认值是 undefined.
      updatePopup: true,
    },
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        // editLinkText: "在 GitHub 上编辑此页",
        // 文档更新时间:每个文件git最后提交的时间
        lastUpdated: "上次更新",
        // 导航栏
        nav: [
          {
            text: 'Blog',
            link: 'https://dong4j.github.io/vue-blog/'
          },
          {
            text: 'Archive',
            link: '/all'
          },
          {
            text: "Language",
            items: [
              {
                text: "中文",
                link: "/"
              },
              {
                text: "No English",
                link: "/"
              }
            ]
          }
        ],
        // 侧边栏
        sidebar: {
          '/start/': start(),
          '/java/se/': se("Java SE"),
          '/java/ee/': ee("Java EE"),
          '/java/collection/': collection("集合"),
          '/java/concurrent/': concurrent("多线程&&并发模型"),
          '/java/io/': io("IO"),
          '/java/jvm/': jvm("深入理解 Java 虚拟机"),
          '/arithmetic/': arithmetic("算法"),
          '/structure/': structure("数据结构"),
          '/db/': db("数据库"),
          '/design/': design("系统设计"),
          '/design-patterns/': design_patterns("设计模式"),
          '/dev-env/linux-env/': linux_env("Linux 环境配置"),
          '/dev-env/mac-env/': mac_env("MacOS 环境配置"),
          '/dev-env/windows-env/': windows_env("Windows 环境配置"),
          '/dubbo/': dubbo("Dubbo"),
          '/zookeeper/': zookeeper("Zookeeper"),
          '/elastic-search/': elastic_search("ElasticSearch"),
          '/framework/mybatis/': mybatis("Mybatis"),
          '/framework/spring/': spring("Spring"),
          '/framework/spring-mvc/': spring_mvc("Spring MVC"),
          '/framework/spring-boot/': spring_boot("Spring Boot"),
          '/framework/spring-cloud/': spring_cloud("Spring Cloud"),
          '/issue/': issue("问题解决"),
          '/linux/': linux("Linux"),
          '/micro-service/': micro_service("微服务"),
          '/mongodb/': mongodb("MongoDB"),
          '/mq/activemq/': activemq("ActiveMQ"),
          '/mq/kafka/': kafka("Kafka"),
          '/mq/rabbitmq/': rabbitmq("RabbitMQ"),
          '/mq/rocketmq/': rocketmq("RocketMQ"),
          '/mq/open-message/': open_message("Open Message"),
          '/netty/': netty("Netty"),
          '/nginx/': nginx("Nginx"),
          '/redis/': redis("Redis"),
          '/tools/': tools("常用工具"),
        }
      }
    }
  }
};
function start(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'how-to-write-resume',
        'foreword',
        'java_se',
        'io',
        'collection',
        'thread',
        'concurrent',
        'jvm',
        'java_ee',
        'design_patterns',
        'kafka',
        'myabtis',
        'mysql',
        'rabbitmq',
        'redis',
        'zookeeper',
        'spring',
        'springmvc',
        'spring_boot',
        'spring_cloud',
        'coding',
        'open_issus'
      ]
    }
  ]
}
function se(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'encapsulation',
        'inheritance',
        'polymorphism',
        'abstract_interface',
        'access_modifier',
        'exception',
        'final_finally_finalize',
        'value-transfer',
        'inner_class',
        'key_word',
        'new_instance_way',
        'init_sequence',
        'int_integer',
        'float_double',
        'wrapper_class',
        'string_kind',
        'string_append',
        'string_switch',
        'string_immutable',
        'string_resource',
        'substring_jdk6_jdk7',
        'valueof_tostring',
        'hashcode',
        'generic',
        '一个简单问题不简单实现',
        '原码_反码_补码',
        'class',
        'reflect',
        'class_forname',
        'jdk_compare'
      ]
    }
  ]
}
function ee(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'get_post'
      ]
    }
  ]
}
function collection(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'hashmap',
      ]
    }
  ]
}
function concurrent(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'threadlocal',
      ]
    }
  ]
}
function io(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function jvm(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'parents_dlegation_mode',
        'object_reference',
        'metaspace',
        'gc',
        'class',
      ]
    }
  ]
}
function arithmetic(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function db(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function design(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function design_patterns(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'design_principles',
        'safe_singleton',
        'singleton',
      ]
    }
  ]
}
function dubbo(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function elastic_search(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function mybatis(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function spring(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'expand_point',
      ]
    }
  ]
}
function spring_mvc(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function spring_boot(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'boot_start'
      ]
    }
  ]
}
function spring_cloud(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function linux_env(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function mac_env(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function windows_env(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function issue(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function linux(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function micro_service(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'distributed_transaction'
      ]
    }
  ]
}
function mongodb(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function activemq(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function kafka(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function rabbitmq(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function rocketmq(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function open_message(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function netty(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function nginx(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function redis(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function zookeeper(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
function tools(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'git',
        'idea',
        'maven',
        'postman',
      ]
    }
  ]
}
function structure(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}
