<script setup lang="ts">
import Align from "~/components/icons/Align.vue";
import Calendar from "~/components/icons/Calendar.vue";
import User from "~/components/icons/User.vue";

defineProps<{
  adminName: string | null;
  createdAt: string;
  description: string | null;
}>();
</script>

<template>
  <ul class="list">
    <li v-if="adminName" class="list-item">
      <User class="list-icon" />
      <p>
        {{ $t("pages.poll.admin.id.intro.createdBy") }}
        <strong>{{ adminName }}</strong>
      </p>
    </li>
    <li class="list-item">
      <Calendar class="list-icon" />
      <p>
        {{ $t("pages.poll.admin.id.intro.createdAt") }}
        <strong>{{ formatDate(createdAt) }}</strong>
      </p>
    </li>
    <li v-if="description" class="list-item">
      <Align class="list-icon" />
      <p v-html="replaceUrlToHtmlAnchor(description)" />
    </li>
  </ul>
</template>

<style scoped>
.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  gap: 0.5rem;
  white-space: pre-wrap;
}

.list-icon {
  height: 1.5rem;
  width: 1.5rem;
  flex-shrink: 0;
}
</style>
