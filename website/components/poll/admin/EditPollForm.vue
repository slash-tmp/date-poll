<script setup lang="ts">
import Button from "~/components/Button.vue";
import Checkbox from "~/components/Checkbox.vue";
import Input from "~/components/Input.vue";
import Textarea from "~/components/Textarea.vue";
import type { UpdatePollFormData } from "~/types/poll";

const props = defineProps<{
  adminEmail: string;
  defaultFormData: UpdatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: UpdatePollFormData): void;
}>();

const poll = ref(props.defaultFormData);
const adminEmailValue = props.adminEmail;

// Choices management
const dateRefs = ref<HTMLInputElement[]>([]);

async function addChoice() {
  poll.value.choices.push({ id: undefined, date: "", time: "" });
  await nextTick();
  dateRefs.value[poll.value.choices.length - 1].focus();
}

async function deleteChoice(index: number) {
  poll.value.choices = poll.value.choices.filter((_, i) => i !== index);
  await nextTick();
  dateRefs.value[index - 1].focus();
}

// Submission
async function submitForm() {
  const formData = {
    title: poll.value.title,
    description: poll.value.description,
    choices: poll.value.choices.map((c) => ({
      ...(c.id ? { id: c.id } : {}),
      date: c.date,
      time: c.time,
    })),
    hideVotes: poll.value.hideVotes,
    endDate: poll.value.endDate,
    notifyOnResponse: poll.value.notifyOnResponse,
    adminName: poll.value.adminName,
  };

  emit("submit", formData);
}

// Delete end date
const endDateRef = ref<InstanceType<typeof Input>>();

async function deleteEndDate() {
  poll.value.endDate = null;
  await nextTick();
  endDateRef.value?.focus();
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <legend>
        {{ $t("pages.poll.admin.edit.titleAndDescription.stepTitle") }}
      </legend>

      <Input
        id="title"
        v-model="poll.title"
        class="name"
        :label="$t('pages.poll.admin.edit.titleAndDescription.title.label')"
      />

      <Textarea
        id="description"
        v-model="poll.description"
        class="description"
        :rows="6"
        :label="
          $t('pages.poll.admin.edit.titleAndDescription.description.label')
        "
      />
    </fieldset>

    <fieldset>
      <legend aria-describedby="choices-description">
        {{ $t("pages.poll.admin.edit.choices.stepTitle") }}
      </legend>

      <p id="choices-description">
        {{ $t("pages.poll.admin.edit.choices.stepSubtitle") }}
      </p>

      <div v-for="(choice, i) in poll.choices" :key="i" class="choice">
        <Input
          :id="`choice-date-${i}`"
          ref="dateRefs"
          v-model="choice.date"
          type="date"
          required
          :label="
            $t('pages.poll.admin.edit.choices.choice.dateLabel', {
              index: i + 1,
            })
          "
          :disabled="!!choice.id"
        />

        <Input
          :id="`choice-time-${i}`"
          v-model="choice.time"
          type="time"
          required
          :label="
            $t('pages.poll.admin.edit.choices.choice.timeLabel', {
              index: i + 1,
            })
          "
          :disabled="!!choice.id"
        />

        <Button
          v-if="poll.choices.length > 1"
          variant="secondary"
          type="button"
          @click="deleteChoice(i)"
        >
          {{ $t("pages.poll.admin.edit.choices.choice.deleteChoice") }}
        </Button>
      </div>

      <Button
        class="add-choice"
        variant="secondary"
        type="button"
        @click="addChoice"
      >
        {{ $t("pages.poll.admin.edit.choices.addNewChoice") }}
      </Button>
    </fieldset>

    <fieldset>
      <legend>{{ $t("pages.poll.admin.edit.settings.stepTitle") }}</legend>

      <div class="end-date-wrapper">
        <Input
          id="end-date"
          ref="endDateRef"
          v-model="poll.endDate"
          class="end-date"
          type="date"
          :label="$t('pages.poll.admin.edit.settings.endDate.label')"
          :help="$t('pages.poll.admin.edit.settings.endDate.help')"
        />

        <Button v-if="poll.endDate" variant="secondary" @click="deleteEndDate">
          {{ $t("pages.poll.admin.edit.settings.endDate.delete") }}
        </Button>
      </div>

      <Checkbox
        id="hide-votes"
        v-model="poll.hideVotes"
        :label="$t('pages.poll.admin.edit.settings.hideVotes.label')"
        :help="$t('pages.poll.admin.edit.settings.hideVotes.help')"
      />

      <Checkbox
        id="notify-on-response"
        v-model="poll.notifyOnResponse"
        :label="$t('pages.poll.admin.edit.settings.notifyOnResponse.label')"
        :help="$t('pages.poll.admin.edit.settings.notifyOnResponse.help')"
      />
    </fieldset>

    <fieldset>
      <legend>
        {{ $t("pages.poll.admin.edit.adminInfos.stepTitle") }}
      </legend>

      <Input
        id="name"
        v-model="poll.adminName"
        class="admin-name"
        type="text"
        :label="$t('pages.poll.admin.edit.adminInfos.name.label')"
        :help="$t('pages.poll.admin.edit.adminInfos.name.hint')"
      />

      <Input
        id="email"
        v-model="adminEmailValue"
        class="admin-email"
        type="email"
        :label="$t('pages.poll.admin.edit.adminInfos.email.label')"
        disabled
      />
    </fieldset>

    <Button type="submit">{{ $t("pages.poll.admin.edit.submit") }}</Button>
  </form>
</template>

<style scoped>
fieldset {
  border: 1px solid var(--color-grey-3);
  border-radius: var(--border-radius-base);
  margin-block-end: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  legend {
    font-size: var(--font-size-2);
    font-weight: var(--font-weight-semibold);
    padding-inline: 0.25rem;
  }
}

.name,
.description,
.admin-name,
.admin-email {
  max-width: 30rem;
}

.choice {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-block-end: 1rem;

  @media (width < 50rem) {
    grid-template-columns: 1fr;
  }
}

.add-choice {
  align-self: start;
}

.end-date-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 1rem;
}

.end-date {
  max-width: 22rem;
}
</style>
