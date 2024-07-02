const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://[::]:4000";

const herokuBaseUrl =
  process.env.HEROKU_APP_NAME &&
  `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    "/api/**": { proxy: `${BACKEND_API_URL}/api/**` },
  },

  modules: ["@nuxtjs/i18n"],

  i18n: {
    vueI18n: "./i18n.config.ts",
  },

  app: {
    head: {
      meta: [{ name: "theme-color", content: "#296fe0" }],
      link: [
        {
          rel: "icon",
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📆</text></svg>",
        },
      ],
      htmlAttrs: {
        lang: "fr-FR",
      },
    },
  },

  css: ["~/assets/styles/index.css"],

  runtimeConfig: {
    public: {
      // Can be overriden with NUXT_PUBLIC_BASE_URL
      baseUrl: herokuBaseUrl ?? "http://localhost:3000",
    },
  },
});
