<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", payload: { name: string | null; email: string }): void;
  (e: "previous"): void;
}>();

const name = ref("");
const email = ref("");

function submit() {
  emit("submit", { name: name.value, email: email.value });
}

function previous() {
  emit("previous");
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="name">Nom</label>
      <br />
      <span
        >Le nom est utilisé pour indiquer aux participants qui est l’auteur·ice
        du sondage</span
      >
      <input id="name" v-model="name" type="text" />
    </div>

    <br />
    <br />

    <div>
      <label for="email">Adresse email</label>
      <br />
      <span
        >L’adresse email est utilisée pour vous envoyer un email avec les
        informations de votre sondage (dont le lien d’administration)</span
      >
      <input id="email" v-model="email" type="email" required />
    </div>

    <br />
    <br />
    <div>
      <button type="button" @click="previous">Étape précédente</button>
      <button type="submit">Étape suivante</button>
    </div>
  </form>
</template>
