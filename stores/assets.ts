import { useAuthStore } from "@/stores/auth";

interface Asset {
  id: string;
  url: string;
  original_filename: string;
}

export const useAssetsStore = defineStore("assetsStore", () => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();
  const { setNotification, NotificationType } = useNotifications();
  const assets = ref<Asset[]>([]);
  const hasAssetsBeenInitialised = ref(false);

  async function uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await fetch(`${runtimeConfig.public.BACKEND_URL}/assets`, {
        headers: {
          Authorization: `Bearer ${await authStore.getAccessToken()}`,
        },
        method: "POST",
        body: formData,
      });
      const data = await result.json();
      if (data.success != null && !data.success) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      setNotification(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred",
        NotificationType.ERROR,
      );
    }
  }

  async function getAssets() {
    try {
      if (!authStore.user.accessToken || hasAssetsBeenInitialised.value) {
        return;
      }
      const data = await fetch(`${runtimeConfig.public.BACKEND_URL}/assets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await authStore.getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });

      const assetsData = await data.json();

      if (assetsData.success != null && !assetsData.success) {
        throw new Error(assetsData.message);
      }

      assets.value.push(...assetsData.images);
      hasAssetsBeenInitialised.value = true;
    } catch (error) {
      setNotification(
        "Error",
        error instanceof Error
          ? error.message
          : "An error occurred while getting your assets.",
        NotificationType.ERROR,
      );
    }
  }

  async function deleteAsset(assetId: string) {
    try {
      const result = await fetch(
        `${runtimeConfig.public.BACKEND_URL}/assets/${assetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await authStore.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await result.json();

      if (data.success != null && !data.success) {
        throw new Error(data.message);
      }

      assets.value = assets.value.filter((asset) => asset.id !== assetId);

      setNotification(
        "Image deleted",
        "Your image has been deleted successfully.",
        NotificationType.SUCCESS,
      );
    } catch (error) {
      setNotification(
        "Error",
        error instanceof Error
          ? error.message
          : "An error occurred while deleting your asset.",
        NotificationType.ERROR,
      );
    }
  }

  return {
    assets,
    hasAssetsBeenInitialised,
    uploadFile,
    getAssets,
    deleteAsset,
  };
});
