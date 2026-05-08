# ADR-0002: Two cloud projects — dictionary vs CMS

| Field | Value |
|---|---|
| Status | Proposed |
| Date | 2026-05-08 |
| Owner | <!-- TODO --> |

## Context

<!-- Branching Tales needs two distinct content surfaces:
1. Game dictionary — items, monsters, quests, factions. Stable schemas, infrequent edits, joined heavily at the API layer.
2. Marketing content — landing copy, blog posts, hero sections. Iterates often, owned by a different audience, occasionally cross-references game entities (e.g. blog posts about specific quests).

Combining both in one Revisium project mixes editorial cadences, makes per-project access policies harder, and inflates schema noise for visitors browsing the demo. Splitting into two projects keeps each project legible and lets each evolve independently. -->

## Decision

<!-- Run two cloud.revisium.io projects, both federated under Apollo Router as subgraphs:
- demo-rpg-data — game dictionary subgraph.
- demo-rpg-cms — marketing content subgraph.

Both are composed into the supergraph by `revisium/supergraph-builder` together with `demo-rpg-backend`. Different release cadences, different default branches if needed, different role assignments later — but a single API surface for the frontend.

The split is about content domain, not API path. Federation is consistent across all subgraphs (see ADR-0001). -->

## Alternatives Considered

### Alternative A: Single project, multiple tables grouped by namespace

<!-- One project with prefixes (`game_*`, `cms_*`). Rejected: pollutes schema browser, mixes audiences, no path to differing branch strategies. -->

### Alternative B: Three projects (game, cms, user state)

<!-- Add a third project for runtime user state (favourites, scores). Rejected for now: out of scope for read-only demo. May revisit if interactive features are added. -->

## Consequences

### Positive

- <!-- Each project tells a clean story to demo visitors. -->
- <!-- Independent branching strategies (e.g. balance branches on data, copy branches on cms). -->
- <!-- Different access policies if needed. -->
- <!-- Cross-domain joins remain possible via federation (e.g. blog post → quest). -->
- <!-- Single API endpoint for the frontend; no fork in the data-fetching story. -->

### Negative

- <!-- Two projects to set up, document, and keep in sync re. visual design. -->
- <!-- Composition errors at the supergraph layer if subgraph SDLs drift. Mitigated by supergraph-builder running in CI. -->

### Neutral

- <!-- Both publicly readable in the demo. -->

## Implementation Notes

<!-- TODO: bootstrap script that creates both projects via revisium-cli, applies seed schemas, applies seed data. -->

## References

- Related: [ADR-0001](./ADR-0001-federation-with-revisium-cloud.md)
- Spec: [game-design.md](../specs/game-design.md)
