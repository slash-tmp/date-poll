<script setup lang="ts">
import PageMeta from "~/components/PageMeta.vue";
import AdminInfos from "~/components/poll/new/AdminInfos.vue";
import Choices from "~/components/poll/new/Choices.vue";
import Settings from "~/components/poll/new/Settings.vue";
import Stepper from "~/components/poll/new/Stepper.vue";
import TitleAndDescription from "~/components/poll/new/TitleAndDescription.vue";
import useToast from "~/composables/useToast";
import type { CreatePollFormData, StepPayload } from "~/types/poll";

const step = ref(0);
const { t } = useI18n();
const { setToast } = useToast();
const steps = [
  t("pages.poll.new.titleAndDescription.stepTitle"),
  t("pages.poll.new.choices.stepTitle"),
  t("pages.poll.new.settings.stepTitle"),
  t("pages.poll.new.adminInfos.stepTitle"),
];

const formData = ref<CreatePollFormData>({
  title: "",
  description: null,
  choices: [],
  hideVotes: false,
  endDate: null,
  notifyOnResponse: false,
  adminName: null,
  adminEmail: "",
});

function goToPreviousStep(data: StepPayload) {
  formData.value = {
    ...formData.value,
    ...data,
  };

  step.value--;
}

function submitStep(data: StepPayload) {
  formData.value = {
    ...formData.value,
    ...data,
  };

  step.value++;
}

const isLoading = ref(false);

async function submitLastStep(data: StepPayload) {
  formData.value = {
    ...formData.value,
    ...data,
  };

  isLoading.value = true;

  try {
    const data = await createPoll(formData.value);
    router.push({ name: "poll-admin-id", params: { id: data.adminUid } });
  } catch (e) {
    isLoading.value = false;
    setToast({
      title: t("pages.poll.new.errorAlert"),
      type: "error",
      isClosable: true,
    });
    console.error(e);
  }
}

const router = useRouter();

// Focus stepper on step change
const stepperRef = ref<InstanceType<typeof Stepper>>();
watch(step, () => {
  stepperRef.value?.focus();
});
</script>

<template>
  <PageMeta
    :title="
      $t('pages.poll.new.meta.title', {
        currentStep: step + 1,
        count: steps.length,
        stepName: steps[step],
      })
    "
  />

  <h1>{{ $t("pages.poll.new.title") }}</h1>

  <Stepper
    ref="stepperRef"
    class="stepper"
    :steps-count="steps.length"
    :current-step="{ index: step + 1, name: steps[step] }"
  />

  <TitleAndDescription
    v-if="step === 0"
    :default-form-data="formData"
    @submit="submitStep"
  />
  <Choices
    v-if="step === 1"
    :default-form-data="formData"
    @submit="submitStep"
    @previous="goToPreviousStep"
  />
  <Settings
    v-if="step === 2"
    :default-form-data="formData"
    @submit="submitStep"
    @previous="goToPreviousStep"
  />
  <AdminInfos
    v-if="step === 3"
    :default-form-data="formData"
    :is-loading="isLoading"
    @submit="submitLastStep"
    @previous="goToPreviousStep"
  />
</template>

<style scoped>
.stepper {
  margin-block-end: 2rem;
}
</style>
