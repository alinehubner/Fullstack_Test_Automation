# 🧪 E2E — Cypress

Este módulo contém os testes **End-to-End (E2E)** usando **Cypress** com suporte a **BDD (Cucumber)**.

> 📍 Importante: a execução do E2E acontece **dentro da pasta `e2e/`**.

---

## 📁 Estrutura do módulo
```
e2e/
├── cypress/
│   ├── e2e/                  # Cenários E2E
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
└── README.md
```

## 🔧 Pré-requisitos
Para executar este projeto localmente, é necessário:

- Node.js (versão LTS)
- npm
- Git
- PowerShell (Windows)

## ⚙️ Instalação
No terminal, entre na pasta `e2e/` e instale as dependências:

```powershell
cd e2e
npm ci
```
💡 Recomendado: npm ci (garante versões consistentes com base no ```package-lock.json```).

## 🔐 Configuração de ambiente

Este projeto utiliza variáveis locais no arquivo ```cypress.env.json```.

1) Criar o arquivo a partir do exemplo
```
copy cypress.env.example.json cypress.env.json
```

2) Preencher as variáveis necessárias

Edite o ```cypress.env.json``` e informe os valores esperados pelo projeto (ex.: URL, credenciais, tokens, etc.).

⚠️ O arquivo ```cypress.env.json``` não é versionado por conter dados sensíveis.

## ▶️ Executando os testes
### 🖥️ Abrir interface do Cypress (modo interativo)
```
npx cypress open
```

### 🤖 Executar em modo headless (terminal / CI)
```
npx cypress run
```

### 📸 Evidências / Artefatos

Durante a execução, o Cypress pode gerar automaticamente:

- ```cypress/screenshots/``` → screenshots (geralmente em falhas)

- ```cypress/videos/``` → gravações (headless) 


🧹 Esses diretórios são considerados artefatos e não são versionados.

## 🧩 Troubleshooting
#### ❌ “Command not found” / Cypress não abre

Verifique:
- Se voce esta dentro da pasta `e2e/`
- Se as dependencias foram instaladas corretamente

Reinstalar dependencias:
```
npm ci
```

#### ❌ Erro de variáveis / login / baseUrl

Confirme a existência do arquivo:

- ```e2e/cypress.env.json```

Compare as chaves com ```cypress.env.example.json``` e preencha os valores.

#### ▶️ Executar apenas um cenario (opcional)
```
npx cypress run --spec "cypress/e2e/features/login.feature"
```

