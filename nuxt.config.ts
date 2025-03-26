// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:3000/api',
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  typescript: {
    strict: true
  },
  devServer: {
    port: 8080
  }
})
