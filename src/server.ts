import express from "express";
import hostsRoute from "./routes/hosts.route";
import heartbeatsRoute from "./routes/heartbeat.route";

const app = express();

app.use(express.json());

app.use("/api/v1/hosts", hostsRoute);
app.use("/api/v1/heartbeats", heartbeatsRoute);

app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});