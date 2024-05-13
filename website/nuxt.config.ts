const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:4000";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/api/**": { proxy: `${BACKEND_API_URL}/api/**` },
  },
});
