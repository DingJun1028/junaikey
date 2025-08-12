import { FastifyRequest } from "fastify";
import { randomUUID } from "crypto";
import { config } from "./config.js";

export async function withRequestId(req: FastifyRequest) {
  const hdr = config.server.requestIdHeader.toLowerCase();
  const incoming = req.headers[hdr] as string | undefined;
  req.id = incoming || randomUUID();
}