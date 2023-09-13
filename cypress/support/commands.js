// Validate url
Cypress.Commands.add('validateUrl', (url) => {
    cy.url().should('include', url)
})

Cypress.Commands.add('scrollToBottom', () => {
    const tbody = '//table[@class=\'payment-list--v2\']//tbody'
    cy.xpath(tbody)  // Adjust the selector to target your table's tbody element
        .scrollTo('bottom')
        .then(($tbody) => {
            cy.get(tbody).should('have.length.gt', 0).then(($rows) => {
                if ($rows.length > 0) {
                    cy.xpath(tbody).scrollTo('bottom')
                } else {
                    return

                }
            });
        })
})