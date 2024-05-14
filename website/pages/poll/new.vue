<script setup lang="ts">
import AdminInfos from "~/components/poll/new/AdminInfos.vue";
import Choices from "~/components/poll/new/Choices.vue";
import Settings from "~/components/poll/new/Settings.vue";
import TitleAndDescription from "~/components/poll/new/TitleAndDescription.vue";

interface Poll {
  title: string;
  description: string | null;
  choices: { date: Date }[];
  hideVotes: boolean;
  endDate: Date | null;
  notifyOnResponse: boolean;
  adminName: string | null;
  adminEmail: string;
}

const step = ref(0);

const steps = [
  "Nom et description",
  "Dates et horaires",
  "Paramètres",
  "Administrateur",
];

// TODO: save data between steps
const poll = ref<Poll>({
  title: "",
  description: null,
  choices: [],
  hideVotes: false,
  endDate: null,
  notifyOnResponse: false,
  adminName: null,
  adminEmail: "",
});

function submitTitleAndDescription(data: {
  title: string;
  description: string | null;
}) {
  poll.value.title = data.title;
  poll.value.description = data.description;

  step.value++;
}

function submitChoices(data: { date: Date }[]) {
  poll.value.choices = data;

  step.value++;
}

function submitSettings(data: {
  hideVotes: boolean;
  endDate: Date | null;
  notifyOnResponse: boolean;
}) {
  poll.value.hideVotes = data.hideVotes;
  poll.value.endDate = data.endDate;
  poll.value.notifyOnResponse = data.notifyOnResponse;

  step.value++;
}

const router = useRouter();

/**
 * TODO:
 * - `POST /api/polls` with poll.value
 * - Redirect to `/poll/admin/{id}`
 */
async function submitAdminInfos(data: { name: string | null; email: string }) {
  step.value++;

  poll.value.adminName = data.name;
  poll.value.adminEmail = data.email;

  try {
    const data = await $fetch("/api");
    console.log(data);

    router.push({ name: "poll-admin-id", params: { id: "xxx" } });
  } catch (e) {
    console.error(e);
  }
}

const stepperRef = ref<HTMLInputElement>();
watch(step, () => {
  stepperRef.value?.focus();
});
</script>

<template>
  <h1>Nouveau sondage</h1>

  <p ref="stepperRef" tabindex="-1">
    Étape {{ step + 1 }} sur {{ steps.length }} : {{ steps[step] }}
  </p>

  <hr />

  <TitleAndDescription v-if="step === 0" @submit="submitTitleAndDescription" />
  <Choices v-if="step === 1" @submit="submitChoices" @previous="step--" />
  <Settings v-if="step === 2" @submit="submitSettings" @previous="step--" />
  <AdminInfos v-if="step === 3" @submit="submitAdminInfos" @previous="step--" />

  <hr />

  <pre><code>{{ JSON.stringify(poll, null, 2) }}</code></pre>
</template>
