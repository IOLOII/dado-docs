import { defaultTheme } from '@vuepress/theme-default'
// import { mixTheme } from 'vuepress-theme-mix'
// import { viteBundler } from '@vuepress/bundler-vite'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import { searchPlugin } from '@vuepress/plugin-search'
export default {
  base: '/dado-docs',
  sidebar: false,
  // title: '123',
  // open:true,
  // locales: {
  //   '/en': {
  //     lang: 'en-US',
  //   },
  //   '/zh/': {
  //     lang: 'zh-CN',
  //   },
  // },
  lang: 'zh-CN',
  title: '大道 Docs',
  description: null,
  // public: '/public',
  // base:'/cordova',
  theme: defaultTheme({
    colorModeSwitch: true,
    // logo: '/images/logo.jpg',// 'https://vuejs.org/images/logo.png',
    // logoDark:'',
    repo: 'http://39.104.63.170:8099/IOLOII/docs',
    repoLabel: 'GitLab 仓库',

    docsRepo: 'http://39.104.63.170:8099/IOLOII/docs',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    sidebarDepth: 3,
    lastUpdatedText: '最后一次修改于',
    contributorsText: '贡献者',
    editLinkText: '编辑此页',
    // locales: {
    //   '/': {
    //     selectLanguageName: 'English',
    //   },
    //   '/zh/': {
    //     selectLanguageName: '简体中文',
    //   },
    // },
    navbar: [
      // 嵌套 Group - 最大深度为 2
      // {
      //   text: 'Cordova',
      //   children: [
      //     {
      //       text: 'SubGroup',
      //       children: ['/group/sub/foo.md', '/group/sub/bar.md'],
      //     },
      //   ],
      // },
      // 控制元素何时被激活
      {
        text: 'Cordova',
        // link: '/cordova',
        // 该元素将一直处于激活状态
        // activeMatch: '/',
        children: [
          {
            text: 'Cordova',
            link: '/cordova.html',
            // 该元素将一直处于激活状态
            // activeMatch: '/Cordova/cordova.html',
          },
          {
            text: 'plugins',
            // link: '/Cordova/plugins',
            // // 该元素将一直处于激活状态
            // activeMatch: '/Cordova/plugins',
            children: [
              {
                text: 'code-push',
                link: '/cordova-code-push.html',
                // 该元素将一直处于激活状态
                // activeMatch: '/Cordova/cordova-code-push',
              }]

          },
        ],
      },
      {
        text: 'About',
        link: '',
        children: [
          {
            text: 'Github Page',
            link: 'https://ioloii.github.io/dado-docs/'
          },
        ]
      }
    ],
  }),
  // bundler: viteBundler({
  //   viteOptions: {},
  //   vuePluginOptions: {},
  // }),


  plugins: [
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/zh/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     },
    //   },
    // })

    //     searchPlugin({
    //   // 配置项
    // }),
  ]

}
