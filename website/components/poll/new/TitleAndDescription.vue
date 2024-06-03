<script setup lang="ts">
import Button from "~/components/Button.vue";
import Input from "~/components/Input.vue";
import Textarea from "~/components/Textarea.vue";
import type { CreatePollFormData, StepPayload } from "~/types/poll";

import Actions from "./Actions.vue";

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

    <Actions>
      <template #prev>
        <Button :to="{ name: 'index' }" variant="secondary">
          {{ $t("pages.poll.new.navigation.back") }}
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

.title-field,
.description-field {
  max-width: 30rem;
  margin-block-end: 1rem;
}
</style>
