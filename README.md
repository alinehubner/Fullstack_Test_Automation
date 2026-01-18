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

```

## 🔌 Testes de API (Restful-Booker)

Os testes de API foram implementados utilizando a **API pública Restful-Booker**, bastante usada em estudos e testes técnicos.

A collection foi criada no **Postman**, com validações automatizadas por meio de scripts, e depois exportada para execução via **Newman**, sem necessidade de abrir o Postman.

---

### 📋 Cenários cobertos

- Health Check (`/ping`)
- Autenticação com geração dinâmica de token
- Criação de booking
- Consulta de booking por ID
- Atualização de booking
- Exclusão de booking
- Validação pós-delete (HTTP 404)

---

### 🧠 Conceitos aplicados nos testes de API

- Uso de variáveis de *environment*
- Geração dinâmica de `token` e `bookingId`
- Reutilização de dados entre requisições
- Execução completa via **Runner / Newman**
- Scripts de validação no **Post-response**
- Execução *headless*, preparada para **CI/CD**

---

### ▶️ Executar os testes de API

```
npm ci
.\api\run-api-tests.ps1

```

Esse script foi criado para facilitar a execução por qualquer pessoa que clonar o repositório, sem necessidade de ajustes manuais.

- Utiliza dependências locais (npx newman)
- Cria automaticamente a pasta de relatórios
- Executa toda a collection
- Gera evidência em formato HTML

---

### 📄 Evidência gerada

Após a execução, um relatório HTML é gerado automaticamente em:

```
reports/newman/report.html

```

Esse relatório não é versionado, pois é gerado a cada execução.

---

## 📊 Testes de Carga (k6)

Os testes de carga foram implementados utilizando o **k6**, com o objetivo de validar o comportamento da API sob múltiplas requisições simultâneas.

---

### 🎯 Objetivo do teste

- Verificar se a API responde corretamente sob carga leve
- Observar tempo de resposta médio e percentis
- Validar que não ocorrem falhas em chamadas públicas da API
- Gerar uma base para evolução futura dos testes de performance

---

### ⚙️ Cenário executado

O script de carga realiza as seguintes ações:

- Health Check (`/ping`)
- Consulta de lista de bookings (`/booking`)

O teste é executado com:
- múltiplos usuários virtuais simultâneos
- duração controlada
- pausas entre as requisições para simular uso real

---

### ▶️ Executar os testes de carga

```
k6 run load/scripts/restfulbooker-smoke.js --summary-export load/results/summary-smoke.json

```

### 📄 Evidências geradas

Ao final da execução, o script gera as seguintes evidências dentro de load/results/:

1. Log do terminal (TXT)
Arquivo com a saída completa do k6 (métricas + resumo)
Ex.: ```k6-output-YYYYMMDD-HHMMSS.txt```

2. Resumo da execução (Summary JSON)
Um resumo com métricas agregadas (útil para auditoria/CI)
Ex.: ```summary-YYYYMMDD-HHMMSS.json```

3. Relatório em HTML
Relatório visual gerado a partir do JSON bruto do k6
Ex.: ```k6-report-YYYYMMDD-HHMMSS.html```

O diretório load/results/ não é versionado, pois os arquivos são gerados a cada execução.

--- 

### ⚙️ Observações

O relatório HTML é gerado utilizando o pacote k6-reporter.

A execução foi pensada para ser simples, reprodutível e fácil de entender.

Este teste pode ser expandido futuramente para cenários mais avançados (ramp-up, stress, soak e integração em CI/CD).

---

## ✅ Boas práticas adotadas

- Separação clara entre testes E2E, API e Load
- Nenhuma variável sensível versionada
- Execução reprodutível via scripts
- Organização pensada para facilitar CI/CD
- Documentação simples e objetiva

---

## 📝 Considerações finais

- Este projeto foi construído com foco em:
- Clareza
- Organização
- Aprendizado
- Proximidade com cenários reais de QA

Ele não tem como objetivo ser um framework completo, mas sim demonstrar entendimento do processo, boas decisões técnicas e capacidade de explicar o que foi feito.

```
