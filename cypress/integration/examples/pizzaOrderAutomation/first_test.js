/// <reference types="cypress" />

const ingredients = ["Cold cuts", "Pepperoni", "Feta", "Mozzarella", "Swiss cheese", "Spices", "Vegetables"]

beforeEach( () => {
    cy.visit('http://stanislavv.ca/React/PizzaMaker1/#')
})

describe('Pizza Order Test Suit', () => {

    it('Verify page Title - positive', () => {
        cy.title().should('eq','Pizza Builder')
    })

    // it('Verify page Title - negative', () => {
    //     cy.title().should('eq','Pizza Builder Site')
    // })

    it('Verify Pizza Base Price on page load', () => {
        // Validate Total on the top badge
        cy.get('.badge').contains('3.00$')
        // Validate Total on the bottom
        cy.get('strong').contains('3.00$')
    })


    it('Verify topping list on the page', () => {
        cy.get('.list-group-item.choseOption').each( (item, index) => {
            // Topping list on UI should match the topping list in defined as constant
            cy.wrap(item).get('.my-0').contains(ingredients[index])
        })
    })

    it('Verify Pizza Price after adding one topping', () => {
        // Click the first topping Cold cuts
        cy.get('.list-group-item.choseOption').each( ($item) => {
            if ($item.find('.my-0').text() === 'Cold cuts') {
                cy.wrap($item).find("[data-type='plus'] > svg > path").click()
            }
        })

        // Validate total price is correct
        cy.get('.badge').contains('8.00$')
        // Validate Total on the bottom
        cy.get('strong').contains('8.00$')
    })


    it('Verify Reset functionality after adding one topping', () => {

        // Click the first topping Cold cuts
        cy.get('.list-group-item.choseOption').each( ($item) => {
            if ($item.find('.my-0').text() === 'Cold cuts') {
                cy.wrap($item).find("[data-type='plus'] > svg > path").click()
            }
        })
        // Validate total price is correct
        cy.get('.badge').contains('8.00$')
        cy.get('.align-items-center > .btn').click()

        // Should be base price after reset
        cy.get('.badge').contains('3.00$')
        // Validate Total on the bottom
        cy.get('strong').contains('3.00$')

    })

    it('Verify Your Pizza ingredients images after adding 2 ingredients', () => {
        // Click the first topping Cold cuts
        cy.get('.list-group-item.choseOption').each( ($item) => {
            if ($item.find('.my-0').text() === 'Cold cuts') {
                cy.wrap($item).find("[data-type='plus'] > svg > path").click()
            } else if ($item.find('.my-0').text() === 'Spices') {
                cy.wrap($item).find("[data-type='plus'] > svg > path").click()
            }
        })
        // Validate count of ingredients pictures
        cy.get('.ingredientContainer').should('have.length', 3)
    })

})