const pkg = require('./package')

const bodyParser = require('body-parser')
const session = require('express-session')
const appRoutes = require('./routes.json')
const axios = require('axios');

//var allUsers = axios.get('https://www.lekkahub.com/users/allusers')
var allUsers = appRoutes
var routes = []

let PWAIcons = [16, 120, 144, 152, 192, 384, 512].map(size => {
  return {
    src: `/icon.png`,
    sizes: `${size}x${size}`,
    type: 'image/png'
  }
})

for (var i = 0; i < allUsers.length; i++) {
  routeObject = {
    'url': '/profile/' + allUsers[i].username,
    'changefreq': 'daily'
  }
  routes.push(routeObject);
}

module.exports = {
  mode: 'universal',

  render: {
    static: {
      maxAge: 31536000
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/workbox',
    '@nuxtjs/manifest',
    '@nuxtjs/sitemap'
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
    meta: [{
        charset: 'utf-8',
        title: 'Collegehub'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Collegehub provides services that facilitate a smooth transition into college life and allow students to create the best experiences at college.'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Collegehub, College, Accommodation, Rent a House, University, UZ, University of Zimbabwe, Harare, Lekkahub'
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
        content: 'Collegehub'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Collegehub provides services that facilitate a smooth transition into college life and allow students to create the best experiences at college.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.collegehub.co.zw'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/img/logo.png'
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'en_GB'
      },
      {
        hid: 'og:locale:alternate',
        property: 'og:locale:alternate',
        content: 'en_US'
      },
      {
        hid: 'og:locale:alternate',
        property: 'og:locale:alternate',
        content: 'sn_ZW'
      },

      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@collegehub_zwe'
      },
      {
        hid: 'twitter:creator',
        property: 'twitter:creator',
        content: '@lekkahub'
      },
      {
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: 'Collegehub'
      },
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
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      }
    ],
    script: [
      { 
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
        type: "text/javascript"
      }
    ],
  },

  css: [
    "@/static/css/style.css",
  ],

  //loading: '~/components/loading.vue',
  loading: '~/components/loading.vue',

  plugins: [{
      src: "~/plugins/burger-menu.js",
      ssr: false
    },
    {
      src: "~/plugins/vue-cookie-law.js",
      ssr: false
    },
    {
      src: "~/plugins/socketio.js",
      ssr: false
    }
  ],

  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000000
      }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/server/routes/api'
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.lekkahub.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
    exclude: [
      '/secret',
      '/admin/**'
    ],
    routes: routes
  },

  axios: {},

  build: {},
}
