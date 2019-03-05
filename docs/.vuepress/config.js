module.exports = {
  // 需要 yarn add vuepress-theme-reco
  // theme: 'reco',
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
    lineNumbers: true,
    anchor: {
      permalink: true
    },
    toc: {
      includeLevel: [1, 2]
    },
    config: md => {
      // 使用更多 markdown-it 插件！
      md.use(require('markdown-it-task-lists'))
      .use(require('markdown-it-imsize'), { autofill: true })
    }
  },
  themeConfig: {
    // github 设置
    // Assumes GitHub. Can also be a full GitLab url.
    // repo: 'https://github.com/dong4j',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    // repoLabel: 'Github',
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
    editLinkText: '查看原文|编辑此页',

    sidebar: 'auto',
    searchMaxSuggestions: 10,
    // e'b将同时提取markdown中h2 和 h3 标题, 显示在侧边栏上.
    sidebarDepth: 3,
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
            link: 'https://dong4j.github.io/vue-blog/',
            icon: 'reco-home'
          },
          { text: 'Tags', link: '/tags/', icon: 'reco-tag'},
          {
            text: 'Archive',
            link: '/all',
            icon: 'reco-category'
          },
          {
            text: "Contact",
            items: [
              {
                text: "Github",
                link: "https://github.com/dong4j",
                icon: 'reco-github'
              },
              {
                text: "WeChat",
                link: "/",
                icon: 'reco-wechat'
              }
            ]
          }
        ],

        // 侧边栏
        sidebar: {
          // 配置 /start/ 页的侧边栏显示
          '/start/': [
            {
                title: '🛋 导读',
              collapsable: false,
                children: [
                  'how-to-write-resume',
                  'introduction',
                ]
            },
            {
              title: 'Java 相关面试题',
              collapsable: false,
              children: [
                '/java/se/',
                '/java/ee/',
                '/java/jvm/',
                '/java/io/',
                '/java/collection/',
                '/java/concurrent/'
              ]
            },
            {
              title: '框架相关面试题',
              collapsable: false,
              children: [
                '/framework/mybatis/',
                '/framework/spring-mvc/',
                '/framework/spring-boot/',
                '/framework/spring-cloud/'
              ]
            },
            {
              title: '消息中间件',
              collapsable: false,
              children: [
                '/mq/activemq/',
                '/mq/kafka/',
                '/mq/rabbitmq/',
                '/mq/rocketmq/',
                '/mq/open-message/'
              ]
            },
            {
              title: '开放性问题',
              collapsable: false,
              children: [
                'coding',
                'open_issus',
                'hr'
              ]
            },
            {
              collapsable: false,
              children: [
                '/netty/',
                '/dubbo/',
                '/zookeeper/',
                '/mongodb/',
                '/nginx/',
                '/db/',
                '/arithmetic/',
                '/structure/',
                '/design/',
                '/design-patterns/',
                '/micro-service/',
                '/elastic-search/',
                '/redis/',
                '/issue/',
                '/linux/',
              ]
            },
            {
              title: '开发环境',
              children: [
                '/dev-env/linux-env/',
                '/dev-env/mac-env/',
                '/dev-env/windows-env/',
                '/tools/'
              ]
            }
          ],

          // 配置 /java/se/ 页的侧边栏显示
          '/java/se/': se("Think Deeply - Java SE"),
          '/java/ee/': ee("Think Deeply - Java EE"),
          '/java/collection/': collection("Think Deeply - 集合"),
          '/java/concurrent/': concurrent("Think Deeply - 多线程 && 并发模型"),
          '/java/io/': io("Think Deeply - IO"),
          '/java/jvm/': jvm("Think Deeply - JVM && JMM"),
          '/arithmetic/': arithmetic("Think Deeply - 算法"),
          '/structure/': structure("Think Deeply - 数据结构"),
          '/db/': db("Think Deeply - 数据库"),
          '/design/': design("Think Deeply - 系统设计"),
          '/design-patterns/': design_patterns("Think Deeply - 设计模式"),
          '/dubbo/': dubbo("Think Deeply - Dubbo"),
          '/zookeeper/': zookeeper("Think Deeply - Zookeeper"),
          '/elastic-search/': elastic_search("Think Deeply - ElasticSearch"),
          '/framework/mybatis/': mybatis("Think Deeply - Mybatis"),
          '/framework/spring/': spring("Think Deeply - Spring"),
          '/framework/spring-mvc/': spring_mvc("Think Deeply - Spring MVC"),
          '/framework/spring-boot/': spring_boot("Think Deeply - Spring Boot"),
          '/framework/spring-cloud/': spring_cloud("Think Deeply - Spring Cloud"),
          '/micro-service/': micro_service("Think Deeply - 微服务"),
          '/mongodb/': mongodb("Think Deeply - MongoDB"),
          '/mq/activemq/': activemq("Think Deeply - ActiveMQ"),
          '/mq/kafka/': kafka("Think Deeply - Kafka"),
          '/mq/rabbitmq/': rabbitmq("Think Deeply - RabbitMQ"),
          '/mq/rocketmq/': rocketmq("Think Deeply - RocketMQ"),
          '/mq/open-message/': open_message("Think Deeply - Open Message"),
          '/netty/': netty("Think Deeply - Netty"),
          '/nginx/': nginx("Think Deeply - Nginx"),
          '/redis/': redis("Think Deeply - Redis"),
          '/issue/': issue("Fuck yourself - 问题解决"),
          '/linux/': linux("Linux"),
          '/dev-env/linux-env/': linux_env("Fuck yourself - Linux 环境配置"),
          '/dev-env/mac-env/': mac_env("Fuck yourself - MacOS 环境配置"),
          '/dev-env/windows-env/': windows_env("Fuck yourself - Windows 环境配置"),
          '/tools/': tools("Fuck yourself - 常用工具")
        }
      }
    }
  }
};

function se(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'abstract_interface',
        'access_modifier',
        'annotation',
        'class',
        'class_forname',
        'encapsulation',
        'exception',
        'final_finally_finalize',
        'float_double',
        'for_interator',
        'generic',
        'hashcode',
        'inheritance',
        'init_sequence',
        'inner_class',
        'int_integer',
        'integer',
        'integer_source',
        'jdk11',
        'jdk_compare',
        'key_word',
        'new_instance_way',
        'polymorphism',
        'reflect',
        'string_append',
        'string_immutable',
        'string_kind',
        'string_resource',
        'string_switch',
        'substring_jdk6_jdk7',
        'try_with_resources',
        'value_transfer',
        'valueof_tostring',
        'wrapper_class',
        '一个简单问题不简单实现',
        '原码_反码_补码',
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
        'get_post',
        'tomcat',
        'tomcat_class_load'
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
        'parents_dlegation_mode',
        'object_reference',
        'metaspace',
        'gc',
        'class',
        'class_load',
        'dcl',
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
        'design_principles',
        'safe_singleton',
        'singleton',
        'cglib',
        'proxy',
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
        'boot_start',
        'expand_point'
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
        'test'
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
