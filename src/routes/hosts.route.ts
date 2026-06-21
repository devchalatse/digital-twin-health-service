import express from "express";
import { Pool } from "pg";

const router = express.Router();

/**
 * DB connection
 */
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getHostHealth(hostId: string) {
  const result = await db.query(
    `
    SELECT *
    FROM heartbeats
    WHERE host_id = $1
    ORDER BY timestamp DESC
    LIMIT 1;
    `,
    [hostId]
  );

  return result.rows[0];
}

/**
 * CREATE HOST
 * POST /api/v1/hosts
 */
router.post("/", async (req, res) => {
  try {
    const { name, ipAddress } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const result = await db.query(
      `
      INSERT INTO hosts (name, ip_address)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [name, ipAddress || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create host error:", err);

    return res.status(500).json({
      error: "Failed to create host",
      details: err instanceof Error ? err.message : err,
    });
  }
});

/**
 * GET ALL HOSTS
 * GET /api/v1/hosts
 */
router.get("/", async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM hosts ORDER BY created_at DESC`
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("Fetch hosts error:", err);

    return res.status(500).json({
      error: "Failed to fetch hosts",
    });
  }
});

/**
 * GET SINGLE HOST
 * GET /api/v1/hosts/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM hosts WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Host not found" });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Fetch host error:", err);

    return res.status(500).json({
      error: "Failed to fetch host",
    });
  }
});

/**
 * GET HOST HEALTH
 * GET /api/v1/hosts/:id/health
 */
router.get("/:id/health", async (req, res) => {
  try {
    const health = await getHostHealth(req.params.id);

    if (!health) {
      return res.status(404).json({
        error: "No heartbeat found for this host",
      });
    }

    return res.json(health);
  } catch (err) {
    console.error("Health error:", err);

    return res.status(500).json({
      error: "Failed to get host health",
    });
  }
});

/**
 * GET HOST HEARTBEAT HISTORY
 * GET /api/v1/hosts/:id/heartbeats
 */
router.get("/:id/heartbeats", async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT *
      FROM heartbeats
      WHERE host_id = $1
      ORDER BY timestamp DESC;
      `,
      [req.params.id]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("Fetch heartbeats error:", err);

    return res.status(500).json({
      error: "Failed to fetch heartbeats",
    });
  }
});

export default router;