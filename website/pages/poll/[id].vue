<script setup lang="ts">
import VoteForm from "~/components/poll/id/VoteForm.vue";

/**
 * TODO:
 * - fetch public poll (+ handle 404)
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
  endDate: "2024-10-02",
  adminName: "Odette",
});

// Handle expired poll
const isExpired = computed(() => {
  if (!poll.value.endDate) {
    return false;
  }

  return new Date(poll.value.endDate) < new Date();
});

// Vote submission
const showConfirmation = ref(false);
function submitVote() {
  showConfirmation.value = true;
}
</script>

<template>
  <h1>{{ poll.title }}</h1>

  <p v-if="poll.description">{{ poll.description }}</p>

  <div v-if="isExpired">
    <p>
      {{ $t("pages.poll.id.isExpired") }}
    </p>
  </div>

  <template v-else>
    <p>
      <template v-if="poll.adminName">
        {{ $t("pages.poll.id.invitedBy", { adminName: poll.adminName }) }}
      </template>
      <template v-else>{{ $t("pages.poll.id.invited") }}</template>
      <i18n-t v-if="poll.endDate" keypath="pages.poll.id.expiredOn">
        <template #endDate>
          <time :datetime="poll.endDate">{{ formatDate(poll.endDate) }}</time>
        </template>
      </i18n-t>
    </p>
    <br />
    <div v-if="showConfirmation">
      <p>{{ $t("pages.poll.id.confirmation") }}</p>
    </div>
    <VoteForm v-else :poll="poll" @submit="submitVote" />
  </template>
</template>
