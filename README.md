# Digital Twin Health Service

A lightweight backend observability system that simulates real-time infrastructure monitoring using heartbeat ingestion, time-series storage, and dynamic health computation.

It mimics core concepts used in systems like Prometheus, Datadog, and New Relic, built from scratch using Node.js and PostgreSQL.

# Tech Stack
Node.js (Express)
TypeScript
PostgreSQL
Docker
pg (node-postgres)

# System Architecture
Client → API Layer → Service Layer → PostgreSQL → Health Computation → Response

# Core Design Principle
API → store heartbeat
DB  → source of truth
API → read DB → compute health → respond

# Features
Host registration & management
Real-time heartbeat ingestion
Time-series system metrics storage
Dynamic health computation (healthy / degraded / down)
RESTful API architecture
PostgreSQL-backed persistence
Dockerized database setup

# Installation & Setup
1. Clone repository
git clone git@github.com:devchalatse/digital-twin-health-service.git
cd digital-twin-health-service

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file:

DATABASE_URL=postgres://postgres:postgres@localhost:5432/digital_twin
4. Start PostgreSQL (Docker)
docker-compose up -d

5. Start the server
npm run dev

Server runs at:
http://localhost:3000
API Base URL
http://localhost:3000/api/v1
System Demo Flow

# This section demonstrates the full lifecycle of the system.

1. Create a Host

Registers a new machine to be monitored.

curl -X POST http://localhost:3000/api/v1/hosts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "server-01",
    "ipAddress": "127.0.0.1"
  }'

# Response returns a hostId used in subsequent requests.

2. Send Normal Heartbeat

Simulates healthy system performance.

curl -X POST http://localhost:3000/api/v1/heartbeats \
  -H "Content-Type: application/json" \
  -d '{
    "hostId": "<HOST_ID>",
    "cpuUsage": 60,
    "memoryUsage": 50,
    "diskUsage": 40
  }'
  

Expected status: healthy

3. Send Stress Heartbeat

Simulates high system load.

curl -X POST http://localhost:3000/api/v1/heartbeats \
  -H "Content-Type: application/json" \
  -d '{
    "hostId": "<HOST_ID>",
    "cpuUsage": 92,
    "memoryUsage": 85,
    "diskUsage": 70
  }'

Expected status: degraded or down

4. Get All Hosts
curl http://localhost:3000/api/v1/hosts

5. Get Single Host
curl http://localhost:3000/api/v1/hosts/<HOST_ID>

6. Get Host Health (Core Feature)
curl http://localhost:3000/api/v1/hosts/<HOST_ID>/health

Returns real-time computed system health.

7. Get Heartbeat History (Time-Series Data)
curl http://localhost:3000/api/v1/hosts/<HOST_ID>/heartbeats

# Health Computation Logic
Condition	Status
CPU ≥ 90 OR Memory ≥ 90 OR Disk ≥ 95	down
CPU ≥ 75 OR Memory ≥ 75 OR Disk ≥ 85	degraded
Otherwise	healthy

Project Structure
src/
├── routes/
├── services/
├── db/
├── server.ts

# Key Engineering Decisions
Separation of concerns (routes / services / db)
Stateless API design
Compute-on-read health model
Time-series data modeling in PostgreSQL
Dockerized development environment

# Future Improvements
WebSocket real-time monitoring dashboard
Prometheus / Grafana integration
Authentication per host
Alerting system (threshold-based notifications)
Metrics aggregation layer

# What This Project Demonstrates

This project showcases:

Backend system design
Observability architecture concepts
Time-series data handling
Real-world API structuring
Production-style TypeScript patterns

# Final Note
This system is a simplified digital twin monitoring engine, built to demonstrate how infrastructure observability systems work under the hood.