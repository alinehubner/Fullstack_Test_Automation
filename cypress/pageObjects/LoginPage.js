export class LoginPage {
    visit() {
      cy.visit("/");
    }
  
    preencherUsuario(usuario) {
      cy.get('[data-test="username"]').clear().type(usuario);
    }
  
    preencherSenha(senha) {
      cy.get('[data-test="password"]').clear().type(senha);
    }
  
    clicarLogin() {
      cy.get('[data-test="login-button"]').click();
    }

    loginComUsuarioValido() {
      this.visit();
      this.preencherUsuario(Cypress.env("user"));
      this.preencherSenha(Cypress.env("pass"));
      this.clicarLogin();
    }
    
  }
  