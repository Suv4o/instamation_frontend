<script setup lang="ts">
const { setNavigationCurrentItem } = useDashboardHeader();

definePageMeta({
    layout: "dashboard",
});

onMounted(() => {
    setNavigationCurrentItem("Scheduler");
});
</script>

<template>
    <div>Scheduler</div>
</template>
