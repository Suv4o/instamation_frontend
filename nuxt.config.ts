// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        },
    },
    modules: ["@nuxt/image"],
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    typescript: {
        typeCheck: true,
        strict: true,
    },
});
