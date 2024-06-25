<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <Title>{{ title }}</Title>
  <Meta name="og:title" :content="`${title} - ${$t('name')}`" />
</template>
