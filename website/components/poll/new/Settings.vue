<script setup lang="ts">
const emit = defineEmits<{
  (
    e: "submit",
    payload: {
      hideVotes: boolean;
      endDate: Date | null;
      notifyOnResponse: boolean;
    },
  ): void;
  (e: "previous"): void;
}>();

const hideVotes = ref(false);
const showEndDate = ref(false);
const endDate = ref("");
const notifyOnResponse = ref(false);

function submit() {
  emit("submit", {
    hideVotes: hideVotes.value,
    endDate:
      showEndDate.value && endDate.value ? new Date(endDate.value) : null,
    notifyOnResponse: notifyOnResponse.value,
  });
}

function previous() {
  emit("previous");
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="hide-votes">Masquer les votes</label>
      <input id="hide-votes" v-model="hideVotes" type="checkbox" />
    </div>
    <div>
      <label for="show-end-date">Ajouter une date de fin</label>
      <input id="show-end-date" v-model="showEndDate" type="checkbox" />
    </div>

    <div v-if="showEndDate">
      <label for="end-date">Date de fin</label>
      <input id="end-date" v-model="endDate" type="date" />
    </div>

    <div>
      <label for="notify-on-response">
        Recevoir un email pour chaque participation
      </label>
      <input
        id="notify-on-response"
        v-model="notifyOnResponse"
        type="checkbox"
      />
    </div>

    <br />
    <br />
    <div>
      <button type="button" @click="previous">Étape précédente</button>
      <button type="submit">Étape suivante</button>
    </div>
  </form>
</template>
