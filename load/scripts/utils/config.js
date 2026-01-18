/**
 * -----------------------------------------
 * Centraliza configurações de ambiente para o teste k6.
 * -----------------------------------------
 */

export function getConfig() {
    return {
      // Endpoint base do sistema sob teste
      baseUrl: __ENV.BASE_URL || "https://restful-booker.herokuapp.com",
  
      // Credenciais
      // Em projetos reais nao deve commitar credenciais; passar sempre por env/secret
      username: __ENV.USERNAME || "admin",
      password: __ENV.PASSWORD || "password123",
    };
  }
  