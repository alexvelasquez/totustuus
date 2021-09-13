export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Totus',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuesax/dist/vuesax.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vuesax', '@/plugins/vueselect', '@/plugins/auth.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/proxy', '@nuxtjs/axios'],

  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api': {
      target: process.env.API_ENDPOINT,
      pathRewrite: { "^/api/": "" },
    },
    "/auth": {
      target: process.env.API_ENDPOINT,
      pathRewrite: { "^/auth/": "/api/" }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  firebase: {
    // config: {
    //   apiKey: 'AIzaSyDoetSHpwXo5QfnSJQqQN0tszbNkvI1OJg',
    //   authDomain: 'preguntados-1f6e7.firebaseapp.com',
    //   projectId: 'preguntados-1f6e7',
    //   storageBucket: 'preguntados-1f6e7.appspot.com',
    //   messagingSenderId: '151747463597',
    //   appId: '1:151747463597:web:ea41c202e35cfd522bb924',
    //   measurementId: "G-NBDNKTRZM9"
    // },
    // services: {
    //   auth: true,
    //   firestore: true,
    //   storage: true,
    //   analytics: true,
    //   performance: true,
    //   analytics: true
    // }
  }
}
