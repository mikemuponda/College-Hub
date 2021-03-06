const pkg = require('./package')
require('dotenv').config()
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
      maxAge: 31536000
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/workbox',
    '@nuxtjs/manifest',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-tag-manager', { id: process.env.googleTagManagerID }],
    ['@nuxtjs/google-adsense', {id: process.env.googleAdSenseKey}],
  ],

  manifest: {
    name: 'Collegehub Zimbabwe',
    short_name: 'Collegehub Zimbabwe',
    display: 'standalone',
    start_url: 'https://www.collegehub.co.zw/',
    theme_color: '#9400D3',
    background_color: '#FFF',
    lang: 'en-GB',
    icons: PWAIcons
  },

  head: {
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform.'
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: process.env.googleVerificationKey
      },
      {
        hid: 'msvalidate.01',
        name: 'msvalidate.01',
        content: '93A88C81BF4966C4AFB3FF8ABA2DE845'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'all,index,follow'
      },

      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Collegehub Zimbabwe'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Collegehub Zimbabwe'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform.'
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
        content: 'Collegehub Zimbabwe'
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/icon.png'
      },
      {
        rel: 'stylesheet',
        href: "//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
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
      src: "~/plugins/vue-google-maps.js",
      ssr: false
    },
    {
      src: "~/plugins/socketio.js",
      ssr: false
    },
    {
      src: "~/plugins/vue2-flip-countdown.js",
      ssr: false
    },
    {
      src: "~/plugins/google-analytics.js",
      ssr: false
    },
    {
      src: "~/plugins/vue-slide-bar.js",
      ssr: false
    },
    {
      src: "~/plugins/vue-tel-input.js",
      ssr: false
    },
    {
      src: "~/plugins/vuedisqus.js",
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
    '~/server/routes/api',
    '~/server/routes/api/houses',
    '~/server/routes/api/contact',
    '~/server/routes/api/health',
    '~/server/routes/api/admin',
    '~/server/routes/sitemap',
    '~/server/routes/api/google-util',
    '~/server/routes/api/userChats',
    '~/server/routes/api/auth-test',
  ],

  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': { target: 'https://maps.googleapis.com', pathRewrite: {'^/api/': ''} },
    '/api2/': { target: 'https://ipinfo.io', pathRewrite: {'^/api2/': ''} },
    '/img/': {target: 'https://s3.amazonaws.com/collegehub', pathRewrite: {'^/img/': ''}}
  },

  build: {},
}
