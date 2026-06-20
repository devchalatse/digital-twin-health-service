import { FastifyInstance } from "fastify";
import { heartbeatSchema } from "../schemas/heartbeat.schema";
import { HeartbeatService } from "../services/heartbeat.service";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

export default async function healthRoutes(fastify: FastifyInstance) {
  const service = new HeartbeatService();
  const repo = new HeartbeatRepository();

  fastify.post("/heartbeats", async (request, reply) => {
    // 1. Validate input
    const parsed = heartbeatSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: parsed.error.flatten(),
      });
    }

    const input = parsed.data;

    // 2. Business logic
    const enriched = service.buildResponse(input);

    // 3. Save (mock DB for now)
    const saved = await repo.save(enriched);

    // 4. Response
    return reply.code(201).send(saved);
  });
}