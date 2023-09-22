/// <reference types='cypress' />
import Payment from '../pages/Payment';
import Dashboard from '../pages/Dashboard';

describe('Payment', () => {
    const payment = new Payment();
    const dashboard = new Dashboard();

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'));
        dashboard.getViewport();
        dashboard.clickPaymentTab();
    });

    it('User should see payment page', () => {
        cy.validateUrl('/payments/unpaid-work')
    });

    it('User should click "Add new expense" button to see modal', () => {
        payment.newExpenseButton();
        payment.getExpenseModal();
    });

    it('User should see partner name on modal', () => {
        payment.newExpenseButton();
        payment.findPaymentPartner();
    });

    it('User should fill payment form, upload PDF and save form', () => {
        payment.newExpenseButton();
        payment.fillTotalAmount();
        payment.selectCurrency();
        payment.typeExpenseName();
        payment.typeInvoiceNote();
        payment.pickPaymentDueDate();
        payment.typeHowMuchMoney();
        payment.uploadFile();
        payment.sendExpenseForm();
    });

    it('User should see new payment status', () => {
        payment.checkPaymentStatus();
    });

    it('User should see payment preview', () => {
        payment.checkPaymentPreview();
    });

    it('Additional api check', () => {
        payment.getNumberOfExpenses();
    });

    after(() => {
        cy.visit(Cypress.config('baseUrl'));
        dashboard.getViewport();
    });
});