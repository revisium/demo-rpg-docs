# Playbooks

**Navigation:** [project passport](../README.md) · [skills](../skills/README.md) · [operations](../operations/README.md)

Step-by-step guides for common contributor tasks on the Branching Tales demo.

## Purpose

Playbooks are explicit, ordered instructions. A new contributor or AI agent should be able to follow one end-to-end without prior context. They sit alongside [skills](../skills/README.md): a skill teaches *how to think*, a playbook teaches *what to do*.

## Conventions

- File naming: `{kebab-slug}.md`.
- Each playbook starts with: prerequisites, expected outcome, estimated time.
- Steps are numbered. Side-quests and rollback live in dedicated sections at the bottom.

## Index

| Playbook | Outcome | Time |
|---|---|---|
| <!-- TODO bootstrap-fresh-environment --> | A fresh demo running locally end-to-end | ~30 min |
| <!-- TODO add-new-table --> | A new table in `demo-rpg-data` with schema, sample data, frontend wiring | ~45 min |
| <!-- TODO ship-balance-patch --> | A balance change shipped via Revisium branching | ~20 min |
| <!-- TODO add-claude-skill --> | A new skill registered in `skills/` and discoverable | ~15 min |

## Related

- [skills/](../skills/README.md) — Claude Code skills used inside playbooks.
- [operations/deploy.md](../operations/deploy.md) — formal deploy procedures (reference, not how-to).
