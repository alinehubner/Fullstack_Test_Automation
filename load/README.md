# ⚡ Testes de Carga — k6

Este módulo contém os **testes de carga e performance** desenvolvidos com **k6**.

O objetivo é validar o comportamento da aplicação sob carga, analisando **tempo de resposta**, **estabilidade**, **erros** e **limites do sistema** em cenários controlados.

---

## 📁 Estrutura do módulo

```
load/
├── scripts/ # Scripts de teste k6
├── results/ # Resultados e relatórios (não versionado)
└── README.md
```

## 🔧 Pré-requisitos
Para executar este projeto localmente, é necessário:

- **k6** instalado
- **Git**
- **PowerShell** (Windows)

### Verificar instalação do k6
```powershell
k6 version
