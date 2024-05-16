<script setup lang="ts">
defineEmits<{
  (e: "delete"): void;
}>();
</script>

<template>
  <div>
    <!-- TODO: edit poll -->
    <NuxtLink to="#">{{ $t("pages.poll.admin.id.actions.edit") }}</NuxtLink>
    <br />
    <button @click="$emit('delete')">
      {{ $t("pages.poll.admin.id.actions.delete") }}
    </button>
  </div>
</template>
