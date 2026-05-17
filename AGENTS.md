# AGENTS.md

Instructions for agents working in `demo-rpg-docs`.

This repo is intentionally small. Keep it as a public demo passport, not as a
second backend/frontend/infrastructure docs tree.

## Read First

1. [README.md](README.md) - project summary and source-of-truth boundaries.
2. [product.md](product.md) - visitor story and capability proof map.
3. [architecture.md](architecture.md) - public component boundaries.
4. [bootstrap/README.md](bootstrap/README.md) - portable seed snapshot.
5. [PROMPT.md](PROMPT.md) - reusable prompt for the next demo.

## Ownership Rules

- Full schemas, migrations, OpenAPI, and generated clients live in
  `demo-rpg-backend`.
- Exact routes, page specs, layout, responsive rules, and implementation status
  live in `demo-rpg-frontend/docs/product`.
- Real deployment, secrets, Helm values, Argo CD apps, and runbooks live in
  `revisium/infrastructure`.
- This repo may summarize those areas, but must not duplicate their contracts.

Do not recreate `operations/`, `requirements/`, `architecture/specs/`,
`architecture/adr/`, `skills/`, `research/`, or long playbook trees here unless
the user explicitly asks for that heavier structure again.

## Writing Rules

- Write in English.
- Prefer one short page over many nested pages.
- Link to canonical implementation repos instead of copying details.
- Keep demo copy product-facing: RPG codex first, Revisium proof second.
- No secret names, secret values, cluster commands, or private operational
  details.
- If a document grows beyond a few screens, cut it or move the detailed contract
  to the owning implementation repo.

## Verification

Before handoff:

```bash
git diff --check
rg -n "operations/|requirements/|products/branching-tales" . \
  -g '*.md' -g '!AGENTS.md'
rg -n "architecture/specs|architecture/adr|BR-000|ADR-" . \
  -g '*.md' -g '!AGENTS.md'
```

The second command should return no stale links.
