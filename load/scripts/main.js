/**
 * 
 * =========================================
 * Ponto de entrada do k6 - Raiz da execução
 * =========================================
 * 
 */

import { bookingFlow } from "./scenarios/bookingFlow.js";
import { getConfig } from "./utils/config.js";

// Relatório HTML (import remoto). Requer internet no momento da execução.
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

/**
 * =========================================
 * 1) CONTROLES POR VARIÁVEL DE AMBIENTE
 * =========================================
 *
 * SCENARIO define qual desenho de carga vamos usar:
 * - fixed   -> VUs fixos por um tempo definido
 * - ramping -> rampa gradual de VUs ao longo do tempo
 */
const SCENARIO = (__ENV.SCENARIO || "fixed").toLowerCase();

// Parâmetros do modo FIXO
const FIXED_VUS = Number(__ENV.VUS) || 5;
const FIXED_DURATION = __ENV.DURATION || "30s";

/**
 * =========================================
 * 2) THRESHOLDS (CRITÉRIOS DE QUALIDADE)
 * =========================================
 * 
 */
const THRESHOLDS = {
  http_req_failed: ["rate<0.01"],   // < 1% de falhas
  http_req_duration: ["p(95)<800"], // p95 < 800ms
};

/**
 * =========================================
 * 3) OPTIONS = "DESENHO" DA CARGA
 * =========================================
 * 
 * Aqui escolhemos FIXED ou RAMPING com base em SCENARIO.
 */
export const options =
  SCENARIO === "ramping"
    ? {
        /**
         * -------------------------
         * MODO RAMPING (gradativo)
         * -------------------------
         * stages = "degraus" de usuários virtuais (VUs).
         * Cada VU executa o cenário em loop enquanto estiver ativo.
         */
        stages: [
          { duration: "10s", target: 1 },
          { duration: "20s", target: 5 },
          { duration: "20s", target: 10 },
          { duration: "20s", target: 20 },
          { duration: "10s", target: 0 },
        ],
        thresholds: THRESHOLDS,
      }
    : {
        /**
         * -------------------------
         * MODO FIXED (baseline)
         * -------------------------
         * Mantém a mesma quantidade de usuários simultâneos
         * por um tempo definido.
         */
        vus: FIXED_VUS,
        duration: FIXED_DURATION,
        thresholds: THRESHOLDS,
      };

/**
 * =========================================
 * 4) O QUE CADA VU EXECUTA
 * =========================================
 *
 * Cada usuário virtual executa este "default function"
 * repetidamente durante a execução do teste.
 */
export default function () {
  const config = getConfig();
  bookingFlow(config);
}

/**
 * =========================================
 * 5) EVIDÊNCIAS (RELATÓRIOS)
 * =========================================
 * 
 * handleSummary roda UMA vez ao final do teste e gera arquivos.
 * Aqui salvamos em subpastas:  - As pastas seram criadas no run-load-tests.ps1 antes da execucao
 * - load/results/fixed/
 * - load/results/ramping/
 */
export function handleSummary(data) {
  const folder = SCENARIO === "ramping" ? "ramping" : "fixed";
  const suffix =
    SCENARIO === "ramping"
      ? "ramping"
      : `fixed-${FIXED_VUS}vus-${String(FIXED_DURATION).replace(/[^a-zA-Z0-9]/g, "")}`;

  return {
    [`load/results/${folder}/summary-${suffix}.json`]: JSON.stringify(data, null, 2),
    [`load/results/${folder}/k6-report-${suffix}.html`]: htmlReport(data),
  };
}
