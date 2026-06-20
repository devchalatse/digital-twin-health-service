import { HeartbeatDTO } from "../schemas/heartbeat.schema";

export type HeartbeatStatus = "healthy" | "degraded" | "down";

export class HeartbeatService {
  calculateStatus(input: HeartbeatDTO): HeartbeatStatus {
    const avg =
      (input.cpuUsage + input.memoryUsage + input.diskUsage) / 3;

    if (avg > 85) return "down";
    if (avg > 65) return "degraded";
    return "healthy";
  }

  buildResponse(input: HeartbeatDTO) {
    const status = this.calculateStatus(input);

    return {
      hostId: input.hostId,
      cpuUsage: input.cpuUsage,
      memoryUsage: input.memoryUsage,
      diskUsage: input.diskUsage,
      status,
      timestamp: new Date().toISOString(),
    };
  }
}