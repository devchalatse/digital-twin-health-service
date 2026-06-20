import { buildApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { db } from "./database/db";

const app = buildApp();

async function start() {
  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    logger.info({
      event: "server_started",
      port: env.PORT,
    });
  } catch (error) {
    logger.error(error, "Failed to start server");
    process.exit(1);
  }
}

async function shutdown(signal: string) {
  logger.info({
    event: "shutdown_started",
    signal,
  });

  try {
    await app.close();
    await db.end();

    logger.info({
      event: "shutdown_complete",
    });

    process.exit(0);
  } catch (error) {
    logger.error(error, "Shutdown failed");
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();