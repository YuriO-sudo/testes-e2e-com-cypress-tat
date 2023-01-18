it('successfully logs in', () => {
  cy.intercept('GET', '**/notes').as('getNotes')

  cy.login(
    Cypress.env('USER_EMAIL'),
    Cypress.env('USER_PASSWORD'),
    { cacheSession: false }
  )
  // var url = 'https://cognito-idp.eu-central-1.amazonaws.com/'
  var url = 'https://m.stripe.com/6'
  cy.intercept('POST', url).as('gambiarra')
  cy.wait('@gambiarra')
  cy.wait('@getNotes')
})