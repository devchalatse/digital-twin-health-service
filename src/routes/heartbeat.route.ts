import { FastifyInstance } from "fastify";
import { HeartbeatController } from "../controllers/heartbeat.controller";
import { HeartbeatService } from "../services/heartbeat.service";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

export default async function heartbeatRoutes(fastify: FastifyInstance) {
  const repo = new HeartbeatRepository();
  const service = new HeartbeatService();

  const controller = new HeartbeatController(service, repo);

  fastify.post("/heartbeats", controller.create.bind(controller));
}