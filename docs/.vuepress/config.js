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
  // 自动生成并且注册一个 service worker，它缓存了那些已访问过的页面的内容，用于离线访问（仅在生产环境生效）
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
    editLinks: true,
    searchMaxSuggestions: 10,
    // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    sidebarDepth: 2,

    serviceWorker: {
      // 当网站更新（即 Service Worker 更新）时，它会提供一个 refresh 按钮，允许用户立刻刷新内容
      // Boolean | Object, 默认值是 undefined.
      updatePopup: true,
    },
    locales: {
      "/": {
        label: "简体中文",
        selectText: "选择语言",
        // editLinkText: "在 GitHub 上编辑此页",
        // 文档更新时间：每个文件git最后提交的时间
        lastUpdated: "上次更新",
        // 导航栏
        nav: [
          {
            text: '博客',
            link: 'https://dong4j.github.io/vue-blog/'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/dong4j'
          },
          {
            text: 'Archive',
            link: '/all'
          },
          {
            text: "选择语言",
            items: [
              {
                text: "简体中文",
                link: "/"
              },
              {
                text: "你以为我会写英文版?",
                link: "/"
              }
            ]
          }
        ],
        // 侧边栏
        sidebar: {
          '/start/': gentStartSidebar("全部"),
          '/java/se/': gentSESidebar("Java SE"),
          '/java/ee/': gentEESidebar("Java EE"),
          '/java/collection/': genCollectionSidebar("集合"),
        }
      }
    }
  }
};

function gentStartSidebar(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'java_se_p1',
        'java_ee',
        'collection',
        'concurrent',
        'jvm'
      ]
    }
  ]
}

function gentSESidebar(title) {
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
        'inner_class',
        'key_word',
        'new_instance_way',
        'serializable',
        'string_kind',
        'wrapper_class'
      ]
    }
  ]
}

function gentEESidebar(title) {
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

function genCollectionSidebar(title) {
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