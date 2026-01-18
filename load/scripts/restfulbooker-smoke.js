import http from "k6/http";
import { check, sleep } from "k6";

// HTML report (sem instalar nada: import remoto)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],   // < 1% falhas
    http_req_duration: ["p(95)<800"], // p95 < 800ms
  },
};

const BASE_URL = __ENV.BASE_URL || "https://restful-booker.herokuapp.com";

export default function () {
  // 1) Health check
  const ping = http.get(`${BASE_URL}/ping`);
  check(ping, {
    "ping status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });

  // 2) Lista bookings (endpoint público)
  const list = http.get(`${BASE_URL}/booking`);
  check(list, {
    "list status is 200": (r) => r.status === 200,
  });

  sleep(1);
}

// Gera arquivos ao final do teste (2 evidências)
export function handleSummary(data) {
  return {
    "load/results/summary-smoke.json": JSON.stringify(data, null, 2),
    "load/results/k6-report.html": htmlReport(data),
  };
}
