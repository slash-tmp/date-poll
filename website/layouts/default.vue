<template>
  <LayoutHeader />

  <main>
    <div class="content">
      <slot />
    </div>
  </main>
</template>

<style scoped>
main {
  background: var(--color-primary-lighter);
  flex-grow: 1;
  padding: 6rem 1rem;

  @media (width < 50rem) {
    padding: 1rem;
  }

  .content {
    background: var(--color-background);
    border-radius: var(--border-radius-base);
    border: 1px solid var(--color-grey-2);
    max-width: var(--content-width);
    margin-inline: auto;
    padding: 2rem;

    @media (width < 50rem) {
      padding: 1rem;
    }
  }
}
</style>
