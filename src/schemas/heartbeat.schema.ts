import { z } from "zod";

export const heartbeatSchema = z.object({
  hostId: z.string().uuid(),
  cpuUsage: z.number().min(0).max(100),
  memoryUsage: z.number().min(0).max(100),
  diskUsage: z.number().min(0).max(100),
});

export type HeartbeatDTO = z.infer<typeof heartbeatSchema>;