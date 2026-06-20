import { HeartbeatService } from "../services/heartbeat.service";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

export class HeartbeatController {
  private service: HeartbeatService;
  private repo: HeartbeatRepository;

  constructor(service: HeartbeatService, repo: HeartbeatRepository) {
    this.service = service;
    this.repo = repo;
  }

  create = async (request: any, reply: any) => {
    const data = request.body;

    const status = this.service.calculateStatus(data);

    const enriched = {
      hostId: data.hostId,
      cpuUsage: data.cpuUsage,
      memoryUsage: data.memoryUsage,
      diskUsage: data.diskUsage,
      status,
      timestamp: new Date(),
    };

    const saved = await this.repo.create(enriched);

    return reply.code(201).send(saved);
  };
}