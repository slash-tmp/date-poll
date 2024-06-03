<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from "vue-router";

const props = defineProps<{
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  to?: RouteLocationRaw;
}>();

const tag = props.to ? RouterLink : "button";
const type = props.to ? undefined : props.type ?? "button";
</script>

<template>
  <component
    :is="tag"
    class="button"
    :class="{
      'button-secondary': variant === 'secondary',
    }"
    :to="to ?? undefined"
    :type="type"
  >
    <slot />
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
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
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
}
</style>
