<script setup lang="ts">
import type { CreatePollFormData, StepPayload } from "~/types/poll";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
}>();

const title = ref(props.defaultFormData.title);
const description = ref(props.defaultFormData.description);

function submit() {
  emit("submit", { title: title.value, description: description.value });
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="title">{{
        $t("pages.poll.new.titleAndDescription.title.label")
      }}</label>
      <br />
      <input id="title" v-model="title" type="text" required />
    </div>

    <div>
      <label for="description">{{
        $t("pages.poll.new.titleAndDescription.description.label")
      }}</label>
      <br />
      <textarea id="description" v-model="description" />
    </div>
    <div>
      <button type="submit">{{ $t("pages.poll.new.navigation.next") }}</button>
    </div>
  </form>
</template>
