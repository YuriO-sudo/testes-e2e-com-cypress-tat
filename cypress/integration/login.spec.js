it('successfully logs in', () => {
  cy.intercept('GET', '**/notes').as('getNotes')
  // var url = 'https://cognito-idp.eu-central-1.amazonaws.com/'
  cy.intercept('POST', '**.com').as('gambe2')

  cy.login(
    Cypress.env('USER_EMAIL'),
    Cypress.env('USER_PASSWORD'),
    { cacheSession: false }
  )
  // var url = 'https://m.stripe.com/6'
  cy.wait('@gambe2')
  cy.wait('@getNotes')
})