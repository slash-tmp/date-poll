<script setup lang="ts">
const email = ref("");

async function searchPoll() {
  showSuccessAlert.value = true;
  await nextTick();
  alertRef.value.focus();
}

const showSuccessAlert = ref(false);
const alertRef = ref<HTMLDivElement>();
const headingRef = ref<HTMLHeadingElement>();

async function closeAlert() {
  showSuccessAlert.value = false;
  await nextTick();
  headingRef.value.focus();
}
</script>

<template>
  <h1 ref="headingRef" tabindex="-1">{{ $t("pages.poll.find.title") }}</h1>

  <p>{{ $t("pages.poll.find.description") }}</p>

  <div ref="alertRef" aria-live="polite" role="alert" tabindex="-1">
    <template v-if="showSuccessAlert">
      <p>
        {{ $t("pages.poll.find.alert.description", { emailAddress: email }) }}
      </p>
      <button type="button" @click="closeAlert">
        {{ $t("pages.poll.find.alert.close") }}
      </button>
    </template>
  </div>

  <form @submit.prevent="searchPoll">
    <div>
      <label for="email">{{ $t("pages.poll.find.form.label") }}</label>
      <input id="email" v-model="email" type="email" required />
    </div>

    <button type="submit">{{ $t("pages.poll.find.form.submit") }}</button>
  </form>
</template>
