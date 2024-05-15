<script setup lang="ts">
import type { CreatePollFormData, StepPayload } from "~/types/poll";

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
  <form @submit.prevent="submit">
    <div>
      <label for="hide-votes">{{
        $t("pages.poll.new.settings.hideVotes.label")
      }}</label>
      <input id="hide-votes" v-model="hideVotes" type="checkbox" />
    </div>

    <div>
      <label for="end-date">{{
        $t("pages.poll.new.settings.endDate.label")
      }}</label>
      <input id="end-date" v-model="endDate" type="date" />
    </div>

    <div>
      <label for="notify-on-response">
        {{ $t("pages.poll.new.settings.notifyOnResponse.label") }}
      </label>
      <input
        id="notify-on-response"
        v-model="notifyOnResponse"
        type="checkbox"
      />
    </div>

    <br />
    <br />
    <div>
      <button type="button" @click="previous">
        {{ $t("pages.poll.new.navigation.previous") }}
      </button>
      <button type="submit">{{ $t("pages.poll.new.navigation.next") }}</button>
    </div>
  </form>
</template>
