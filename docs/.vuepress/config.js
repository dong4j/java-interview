module.exports = {
  // 需要 yarn add vuepress-theme-reco
  // theme: 'reco',
  locales: {
    "/": {
      lang: "zh-CN",
      title: 'Java-Interview',
      description: 'Fuck Java, fuck interview.',
    }
  },
  base: '/java-interview/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#00ABE9' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['meta', { name: 'msapplication-TileImage', content: '/favicon.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#06BDFF' }],
    // 让 Vuepress 支持图片放大功能
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
  ],
  host: '127.0.0.1',
  port: '9527',
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
    docsRepo: 'https://github.com/dong4j/java-interview',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '查看原文|编辑此页',
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true,
    },
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        lastUpdated: "上次更新",
        nav: [
          {
            text: '博客',
            link: 'https://dong4j.github.io/vue-blog/',
            icon: 'reco-home'
          },
          {
            text: '标签',
            link: '/tags/',
            icon: 'reco-tag'
          },
          {
            text: '归档',
            link: '/all',
            icon: 'reco-category'
          },
          {
            text: "联系",
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
          },
          {
            text: '反馈',
            link: 'https://github.com/dong4j/java-interview/issues/new/choose',
            icon: 'reco-category'
          }
        ],
        sidebar: {
          // 配置 /start/ 页的侧边栏显示
          '/start/': [
            {
                title: '🛋 导读',
              collapsable: false,
                children: [
                  'how_to_write_resume',
                  'introduction',
                ]
            },
            {
              title: '💼 Java 相关面试题',
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
              title: '🏠 框架相关面试题',
              collapsable: false,
              children: [
                '/framework/mybatis/',
                '/framework/spring/',
                '/framework/spring-mvc/',
                '/framework/spring-boot/',
                '/framework/spring-cloud/'
              ]
            },
            {
              title: '📲 消息中间件',
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
              title: '🦠 开放性问题',
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
              title: '💻 开发环境',
              collapsable: false,
              children: [
                '/dev-env/'
              ]
            },
            {
              title: '✨ Others',
              collapsable: false,
              children: [
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
        ''
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
        'tomcat_class_load',
        ''
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
        ''
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
        ''
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
        ''
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
        'data_storage_location',
        'object_memory',
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        'expand_point',
        ''
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
        ''
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
        'boot_start',
        'expand_point',
        ''
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
        ''
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
        ''
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
        ''
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
        'distributed_transaction',
        ''
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
        ''
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
        ''
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
        ''
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
        'test',
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        ''
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
        'git',
        'idea',
        'maven',
        'postman',
        ''
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
        ''
      ]
    }
  ]
}