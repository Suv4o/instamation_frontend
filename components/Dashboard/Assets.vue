<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { VFileDrop } from "v-file-drop";
import "v-file-drop/styles.css";
import { useAssetsStore } from "@/stores/assets";
import { ArrowPathIcon } from "@heroicons/vue/20/solid";
const authStore = useAuthStore();
const assetsStore = useAssetsStore();
const isUploading = ref(false);
const isModalOpen = ref(false);
const isProcessing = ref(false);
const deletingAssetId = ref("");

onMounted(() => {
  assetsStore.getAssets();
});

watch(
  () => authStore.user.accessToken,
  () => {
    assetsStore.getAssets();
  },
);

async function openModal(assetId: string) {
  deletingAssetId.value = assetId;
  isModalOpen.value = true;
}

async function deleteAsset(id: string) {
  isProcessing.value = true;
  await assetsStore.deleteAsset(id);
  isProcessing.value = false;
}

async function modalOk() {
  await deleteAsset(deletingAssetId.value);
  isModalOpen.value = false;
}

function modalCancel() {
  isModalOpen.value = false;
  deletingAssetId.value = "";
}

async function onFileChange(files: FileList) {
  isUploading.value = true;
  if (!files.length) {
    isUploading.value = false;
    return;
  }
  for (const file of files) {
    const data = await assetsStore.uploadFile(file);
    assetsStore.assets.push(data.image);
  }
  isUploading.value = false;
}
</script>

<template>
  <div>
    <div class="mb-8">
      <v-file-drop
        v-if="!isUploading"
        @change="onFileChange"
        multiple
        :accept="['image/png', 'image/jpeg']"
      >
        <div
          class="flex h-96 items-center justify-center rounded-lg border border-cyan-600"
        >
          <p class="text-center text-4xl text-cyan-600">
            Drop your images here!
          </p>
        </div>
      </v-file-drop>
      <div v-else>
        <div
          class="flex h-96 items-center justify-center rounded-lg border border-cyan-600"
        >
          <ArrowPathIcon
            class="mr-2 h-12 w-12 animate-spin text-cyan-600"
            aria-hidden="true"
          />
          <p class="text-center text-4xl text-cyan-600">Upload...</p>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <h2 class="sr-only">Images</h2>

      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div v-for="asset in assetsStore.assets" :key="asset.id">
          <div
            class="aspect-h-1 aspect-w-1 mb-2 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
          >
            <img
              :src="asset.url"
              :alt="asset.original_filename"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <button
            @click="openModal(asset.id)"
            type="button"
            class="rounded bg-cyan-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <Modal
    :open="isModalOpen"
    :processing="isProcessing"
    type="warning"
    @ok="modalOk"
    @cancel="modalCancel"
    title="Delete Image"
    message="Are you sure you want to delete this image?"
  />
</template>

<style scoped>
.file-upload__container {
  @apply w-full;
}
</style>
