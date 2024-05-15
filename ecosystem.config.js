module.exports = {
  apps: [
    {
      name: "Nuxt website",
      script: "./website/.output/server/index.mjs",
    },
    {
      name: "Nest API",
      script: "./api/dist/src/main.js",
    },
  ],
};
