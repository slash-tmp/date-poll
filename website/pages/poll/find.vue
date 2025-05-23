<script setup lang="ts">
import Alert from "~/components/Alert.vue";
import Input from "~/components/Input.vue";
import PageMeta from "~/components/PageMeta.vue";

const { setToast } = useToast();
const { t } = useI18n();

const email = ref("");
const recipientEmail = ref("");

const isLoading = ref(false);

async function submit() {
  isLoading.value = true;

  try {
    await findPoll(email.value);
    recipientEmail.value = email.value;
    showSuccessAlert.value = true;
    await nextTick();
    alertRef.value?.focus();
    email.value = "";
  } catch (e) {
    setToast({
      title: t("pages.poll.find.errorAlert"),
      type: "error",
      isClosable: true,
    });
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}

const showSuccessAlert = ref(false);
const alertRef = ref<InstanceType<typeof Alert>>();
const headingRef = ref<HTMLHeadingElement>();

async function closeAlert() {
  showSuccessAlert.value = false;
  await nextTick();
  headingRef.value?.focus();
  recipientEmail.value = "";
}
</script>

<template>
  <PageMeta :title="$t('pages.poll.find.meta.title')" />

  <h1 ref="headingRef" tabindex="-1">{{ $t("pages.poll.find.title") }}</h1>

  <p class="intro">{{ $t("pages.poll.find.description") }}</p>

  <Alert
    v-if="showSuccessAlert"
    ref="alertRef"
    class="find-alert"
    is-closable
    type="success"
    @close="closeAlert"
  >
    {{
      $t("pages.poll.find.alert.description", {
        emailAddress: recipientEmail,
      })
    }}
  </Alert>

  <form class="form" @submit.prevent="submit">
    <Input
      :id="email"
      v-model="email"
      type="email"
      required
      :label="$t('pages.poll.find.form.label')"
    />

    <Button class="submit" type="submit" :is-loading="isLoading">
      {{ $t("pages.poll.find.form.submit") }}
    </Button>
  </form>
</template>

<style scoped>
.intro {
  margin-block-end: 2rem;
}

.find-alert {
  margin-block-end: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;
}

.submit {
  align-self: start;
}
</style>
