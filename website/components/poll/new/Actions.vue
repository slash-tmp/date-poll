<script setup lang="ts"></script>

<template>
  <div class="actions">
    <slot name="prev" />
    <slot name="next" />
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-block-start: 4rem;
  gap: 1rem;

  > * {
    @media (width < 50rem) {
      flex-grow: 1;
    }
  }
}
</style>
