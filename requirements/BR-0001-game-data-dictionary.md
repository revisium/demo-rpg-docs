# BR-0001: Game data dictionary

## Metadata

| Field | Value |
|---|---|
| Owner | <!-- TODO --> |
| Status | Draft |
| Version | 1 |
| Last updated | 2026-05-08 |

## 1. Context

The game-data dictionary is the heart of the Branching Tales demo. It will be the Revisium project (`revisium/demo-rpg-data`, **planned — not yet bootstrapped on `cloud.revisium.io`**) that holds every world entity — items, monsters, heroes, quests, factions — and feeds both the federated GraphQL API and the frontend companion app. It must showcase **every** Revisium capability that a serious team would care about (FK arrays, files, computed formulas, branching, schema migrations, MCP access).

### Bootstrap dependencies

Acceptance criteria below presume:

1. JSON Schema bodies in [`specs/schemas.md`](../architecture/specs/schemas.md) are filled in (currently only the table catalogue and feature-coverage matrix are concrete; per-table schema bodies are still `TODO`).
2. `revisium/demo-rpg-data` is created on `cloud.revisium.io` from those schemas.
3. `demo-rpg-backend/revisium/schemas/` is materialised from the same source-of-truth specs.

Until step 1 is complete, US-1 and US-2 below are aspirational and the BR is not testable.

## 2. Goals & metrics

### Business goals

- Convince developers in 5 minutes that Revisium can host real game-grade content.
- Showcase every formula primitive (scalar, cross-table, array aggregation, nested-array, conditional, string concat).
- Provide a working seed any team can fork.

### Success metrics

| Metric | Baseline | Target | Measured by |
|---|---|---|---|
| Tables in dictionary | 0 | 15 | Project view in admin |
| Formula primitives demonstrated | 0 | ≥ 12 | [`specs/formulas.md § Coverage matrix`](../architecture/specs/formulas.md#coverage-matrix) |
| File-field patterns demonstrated | 0 | ≥ 6 | [`specs/files.md`](../architecture/specs/files.md) |
| Locales supported per `<LocalizedString>` | 1 | 3 (en, ru, ch) | [`specs/game-design.md § Localization`](../architecture/specs/game-design.md#localization) |
| Demo project loads in <2s for first-time visitor | n/a | <2s | Lighthouse |

## 3. Audience

| Role | Who | Interest |
|---|---|---|
| Primary | Developers evaluating Revisium | "Can it model my domain? Can I trust it?" |
| Secondary | Game-data engineers | "What does live-ops on Revisium look like?" |

## 4. Scope

### In scope

- 15 tables per [`specs/schemas.md`](../architecture/specs/schemas.md).
- All formula primitives per [`specs/formulas.md`](../architecture/specs/formulas.md).
- File fields per [`specs/files.md`](../architecture/specs/files.md).
- One sample balance branch demonstrating `master + balance-patch-1.1`.
- Public read access. Anonymous visitors can explore everything.

### Out of scope

- Player accounts and progress (no user state in this demo).
- Real-time leaderboards.
- Locales beyond `en` / `ru` / `ch` (the trio defined in [`specs/game-design.md § Localization`](../architecture/specs/game-design.md#localization)).

### Assumptions

- Revisium current release supports nested-array formula paths.
- File hosting is part of cloud.revisium.io (no separate CDN needed for the demo).

## 5. User scenarios

### US-1: Developer browses the demo

**As** a developer evaluating Revisium,
**I want** to open the public admin URL and see a populated, well-structured project,
**so that** I can judge whether Revisium fits my domain.

**Acceptance:**

- [ ] Given the demo URL, When the developer opens it, Then 15 dictionary tables are visible with seed data.
- [ ] Given a heroes row, When the developer opens it, Then `total_equipment_modifier` shows the sum across embedded `equipment[*].modifier`.
- [ ] Given a quests row with multiple steps and rewards, When the developer opens it, Then `total_loot_xp` shows the two-level embedded sum across `steps[*].rewards[*].bonus_xp`.
- [ ] Given a factions row, When the developer opens it, Then `ally_count` reflects `count(ally_ids)` on its FK array.

### US-2: Developer forks the schema

**As** a developer who likes the demo,
**I want** to apply the same schemas to my own Revisium project,
**so that** I can iterate from a known baseline.

**Acceptance:**

- [ ] `revisium-cli apply` from `demo-rpg-backend/revisium/schemas/` produces an equivalent project.

## 6. Functional requirements

| Requirement | Priority | Status | Realised by |
|---|---|---|---|
| 15 tables exist with documented schemas | Must | Draft | [`specs/schemas.md`](../architecture/specs/schemas.md) |
| Every formula primitive is exercised | Must | Draft | [`specs/formulas.md`](../architecture/specs/formulas.md) |
| Files demonstrated for portraits, icons, maps, crests | Must | Draft | [`specs/files.md`](../architecture/specs/files.md) |
| Public read access | Must | Draft | Project setting |
| One balance branch for branching demo | Should | Draft | <!-- TODO --> |
| Localisation (en required; ru and ch optional) on user-facing entities | Should | Draft | [`specs/schemas.md § Localized string`](../architecture/specs/schemas.md#localized-string-localizedstring) |

## 7. Business rules and constraints

- All user-facing strings use the inline localized object pattern: `{ en (required), ru, ch }`. See [`specs/game-design.md § Localization`](../architecture/specs/game-design.md#localization) and [`specs/schemas.md § Localized string`](../architecture/specs/schemas.md#localized-string-localizedstring).
- All visual entities must have a file field.
- Aggregation formulas that read a per-element field (`sum`, `avg`, `min`, `max` over `arr[*].field`) must run over **embedded arrays**, not FK arrays — formulas operate on a single row's data and cannot dereference foreign keys. `count()` and `length()` on FK arrays are allowed because they only read the array's length, not the referenced rows. See [`specs/formulas.md § Data-scope rules`](../architecture/specs/formulas.md#data-scope-rules--what-you-can-and-cannot-do).

## 8. Non-functional requirements

| Category | Requirement |
|---|---|
| Performance | First admin-UI load < 2s on broadband |
| Availability | Best-effort (cloud.revisium.io SLA) |
| Security | Public read; no PII; no auth required for browse |
| Audit | Revisium revision history serves as audit trail |

## 9. Open questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Final list of factions and regions for `game-design.md` | | | Open |
| 2 | Whether to include audio file demo | | | Open |
| 3 | AI-generated vs commissioned art for seed | | | Open |
| 4 | Schema bodies in `specs/schemas.md` are still TODO — block on completion before bootstrapping cloud project | | | Open |
| 5 | Order of bootstrap: cloud project first or `demo-rpg-backend/revisium/schemas/` first? Single source-of-truth choice needed | | | Open |

## 10. Related artefacts

- **ADR**: [ADR-0002 Dictionary vs CMS split](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md)
- **Spec**: [game-design.md](../architecture/specs/game-design.md), [schemas.md](../architecture/specs/schemas.md), [formulas.md](../architecture/specs/formulas.md), [files.md](../architecture/specs/files.md)
- **Roadmap**: this is Phase 2.1 of the [Revisium Publicity Plan](https://github.com/revisium) <!-- TODO link to public version -->

## Changelog

### v1 (2026-05-08)

- Initial draft
