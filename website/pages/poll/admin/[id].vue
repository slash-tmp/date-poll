<script setup lang="ts">
import type { AdminPoll } from "~/types/poll";

const { t } = useI18n();

const route = useRoute();
const id = route.params.id;

// Fetch poll
const { data: poll } = await useFetch<AdminPoll>(`/api/polls/admin/${id}`);

if (!poll.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t("pages.poll.admin.id.error.404.title"),
    message: t("pages.poll.admin.id.error.404.description"),
  });
}

// TODO: Delete poll
function deletePoll() {
  console.log("delete poll");
}

// Copy share link
const shareUrl = computed(() => {
  return `/poll/${poll.value?.publicUid}`;
});

const shareLinkInputRef = ref<HTMLInputElement>();
const showCopySuccess = ref(false);

async function copyLink() {
  await navigator.clipboard.writeText(shareUrl.value);
  showCopySuccess.value = true;

  setTimeout(() => {
    showCopySuccess.value = false;
  }, 5000);
}
</script>

<template>
  <template v-if="poll">
    <h1>{{ poll.title }}</h1>

    <div>
      <NuxtLink to="#">{{ $t("pages.poll.admin.id.meta.edit") }}</NuxtLink>
      <br />
      <button @click="deletePoll">
        {{ $t("pages.poll.admin.id.meta.delete") }}
      </button>
    </div>

    <div>
      <ul>
        <li v-if="poll.adminName">
          {{ $t("pages.poll.admin.id.meta.createdBy") }}
          <strong>{{ poll.adminName }}</strong>
        </li>
        <!-- TODO: add creation date -->
        <li>
          {{ $t("pages.poll.admin.id.meta.createdAt") }}
          <strong>{{ "XX/XX/XXXX" }}</strong>
        </li>
        <li v-if="poll.description">{{ poll.description }}</li>
      </ul>

      <div>
        <h2>{{ $t("pages.poll.admin.id.share.title") }}</h2>
        <p>
          {{ $t("pages.poll.admin.id.share.description") }}
        </p>

        <div aria-live="polite" role="alert">
          <div>
            <label for="share-link">{{
              $t("pages.poll.admin.id.share.label")
            }}</label>
            <input
              id="share-link"
              ref="shareLinkInputRef"
              type="url"
              readonly
              :value="shareUrl"
            />
          </div>
          <button @click="copyLink">
            {{ $t("pages.poll.admin.id.share.button") }}
          </button>
          <p v-if="showCopySuccess">
            {{ $t("pages.poll.admin.id.share.successAlert") }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <h2>{{ $t("pages.poll.admin.id.responses.title") }}</h2>
    </div>
  </template>
</template>
