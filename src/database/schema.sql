CREATE TABLE heartbeats (
  id UUID PRIMARY KEY,
  host_id UUID NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  cpu_usage FLOAT NOT NULL,
  memory_usage FLOAT NOT NULL,
  disk_usage FLOAT NOT NULL,
  status TEXT NOT NULL
);