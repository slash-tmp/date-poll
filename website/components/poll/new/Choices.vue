<script setup lang="ts">
import type { CreatePollFormData, StepPayload } from "~/types/poll";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
  (e: "previous", payload: StepPayload): void;
}>();

const choices = ref([...props.defaultFormData.choices]);

function addChoice() {
  choices.value.push({ date: null, time: null });
}

function deleteChoice(index: number) {
  choices.value = choices.value.filter((_, i) => i !== index);
}

async function submit() {
  showNoChoiceError.value = false;

  // validate number of choices
  if (!choices.value.length) {
    showNoChoiceError.value = true;
    await nextTick();
    noChoiceErrorRef.value?.focus();
    return;
  }

  emit("submit", { choices: choices.value });
}

function previous() {
  emit("previous", { choices: choices.value });
}

const showNoChoiceError = ref(false);
const noChoiceErrorRef = ref<HTMLParagraphElement>();
</script>

<template>
  <form @submit.prevent="submit">
    <p v-if="showNoChoiceError" ref="noChoiceErrorRef" tabindex="-1">
      Vous devez au moins ajouter une date.
    </p>
    <template v-for="(choice, i) in choices" :key="choice">
      <div>
        <label :for="`choice-date-${i}`">{{
          $t("pages.poll.new.choices.choice.dateLabel", { index: i + 1 })
        }}</label>
        <input
          :id="`choice-date-${i}`"
          v-model="choice.date"
          type="date"
          required
        />
      </div>

      <div>
        <label :for="`choice-time-${i}`">{{
          $t("pages.poll.new.choices.choice.timeLabel", { index: i + 1 })
        }}</label>
        <input
          :id="`choice-time-${i}`"
          v-model="choice.time"
          type="time"
          required
        />
      </div>

      <button
        type="button"
        :disabled="choices.length === 1"
        @click="deleteChoice(i)"
      >
        {{ $t("pages.poll.new.choices.choice.deleteChoice") }}
      </button>
      <br />
      <br />
    </template>

    <button type="button" @click="addChoice">
      {{ $t("pages.poll.new.choices.addNewChoice") }}
    </button>

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
