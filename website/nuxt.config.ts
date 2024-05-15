const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://[::]:4000";

const herokuBaseUrl =
  process.env.HEROKU_APP_NAME &&
  `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`;

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    "/api/**": { proxy: `${BACKEND_API_URL}/api/**` },
  },

  modules: ["@nuxtjs/i18n"],

  i18n: {
    vueI18n: "./i18n.config.ts",
  },

  runtimeConfig: {
    public: {
      // Can be overriden with NUXT_PUBLIC_BASE_URL
      baseUrl: herokuBaseUrl ?? "http://localhost:3000",
    },
  },
});
