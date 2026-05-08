# Operations Overview

> Status: Draft scaffolding.

## Hosting

<!-- TODO: where Apollo Router and demo-rpg-backend run (Fly.io? Railway? Self-hosted on a small VPS?), where the frontend deploys (Vercel?). -->

## Environments

| Environment | Purpose | URL | Branch |
|---|---|---|---|
| Production | Live demo for visitors | <!-- TODO --> | `master` |
| Staging | Optional, pre-merge preview | <!-- TODO --> | `staging` |

## State

| Store | Purpose |
|---|---|
| `cloud.revisium.io/revisium/demo-rpg-data` *(planned)* | Game dictionary (15 tables) |
| `cloud.revisium.io/revisium/demo-rpg-cms` *(planned)* | Marketing content |

No application database — the demo deliberately avoids Postgres in `demo-rpg-backend` to keep the "Revisium-as-source-of-truth" story clean.

## CI/CD

<!-- TODO: GitHub Actions workflow per repo, triggered on PR + main, supergraph composition step, deploy step. -->

## Observability

<!-- TODO: minimal — Pino in backend, frontend telemetry off by default in the demo. -->

## Cross-cutting

- Secrets — [secrets.md](./secrets.md)
- Deploy procedures — [deploy.md](./deploy.md)
- Runbook — [runbook.md](./runbook.md)
