<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", payload: { title: string; description: string | null }): void;
}>();

const title = ref("");
const description = ref("");

function submit() {
  emit("submit", { title: title.value, description: description.value });
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="title">Nom du sondage</label>
      <input id="title" v-model="title" type="text" required />
    </div>

    <div>
      <label for="description">Description du sondage (optionnel)</label>
      <textarea id="description" v-model="description" />
    </div>

    <br />
    <br />
    <div>
      <button type="submit">Étape suivante</button>
    </div>
  </form>
</template>
