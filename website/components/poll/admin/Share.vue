<script setup lang="ts">
const props = defineProps<{
  publicUid: string;
}>();

// Copy share link
const config = useRuntimeConfig();
const shareUrl = computed(() => {
  return `${config.public.baseUrl}/poll/${props.publicUid}`;
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
</template>
