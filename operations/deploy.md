# Deploy

Public deployment procedure summary for Branching Tales. Real manifests,
secrets, image tags, Argo CD apps, and environment values live in
`revisium/infrastructure`.

## Boundary

| Topic | Canonical owner |
|---|---|
| Frontend build/deploy workflow | `demo-rpg-frontend` |
| Backend build/deploy/migration workflow | `demo-rpg-backend` |
| Helm values, ingress, Argo CD, cluster secrets | `revisium/infrastructure` |
| Public architecture and sanitized runbook summary | `demo-rpg-docs/operations/` |

## Fresh Environment Order

1. Create or select the Revisium data project (`demo-rpg-data`) and CMS project
   (`demo-rpg-cms`).
2. Apply schema/data using the canonical artifact for the target workflow:
   - portable demo copy: `demo-rpg-docs/bootstrap/`;
   - backend runtime project: `demo-rpg-backend/revisium/migrations.json`.
3. Regenerate OpenAPI and generated clients through the backend workflow.
4. Deploy backend and run Prisma/Revisium migrations.
5. Deploy supergraph-builder and Apollo Router with the three subgraph URLs.
6. Deploy frontend with same-origin `/graphql` routed to Apollo Router.
7. Smoke test `/`, `/regions`, `/regions/[id]`, backend health, router
   GraphQL, and both Revisium OpenAPI endpoints.

## Ship A Change

| Change type | Required owner action |
|---|---|
| Product copy, BR, ADR, capability scope | Update `demo-rpg-docs` first. |
| Frontend route behaviour, layout, page status | Update `demo-rpg-frontend/docs/` and code together. |
| Data schema/runtime API | Update schema intent in `demo-rpg-docs`, then backend migrations/OpenAPI/generated client. |
| Backend runtime behaviour | Update `demo-rpg-backend` docs/code/tests. |
| Cluster wiring | Update `revisium/infrastructure`; keep public docs sanitized. |

## Rollback

- Data rollback: use Revisium revisions/branches in the affected project.
- Backend/frontend rollback: redeploy the previous image/tag through the
  infrastructure workflow.
- Supergraph rollback: router keeps the previous good supergraph when
  composition fails; investigate builder health before changing code.

## Decommission

Remove public DNS/ingress first, then stop router/frontend/backend workloads,
then archive Revisium projects only after confirming no public references still
depend on them.
