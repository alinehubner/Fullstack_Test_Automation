# 🔗 Testes de API — Postman + Newman

Este módulo contém os **testes automatizados de API**, desenvolvidos no **Postman** e executados via **Newman**.

O objetivo é validar se o endpoint continua funcionando como esperado: response, payload, status code, permitindo execuções rápidas locais ou em pipelines CI/CD.

---

## 📁 Estrutura do módulo
```

├── api/
│   ├── postman/
│   │   ├── collections/
│   │   └── environments/
│   ├── results/
│   │   ├──  newman/              # Resultados e relatórios (não versionado)
├── run-api-tests.ps1
└──README.md

```
📎 Observação: o diretório reports/ é gerado automaticamente a cada execução e não é versionado.

## 🔧 Pré-requisitos
Para executar este projeto localmente, é necessário:

- **Node.js** (versão LTS)
- **npm**
- **Git**
- **Postman** *(opcional — para edição das collections)*
- **PowerShell** (Windows)

---

## ⚙️ Instalação

No terminal, navegue até a pasta `api/` e instale as dependências:

```powershell
cd api
npm ci
```
💡 Recomendado: npm ci garante versões consistentes conforme o package-lock.json.

## ▶️ Executando os testes de API
#### ▶️ Execução simples
```
npx newman run collections/<collection>.json `
  -e environments/<environment>.json
```

#### 🚀 Scripts disponíveis (recomendado)

Para facilitar a execução, utilize scripts do ```package.json```:

```
{
  "scripts": {
    "api:run": "newman run collections/collection.json -e environments/environment.json",
    "api:run:html": "newman run collections/collection.json -e environments/environment.json -r htmlextra"
  }
}
```

Execução:

```
npm run api:run
npm run api:run:html
```

#### 📊 Relatórios

Os relatórios são gerados automaticamente na pasta:

```
api/results/
```

Formatos suportados:

- 📟 Console

- 📄 HTML (```newman-reporter-htmlextra```)

🧹 A pasta results/ contém apenas artefatos de execução e não é versionada.

## 🔐 Ambientes e variáveis

As configurações das APIs são controladas por environments do Postman, incluindo:

- Base URL
- Tokens de autenticação
- Headers
- Variáveis dinâmicas

## 📌 Recomendações:

- Use arquivos de exemplo (```*.example.json```) quando houver dados sensíveis
- Evite versionar credenciais reais

## 🧩 Troubleshooting
#### ❌ Newman não executa

Verifique:

- Se você está dentro da pasta api/
- Se os caminhos das collections e environments estão corretos

Reinstale as dependências se necessário:

```
npm ci
```

### ▶️ Executar apenas uma collection específica

```
npx newman run collections/login.collection.json
```



