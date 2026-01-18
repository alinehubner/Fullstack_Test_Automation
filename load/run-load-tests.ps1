<#
=========================================
Runner do k6 para executar 2 cenarios:
=========================================

1) FIXED (baseline)  -> VUs fixos por um tempo
2) RAMPING (gradual) -> stages (subida/descida de VUs)

O script tambem:
- cria as pastas de evidencia (fixed/ramping)
- permite configurar BASE_URL, USERNAME, PASSWORD, VUS, DURATION via parametros

Exemplos de uso:

# Padrao (Restful Booker, VUS=5, DURATION=30s)
.\load\run-load-tests.ps1

# Informando baseUrl e baseline maior
.\load\run-load-tests.ps1 -BaseUrl "https://restful-booker.herokuapp.com" -Vus 10 -Duration "45s"

# Rodar so o baseline
.\load\run-load-tests.ps1 -OnlyFixed

# Rodar so o ramping
.\load\run-load-tests.ps1 -OnlyRamping
#>

[CmdletBinding()]
param(
  [string]$BaseUrl = "https://restful-booker.herokuapp.com",
  [string]$Username = "admin",
  [string]$Password = "password123",

  # Baseline (modo fixed)
  [int]$Vus = 5,
  [string]$Duration = "30s",

  # Flags para rodar somente um modo (opcional)
  [switch]$OnlyFixed,
  [switch]$OnlyRamping
)

# -----------------------------------------
# 0) Validacoes simples
# -----------------------------------------
if ($OnlyFixed -and $OnlyRamping) {
  Write-Error "Use apenas -OnlyFixed OU -OnlyRamping (nao os dois ao mesmo tempo)."
  exit 1
}

$K6Script = "load/scripts/main.js"
if (-not (Test-Path $K6Script)) {
  Write-Error "Arquivo nao encontrado: $K6Script. Rode a partir da raiz do repositorio."
  exit 1
}

# -----------------------------------------
# 1) Criar pastas de evidencia (results)
# -----------------------------------------
New-Item -ItemType Directory -Force -Path "load/results/fixed" | Out-Null
New-Item -ItemType Directory -Force -Path "load/results/ramping" | Out-Null
Write-Host "==> Pastas de evidencia garantidas em load/results/(fixed|ramping)" -ForegroundColor Green

# -----------------------------------------
# 2) Funcao auxiliar para rodar o k6
#    - Retorna $true se OK, $false se falhou
#    - Nao aborta a execucao do script no meio
# -----------------------------------------
function Invoke-K6Run {
  param(
    [Parameter(Mandatory=$true)][ValidateSet("fixed","ramping")]
    [string]$Scenario,

    [hashtable]$ExtraEnv = @{}
  )

  $envArgs = @(
    "-e", "SCENARIO=$Scenario",
    "-e", "BASE_URL=$BaseUrl",
    "-e", "USERNAME=$Username",
    "-e", "PASSWORD=$Password"
  )

  foreach ($key in $ExtraEnv.Keys) {
    $envArgs += @("-e", "$key=$($ExtraEnv[$key])")
  }

  Write-Host ""
  Write-Host "==> Rodando k6 (SCENARIO=$Scenario)..." -ForegroundColor Cyan
  Write-Host "    BASE_URL=$BaseUrl"
  if ($Scenario -eq "fixed") {
    Write-Host "    VUS=$Vus | DURATION=$Duration"
  }

  k6 run @envArgs $K6Script

  if ($LASTEXITCODE -ne 0) {
    Write-Warning "k6 terminou com erro no cenario: $Scenario (exit code $LASTEXITCODE). Vou continuar para o proximo."
    return $false
  }

  Write-Host "==> k6 finalizado com sucesso (SCENARIO=$Scenario)." -ForegroundColor Green
  return $true
}

# -----------------------------------------
# 3) Executa cenarios e so falha no final
# -----------------------------------------
$fixedOk = $true
$rampingOk = $true

if (-not $OnlyRamping) {
  $fixedOk = Invoke-K6Run -Scenario "fixed" -ExtraEnv @{
    VUS      = $Vus
    DURATION = $Duration
  }
}

if (-not $OnlyFixed) {
  $rampingOk = Invoke-K6Run -Scenario "ramping"
}

# -----------------------------------------
# 4) Resumo (sem ternario - compativel)
# -----------------------------------------
Write-Host ""
Write-Host "==> Resumo da execucao:" -ForegroundColor Yellow

Write-Host "    FIXED:   " -NoNewline
if ($fixedOk) { Write-Host "OK" -ForegroundColor Green } else { Write-Host "FALHOU" -ForegroundColor Red }

Write-Host "    RAMPING: " -NoNewline
if ($rampingOk) { Write-Host "OK" -ForegroundColor Green } else { Write-Host "FALHOU" -ForegroundColor Red }

Write-Host ""
Write-Host "==> Evidencias (handleSummary):" -ForegroundColor Yellow
Write-Host "    - load/results/fixed/"
Write-Host "    - load/results/ramping/"
Write-Host "Dica: abra o HTML no navegador para visualizar o report." -ForegroundColor Yellow

# Se qualquer um falhar, retorna erro geral (bom pra CI), mas so no final
if (-not $fixedOk -or -not $rampingOk) {
  Write-Error "Um ou mais cenarios falharam. Veja os relatorios em load/results/ para detalhes."
  exit 1
}
