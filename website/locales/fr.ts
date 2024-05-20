export default {
  hello: {
    world: "Bonjour monde !",
  },

  pages: {
    error: {
      homeLink: "Retourner à la page d’accueil",
    },
    index: {
      title: "date poll",
      deletedPollAlert: {
        description: 'Le sondage "{title}" a bien été supprimé',
        close: "Fermer",
      },
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
            dateLabel: "Date n°{index}",
            timeLabel: "Horaire n°{index}",
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
          actions: {
            edit: "Modifier le sondage",
            delete: "Supprimer le sondage",
            deleteModal: {
              title: "Supprimer le sondage",
              description:
                'Vous êtes sur le point de supprimer le sondage "{title}".',
              cancel: "Annuler",
              confirm: "Supprimer",
            },
          },
          intro: {
            createdBy: "Créé par",
            createdAt: "Créé le",
          },
          share: {
            title: "Partagez votre sondage",
            description:
              "Partagez ce lien avec vos invité·es pour leur permettre de participer au sondage.",
            label: "Lien de participation",
            button: "Copier",
            successAlert:
              "Le lien de participation a bien été copié dans le presse-papier, à vous de jouer !",
          },
          responses: {
            title: "Participations (TODO)",
          },
          error: {
            404: {
              title: "Sondage introuvable",
              description:
                "Le sondage que vous cherchez n’existe pas ou a été supprimé.",
            },
          },
        },
      },
    },
  },
};
