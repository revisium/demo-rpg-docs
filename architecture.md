# Architecture

Branching Tales uses one frontend, one application backend, and two Revisium
Cloud projects.

```mermaid
%%{init: {"flowchart": {"defaultRenderer": "elk"}}}%%
flowchart TB
  Browser["Browser"]
  Frontend["demo-rpg-frontend<br/>React Router SSR"]
  Router["Apollo Router"]
  Backend["demo-rpg-backend<br/>NestJS subgraph"]
  Data["demo-rpg-data<br/>Revisium game data"]
  CMS["demo-rpg-cms<br/>Revisium CMS"]
  Builder["supergraph-builder"]

  Browser --> Frontend
  Frontend --> Router
  Router --> Backend
  Router --> Data
  Router --> CMS
  Builder -. polls SDL .-> Backend
  Builder -. polls SDL .-> Data
  Builder -. polls SDL .-> CMS
  Router -. reloads supergraph .-> Builder
```

## Runtime Path

1. The browser opens `demo-rpg.dev.revisium.io`.
2. The SSR frontend renders the codex UI.
3. Frontend data requests go to same-origin `/graphql`.
4. Apollo Router federates the request across:
   - `demo-rpg-backend`;
   - `demo-rpg-data`;
   - `demo-rpg-cms`.
5. The Explainer Widget shows the request, variables, sample response, and source
   links.

## Boundaries

- `demo-rpg-frontend`: routes, UI, page specs, ViewModels, SSR, and GraphQL
  operations.
- `demo-rpg-backend`: backend-owned fields, MCP/REST/GraphQL runtime, and the
  generated Revisium client.
- Revisium Cloud projects: game data, CMS data, schemas, files, formulas, and
  revisions.
- Apollo Router: federated graph at the public GraphQL edge.
- `supergraph-builder`: SDL polling and supergraph composition.
- `revisium/infrastructure`: deployment, ingress, secrets, Argo CD, Helm values.

For implementation details, go to the owning repo. This file is only the public
architecture summary.
