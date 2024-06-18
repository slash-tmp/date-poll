<script setup lang="ts">
import Xmark from "./icons/Xmark.vue";

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();

// Focus modal on mounted
const modalRef = ref<HTMLHeadingElement>();
onMounted(() => {
  modalRef.value?.focus();
});
</script>

<template>
  <Teleport to="body">
    <div
      ref="modalRef"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      tabindex="-1"
    >
      <div class="content">
        <div class="header">
          <h2 id="modal-heading" class="h3">{{ title }}</h2>
          <button aria-label="Fermer" class="close" @click="$emit('close')">
            <Xmark />
          </button>
        </div>

        <slot />

        <div class="actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background-color: hsl(var(--hue-grey) 14% 50% / 90%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.content {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  position: relative;
  max-width: var(--modal-width);
}

.header {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.close {
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: end;
  margin-block-start: 4rem;
}
</style>
