import { z } from "zod";

export const heartbeatSchema = z.object({
  hostId: z.string(),
  cpuUsage: z.coerce.number(),
  memoryUsage: z.coerce.number(),
  diskUsage: z.coerce.number(),
});