<script setup lang="ts">
const route = useRoute();

const id = route.params.id;
</script>

<template>
  <h1>Sondage {{ id }}</h1>
</template>
