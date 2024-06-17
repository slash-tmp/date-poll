<script setup lang="ts">
import type { Respondent, VotePollFormData } from "~/types/poll";
import { Response } from "~/types/poll";

const props = defineProps<{
  choices: { id: number; date: string }[];
  respondents?: Respondent[];
}>();

const emit = defineEmits<{
  (e: "submit", payload: VotePollFormData): void;
}>();

const name = ref("");
const choices = ref(
  props.choices.map((c) => {
    return {
      ...c,
      presence: null,
    };
  }),
);

function getRespondentsForDate(choiceId: number) {
  if (!props.respondents?.length) {
    return [];
  }

  const res: { name: string; value: string }[] = [];

  props.respondents.forEach((respondent) => {
    return respondent.responses.forEach((response) => {
      if (
        response.choiceId === choiceId &&
        ["YES", "MAYBE"].includes(response.value)
      ) {
        res.push({ name: respondent.name, value: response.value });
      }
    });
  });

  return res;
}

function submitVote() {
  emit("submit", {
    respondentName: name.value,
    responses: choices.value.map((c) => ({
      choiceId: c.id,
      value: c.presence ?? Response.NO,
    })),
  });
}
</script>

<template>
  <form @submit.prevent="submitVote">
    <div>
      <label for="name">{{ $t("pages.poll.id.form.name") }}</label>
      <input id="name" v-model="name" type="text" required />
    </div>

    <ul>
      <li v-for="choice in choices" :key="choice.date">
        <fieldset>
          <legend>
            {{ formatDate(choice.date) }} {{ $t("pages.poll.id.form.at") }}
            {{ formatTime(choice.date) }}
          </legend>
          <template
            v-for="option in [Response.YES, Response.MAYBE, Response.NO]"
            :key="`${option}-${choice.date}`"
          >
            <label :for="`choice-${choice.date}-${option}`">
              {{ $t(`pages.poll.id.form.choices.${option.toLowerCase()}`) }}
            </label>
            <input
              :id="`choice-${choice.date}-${option}`"
              v-model="choice.presence"
              :value="option"
              type="radio"
              :name="`choice-${choice.date}`"
              required
            />
          </template>
        </fieldset>
        <ul v-if="respondents?.length">
          <li
            v-for="(respondent, i) in getRespondentsForDate(choice.id)"
            :key="i"
          >
            {{ respondent.name }}
            <span v-if="respondent.value === Response.MAYBE">
              {{ $t("pages.poll.id.form.maybe") }}
            </span>
          </li>

          <li
            v-if="
              choice.presence &&
              [Response.YES, Response.MAYBE].includes(choice.presence)
            "
          >
            <template v-if="name">
              <template v-if="choice.presence === Response.MAYBE">
                {{ $t("pages.poll.id.form.withName.maybe", { name }) }}
              </template>
              <template v-else>
                {{ $t("pages.poll.id.form.withName.yes", { name }) }}
              </template>
            </template>
            <template v-else>
              <template v-if="choice.presence === Response.MAYBE">
                {{ $t("pages.poll.id.form.withoutName.maybe") }}
              </template>
              <template v-else>
                {{ $t("pages.poll.id.form.withoutName.yes") }}
              </template>
            </template>
          </li>
        </ul>
      </li>
    </ul>

    <button type="submit">{{ $t("pages.poll.id.form.submit") }}</button>
  </form>
</template>
