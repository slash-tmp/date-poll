<script setup lang="ts">
import PageMeta from "~/components/PageMeta.vue";
import EditPollForm from "~/components/poll/admin/EditPollForm.vue";
import useToast from "~/composables/useToast";
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
            date: convertIsoDateToLocalDateString(c.date).substring(0, 10),
            time: convertIsoDateToLocalDateString(c.date).substring(11),
          })),
        hideVotes: poll.value.hideVotes,
        endDate: poll.value.endDate
          ? convertIsoDateToLocalDateString(poll.value.endDate).substring(0, 10)
          : null,
        notifyOnResponse: poll.value.notifyOnResponse,
        adminName: poll.value.adminName,
      }
    : null;
});

// Submit edit
const { setToast } = useToast();
const { t } = useI18n();

const isLoading = ref(false);

async function submitEditForm(data: UpdatePollFormData) {
  isLoading.value = true;

  try {
    if (poll.value) {
      await updatePoll(poll.value.adminUid, data);
      router.push({ name: "poll-admin-id", state: { updatedPoll: true } });
    }
  } catch (e) {
    isLoading.value = false;
    setToast({
      title: t("pages.poll.admin.edit.errorAlert"),
      type: "error",
      isClosable: true,
    });
    console.error(e);
  }
}
</script>

<template>
  <PageMeta
    :title="
      $t('pages.poll.admin.edit.meta.title', {
        pollName: poll?.title,
      })
    "
  />

  <Button variant="tertiary" :to="{ name: 'poll-admin-id' }" class="back-link">
    {{ $t("pages.poll.admin.edit.back") }}
  </Button>

  <h1>{{ $t("pages.poll.admin.edit.title") }}</h1>

  <EditPollForm
    v-if="poll && defaultFormData"
    :admin-email="poll.adminEmail"
    :default-form-data="defaultFormData"
    :is-loading="isLoading"
    @submit="submitEditForm"
  />
</template>

<style scoped>
.back-link {
  margin-block-end: 1rem;
}
</style>
