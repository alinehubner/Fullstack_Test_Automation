# Fullstack Test Automation

Repositório criado para demonstração de automação de testes em diferentes níveis:

- **E2E**: testes end-to-end com Cypress  
- **API**: testes de API utilizando Postman + Newman  
- **Load**: testes de carga com k6 (em progresso)

O objetivo é apresentar uma abordagem organizada, reprodutível e próxima da realidade de projetos profissionais.

---

## Pré-requisitos

- Node.js (LTS)
- npm
- PowerShell (para execução do script de API no Windows)

---

## E2E Tests (Cypress)

Os testes E2E foram desenvolvidos com Cypress e estão localizados na estrutura principal do projeto.

### Executar os testes E2E
```bash
npm ci
npm run cy:run
