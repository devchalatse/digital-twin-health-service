CREATE TABLE IF NOT EXISTS heartbeats (
  id UUID PRIMARY KEY,
  host_id TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  cpu_usage FLOAT NOT NULL,
  memory_usage FLOAT NOT NULL,
  disk_usage FLOAT NOT NULL,
  status TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_heartbeats_host_time
ON heartbeats(host_id, timestamp DESC);