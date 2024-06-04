<template>
  <h1>À propos</h1>

  <!-- TODO: name -->
  <p>
    <code>date-poll</code> c’est quoi ? C’est une sorte de «
    <strong>Doodle éthique, facile et accessible</strong> ».
  </p>

  <ol>
    <li>
      <strong>Éthique</strong> ? Ici vous ne trouverez jamais de pubs. Il y en a
      déjà bien assez ailleurs sur le web. De plus, on fait aussi très attention
      aux données personnelles que nous collectons. Rien ne sera envoyé aux
      méchants
      <abbr title="Google Amazon Facebook Apple Microsoft">GAFAM</abbr> ou tout
      autre méga corporation mal intentionnée.
    </li>
    <li>
      <strong>Facile</strong> ? Il y a beaucoup trop d’exemples de produits qui
      divergent de leur objectif initial pour devenir des usines à gaz. On
      voulait faire un outil de réservation de créneau : on fait ça et c’est
      tout. Pas de fioritures, pas de comptes, pas de synchronisation Google
      Calendar ou d’intégration Teams (🤮).
    </li>
    <li>
      <strong>Accessible</strong> ? Ça n’est pas une surprise : le web n’est pas
      accessible. On a fait un service qui suit les critères du
      <abbr title="référentiel général d’amélioration de l’accessibilité"
        >RGAA</abbr
      >
      et les recommandations Opquast, utilisable par tout le monde et en toutes
      conditions (bon il faut une connexion internet quand même).
    </li>
  </ol>

  <p>
    C’est ensuite un
    <strong>projet de développement web réalisé dans les règles de l’art</strong
    >. Adrien au back-end (les fondations), Quentin au front-end (la peinture),
    on apprécie faire les choses bien : un produit performant, testé, simple,
    accessible et qui apporte de la valeur.
  </p>

  <p>
    Si ce sont des valeurs qui vous parlent, on s’appelle
    <a href="https://slash-tmp.dev" aria-label="site de slash tmp">/tmp</a> et
    on peut peut-être travailler ensemble.
  </p>

  <h2>Données personnelles</h2>

  <p>
    Les données personnelles que nous collections (à savoir votre adresse email
    quand vous créez un sondage et votre nom, optionnel) servent uniquement au
    fonctionnement de l’outil. On garde tout chez nous et on ne partage rien à
    personne.
  </p>

  <p>
    Après un laps de temps, les sondages sont auto-supprimés. A priori, une fois
    la date passée, ils n’ont plus vraiment d’utilité et ça ne sert à rien de
    les stocker inutilement.
  </p>

  <p>
    Si vous avez une demande particulière à propos de vos données, vous pouvez
    <a href="#contact">nous contacter</a>.
  </p>

  <h2 id="contact">Contact</h2>

  <p>
    A priori on code plutôt bien mais personne n’est infaillible : il se peut
    que vous trouviez des bugs ou rencontriez des difficultés à naviguer sur le
    site. N’hésitez pas à nous les remonter sur le
    <a href="#">dépôt GitHub</a> ou par mail à l’adresse suivante :
    <a href="mailto:contact@slash-tmp.dev">contact@slash-tmp.dev</a>.
  </p>

  <p>
    Comme on veut que cet outil reste très simple et fasse bien une et une seule
    chose, il est très peu probable que nous prenions en compte les suggestions
    de nouvelles fonctionnalités.
  </p>
</template>

<style scoped>
p:not(:last-child) {
  margin-block-end: 1rem;
}

ol li + li {
  margin-block-start: 1rem;
}
</style>
