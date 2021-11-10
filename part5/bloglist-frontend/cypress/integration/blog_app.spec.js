describe('blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const testuser = {
            name: 'Lalit Ghimire',
            username: 'lalit',
            password: 'password',
        }
        cy.request('POST', 'http://localhost:3003/api/users', testuser)
        cy.visit('http://localhost:3000')
    })
    it('login form is shown', function () {
        cy.get('#loginform-username')
        cy.get('#loginform-password')
    })

    describe('Login', function () {
        it('login successful with correct credentials', function () {
            cy.get('#loginform-username').type('lalit')
            cy.get('#loginform-password').type('password')
            cy.get('#login-btn').click()

            cy.contains('Lalit Ghimire is logged in')
        })
        it('login fails with wrong credentials', function () {
            cy.get('#loginform-username').type('lalit')
            cy.get('#loginform-password').type('wrongpassword')
            cy.get('#login-btn').click()

            cy.get('.error').should('contain', 'Wrong credentials provided')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})
