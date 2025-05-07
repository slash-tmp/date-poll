<script setup>
const { setLocale, locale } = useI18n();
</script>

<template>
  <header>
    <div class="content">
      <RouterLink :to="{ name: 'index' }">
        {{ $t("layout.header.logo") }}
      </RouterLink>
      <RouterLink :to="{ name: 'about' }">
        {{ $t("layout.header.about") }}
      </RouterLink>
      <button
        :lang="locale === 'fr' ? 'en' : 'fr'"
        @click="setLocale(locale === 'fr' ? 'en' : 'fr')"
      >
        <span aria-hidden="true">{{ locale === "fr" ? "en" : "fr" }}</span>
        <span class="visually-hidden">{{ $t("layout.header.lang") }}</span>
      </button>
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
    gap: 1rem;

    > *:first-child {
      margin-inline-end: auto;
    }

    button[lang] {
      background-color: transparent;
      border: none;
      color: inherit;
      padding: 0;
      text-decoration: underline;
      text-transform: uppercase;
    }
  }
}
</style>
