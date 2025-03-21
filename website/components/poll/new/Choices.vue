<script setup lang="ts">
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

    <ClientOnly>
      <Calendar v-model="choices" />
    </ClientOnly>

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
