import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pageObjects/LoginPage";
import { ProductsPage } from "../../pageObjects/ProductsPage";
import { CartPage } from "../../pageObjects/CartPage";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();

Given("que estou logado na aplicação", () => {
  loginPage.loginComUsuarioValido();
  productsPage.validarTelaProdutos();
});

When("adiciono um produto ao carrinho", () => {
  productsPage.adicionarBackpack();
  productsPage.irParaCarrinho();
});

Then("devo visualizar o produto no carrinho", () => {
  cartPage.validarProdutoNoCarrinho("Sauce Labs Backpack");
});
