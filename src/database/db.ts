import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log("DATABASE_URL =", process.env.DATABASE_URL);