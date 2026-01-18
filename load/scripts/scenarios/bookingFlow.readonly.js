/**
 * bookingFlow.readonly.js
 * -----------------------------------------
 * Cenário (fluxo) reprodutível para teste de carga no Restful Booker:
 *
 * 1) Health check (GET /ping)
 * 2) Auth (POST /auth) -> OPCIONAL (apenas observacional)
 * 3) List bookings (GET /booking) -> pega uma lista de bookingid
 * 4) Pick random bookingid
 * 5) Get booking por ID (GET /booking/{id})
 * 6) (Opcional) repetir GET para simular navegação/consulta
 *
 * Motivo do "readonly":
 * - Endpoints de escrita (POST /booking, PUT, DELETE) podem retornar 418 em API pública
 * - O /auth pode retornar 200 com {"reason":"Bad credentials"} (comportamento inconsistente)
 * - Para garantir reprodutibilidade para avaliador/CI, o cenário não depende de token nem CRUD
 */

import { check, sleep } from "k6";
import {
  healthCheck,
  createToken,
  listBookings,
  getBookingById,
} from "../requests/bookingApi.js";

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
  // 2) Auth (OPCIONAL / Observacional)
  // ---------------------------
  // Mesmo que falhe/retorne "Bad credentials", o fluxo continua,
  // porque os endpoints GET não dependem de token.
  const authRes = createToken(baseUrl, { username, password });

  // Check leve só para registrar comportamento sob carga (sem bloquear fluxo)
  check(authRes, {
    "AUTH: status 200": (r) => r.status === 200,
  });

  // Se vier token, guardamos (útil se no futuro você rodar contra uma API que exija auth)
  const tokenCandidate = authRes.json("token");
  if (!tokenCandidate) {
    // Loga apenas para evidência/diagnóstico (não falha o teste)
    console.log(`AUTH opcional sem token: status=${authRes.status} body=${authRes.body}`);
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
  // 4) Escolher um bookingId aleatório
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
  // 6) (Opcional) repetir GET (simula navegação/consulta)
  // ---------------------------
  const getRes2 = getBookingById(baseUrl, bookingId);
  check(getRes2, {
    "GET (repeat): status 200": (r) => r.status === 200,
  });

  // Pausa para simular usuário real e evitar loop muito agressivo
  sleep(1);
}
