<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  type?: "text" | "email" | "date" | "time" | "url";
  help?: string;
  required?: boolean;
}>();

defineExpose({
  focus: focusField,
});

const fieldRef = ref<HTMLInputElement>();
function focusField() {
  fieldRef.value?.focus();
}

const model = defineModel<string | null>();
</script>

<template>
  <div class="wrapper">
    <label :for="`input-${id}`" class="label">
      {{ label }}
      <span v-if="required" aria-hidden="true" class="required">*</span>
      <span v-if="help" class="help">{{ help }}</span>
    </label>
    <input
      :id="`input-${id}`"
      ref="fieldRef"
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
    font-size: var(--font-size-1);
    padding: 0.5rem 1rem;
    width: 100%;
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
    font-size: var(--font-size-1);
    font-weight: var(--font-weight-semibold);
  }

  .required {
    color: var(--color-primary);
  }

  .help {
    display: block;
    font-size: var(--font-size-0);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-3);
  }
}
</style>
