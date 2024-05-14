<template>
  <h1>{{ $t("pages.index.title") }}</h1>

  <RouterLink :to="{ name: 'poll-new' }">{{
    $t("pages.index.newPoll")
  }}</RouterLink>
</template>
