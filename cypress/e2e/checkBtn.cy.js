describe('Проверка перехода по кнопке', ()=>{
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visit("http://localhost:3000/");
    });

    it("Должен быть переход на ленту заказов", () => {
        cy.get('[data-testid="check-header-btn_feed"]').click();
        cy.url().should('include', '/feed');
    });
})