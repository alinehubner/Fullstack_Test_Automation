# 🧪 Fullstack Test Automation

Este repositório foi criado como parte de um **teste técnico**, com o objetivo de demonstrar conhecimentos práticos em **automação de testes**, organização de projeto e execução reprodutível.

A proposta não é apenas “rodar testes”, mas mostrar **como estruturar**, **executar** e **explicar** testes em diferentes níveis, de forma clara e próxima da realidade do dia a dia em QA.

---

## 📌 Visão Geral do Projeto

O projeto contempla três tipos de testes, organizados em um único repositório:

- ✅ **E2E (End-to-End)** — Cypress  
- 🔌 **API Tests** — Postman + Newman  
- 📊 **Load Tests** — k6 

Cada tipo de teste foi separado em pastas para facilitar o entendimento e a manutenção.

---

## 🗂️ Estrutura do Projeto

```

├── e2e/                 # Testes E2E (Cypress)
├── api/                 # Testes de API (Postman / Newman)
├── load/                # Testes de Carga (k6)
├── .github/
│ └── workflows/ci.yml   # Pipeline CI/CD (GitHub Actions)
└── README.md

```


📎 **Observação:** diretórios de relatórios (`screenshots`, `videos`, `results`, etc.) são gerados automaticamente a cada execução e **não são versionados**.

---

## 🔧 Pré-requisitos

Para executar este projeto localmente, é necessário:

- **Node.js** (versão LTS)
- **npm**
- **Git**
- **PowerShell** (Windows)
- **k6** (para testes de carga)

---

## 🧭 Testes E2E (Cypress)

Os testes E2E validam fluxos completos da aplicação, simulando o comportamento real de um usuário final.

Eles foram desenvolvidos utilizando **Cypress**, seguindo a estrutura padrão da ferramenta.

### ▶️ Executar os testes E2E

```bash
cd e2e
npm ci
npm run cy:run
```

---

## 🔌 Testes de API (Restful-Booker)

Os testes de API foram implementados utilizando a **API pública Restful-Booker**, bastante usada em estudos e testes técnicos.

A collection foi criada no **Postman**, com validações automatizadas por meio de scripts, e depois exportada para execução via **Newman**, sem necessidade de abrir o Postman.

### ▶️ Executar os testes de API

```
cd api
npm ci
.\api\run-api-tests.ps1

```

---

## 📊 Testes de Carga (k6)

Os testes de carga foram implementados utilizando o **k6**, com o objetivo de validar o comportamento da API sob múltiplas requisições simultâneas.

### ▶️ Executar os testes de carga

```
k6 run load/scripts/restfulbooker-smoke.js --summary-export load/results/summary-smoke.json

```

---

## 📌 Instruções completas de instalação, configuração e execução estão documentadas nos READMEs de cada módulo:

- e2e/README.md
- api/README.md
- load/README.md

---

## 🤖 CI/CD (GitHub Actions)

O pipeline de integração contínua está definido em:

```
.github/workflows/ci.yml
```

Como executar o pipeline

- Automático: a cada ```push``` ou ```pull request``` na branch ```main```
- Manual: GitHub → aba Actions → workflow CI - Tests → Run workflow

O que o pipeline executa

- Testes E2E (Cypress)
- Testes de API (Newman)
- Testes de Carga (k6)

Relatórios e evidências

Os resultados das execuções são anexados como Artifacts em cada execução do workflow, incluindo:
- Screenshots e vídeos do Cypress
- Relatórios do Newman
- Saídas e resumos do k6

---

## 📄 Evidências geradas

Este repositório não versiona relatórios completos, estes são gerados dinamicamente a cada execução.

As evidências oficiais das execuções automatizadas podem ser encontradas:
- Nos Artifacts do GitHub Actions
- Localmente, após a execução de cada tipo de teste
  
---

## ✅ Boas práticas adotadas

- Separação clara entre testes E2E, API e Load
- Nenhuma variável sensível versionada
- Execução reprodutível via scripts
- Organização pensada para facilitar CI/CD
- Documentação clara e organizada por módulo

---

## 📝 Considerações finais

Este projeto foi construído com foco em:
- Clareza
- Organização
- Aprendizado
- Proximidade com cenários reais de QA

Ele não tem como objetivo ser um framework completo, mas sim demonstrar entendimento do processo, boas decisões técnicas e capacidade de explicar o que foi feito.

