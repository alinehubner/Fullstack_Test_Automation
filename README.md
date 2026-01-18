# 🧪 Fullstack Test Automation

Este repositório foi criado como parte de um **teste técnico**, com o objetivo de demonstrar conhecimentos práticos em **automação de testes**, organização de projeto e execução reprodutível.

A proposta não é apenas “rodar testes”, mas mostrar **como estruturar**, **executar** e **explicar** testes em diferentes níveis, de forma clara e próxima da realidade do dia a dia em QA.

---

## 📌 Visão Geral do Projeto

O projeto contempla três tipos de testes, organizados em um único repositório:

- ✅ **E2E (End-to-End)** — Cypress  
- 🔌 **API Tests** — Postman + Newman  
- 📊 **Load Tests** — k6 *(em implementação)*  

Cada tipo de teste foi separado em pastas para facilitar o entendimento e a manutenção.

---

## 🗂️ Estrutura do Projeto

```
.
├── api
│   ├── postman
│   │   ├── collections
│   │   │   └── Restful-Booker.postman_collection.json
│   │   └── environments
│   │       └── restful-booker-env.example.json
│   └── run-api-tests.ps1
│
├── load
│   └── (estrutura preparada para testes de carga com k6)
│
├── cypress
│   └── (testes E2E)
│
├── reports
│   └── (gerado localmente, não versionado)
│
├── package.json
├── package-lock.json
└── README.md
```


📎 **Observação:** o diretório `reports/` é gerado automaticamente a cada execução e não é versionado.

---

## 🔧 Pré-requisitos

Para executar este projeto localmente, é necessário:

- Node.js (versão LTS)
- npm
- PowerShell (Windows)
- Git

---

## 🧭 Testes E2E (Cypress)

Os testes E2E validam fluxos completos da aplicação, simulando o comportamento real de um usuário final.

Eles foram desenvolvidos utilizando **Cypress**, seguindo a estrutura padrão da ferramenta.

### ▶️ Executar os testes E2E

---

```bash
npm ci
npm run cy:run

