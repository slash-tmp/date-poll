<script setup lang="ts">
const { data, error, status } = useFetch("/api");
</script>

<template>
  <h1>{{ $t("hello.world") }}</h1>

  <div>
    <p>Data</p>
    <pre>
      <code>{{ JSON.stringify(data, null, 2) }}</code>
    </pre>

    <p>Error</p>
    <pre>
      <code>{{ JSON.stringify(error, null, 2) }}</code>
    </pre>

    <p>Status</p>
    <pre>
      <code>{{ JSON.stringify(status, null, 2) }}</code>
    </pre>
  </div>
</template>
