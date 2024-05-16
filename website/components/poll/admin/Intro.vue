<script setup lang="ts">
defineProps<{
  adminName: string | null;
  createdAt: string;
  description: string | null;
}>();
</script>

<template>
  <ul>
    <li v-if="adminName">
      {{ $t("pages.poll.admin.id.intro.createdBy") }}
      <strong>{{ adminName }}</strong>
    </li>
    <li>
      {{ $t("pages.poll.admin.id.intro.createdAt") }}
      <strong>{{ formatDate(createdAt) }}</strong>
    </li>
    <li v-if="description">{{ description }}</li>
  </ul>
</template>
