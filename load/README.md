# ⚡ Testes de Carga — k6

Este módulo contém os **testes de carga e performance** desenvolvidos com **k6**.

O objetivo é validar o comportamento da aplicação sob carga, analisando **tempo de resposta**, **estabilidade**, **erros** e **limites do sistema** em cenários controlados.

---

## 📁 Estrutura do módulo

```

load/
├── scripts/
│   ├── main.js
│   ├── scenarios/
│   │   └── bookingFlow.js
│   ├── requests/
│   │   └── bookingApi.js
│   └── utils/
│       └── config.js
├── results/                     # ignorado no git
│   ├── fixed/                     # criado no momento da execucao do teste
│   ├── ramping/                   # criado no momento da execucao do teste
├── run-load-tests.ps1
└── README.md

```
📎 Observação: o diretório ```results/``` é gerado automaticamente a cada execução e não é versionado.

## 🔧 Pré-requisitos
Para executar este projeto localmente, é necessário:

- **k6** instalado
- **Git**
- **PowerShell** (Windows)

### Verificar instalação do k6
```powershell
k6 version
```
## ▶️ Executando os testes de carga
Execução simples

```
cd load
k6 run scripts/<script>.js
```

## 🔐 Configuração dos testes

Os scripts de carga podem conter:

- Número de usuários virtuais (VUs)
- Duração do teste
- Ramp-up / ramp-down
- Thresholds (critérios de aceitação)

Exemplo conceitual:

- Quantidade de usuários simultâneos
- Tempo máximo de resposta aceitável
- Taxa de erro permitida

Essas configurações ficam definidas diretamente nos scripts dentro de ```scripts/```.

## 📊 Resultados

Durante a execução, o k6 exibe métricas no terminal, como:

- Tempo médio de resposta
- Percentis (p90, p95, p99)
- Taxa de erro
- Throughput

Caso configurado, os resultados podem ser exportados para arquivos dentro de:

```
load/results/
```

🧹 A pasta ```results/``` contém apenas artefatos de execução e não é versionada.

## 🧩 Troubleshooting
#### ❌ Erro ao executar o k6

Verifique:

- Se o k6 está instalado corretamente
- Se você está dentro da pasta load/
- Se o script informado existe

### ▶️ Executar um script específico

```
k6 run scripts/login-load.js
```

