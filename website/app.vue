<script setup>
import OGImage from "./assets/images/og-image.png";
import Toast from "./components/Toast.vue";

const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

const { t } = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t("name")}` : t("name");
  },
  meta: [
    { name: "description", content: t("description") },
    { name: "og:description", content: t("description") },
    { name: "og:image", content: OGImage },
  ],
});
</script>

<template>
  <Html :data-hydrationcomplete="isHydrated" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toast />
</template>
