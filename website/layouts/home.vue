<template>
  <LayoutHeader />
  <main>
    <slot />
  </main>
</template>

<style scoped>
main {
  padding: 6rem 1rem;
  max-width: var(--home-content-width);
  margin-inline: auto;
  text-align: center;

  @media (width < 50rem) {
    padding-block: 2rem;
  }
}
</style>
