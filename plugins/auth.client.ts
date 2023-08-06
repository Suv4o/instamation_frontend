import { createAuth0Client } from "@auth0/auth0-spa-js";

export default defineNuxtPlugin(async () => {
    const runtimeConfig = useRuntimeConfig();

    async function auth() {
        const auth0 = await createAuth0Client({
            domain: runtimeConfig.public.AUTH0_DOMAIN,
            clientId: runtimeConfig.public.AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: runtimeConfig.public.AUTH0_REDIRECT_URI,
                audience: runtimeConfig.public.AUTH0_API_AUDIENCE,
            },
        });
        return auth0;
    }

    return {
        provide: {
            auth: await auth(),
        },
    };
});
