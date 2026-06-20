import { Request, Response } from "express";
import { heartbeatSchema } from "../schemas/heartbeat.schema";
import { HeartbeatService } from "../services/heartbeat.service";

export class HeartbeatController {
  constructor(private service: HeartbeatService) {}

  create = async (req: Request, res: Response) => {
    const parsed = heartbeatSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.flatten(),
      });
    }

    const heartbeat = await (this.service as any).create({
      ...parsed.data,
      timestamp: new Date(),
    });

    return res.status(201).json(heartbeat);
  };
}