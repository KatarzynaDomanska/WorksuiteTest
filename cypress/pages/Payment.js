
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

    fillExpenseForm() {
        cy.xpath('//input[@placeholder=\'Amount\']').type(9999)
        cy.xpath('//div[@class=\'col-sm-4 currency\']//select').select('PLN').should('have.value', 'PLN');
        // cy.get('.css-ji32nv').selectFile('../fixtures/testFile.pdf', { action: 'drag-drop' });
        cy.xpath('//input[@placeholder=\'Expense name\']').type('Test expanse name');
        cy.get('#invoiceNote').type('Test invoice note');
        // date
        // There is no file called 'Task'
        cy.xpath('//div[@class=\'custom-field__83\']//input').type(1000);
        // There is no save button in modal
        cy.xpath('//div[@class=\'modal-footer\']//button').should('have.text', ' Send   ').click();
    }
}