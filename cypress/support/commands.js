// Validate url
Cypress.Commands.add('validateUrl', (url) => {
    cy.url().should('include', url)
})