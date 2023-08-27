<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const { $auth } = useNuxtApp();
const authStore = useAuthStore();
const router = useRouter();
const { setNotification, NotificationType } = useNotifications();

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
    setNotification(
      "Error",
      error instanceof Error
        ? error.message
        : "An error occurred while logging in",
      NotificationType.ERROR,
    );
    router.push("/");
  }
});
</script>

<template>
  <div></div>
</template>
