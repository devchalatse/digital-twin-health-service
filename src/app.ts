import Fastify from "fastify";
import formbody from "@fastify/formbody";
import { logger } from "./config/logger";
import heartbeatRoutes from "./routes/heartbeat.route";

export function buildApp() {
  const app = Fastify({
    logger: true, // use Fastify built-in structured logs
  });

  // Register plugins
  app.register(formbody);

  // Request logging hook (optional but fine for assignment)
  app.addHook("onRequest", async (request) => {
    logger.info({
      method: request.method,
      url: request.url,
      event: "incoming_request",
    });
  });

  // Register routes (ONLY heartbeat domain)
  app.register(heartbeatRoutes, {
    prefix: "/api/v1",
  });

  return app;
}