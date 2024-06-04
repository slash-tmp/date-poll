<template>
  <header>
    <div class="content">
      <RouterLink :to="{ name: 'index' }">
        {{ $t("layout.header.name") }}
      </RouterLink>
      <RouterLink :to="{ name: 'about' }">
        {{ $t("layout.header.about") }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--color-grey-2);

  .content {
    max-width: var(--content-width);
    margin-inline: auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
}
</style>
