<script setup lang="ts">
import VoteForm from "~/components/poll/id/VoteForm.vue";
import { Response } from "~/types/poll";

/**
 * TODO:
 * - fetch public poll (+ handle 404)
 */

const poll = ref({
  title: "Anniversaire 6 ans",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae rem earum porro nesciunt voluptatum ab ad iure perspiciatis, neque quos commodi? Eligendi saepe amet illum impedit aut voluptate aliquid rerum.",
  choices: [
    { id: 0, date: "2024-07-27T14:57:00.000Z" },
    {
      id: 1,
      date: "2024-08-03T07:22:00.000Z",
    },
  ],
  hideVotes: false,
  endDate: "2024-07-20T20:00:00.000Z",
  adminName: "Odette",
  respondents: [
    {
      id: 0,
      name: "Anna",
      responses: [
        {
          id: 0,
          choiceId: 0,
          value: Response.YES,
        },
        {
          id: 1,
          choiceId: 1,
          value: Response.NO,
        },
      ],
    },
    {
      id: 1,
      name: "Alexandre",
      responses: [
        {
          id: 2,
          choiceId: 0,
          value: Response.MAYBE,
        },
        {
          id: 3,
          choiceId: 1,
          value: Response.YES,
        },
      ],
    },
    {
      id: 2,
      name: "Jean-Eduardo",
      responses: [
        {
          id: 4,
          choiceId: 0,
          value: Response.NO,
        },
        {
          id: 5,
          choiceId: 1,
          value: Response.MAYBE,
        },
      ],
    },
    {
      id: 3,
      name: "Véronique",
      responses: [
        {
          id: 6,
          choiceId: 0,
          value: Response.YES,
        },
        {
          id: 7,
          choiceId: 1,
          value: Response.YES,
        },
      ],
    },
  ],
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
const confirmationRef = ref<HTMLParagraphElement>();
async function submitVote() {
  showConfirmation.value = true;
  await nextTick();
  confirmationRef.value?.focus();
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
      <i18n-t v-if="poll.endDate" keypath="pages.poll.id.expireOn">
        <template #endDate>
          <time :datetime="poll.endDate">
            <strong>
              {{ formatDate(poll.endDate) }}
            </strong>
          </time>
        </template>
      </i18n-t>
    </p>
    <br />
    <p v-if="showConfirmation" ref="confirmationRef" tabindex="-1">
      {{ $t("pages.poll.id.confirmation") }}
    </p>
    <VoteForm v-else :poll="poll" @submit="submitVote" />
  </template>
</template>
