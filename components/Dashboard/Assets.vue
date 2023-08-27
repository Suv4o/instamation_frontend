<script setup lang="ts">
import { VFileDrop } from "v-file-drop";
import "v-file-drop/styles.css";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();

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
    console.log(await result.json());
  } catch (error) {
    console.error(error);
  }
}

function onFileChange(files: FileList) {
  const file = files[0];
  uploadFile(file);
}
</script>

<template>
  <div>
    <v-file-drop
      @change="onFileChange"
      multiple
      :accept="['image/png', 'image/jpeg']"
    >
      <div
        class="flex h-96 items-center justify-center rounded-3xl border border-cyan-600"
      >
        <p class="text-center text-5xl text-cyan-600">Drop your images here!</p>
      </div>
    </v-file-drop>
  </div>
</template>

<style scoped>
.file-upload__container {
  @apply w-full;
}
</style>
