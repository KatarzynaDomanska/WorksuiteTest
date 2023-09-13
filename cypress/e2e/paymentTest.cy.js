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

    it.skip('Open payment page', () => {
        cy.validateUrl('/payments/unpaid-work')
    });

    it('Open ADD NEW EXPENSE modal', () => {
        payment.openExpenseModal();
        payment.getExpenseModal();
        payment.findPaymentPartner();
    })
})