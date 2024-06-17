<script setup lang="ts">
import VotingForm from "~/components/poll/id/VotingForm.vue";

/**
 * TODO:
 * - fetch public poll (+ handle 404)
 * - poll is expired or deleted (show alert instead of voting form)
 * - confirmation page (after submit)
 * - i18n
 */

const poll = ref({
  title: "Anniversaire 6 ans",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae rem earum porro nesciunt voluptatum ab ad iure perspiciatis, neque quos commodi? Eligendi saepe amet illum impedit aut voluptate aliquid rerum.",
  choices: [
    { date: "2024-01-15-10:30", respondents: ["Anna"] },
    {
      date: "2024-02-15-14:00",
      respondents: ["Anna", "Benoît", "Jean-Jacques"],
    },
    { date: "2024-03-15-16:45", respondents: ["Paul"] },
    {
      id: 4,
      date: "2024-04-15-21:15",
      respondents: ["Anna", "Pierre-Alexandre"],
    },
  ],
  hideVotes: false,
  endDate: "2024-01-02",
  adminName: "Odette",
});

function submitVote() {
  console.log();
}
</script>

<template>
  <h1>{{ poll.title }}</h1>

  <p v-if="poll.description">{{ poll.description }}</p>

  <div>
    Vous avez été invité {{ poll.adminName ? `par ${poll.adminName}` : "" }} à
    répondre à ce sondage.
    <template v-if="poll.endDate"
      >Vous avez jusqu’au <time>{{ formatDate(poll.endDate) }}</time> pour y
      répondre.</template
    >
  </div>

  <br />
  <VotingForm :poll="poll" @submit="submitVote" />
</template>
