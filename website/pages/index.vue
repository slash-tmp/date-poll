<script setup lang="ts">
import Alert from "~/components/Alert.vue";
import PageMeta from "~/components/PageMeta.vue";

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

// Define page layout
definePageMeta({
  layout: "home",
});
</script>

<template>
  <PageMeta :title="$t('pages.index.meta.title')" />

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

  <i18n-t
    ref="headingRef"
    tag="h1"
    class="heading highlighted"
    tabindex="-1"
    keypath="pages.index.title"
  >
    <template #highlight>
      <span>{{ $t("pages.index.easily") }}</span>
    </template>
  </i18n-t>

  <p class="tagline">
    {{ $t("pages.index.tagLine") }}
    <strong>{{ $t("pages.index.arguments") }}</strong>
  </p>

  <div class="actions">
    <div>
      <Button :to="{ name: 'poll-new' }" aria-describedby="threeMinutes">
        {{ $t("pages.index.newPoll") }}
      </Button>
      <p id="threeMinutes" class="time-promise">👆 Ça prend 3 minutes</p>
    </div>

    <Button variant="secondary" :to="{ name: 'poll-find' }">
      {{ $t("pages.index.findPoll") }}
    </Button>
  </div>
</template>

<style scoped>
.heading span {
  color: var(--color-primary);
}

.tagline {
  font-size: var(--font-size-2);
  margin-block-end: 4rem;

  @media (width < 50rem) {
    margin-block-end: 2rem;
  }
}

.actions {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem 1rem;
}

.time-promise {
  font-size: var(--font-size-0);
  margin-block-start: 0.5rem;
}
</style>
