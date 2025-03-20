<script setup lang="ts">
import Xmark from "./icons/Xmark.vue";

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();

// Focus modal on mounted
const modalRef = ref<HTMLDivElement>();
onMounted(() => {
  document.body.classList.add("no-scroll");
  modalRef.value?.focus();
});

onUnmounted(() => {
  document.body.classList.remove("no-scroll");
});

// Trap focus when tabbing
onMounted(() => {
  const focusableElsSelector =
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  const focusableEls = modalRef.value?.querySelectorAll(focusableElsSelector);
  const firstFocusableEl = focusableEls?.[0];
  const lastFocusableEl = focusableEls?.[focusableEls.length - 1];

  modalRef.value?.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          (lastFocusableEl as HTMLElement)?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          (firstFocusableEl as HTMLElement)?.focus();
          e.preventDefault();
        }
      }
    }
  });
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
      @keydown.esc="$emit('close')"
      @click.self="$emit('close')"
    >
      <div class="content">
        <div class="header">
          <h2 id="modal-heading" class="h3">{{ title }}</h2>
          <button class="close" @click="$emit('close')">
            <span class="visually-hidden">Fermer</span>
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
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  position: relative;
  max-width: var(--modal-width);
  width: 100%;

  @media (width < 50rem) {
    padding: 1rem;
  }
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
  color: var(--color-foreground);
  padding: 0;
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: end;
  flex-wrap: wrap;
  margin-block-start: 4rem;
}
</style>
