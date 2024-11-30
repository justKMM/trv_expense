import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['nuxt-primevue', 'nuxt-icon', '@pinia/nuxt'],
  devtools: { enabled: true },
  // tailwindcss
  css: [
    '~/assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    },
  },
  // primevue
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: true
    },
    importPT: { as: 'Aura', from: '~/presets/aura' }
  },
  runtimeConfig: {
    public: {
      // Public runtime config (client-side)
      clientId: process.env.NUXT_PUBLIC_CLIENT_ID,
      redirectUri: process.env.NUXT_PUBLIC_REDIRECT_URI
    },
    private: {
      // Private runtime config (server-side)
      clientSecret: process.env.NUXT_ZOHO_CLIENT_SECRET
    }
  }
})