import { DATA_localStorage } from '../../src/service/data'
import { selectors } from '../support/selector-constants';
describe("Проверяем конструктор", () => {
    beforeEach(() => {

        localStorage.userData = JSON.stringify(DATA_localStorage.userData);
        localStorage.refreshToken = JSON.stringify(DATA_localStorage.refreshToken);
        localStorage.accessToken = JSON.stringify(DATA_localStorage.accessToken);
        localStorage.tokenTimeout = new Date().getTime().toString();

        cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
        cy.intercept("GET", "/api/auth/user", { fixture: "user.json" }).as("getUser");
        cy.intercept('POST', "api/orders", { fixture: "order.json" }).as('createOrder');

        // cy.viewport(1440, 900);
        cy.visit("/");
        cy.wait('@getIngredients');
        cy.wait('@getUser');

    });
    afterEach(() => {
        cy.clearLocalStorage();
    })

    it('Соберем бургер', () => {

        // тащим булку
        cy.get(selectors.bun)
            .contains(selectors.bunName)
            .trigger('dragstart');

        cy.get(selectors.constructor)
            .trigger('drop');

        // проверяем, что счетчик изменился для ингредиента
        cy.get(selectors.bun)
            .contains(selectors.bunName)
            .find('.counter__num').contains('1')

        // добавляем пару соусов и проверяем что счетчик также изменился
        cy.get(selectors.sauce)
            .contains(selectors.souceName)
            .trigger('dragstart');

        cy.get(selectors.constructor)
            .trigger('drop');

        cy.get(selectors.sauce)
            .contains(selectors.souceName)
            .find('.counter__num').contains('1');

        cy.get(selectors.sauce)
            .contains(selectors.souceName)
            .trigger('dragstart');

        cy.get(selectors.constructor)
            .trigger('drop');

        cy.get(selectors.sauce)
            .contains(selectors.souceName)
            .find('.counter__num').contains('2');

        // кликаем создать заказ
        cy.get('[data-testid="order_btn_wrapper"]')
            .contains('Оформить заказ')
            .click();

        // ждем подменного ответа
        cy.wait('@createOrder');
        cy.get(selectors.modal).should('be.visible');

        cy.get('[data-testid="order_num"]').should('have.text', '68938');

        cy.get(selectors.modalClosebtn).should('be.visible');
        cy.get(selectors.modalClosebtn).click();

        cy.get(selectors.modal).should("not.exist");

    })

})
