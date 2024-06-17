<script setup lang="ts">
defineProps<{
  stepsCount: number;
  currentStep: { index: number; name: string };
}>();

defineExpose({
  focus,
});

const title = ref<HTMLHeadingElement>();
function focus() {
  title.value?.focus();
}
</script>

<template>
  <div class="stepper">
    <h2 ref="title" class="title" tabindex="-1">
      <span class="count">
        {{
          $t("pages.poll.new.stepper", {
            current: currentStep.index,
            count: stepsCount,
          })
        }}
      </span>
      {{ currentStep.name }}
    </h2>
    <div class="progress-bar" />
  </div>
</template>

<style scoped>
.stepper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-block-end: 0;
  }

  .count {
    font-size: var(--font-size-0);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-3);
  }

  .progress-bar {
    height: 0.5rem;
    width: 100%;
    border-radius: 0 var(--border-radius-base) var(--border-radius-base) 0;
    background: var(--color-primary-lighter);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      width: calc(
        calc(100% / v-bind("stepsCount") * v-bind("currentStep.index"))
      );
      border-radius: var(--border-radius-base);
      background: var(--color-primary);
      transition: width 0.2s ease;
    }
  }
}
</style>
