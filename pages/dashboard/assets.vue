<script setup lang="ts">
const { setNavigationCurrentItem } = useDashboardHeader();

definePageMeta({
  layout: "dashboard",
});

onMounted(() => {
  setNavigationCurrentItem("Assets");
});
</script>

<template>
  <div class="container">
    <DashboardAssets />
  </div>
</template>
