# Api Ministore

## Overview

A deployable Node.js HTTP service and hardened Kubernetes workload that demonstrates production-oriented rollout, autoscaling, health, and namespace controls.

## Architecture and flow

Three replicas behind a ClusterIP Service; startup/liveness/readiness probes; CPU+memory HPA; PDB; topology spread; restricted Pod Security; quota/LimitRange; default-deny policies; read-only root filesystem and non-root user.

This project contains: `app/Dockerfile`, `app/package.json`, `app/server.js`, `app/server.test.js`, `k8s/deployment.yaml`, `k8s/kustomization.yaml`, `k8s/namespace-and-policy.yaml`, `k8s/HPA.yaml`, `k8s/namespace.yaml`, `k8s/serviceaccount.yaml`, `kustomization.yaml`, `k8s/ConfigMap.yaml`, `k8s/service.yaml`

## Setup and configuration

Use the commands below from this project directory unless a path is stated. Keep local credentials and generated state outside version control. Review every example value and replace reserved example domains, CIDRs, account IDs, repository owners, and image names before connecting a real environment.

## Local validation and deployment

```bash
cd app && npm test
docker build -t ministore-api:[tag] app
kubectl apply -k k8s
kubectl -n ministore rollout status deploy/ministore-api
kubectl -n ministore get hpa,pdb,networkpolicy
```

HPA metrics require a working Metrics Server. NetworkPolicy resources have no effect unless the cluster CNI enforces them.

## Security and operations

- No credentials, private keys, tokens, or passwords are stored in this project. Use your platform's secret store or workload identity.
- Review cloud resource costs, IAM permissions, network exposure, and the generated plan before provisioning infrastructure.
- Use least-privilege credentials and a disposable non-production environment for demonstrations.
- Cloud deployment, infrastructure apply, and Git push are not performed by these implementation files automatically.

## Summary 

Four replicas behind a ClusterIP Service; startup/liveness/readiness probes; CPU+memory HPA; PDB; topology spread; restricted Pod Security; quota/LimitRange; default-deny policies; read-only root filesystem and non-root user.