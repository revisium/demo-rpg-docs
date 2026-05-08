# Architecture Overview

> Status: Draft scaffolding. Filled in once schemas (specs) and ADRs are in place.

**Navigation:** [project passport](../README.md) · [ADR](./adr/README.md) · [specs](./specs/README.md) · [runtime flows](./runtime-flows/README.md)

## Architecture Principles

<!-- TODO. Candidates:
1. Revisium-first — game data and marketing content live in Revisium; backend never owns persistence for those domains.
2. Federation, not aggregation — Apollo Router composes subgraphs; no manual stitching in the gateway.
3. One project per concern — separate dictionary (game data) from CMS (marketing). Different owners, different release cadence.
4. Public read by default — `demo-rpg-data` and `demo-rpg-cms` are world-readable; mutations require auth via demo-rpg-backend.
5. Every Revisium feature on display — over-model deliberately so visitors see what is possible.
-->

## Context

<!-- TODO: who uses the demo (developers evaluating Revisium), why it exists (DevRel), what it is not (a real game). -->

## Components

See [README § Architecture Overview](../README.md#architecture-overview) for the C4-style component diagram.

| Component | Repo | Role |
|---|---|---|
| `demo-rpg-frontend` | <!-- TODO --> | Companion app + landing (Next.js, Apollo Client) |
| `demo-rpg-backend` | <!-- TODO --> | NestJS subgraph: business logic, auth, formulas not expressible in Revisium |
| Apollo Router | inside backend repo | Federated GraphQL gateway |
| `demo-rpg-data` | `cloud.revisium.io/revisium/demo-rpg-data` *(planned)* | Game dictionary (15 tables, files, formulas, branching) |
| `demo-rpg-cms` | `cloud.revisium.io/revisium/demo-rpg-cms` *(planned)* | Landing copy, blog posts, hero content |

## Runtime Flows

<!-- Inline up to 4 flows. Then move to runtime-flows/. -->

### Flow 1: Visitor browses heroes

<!-- TODO sequenceDiagram: visitor → frontend → router → demo-rpg-data (read-only) -->

### Flow 2: Visitor reads landing copy

<!-- TODO sequenceDiagram: visitor → frontend → demo-rpg-cms (direct) -->

### Flow 3: Demo balance patch (branching showcase)

<!-- TODO sequenceDiagram: editor → cloud.revisium.io (creates branch) → modifies items → merges → frontend reflects new values -->

## Cross-cutting Concerns

| Concern | Approach |
|---|---|
| Auth | <!-- TODO: anonymous read everywhere, OAuth on backend only --> |
| Caching | <!-- TODO: Apollo Router response cache, BentoCache in backend --> |
| Observability | <!-- TODO: Pino, OpenTelemetry, demo dashboard --> |
| Versioning | <!-- TODO: schema migrations via revisium-cli, balance branches in cloud --> |
