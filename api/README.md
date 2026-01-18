# 🔗 Testes de API — Postman + Newman

Este módulo contém os **testes automatizados de API**, desenvolvidos no **Postman** e executados via **Newman**.

O objetivo é validar se o endpoint continua funcionando como esperado: response, payload, status code, permitindo execuções rápidas locais ou em pipelines CI/CD.

---

## 📁 Estrutura do módulo
```
api/
│   ├── postman
│   │   ├── collections
│   │   └── environments
│   └── run-api-tests.ps1
```

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
💡 Recomendado: npm ci garante versões consistentes conforme o package-lock.json.
