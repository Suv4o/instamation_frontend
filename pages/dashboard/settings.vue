<script setup lang="ts">
const { setNavigationCurrentItem } = useDashboardHeader();

definePageMeta({
    layout: "dashboard",
});

onMounted(() => {
    setNavigationCurrentItem("Settings");
});
</script>

<template>
    <div class="container">
        <DashboardSettings />
    </div>
</template>
