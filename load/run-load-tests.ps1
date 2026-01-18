# load/run-load-tests.ps1
# Script para executar testes de carga com k6 e gerar 3 evidencias automaticamente:
# 1) TXT: log completo do terminal (k6-output-*.txt)
# 2) JSON: summary-export gerado pelo handleSummary() do script k6
# 3) HTML: relatorio gerado pelo handleSummary() do script k6
#
# Pre-requisitos:
# - k6 instalado e disponivel no PATH
# - O script k6 (load/scripts/restfulbooker-smoke.js) deve conter a funcao handleSummary()
#   gerando: load/results/summary-smoke.json e load/results/k6-report.html

$ErrorActionPreference = "Stop"

# Garante que a execucao ocorre a partir da raiz do repositorio
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

# Pastas e caminhos
$resultsDir = "load\results"
$k6Script   = "load\scripts\restfulbooker-smoke.js"

# Cria a pasta de resultados (se nao existir)
New-Item -ItemType Directory -Force -Path $resultsDir | Out-Null

# Valida se o script existe
if (-not (Test-Path $k6Script)) {
  throw "Script k6 nao encontrado: $k6Script"
}

# Timestamp para nao sobrescrever as evidencias anteriores
$ts = Get-Date -Format "yyyyMMdd-HHmmss"

# Evidencia 1: log do terminal
$logFile = Join-Path $resultsDir "k6-output-$ts.txt"

# Estes arquivos (Evidencias 2 e 3) sao gerados pelo handleSummary() dentro do script k6
$summaryFile = Join-Path $resultsDir "summary-smoke.json"
$htmlFile    = Join-Path $resultsDir "k6-report.html"

Write-Host "==============================================="
Write-Host "k6 - Execucao de teste de carga (smoke)"
Write-Host "Script: $k6Script"
Write-Host "Results: $resultsDir"
Write-Host "==============================================="

# Executa o k6 e salva tambem o output do terminal em TXT
# (JSON/HTML serao gerados automaticamente pelo handleSummary())
k6 run $k6Script | Tee-Object -FilePath $logFile

Write-Host "`nExecucao finalizada."
Write-Host "Evidencias geradas:"
Write-Host "- Log TXT:      $logFile"

if (Test-Path $summaryFile) {
  Write-Host "- Summary JSON: $summaryFile"
} else {
  Write-Host "- Summary JSON: nao encontrado - verifique se o handleSummary() esta no script k6"
}

if (Test-Path $htmlFile) {
  Write-Host "- Report HTML:  $htmlFile"
} else {
  Write-Host "- Report HTML:  nao encontrado - verifique se o handleSummary() esta no script k6"
}

Write-Host "`nDica: o diretorio load/results/ deve ficar no .gitignore (nao versionar evidencias)."
