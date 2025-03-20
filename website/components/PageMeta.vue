<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <Title>{{ title }}</Title>
  <Meta name="og:title" :content="`${title} - ${$t('name')}`" />
  <template v-if="description">
    <Meta name="og:description" :content="description" />
    <Meta name="description" :content="description" />
  </template>
</template>
