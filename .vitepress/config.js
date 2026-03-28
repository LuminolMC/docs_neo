export default {
  title: 'Documentation Site',
  description: 'A documentation site built with VitePress',
  appearance: 'auto',
  ignoreDeadLinks: [
    /\/lightingluminol/,
    /\/lophine/
  ],
  locales: {
    cn: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'LuminolMC 文档站点',
      description: 'LuminolMC的文档站点',
      themeConfig: {
        nav: [
          { text: '首页', link: '/cn/' },
          { 
            text: '指南', 
            items: [
              { text: '介绍', link: '/cn/guide/' },
              { text: 'Luminol', link: '/cn/guide/luminol/' },
              { text: 'Folia', link: '/cn/guide/folia/' }
            ]
          },
        ],
        sidebar: {
          '/cn/guide/': [
            {
              text: '指南',
              items: [
                { text: '介绍', link: '/cn/guide/' },
              ]
            }
          ],
          '/cn/guide/luminol/': [
            {
              text: 'Luminol',
              items: [
                { text: '介绍', link: '/cn/guide/luminol/' },
                { text: '配置', link: '/cn/guide/luminol/configure' }
              ]
            }
          ],
          '/cn/guide/folia/': [
            {
              text: 'Folia',
              items: [
                { text: '介绍', link: '/cn/guide/folia/' },
                { text: '配置', link: '/cn/guide/folia/configuration' },
                { text: '线程数调优', link: '/cn/guide/folia/thread_count_tuning' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'LuminolMC Docs',
      description: 'The documentation site of LuminolMC',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { 
            text: 'Guide', 
            items: [
              { text: 'Introduction', link: '/en/guide/' },
              { text: 'Luminol', link: '/en/guide/luminol/' },
              { text: 'Folia', link: '/en/guide/folia/' }
            ]
          },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Introduction', link: '/en/guide/' },
              ]
            }
          ],
          '/en/guide/luminol/': [
            {
              text: 'Luminol',
              items: [
                { text: 'Introduction', link: '/en/guide/luminol/' },
                { text: 'Configure', link: '/en/guide/luminol/configure' }
              ]
            }
          ],
          '/en/guide/folia/': [
            {
              text: 'Folia',
              items: [
                { text: 'Introduction', link: '/en/guide/folia/' },
                { text: 'Configuration', link: '/en/guide/folia/configuration' },
                { text: 'Thread Count Tuning', link: '/en/guide/folia/thread_count_tuning' }
              ]
            }
          ]
        }
      }
    }
  }
}