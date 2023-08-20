import { useAuthStore } from "@/stores/auth";

export const useSettingsStore = defineStore("settingsStore", () => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();
  const userName = ref("");
  const password = ref("");
  const isSaving = ref(false);
  const hasUserBeenInitialised = ref(false);

  async function saveSettings(e: Event) {
    try {
      e.preventDefault();
      isSaving.value = true;

      await fetch(`${runtimeConfig.public.BACKEND_URL}/settings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await authStore.getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instagram_username: userName.value,
          instagram_password: password.value,
        }),
      });

      isSaving.value = false;
    } catch (error) {
      isSaving.value = false;
      console.error(error);
    }
  }

  async function getSettings() {
    try {
      if (!authStore.user.accessToken || hasUserBeenInitialised.value) {
        return;
      }
      const data = await fetch(`${runtimeConfig.public.BACKEND_URL}/settings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await authStore.getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      const settings = await data.json();
      userName.value = settings.instagram_username;
      password.value = settings.instagram_password;
      hasUserBeenInitialised.value = true;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    userName,
    password,
    isSaving,
    saveSettings,
    getSettings,
  };
});
