/**
 * bookingApi.js
 * -----------------------------------------
 * Camada de "requests": aqui ficam somente as funcoes que chamam endpoints.
 * O cenario (fluxo) fica separado em /scenarios.
 */

import http from "k6/http";

/**
 * GET /ping
 * Health check simples para validar que o serviço esta de pe.
 */
export function healthCheck(baseUrl) {
  return http.get(`${baseUrl}/ping`, {
    headers: { Accept: "application/json" },
    tags: { name: "GET /ping" },
  });
}

/**
 * POST /auth
 * Gera token de autenticacao.
 * Retorno esperado: { "token": "..." }
 */
export function createToken(baseUrl, credentials) {
  return http.post(`${baseUrl}/auth`, JSON.stringify(credentials), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    tags: { name: "POST /auth" },
  });
}

/**
 * GET /booking
 * Retorna lista de booking IDs:
 * ex: [{ "bookingid": 1 }, { "bookingid": 2 }, ...]
 */
export function listBookings(baseUrl) {
  return http.get(`${baseUrl}/booking`, {
    headers: { Accept: "application/json" },
    tags: { name: "GET /booking" },
  });
}

/**
 * GET /booking/{id}
 * Consulta detalhes de uma reserva pelo ID.
 */
export function getBookingById(baseUrl, bookingId) {
  return http.get(`${baseUrl}/booking/${bookingId}`, {
    headers: { Accept: "application/json" },
    tags: { name: "GET /booking/{id}" },
  });
}

/**
 * (Opcional – mantido para referencia)
 * Endpoints de escrita (POST/PUT/DELETE) retornaram HTTP 418 em algumas execucoes.
 * Mantido para possível reaproveitamento futuro.
 */


// export function createBooking(baseUrl, payload) {
//   return http.post(`${baseUrl}/booking`, JSON.stringify(payload), {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     tags: { name: "POST /booking" },
//   });
// }

// export function updateBooking(baseUrl, bookingId, payload, token) {
//   return http.put(`${baseUrl}/booking/${bookingId}`, JSON.stringify(payload), {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Cookie: `token=${token}`,
//     },
//     tags: { name: "PUT /booking/{id}" },
//   });
// }

// export function deleteBooking(baseUrl, bookingId, token) {
//   return http.del(`${baseUrl}/booking/${bookingId}`, null, {
//     headers: {
//       Accept: "application/json",
//       Cookie: `token=${token}`,
//     },
//     tags: { name: "DELETE /booking/{id}" },
//   });
// }
