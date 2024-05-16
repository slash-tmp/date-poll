<script setup lang="ts">
// Display poll deletion confirmation alert
const showDeletedPollAlert = ref(false);
const deletedPollAlertRef = ref<HTMLDivElement>();
const deletedPoll = ref("");

onMounted(async () => {
  if (history.state.deletedPoll) {
    showDeletedPollAlert.value = true;
    deletedPoll.value = history.state.deletedPoll;
    await nextTick();
    deletedPollAlertRef.value?.focus();
  }
});

const headingRef = ref<HTMLHeadingElement>();
async function hideDeletedPollAlert() {
  showDeletedPollAlert.value = false;
  await nextTick();
  headingRef.value?.focus();
}
</script>

<template>
  <h1 ref="headingRef" tabindex="-1">{{ $t("pages.index.title") }}</h1>

  <div
    v-if="showDeletedPollAlert"
    ref="deletedPollAlertRef"
    role="alert"
    tabindex="-1"
  >
    Le sondage "{{ deletedPoll }}" a bien été supprimé

    <button @click="hideDeletedPollAlert">Fermer</button>
  </div>

  <RouterLink :to="{ name: 'poll-new' }">{{
    $t("pages.index.newPoll")
  }}</RouterLink>
</template>
