interface User {
    email: string;
    name: string;
    nickname: string;
    picture: string;
    isAuthenticated: boolean;
    accessToken: string;
    accessTokenExpiresAt: number;
}

export const useAuthStore = defineStore("authStore", () => {
    const { $auth } = useNuxtApp();

    const hasUserBeenInitialised = ref(false);
    const user = ref<User>({
        email: "",
        name: "",
        nickname: "",
        picture: "",
        isAuthenticated: false,
        accessToken: "",
        accessTokenExpiresAt: 0,
    });

    const isUserAuthenticated = computed(() => user.value.isAuthenticated);

    async function onAuthInit() {
        const isAuthenticated = await $auth.isAuthenticated();
        const userInfo = await $auth.getIdTokenClaims();
        const accessToken = await $auth.getTokenSilently();

        console.log(accessToken);

        user.value.email = userInfo?.email ?? "";
        user.value.name = userInfo?.name ?? "";
        user.value.nickname = userInfo?.nickname ?? "";
        user.value.picture = userInfo?.picture ?? "";
        user.value.isAuthenticated = isAuthenticated ?? false;
        user.value.accessToken = accessToken ?? "";
        user.value.accessTokenExpiresAt = userInfo?.exp ?? 0;
        hasUserBeenInitialised.value = true;
    }

    return { user, hasUserBeenInitialised, isUserAuthenticated, onAuthInit };
});
