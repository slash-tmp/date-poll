<script setup lang="ts">
import type { AdminPollApiResponse, UpdatePollFormData } from "~/types/poll";

const props = defineProps<{
  defaultFormData: AdminPollApiResponse;
}>();

const emit = defineEmits<{
  (e: "submit", payload: UpdatePollFormData): void;
}>();

const poll = ref({
  ...props.defaultFormData,
  choices: props.defaultFormData.choices.map((c) => {
    return {
      date: c.date.slice(0, 10),
      time: c.date.slice(11, 16),
      existingDate: true,
    };
  }),
  endDate: props.defaultFormData.endDate?.slice(0, 10) || null,
});

// Choices management
function addChoice() {
  poll.value.choices.push({ date: "", time: "", existingDate: false });
}

function deleteChoice(index: number) {
  poll.value.choices = poll.value.choices.filter((_, i) => i !== index);
}

// Submission
async function submitForm() {
  const formData = {
    title: poll.value.title,
    description: poll.value.description,
    choices: poll.value.choices.map((c) => ({ date: c.date, time: c.time })),
    hideVotes: poll.value.hideVotes,
    endDate: poll.value.endDate,
    notifyOnResponse: poll.value.notifyOnResponse,
    adminName: poll.value.adminName,
    adminEmail: poll.value.adminEmail,
  };

  emit("submit", formData);
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <legend>
        {{ $t("pages.poll.admin.edit.titleAndDescription.stepTitle") }}
      </legend>

      <div>
        <label for="title">{{
          $t("pages.poll.admin.edit.titleAndDescription.title.label")
        }}</label>
        <br />
        <input id="title" v-model="poll.title" type="text" required />
      </div>

      <div>
        <label for="description">{{
          $t("pages.poll.admin.edit.titleAndDescription.description.label")
        }}</label>
        <br />
        <textarea id="description" v-model="poll.description" />
      </div>
    </fieldset>

    <fieldset>
      <legend>
        {{ $t("pages.poll.admin.edit.choices.stepTitle") }}
        <br />
        <span>{{ $t("pages.poll.admin.edit.choices.stepSubtitle") }}</span>
      </legend>

      <template v-for="(choice, i) in poll.choices" :key="choice">
        <div>
          <label :for="`choice-date-${i}`">{{
            $t("pages.poll.admin.edit.choices.choice.dateLabel", {
              index: i + 1,
            })
          }}</label>
          <input
            :id="`choice-date-${i}`"
            v-model="choice.date"
            type="date"
            required
            :disabled="choice.existingDate"
          />
        </div>

        <div>
          <label :for="`choice-time-${i}`">{{
            $t("pages.poll.admin.edit.choices.choice.timeLabel", {
              index: i + 1,
            })
          }}</label>
          <input
            :id="`choice-time-${i}`"
            v-model="choice.time"
            type="time"
            required
            :disabled="choice.existingDate"
          />
        </div>

        <button
          type="button"
          :disabled="poll.choices.length === 1"
          @click="deleteChoice(i)"
        >
          {{ $t("pages.poll.admin.edit.choices.choice.deleteChoice") }}
        </button>
        <br />
        <br />
      </template>

      <button type="button" @click="addChoice">
        {{ $t("pages.poll.admin.edit.choices.addNewChoice") }}
      </button>
    </fieldset>

    <fieldset>
      <legend>{{ $t("pages.poll.admin.edit.settings.stepTitle") }}</legend>

      <div>
        <label for="hide-votes">{{
          $t("pages.poll.admin.edit.settings.hideVotes.label")
        }}</label>
        <input id="hide-votes" v-model="poll.hideVotes" type="checkbox" />
      </div>

      <div>
        <label for="end-date">{{
          $t("pages.poll.admin.edit.settings.endDate.label")
        }}</label>
        <input id="end-date" v-model="poll.endDate" type="date" />
      </div>

      <div>
        <label for="notify-on-response">
          {{ $t("pages.poll.admin.edit.settings.notifyOnResponse.label") }}
        </label>
        <input
          id="notify-on-response"
          v-model="poll.notifyOnResponse"
          type="checkbox"
        />
      </div>
    </fieldset>

    <fieldset>
      <legend>{{ $t("pages.poll.admin.edit.adminInfos.stepTitle") }}</legend>

      <div>
        <label for="name">{{
          $t("pages.poll.admin.edit.adminInfos.name.label")
        }}</label>
        <br />
        <span>{{ $t("pages.poll.admin.edit.adminInfos.name.hint") }}</span>
        <br />
        <input id="name" v-model="poll.adminName" type="text" />
      </div>

      <br />
      <br />

      <div>
        <label for="email">{{
          $t("pages.poll.admin.edit.adminInfos.email.label")
        }}</label>
        <br />
        <span>{{ $t("pages.poll.admin.edit.adminInfos.email.hint") }}</span>
        <br />
        <input id="email" v-model="poll.adminEmail" type="email" disabled />
      </div>
    </fieldset>

    <button type="submit">{{ $t("pages.poll.admin.edit.submit") }}</button>
  </form>
</template>
