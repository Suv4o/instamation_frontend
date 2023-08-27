<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const { $auth } = useNuxtApp();
const authStore = useAuthStore();
const router = useRouter();
const { notification, NotificationType } = useNotifications();

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
    notification.value = {
      isOpen: true,
      title: "Error",
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while logging in",
      type: NotificationType.ERROR,
    };
    router.push("/");
  }
});
</script>

<template>
  <div></div>
</template>
