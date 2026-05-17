# Runbook

Public reactive procedures for Branching Tales. Use this as the first
orientation layer; private cluster commands and real values belong in
`revisium/infrastructure`.

## Apollo Router Will Not Start

1. Check whether the last composed supergraph is present in the router shared
   volume.
2. Check supergraph-builder health and composition errors.
3. Check reachability of `demo-rpg-backend`, `demo-rpg-data`, and
   `demo-rpg-cms` GraphQL endpoints.
4. If a schema change caused composition failure, keep the previous good
   supergraph served and fix the offending subgraph/schema.

## Supergraph Composition Fails

1. Identify the failing subgraph from supergraph-builder logs/status.
2. Compare the failing SDL with the latest intended schema or backend resolver
   change.
3. For Revisium data/CMS failures, confirm the project head revision and
   generated SDL endpoint are available.
4. For backend failures, confirm the deployed backend image exposes the expected
   federation SDL.
5. Fix the canonical owner: backend code, Revisium schema, or infrastructure
   subgraph URL.

## Bad Migration Applied To `demo-rpg-data`

1. Stop new writes if the mistake affects public data.
2. Inspect Revisium revision history for the previous good head revision.
3. Revert or create a corrective migration depending on whether the bad change
   was already consumed by frontend/backend code.
4. Regenerate backend OpenAPI/client if the schema shape changed.
5. Smoke test affected frontend pages and the Explainer Widget links.

## Frontend Deploys But Data Is Stale

1. Confirm the frontend is querying same-origin `/graphql`.
2. Confirm Apollo Router is serving the latest composed supergraph.
3. Confirm `demo-rpg-data` or `demo-rpg-cms` head revision contains the expected
   rows.
4. Check CDN/router cache rules before changing app code.
5. If only generated types are stale, rerun the owning codegen workflow in the
   implementation repo.
