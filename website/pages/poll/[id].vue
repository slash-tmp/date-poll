<script setup lang="ts">
import VoteForm from "~/components/poll/id/VoteForm.vue";
import { type PollApiResponse, type VotePollFormData } from "~/types/poll";

const { t } = useI18n();

const route = useRoute();
const id = route.params.id;

// Fetch poll
const { data: poll } = await useFetch<PollApiResponse>(`/api/polls/${id}`);

if (!poll.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("pages.poll.id.error.404.title"),
    message: t("pages.poll.id.error.404.description"),
  });
}

// Handle expired poll
const isExpired = computed(() => {
  if (!poll.value?.endDate) {
    return false;
  }

  return new Date(poll.value.endDate) < new Date();
});

// Vote submission
const showConfirmation = ref(false);
const confirmationRef = ref<HTMLParagraphElement>();

async function submitVote(payload: VotePollFormData) {
  try {
    if (poll.value) {
      await votePoll(poll.value.publicUid, payload);
      showConfirmation.value = true;
      await nextTick();
      confirmationRef.value?.focus();
    }
  } catch (e) {
    // TODO: handle error with toast
    console.error(e);
  }
}
</script>

<template>
  <template v-if="poll">
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
      <VoteForm
        v-else
        :hide-votes="poll.hideVotes"
        :choices="poll.choices"
        :respondents="poll.respondents"
        @submit="submitVote"
      />
    </template>
  </template>
</template>
