<script setup lang="ts">
import useToast from "~/composables/useToast";

import Alert from "./Alert.vue";

const { toast } = useToast();

// TODO: focus page h1 on close?
function onClose() {
  console.log("close toast");
  toast.value = null;
}
</script>

<template>
  <Teleport to="body">
    <Transition>
      <Alert
        v-if="toast"
        class="toast"
        :type="toast.type"
        :is-closable="toast.isClosable"
        @close="onClose"
      >
        <p>{{ toast.title }}</p>
      </Alert>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
  max-width: 25rem;
  z-index: 1;

  @media (width < 50rem) {
    max-width: none;
    inset-inline: 1rem;
  }
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
