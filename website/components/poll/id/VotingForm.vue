<script setup lang="ts">
import { Response } from "~/types/poll";

interface PublicPoll {
  title: string;
  description?: string;
  choices: { date: string; respondents: string[] }[];
  hideVotes: boolean;
  endDate: string | null;
  adminName: string | null;
}

const props = defineProps<{
  poll: PublicPoll;
}>();

const emit = defineEmits<{
  (e: "submit", payload: any): void;
}>();

const name = ref("");
const choices = ref(
  props.poll.choices.map((c) => {
    return {
      ...c,
      presence: Response.UNKNOWN,
    };
  }),
);

// TODO: submit form
function submitVote() {
  emit("submit", {});
}
</script>

<template>
  <form @submit.prevent="submitVote">
    <div>
      <label for="name">Votre nom</label>
      <input id="name" v-model="name" type="text" required />
    </div>

    <ul>
      <li v-for="choice in choices" :key="choice.date">
        <fieldset>
          <legend>{{ formatDate(choice.date) }}</legend>
          <template
            v-for="option in [Response.YES, Response.MAYBE, Response.NO]"
            :key="`${option}-${choice.date}`"
          >
            <label :for="`choice-${choice.date}-${option}`">{{ option }}</label>
            <input
              :id="`choice-${choice.date}-${option}`"
              v-model="choice.presence"
              :value="option"
              type="radio"
              :name="`choice-${choice.date}`"
              required
            />
          </template>
        </fieldset>
        <ul v-if="!poll.hideVotes">
          <li v-for="respondent in choice.respondents" :key="respondent">
            {{ respondent }}
          </li>
          <li v-if="[Response.YES, Response.MAYBE].includes(choice.presence)">
            vous
            <template v-if="choice.presence === Response.MAYBE">
              (peut-être)
            </template>
          </li>
        </ul>
      </li>
    </ul>

    <button type="submit">Voter</button>
  </form>
</template>
