# Skills

**Navigation:** [project passport](../README.md) · [playbooks](../playbooks/README.md) · [AGENTS.md](../AGENTS.md)

Claude Code skills tailored to the Branching Tales demo. A skill is an instruction bundle (YAML frontmatter + body) that teaches an AI agent a focused capability — schema design, formula authoring, migration runs, and so on.

## Purpose

The demo is intentionally AI-friendly. Skills here let visitors point Claude Code at this repo and get high-quality help on day one: drafting a new table, adding a computed field, designing a localization pattern, generating seed data.

## Skill format

Each skill is a single Markdown file with YAML frontmatter:

```markdown
---
name: skill-name
description: One-line description used by Claude to decide relevance.
---

# Skill body

…step-by-step instructions, examples, conventions…
```

See the [Claude Code Skills docs](https://docs.claude.com/) for the full specification.

## Conventions

- File naming: `{kebab-slug}.md`.
- Skills are scoped to *this demo*. General-purpose skills belong in a public skills repo.
- Each skill links to the spec it operates on.

## Index

| Skill | Purpose | Operates on |
|---|---|---|
| <!-- TODO design-revisium-table --> | Draft a new table with idiomatic JSON Schema, FKs, computed fields | [`specs/schemas.md`](../architecture/specs/schemas.md) |
| <!-- TODO author-formula --> | Build a computed-field formula and verify it locally | [`specs/formulas.md`](../architecture/specs/formulas.md) |
| <!-- TODO run-migration --> | Apply a schema migration via revisium-cli | [`operations/deploy.md`](../operations/deploy.md) |
| <!-- TODO seed-data --> | Generate idiomatic seed data for a new table | [`specs/schemas.md`](../architecture/specs/schemas.md) |

## Related

- [playbooks/](../playbooks/README.md) — step-by-step task guides (less abstract than skills).
- [AGENTS.md](../AGENTS.md) — repo-level AI agent instructions.
