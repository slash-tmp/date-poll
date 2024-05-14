<script setup lang="ts">
const route = useRoute();

const id = route.params.id;
</script>

<template>
  <h1>{{ $t("pages.poll.admin.id.title", { id }) }}</h1>
</template>
