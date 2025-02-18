<script setup lang="ts">
/**
 * TODO:
 * - select multiple dates ✅
 * - add time to date ✅
 * - fix iso dates problem (-1 day) ✅
 * - add multiple times to dates ✅
 * - show dates before/after current month ✅
 * - filter duplicates when submitting ✅
 * - handle errors (missing field value) ✅
 * - add icon to button on small device ✅
 * - e2e tests ✅
 * - translate strings ✅
 * - ensure a11y ✅
 *    - move focus when adding time ✅
 *    - check VO on days ✅
 *    - add badge label on buttons ✅
 * - handle pre-registered dates (edit page)
 * - mobile styles ✅
 * - clean CSS ✅
 * - clean file ✅
 * - add button to delete time + e2e test
 */

import { isEqual, uniqWith } from "lodash-es";

import Button from "~/components/Button.vue";
import useToast from "~/composables/useToast";
import type { CreatePollFormData, StepPayload } from "~/types/poll";

import Actions from "./Actions.vue";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
  (e: "previous", payload: StepPayload): void;
}>();

const { t } = useI18n();

const choices = ref(structuredClone(props.defaultFormData.choices.map(toRaw)));

// Step navigation
async function submit() {
  // validate number of choices
  if (!choices.value.length) {
    setToast({
      title: t("pages.poll.new.choices.noChoiceError"),
      type: "error",
      isClosable: true,
    });
    return;
  }

  // Filter duplicates and submit
  emit("submit", { choices: uniqWith(choices.value, isEqual) });
}

function previous() {
  emit("previous", { choices: choices.value });
}

const { setToast } = useToast();
</script>

<template>
  <form @submit.prevent="submit">
    <p class="intro">
      {{ $t("pages.poll.new.choices.intro") }}
    </p>

    <Calendar v-model="choices" />

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
.intro {
  margin-block-end: 2rem;
}
</style>
