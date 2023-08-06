import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const { $auth } = useNuxtApp();

        if (to.path === "/" && (await $auth.isAuthenticated())) {
            return navigateTo("/dashboard");
        }

        if (to.path.includes("/dashboard") && !(await $auth.isAuthenticated())) {
            return navigateTo("/");
        }
    }
});
