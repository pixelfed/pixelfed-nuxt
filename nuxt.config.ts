// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      serverUrl: process.env.SERVER_URL || 'https://pixelfed.social',
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/login'
    }
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
    storesDirs: ['./stores/**'],
  },
  build: {
    babel: {
      plugins: ['@vue/babel-plugin-jsx']
    }
  },
  imports: {
    dirs: ['stores']
  },
  vite: {
    plugins: [
      require('@vitejs/plugin-vue-jsx')()
    ]
  },
  experimental: {
    viewTransition: true
  }
})