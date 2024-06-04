<script setup lang="ts">
import CheckCircle from "./icons/CheckCircle.vue";
import Xmark from "./icons/Xmark.vue";

defineProps<{
  type: "success" | "info" | "error";
  isClosable?: boolean;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div :class="`alert alert-${type}`">
    <CheckCircle class="icon" aria-hidden="true" />
    <div>
      <slot />
    </div>
    <button v-if="isClosable" class="close" @click="$emit('close')">
      <Xmark aria-hidden="true" />
      <span class="visually-hidden">Fermer</span>
    </button>
  </div>
</template>

<style scoped>
.alert {
  display: grid;
  grid-template-columns: auto 1fr auto;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-base);
  padding: 1rem;
  gap: 1rem;

  @media (width < 50rem) {
    gap: 0.5rem;
    padding: 0.5rem;
  }

  &.alert-success {
    --bg-color: var(--color-success-light);
    --border-color: var(--color-success);
  }

  &.alert-info {
    --bg-color: var(--color-info-light);
    --border-color: var(--color-info);
  }

  &.alert-error {
    --bg-color: var(--color-error-light);
    --border-color: var(--color-error);
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .close {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>
