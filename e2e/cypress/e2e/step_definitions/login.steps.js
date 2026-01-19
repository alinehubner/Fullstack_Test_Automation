import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pageObjects/LoginPage";

const loginPage = new LoginPage();

Given("que acesso a pagina de login", () => {
  loginPage.visit();
});

When("realizo login com usuario valido", () => {
  const username = Cypress.env("USERNAME");
  const password = Cypress.env("PASSWORD");

  loginPage.preencherUsuario(username);
  loginPage.preencherSenha(password);
  loginPage.clicarLogin();
});

Then("devo visualizar a lista de produtos", () => {
  cy.contains("Products").should("be.visible");
});
