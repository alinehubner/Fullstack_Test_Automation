export class ProductsPage {
    validarTelaProdutos() {
      cy.get(".title").should("contain", "Products");
    }
  
    adicionarBackpack() {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
  
    irParaCarrinho() {
      cy.get(".shopping_cart_link").click();
    }
  }
  