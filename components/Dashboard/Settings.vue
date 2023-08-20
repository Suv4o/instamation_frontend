<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();
const isSaving = ref(false);
const userName = ref("");
const password = ref("");

async function saveSettings(e: Event) {
  try {
    e.preventDefault();
    isSaving.value = true;

    await fetch(`${runtimeConfig.public.BACKEND_URL}/settings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.user.accessToken}`,
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
</script>

<template>
  <form @submit="saveSettings">
    <div class="space-y-12">
      <div
        class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
      >
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Instagram Profile
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Set up your Instagram profile to enable direct publishing to
            Instagram.
          </p>
        </div>

        <div
          class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
        >
          <div class="sm:col-span-3">
            <label
              for="user-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >User Name</label
            >
            <div class="mt-2">
              <input
                v-model="userName"
                type="text"
                name="user-name"
                id="user-name"
                autocomplete="user-name"
                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        :disabled="isSaving"
        type="submit"
        class="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        Save
      </button>
    </div>
  </form>
</template>
