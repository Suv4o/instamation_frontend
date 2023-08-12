// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        },
    },
    modules: ["@nuxt/image", "@pinia/nuxt"],
    pinia: {
        autoImports: ["defineStore"],
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
            AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
            AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
            AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
        },
    },
    ssr: false,
    typescript: {
        typeCheck: true,
        strict: true,
    },
});
