/// <reference path="../support/commands.d.ts" />

describe('Scenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    // cy.intercept('POST', '**/6').as('gambiarra')
    cy.intercept('POST', '**.com').as('gambiarra')
    cy.login()
  })

  it('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    // cy.wait('@gambiarra')
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    // cy.wait('@gambiarra')
    cy.wait('@getNotes')

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@gambiarra')
    cy.wait('@getNotes')
  })

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()
    // cy.wait('@gambiarra')
    cy.wait('@getNotes')
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })

  it('logs out', { tags: '@desktop-and-tablet' }, () => {
    cy.visit('/')
    cy.wait('@gambiarra')
    cy.wait('@getNotes')
    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.nav > :nth-child(2) > a').click()
    cy.get('#email').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })

})