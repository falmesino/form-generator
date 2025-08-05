// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@element-plus/nuxt'
  ],
  vite: {
    css: {
      preprocessorMaxWorkers: true // number of CPUs minus 1
    },
  }
})