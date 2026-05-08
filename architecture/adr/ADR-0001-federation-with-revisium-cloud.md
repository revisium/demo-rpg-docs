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

<!-- Use Apollo Router (federation v2) with two subgraphs:
- demo-rpg-backend (NestJS, Yoga federation v2) — business logic, auth, computed fields not expressible in Revisium formulas.
- demo-rpg-data (cloud.revisium.io) — game dictionary; SDL exposed by Revisium's GraphQL endpoint with @key directives.

The marketing CMS (demo-rpg-cms) is consumed directly by the frontend, NOT federated, because its content is shaped for SSR/ISR and does not need to join with game data. -->

## Alternatives Considered

### Alternative A: BFF proxy

<!-- demo-rpg-backend wraps Revisium client and exposes a single GraphQL schema. Rejected: hides Revisium, makes the demo less honest about how Revisium plugs in. -->

### Alternative B: Direct frontend → Revisium GraphQL

<!-- Frontend talks to cloud.revisium.io directly. Rejected: cannot show federation, cannot showcase NestJS subgraph patterns DevRel audience expects. -->

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

<!-- TODO: Apollo Router config snippet, supergraph composition pipeline, links to demo-rpg-backend wiring. -->

## References

- Related spec: [federation-v1.spec.md](../specs/federation-v1.spec.md) <!-- TODO -->
- Apollo Router: https://www.apollographql.com/docs/router
- Revisium GraphQL: https://docs.revisium.io
