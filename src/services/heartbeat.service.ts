export interface HeartbeatDTO {
  hostId: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export type HeartbeatStatus = "healthy" | "degraded" | "down";

export class HeartbeatService {
  /**
   * Validate incoming heartbeat data
   */
  validate(input: HeartbeatDTO): string[] {
    const errors: string[] = [];

    if (!input.hostId) {
      errors.push("hostId is required");
    }

    if (this.isInvalidMetric(input.cpuUsage)) {
      errors.push("cpuUsage must be between 0 and 100");
    }

    if (this.isInvalidMetric(input.memoryUsage)) {
      errors.push("memoryUsage must be between 0 and 100");
    }

    if (this.isInvalidMetric(input.diskUsage)) {
      errors.push("diskUsage must be between 0 and 100");
    }

    return errors;
  }

  /**
   * Core health logic (no DB, pure computation)
   */
  calculateStatus(input: HeartbeatDTO): HeartbeatStatus {
    const { cpuUsage, memoryUsage, diskUsage } = input;

    // critical condition
    if (cpuUsage >= 90 || memoryUsage >= 90 || diskUsage >= 95) {
      return "down";
    }

    // warning condition
    if (cpuUsage >= 75 || memoryUsage >= 75 || diskUsage >= 85) {
      return "degraded";
    }

    return "healthy";
  }

  /**
   * Normalize heartbeat before saving to DB
   */
  buildResponse(input: HeartbeatDTO) {
    return {
      hostId: input.hostId,
      cpuUsage: input.cpuUsage,
      memoryUsage: input.memoryUsage,
      diskUsage: input.diskUsage,
      status: this.calculateStatus(input),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Helper: metric validation
   */
  private isInvalidMetric(value: number) {
    return typeof value !== "number" || value < 0 || value > 100;
  }
}