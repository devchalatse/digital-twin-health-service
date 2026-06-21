import express from "express";
import { Pool } from "pg";
import { HeartbeatService } from "../services/heartbeat.service";

const router = express.Router();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const heartbeatService = new HeartbeatService();

/**
 * POST /api/v1/heartbeats
 * Store new heartbeat
 */
router.post("/", async (req, res) => {
  try {
    const input = req.body;

    // validate input
    const errors = heartbeatService.validate(input);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // enrich payload
    const heartbeat = heartbeatService.buildResponse(input);

    // insert into DB
    const result = await db.query(
      `
      INSERT INTO heartbeats (
        host_id,
        cpu_usage,
        memory_usage,
        disk_usage,
        status,
        timestamp
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [
        heartbeat.hostId,
        heartbeat.cpuUsage,
        heartbeat.memoryUsage,
        heartbeat.diskUsage,
        heartbeat.status,
        heartbeat.timestamp,
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Heartbeat error:", err);
    return res.status(500).json({ error: "Failed to store heartbeat" });
  }
});

/**
 * GET /api/v1/heartbeats
 * Debug endpoint (latest 100)
 */
router.get("/", async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM heartbeats ORDER BY timestamp DESC LIMIT 100`
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch heartbeats" });
  }
});

export default router;