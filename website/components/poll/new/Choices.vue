<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", choices: { date: Date }[]): void;
  (e: "previous"): void;
}>();

const choices = ref([""]);

function addChoice() {
  choices.value.push("");
}

function deleteChoice(index: number) {
  choices.value = choices.value.filter((c, i) => i !== index);
}

function submit() {
  emit(
    "submit",
    choices.value.filter(Boolean).map((c) => {
      return {
        date: new Date(c),
      };
    }),
  );
}

function previous() {
  emit("previous");
}
</script>

<template>
  <form @submit.prevent="submit">
    <template v-for="(choice, i) in choices" :key="choice">
      <div>
        <label :for="`title-${i}`">Choix {{ i + 1 }}</label>
        <input :id="`title-${i}`" v-model="choices[i]" type="date" required />
      </div>

      <button
        type="button"
        :disabled="choices.length === 1"
        @click="deleteChoice(i)"
      >
        Supprimer
      </button>
      <br />
      <br />
    </template>

    <button type="button" @click="addChoice">Ajouter une date</button>

    <br />
    <br />
    <div>
      <button type="button" @click="previous">Étape précédente</button>
      <button type="submit">Étape suivante</button>
    </div>
  </form>
</template>
