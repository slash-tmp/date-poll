<script setup lang="ts">
defineProps<{
  type?: "text";
  required: boolean;
  id: string;
  label: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <div class="wrapper">
    <label :for="`input-${id}`" class="label">{{ label }}</label>
    <input
      :id="`input-${id}`"
      v-model="model"
      class="field"
      :required="required"
      :type="type ?? 'text'"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .field {
    box-shadow: var(--shadow-small);
    border-radius: var(--border-radius-base);
    border: 1px solid var(--color-grey-3);
    font-size: var(--font-size-0);
    padding: 0.5rem 1rem;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-lighter);
    }

    &:focus-visible {
      border-color: var(--color-primary);
      background-color: var(--color-primary-lighter);
      outline: 2px solid var(--color-outline);
      outline-offset: 2px;
    }
  }

  .label {
    font-size: var(--font-size-0);
    font-weight: var(--font-weight-semibold);
  }
}
</style>
