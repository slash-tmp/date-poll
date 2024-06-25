<script setup>
const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t("name")}` : t("name");
  },
});
</script>

<template>
  <Html :data-hydrationcomplete="isHydrated" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
