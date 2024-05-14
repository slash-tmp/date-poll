<script setup lang="ts">
import AdminInfos from "~/components/poll/new/AdminInfos.vue";
import Choices from "~/components/poll/new/Choices.vue";
import Settings from "~/components/poll/new/Settings.vue";
import TitleAndDescription from "~/components/poll/new/TitleAndDescription.vue";
import type { CreatePollFormData, StepPayload } from "~/components/types/poll";

const step = ref(0);
const { t } = useI18n();
const steps = [
  t("pages.poll.new.titleAndDescription.stepTitle"),
  t("pages.poll.new.choices.stepTitle"),
  t("pages.poll.new.settings.stepTitle"),
  t("pages.poll.new.adminInfos.stepTitle"),
];

/**
 * TODO:
 * - add times to dates
 * - validate date step
 * - i18n strings
 */

const poll = ref<CreatePollFormData>({
  title: "",
  description: null,
  choices: [{ date: null }],
  hideVotes: false,
  endDate: null,
  notifyOnResponse: false,
  adminName: null,
  adminEmail: "",
});

function submitStep(data: StepPayload) {
  poll.value = {
    ...poll.value,
    ...data,
  };

  step.value++;
}

/**
 * TODO:
 * - `POST /api/polls` with poll.value
 * - Redirect to `/poll/admin/{id}`
 * - Handle error
 */
async function submitLastStep(data: StepPayload) {
  poll.value = {
    ...poll.value,
    ...data,
  };

  try {
    const data = await $fetch("/api");
    console.log(data);

    router.push({ name: "poll-admin-id", params: { id: "xxx" } });
  } catch (e) {
    console.error(e);
  }
}

const router = useRouter();

const stepperRef = ref<HTMLInputElement>();
watch(step, () => {
  stepperRef.value?.focus();
});
</script>

<template>
  <h1>{{ $t("pages.poll.new.title") }}</h1>

  <p ref="stepperRef" tabindex="-1">
    {{
      $t("pages.poll.new.stepper", { current: step + 1, count: steps.length })
    }}
    :
    {{ steps[step] }}
  </p>

  <hr />

  <TitleAndDescription
    v-if="step === 0"
    :default-form-data="poll"
    @submit="submitStep"
  />
  <Choices
    v-if="step === 1"
    :default-form-data="poll"
    @submit="submitStep"
    @previous="step--"
  />
  <Settings
    v-if="step === 2"
    :default-form-data="poll"
    @submit="submitStep"
    @previous="step--"
  />
  <AdminInfos
    v-if="step === 3"
    :default-form-data="poll"
    @submit="submitLastStep"
    @previous="step--"
  />

  <hr />

  <pre><code>{{ JSON.stringify(poll, null, 2) }}</code></pre>
</template>
