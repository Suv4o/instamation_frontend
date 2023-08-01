export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();
    console.log(runtimeConfig.public.AUTH0_DOMAIN);

    return {
        provide: {
            hello: (msg: string) => `Hello ${msg}!`,
        },
    };
});
