# 🧪 E2E — Cypress

Este módulo contém os testes **End-to-End (E2E)** usando **Cypress** com suporte a **BDD (Cucumber)**.

> 📍 Importante: a execução do E2E acontece **dentro da pasta `e2e/`**.

---

## 📁 Estrutura do módulo
```
e2e/
├── cypress/
│   ├── e2e/                  # Specs (cenários E2E)
│   ├── fixtures/             # Massas de teste
│   ├── pageObjects/          # Page Objects
│   ├── support/              # Commands e setup global
│   ├── screenshots/          # Artefatos (não versionado)
│   └── videos/               # Artefatos (não versionado)
├── .cypress-cucumber-preprocessorrc.js
├── cypress.config.js
├── cypress.env.example.json  # Exemplo (versionado)
├── cypress.env.json          # NÃO versionado
├── package.json
└── package-lock.json
```

## 🔧 Pré-requisitos
Para executar este projeto localmente, é necessário:

- Node.js (versão LTS)
- npm
- PowerShell (Windows)
- Git

## ⚙️ Instalação
No terminal, entre na pasta `e2e/` e instale as dependências:

```powershell
cd e2e
npm ci
```
💡 Recomendado: npm ci (garante versões consistentes com base no package-lock.json).
