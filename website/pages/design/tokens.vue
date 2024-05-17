<script setup lang="ts">
const fontSizes = [
  "--font-size-0",
  "--font-size-1",
  "--font-size-2",
  "--font-size-3",
  "--font-size-4",
];

const fontWeights = [
  { name: "--font-weight-normal", value: 400 },
  { name: "--font-weight-semibold", value: 600 },
  { name: "--font-weight-bold", value: 700 },
];

const lineHeights = [
  { title: "Heading", name: "--line-height-heading", value: 1.2 },
  { title: "Body", name: "--line-height-body", value: 1.5 },
];

const greyScaleSwatch = [
  "--color-white",
  "--color-grey-1",
  "--color-grey-2",
  "--color-grey-3",
  "--color-grey-4",
  "--color-black",
];

const brandSwatch = [
  {
    name: "Primary",
    colors: [
      "--color-primary-lighter",
      "--color-primary-light",
      "--color-primary",
      "--color-primary-dark",
      "--color-primary-darker",
    ],
  },
  {
    name: "Secondary",
    colors: [
      "--color-secondary-light",
      "--color-secondary",
      "--color-secondary-dark",
    ],
  },
];

const stateSwatch = [
  {
    name: "Info",
    colors: ["--color-info", "--color-info-light"],
  },
  {
    name: "Success",
    colors: ["--color-success", "--color-success-light"],
  },
  {
    name: "Error",
    colors: ["--color-error", "--color-error-light"],
  },
];

const utilitySwatch = ["--color-outline"];
</script>

<template>
  <NuxtLink :to="{ name: 'design' }">Retour</NuxtLink>

  <h1>Tokens</h1>

  <ul>
    <li><a href="#fs">Font sizes</a></li>
    <li><a href="#fw">Font weights</a></li>
    <li><a href="#lh">Line heights</a></li>
    <li><a href="#colors">Colors</a></li>
  </ul>

  <hr />

  <h2 id="fs">Font sizes</h2>

  <ul>
    <li v-for="(size, i) in fontSizes" :key="size">
      <p :style="`font-size: var(${size})`">
        Step {{ i }}: <code>{{ size }}</code>
      </p>
    </li>
  </ul>

  <h2 id="fw">Font weights</h2>

  <ul>
    <li v-for="weight in fontWeights" :key="weight.value">
      <p :style="`font-weight: var(${weight.name})`">
        Normal ({{ weight.value }}): <code>{{ weight.name }}</code>
      </p>
    </li>
  </ul>

  <h2 id="lh">Line heights</h2>

  <ul>
    <li v-for="lh in lineHeights" :key="lh.value">
      <p :style="`line-height: var(${lh.name})`">
        {{ lh.title }} line-height ({{ lh.value }}): <code>{{ lh.name }}</code>
      </p>
    </li>
  </ul>

  <h2 id="colors">Colors</h2>

  <h3>Grey scale colors</h3>

  <ul class="swatch">
    <li v-for="color in greyScaleSwatch" :key="color">
      <span :style="`background-color: var(${color})`" />
      <code>{{ color }}</code>
    </li>
  </ul>

  <h3>Brand colors</h3>

  <template v-for="brand in brandSwatch" :key="brand.name">
    <ul class="swatch">
      <h4>{{ brand.name }}</h4>
      <li v-for="color in brand.colors" :key="color">
        <span :style="`background-color: var(${color})`" />
        <code>{{ color }}</code>
      </li>
    </ul>
  </template>

  <h3>State colors</h3>

  <template v-for="state in stateSwatch" :key="state.name">
    <ul class="swatch">
      <h4>{{ state.name }}</h4>
      <li v-for="color in state.colors" :key="color">
        <span :style="`background-color: var(${color})`" />
        <code>{{ color }}</code>
      </li>
    </ul>
  </template>

  <h3>Utility colors</h3>

  <ul class="swatch">
    <li v-for="color in utilitySwatch" :key="color">
      <span :style="`background-color: var(${color})`" />
      <code>{{ color }}</code>
    </li>
  </ul>
</template>

<style scoped>
.swatch {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: flex;
    gap: 2rem;
    align-items: center;

    span {
      border: 1px solid var(--color-black);
      border-radius: 0.25rem;
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
