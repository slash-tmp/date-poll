<script setup lang="ts">
import Button from "~/components/Button.vue";
import Input from "~/components/Input.vue";
import useToast from "~/composables/useToast";

const props = defineProps<{
  publicUid: string;
}>();

// Copy share link
const config = useRuntimeConfig();
const shareUrl = computed(() => {
  return `${config.public.baseUrl}/poll/${props.publicUid}`;
});

const { setToast } = useToast();
const { t } = useI18n();

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value);

    setToast({
      title: t("pages.poll.admin.id.share.successAlert"),
      type: "success",
      timeout: 5000,
    });
  } catch (e) {
    setToast({
      title: t("pages.poll.admin.id.share.errorAlert"),
      type: "error",
      isClosable: true,
    });
  }
}
</script>

<template>
  <div class="share">
    <h2 class="h3">{{ $t("pages.poll.admin.id.share.title") }}</h2>
    <p class="description">
      {{ $t("pages.poll.admin.id.share.description") }}
    </p>

    <Input
      id="share-link"
      v-model="shareUrl"
      class="copy-input"
      type="url"
      :label="$t('pages.poll.admin.id.share.label')"
      readonly
    />

    <div class="copy" aria-live="polite" role="alert">
      <Button @click="copyLink">
        {{ $t("pages.poll.admin.id.share.button") }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.share {
  background-color: var(--color-primary-lighter);
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-grey-3);
  padding: 1rem;
}

.description {
  margin-block-end: 1rem;
}

.copy-input {
  margin-block-end: 1rem;
}

.copy {
  display: flex;
  align-items: start;
  gap: 1rem;
}
</style>
