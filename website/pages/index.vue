<script setup lang="ts">
// Display poll deletion confirmation alert
const deletedPollAlertRef = ref<HTMLDivElement>();
const deletedPoll = ref<string>();

onMounted(async () => {
  if (history.state.deletedPoll) {
    deletedPoll.value = history.state.deletedPoll;
    await nextTick();
    deletedPollAlertRef.value?.focus();
  }
});

const headingRef = ref<HTMLHeadingElement>();
async function hideDeletedPollAlert() {
  deletedPoll.value = undefined;
  await nextTick();
  headingRef.value?.focus();
}
</script>

<template>
  <h1 ref="headingRef" tabindex="-1">{{ $t("pages.index.title") }}</h1>

  <div v-if="deletedPoll" ref="deletedPollAlertRef" role="alert" tabindex="-1">
    {{ $t("pages.index.deletedPollAlert.description", { title: deletedPoll }) }}

    <button @click="hideDeletedPollAlert">
      {{ $t("pages.index.deletedPollAlert.close") }}
    </button>
  </div>

  <RouterLink :to="{ name: 'poll-new' }">
    {{ $t("pages.index.newPoll") }}
  </RouterLink>

  <br />

  <RouterLink :to="{ name: 'poll-find' }">
    {{ $t("pages.index.findPoll") }}
  </RouterLink>
</template>
