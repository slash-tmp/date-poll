export default {
  hello: {
    world: "Hello world !",
  },

  name: "Planito",
  description:
    "Create a poll, share it with your guests, and find the perfect date. No ads. No account. No frills.",
  email: "contact{'@'}slash-tmp.dev",

  layout: {
    header: {
      logo: "📆 @:name",
      about: "About",
      lang: "Changer la langue en français",
    },
  },

  pages: {
    error: {
      meta: {
        title: "Error",
      },
      homeLink: "Back to homepage",
      404: {
        title: "Page not found",
        description:
          "The page you are looking for does not exist or has been deleted.",
      },
    },
    about: {
      meta: {
        title: "About",
      },
      title: "About",
      intro: {
        1: "What is @:{'name'}? It’s kind of “{doodleLike}”.",
        doodleLike: "ethical, easy and accessible Doodle",
        list: {
          ethics: {
            title: "Ethical",
            content:
              "{title}? You'll never find any ads here. There are already plenty of them elsewhere on the web. Moreover, the little personal data collected is securely stored forever.",
          },
          easy: {
            title: "Easy",
            content:
              "{title}? There are far too many products that diverge from their original purpose to become a complete convoluted system. @:name is a slot booking tool, and that's it. No frills, no accounts, no Google Calendar sync, no Teams integration, and even less {ia}.",
            ia: "AI",
            iaDef: "Artificial intelligence",
          },
          accessible: {
            title: "Accessible",
            content:
              "{title}? It's no surprise: the web is, for the most part, not accessible to everyone. @:name is a service that complies with {rgaa} criteria and Opquast best practices. It can be used by everyone and under all conditions (well, you at least need an internet connection).",
            rgaa: "RGAA",
            rgaaDef: "Référentiel Général d’Amélioration de l’Accessibilité",
          },
        },
        2: "It's then a {webProject}. Adrien on the back-end (the foundations), Quentin on the front-end (the painting), we appreciate doing things well: a high-performance, tested, simple, accessible product that brings value.",
        webProject:
          "web development project carried out according to best practices",
        3: "If these are things that speak to you, we are {slashTmp} and we might want to work together.",
        slashTmp: "/tmp",
      },
      privacy: {
        title: "Personal data",
        1: "The personal data collected (namely your email address when you create a survey and sometimes your name) is used solely for the operation of the tool. All data is hosted by {o2switch} located at Chemin des Pardiaux, 63000 Clermont-Ferrand. And we don’t share anything with anyone.",
        o2switch: "o2switch",
        2: "If you have a specific request regarding your data, you can contact us at the following address: {contactEmail}.",
      },
      contact: {
        title: "Contact",
        1: "The code should be pretty well-written, but we never know: you may find bugs or encounter difficulties using the website. Feel free to report them to us on {gitHub} or by email at the following address: {contactEmail}.",
        gitHub: "GitHub repository",
        2: "Since we want to keep this tool very simple and do one thing well, it is very unlikely that we will consider suggestions for new features.",
        3: "Thanks for using @:name ❤️.",
      },
    },
    index: {
      meta: {
        title: "Trouvez facilement une date pour votre prochain événement",
      },
      title: "Trouvez {highlight} une date pour votre prochain événement.",
      easily: "facilement",
      tagLine:
        "Créez un sondage, partagez-le à vos invité·es et trouvez la date optimale.",
      arguments: "Pas de publicité. Pas de compte. Pas de fioritures.",
      deletedPollAlert: {
        description: 'Le sondage "{title}" a bien été supprimé',
        close: "Fermer",
      },
      newPoll: "Créer un sondage",
      findPoll: "Rechercher un sondage",
    },
    poll: {
      find: {
        meta: {
          title: "Rechercher un sondage",
        },
        title: "Rechercher un sondage",
        description:
          "Pour retrouver des sondages existants, entrez l’adresse email que vous avez utilisée pour les créer. Si l’adresse existe, un email avec la liste de vos sondages vous sera envoyé.",
        alert: {
          description:
            "Un email a été envoyé à l’adresse {emailAddress} avec la liste de vos sondages.",
          close: "Fermer",
        },
        form: {
          label: "Adresse email",
          submit: "Rechercher",
        },
        errorAlert:
          "Un problème empêche la recherche de sondages. Contactez-nous à l’adresse @:email si le problème persiste.",
      },
      new: {
        meta: {
          title:
            'Créer un sondage, étape {currentStep} sur {count} "{stepName}"',
        },
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
            "Commencez par présenter votre sondage à vos invité·es. Donnez-lui d’abord un nom sympa puis une brève description si vous le souhaitez.",
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
            "Maintenant, faites votre sélection de dates : chaque date doit avoir au moins un horaire associé et votre sondage doit au moins proposer une date (ça va de soi non ?).",
          noChoiceError:
            "Vous devez ajouter au moins une date à votre sondage.",
          previous: "Mois précédent",
          next: "Mois suivant",
          choice: {
            timeLabel: "Horaire n°{index}",
            deleteChoice: "Supprimer",
            addTime: "Ajouter un horaire",
            forTheDate: "pour le {date}",
          },
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
            help: "Le sondage n’acceptera plus de nouvelles réponses à partir de cette date.",
            delete: "Supprimer",
          },
          notifyOnResponse: {
            label: "Recevoir un email pour chaque participation",
            help: "On vous envoie un email dès qu’une personne répond à votre sondage, pratique.",
          },
        },
        adminInfos: {
          stepTitle: "Administrateur·ice",
          intro:
            "Dernière étape : il est temps d’indiquer aux invité·es qui vous êtes (mais vous pouvez aussi rester anonyme 🥷). Vous serez ensuite redirigé·e vers la page d’administration de votre sondage et vous n’aurez plus qu’à le partager !",
          name: {
            label: "Nom (optionnel)",
            hint: "Le nom est utilisé pour indiquer aux invité·es qui est l’auteur·ice du sondage",
          },
          email: {
            label: "Adresse email",
            hint: "L’adresse email est utilisée pour vous envoyer un email avec les informations de votre sondage (dont le lien d’administration)",
          },
        },
        errorAlert:
          "Un problème empêche la création de votre sondage. Contactez-nous à l’adresse @:email si le problème persiste.",
      },
      admin: {
        id: {
          meta: {
            title: 'Administration du sondage "{pollName}"',
          },
          actions: {
            edit: "Modifier le sondage",
            delete: "Supprimer le sondage",
            deleteModal: {
              title: "Supprimer le sondage",
              description:
                'Vous êtes sur le point de supprimer le sondage "{title}". Vous n’y aurez plus accès et plus personne ne pourra y participer.',
              cancel: "Annuler",
              confirm: "Supprimer",
              errorAlert:
                "Un problème empêche la suppression de votre sondage. Contactez-nous à l’adresse @:email si le problème persiste.",
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
            errorAlert:
              "Un problème empêche la copie du lien de participation. Contactez-nous à l’adresse @:email si le problème persiste.",
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
          meta: {
            title: 'Édition du sondage "{pollName}"',
          },
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
              "Vous ne pouvez pas modifier les dates et horaires existants mais seulement en ajouter ou en supprimer. Attention : si vous supprimez une date, cela supprimera tous les horaires associés à cette date.",
            choice: {
              dateLabel: "Date n°{index}",
              timeLabel: "Horaire n°{index}",
            },
            addNewChoice: "Ajouter une date",
          },
          settings: {
            stepTitle: "Paramètres",
            hideVotes: {
              label: "Masquer les votes",
              help: "Les noms des participant·es seront cachés aux autres (mais pas à vous, évidemment).",
            },
            endDate: {
              label: "Date de fin",
              help: "Le sondage n’acceptera plus de nouvelles réponses à partir de cette date.",
              delete: "Supprimer",
            },
            notifyOnResponse: {
              label: "Recevoir un email pour chaque participation",
              help: "On vous envoie un email dès qu’une personne répond à votre sondage, pratique.",
            },
          },
          adminInfos: {
            stepTitle: "Administrateur·ice",
            name: {
              label: "Nom",
              hint: "Le nom est utilisé pour indiquer aux participants qui est l’auteur·ice du sondage",
            },
            email: {
              label: "Adresse email",
            },
          },
          submit: "Mettre à jour",
          errorAlert:
            "Un problème empêche la mise à jour de votre sondage. Contactez-nous à l’adresse @:email si le problème persiste.",
        },
      },
      id: {
        meta: {
          title: 'Participer au sondage "{pollName}"',
        },
        invited: "Vous avez été invité·e à participer à ce sondage.",
        invitedBy:
          "Vous avez été invité·e par {adminName} à participer à ce sondage.",
        expireOn: " Vous avez jusqu’au {endDate} pour y participer.",
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
        errorAlert:
          "Un problème empêche la soumission du sondage. Contactez-nous à l’adresse @:email si le problème persiste.",
      },
    },
  },
};
