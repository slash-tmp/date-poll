describe("Poll creation page /poll/new", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Créer un sondage").click();
  });

  it("creates a new poll and redirect to the admin page", () => {
    // Step 1
    cy.getByLabel("Nom").type("Mon sondage");
    cy.getByLabel("Description (optionnel)").type(
      "La description de mon sondage",
    );
    cy.contains("Suivant").click();

    // Step 2
    cy.contains("Ajouter une date").click();
    cy.getByLabel("Date n°1").type("2024-03-23");
    cy.getByLabel("Horaire n°1").type("08:30");

    cy.contains("Ajouter une date").click();
    cy.getByLabel("Date n°2").type("2022-10-30");
    cy.getByLabel("Horaire n°2").type("19:45");

    cy.contains("Suivant").click();

    // Step 3
    cy.getByLabel("Masquer les votes").check();
    cy.getByLabel("Date de fin").type("2023-11-02");
    cy.getByLabel("Recevoir un email pour chaque participation").check();
    cy.contains("Suivant").click();

    // Step 4
    cy.getByLabel("Nom").type("Michel");
    cy.getByLabel("Adresse email").type("michel@acme.com");
    cy.contains("Valider").click();

    // Redirected to poll admin page
    // Check that route path matches `/poll/admin/<uid>`
    cy.location("pathname").should("match", /^\/poll\/admin\/[A-Za-z0-9_-]+$/);
  });

  it("shows an error message when trying to submit step 2 with no date", () => {
    // Step 1
    cy.getByLabel("Nom").type("Mon sondage");
    cy.getByLabel("Description (optionnel)").type(
      "La description de mon sondage",
    );
    cy.contains("Suivant").click();

    // Step 2
    // Click "Next" without adding at least one date
    cy.contains("Suivant").click();

    // Step should not change and an error message should be displayed
    cy.contains("Étape 2 sur 4");
    cy.contains("Vous devez au moins ajouter une date.");
  });

  it("saves data between steps", () => {
    // Step 1
    cy.getByLabel("Nom").type("Mon sondage");
    cy.getByLabel("Description (optionnel)").type(
      "La description de mon sondage",
    );
    cy.contains("Suivant").click();

    // Step 2
    cy.contains("Ajouter une date").click();
    cy.getByLabel("Date n°1").type("2024-03-23");
    cy.getByLabel("Horaire n°1").type("08:30");
    cy.contains("Précédent").click();

    // Check step 1 was saved
    cy.getByLabel("Nom").should("have.value", "Mon sondage");
    cy.getByLabel("Description (optionnel)").should(
      "have.value",
      "La description de mon sondage",
    );
    cy.contains("Suivant").click();

    // Check step 2 was saved
    cy.getByLabel("Date n°1").should("have.value", "2024-03-23");
    cy.getByLabel("Horaire n°1").should("have.value", "08:30");

    cy.contains("Suivant").click();

    // Step 3
    cy.getByLabel("Masquer les votes").check();
    cy.getByLabel("Date de fin").type("2023-11-02");
    cy.getByLabel("Recevoir un email pour chaque participation").check();
    cy.contains("Suivant").click();

    // Step 4
    cy.getByLabel("Nom").type("Michel");
    cy.getByLabel("Adresse email").type("michel@acme.com");

    // Check step 3 was saved
    cy.contains("Précédent").click();
    cy.getByLabel("Masquer les votes").should("have.value", "on");
    cy.getByLabel("Date de fin").should("have.value", "2023-11-02");
    cy.getByLabel("Recevoir un email pour chaque participation").should(
      "have.value",
      "on",
    );

    // Check step 4 was saved
    cy.contains("Suivant").click();
    cy.getByLabel("Nom").should("have.value", "Michel");
    cy.getByLabel("Adresse email").should("have.value", "michel@acme.com");
  });
});

describe("Poll admin page", () => {
  beforeEach(() => {
    cy.fixture("../fixtures/createPollFormData").then((fixture) => {
      cy.request({
        method: "POST",
        url: "http://localhost:4000/api/polls",
        body: fixture,
      }).then((data) => {
        cy.visit(`http://localhost:3000/poll/admin/${data.body.adminUid}`);
      });
    });
  });

  it("display poll name", () => {
    cy.contains("Trip to the museum");
  });

  it("copies poll public url", () => {
    cy.contains("Copier").click();
    cy.contains(
      "Le lien de participation a bien été copié dans le presse-papier, à vous de jouer !",
    );
  });

  it("deletes a poll", () => {
    cy.contains("Supprimer le sondage").click();
    cy.contains(
      `Vous êtes sur le point de supprimer le sondage "Trip to the museum".`,
    );
    cy.contains("button", "Supprimer").click();
    cy.contains('Le sondage "Trip to the museum" a bien été supprimé');
  });
});

describe("Find poll page", () => {
  it("sends an email with polls links", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Rechercher un sondage").click();

    cy.getByLabel("Adresse email").type("johndoe@example.com");

    cy.contains("button", "Rechercher").click();

    cy.contains(
      "Un email a été envoyé à l’adresse johndoe@example.com avec la liste de vos sondages.",
    );
  });
});

describe("Poll edition page", () => {
  beforeEach(() => {
    cy.fixture("../fixtures/createPollFormData").then((fixture) => {
      cy.request({
        method: "POST",
        url: "http://localhost:4000/api/polls",
        body: fixture,
      }).then((data) => {
        cy.visit(`http://localhost:3000/poll/admin/${data.body.adminUid}/edit`);
      });
    });
  });

  it("retrieves poll data in fields", () => {
    cy.getByLabel("Nom").should("have.value", "Trip to the museum");
    cy.getByLabel("Description").should(
      "have.value",
      "We are going to the natural history museum.",
    );

    cy.getByLabel("Date n°1").should("have.value", "2024-05-15");
    cy.getByLabel("Horaire n°1").should("have.value", "10:30");

    cy.getByLabel("Masquer les votes").should("have.value", "on");
    cy.getByLabel("Date de fin").should("have.value", "2024-05-15");
    cy.getByLabel("Recevoir un email pour chaque participation").should(
      "have.value",
      "on",
    );

    cy.get("fieldset:last-of-type")
      .getByLabel("Adresse email")
      .should("have.value", "bob@domain.com");
  });

  it("disables existing choices (date and time)", () => {
    cy.getByLabel("Date n°1").should("have.attr", "disabled");
    cy.getByLabel("Horaire n°1").should("have.attr", "disabled");

    cy.contains("Ajouter une date").click();
    cy.getByLabel("Date n°4").should("not.have.attr", "disabled");
    cy.getByLabel("Horaire n°4").should("not.have.attr", "disabled");
  });

  it("redirects to index with alert on success", () => {
    cy.getByLabel("Nom").clear().type("Trip to the ocean");
    cy.getByLabel("Description")
      .clear()
      .type("We are going to the see the dolphins");

    cy.contains("Mettre à jour").click();

    cy.location("pathname").should("match", /^\/poll\/admin\/[A-Za-z0-9_-]+$/);
    cy.contains("h1", "Trip to the ocean");
    cy.contains("We are going to the see the dolphins");
    cy.contains('Le sondage "Trip to the ocean" a bien été mis à jour');
  });

  // TODO: check when `endDate` bug will be fixed
  it.skip("deletes endDate", () => {
    cy.getByLabel("Date de fin").clear();

    cy.contains("Mettre à jour").click();

    cy.location("pathname").should("match", /^\/poll\/admin\/[A-Za-z0-9_-]+$/);

    cy.contains("Modifier le sondage").click();

    cy.location("pathname").should(
      "match",
      /^\/poll\/admin\/[A-Za-z0-9_-]+\/edit$/,
    );

    cy.getByLabel("Date de fin").should("have.value", "");
  });

  it("adds and delete new dates and save existing ones", () => {
    cy.contains("Supprimer").click();

    cy.contains("Ajouter une date").click();

    cy.getByLabel("Date n°3").type("2024-10-30");
    cy.getByLabel("Horaire n°3").type("12:00");

    cy.contains("Mettre à jour").click();
    cy.location("pathname").should("match", /^\/poll\/admin\/[A-Za-z0-9_-]+$/);

    cy.contains("Modifier le sondage").click();
    cy.location("pathname").should(
      "match",
      /^\/poll\/admin\/[A-Za-z0-9_-]+\/edit$/,
    );

    // Deleted date is gone
    cy.getByLabel("Date n°1").should("not.have.value", "2024-05-15");
    cy.getByLabel("Horaire n°1").should("not.have.value", "10:30");

    // Previous 2nd date is now 1st
    cy.getByLabel("Date n°1").should("have.value", "2024-05-22");
    cy.getByLabel("Horaire n°1").should("have.value", "13:00");

    // Previous 3rd date is now 2nd
    cy.getByLabel("Date n°2").should("have.value", "2024-05-29");
    cy.getByLabel("Horaire n°2").should("have.value", "18:50");

    // 3rd date is the newly added
    cy.getByLabel("Date n°3").should("have.value", "2024-10-30");
    cy.getByLabel("Horaire n°3").should("have.value", "12:00");
  });
});
