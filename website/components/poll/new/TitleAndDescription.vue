<script setup lang="ts">
import Input from "~/components/Input.vue";
import Textarea from "~/components/Textarea.vue";
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
  <p class="intro">
    {{ $t("pages.poll.new.titleAndDescription.intro") }}
  </p>
  <form @submit.prevent="submit">
    <Input
      id="title"
      v-model="title"
      class="title-field"
      required
      :label="$t('pages.poll.new.titleAndDescription.title.label')"
    />

    <Textarea
      id="description"
      v-model="description"
      class="description-field"
      :rows="6"
      :label="$t('pages.poll.new.titleAndDescription.description.label')"
      :help="$t('pages.poll.new.titleAndDescription.description.help')"
    />

    <div>
      <button type="submit">{{ $t("pages.poll.new.navigation.next") }}</button>
    </div>
  </form>
</template>

<style scoped>
.intro {
  margin-block-end: 2rem;
}

.title-field,
.description-field {
  max-width: 30rem;
  margin-block-end: 1rem;
}
</style>
