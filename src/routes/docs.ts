import { FastifyInstance } from "fastify";

export function registerDocsRoute(app: FastifyInstance) {
  app.get("/api/docs/json", async () => app.swagger());
}