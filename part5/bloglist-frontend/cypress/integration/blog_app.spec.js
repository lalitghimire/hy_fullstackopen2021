describe('blog app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.get('#loginform-username')
        cy.get('#loginform-password')
    })
})
