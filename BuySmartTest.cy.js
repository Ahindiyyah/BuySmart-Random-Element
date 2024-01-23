import 'cypress-xpath';

describe('BuySmart Test', () => {
    it('Choose Random Element then checkout', () => {
        cy.visit('https://smartbuy-me.com/smartbuystore/en/');
        cy.get('#cboxLoadedContent > .content > :nth-child(3) > .close-popups').click();
        cy.get(':nth-child(13) > .mobile-menu > .btn').click();
        cy.xpath('/html/body/main/header/nav/div/div[1]/div[1]/div/div[2]/nav/div/ul[2]/li[2]/a')
            .click();
        cy.contains('Smart Mobile').click();

        function ChoosingElement() {
            cy.get('.product-item.item_grid').then(Elements => {
                let randomIndex = Math.floor(Math.random() * Elements.length);
                cy.get('.product-item.item_grid').eq(randomIndex).click();

                const RandomArray = [5, 4, 6];
                const RandomIndex = Math.floor(Math.random() * RandomArray.length);
                const ArrayIndex = RandomArray[RandomIndex];
                cy.get('#pdpAddtoCartInput').clear().type(ArrayIndex);
            });
        }

        function checkAndChoose() {
            cy.get('#addToCartButton').invoke('text').then((cartText) => {
                if (cartText.includes('Sold Out')) {
                    cy.go('back');
                    ChoosingElement();
                    checkAndChoose(); 
                } else {
                    cy.get('#addToCartButton').click();
                    cy.get('#addToCartLayer > .btn-primary').click()
                }
            });
        }

        ChoosingElement();
        checkAndChoose();
    });
});
