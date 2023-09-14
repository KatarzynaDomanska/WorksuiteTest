import { parseInt } from "lodash";

export default class Payment {

    newExpenseButton() {
        cy.xpath('//a[@class=\'btn-default\']/span')
            .click();
    }

    getExpenseModal() {
        cy.get('.document-modal.add-payment-modal')
            .find('h1')
            .should('have.text', 'Add new expense');
    }

    findPaymentPartner() {
        cy.get('.selected-vendor')
            .contains(' Test Vendor 1 ');
    }

    fillTotalAmount() {
        cy.xpath('//input[@placeholder=\'Amount\']')
            .type(9999);
    }

    selectCurrency() {
        cy.xpath('//div[@class=\'col-sm-4 currency\']//select')
            .select('PLN')
            .should('have.value', 'PLN');
    }

    typeExpenseName() {
        cy.xpath('//input[@placeholder=\'Expense name\']')
            .type('Test expense name');
    }

    typeInvoiceNote() {
        cy.get('#invoiceNote')
            .type('Test invoice note');
    }

    pickPaymentDueDate() {
        cy.get('.pick-date > .datepicker')
            .click(),
            cy.get('.bootstrap-datetimepicker-widget')
                .should('be.visible'),
            cy.get(':nth-child(4) > :nth-child(6)')
                .click(),
            cy.get('.date')
                .should('not.have.text', ' Choose date ');
    }

    typeHowMuchMoney() {
        cy.xpath('//div[@class=\'custom-field__83\']//input')
            .type(1000);
    }

    uploadFile() {
        cy.xpath('//r-input-file//div[@role=\'presentation\']')
            .selectFile('cypress/fixtures/testFile.pdf', {
                action: 'drag-drop'
            }).then(() => {
                cy.contains('.css-a57lo7', 'testFile.pdf', { timeout: 5000 })
                    .should('be.visible');
            })
    }

    sendExpenseForm() {
        cy.xpath('//div[@class=\'modal-footer\']//button')
            .should('have.text', ' Send   ')
            .click(),
            cy.get('.modal-dialog')
                .should('not.be.visible');
    }

    checkPaymentStatus() {
        cy.get(':nth-child(2) > .payment-item__status > payment-status > .payment-status')
            .should('have.text', ' new ');
    }

    checkPaymentPreview() {
        cy.get(':nth-child(2) > .payment-item__name_and_project > .payment-item__name')
            .click(),
            cy.get('.modal-dialog')
                .should('be.visible'),
            cy.get('.icon-cross-icon')
                .click();
    }

    getNumberOfExpenses() {
        var oldValue;
        var newValue;
        let csrfToken;

        cy.request({
            method: 'GET',
            url: 'https://autotest-recruitment.qa.shortlist.co/api/v/payments/?ordering=-created_at&page=1&page_size=24',
        }).then((response) => {
            expect(response.status).to.equal(200);

            const firstCount = response.body.count;
            oldValue = parseInt(firstCount, 10)
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
                expect(response.status).to.equal(202);
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