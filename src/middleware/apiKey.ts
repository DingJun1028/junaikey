import { FastifyRequest, FastifyReply } from "fastify";
import { config } from "../utils/config.js";

export async function apiKeyGuard(req: FastifyRequest, reply: FastifyReply) {
  // Allow healthz and docs without API key
  const openPaths = ["/healthz", "/api/docs", "/api/docs/json"];
  if (openPaths.some((p) => req.url.startsWith(p))) return;

  const headerName = config.security.apiKeyHeader;
  const key = req.headers[headerName.toLowerCase()] as string | undefined;
  if (!key || key !== process.env.SACRED_API_KEY) {
    return reply.code(401).send({ error: "Unauthorized" });
  }
}