export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $auth } = useNuxtApp();
    if (to.path === "/" && from.path !== "/login") {
        return navigateTo("/login");
    }

    if (to.path === "/login" && (await $auth?.isAuthenticated())) {
        return navigateTo("/dashboard");
    }

    if (to.path.includes("/dashboard") && !(await $auth?.isAuthenticated())) {
        return navigateTo("/login");
    }
});
