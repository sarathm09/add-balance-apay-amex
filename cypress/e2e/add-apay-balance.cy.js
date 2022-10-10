const cards = Cypress.env('CARDS')

cards.map(card => {
  describe(`Recharge using ${card.name}`, () => {

    for (let i = 0; i < card.repeat; i++) {
      it(`Adding Rs.${card.rechargeAmount} ${i + 1}/${card.repeat} times`, () => {
        cy.visit(Cypress.env('AMZN_BASE_URL'))
        cy.get('.nav-line-1').contains('Hello, sign in').click()

        // Sign in page
        cy.get('#ap_email').type(Cypress.env('AMZN_USER_NAME'))
        cy.get('#continue').click()
        cy.get('#ap_password').type(Cypress.env('AMZN_PASS'))
        cy.get('#signInSubmit').click()

        // Home page
        cy.get('#nav-link-accountList').click()
        // Accounts list page
        cy.get('a').contains('Amazon Pay balance').click()

        // Add balance page
        cy.get('#gc-asv-manual-reload-amount').type(card.rechargeAmount)
        cy.get('#form-submit-button').click()

        // WLP PSP
        cy.get('.pmts-selectable-add-credit-card')
          .contains('Pay with Debit/Credit/ATM Cards')
          .click()
          .get('a').contains('Enter card details')
          .click()

        cy.wait(5000)

        // Add card popup
        cy.get('iframe[name="ApxSecureIframe"]')
          .iframe('body input[name="addCreditCardNumber"]')
          .type(card.number)
        cy.get('iframe[name="ApxSecureIframe"]')
          .iframe('body select[name="ppw-expirationDate_month"]')
          .select(card.expiry.month, { force: true })
        cy.get('iframe[name="ApxSecureIframe"]')
          .iframe('body select[name="ppw-expirationDate_year"]')
          .select(card.expiry.year, { force: true })
        cy.get('iframe[name="ApxSecureIframe"]')
          .iframe('body input[name="ppw-widgetEvent:AddCreditCardEvent"]')
          .click()

        cy.wait(3000)

        // WLP page
        cy.get('.pmts-credit-card-row.pmts-selected')
          .contains(`ending in ${card.number.slice(-4)}`)
        cy.get('.pmts-credit-card-row.pmts-selected')
          .within(() => {
            cy.get('input[type="password"]')
              .type(card.cvv)
            // If the Tokenization checkbox is there, check it
            // cy.get('div.a-checkbox')
            //   .contains('Save card as per new RBI guidelines.')
            //   .click({ force: true })
          })
        cy.get('input[name="ppw-widgetEvent:SetPaymentPlanSelectContinueEvent"]:first').click()
        cy.wait(10000)

        // Address select
        cy.get('input')
          .contains('Add Money to balance')
          .click()
        cy.wait(60000)

        cy.url().should('include', '/buy/thankyou')
      })
    }
  })
})