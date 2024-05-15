<script setup lang="ts">
import type { CreatePollFormData, StepPayload } from "~/types/poll";

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
  <form @submit.prevent="submit">
    <div>
      <label for="name">{{ $t("pages.poll.new.adminInfos.name.label") }}</label>
      <br />
      <span>{{ $t("pages.poll.new.adminInfos.name.hint") }}</span>
      <br />
      <input id="name" v-model="name" type="text" />
    </div>

    <br />
    <br />

    <div>
      <label for="email">{{
        $t("pages.poll.new.adminInfos.email.label")
      }}</label>
      <br />
      <span>{{ $t("pages.poll.new.adminInfos.email.hint") }}</span>
      <br />
      <input id="email" v-model="email" type="email" required />
    </div>

    <br />
    <br />
    <div>
      <button type="button" @click="previous">
        {{ $t("pages.poll.new.navigation.previous") }}
      </button>
      <button type="submit">
        {{ $t("pages.poll.new.navigation.submit") }}
      </button>
    </div>
  </form>
</template>
