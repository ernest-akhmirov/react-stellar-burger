describe('Burger Constructor  Test', () => {
    const modalSelector = '[class^=Modal_modal]';
    const burgerConstructorSelector = '[class^=BurgerConstructor_content]';

    beforeEach(() => {
        cy.viewport(1920, 1024);
        cy.visit('/');
    });

    it('should open ingredient details with completed ingredient information', () => {
        cy.get('[class^=IngredientCard_card]').first().click();
        cy.get(modalSelector).should('exist')
            .contains('Детали ингредиента');
        cy.get(modalSelector).contains('Краторная булка N-200i');
        cy.contains('Калории');
        cy.get(modalSelector).contains('420');
        cy.get(modalSelector).contains('80');
        cy.get(modalSelector).contains('24');
        cy.get(modalSelector).contains('53');
        cy.get('[class^=Modal_icon]').click();
        cy.get(modalSelector).should('not.exist')
    });

    it('should drag and drop bun and create an order', () => {
        cy.get('[class^=ingredientImg]').first().trigger('dragstart');
        cy.get(burgerConstructorSelector).trigger('drop');
        cy.get(burgerConstructorSelector).contains('Краторная булка')
        cy.get('button').contains('Оформить заказ').click();
        cy.get('form input[type=email]').type('testcy@testcy.com');
        cy.get('form input[type=password]').type('test123');
        cy.get('button').contains('Войти').click();
        cy.contains('Оформить заказ').should('exist');
        cy.get('button').contains('Оформить заказ').click();
        cy.intercept("POST", "api/orders", {fixture: "order.json"});
        cy.contains('Ваш заказ начали готовить').should('exist');
        cy.get('[class^=ModalOverlay_overlay]').should('exist').click({force: true, x: 100, y: 200});
        cy.get(modalSelector).should('not.exist');
        cy.get(burgerConstructorSelector).contains('булка').should('not.exist');
    });

});