/// <reference types='cypress' />
import Payment from '../pages/Payment';
import Dashboard from '../pages/Dashboard';

describe('Payment', () => {
    const payment = new Payment();
    const dashboard = new Dashboard();

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'))
        dashboard.getViewport();
        dashboard.clickPaymentTab();
    });

    it.skip('User should pen payment page', () => {
        cy.validateUrl('/payments/unpaid-work')
    });

    it('User should click "Add new expense" button to see modal', () => {
        payment.clickNewExpenseButton();
        payment.getExpenseModal();
    });

    it('User should see partner name on modal', () => {
        payment.clickNewExpenseButton();
        payment.findPaymentPartner();
    });

    it('User should fill payment form, upload PDF and save form', () => {
        payment.clickNewExpenseButton();
        payment.fillExpenseForm();
        payment.sendExpenseForm();
    });

    payment.getNumberOfExpenses();
});

it('Expenses number should be higher after saving form', () => {

});

    // it('Check if new payments are visible', () => {
    //     let initialRowCount;
    //     cy.scrollToBottom()

    // })
})