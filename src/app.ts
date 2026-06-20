import Fastify from "fastify";
import { logger } from "./config/logger";
import healthRoutes from "./routes/health.route";

export function buildApp() {
  const app = Fastify({
    logger: false,
  });

  // Request logging
  app.addHook("onRequest", async (request) => {
    logger.info({
      method: request.method,
      url: request.url,
      event: "incoming_request",
    });
  });

  // Register routes
  app.register(healthRoutes, {
    prefix: "/api/v1",
  });

  return app;
}