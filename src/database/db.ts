import { Pool } from "pg";
import { env } from "../config/env";
import { logger } from "../config/logger";

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
});

db.on("connect", () => {
  logger.info("PostgreSQL connection established");
});

db.on("error", (error) => {
  logger.error(error, "Database connection error");
});