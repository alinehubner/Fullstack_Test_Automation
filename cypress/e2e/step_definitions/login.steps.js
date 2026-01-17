import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pageObjects/LoginPage";

const loginPage = new LoginPage();

Given("que acesso a pagina de login", () => {
  loginPage.visit();
});

When("realizo login com usuario valido", () => {
  loginPage.preencherUsuario(Cypress.env("user"));
  loginPage.preencherSenha(Cypress.env("pass"));
  loginPage.clicarLogin();
});

Then("devo visualizar a lista de produtos", () => {
  cy.contains("Products").should("be.visible");
});
