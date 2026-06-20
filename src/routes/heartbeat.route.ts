import { Router } from "express";
import { HeartbeatController } from "../controllers/heartbeat.controller";
import { HeartbeatService } from "../services/heartbeat.service";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

const router = Router();

// dependency wiring
const repo = new HeartbeatRepository();
// HeartbeatService constructor expects no arguments
const service = new HeartbeatService();
const controller = new HeartbeatController(service);

router.post("/", controller.create);

export default router;