<script setup lang="ts">
import type { Respondent } from "~/types/poll";
import { Response } from "~/types/poll";

const props = defineProps<{
  choices: { id: number; date: string }[];
  respondents?: Respondent[];
}>();

function getRespondentsForDate(choiceId: number) {
  if (!props.respondents?.length) {
    return [];
  }

  const res: { name: string; value: string }[] = [];

  props.respondents.forEach((respondent) => {
    return respondent.responses.forEach((response) => {
      if (
        response.choiceId === choiceId &&
        [Response.YES, Response.MAYBE].includes(response.value)
      ) {
        res.push({ name: respondent.name, value: response.value });
      }
    });
  });

  return res;
}

// Get highest number of votes for a choice
const mostVotesValue = computed(() => {
  const res = props.choices.map((c) => {
    return {
      id: c.id,
      responses: getRespondentsForDate(c.id).length,
    };
  });

  const sortedRes = res.sort((a, b) => {
    return b.responses - a.responses;
  });

  return sortedRes[0].responses;
});
</script>

<template>
  <ul>
    <li v-for="choice in choices" :key="choice.id">
      <p>
        {{ formatDate(choice.date) }}
        {{ $t("pages.poll.admin.id.responses.at") }}
        {{ formatTime(choice.date) }} ({{
          getRespondentsForDate(choice.id).length
        }}
        {{
          pluralize(
            $t("pages.poll.admin.id.responses.vote"),
            $t("pages.poll.admin.id.responses.votes"),
            getRespondentsForDate(choice.id).length,
          )
        }})

        <mark
          v-if="
            mostVotesValue === getRespondentsForDate(choice.id).length &&
            !!mostVotesValue
          "
        >
          {{ $t("pages.poll.admin.id.responses.bestChoice") }}
        </mark>
      </p>

      <ul>
        <li
          v-for="(respondent, i) in getRespondentsForDate(choice.id)"
          :key="i"
        >
          {{ respondent.name }}
          <template v-if="respondent.value === Response.MAYBE">
            {{ $t("pages.poll.admin.id.responses.maybe") }}
          </template>
        </li>
      </ul>
    </li>
  </ul>
</template>
