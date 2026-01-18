# Faz o PowerShell parar a execução se acontecer qualquer erro
$ErrorActionPreference = "Stop"

# Garante que estamos rodando a partir da raiz do repositório.
# ($PSScriptRoot é a pasta onde este script está: ...\api)
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# Cria a pasta de relatórios (se não existir)
New-Item -ItemType Directory -Force -Path "reports\newman" | Out-Null

# Caminhos dos arquivos que o Newman precisa para executar:
# - collection exportada do Postman
# - environment "example" (sem token fixo)
$collection = "api\postman\collections\Restful-Booker.postman_collection.json"
$envFile    = "api\postman\environments\restful-booker-env.example.json"

# Validação rápida: se os arquivos não existirem, falha com uma mensagem clara
if (-not (Test-Path $collection)) { throw "Collection não encontrada: $collection" }
if (-not (Test-Path $envFile)) { throw "Environment não encontrado: $envFile" }

# Executa o Newman usando a dependência local do projeto (via npx).
# Isso evita depender de instalação global e deixa a execução mais confiável para quem clonar o repo.
# Também gera um relatório HTML como evidência (htmlextra).
npx newman run $collection `
  -e $envFile `
  -r "cli,htmlextra" `
  --reporter-htmlextra-export "reports\newman\report.html"

# Mensagens finais para orientar onde ficou a evidência
Write-Host "`nTestes de API finalizados com sucesso."
Write-Host "Relatório HTML gerado em: reports/newman/report.html"
