import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { apiKeyGuard } from "./middleware/apiKey.js";
import { registerExecuteRoutes } from "./routes/executeSacredCommand.js";
import { registerSystemMetricsRoutes } from "./routes/systemMetrics.js";
import { registerDocsRoute } from "./routes/docs.js";
import { config } from "./utils/config.js";
import { withRequestId } from "./utils/requestId.js";

const app = Fastify({
  logger: { level: config.observability.logLevel }
});

await app.register(cors, {
  origin: config.security.allowedOrigins
});
await app.register(rateLimit, {
  max: config.security.rateLimit.max,
  timeWindow: config.security.rateLimit.timeWindow
});

// Request ID middleware
app.addHook("onRequest", withRequestId);

// Health check
app.get("/healthz", async () => ({ status: "ok" }));

// Swagger
await app.register(swagger, {
  openapi: {
    info: { title: "JunAiKey_Omnikey_萬能系統_終焉奇點", version: "0.1.0" }
  }
});
await app.register(swaggerUi, {
  routePrefix: "/api/docs"
});

// Protected routes
app.addHook("onRequest", apiKeyGuard);
registerExecuteRoutes(app);
registerSystemMetricsRoutes(app);

// Public docs proxy (GET /api/docs handled by swagger-ui) + GET /api/docs.json
registerDocsRoute(app);

const start = async () => {
  try {
    await app.listen({ port: config.server.port, host: "0.0.0.0" });
    app.log.info(`Listening on :${config.server.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();