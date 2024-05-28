<script setup lang="ts">
import Actions from "~/components/poll/admin/Actions.vue";
import Intro from "~/components/poll/admin/Intro.vue";
import Responses from "~/components/poll/admin/Responses.vue";
import Share from "~/components/poll/admin/Share.vue";
import type { AdminPollApiResponse } from "~/types/poll";
import { Response } from "~/types/poll";

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// Display poll update confirmation alert
const updatedPollAlertRef = ref<HTMLDivElement>();
const updatedPoll = ref(false);

onMounted(async () => {
  if (history.state.updatedPoll) {
    updatedPoll.value = history.state.updatedPoll;
    await nextTick();
    updatedPollAlertRef.value?.focus();

    // update "poll" value
    refresh();
  }
});

const headingRef = ref<HTMLHeadingElement>();
async function hideUpdatedPollAlert() {
  updatedPoll.value = false;
  await nextTick();
  headingRef.value?.focus();
}

// Fetch poll
const { data: poll, refresh } = await useFetch<AdminPollApiResponse>(
  `/api/polls/admin/${id}`,
);

if (!poll.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("pages.poll.admin.id.error.404.title"),
    message: t("pages.poll.admin.id.error.404.description"),
  });
}

// Delete poll
async function confirmDelete() {
  try {
    if (poll.value) {
      await deletePoll(poll.value.adminUid);
      router.push({ name: "index", state: { deletedPoll: poll.value.title } });
    }
  } catch (e) {
    // TODO: handle error with toast
    console.error(e);
  }
}

// FIXME: temp data
const respondents = ref([
  {
    id: 0,
    name: "Anna",
    responses: [
      {
        id: 0,
        choiceId: 846,
        value: Response.YES,
      },
      {
        id: 1,
        choiceId: 847,
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
        choiceId: 846,
        value: Response.NO,
      },
      {
        id: 3,
        choiceId: 847,
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
        choiceId: 846,
        value: Response.NO,
      },
      {
        id: 5,
        choiceId: 847,
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
        choiceId: 846,
        value: Response.NO,
      },
      {
        id: 7,
        choiceId: 847,
        value: Response.YES,
      },
    ],
  },
]);
</script>

<template>
  <template v-if="poll">
    <h1 ref="headingRef" tabindex="-1">{{ poll.title }}</h1>

    <div
      v-if="updatedPoll"
      ref="updatedPollAlertRef"
      role="alert"
      tabindex="-1"
    >
      {{
        $t("pages.poll.admin.edit.updatedPollAlert.description", {
          title: poll.title,
        })
      }}

      <button @click="hideUpdatedPollAlert">
        {{ $t("pages.poll.admin.edit.updatedPollAlert.close") }}
      </button>
    </div>

    <Actions :title="poll.title" @delete="confirmDelete" />

    <div>
      <Intro
        :admin-name="poll.adminName"
        :description="poll.description"
        :created-at="poll.createdAt"
      />

      <Share :public-uid="poll.publicUid" />
    </div>
    <div>
      <h2>{{ $t("pages.poll.admin.id.responses.title") }}</h2>
      <Responses :choices="poll.choices" :respondents="respondents" />
    </div>
  </template>
</template>
