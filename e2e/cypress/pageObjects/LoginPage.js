export class LoginPage {
  visit() {
    cy.visit("/");
  }

  preencherUsuario(usuario) {
    cy.get('[data-test="username"]').clear().type(usuario);
  }

  preencherSenha(senha) {
    cy.get('[data-test="password"]').clear().type(senha, { log: false });
  }

  clicarLogin() {
    cy.get('[data-test="login-button"]').click();
  }

  loginComUsuarioValido() {
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");

    this.visit();
    this.preencherUsuario(username);
    this.preencherSenha(password);
    this.clicarLogin();

    // garante que o login concluiu antes de continuar
    cy.contains("Products", { timeout: 15000 }).should("be.visible");
  }
}

  