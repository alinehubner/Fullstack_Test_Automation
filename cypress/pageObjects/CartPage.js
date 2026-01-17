export class CartPage {
  validarProdutoNoCarrinho(nomeProduto) {
    cy.get(".inventory_item_name").should("contain", nomeProduto);
  }

  clicarCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}
