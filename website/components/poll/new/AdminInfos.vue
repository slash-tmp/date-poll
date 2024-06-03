<script setup lang="ts">
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

const name = ref(props.defaultFormData.adminName);
const email = ref(props.defaultFormData.adminEmail);

function submit() {
  emit("submit", { adminName: name.value, adminEmail: email.value });
}

function previous() {
  emit("previous", { adminName: name.value, adminEmail: email.value });
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <p class="intro">
      {{ $t("pages.poll.new.adminInfos.intro") }}
    </p>
    <Input
      id="name"
      v-model="name"
      class="name"
      type="text"
      :label="$t('pages.poll.new.adminInfos.name.label')"
      :help="$t('pages.poll.new.adminInfos.name.hint')"
    />

    <Input
      id="email"
      v-model="email"
      class="email"
      type="email"
      required
      :label="$t('pages.poll.new.adminInfos.email.label')"
      :help="$t('pages.poll.new.adminInfos.email.hint')"
    />

    <Actions>
      <template #prev>
        <Button variant="secondary" @click="previous">
          {{ $t("pages.poll.new.navigation.previous") }}
        </Button>
      </template>
      <template #next>
        <Button type="submit">
          {{ $t("pages.poll.new.navigation.submit") }}
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

.name,
.email {
  max-width: 30rem;
}
</style>
