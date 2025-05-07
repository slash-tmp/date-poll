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
              "{title}? You’ll never find any ads here. There are already plenty of them elsewhere on the web. Moreover, the little personal data collected is securely stored forever.",
          },
          easy: {
            title: "Easy",
            content:
              "{title}? There are far too many products that diverge from their original purpose to become a complete convoluted system. @:name is a slot booking tool, and that’s it. No frills, no accounts, no Google Calendar sync, no Teams integration, and even less {ia}.",
            ia: "AI",
            iaDef: "Artificial intelligence",
          },
          accessible: {
            title: "Accessible",
            content:
              "{title}? It’s no surprise: the web is, for the most part, not accessible to everyone. @:name is a service that complies with {rgaa} criteria and Opquast best practices. It can be used by everyone and under all conditions (well, you at least need an internet connection).",
            rgaa: "RGAA",
            rgaaDef: "Référentiel Général d’Amélioration de l’Accessibilité",
          },
        },
        2: "It’s then a {webProject}. Adrien on the back-end (the foundations), Quentin on the front-end (the painting), we appreciate doing things well: a high-performance, tested, simple, accessible product that brings value.",
        webProject:
          "web development project carried out according to best practices",
        3: "If these are things that speak to you, we are {slashTmp} and we might want to work together.",
        slashTmp: "/tmp",
      },
      privacy: {
        title: "Personal data",
        1: "The personal data collected (namely your email address when you create a poll and sometimes your name) is used solely for the operation of the tool. All data is hosted by {o2switch} located at Chemin des Pardiaux, 63000 Clermont-Ferrand. And we don’t share anything with anyone.",
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
        title: "Easily find a date for your next event, the easy way",
      },
      title: "Find a date for your next event, {highlight}.",
      easily: "the easy way",
      tagLine:
        "Create a poll, share it with your guests, and find the perfect date.",
      arguments: "No ads. No account. No frills.",
      deletedPollAlert: {
        description: 'The poll "{title}" has been successfully deleted',
        close: "Close",
      },
      newPoll: "Create a poll",
      findPoll: "Find a poll",
      time: "It takes 3 minutes",
    },
    poll: {
      find: {
        meta: {
          title: "Find a poll",
        },
        title: "Find a poll",
        description:
          "To find existing polls, enter the email address you used to create them. If the address exists, an email with a list of your polls will be sent to you.",
        alert: {
          description:
            "An email has been sent to {emailAddress} with a list of your polls.",
          close: "Close",
        },
        form: {
          label: "Email address",
          submit: "Find",
        },
        errorAlert:
          "There is a problem with finding your polls. Contact us at @:email if the problem persists.",
      },
      new: {
        meta: {
          title: 'Create a poll, step {currentStep} on {count} "{stepName}"',
        },
        title: "Create a poll",
        stepper: "Step {current} on {count}",
        navigation: {
          back: "Back",
          previous: "Previous",
          next: "Next",
          submit: "Submit",
        },
        titleAndDescription: {
          stepTitle: "Name and description",
          intro:
            "Start by introducing your poll to your guests. Give it a fun name and then a brief description if you like.",
          title: {
            label: "Poll name",
          },
          description: {
            label: "Description (optional)",
            help: "For example, you can indicate a location, detail planned activities or add useful links.",
          },
        },
        choices: {
          stepTitle: "Dates and times",
          intro:
            "Now, make your date selection: each date must have at least one associated time and your poll must at least have one date (that goes without saying, right?).",
          noChoiceError: "You must add at least one date to your poll.",
          previous: "Previous month",
          next: "Next month",
          choice: {
            timeLabel: "Time n°{index}",
            deleteChoice: "Delete",
            addTime: "Add a time",
            forTheDate: "for the {date}",
          },
        },
        settings: {
          stepTitle: "Settings",
          intro:
            "Now customize your poll by selecting the desired options. Don’t worry, you can always modify them once the poll is created.",
          hideVotes: {
            label: "Hide the list of participants",
            help: "The names of the participants will be hidden from others (but not from you, obviously).",
          },
          endDate: {
            label: "End date (optional)",
            help: "The poll will no longer accept new responses after this date.",
            delete: "Delete",
          },
          notifyOnResponse: {
            label: "Receive an email for each participation",
            help: "We send you an email when someone responds to your poll, which is convenient.",
          },
        },
        adminInfos: {
          stepTitle: "Administrator",
          intro:
            "Last step: it’s time to tell the guests who you are (but you can also stay anonymous 🥷). You’ll then be redirected to your survey’s administration page and all you have to do is share it!",
          name: {
            label: "Name (optional)",
            hint: "The name is used to indicate to guests who the author of the poll is.",
          },
          email: {
            label: "Email address",
            hint: "The email address is used to send you an email with your poll information (including the administration link)",
          },
        },
        errorAlert:
          "Un problème empêche la création de votre sondage. Contactez-nous à l’adresse @:email si le problème persiste.",
      },
      admin: {
        id: {
          meta: {
            title: 'Administration of the poll "{pollName}"',
          },
          actions: {
            edit: "Edit poll",
            delete: "Delete poll",
            deleteModal: {
              title: "Delete poll",
              description:
                'You are about to delete the poll "{title}". You will no longer have access to it, and no one will be able to participate.',
              cancel: "Cancel",
              confirm: "Delete",
              errorAlert:
                "There is a problem with deleting your poll. Contact us at @:email if the problem persists.",
            },
          },
          intro: {
            createdBy: "Created by",
            createdAt: "Created on",
          },
          share: {
            title: "Share your poll",
            description:
              "Share this link with your guests to allow them to participate in the poll.",
            label: "Participation link",
            button: "Copy",
            successAlert:
              "The participation link has been copied to the clipboard, It’s your turn!",
            errorAlert:
              "There is a problem with copying the participation link. Contact us at @:email if the problem persists.",
          },
          responses: {
            title: "Responses and participations",
            vote: "vote | votes",
            maybe: "(maybe)",
            bestChoice: "Best choice",
          },
          error: {
            404: {
              title: "Poll not found",
              description:
                "The poll you are looking for does not exist or has been deleted.",
            },
          },
        },
        edit: {
          meta: {
            title: 'Editing poll "{pollName}"',
          },
          title: "Edit poll",
          back: "Back to poll",
          updatedPollAlert: {
            description: 'The poll "{title}" has been successfully updated',
            close: "Close",
          },
          titleAndDescription: {
            stepTitle: "Name and description",
            title: {
              label: "Name",
            },
            description: {
              label: "Description (optional)",
            },
          },
          choices: {
            stepTitle: "Dates and times",
            stepSubtitle:
              "You cannot edit existing dates and times, only add or delete them. Warning: Deleting a date will delete all times associated with that date.",
            choice: {
              dateLabel: "Date n°{index}",
              timeLabel: "Time n°{index}",
            },
            addNewChoice: "Add a date",
          },
          settings: {
            stepTitle: "Settings",
            hideVotes: {
              label: "Hide votes",
              help: "The names of the participants will be hidden from others (but not from you, obviously).",
            },
            endDate: {
              label: "End date",
              help: "The poll will no longer accept new responses after this date.",
              delete: "Delete",
            },
            notifyOnResponse: {
              label: "Receive an email for each participation",
              help: "We send you an email when someone responds to your poll, which is convenient.",
            },
          },
          adminInfos: {
            stepTitle: "Administrator",
            name: {
              label: "Name",
              hint: "The name is used to indicate to guests who the author of the poll is.",
            },
            email: {
              label: "Email address",
            },
          },
          submit: "Update",
          errorAlert:
            "There is a problem with updating your poll. Contact us at @:email if the problem persists.",
        },
      },
      id: {
        meta: {
          title: 'Take the poll "{pollName}"',
        },
        invited: "You have been invited to participate in this poll.",
        invitedBy:
          "You have been invited by {adminName} to participate in this survey.",
        expireOn: " You have until {endDate} to participate.",
        isExpired:
          "The deadline for this poll has passed. It is no longer possible to respond.",
        form: {
          choices: {
            yes: "Yes",
            maybe: "Maybe",
            no: "No",
          },
          name: "Your name",
          maybe: "(maybe)",
          withName: {
            yes: "{name} (you)",
            maybe: "{name} (you, maybe)",
          },
          withoutName: {
            yes: "You",
            maybe: "You (maybe)",
          },
          submit: "Vote",
        },
        confirmation: "Your vote has been taken into account!",
        errorAlert:
          "There is a problem submitting the poll. Contact us at @:email if the problem persists.",
      },
    },
  },
};
