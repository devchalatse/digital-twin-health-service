export interface Heartbeat {
  id: string;
  hostId: string;
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  status: "healthy" | "degraded" | "down";
}