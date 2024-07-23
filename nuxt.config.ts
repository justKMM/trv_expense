// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-primevue',
    'nuxt-icon'
  ],
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
    importPT: { as: 'Aura', from: '~/presets/aura' }     //import and apply preset   
  },
  runtimeConfig: {
    public: {
      // Public runtime config (client-side)
      clientId: process.env.ZOHO_CLIENT_ID,
      redirectUri: process.env.ZOHO_REDIRECT_URI
    },
    private: {
      // Private runtime config (server-side)
      clientSecret: process.env.ZOHO_CLIENT_SECRET
    }
  }
})
