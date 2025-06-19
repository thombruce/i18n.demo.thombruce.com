export default defineAppConfig({
  site: {
    name: 'I18n Demo',
    description: '',
    url: 'https://i18n.demo.thombruce.com/',
    og: {
      component: 'TntColor',
      website: 'i18n.demo.thombruce.com',
      color: '#00a6f4',
      // image: null, // NOTE: Removed as broken. / TODO: Investigate
    },
  },
  ui: {
    layout: 'default',
    theme: 'solid',
    pattern: false,
    colors: {
      primary: 'sky',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
    }
  },
  header: {
    navigation: {
      content: true,
      links: [],
    }
  },
  footer: {
    about: '',
    contact: {
      email: '',
      tel: '',
      address: '',
    },
    copyright: 'Copyright © All rights reserved',
    navigation: {
      content: true,
      links: [],
    }
  },
})
