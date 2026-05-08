# Secrets

> Status: Draft scaffolding.

Registry of secrets used by the Branching Tales demo.

## Principles

- Nothing committed to the repos.
- Local development uses `.env.example` files; copies become `.env` on each developer's machine.
- Production secrets live in the deploy platform's secret store (Fly.io secrets, Railway variables, Vercel env, etc.).

## Registry

| Key | Used by | Purpose | Owner |
|---|---|---|---|
| `REVISIUM_API_TOKEN` | demo-rpg-backend | Auth to cloud.revisium.io for write paths (if any) | <!-- TODO --> |
| `REVISIUM_GRAPHQL_ENDPOINT_DATA` | apollo-router | Subgraph URL for game dictionary | <!-- TODO --> |
| `REVISIUM_CMS_ENDPOINT` | demo-rpg-frontend | Direct CMS URL for SSR | <!-- TODO --> |

## Rotation

<!-- TODO: cadence (annual for demo), procedure. -->
