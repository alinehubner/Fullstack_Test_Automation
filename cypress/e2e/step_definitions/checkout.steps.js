import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pageObjects/LoginPage";
import { ProductsPage } from "../../pageObjects/ProductsPage";
import { CartPage } from "../../pageObjects/CartPage";
import { CheckoutPage } from "../../pageObjects/CheckoutPage";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given("que tenho um produto no carrinho", () => {
  loginPage.loginComUsuarioValido();
  productsPage.validarTelaProdutos();

  productsPage.adicionarBackpack();
  productsPage.irParaCarrinho();
  cartPage.validarProdutoNoCarrinho("Sauce Labs Backpack");
});

When("finalizo o checkout preenchendo os dados", () => {
  cartPage.clicarCheckout();
  checkoutPage.preencherDados("Aline", "Hubner", "70000-000");
  checkoutPage.continuar();
  checkoutPage.finalizar();
});

Then("devo visualizar a confirmação do pedido", () => {
  checkoutPage.validarConfirmacao();
});
