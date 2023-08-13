<script setup lang="ts">
const { setNavigationCurrentItem } = useDashboardHeader();

definePageMeta({
    layout: "dashboard",
});

// This is the only thing that is different from the login page

onMounted(() => {
    setNavigationCurrentItem("Home");
});
</script>

<template>
    <div>Home</div>
</template>
