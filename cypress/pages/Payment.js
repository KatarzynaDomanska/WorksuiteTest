
export default class Payment {

    openExpenseModal() {
        return cy.xpath('//a[@class=\'btn-default\']/span').click();
    }

    getExpenseModal() {
        return cy.get('.document-modal.add-payment-modal').find('h1').should('have.text', 'Add new expense');
    }

    findPaymentPartner() {
        return cy.get('.selected-vendor').contains(' Test Vendor 1 ');
    }

    getPaymentList() {
        return cy.get('#payment-list--v2').should('be.visible');
    }
}