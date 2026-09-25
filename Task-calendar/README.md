# TASKBOARD

A lightweight Kanban-style task management web app built with Node.js and Express. Designed to be containerized and deployed anywhere Docker runs — including locally and on AWS ECS.

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

### Run Locally (without Docker)

```bash
npm install
npm start
```

Visit `http://localhost:4045`

---

### Run with Docker

```bash
# Build the image
docker build -t taskboard:1.0 .

# Run the container
docker run -p 4045:4045 taskboard:1.0

# Run in detached mode
docker run -d -p 4045:4045 --name taskboard taskboard:1.0
```

Visit `http://localhost:4045`

---

## API Reference

All endpoints return and accept `application/json`.


## Docker

### Image details

- Base image: `node:20-alpine`
- Multi-stage build — final image contains no build tooling
- Runs as a **non-root user** (`appuser`) for security
- Built-in `HEALTHCHECK` hitting `GET /health` every 30 seconds
- Exposed port: `4045`

### Build with a version tag

```bash
docker build -t taskboard:1.0 .
```
