# ADR-0001: Federation with Revisium Cloud as a subgraph

| Field | Value |
|---|---|
| Status | Proposed |
| Date | 2026-05-08 |
| Owner | <!-- TODO --> |

## Context

<!-- Why federate? Demo needs to show three things at once:
1. Revisium GraphQL is good enough to be a subgraph in a real Apollo Router topology.
2. Game data lives in Revisium, business logic lives in NestJS — they should compose at the gateway.
3. Frontend asks one endpoint, gets typed schema-stitched results.

Alternative considered: BFF that proxies Revisium internally. Rejected because it hides Revisium and defeats the demo. -->

## Decision

<!-- Use Apollo Router (federation v2) with three subgraphs:
- demo-rpg-backend (NestJS, Yoga federation v2) — business logic, auth, computed fields not expressible in Revisium formulas.
- demo-rpg-data (cloud.revisium.io) — game dictionary; SDL exposed by Revisium's GraphQL endpoint with @key directives.
- demo-rpg-cms (cloud.revisium.io) — marketing content; SDL exposed by Revisium's GraphQL endpoint.

The supergraph schema is composed by `revisium/supergraph-builder`, which runs as a **long-running service** (not a CI step):

- Each subgraph URL is supplied as an env var (e.g. `SUBGRAPH_DEMO_RPG_DATA=...`).
- The builder polls every subgraph's GraphQL endpoint at a configurable interval (`POLL_INTERVAL_S`) and runs federation composition.
- The composed supergraph is served at an HTTP endpoint (e.g. `/supergraph/branching-tales`).
- Apollo Router runs a curl sidecar that polls that endpoint at its own interval, writes the schema to a shared volume, and the router hot-reloads.

Net effect: schema changes propagate to the running router within one polling interval without CI, image rebuilds, or restarts.

The CMS is federated rather than consumed directly by the frontend because:
1. The whole demo argues "use Revisium as a federated subgraph" — a direct path for one of the projects undermines the message.
2. Editorial entities can join with game-data entities later (e.g. "blog posts about specific quests") without re-architecting.
3. A single API endpoint for the frontend simplifies caching, auth, and observability stories. -->

## Alternatives Considered

### Alternative A: BFF proxy

<!-- demo-rpg-backend wraps Revisium client and exposes a single GraphQL schema. Rejected: hides Revisium, makes the demo less honest about how Revisium plugs in. -->

### Alternative B: Direct frontend → Revisium GraphQL

<!-- Frontend talks to cloud.revisium.io directly. Rejected: cannot show federation, cannot showcase NestJS subgraph patterns DevRel audience expects. -->

### Alternative C: Federate `demo-rpg-data`, consume `demo-rpg-cms` directly

<!-- Two API paths: federation for game data, direct for CMS. Rejected: weaker demo narrative, two cache stories, and prevents future joins between editorial content and game entities. -->

## Consequences

### Positive

- <!-- Realistic federation topology developers can copy. -->
- <!-- Showcases Revisium SDL / @key / @external usage. -->
- <!-- Each subgraph is independently deployable. -->

### Negative

- <!-- More moving parts. Apollo Router config to maintain. -->
- <!-- Schema composition errors if subgraphs drift. -->

### Neutral

- <!-- Apollo Router is open source; demo can self-host or use Apollo GraphOS. -->

## Implementation Notes

<!-- TODO:
- Apollo Router config snippet (router.yaml).
- supergraph-builder env-var wiring: one SUBGRAPH_* per subgraph, POLL_INTERVAL_S.
- Apollo Router curl sidecar definition (initContainer + sidecar loop), shared emptyDir volume mounted at /app, supergraph file path APOLLO_ROUTER_SUPERGRAPH_PATH.
- demo-rpg-backend Yoga federation v2 wiring.
-->

## References

- Related spec: [federation-v1.spec.md](../specs/federation-v1.spec.md) <!-- TODO -->
- Apollo Router: https://www.apollographql.com/docs/router
- Revisium GraphQL: https://docs.revisium.io
- Supergraph builder: https://github.com/revisium/supergraph-builder
