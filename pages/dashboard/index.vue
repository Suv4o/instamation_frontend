<script setup lang="ts">
const { setNavigationCurrentItem } = useDashboardHeader();

definePageMeta({
    layout: "dashboard",
});

onMounted(() => {
    setNavigationCurrentItem("Home");
});
</script>

<template>
    <div>Home</div>
</template>
