<script setup lang="ts">
import Actions from "~/components/poll/admin/Actions.vue";
import Intro from "~/components/poll/admin/Intro.vue";
import Share from "~/components/poll/admin/Share.vue";
import type { AdminPollApiResponse } from "~/types/poll";

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// Fetch poll
const { data: poll } = await useFetch<AdminPollApiResponse>(
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
</script>

<template>
  <template v-if="poll">
    <h1>{{ poll.title }}</h1>

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
    </div>
  </template>
</template>
