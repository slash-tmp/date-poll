export default {
  hello: {
    world: "Bonjour monde !",
  },

  pages: {
    index: {
      title: "date poll",
      newPoll: "Créer un sondage",
    },
    poll: {
      new: {
        title: "Nouveau sondage",
        stepper: "Étape {current} sur {count}",
        navigation: {
          previous: "Précédent",
          next: "Suivant",
          submit: "Valider",
        },
        titleAndDescription: {
          stepTitle: "Nom et description",
          title: {
            label: "Nom",
          },
          description: {
            label: "Description (optionnel)",
          },
        },
        choices: {
          stepTitle: "Dates et horaires",
          choice: {
            title: "Date n°{index}",
            deleteChoice: "Supprimer",
          },
          addNewChoice: "Ajouter une date",
        },
        settings: {
          stepTitle: "Paramètres",
          hideVotes: {
            label: "Masquer les votes",
          },
          endDate: {
            label: "Date de fin",
          },
          notifyOnResponse: {
            label: "Recevoir un email pour chaque participation",
          },
        },
        adminInfos: {
          stepTitle: "Administrateur",
          name: {
            label: "Nom",
            hint: "Le nom est utilisé pour indiquer aux participants qui est l’auteur·ice du sondage",
          },
          email: {
            label: "Adresse email",
            hint: "L’adresse email est utilisée pour vous envoyer un email avec les informations de votre sondage (dont le lien d’administration)",
          },
        },
      },
      admin: {
        id: {
          title: "Sondage {id}",
        },
      },
    },
  },
};
