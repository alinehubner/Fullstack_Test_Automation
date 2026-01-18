export class CheckoutPage {
    preencherDados(firstName, lastName, postalCode) {
      cy.get('[data-test="firstName"]').type(firstName);
      cy.get('[data-test="lastName"]').type(lastName);
      cy.get('[data-test="postalCode"]').type(postalCode);
    }
  
    continuar() {
      cy.get('[data-test="continue"]').click();
    }
  
    finalizar() {
      cy.get('[data-test="finish"]').click();
    }
  
    validarConfirmacao() {
      cy.get(".complete-header").should("contain", "Thank you for your order");
    }
  }
  