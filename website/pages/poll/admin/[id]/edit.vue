<script setup lang="ts">
import EditPollForm from "~/components/poll/admin/EditPollForm.vue";
import type { AdminPollApiResponse, UpdatePollFormData } from "~/types/poll";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

// Fetch poll
const { data: poll } = await useFetch<AdminPollApiResponse>(
  `/api/polls/admin/${id}`,
);

const defaultFormData = computed(() => {
  return poll.value
    ? {
        title: poll.value.title,
        description: poll.value.description,
        choices: poll.value.choices
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
          )
          .map((c) => ({
            ...(c.id ? { id: c.id } : {}),
            date: toLocalDateString(c.date).substring(0, 10),
            time: toLocalDateString(c.date).substring(11),
          })),
        hideVotes: poll.value.hideVotes,
        endDate: poll.value.endDate
          ? toLocalDateString(poll.value.endDate).substring(0, 10)
          : null,
        notifyOnResponse: poll.value.notifyOnResponse,
        adminName: poll.value.adminName,
      }
    : null;
});

// Submit edit
async function submitEditForm(data: UpdatePollFormData) {
  try {
    if (poll.value) {
      await updatePoll(poll.value.adminUid, data);
      router.push({ name: "poll-admin-id", state: { updatedPoll: true } });
    }
  } catch (e) {
    // TODO: handle error with toast
    console.error(e);
  }
}
</script>

<template>
  <NuxtLink :to="{ name: 'poll-admin-id' }">
    {{ $t("pages.poll.admin.edit.back") }}
  </NuxtLink>

  <h1>{{ $t("pages.poll.admin.edit.title") }}</h1>

  <EditPollForm
    v-if="poll && defaultFormData"
    :admin-email="poll.adminEmail"
    :default-form-data="defaultFormData"
    @submit="submitEditForm"
  />
</template>
