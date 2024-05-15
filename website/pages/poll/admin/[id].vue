<script setup lang="ts">
const route = useRoute();

const id = route.params.id;

const { data: poll } = await useFetch(`/api/polls/admin/${id}`);

if (!poll.value) {
  throw createError({
    statusCode: 404,
    // FIXME: i18n
    statusMessage: "Poll not found",
  });
}
</script>

<template>
  <h1>{{ $t("pages.poll.admin.id.title", { id }) }}</h1>

  <pre><code>{{ JSON.stringify(poll, null, 2) }}</code></pre>
</template>
