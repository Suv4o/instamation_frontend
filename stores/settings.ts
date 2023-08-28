import { useAuthStore } from "@/stores/auth";

export const useSettingsStore = defineStore("settingsStore", () => {
  const { setNotification, NotificationType } = useNotifications();
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();
  const userName = ref("");
  const password = ref("");
  const isSaving = ref(false);
  const hasSettingsBeenInitialised = ref(false);

  async function saveSettings(e: Event) {
    try {
      e.preventDefault();
      isSaving.value = true;

      const result = await fetch(
        `${runtimeConfig.public.BACKEND_URL}/settings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await authStore.getAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instagram_username: userName.value,
            instagram_password: password.value,
          }),
        },
      );

      const data = await result.json();

      if (data.success != null && !data.success) {
        throw new Error(data.message);
      }

      isSaving.value = false;
      setNotification(
        "Success",
        "Your settings have been saved.",
        NotificationType.SUCCESS,
      );
    } catch (error) {
      isSaving.value = false;
      setNotification(
        "Error",

        error instanceof Error
          ? error.message
          : "An error occurred while saving your settings.",
        NotificationType.ERROR,
      );
    }
  }

  async function getSettings() {
    try {
      if (!authStore.user.accessToken || hasSettingsBeenInitialised.value) {
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

      if (settings.success != null && !settings.success) {
        throw new Error(settings.message);
      }

      userName.value = settings.instagram_username;
      password.value = settings.instagram_password;
      hasSettingsBeenInitialised.value = true;
    } catch (error) {
      setNotification(
        "Error",
        error instanceof Error
          ? error.message
          : "An error occurred while getting your settings.",
        NotificationType.ERROR,
      );
    }
  }

  return {
    userName,
    password,
    isSaving,
    hasSettingsBeenInitialised,
    saveSettings,
    getSettings,
  };
});
