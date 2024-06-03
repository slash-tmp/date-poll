<script setup lang="ts">
import Checkbox from "~/components/Checkbox.vue";
import Input from "~/components/Input.vue";
import type { CreatePollFormData, StepPayload } from "~/types/poll";

import Actions from "./Actions.vue";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
  (e: "previous", payload: StepPayload): void;
}>();

const hideVotes = ref(props.defaultFormData.hideVotes);
const endDate = ref(props.defaultFormData.endDate);
const notifyOnResponse = ref(props.defaultFormData.notifyOnResponse);

function submit() {
  emit("submit", {
    hideVotes: hideVotes.value,
    endDate: endDate.value,
    notifyOnResponse: notifyOnResponse.value,
  });
}

function previous() {
  emit("previous", {
    hideVotes: hideVotes.value,
    endDate: endDate.value,
    notifyOnResponse: notifyOnResponse.value,
  });
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <p class="intro">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error eveniet
      vel, mollitia eius expedita quibusdam ad assumenda. Fuga excepturi, autem
      optio corporis, qui quae velit voluptatem delectus a, suscipit inventore.
    </p>

    <Input
      id="end-date"
      v-model="endDate"
      class="end-date"
      type="date"
      :label="$t('pages.poll.new.settings.endDate.label')"
      :help="$t('pages.poll.new.settings.endDate.help')"
    />

    <Checkbox
      id="hide-votes"
      v-model="hideVotes"
      :label="$t('pages.poll.new.settings.hideVotes.label')"
      :help="$t('pages.poll.new.settings.hideVotes.help')"
    />

    <Checkbox
      id="notify-on-response"
      v-model="notifyOnResponse"
      :label="$t('pages.poll.new.settings.notifyOnResponse.label')"
      :help="$t('pages.poll.new.settings.notifyOnResponse.help')"
    />

    <Actions>
      <template #prev>
        <Button variant="secondary" @click="previous">
          {{ $t("pages.poll.new.navigation.previous") }}
        </Button>
      </template>
      <template #next>
        <Button type="submit">
          {{ $t("pages.poll.new.navigation.next") }}
        </Button>
      </template>
    </Actions>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intro {
  margin-block-end: 1rem;
}

.end-date {
  max-width: 20rem;
}
</style>
