const pkg = require('./package')

const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
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
      }
    ],
    script: [{}],
  },
  css: [
    "@/static/css/style.css",
  ],
  loading: '~/components/loading.vue',
  plugins: [{
    src: "~/plugins/burger-menu.js",
    ssr: false
  }, ],
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
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
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {}
}
