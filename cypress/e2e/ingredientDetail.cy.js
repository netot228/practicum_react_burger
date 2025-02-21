import { selectors } from "../support/selector-constants";
describe('Проверяем показ деталей по ингредиенту', () => {

    beforeEach(() => {
        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
        // cy.viewport(1440, 900);
        cy.visit("/");
        cy.wait('@getIngredients');
    })

    it('Покажем окно с деталями ингридиента', () => {

        // проверяем, что ингредиенты отобразились
        cy.get('[data-testid="ingredients_section"]')
            .should('be.visible');

        // эмулируем клик по ингредиенту
        cy.get(selectors.sauce)
            .contains(selectors.souceName)
            .click()

        // проверяем, что открылось модальное окно
        cy.get(selectors.modal).should('be.visible');

        // проверяем, что модальное окно содержит нужный соус
        cy.get('[data-testid="ingredient_name"]').should('have.text', 'Соус Spicy-X');

        // проверим клик по слою для закрытия модального окна
        cy.get(selectors.modal).should('be.visible');
        cy.get(selectors.modal).find('[class*=modal_overlay]').click({ force: true });

        // проверим, что модальное окно закрылось
        cy.get(selectors.modal).should("not.exist");

    })

})