describe('burgerTown is available', function () {
    it('burgerTown should be available on localhost:3000', function () {
        cy.visit('http://localhost:3000/');
    });
});