import { FastifyInstance } from "fastify";

export function registerSystemMetricsRoutes(app: FastifyInstance) {
  app.get("/api/system-metrics", async () => {
    // Minimal demo metrics; in prod, hook Prometheus / OTEL
    return {
      latency: "300ms",
      nps: "75",
      entropyLevel: "3.2",
      timestamp: new Date().toISOString()
    };
  });
}