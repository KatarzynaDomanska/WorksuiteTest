export default class Dashboard {

    viewportSelector = '#viewport';
    paymentTabSelector = "[data-testid='SidebarItem-payments']";

    getViewport() {
        return cy.get(this.viewportSelector).should('be.visible');
    }

    clickPaymentTab() {
        return cy.get(this.paymentTabSelector).click();
    }
};