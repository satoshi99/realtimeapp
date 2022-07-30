/// <reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Shall navigate to DashBoard when successfully login', () => {
    cy.get('input[placeholder="Email"]').type('test@gmail.com')
    cy.get('input[placeholder="Password"]').type('testpass')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('Shall navigate to Auth when logout clicked', () => {
    cy.get('input[placeholder="Email"]').type('test@gmail.com')
    cy.get('input[placeholder="Password"]').type('testpass')
    cy.get("[type='submit']").click()
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.get('[data-testid="logout"]').click()
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
  })
  it('Shall not navigate to DashBoard with wrong credentials', () => {
    cy.get('input[placeholder="Email"]').type('test@gmail.com')
    cy.get('input[placeholder="Password"]').type('testpuss')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('not.exist')
  })
  it('Shall navigate to DashBoard when successfully registered', () => {
    cy.get('input[placeholder="Email"]').type('test4@gmail.com')
    cy.get('input[placeholder="Password"]').type('testpass')
    cy.contains('change mode ?').click()
    cy.get('[type="submit"]').should('have.text', 'Register')
    cy.get('[type="submit"]').click()
    cy.get('input[placeholder="Username"]').should(
      'have.value',
      'test4@gmail.com'
    )
  })
})

export {}
