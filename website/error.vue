<script setup lang="ts">
import { useRoute } from "vue-router";

import type { NuxtError } from "#app";

import PageMeta from "./components/PageMeta.vue";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();
const route = useRoute();

const errorTitle = computed(() => {
  return route.name === "poll-admin-id"
    ? props.error.statusMessage
    : t("pages.error.404.title");
});

const errorMessage = computed(() => {
  return route.name === "poll-admin-id"
    ? props.error.message
    : t("pages.error.404.description");
});
</script>

<template>
  <PageMeta :title="`${$t('pages.error.meta.title')} - ${$t('name')}`" />

  <NuxtLayout>
    <h1>{{ errorTitle }}</h1>
    <p class="error-message">{{ errorMessage }}</p>
    <NuxtLink :to="{ name: 'index' }">
      {{ $t("pages.error.homeLink") }}
    </NuxtLink>
  </NuxtLayout>
</template>

<style scoped>
.error-message {
  margin-block-end: 2rem;
}
</style>
