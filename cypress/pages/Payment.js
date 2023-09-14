import { method } from "bluebird";
import { parseInt } from "lodash";

export default class Payment {

    clickNewExpenseButton() {
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

    getNumberOfExpenses() {
        var oldValue; //zmienne deklarowane za pomocą let nie są przypisywane do globalnego zakresu. Są dostępne tylko w zakresie, w którym zostały zadeklarowane.
        var newValue;
        let csrfToken;

        cy.request({
            method: 'GET',
            url: 'https://autotest-recruitment.qa.shortlist.co/api/v/payments/?ordering=-created_at&page=1&page_size=24',
        }).then((response) => {
            expect(response.status).to.equal(200);

            const firstCount = response.body.count;
            // responseBody zawiera payload odpowiedzi, dostalismy sie tam uzywajac response.body, pasujemy odp JSON
            oldValue = parseInt(firstCount, 10)
            const oldValueType = typeof oldValue
            console.log(oldValueType)
        });

        cy.getCookie('csrftoken').then((token) => {
            csrfToken = token.value;
        }).then(() => {

            cy.request({
                method: 'POST',
                url: 'https://autotest-recruitment.qa.shortlist.co/api/v/payments/',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Cookie": "sessionid=phy8vl26ax9jjfb75gsua6ea7hq4vvv0",
                    "Referer": "https://autotest-recruitment.qa.shortlist.co/",
                    "X-Csrftoken": csrfToken
                },
                body: {
                    "vendor": 287,
                    "assigned_buyer": null,
                    "currency": "PLN",
                    "custom_field_data": {
                        "83": 100
                    },
                    "custom_field_templates": [
                        72
                    ],
                    "custom_fields": {
                        "83": 12
                    },
                    "note": "API TEST NOTE",
                    "number": "EXPENSE NAME FOR API TEST",
                    "payment_due": "2023-09-15T23:59:59+02:00",
                    "related_project": null,
                    "related_task": null,
                    "status": 0,
                    "total_amount": 1000
                },

            }).then((response) => {
                expect(response.status).to.equal(202); //mozna jeszcze zwalidowac na message jaki otrzymamy
            });
        });

        cy.request({
            method: 'GET',
            url: 'https://autotest-recruitment.qa.shortlist.co/api/v/payments/?ordering=-created_at&page=1&page_size=24'
        }).then((response) => {
            expect(response.status).to.equal(200);

            const secondCount = response.body.count;
            newValue = parseInt(secondCount, 10)

            expect(newValue).to.be.greaterThan(oldValue);
        });
    }
}