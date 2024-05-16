<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <div>
    <h2>{{ error.statusMessage }}</h2>
    <p>{{ error.message }}</p>
    <NuxtLink :to="{ name: 'index' }">
      {{ $t("pages.error.homeLink") }}
    </NuxtLink>
  </div>
</template>
