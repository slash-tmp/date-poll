<script setup lang="ts">
import { groupBy } from "lodash";

import Button from "~/components/Button.vue";
import Input from "~/components/Input.vue";
import Radio from "~/components/Radio.vue";
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
const attendances = ref(
  props.choices.map((c) => {
    return {
      id: c.id,
      attendance: undefined,
    };
  }),
);

type RespondentsPerChoice = {
  date: string;
  times: {
    id: number;
    time: string;
    respondents?: {
      name: string;
      value?: string;
    }[];
  }[];
};

const choicesWithRespondents = computed((): RespondentsPerChoice[] => {
  return Object.entries(
    groupBy(props.choices, (item) => item.date.split("T")[0]),
  ).map(([date, choices]) => {
    return {
      date: formatDate(date),
      times: choices.map((c) => {
        return {
          id: c.id,
          time: formatTime(c.date),
          respondents: props.respondents
            ?.filter((r) => {
              const response = r.responses.find(
                (r) => r.choiceId === c.id,
              )?.value;

              return response === Response.YES || response === Response.MAYBE;
            })
            .map((r) => {
              return {
                name: r.name,
                value: r.responses.find((r) => r.choiceId === c.id)?.value,
              };
            }),
        };
      }),
    };
  });
});

// Get the highest number of votes for a choice
// const maxVotesValue = computed(() => {
//   return Math.max(
//     ...choicesWithRespondents.value
//       .flatMap(({ times }) => times)
//       .map(({ respondents }) => respondents?.length || 0),
//   );
// });

function submitVote() {
  emit("submit", {
    respondentName: name.value,
    responses: attendances.value.map((a) => ({
      choiceId: a.id,
      value: a.attendance ?? Response.NO,
    })),
  });
}
</script>

<template>
  <form @submit.prevent="submitVote">
    <Input
      id="name"
      v-model="name"
      :label="$t('pages.poll.id.form.name')"
      type="text"
      required
      class="name-input"
    />

    <ul class="dates">
      <li
        v-for="choice in choicesWithRespondents"
        :key="choice.date"
        class="date"
      >
        <p class="date-title">{{ choice.date }}</p>
        <ul class="times">
          <li v-for="(time, j) in choice.times" :key="j" class="time">
            <fieldset>
              <legend class="time-header">
                <span class="visually-hidden">{{ choice.date }}</span>
                {{ time.time }}
              </legend>
              <div class="radios">
                <Radio
                  v-for="option in [Response.YES, Response.MAYBE, Response.NO]"
                  :id="`choice-${time.time}-${option}`"
                  :key="`${option}-${time.time}`"
                  v-model="
                    attendances.find((a) => a.id === time.id)!.attendance
                  "
                  :value="option"
                  type="radio"
                  :name="`choice-${time.time}`"
                  required
                  :label="
                    $t(`pages.poll.id.form.choices.${option.toLowerCase()}`)
                  "
                />
              </div>
            </fieldset>
            <ul v-if="time.respondents" class="respondents">
              <li
                v-for="(respondent, i) in time.respondents"
                :key="i"
                class="respondent"
              >
                {{ respondent.name }}
                <span v-if="respondent.value === Response.MAYBE">
                  {{ $t("pages.poll.id.form.maybe") }}
                </span>
              </li>

              <!-- <li
                v-if="
                  time.presence &&
                  [Response.YES, Response.MAYBE].includes(time.presence)
                "
              >
                <template v-if="name">
                  <template v-if="time.presence === Response.MAYBE">
                    {{ $t("pages.poll.id.form.withName.maybe", { name }) }}
                  </template>
                  <template v-else>
                    {{ $t("pages.poll.id.form.withName.yes", { name }) }}
                  </template>
                </template>
                <template v-else>
                  <template v-if="time.presence === Response.MAYBE">
                    {{ $t("pages.poll.id.form.withoutName.maybe") }}
                  </template>
                  <template v-else>
                    {{ $t("pages.poll.id.form.withoutName.yes") }}
                  </template>
                </template>
              </li> -->
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <Button type="submit" class="submit-button">
      {{ $t("pages.poll.id.form.submit") }}
    </Button>
  </form>
</template>

<style scoped>
.name-input {
  max-width: 22rem;
  margin-block-end: 2rem;
}

.dates {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-block-end: 2rem;
}

.date {
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  background-color: var(--color-primary-lighter);
  padding: 1rem;
}

.date-title {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-2);
  margin-block-end: 1rem;
}

.times {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

fieldset {
  border: none;
  padding: 0;
}

.time {
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  background-color: var(--color-white);
  padding: 1rem;
  position: relative;
}

.radios {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.best-choice {
  align-items: center;
  display: flex;
  gap: 0.25rem;
  font-size: var(--font-size-0);
  border-radius: var(--border-radius-base);
  padding-inline: 0.25rem;
  position: absolute;
  inset-block-end: 100%;
  inset-inline-start: 1rem;
  transform: translateY(50%);

  svg {
    width: 1rem;
  }
}

.time-header {
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.respondents {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block-start: 0.5rem;
}

.respondent {
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-success);
  background-color: var(--color-success-light);
  padding: 0.25rem 0.5rem;
}

.submit-button {
  display: block;
  margin-inline-start: auto;
}
</style>
