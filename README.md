# demo-rpg — Project Passport

> Branching Tales — a fantasy adventurer's guild simulator built end-to-end on Revisium. Demonstrates JSON Schema modelling, foreign keys, file fields, computed formulas, schema evolution, branching, and a federated multi-API architecture.

| Parameter | Value |
|---|---|
| Codename | `demo-rpg` |
| Name | Branching Tales |
| Stage | Bootstrap (scaffolding) |
| Tech owner | <!-- TODO --> |
| Audience | DevRel — developers evaluating Revisium |
| Goal | Showcase **every** Revisium capability in a recognizable real-world use case |

## Overview

**Branching Tales** is a fantasy guild-management demo that uses Revisium as the system of record for game content (items, monsters, quests, parties) and for the marketing site that wraps it.

The demo is intentionally over-modelled to exercise every Revisium primitive: nested JSON Schema, single and array foreign keys, file fields with hash + content reference, computed fields with array aggregation and relative-path expressions, branching for balance patches, schema migrations via CLI, and three API surfaces (REST, GraphQL, MCP) federated under Apollo Router.

## Service URLs

| Service | Production | Notes |
|---|---|---|
| Landing | <!-- TODO --> | Public marketing site |
| App | <!-- TODO --> | Companion app (browse heroes, items, quests) |
| API (Apollo Router) | <!-- TODO --> | Federated GraphQL |
| Game data (Revisium) | `cloud.revisium.io/revisium/demo-rpg-data` *(planned — not yet bootstrapped)* | Dictionary project |
| CMS (Revisium) | `cloud.revisium.io/revisium/demo-rpg-cms` *(planned — not yet bootstrapped)* | Marketing content |

## Architecture

- **Overview** — [architecture/overview.md](architecture/overview.md)
- **Decisions (ADR)** — [architecture/adr/README.md](architecture/adr/README.md)
- **Specs** — [architecture/specs/README.md](architecture/specs/README.md)
- **Runtime flows** — [architecture/runtime-flows/README.md](architecture/runtime-flows/README.md)

## Repositories

| Repository | Role | Stack |
|---|---|---|
| [demo-rpg-docs](https://github.com/revisium/demo-rpg-docs) | Project passport, ADR, specs, BR, skills, playbooks | Markdown |
| demo-rpg-backend (planned) | NestJS subgraph (CQRS, REST, GraphQL, MCP) | NestJS, Prisma, fork of `template-nestjs-api` |
| demo-rpg-frontend (planned) | Companion app + landing | React Router v7 SSR, MobX, Apollo Client |
| demo-rpg-supergraph (planned) | Supergraph composition pipeline | Wraps [`revisium/supergraph-builder`](https://github.com/revisium/supergraph-builder) |

External dependencies: [revisium-cli](https://github.com/revisium/revisium-cli), [revisium/supergraph-builder](https://github.com/revisium/supergraph-builder), [Revisium Cloud](https://cloud.revisium.io), [Apollo Router](https://www.apollographql.com/docs/router).

## Architecture Overview

```mermaid
%%{init: {"flowchart": {"defaultRenderer": "elk"}}}%%
flowchart TB
  U(["Developer / Visitor"])

  subgraph demo["Branching Tales"]
    direction TB

    LAND["demo-rpg-frontend<br/>landing + app<br/>React Router v7 SSR · MobX"]
    ROUTER["Apollo Router<br/>federated GraphQL"]
    BUILDER["supergraph-builder<br/>composes SDLs<br/>into supergraph"]
    BE["demo-rpg-backend<br/>NestJS · CQRS<br/>REST · GraphQL · MCP"]

    subgraph cloud["cloud.revisium.io"]
      direction TB
      DATA["demo-rpg-data<br/>game dictionary<br/>15 tables · formulas · files"]
      CMS["demo-rpg-cms<br/>marketing content"]
    end
  end

  U --> LAND
  LAND --> ROUTER
  ROUTER --> BE
  ROUTER --> DATA
  ROUTER --> CMS
  BE -.->|SDL| BUILDER
  DATA -.->|SDL| BUILDER
  CMS -.->|SDL| BUILDER
  BUILDER -.->|composed supergraph| ROUTER

  classDef container fill:#1168bd,stroke:#0b4884,color:#fff
  classDef external fill:#999,stroke:#666,color:#fff
  classDef person fill:#08427b,stroke:#052a52,color:#fff
  class LAND,ROUTER,BE,BUILDER container
  class DATA,CMS external
  class U person
```

**In short:** the frontend (React Router v7 SSR + MobX + Apollo Client) talks to Apollo Router. The router federates **three** subgraphs — a NestJS subgraph (`demo-rpg-backend`) plus the two Revisium-managed subgraphs (`demo-rpg-data`, `demo-rpg-cms`). The supergraph schema is composed by [`revisium/supergraph-builder`](https://github.com/revisium/supergraph-builder), which fetches each subgraph's SDL and produces the merged schema fed into the router. Once both cloud projects are bootstrapped, everything in `cloud.revisium.io` is open for read-only exploration.

## Operations

- [Overview](operations/overview.md) — deployment, secrets, observability
- [Deploy](operations/deploy.md) — release procedures
- [Runbook](operations/runbook.md) — reactive procedures
- [Secrets](operations/secrets.md) — registry and rotation

## Business Requirements

- [requirements/README.md](requirements/README.md) — current BR catalogue.

## Skills & Playbooks

- [skills/](skills/README.md) — Claude Code skills tailored to this demo (schema design, formula authoring, migration runs).
- [playbooks/](playbooks/README.md) — step-by-step guides for common tasks (bootstrap a fresh environment, add a new table, ship a balance patch).

## Research

- [research/](research/README.md) — discovery notes, comparisons, design alternatives.
