<script setup lang="ts">
import { groupBy } from "lodash";

import Star from "~/components/icons/Star.vue";
import { type Respondent, Response } from "~/types/poll";

const props = defineProps<{
  choices: { id: number; date: string }[];
  respondents?: Respondent[];
}>();

type RespondentsPerChoice = {
  date: string;
  times: {
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
const maxVotesValue = computed(() => {
  return Math.max(
    ...choicesWithRespondents.value
      .flatMap(({ times }) => times)
      .map(({ respondents }) => respondents?.length || 0),
  );
});
</script>

<template>
  <h2>{{ $t("pages.poll.admin.id.responses.title") }}</h2>

  <ul class="dates">
    <li v-for="(choice, i) in choicesWithRespondents" :key="i" class="date">
      <p class="date-title">{{ choice.date }}</p>
      <ul class="times">
        <li v-for="(time, j) in choice.times" :key="j" class="time">
          <mark
            v-if="maxVotesValue === time.respondents?.length"
            class="best-choice"
          >
            <Star />
            {{ $t("pages.poll.admin.id.responses.bestChoice") }}
          </mark>
          <div class="time-header">
            <p>{{ time.time }}</p>
            <p v-if="time.respondents">
              {{ time.respondents.length }}
              {{
                pluralize(
                  $t("pages.poll.admin.id.responses.vote"),
                  $t("pages.poll.admin.id.responses.votes"),
                  time.respondents.length,
                )
              }}
            </p>
          </div>
          <ul v-if="time.respondents?.length" class="respondents">
            <li
              v-for="(respondent, k) in time.respondents"
              :key="k"
              class="respondent"
              :data-cy="
                respondent.value === 'MAYBE'
                  ? 'respondent-maybe'
                  : 'respondent-yes'
              "
            >
              {{ respondent.name }}
              <template v-if="respondent.value === 'MAYBE'">
                {{ $t("pages.poll.admin.id.responses.maybe") }}
              </template>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.dates {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.time {
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  background-color: var(--color-white);
  padding: 1rem;
  position: relative;
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
</style>
