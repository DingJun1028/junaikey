import { FastifyInstance } from "fastify";
import { z } from "zod";
import { executeSixRites } from "../six/rites.js";

const bodySchema = z.object({
  apiKey: z.string().optional(), // backward compat; we mainly use header guard
  command: z.object({
    endpoint: z.string(),
    params: z.record(z.unknown()).optional(),
    user: z.string().optional(),
    context: z.string().optional()
  })
});

export function registerExecuteRoutes(app: FastifyInstance) {
  app.post("/api/execute-sacred-command", async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid body", details: parsed.error.flatten() });
    }
    const { command } = parsed.data;
    const result = await executeSixRites(command);
    return reply.send(result);
  });
}