// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element based on label
       * @example cy.getByLabel('Title')
       */
      getByLabel(value: string): Chainable
    }
  }
}


Cypress.Commands.add('getByLabel', (label: string) => {
  cy
    .contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
})

// Overwrite the `visit` command to wait for Nuxt app hydration
Cypress.Commands.overwrite('visit', (originalFn, url) => {
  originalFn(url)
  cy.get('html[data-hydrationcomplete="true"]')
})

export {}