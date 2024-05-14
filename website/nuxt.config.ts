const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://[::]:4000";

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    "/api/**": { proxy: `${BACKEND_API_URL}/api/**` },
  },

  modules: ["@nuxtjs/i18n"],

  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
