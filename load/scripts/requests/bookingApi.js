/**
 * -----------------------------------------
 * Camada de "requests": aqui ficam somente as funções que chamam endpoints.
 * -----------------------------------------
 */

import http from "k6/http";

/**
 * GET /ping
 * Health check simples para validar que o serviço está de pé.
 */
export function healthCheck(baseUrl) {
  return http.get(`${baseUrl}/ping`, {
    tags: { name: "GET /ping" },
  });
}

/**
 * POST /auth
 * Gera token de autenticação.
 * Retorno esperado: { "token": "..." }
 */
export function createToken(baseUrl, credentials) {
  return http.post(`${baseUrl}/auth`, JSON.stringify(credentials), {
    headers: { "Content-Type": "application/json" },
    tags: { name: "POST /auth" },
  });
}

/**
 * POST /booking
 * Cria uma reserva. Retorno esperado:
 * {
 *   "bookingid": 123,
 *   "booking": { ... }
 * }
 */
export function createBooking(baseUrl, payload) {
  return http.post(`${baseUrl}/booking`, JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
    tags: { name: "POST /booking" },
  });
}

/**
 * GET /booking/{id}
 * Consulta detalhes de uma reserva pelo ID.
 */
export function getBookingById(baseUrl, bookingId) {
  return http.get(`${baseUrl}/booking/${bookingId}`, {
    tags: { name: "GET /booking/{id}" },
  });
}

/**
 * PUT /booking/{id}
 * Atualiza uma reserva existente.
 * Requer autenticação via Cookie: token=...
 */
export function updateBooking(baseUrl, bookingId, payload, token) {
  return http.put(`${baseUrl}/booking/${bookingId}`, JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
    tags: { name: "PUT /booking/{id}" },
  });
}

/**
 * DELETE /booking/{id}
 * Remove uma reserva.
 * Requer autenticação via Cookie: token=...
 * No Restful Booker, o esperado é status 201 ao deletar com sucesso.
 */
export function deleteBooking(baseUrl, bookingId, token) {
  // http.del aceita (url, body, params). Para DELETE sem body, pode ser null.
  return http.del(`${baseUrl}/booking/${bookingId}`, null, {
    headers: {
      Cookie: `token=${token}`,
    },
    tags: { name: "DELETE /booking/{id}" },
  });
}
