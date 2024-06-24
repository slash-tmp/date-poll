<script setup lang="ts">
import Alert from "~/components/Alert.vue";

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
  <Title>{{ $t("pages.index.meta.title") }}</Title>

  <h1 ref="headingRef" tabindex="-1">{{ $t("pages.index.title") }}</h1>

  <Alert
    v-if="deletedPoll"
    ref="deletedPollAlertRef"
    type="info"
    is-closable
    @close="hideDeletedPollAlert"
  >
    {{ $t("pages.index.deletedPollAlert.description", { title: deletedPoll }) }}
  </Alert>

  <RouterLink :to="{ name: 'poll-new' }">
    {{ $t("pages.index.newPoll") }}
  </RouterLink>

  <br />

  <RouterLink :to="{ name: 'poll-find' }">
    {{ $t("pages.index.findPoll") }}
  </RouterLink>
</template>
