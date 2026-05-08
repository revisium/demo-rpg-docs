# Business Requirements

**Navigation:** [project passport](../README.md) · [architecture overview](../architecture/overview.md)

Catalogue of business requirements (BR) for the Branching Tales demo. The audience is anyone shaping the *why* of the demo — what it must show, who it must reach, what counts as success.

## Purpose

Forward-looking layer of the demo's intent:

- goals and metrics;
- audience;
- scope;
- user scenarios;
- functional and non-functional requirements;
- acceptance criteria;
- open questions;
- links to ADR and specs.

A BR describes *what the demo must achieve*, not implementation detail.

## Conventions

- **Forward-looking**: BRs describe goals, not the current state of the codebase.
- **File naming**: `BR-NNNN-{kebab-slug}.md` — 4-digit sequential number. Example: `BR-0001-game-data-dictionary.md`.
- **Statuses**: Draft → In review → Approved → In delivery → Done → Superseded.
- **Owner**: every BR has a named owner.
- **Versioning**: large changes → new version with a Changelog entry; small changes → inline edits; full replacement → mark Superseded with a link.
- **Template**: copy [template.md](template.md) when starting a new BR.
- **Open questions**: keep them in a dedicated section inside the BR, not in side comments.

## Related artefacts

| Artefact | Where it lives | When to use |
|---|---|---|
| Architectural decisions | [`../architecture/adr/`](../architecture/adr/README.md) | Record *why* an approach was chosen |
| Technical specifications | [`../architecture/specs/`](../architecture/specs/README.md) | Capture exact schemas, types, contracts |

## Index

| # | Domain | Document | Status | Owner |
|---|---|---|---|---|
| BR-0001 | Game data dictionary | [BR-0001-game-data-dictionary.md](BR-0001-game-data-dictionary.md) | Draft | <!-- TODO --> |
| BR-0002 | Marketing CMS | [BR-0002-marketing-cms.md](BR-0002-marketing-cms.md) | Draft | <!-- TODO --> |
