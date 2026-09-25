```markdown
# Ministore Microservices Kubernetes Project

This project is a microservices-based application built with Node.js, Docker, Kubernetes, and AWS EKS. 
The project demonstrates how multiple backend services can be containerized, pushed to a Docker registry, 
and deployed into a Kubernetes cluster where they communicate with each other using Kubernetes Services.


## Project Overview

The application is made up of multiple services:
* **API Gateway**
* **Product Service**
* **Order Service**
* **Notification Service**

Inside Kubernetes, the services communicate using internal service names such as:

```text
http://product-service:3001
http://order-service:3002
http://notification-service:3003

```

---

### 9. Core Deployment Pipeline

Apply all manifests synchronously inside the cluster:

```bash
kubectl apply -f ./k8s

```

Verify cluster statuses:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
kubectl get svc -n <namespace-name>
kubectl get svc -A

```

## Useful Commands Cheat Sheet

| Command | Action |
| --- | --- |
| `docker images` | View local Docker image cache |
| `kubectl apply -f ./k8s` | Apply all manifests in the folder |
| `kubectl rollout restart deployment <name>` | Force restart running deployment instances |
| `kubectl get pods` | View status of active pods |
| `kubectl describe pod <pod-name>` | Inspect specific logs and lifecycle debug parameters |
| `kubectl get svc` | List details of running Kubernetes services |
| `kubectl delete -f ./k8s` | Wipe all managed folder resources from the cluster |


### Planned Improvements

* [ ] Integrate Prometheus and Grafana cluster monitoring metrics
* [ ] Configure centralized cluster-wide logging aggregation
* [ ] Implement full automated continuous deployment (CD) workflows straight into EKS via GitHub Actions

---

## What Was Done

### 1. Microservices Architecture

* Split the application into independent services:

  * `api-gateway`
  * `product-service`
  * `order-service`
  * `notification-service`
* Each service has its own codebase and container image.

### 2. Kubernetes Deployments

* Created Kubernetes Deployments for each microservice.
* Configured replicas, rolling updates, and container specifications.
* Enabled independent deployment and scaling of services.

### 3. Kubernetes Services

* Created Kubernetes Services to provide stable DNS-based communication between pods.
* Used `ClusterIP` for internal microservice communication.

### 4. Configuration Management

* Used Kubernetes ConfigMaps for non-sensitive application configuration.
* Service endpoints are injected through environment variables rather than hardcoded values.

### 5. Resource Management

* Configured CPU and memory requests and limits for workloads.
* Prevents individual containers from consuming excessive cluster resources.

### 6. Health Checks

* Added Kubernetes readiness and liveness probes.
* Readiness probes control when pods receive traffic.
* Liveness probes allow Kubernetes to restart unhealthy containers automatically.

### 7. Horizontal Pod Autoscaling

* Configured an HPA for dynamic workload scaling.
* Pods can scale between defined minimum and maximum replicas based on CPU utilization.

### 8. Kubernetes Configuration Management

* Used Kustomize to organize and manage Kubernetes manifests.
* Separated application configuration from deployment resources for easier maintenance.
