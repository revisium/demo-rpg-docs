# Technical Specifications

**Navigation:** [project passport](../../README.md) · [overview](../overview.md) · [ADR](../adr/README.md) · [runtime flows](../runtime-flows/README.md)

This directory contains detailed technical specifications for Branching Tales.

## What is a spec?

A spec is a detailed technical document defining the exact structure, types, validation rules, and behaviour of a system component. Specs are versioned and can evolve independently of ADRs.

## Index

| Spec | Description | Status |
|---|---|---|
| [game-design.md](./game-design.md) | World, factions, mechanics, lore for Branching Tales | Draft |
| [schemas.md](./schemas.md) | All 15 tables with full JSON Schema, FK graph, file fields | Draft |
| [formulas.md](./formulas.md) | Every computed-field formula with relative-path examples | Draft |
| [files.md](./files.md) | File-field usage patterns: portraits, icons, maps, crests | Draft |

## Naming convention

- Evergreen specs (game design, schema catalogue): `{topic}.md`.
- Versioned component specs: `{component}-v{N}.spec.md` (matches ved/getapi convention). Example: `federation-v1.spec.md`.
- Bump the version when the document's structure changes; keep older versions for reference.

## Versioning

- **Create a new version** when the schema or contract changes.
- **Update the existing version** for typos, clarifications, examples.
- **Mark old versions deprecated**, do not delete.
