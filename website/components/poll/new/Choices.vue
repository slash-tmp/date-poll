<script setup lang="ts">
/**
 * TODO:
 * - select multiple dates ✅
 * - add time to date ✅
 * - fix iso dates problem (-1 day) ✅
 * - add multiple times to dates ✅
 * - show dates before/after current month ✅
 * - filter duplicates when submitting ✅
 * - handle errors (missing field value) ✅
 * - add icon to button on small device ✅
 * - e2e tests
 * - translate strings ✅
 * - ensure a11y
 *    - move focus when adding time ✅
 *    - check VO on days ✅
 *    - add badge label on buttons
 * - handle pre-registered dates (edit page)
 * - mobile styles ✅
 * - clean CSS
 * - clean file
 */

import { findLastIndex, isEqual, sortBy, uniqBy, uniqWith } from "lodash-es";

import Button from "~/components/Button.vue";
import ChevronLeft from "~/components/icons/ChevronLeft.vue";
import ChevronRight from "~/components/icons/ChevronRight.vue";
import Input from "~/components/Input.vue";
import useToast from "~/composables/useToast";
import type { CreatePollFormData, StepPayload } from "~/types/poll";

import Actions from "./Actions.vue";

const props = defineProps<{
  defaultFormData: CreatePollFormData;
}>();

const emit = defineEmits<{
  (e: "submit", payload: StepPayload): void;
  (e: "previous", payload: StepPayload): void;
}>();

const { t } = useI18n();

// Calendar data
const daysNames = [
  { short: "L", long: "Lundi" },
  { short: "M", long: "Mardi" },
  { short: "M", long: "Mercredi" },
  { short: "J", long: "Jeudi" },
  { short: "V", long: "Vendredi" },
  { short: "S", long: "Samedi" },
  { short: "D", long: "Dimanche" },
];
const monthsNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const today = new Date();
const selectedYear = ref(today.getFullYear());
const selectedMonth = ref(today.getMonth());

// Months navigation
function goToPreviousMonth() {
  selectedYear.value =
    selectedMonth.value === 0 ? selectedYear.value - 1 : selectedYear.value;

  selectedMonth.value =
    selectedMonth.value === 0 ? 11 : selectedMonth.value - 1;
}

function goToNextMonth() {
  selectedYear.value =
    selectedMonth.value === 11 ? selectedYear.value + 1 : selectedYear.value;

  selectedMonth.value =
    selectedMonth.value === 11 ? 0 : selectedMonth.value + 1;
}

// Build calendar days
const daysCountInMonth = computed(() => {
  return 32 - new Date(selectedYear.value, selectedMonth.value, 32).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value).getDay();
});

const monthDays = computed(() => {
  const result = [];

  let date = 1;

  // Loop on 6 week per month to be safe
  for (let i = 0; i < 6; i++) {
    const week = [];

    // Loop on every day of the week
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth.value - 1) {
        week.push(null);
      } else if (date > daysCountInMonth.value) {
        break;
      } else {
        week.push(date);
        date++;
      }
    }
    if (week.length) {
      result.push(week);
    }
  }

  return result;
});

// Handle selected dates
const choices = ref([...props.defaultFormData.choices]);
const sortedChoices = computed(() => {
  return sortBy(choices.value, (c) => new Date(c.date!));
});

function toggleSelectedDay(day: number) {
  const date = `${selectedYear.value.toString().padStart(4, "0")}-${(selectedMonth.value + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}-00:00`;
  const selectedDate = date.substring(0, 10);
  const selectedTime = date.substring(11);

  // Check if date is already selected
  const duplicate = choices.value.find((d) => {
    return d.date === selectedDate;
  });

  if (duplicate) {
    choices.value = choices.value.filter((d) => {
      return d.date !== selectedDate;
    });
  } else {
    choices.value.push({
      date: selectedDate,
      time: selectedTime,
    });
  }
}

// Check if a date is selected
function dateIsSelected(day: number) {
  return choices.value.some((d) => {
    return (
      d.date &&
      +d.date.slice(0, 4) === selectedYear.value &&
      +d.date.slice(5, 7) === selectedMonth.value + 1 &&
      +d.date.slice(8, 10) === day
    );
  });
}

const timeInputRefs = ref<InstanceType<typeof Input>[]>([]);
// Add a time to an existing date (=== add new date)
async function addTime(d: string) {
  const date = new Date(d);

  choices.value.push({
    date: date.toISOString().substring(0, 10),
    time: "00:00",
  });

  const index = findLastIndex(sortedChoices.value, (c) => {
    return c.date === d;
  });

  await nextTick();

  const inputToFocus = sortBy(
    timeInputRefs.value,
    (inputRef) => inputRef.id,
  ).at(index);

  inputToFocus?.focus();
}

// Previous and next dates
const prevDatesCount = computed((): string => {
  if (choices.value.length) {
    const length = uniqBy(choices.value, "date").filter((c) => {
      if (c.date) {
        const dateMonth = new Date(c.date).getMonth();
        const dateYear = new Date(c.date).getFullYear();

        if (dateYear === selectedYear.value) {
          return dateMonth < selectedMonth.value;
        } else {
          return dateYear < selectedYear.value;
        }
      }
    }).length;

    if (length) {
      return `+${length}`;
    }
  }

  return "";
});

const nextDatesCount = computed((): string => {
  if (choices.value.length) {
    const length = uniqBy(choices.value, "date").filter((c) => {
      if (c.date) {
        const dateMonth = new Date(c.date).getMonth();
        const dateYear = new Date(c.date).getFullYear();

        if (dateYear === selectedYear.value) {
          return dateMonth > selectedMonth.value;
        } else {
          return dateYear > selectedYear.value;
        }
      }
    }).length;

    if (length) {
      return `+${length}`;
    }
  }

  return "";
});

// Step navigation
async function submit() {
  // validate number of choices
  if (!choices.value.length) {
    setToast({
      title: t("pages.poll.new.choices.noChoiceError"),
      type: "error",
      isClosable: true,
    });
    return;
  }

  // Filter duplicates and submit
  emit("submit", { choices: uniqWith(choices.value, isEqual) });
}

function previous() {
  emit("previous", { choices: choices.value });
}

const { setToast } = useToast();
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <p class="intro">
      {{ $t("pages.poll.new.choices.intro") }}
    </p>

    <div class="choices-wrapper">
      <!-- Choices -->
      <div class="calendar">
        <div class="header">
          <p class="header-current">
            {{ monthsNames[selectedMonth] }}
            {{ selectedYear }}
          </p>
          <div class="header-nav">
            <Button
              v-if="
                selectedMonth !== today.getMonth() ||
                selectedYear !== today.getFullYear()
              "
              variant="secondary"
              type="button"
              :badge="prevDatesCount"
              class="nav-button"
              @click="goToPreviousMonth"
            >
              <ChevronLeft />
              <span class="visually-hidden">
                {{ $t("pages.poll.new.choices.previous") }}
              </span>
            </Button>

            <Button
              variant="secondary"
              type="button"
              :badge="nextDatesCount"
              class="nav-button"
              @click="goToNextMonth"
            >
              <ChevronRight />
              <span class="visually-hidden">
                {{ $t("pages.poll.new.choices.next") }}
              </span>
            </Button>
          </div>
        </div>

        <table class="table">
          <caption class="visually-hidden" aria-live="polite">
            {{
              `${monthsNames[selectedMonth]} ${selectedYear}`
            }}
          </caption>
          <thead>
            <tr>
              <th v-for="(d, i) in daysNames" :key="i" scope="col">
                <span :aria-label="d.long">{{ d.short }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(days, i) in monthDays" :key="i">
              <td v-for="(d, j) in days" :key="j">
                <button
                  v-if="d"
                  :aria-pressed="dateIsSelected(d)"
                  class="day-button"
                  type="button"
                  @click="toggleSelectedDay(d)"
                >
                  <span class="visually-hidden">{{ daysNames[j].long }}</span>
                  {{ d }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Times -->
      <ul class="times">
        <li
          v-for="(choice, i) in uniqBy(sortedChoices, 'date')"
          :key="i"
          class="time-container"
        >
          <fieldset>
            <legend>{{ formatDate(choice.date!) }}</legend>
            <Input
              v-for="(time, j) in choices.filter((c) => c.date === choice.date)"
              :id="`time-${i.toString().padStart(2, '0')}-${j.toString().padStart(2, '0')}`"
              ref="timeInputRefs"
              :key="j"
              v-model="time.time"
              type="time"
              :label="
                $t('pages.poll.new.choices.choice.timeLabel', { index: j + 1 })
              "
            />
            <Button
              type="button"
              variant="tertiary"
              @click="addTime(choice.date!)"
            >
              {{ $t("pages.poll.new.choices.choice.addTime") }}
              <span class="visually-hidden">
                {{
                  $t("pages.poll.new.choices.choice.forTheDate", {
                    date: formatDate(choice.date!),
                  })
                }}
              </span>
            </Button>
          </fieldset>
        </li>
      </ul>
    </div>

    <Actions>
      <template #prev>
        <Button variant="secondary" @click="previous">
          {{ $t("pages.poll.new.navigation.previous") }}
        </Button>
      </template>
      <template #next>
        <Button type="submit">
          {{ $t("pages.poll.new.navigation.next") }}
        </Button>
      </template>
    </Actions>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intro {
  margin-block-end: 1rem;
}

.choice {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  margin-block-end: 1rem;

  @media (width < 50rem) {
    grid-template-columns: 1fr;
  }
}

.add-choice {
  align-self: start;
}

.calendar {
  position: sticky;
  top: 1rem;

  @media (width <= 37.5rem) {
    position: initial;
  }

  .header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    margin-block-end: 1rem;

    .header-current {
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-xl);
      margin: 0;
    }

    .header-nav {
      display: flex;
      gap: 1rem;

      .nav-button {
        --nav-button-size: 2.5rem;

        padding: 0.5rem;
        width: var(--nav-button-size);
        height: var(--nav-button-size);
      }
    }
  }

  .table {
    width: 100%;

    th {
      font-size: var(--font-size-lg);
      padding: 0.25rem;
    }

    td {
      text-align: center;
    }
  }
}

.day-button {
  --day-button-size: 3rem;

  background: none;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  width: var(--day-button-size);
  height: var(--day-button-size);

  @media (width <= 50rem) {
    --day-button-size: 2rem;
  }

  &:hover {
    border-color: var(--color-grey);
  }

  &[aria-pressed="true"] {
    background-color: var(--color-primary);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }
  }
}

.choices-wrapper {
  align-items: start;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1rem;
  position: relative;

  @media (width <= 37.5rem) {
    grid-template-columns: 1fr;
  }
}

.times {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  .time-container {
    padding: 1rem;
    border: 1px solid var(--color-grey-3);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-form-input);
    transition: background-color 0.2s ease;

    fieldset {
      border: none;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
    }

    legend {
      font-size: var(--font-size-2);
      font-weight: var(--font-weight-semibold);
    }
  }

  .time {
    display: flex;
    gap: 1rem;
    align-items: end;
  }
}
</style>
