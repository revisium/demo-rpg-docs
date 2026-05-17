# Operations Overview

Public operations summary for Branching Tales. Real Kubernetes values, Argo CD
apps, secrets, and environment-specific wiring live in `revisium/infrastructure`.

## Hosting

| Surface | Dev location | Canonical operational owner |
|---|---|---|
| Frontend | `https://demo-rpg.dev.revisium.io` | `demo-rpg-frontend` app + infrastructure ingress |
| Apollo Router | `https://demo-rpg-router.dev.revisium.io/graphql` and same-origin `/graphql` under the frontend host | `revisium/infrastructure` |
| Backend subgraph | `https://demo-rpg-backend.dev.revisium.io` | `demo-rpg-backend` app + infrastructure Helm values |
| Game data | `https://cloud.revisium.io/revisium/demo-rpg-data` | Revisium Cloud project |
| CMS | `https://cloud.revisium.io/revisium/demo-rpg-cms` | Revisium Cloud project |

## Environments

| Environment | Purpose | Notes |
|---|---|---|
| Dev stand | Public in-progress demo | Current live URLs use the `.dev.revisium.io` hosts. |
| Production | Future stable public demo | Planned; do not invent production URLs before infrastructure lands. |

## State

| Store | Purpose | Source of truth |
|---|---|---|
| `demo-rpg-data` | Game dictionary, files, formulas, public read data | Revisium Cloud + backend applied migrations |
| `demo-rpg-cms` | Landing/blog/guide content | Revisium Cloud + docs bootstrap snapshot |
| Backend PostgreSQL | Backend-owned runtime state such as auth, counters, comments, and OAuth data | `demo-rpg-backend` Prisma migrations |

## CI/CD

- `demo-rpg-frontend` owns its build, deploy, and release workflow docs.
- `demo-rpg-backend` owns its build, deploy, migrations, and generated-client workflow docs.
- `revisium/infrastructure` owns the real Helm/Argo wiring for frontend,
  backend, router, and supergraph-builder.
- This repo keeps only public, sanitized operational context.

## Observability

- Backend: health, metrics, structured logs.
- Router/supergraph-builder: health and composition status in infrastructure
  runbooks.
- Frontend: user-visible fallback/error states and Explainer Widget request
  evidence.

## Cross-Cutting

- Secrets — [secrets.md](./secrets.md)
- Deploy procedures — [deploy.md](./deploy.md)
- Runbook — [runbook.md](./runbook.md)
