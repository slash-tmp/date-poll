<script setup lang="ts">
import { groupBy } from "lodash-es";

import Star from "~/components/icons/Star.vue";
import { type Respondent, Response } from "~/types/poll";

const props = defineProps<{
  choices: { id: number; date: string }[];
  respondents?: Respondent[];
}>();

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
    groupBy(props.choices, (item) => {
      return convertIsoDateToLocalDateString(item.date).slice(0, 10);
    }),
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

// Return ids of responses with the most votes
const maxVotesResponseIds = computed((): number[] => {
  const sortedResponses = choicesWithRespondents.value
    .flatMap(({ times }) => times)
    .filter((c) => c.respondents?.length)
    .map((c) => {
      return {
        id: c.id,
        values: c.respondents?.map((r) => {
          return r.value;
        }),
      };
    })
    .sort((a, b) => {
      // First sort by "YES" responses
      if (
        a.values.filter((v) => v === Response.YES).length >
        b.values.filter((v) => v === Response.YES).length
      ) {
        return 1;
      }

      // Then sort by responses length
      if (a.values.length > b.values.length) {
        return 1;
      }
    });

  // Get all responses matching first sorted one, if any.
  const lastSortedResponse = sortedResponses.at(-1);
  const lastMatchingResponses = sortedResponses.filter((s) => {
    return (
      s.values.length === lastSortedResponse.values.length &&
      s.values.filter((v) => v === Response.YES).length ===
        lastSortedResponse.values.filter((v) => v === Response.YES).length &&
      s.values.filter((v) => v === Response.MAYBE).length ===
        lastSortedResponse.values.filter((v) => v === Response.MAYBE).length
    );
  });

  return lastMatchingResponses.map((m) => m.id);
});
</script>

<template>
  <h2>{{ $t("pages.poll.admin.id.responses.title") }}</h2>

  <ul class="dates">
    <li
      v-for="choice in choicesWithRespondents"
      :key="choice.date"
      class="date"
    >
      <time class="date-title">{{ choice.date }}</time>
      <ul class="times">
        <li v-for="time in choice.times" :key="time.id" class="time">
          <mark
            v-if="maxVotesResponseIds.includes(time.id)"
            class="best-choice"
          >
            <Star />
            {{ $t("pages.poll.admin.id.responses.bestChoice") }}
          </mark>
          <div class="time-header">
            <time>{{ time.time }}</time>
            <p v-if="time.respondents">
              {{ time.respondents.length }}
              {{
                $t(
                  "pages.poll.admin.id.responses.vote",
                  time.respondents.length,
                )
              }}
            </p>
          </div>
          <ul v-if="time.respondents?.length" class="respondents">
            <li
              v-for="(respondent, i) in time.respondents"
              :key="i"
              class="respondent"
              :class="{ maybe: respondent.value === Response.MAYBE }"
              :data-cy="
                respondent.value === Response.MAYBE
                  ? 'respondent-maybe'
                  : 'respondent-yes'
              "
            >
              {{ respondent.name }}
              <template v-if="respondent.value === Response.MAYBE">
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

  @media (width < 30rem) {
    gap: 1rem;
  }
}

.date {
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  background-color: var(--color-primary-lighter);
  padding: 1rem;

  @media (width < 30rem) {
    padding: 0.5rem;
  }
}

.date-title {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-2);
  display: block;
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

  @media (width < 30rem) {
    padding: 0.5rem;
  }
}

.best-choice {
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  gap: 0.25rem;
  font-size: var(--font-size-0);
  border-radius: var(--border-radius-base);
  padding: 0.125rem 0.5rem;
  position: absolute;
  inset-block-end: 100%;
  inset-inline-start: 1rem;
  transform: translateY(50%);

  @media (width < 30rem) {
    transform: translateY(40%);
  }

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

  &.maybe {
    border-style: dashed;
    background-color: var(--color-white);
  }
}
</style>
