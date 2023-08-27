import { useAuthStore } from "@/stores/auth";

export const useSettingsStore = defineStore("settingsStore", () => {
  const { notification, NotificationType } = useNotifications();
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

      if (!data.success) {
        throw new Error(data.message);
      }

      isSaving.value = false;
      notification.value = {
        isOpen: true,
        title: "Success",
        message: "Your settings have been saved.",
        type: NotificationType.SUCCESS,
      };
    } catch (error) {
      isSaving.value = false;
      notification.value = {
        isOpen: true,
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while saving your settings.",
        type: NotificationType.ERROR,
      };
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

      if (!settings.success) {
        throw new Error(settings.message);
      }

      userName.value = settings.instagram_username;
      password.value = settings.instagram_password;
      hasUserBeenInitialised.value = true;
    } catch (error) {
      notification.value = {
        isOpen: true,
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while getting your settings.",
        type: NotificationType.ERROR,
      };
    }
  }

  return {
    userName,
    password,
    isSaving,
    hasUserBeenInitialised,
    saveSettings,
    getSettings,
  };
});
