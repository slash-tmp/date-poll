<script setup lang="ts">
import Check from "./icons/Check.vue";

defineProps<{
  id: string;
  label: string;
  help?: string;
  required?: false;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <label :for="id" class="wrapper">
    <div class="input-container">
      <input :id="id" v-model="model" class="input" type="checkbox" />
      <Check class="icon" />
    </div>
    <span class="label">{{ label }}</span>
    <span v-if="help" class="help">{{ help }}</span>
  </label>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1.5rem auto;
  grid-template-rows: auto auto;
  gap: 0.125rem 1rem;
  padding: 1rem;
  border: 1px solid var(--color-grey-3);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  box-shadow: var(--shadow-small);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-lighter);
  }

  &:has([type="checkbox"]:checked) {
    background-color: var(--color-primary-lighter);
  }

  .input-container {
    border-radius: var(--border-radius-base);
    background-color: var(--color-white);
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    position: relative;
    height: 1.5rem;
    width: 1.5rem;
  }

  .icon {
    color: var(--color-white);
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .input {
    appearance: none;
    border: 1px solid var(--color-grey-3);
    box-shadow: var(--shadow-small);
    border-radius: var(--border-radius-base);
    margin: 0;
    position: absolute;
    inset: 0;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;

    &:focus-visible {
      outline: 2px solid var(--color-outline);
      outline-offset: 2px;
    }

    &:checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  .label {
    font-weight: var(--font-weight-semibold);
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }

  .help {
    color: var(--color-grey-3);
    font-size: var(--font-size-0);
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    margin: 0;
  }
}
</style>
