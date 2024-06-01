<template>
  <footer>
    <ul>
      <li>
        <RouterLink to="#">Données personnelles</RouterLink>
      </li>
      <li>
        <RouterLink to="#">À propos</RouterLink>
      </li>
      <li>
        <RouterLink to="#">Contact</RouterLink>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-white);
  border-top: 1px solid var(--color-grey-2);
  margin-block-start: auto;

  ul {
    margin: 0;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    list-style: none;
  }
}
</style>
