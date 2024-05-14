<script setup lang="ts">
import type { CreatePollFormData, StepPayload } from "~/components/types/poll";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
  (e: "previous"): void;
}>();

const choices = ref(props.defaultFormData.choices);

function addChoice() {
  choices.value.push({ date: null });
}

function deleteChoice(index: number) {
  choices.value = choices.value.filter((_, i) => i !== index);
}

// FIXME: type error
function submit() {
  const r = choices.value
    .map((c) => {
      return {
        date: c.date ? new Date(c.date) : null,
      };
    })
    .filter((c) => c.date !== null);
  emit("submit", r);
}

function previous() {
  emit("previous");
}
</script>

<template>
  <form @submit.prevent="submit">
    <template v-for="(choice, i) in choices" :key="choice">
      <div>
        <label :for="`title-${i}`">{{
          $t("pages.poll.new.choices.choice.title", { index: i + 1 })
        }}</label>
        <input
          :id="`title-${i}`"
          v-model="choices[i].date"
          type="date"
          :required="choices.length === 1"
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
