<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from "vue-router";

const props = defineProps<{
  variant?: "primary" | "secondary" | "tertiary";
  type?: "button" | "submit";
  to?: RouteLocationRaw;
  badge?: string;
}>();

defineExpose({
  focus: focusRoot,
});

const tag = props.to ? RouterLink : "button";
const type = props.to ? undefined : props.type ?? "button";

const rootRef = ref<HTMLButtonElement | HTMLAnchorElement>();
function focusRoot() {
  rootRef.value?.focus();
}
</script>

<template>
  <component
    :is="tag"
    ref="rootRef"
    class="button"
    :class="{
      'button-secondary': variant === 'secondary',
      'button-tertiary': variant === 'tertiary',
    }"
    :to="to ?? undefined"
    :type="type"
  >
    <slot />
    <p v-if="badge" class="button-badge">{{ badge }}</p>
  </component>
</template>

<style scoped>
.button {
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-base);
  box-shadow: var(--shadow-small);
  background-color: var(--color-primary);
  color: var(--color-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-semibold);
  padding: 0.5rem 2rem;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-darker);
    border-color: var(--color-primary-darker);
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }

  &.button-secondary {
    background-color: var(--color-white);
    border-color: var(--color-primary);
    color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  &.button-tertiary {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
    color: var(--color-primary);
    text-decoration: underline;
    padding: 0;

    &:hover {
      color: var(--color-primary-darker);
    }
  }
}

.button-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  border-radius: var(--border-radius-base);
  background-color: var(--color-error);
  color: var(--color-white);
  font-size: var(--font-size-0);
  padding: 0.125rem 0.25rem;
  z-index: 1;
}
</style>
