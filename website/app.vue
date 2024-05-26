<script setup>
const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});
</script>

<template>
  <Html :data-hydrationcomplete="isHydrated" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
