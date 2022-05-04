describe('The Home Page', () => {
    beforeEach(() => {
        cy.visit(`/`)
    })

    it('can search on the home search bar', () => {
        cy.get('#home-hero')
            .find('input[type="search"]')
            .type('harry potter{enter}')

        cy.url().should('include', '/search?q=harry%20potter')
        cy.get('h2').should('contain', 'harry potter')
    })

    it('can click on one of the popular books', () => {
        cy.get('.books-carousel')
            .find('a')
            .first()
            .then($a => {
                const href = $a.prop('href')
                cy.get('.books-carousel').find('a').first().click()
                cy.url().should('include', href)
            })
    })
})
