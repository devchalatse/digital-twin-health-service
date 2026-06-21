# Solution Design — Digital Twin Health Service

## Problem

Build a system that simulates real-time infrastructure monitoring by tracking system metrics (CPU, memory, disk) and determining host health.

---

## Goal

Create a lightweight digital twin that:
- Ingests system metrics
- Stores time-series data
- Computes real-time health status
- Exposes host-level observability APIs

---

##  Architecture


API Layer → Service Layer → Database → Computation Layer → Response


---

## Components

### 1. Hosts Module
Manages monitored systems.

Responsibilities:
- Create host
- Retrieve host
- List hosts
- Provide host metadata

---

### 2. Heartbeat Module
Handles system metrics ingestion.

Responsibilities:
- Validate input metrics
- Store heartbeat in PostgreSQL
- Attach computed status

---

### 3. Health Module (Core Intelligence)
Acts as the “digital twin brain”.

Responsibilities:
- Fetch latest heartbeat from DB
- Compute system status dynamically
- Return aggregated health view

---

##  Health Algorithm

- CPU ≥ 90 OR Memory ≥ 90 OR Disk ≥ 95 → down
- CPU ≥ 75 OR Memory ≥ 75 OR Disk ≥ 85 → degraded
- Otherwise → healthy

---

##  Data Model

### hosts
Represents monitored machines.

### heartbeats
Time-series telemetry data.

---

##  System Flow

1. Host is registered
2. Metrics are sent via heartbeat API
3. Data is stored in PostgreSQL
4. HealthService queries latest data
5. API returns computed health

---

## Design Principles

- Separation of concerns
- Stateless API design
- Time-series data modeling
- Compute-on-read (not stored health state)
- PostgreSQL as source of truth

---

##  Outcome

This system behaves like a simplified:
- Datadog
- Prometheus
- Infrastructure monitoring system