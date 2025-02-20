import {SEND_ORDER_ENDPOINT} from '../../src/service/api-endpoints';

describe("Проверяем конструктор", ()=>{
    beforeEach(() => {
        
        cy.intercept('POST', SEND_ORDER_ENDPOINT, {
            fixture: 'order.json'
        }).as('createOrder');

        cy.viewport(1440, 900);
        cy.visit("http://localhost:3000/");
    });

    it('Соберем бургер', ()=>{

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
        cy.get('[data-testid="order_btn_wrapper"]').click();
        // ждем подменного ответа
        cy.wait('@createOrder');

        cy.get('[data-testid="modal"]').should('be.visible');

    })
    
})
