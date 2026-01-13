import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["nuxt-vuefire", "@pinia/nuxt"],
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
  runtimeConfig: {
    public: {
      imgbbApiKey: process.env.IMGBB_API_KEY,
    },
  },
  app: {
    head: {
      title: "Yamaha Deta Denpasar | Dealer Resmi Motor Yamaha",
      meta: [
        {
          name: "description",
          content:
            "Melayani pembelian motor YAMAHA CASH maupun CREDIT dengan harga dan pelayanan TERBAIK di Denpasar.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
