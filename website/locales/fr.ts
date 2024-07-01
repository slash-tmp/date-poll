export default {
  hello: {
    world: "Bonjour monde !",
  },

  layout: {
    header: {
      name: "📆 date-poll",
      about: "À propos",
    },
  },

  pages: {
    error: {
      homeLink: "Retourner à la page d’accueil",
      404: {
        title: "Page introuvable",
        description:
          "La page que vous cherchez n’existe pas ou a été supprimée.",
      },
    },
    index: {
      title: "date poll",
      deletedPollAlert: {
        description: 'Le sondage "{title}" a bien été supprimé',
        close: "Fermer",
      },
      newPoll: "Créer un sondage",
      findPoll: "Rechercher un sondage",
    },
    poll: {
      find: {
        title: "Rechercher un sondage",
        description:
          "Pour retrouver des sondages existants, entrez l’adresse email que vous avez utilisée les créer. Si l’adresse existe, un email avec la liste de vos sondages vous sera envoyé.",
        alert: {
          description:
            "Un email a été envoyé à l’adresse {emailAddress} avec la liste de vos sondages.",
          close: "Fermer",
        },
        form: {
          label: "Adresse email",
          submit: "Rechercher",
        },
      },
      new: {
        title: "Créer un sondage",
        stepper: "Étape {current} sur {count}",
        navigation: {
          back: "Retour",
          previous: "Précédent",
          next: "Suivant",
          submit: "Valider",
        },
        titleAndDescription: {
          stepTitle: "Nom et description",
          intro:
            "Commencez par présenter votre sondage à vos participant·es. Donnez-lui d’abord un nom sympa puis une brève description si vous le souhaitez.",
          title: {
            label: "Nom du sondage",
          },
          description: {
            label: "Description (optionnel)",
            help: "Vous pouvez par exemple indiquer un lieu, détailler les activités prévues ou ajouter des liens utiles.",
          },
        },
        choices: {
          stepTitle: "Dates et horaires",
          intro:
            "Maintenant, faites votre sélection de dates : chaque date doit avoir un horaire associé et votre sondage doit au moins proposer une date (cela va de soi non ?).",
          noChoiceError: "Vous devez au moins ajouter une date.",
          choice: {
            dateLabel: "Date n°{index}",
            timeLabel: "Horaire n°{index}",
            deleteChoice: "Supprimer",
          },
          addNewChoice: "Ajouter une date",
        },
        settings: {
          stepTitle: "Paramètres",
          intro:
            "Personnalisez maintenant votre sondage en sélectionnant les options souhaitées. Pas de panique, vous pourrez toujours les modifier une fois le sondage créé.",
          hideVotes: {
            label: "Masquer la liste des participant·es",
            help: "Les noms des participant·es seront cachés aux autres (mais pas à vous, évidemment).",
          },
          endDate: {
            label: "Date de fin (optionnel)",
            help: "Le sondage n’acceptera plus de nouvelles réponses à partir de cette date. C’est comme ça.",
            delete: "Supprimer",
          },
          notifyOnResponse: {
            label: "Recevoir un email pour chaque participation",
            help: "On vous envoie un email dès qu’une personne répond à votre sondage, pratique.",
          },
        },
        adminInfos: {
          stepTitle: "Administrateur",
          intro:
            "Dernière étape : il est temps d’indiquer aux participant·es qui vous êtes (mais vous pouvez aussi rester anonyme 🥷). Vous serez ensuite redirigé·e vers la page de gestion de votre sondage que vous n’aurez plus qu’à partager !",
          name: {
            label: "Nom (optionnel)",
            hint: "Le nom est utilisé pour indiquer aux participant·es qui est l’auteur·ice du sondage",
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
                'Vous êtes sur le point de supprimer le sondage "{title}". Vous n’y aurez plus accès et plus personne ne pourra y participer.',
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
            title: "Réponses et participations",
            at: "à",
            vote: "vote | votes",
            maybe: "(peut-être)",
            bestChoice: "Meilleur choix",
          },
          error: {
            404: {
              title: "Sondage introuvable",
              description:
                "Le sondage que vous cherchez n’existe pas ou a été supprimé.",
            },
          },
        },
        edit: {
          title: "Modifier le sondage",
          back: "Retour au sondage",
          updatedPollAlert: {
            description: 'Le sondage "{title}" a bien été mis à jour',
            close: "Fermer",
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
            stepSubtitle:
              "Vous ne pouvez pas modifier les dates et horaires existants mais seulement en ajouter ou en supprimer.",
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
          submit: "Mettre à jour",
        },
      },
      id: {
        invited: "Vous avez été invité·e à participer à ce sondage.",
        invitedBy:
          "Vous avez été invité·e par {adminName} à participer à ce sondage.",
        expireOn: "Vous avez jusqu’au {endDate} pour y participer.",
        isExpired:
          "La date limite de participation de ce sondage est dépassée. Il n’est plus possible d’y répondre.",
        form: {
          choices: {
            yes: "Oui",
            maybe: "Peut-être",
            no: "Non",
          },
          name: "Votre nom",
          at: "à",
          maybe: "(peut-être)",
          withName: {
            yes: "{name} (vous)",
            maybe: "{name} (vous, peut-être)",
          },
          withoutName: {
            yes: "Vous",
            maybe: "Vous (peut-être)",
          },
          submit: "Voter",
        },
        confirmation: "Votre vote a bien été pris en compte !",
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
};
