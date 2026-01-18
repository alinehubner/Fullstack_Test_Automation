<#
=========================================
Runner do k6 para executar 2 cenários:
=========================================

1) FIXED (baseline)  -> VUs fixos por um tempo
2) RAMPING (gradual) -> stages (subida/descida de VUs)

O script também:
- cria as pastas de evidência (fixed/ramping)
- permite configurar BASE_URL, USERNAME, PASSWORD, VUS, DURATION via parâmetros

Exemplos de uso:

# Padrão (Restful Booker, VUS=5, DURATION=30s)
.\load\run-load-tests.ps1

# Informando baseUrl e baseline maior
.\load\run-load-tests.ps1 -BaseUrl "https://restful-booker.herokuapp.com" -Vus 10 -Duration "45s"

# Rodar só o baseline
.\load\run-load-tests.ps1 -OnlyFixed

# Rodar só o ramping
.\load\run-load-tests.ps1 -OnlyRamping

# Alterar credenciais (se necessário)
.\load\run-load-tests.ps1 -Username "admin" -Password "password123"
#>

[CmdletBinding()]
param(
  # URL base do sistema sob teste
  [string]$BaseUrl = "https://restful-booker.herokuapp.com",

  # Credenciais (Restful Booker demo)
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
# 0) Garantias / validações simples
# -----------------------------------------
if ($OnlyFixed -and $OnlyRamping) {
  Write-Error "Use apenas -OnlyFixed OU -OnlyRamping (não os dois ao mesmo tempo)."
  exit 1
}

# Caminho do script main.js do k6
$K6Script = "load/scripts/main.js"

if (-not (Test-Path $K6Script)) {
  Write-Error "Arquivo não encontrado: $K6Script. Verifique se você está rodando a partir da raiz do repositório."
  exit 1
}

# -----------------------------------------
# 1) Criar pastas de evidência (results)
# -----------------------------------------
# Observação: o git não versiona pastas vazias e load/results costuma estar no .gitignore.
# Por isso criamos no momento da execução para garantir que o handleSummary consiga gravar os arquivos.
New-Item -ItemType Directory -Force -Path "load/results/fixed" | Out-Null
New-Item -ItemType Directory -Force -Path "load/results/ramping" | Out-Null

Write-Host "==> Pastas de evidência garantidas em load/results/(fixed|ramping)" -ForegroundColor Green

# -----------------------------------------
# 2) Função auxiliar para rodar k6 com env vars
# -----------------------------------------
function Invoke-K6Run {
  param(
    [Parameter(Mandatory=$true)][ValidateSet("fixed","ramping")]
    [string]$Scenario,

    # Parâmetros extras (ex.: VUS/DURATION no fixed)
    [hashtable]$ExtraEnv = @{}
  )

  # Env vars padrão (usadas pelo config.js)
  $envArgs = @(
    "-e", "SCENARIO=$Scenario",
    "-e", "BASE_URL=$BaseUrl",
    "-e", "USERNAME=$Username",
    "-e", "PASSWORD=$Password"
  )

  # Env vars extras (ex.: VUS/DURATION)
  foreach ($key in $ExtraEnv.Keys) {
    $envArgs += @("-e", "$key=$($ExtraEnv[$key])")
  }

  Write-Host ""
  Write-Host "==> Rodando k6 (SCENARIO=$Scenario)..." -ForegroundColor Cyan
  Write-Host "    BASE_URL=$BaseUrl"
  if ($Scenario -eq "fixed") {
    Write-Host "    VUS=$Vus | DURATION=$Duration"
  }

  # Execução do k6
  # Observação: se o k6 não estiver instalado, este comando falhará.
  k6 run @envArgs $K6Script

  if ($LASTEXITCODE -ne 0) {
    Write-Error "k6 finalizou com erro no cenário: $Scenario (exit code $LASTEXITCODE)."
    exit $LASTEXITCODE
  }

  Write-Host "==> k6 finalizado com sucesso (SCENARIO=$Scenario)." -ForegroundColor Green
}

# -----------------------------------------
# 3) Executar cenários conforme flags
# -----------------------------------------
if (-not $OnlyRamping) {
  # FIXED (baseline)
  Invoke-K6Run -Scenario "fixed" -ExtraEnv @{
    VUS      = $Vus
    DURATION = $Duration
  }
}

if (-not $OnlyFixed) {
  # RAMPING (gradual) - stages estão definidos no main.js
  Invoke-K6Run -Scenario "ramping"
}

# -----------------------------------------
# 4) Resumo final: onde estão as evidências
# -----------------------------------------
Write-Host ""
Write-Host "==> Evidências geradas (seu main.js salva via handleSummary):" -ForegroundColor Yellow
Write-Host "    - load/results/fixed/   (baseline)"
Write-Host "    - load/results/ramping/ (gradual)"
Write-Host ""
Write-Host "Dica: abra o HTML no navegador para visualizar o report." -ForegroundColor Yellow
