describe('Проверяем показ деталей по ингредиенту', () => {

    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
        cy.viewport(1440, 900);
        cy.visit("/");
        cy.wait('@getIngredients');
    })

    it('Покажем окно с деталями ингридиента', () => {

        // проверяем, что ингредиенты отобразились
        cy.get('[data-testid="ingredients_section"]')
            .should('be.visible');

        // эмулируем клик по ингредиенту
        cy.get('[data-testid="ingredient_type_sauce"]')
            .contains('Соус Spicy-X')
            .click()

        // проверяем, что открылось модальное окно
        cy.get('[data-testid="modal"]').should('be.visible');

        // проверяем, что модальное окно содержит нужный соус
        cy.get('[data-testid="ingredient_name"]').should('have.text', 'Соус Spicy-X');

        // проверим клик по слою для закрытия модального окна
        cy.get('[data-testid="modal"]').should('be.visible');
        cy.get('[data-testid="modal"]').find('[class*=modal_overlay]').click({ force: true });

        // проверим, что модальное окно закрылось
        cy.get('[data-testid="modal"]').should("not.exist");

    })

})