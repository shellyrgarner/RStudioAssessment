// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('https://rstudio.cloud/')

        cy.get('#currentUser > div > div > a:nth-child(1) > span').contains('Log In').click();

        cy.get('input[name=email]').type('sgrenea@gmail.com')
        cy.get('button[type=submit]').contains('Continue').click()

        cy.get('input[type=password').type('userTest123!')
        cy.get('button[type=submit]').contains('Log In').click()
        cy.url().should('contain', '/content/yours?sort=name_asc')
    })

})

beforeEach(() => {
    cy.login(
        Cypress.env('sgrenea@gmail.com'),
        Cypress.env('userTest123!')
    )
})


// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })