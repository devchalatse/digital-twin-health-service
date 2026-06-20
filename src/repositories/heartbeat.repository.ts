import { pool } from "../database/db";

export class HeartbeatRepository {
  async create(data: any) {
    const result = await pool.query(
      `INSERT INTO heartbeats (
        host_id,
        cpu_usage,
        memory_usage,
        disk_usage,
        status,
        timestamp
      ) VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        data.hostId,
        data.cpuUsage,
        data.memoryUsage,
        data.diskUsage,
        data.status,
        data.timestamp,
      ]
    );

    return result.rows[0];
  }
}