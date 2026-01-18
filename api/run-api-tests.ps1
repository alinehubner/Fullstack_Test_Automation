# Faz o PowerShell parar a execucao se acontecer qualquer erro
$ErrorActionPreference = "Stop"

# Garante que estamos rodando a partir da raiz do repositorio.
# ($PSScriptRoot e a pasta onde este script esta: ...\api)
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# Cria a pasta de relatorios (se nao existir)
New-Item -ItemType Directory -Force -Path "api\results\newman" | Out-Null

# Caminhos dos arquivos que o Newman precisa para executar:
# - collection exportada do Postman
# - environment "example" (sem token fixo)
$collection = "api\postman\collections\Restful-Booker.postman_collection.json"
$envFile    = "api\postman\environments\restful-booker-env.example.json"

# Validacao rapida: se os arquivos nao existirem, falha com uma mensagem clara
if (-not (Test-Path $collection)) { throw "Collection nao encontrada: $collection" }
if (-not (Test-Path $envFile)) { throw "Environment nao encontrado: $envFile" }

# Executa o Newman usando a dependencia local do projeto (via npx).
# Isso evita depender de instalacao global e deixa a execucao mais confiavel para quem clonar o repo.
# Tambem gera um relatorio HTML como evidencia (htmlextra).
npx newman run $collection `
  -e $envFile `
  -r "cli,htmlextra" `
  --reporter-htmlextra-export "api\results\newman\report.html"

# Mensagens finais para orientar onde ficou a evidencia
Write-Host "Testes de API finalizados com sucesso."
Write-Host "Relatorio HTML gerado em: api/reports/newman/report.html"
