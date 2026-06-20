export class HeartbeatRepository {
  async save(data: any) {
    
    console.log("Saving heartbeat to DB:", data);

    return {
      id: crypto.randomUUID(),
      ...data,
    };
  }
}