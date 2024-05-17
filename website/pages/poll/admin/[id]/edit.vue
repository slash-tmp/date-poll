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

// Submit edit
function submitEditForm(data: UpdatePollFormData) {
  try {
    if (poll.value) {
      updatePoll(poll.value.adminUid, data);
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
    {{ $t("pages.poll.admin.edit.title") }}
  </NuxtLink>

  <h1>{{ $t("pages.poll.admin.edit.back") }}</h1>

  <EditPollForm
    v-if="poll"
    :default-form-data="poll"
    @submit="submitEditForm"
  />
</template>
