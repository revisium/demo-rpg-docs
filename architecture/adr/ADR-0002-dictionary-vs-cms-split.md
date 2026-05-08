# ADR-0002: Two cloud projects — dictionary vs CMS

| Field | Value |
|---|---|
| Status | Proposed |
| Date | 2026-05-08 |
| Owner | <!-- TODO --> |

## Context

<!-- Branching Tales needs two distinct content surfaces:
1. Game dictionary — items, monsters, quests, factions. Stable schemas, infrequent edits, used by both BE and FE, joined at the API layer.
2. Marketing content — landing copy, blog posts, hero sections. Iterates often, owned by a different audience, never joined with game data.

Combining both in one Revisium project mixes editorial cadences and inflates schema noise for visitors browsing the demo. -->

## Decision

<!-- Run two cloud.revisium.io projects:
- demo-rpg-data — game dictionary, federated via Apollo Router as a subgraph.
- demo-rpg-cms — marketing content, consumed directly by demo-rpg-frontend (SSR/ISR), NOT federated.

Different release cadences, different default branches if needed, different role assignments later. -->

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

### Negative

- <!-- Two projects to set up, document, and keep in sync re. visual design. -->

### Neutral

- <!-- Both publicly readable in the demo. -->

## Implementation Notes

<!-- TODO: bootstrap script that creates both projects via revisium-cli, applies seed schemas, applies seed data. -->

## References

- Related: [ADR-0001](./ADR-0001-federation-with-revisium-cloud.md)
- Spec: [game-design.md](../specs/game-design.md)
