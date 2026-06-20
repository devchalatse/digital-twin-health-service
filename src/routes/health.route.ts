import { FastifyInstance } from "fastify";
import { heartbeatSchema } from "../schemas/heartbeat.schema";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

export default async function (fastify: FastifyInstance) {
  const repo = new HeartbeatRepository();

  fastify.post("/heartbeats", async (request, reply) => {
    const parsed = heartbeatSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send(parsed.error.flatten());
    }

    const data = parsed.data;

    const enriched = {
      hostId: data.hostId,
      cpuUsage: data.cpuUsage,
      memoryUsage: data.memoryUsage,
      diskUsage: data.diskUsage,
      status:
        data.cpuUsage > 80 ||
        data.memoryUsage > 80 ||
        data.diskUsage > 80
          ? "unhealthy"
          : "healthy",
      timestamp: new Date(),
    };

    const saved = await repo.create(enriched);

    return reply.code(201).send(saved);
  });
}