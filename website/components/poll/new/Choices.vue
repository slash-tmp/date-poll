<script setup lang="ts">
import Button from "~/components/Button.vue";
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

const choices = ref([...props.defaultFormData.choices]);

const dateRefs = ref<InstanceType<typeof Input>[]>([]);

async function addChoice() {
  choices.value.push({ date: null, time: null });
  await nextTick();
  dateRefs.value[choices.value.length - 1].focus();
}

async function deleteChoice(index: number) {
  choices.value = choices.value.filter((_, i) => i !== index);
  await nextTick();
  dateRefs.value[index - 1].focus();
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
  <form class="form" @submit.prevent="submit">
    <p class="intro">
      {{ $t("pages.poll.new.choices.intro") }}
    </p>
    <p v-if="showNoChoiceError" ref="noChoiceErrorRef" tabindex="-1">
      {{ $t("pages.poll.new.choices.noChoiceError") }}
    </p>
    <div v-for="(choice, i) in choices" :key="i" class="choice">
      <Input
        :id="`choice-date-${i}`"
        ref="dateRefs"
        v-model="choice.date"
        type="date"
        :label="$t('pages.poll.new.choices.choice.dateLabel', { index: i + 1 })"
        required
      />

      <Input
        :id="`choice-time-${i}`"
        v-model="choice.time"
        type="time"
        :label="$t('pages.poll.new.choices.choice.timeLabel', { index: i + 1 })"
        required
      />

      <Button
        v-if="choices.length > 1"
        variant="secondary"
        @click="deleteChoice(i)"
      >
        {{ $t("pages.poll.new.choices.choice.deleteChoice") }}
      </Button>
    </div>

    <Button class="add-choice" variant="secondary" @click="addChoice">
      {{ $t("pages.poll.new.choices.addNewChoice") }}
    </Button>

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

.choice {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-block-end: 1rem;

  @media (width < 50rem) {
    grid-template-columns: 1fr;
  }
}

.add-choice {
  align-self: start;
}
</style>
