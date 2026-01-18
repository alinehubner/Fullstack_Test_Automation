/**
 * bookingFlow.js
 * -----------------------------------------
 * Cenario (fluxo) do teste de carga (reprodutivel):
 * 1) Health check (ping)
 * 2) Auth (token)
 * 3) List bookings (GET /booking)
 * 4) Pick random bookingid
 * 5) Get booking por ID (GET /booking/{id})
 * 6) (Opcional) repetir GET para simular uso real
 *
 * Observação importante:
 * - Endpoints de escrita (POST/PUT/DELETE) podem retornar 418 em APIs públicas.
 * - Esse fluxo prioriza reprodutibilidade para avaliacao/CI.
 */

import { check, sleep } from "k6";
import {
  healthCheck,
  createToken,
  listBookings,
  getBookingById,
} from "../requests/bookingApi.js";

/**
 * Executa o fluxo de leitura + auth.
 * @param {Object} config - config retornado por getConfig()
 */
export function bookingFlow(config) {
  const { baseUrl, username, password } = config;

  // ---------------------------
  // 1) Health check
  // ---------------------------
  const pingRes = healthCheck(baseUrl);
  const pingOk = check(pingRes, {
    "PING: status 200/201": (r) => r.status === 200 || r.status === 201,
  });

  if (!pingOk) {
    console.log(`PING falhou: status=${pingRes.status} body=${pingRes.body}`);
    sleep(1);
    return;
  }

  // ---------------------------
  // 2) Auth -> gerar token
  // ---------------------------
  const authRes = createToken(baseUrl, { username, password });

  const authOk = check(authRes, {
    "AUTH: status 200": (r) => r.status === 200,
    "AUTH: tem token no body": (r) => !!r.json("token"),
  });

  if (!authOk) {
    console.log(`AUTH falhou: status=${authRes.status} body=${authRes.body}`);
    sleep(1);
    return;
  }

  // Token fica disponivel caso voce queira usar em endpoints protegidos no futuro
  const token = authRes.json("token");
  if (!token) {
    console.log("AUTH retornou sem token (inesperado).");
    sleep(1);
    return;
  }

  // ---------------------------
  // 3) List bookings -> pegar ids
  // ---------------------------
  const listRes = listBookings(baseUrl);

  const listOk = check(listRes, {
    "LIST: status 200": (r) => r.status === 200,
  });

  if (!listOk) {
    console.log(`LIST falhou: status=${listRes.status} body=${listRes.body}`);
    sleep(1);
    return;
  }

  const ids = listRes.json(); // esperado: array de { bookingid: number }

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    console.log("LIST retornou vazio/inesperado (sem bookingid).");
    sleep(1);
    return;
  }

  // ---------------------------
  // 4) Escolher um bookingId aleatorio
  // ---------------------------
  const randomIndex = Math.floor(Math.random() * ids.length);
  const bookingId = ids[randomIndex]?.bookingid;

  if (!bookingId) {
    console.log("Nao consegui extrair bookingid da lista.");
    sleep(1);
    return;
  }

  // ---------------------------
  // 5) Get booking por ID
  // ---------------------------
  const getRes = getBookingById(baseUrl, bookingId);
  check(getRes, {
    "GET: status 200": (r) => r.status === 200,
    "GET: content-type JSON": (r) =>
      (r.headers["Content-Type"] || "").includes("application/json"),
  });

  // ---------------------------
  // 6) (Opcional) repetir GET (simula navegacao/consulta)
  // ---------------------------
  const getRes2 = getBookingById(baseUrl, bookingId);
  check(getRes2, {
    "GET (repeat): status 200": (r) => r.status === 200,
  });

  // Pausa para simular usuario real e evitar loop muito agressivo
  sleep(1);
}
