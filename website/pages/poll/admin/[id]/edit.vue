<script setup lang="ts">
import EditPollForm from "~/components/poll/admin/EditPollForm.vue";
import type { AdminPollApiResponse, UpdatePollFormData } from "~/types/poll";

const route = useRoute();
const id = route.params.id;

// Fetch poll
const { data: poll } = await useFetch<AdminPollApiResponse>(
  `/api/polls/admin/${id}`,
);

// Submit edit
const router = useRouter();

function submitEditForm(data: UpdatePollFormData) {
  try {
    if (poll.value) {
      updatePoll(poll.value.adminUid, data);
      // TODO: handle redirect with state
      router.push({ name: "poll-admin-id" });
    }
  } catch (e) {
    // TODO: handle error with toast
    console.error(e);
  }
}
</script>

<template>
  <NuxtLink :to="{ name: 'poll-admin-id' }">Retour au sondage</NuxtLink>

  <h1>Modifier le sondage</h1>

  <EditPollForm
    v-if="poll"
    :default-form-data="poll"
    @submit="submitEditForm"
  />

  <hr />
  <pre><code>{{ JSON.stringify(poll, null, 2) }}</code></pre>
</template>
