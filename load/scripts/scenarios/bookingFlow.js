/**
 * -----------------------------------------
 * Cenário (fluxo) do teste de carga
 * -----------------------------------------
 */

import { check, sleep } from "k6";
import {
  healthCheck,
  createToken,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../requests/bookingApi.js";

/**
 * Executa o fluxo completo de booking.
 * @param {Object} config - config retornado por getConfig()
 */
export function bookingFlow(config) {
  const { baseUrl, username, password } = config;

  // ---------------------------
  // 1) Health check
  // ---------------------------
  const pingRes = healthCheck(baseUrl);
  check(pingRes, {
    "PING: status 200/201": (r) => r.status === 200 || r.status === 201,
  });

  // ---------------------------
  // 2) Auth -> gerar token
  // ---------------------------
  const authRes = createToken(baseUrl, { username, password });

  check(authRes, {
    "AUTH: status 200": (r) => r.status === 200,
    "AUTH: tem token no body": (r) => !!r.json("token"),
  });

  const token = authRes.json("token");

  // ---------------------------
  // 3) Create booking
  // ---------------------------
  const createPayload = {
    firstname: "Aline",
    lastname: "Hubner",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-05",
    },
    additionalneeds: "Breakfast",
  };

  const createRes = createBooking(baseUrl, createPayload);

  check(createRes, {
    "CREATE: status 200": (r) => r.status === 200,
    "CREATE: retorna bookingid": (r) => !!r.json("bookingid"),
  });

  const bookingId = createRes.json("bookingid");

  // ---------------------------
  // 4) Get booking por ID (valida que existe)
  // ---------------------------
  const getRes = getBookingById(baseUrl, bookingId);

  check(getRes, {
    "GET: status 200": (r) => r.status === 200,
    "GET: content-type JSON": (r) =>
      (r.headers["Content-Type"] || "").includes("application/json"),
  });

  // ---------------------------
  // 5) Update booking (PUT)
  // ---------------------------
  const updatePayload = {
    firstname: "Aline",
    lastname: "QA",
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-02",
      checkout: "2024-01-06",
    },
    additionalneeds: "Breakfast + Dinner",
  };

  const updateRes = updateBooking(baseUrl, bookingId, updatePayload, token);

  check(updateRes, {
    "UPDATE: status 200": (r) => r.status === 200,
  });

  // ---------------------------
  // 6) Delete booking
  // ---------------------------
  const deleteRes = deleteBooking(baseUrl, bookingId, token);

  check(deleteRes, {
    "DELETE: status 201": (r) => r.status === 201,
  });

  // ---------------------------
  // 7) Get após delete (esperado 404)
  // ---------------------------
  const getAfterDeleteRes = getBookingById(baseUrl, bookingId);

  check(getAfterDeleteRes, {
    "GET after DELETE: retorna 404": (r) => r.status === 404,
  });

  // Pausa para simular usuário real e evitar loop agressivo
  sleep(1);
}
