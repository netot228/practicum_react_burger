import { DATA_localStorage } from '../../src/service/data'

describe("Проверяем конструктор", () => {
    beforeEach(() => {

        localStorage.userData = JSON.stringify(DATA_localStorage.userData);
        localStorage.refreshToken = JSON.stringify(DATA_localStorage.refreshToken);
        localStorage.accessToken = JSON.stringify(DATA_localStorage.accessToken);
        localStorage.tokenTimeout = new Date().getTime().toString();

        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
        cy.intercept("GET", "/api/auth/user", { fixture: "user.json" }).as("getUser");
        cy.intercept('POST', "api/orders", { fixture: "order.json" }).as('createOrder');

        cy.viewport(1440, 900);
        cy.visit("/");
        cy.wait('@getIngredients');
        cy.wait('@getUser');

    });
    afterEach(() => {
        cy.clearLocalStorage();
    })

    it('Соберем бургер', () => {

        // тащим булку
        cy.get('[data-testid="ingredient_type_bun"]')
            .contains('Краторная булка N-200i')
            .trigger('dragstart');

        cy.get('[data-testid="burger_constructor_droptarget"]')
            .trigger('drop');

        // проверяем, что счетчик изменился для ингредиента
        cy.get('[data-testid="ingredient_type_bun"]')
            .contains('Краторная булка N-200i')
            .find('.counter__num').contains('1')

        // добавляем пару соусов и проверяем что счетчик также изменился
        cy.get('[data-testid="ingredient_type_sauce"]')
            .contains('Соус Spicy-X')
            .trigger('dragstart');

        cy.get('[data-testid="burger_constructor_droptarget"]')
            .trigger('drop');

        cy.get('[data-testid="ingredient_type_sauce"]')
            .contains('Соус Spicy-X')
            .find('.counter__num').contains('1');

        cy.get('[data-testid="ingredient_type_sauce"]')
            .contains('Соус Spicy-X')
            .trigger('dragstart');

        cy.get('[data-testid="burger_constructor_droptarget"]')
            .trigger('drop');

        cy.get('[data-testid="ingredient_type_sauce"]')
            .contains('Соус Spicy-X')
            .find('.counter__num').contains('2');

        // кликаем создать заказ
        cy.get('[data-testid="order_btn_wrapper"]')
            .contains('Оформить заказ')
            .click();

        // ждем подменного ответа
        cy.wait('@createOrder');
        cy.get('[data-testid="modal"]').should('be.visible');

        cy.get('[data-testid="order_num"]').should('have.text', '68938');

        cy.get('[data-testid="modal_closebtn"]').should('be.visible');
        cy.get('[data-testid="modal_closebtn"]').click();

        cy.get('[data-testid="modal"]').should("not.exist");

    })

})
