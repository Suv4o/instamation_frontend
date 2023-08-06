<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const { $auth } = useNuxtApp();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
    try {
        if (!authStore.hasUserBeenInitialised) {
            await $auth.handleRedirectCallback();
            await authStore.onAuthInit();

            if (!authStore.isUserAuthenticated) {
                router.push("/");
            } else {
                router.push("/dashboard");
            }
        }
    } catch (error) {
        router.push("/");
    }
});
</script>

<template>
    <div></div>
</template>
