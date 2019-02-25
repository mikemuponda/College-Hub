const pkg = require('./package')

const bodyParser = require('body-parser')
const session = require('express-session')

let PWAIcons = [16, 120, 144, 152, 192, 384, 512].map(size => {
  return {
    src: `/icon.png`,
    sizes: `${size}x${size}`,
    type: 'image/png'
  }
})


module.exports = {
  mode: 'universal',

  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/workbox',
    '@nuxtjs/manifest'
  ],

  manifest: {
    name: 'Collegehub',
    short_name: 'Collegehub',
    display: 'standalone',
    start_url: 'https://www.lekkahub.com/',
    theme_color: '#9400D3',
    background_color: '#FFF',
    lang: 'en-GB',
    icons: PWAIcons
  },

  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8',
        title: 'College Hub',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Making college life simple'
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Lekkahub'
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#317EFB'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Collegehub'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'College Hub'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Making college life simple'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.collegehub.co.zw'
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'en_GB'
      },
      {
        hid: 'name',
        itemprop: 'name',
        content: 'College Hub'
      },
      {
        hid: 'description',
        itemprop: 'description',
        content: 'Making college life simple'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      },
      {
        rel: 'stylesheet',
        href: "https://use.fontawesome.com/releases/v5.0.6/css/all.css"
      }
    ],
    script: [{}],
  },

  css: [
    "@/static/css/style.css",
  ],

  //loading: '~/components/loading.vue',
  loading: { color: '#da552f' },

  plugins: [
    {src: "~/plugins/burger-menu.js", ssr: false},
  ],

  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000
      }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  
  axios: {},

  build: {}
}
