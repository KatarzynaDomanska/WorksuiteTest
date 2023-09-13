export default class Dashboard {

    getViewport() {
        return cy.get('#viewport').should('be.visible');
    }

    clickPaymentTab() {
        return cy.get("[data-testid='SidebarItem-payments']").click();
    }

    checkExpansesNumber() {
        cy.get()
    }
};