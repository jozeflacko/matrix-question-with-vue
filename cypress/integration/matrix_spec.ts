describe('Ui test for matrix app', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        contains('Jozef Lacko').should('be.visible');
        contains('Start').should('be.visible').click();
        contains('What is your name?').should('be.visible');
        ;
        cy.get('input').type('Jozef');
        contains('Enter').should('be.visible').click()
        contains('Welcome').should('be.visible');
        contains('The biggest Matrix question was about choosing to know the Truth.').should('be.visible');
        ;
        contains('You will be offered the choice between a red pill and a blue pill.').should('be.visible');
        ;
        contains('The red pill represents an uncertain future. The blue pill represents a beautiful prison which would lead you back to ignorance.').should('be.visible');
        ;
        contains('How will you decide?').should('be.visible');
        cy.get('.pill').should('have.length', 2)
    });

    it('should choose red pill', () => {
        cy.get('.pill').first().click();
    });

    it('should choose blue pill', () => {
        cy.get('.pill').first().next().click();
        contains('Dear Jozef, enjoy a wonderful day and visit my web page:');
    });

    afterEach(() => {
        contains('jozeflacko.github.io/');
    })

    function contains(what: string) {
        return cy.contains(what, {timeout: 15000}) // I need more timeout because of animations!
    }
})
