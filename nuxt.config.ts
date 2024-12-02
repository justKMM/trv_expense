import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['nuxt-primevue', 'nuxt-icon', '@pinia/nuxt'],
  build: {
    transpile: ['jspdf'],
  },
  pages: true,
  devtools: { enabled: true },
  // tailwindcss
  css: [
    '~/assets/css/main.css',
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css'
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
      ripple: true
    },
    importPT: { as: 'Aura', from: '~/presets/aura' }
  },
  runtimeConfig: {
    public: {
      // Public runtime config (client-side)
      clientId: process.env.NUXT_ZOHO_CLIENT_ID,
      redirectUri: process.env.NUXT_ZOHO_REDIRECT_URI
    },
    private: {
      // Private runtime config (server-side)
      clientSecret: process.env.NUXT_ZOHO_CLIENT_SECRET
    }
  },
})