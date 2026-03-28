export default {
  title: 'Documentation Site',
  description: 'A documentation site built with VitePress',
  appearance: 'auto',
  locales: {
    cn: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'LuminoLMC 文档站点',
      description: 'LuminolMC的文档站点',
      themeConfig: {
        nav: [
          { text: '首页', link: '/cn/' },
          { 
            text: '指南', 
            items: [
              { text: '介绍', link: '/cn/guide/' },
              { text: 'Luminol', link: '/cn/guide/luminol/' }
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
              { text: 'Luminol', link: '/en/guide/luminol/' }
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
          ]
        }
      }
    }
  }
}