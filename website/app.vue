<script setup>
const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - date-poll` : "date-poll";
  },
});
</script>

<template>
  <Html :data-hydrationcomplete="isHydrated" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
