# AGENTS.md

Instructions for AI coding agents (Claude Code, Cursor, Codex, Copilot, Gemini, etc.) working in `demo-rpg-docs`. `CLAUDE.md` is a symlink to this file so Claude Code's default loader still works.

## Repository purpose

`demo-rpg-docs` is the **source of truth** for the Branching Tales demo: project passport, architecture, decisions, business requirements, skills, and playbooks. When implementing anything in `demo-rpg-backend` or `demo-rpg-frontend`, **check this repo first** for the relevant ADR, spec, or BR.

This is a public DevRel artefact. Documentation is written in **English**, neutral tone, optimised for developers evaluating Revisium.

## Repository layout

```
demo-rpg-docs/
├── README.md                # Project passport
├── AGENTS.md                # This file (cross-tool agent instructions)
├── CLAUDE.md                # Symlink → AGENTS.md (Claude Code compatibility)
├── architecture/
│   ├── README.md
│   ├── overview.md          # Connected architecture story
│   ├── adr/                 # ADR-NNNN-{slug}.md + index
│   ├── specs/               # Game design, schemas, formulas, files
│   └── runtime-flows/       # Sequence diagrams (federation, queries)
├── operations/
│   ├── README.md
│   ├── overview.md
│   ├── deploy.md
│   ├── runbook.md
│   └── secrets.md
├── requirements/            # BR-NNNN-{slug}.md + template + index
├── products/                # Per-product UX/UI docs (mirrors revisium-ux/products/*)
│   └── branching-tales/     # demo-rpg-frontend page inventory, coverage matrix, per-page docs
├── research/                # Discovery, alternatives, comparisons
├── skills/                  # Claude Code skills for the demo
├── playbooks/               # Step-by-step task guides
└── bootstrap/               # Applied JSON schemas + seed + apply script
    ├── README.md
    ├── data/                # demo-rpg-data: 15 tables (schemas/, seed/, order.json)
    ├── cms/                 # demo-rpg-cms:  5 tables (schemas/, seed/, order.json)
    └── scripts/             # apply.mjs + apply.sh
```

## Indices — sources of truth

| Index | Contains | Update rule |
|---|---|---|
| [`architecture/adr/README.md`](architecture/adr/README.md) | All ADRs | After every new ADR — row in table |
| [`architecture/specs/README.md`](architecture/specs/README.md) | All specs with statuses | When a spec is created or versioned |
| [`architecture/runtime-flows/README.md`](architecture/runtime-flows/README.md) | All runtime flows | When a new flow is added |
| [`operations/README.md`](operations/README.md) | All operations docs | When a new doc is added |
| [`requirements/README.md`](requirements/README.md) | All BRs | After every new BR |
| [`products/branching-tales/README.md`](products/branching-tales/README.md) | Frontend UX/UI docs entry + page index | When a new page doc or product/UX artefact is added |
| [`skills/README.md`](skills/README.md) | All skills | When a new skill is added |
| [`playbooks/README.md`](playbooks/README.md) | All playbooks | When a new playbook is added |
| [`README.md`](README.md) | Project passport | When repos / environments / owners change |

**Do not duplicate indices.** Subfolder READMEs link to indices; they do not restate them.

## Checklists for changes

When creating an **ADR**:
- [ ] File from [`architecture/adr/template.md`](architecture/adr/template.md)
- [ ] Row in [`architecture/adr/README.md`](architecture/adr/README.md)
- [ ] Link from [`architecture/overview.md`](architecture/overview.md) if the decision shapes the top-level architecture

When creating a **spec**:
- [ ] File in `architecture/specs/`, named `{component}-v{N}.spec.md` or `{topic}.md` for evergreen specs
- [ ] Row in [`architecture/specs/README.md`](architecture/specs/README.md)
- [ ] Cross-link with related ADR

When creating a **BR**:
- [ ] File from [`requirements/template.md`](requirements/template.md)
- [ ] Row in [`requirements/README.md`](requirements/README.md)
- [ ] Cross-link with related ADR / spec

When creating a **runtime flow**:
- [ ] Inline in [`architecture/overview.md`](architecture/overview.md) if ≤ 4 flows total
- [ ] Otherwise standalone file in `architecture/runtime-flows/` with row in the index

When creating a **skill** or **playbook**:
- [ ] File in `skills/` or `playbooks/`
- [ ] Row in the corresponding index README
- [ ] Cross-link from any related spec or ADR

When creating a **product/UX page doc** (under `products/branching-tales/pages/`):
- [ ] Follow the [`revisium-ux/products/admin/pages/*`](https://github.com/revisium/revisium-ux/tree/master/products/admin/pages) shape: `Route`, `Status`, `Purpose`, `Context And Entry`, `Functional Blocks`, `Primary Actions`, `States`, `Transitions`
- [ ] Add a `Revisium features demonstrated` block listing the matrix rows the page realises
- [ ] Add a row to [`products/branching-tales/page-inventory.md`](products/branching-tales/page-inventory.md) (once that index exists)
- [ ] Cross-link with [`products/branching-tales/revisium-feature-coverage.md`](products/branching-tales/revisium-feature-coverage.md) and any related BR / spec

## Demo-specific conventions

- **Game name:** Branching Tales. Codename: `demo-rpg`.
- **Cloud projects:** [`revisium/demo-rpg-data`](https://cloud.revisium.io/revisium/demo-rpg-data) (game dictionary, 15 tables) and [`revisium/demo-rpg-cms`](https://cloud.revisium.io/revisium/demo-rpg-cms) (marketing content). Both bootstrapped and public-read. Migrations live in `demo-rpg-backend/revisium/migrations.json` and are re-applied by the K8s migrations-Job on every deploy via [`revisium-cli`](https://github.com/revisium/revisium-cli).
- **Tone:** explanatory but compact. Every doc should help an unfamiliar developer evaluate Revisium quickly.
- **No secrets in repo.** Local `.env.example` files only.
- **Mermaid diagrams** for all architecture and runtime flows. Use `flowchart TB` with the elk renderer for component diagrams; `sequenceDiagram` for flows.

## Related repositories

- **[demo-rpg-backend](https://github.com/revisium/demo-rpg-backend)** — NestJS subgraph + business logic. Deployed to `demo-rpg-backend.dev.revisium.io`. Reads `demo-rpg-data` via an `@hey-api/openapi-ts`-generated REST client; serves a Yoga Federation v2 GraphQL subgraph, REST (Swagger), and MCP.
- **[demo-rpg-frontend](https://github.com/revisium/demo-rpg-frontend)** — React Router v7 SSR + MobX (MVVM) + `graphql-request` (typed via `graphql-codegen`) + Feature-Sliced Design (Steiger). Deployed to [demo-rpg.dev.revisium.io](https://demo-rpg.dev.revisium.io); `/graphql` is co-located under the frontend's ingress so the browser talks to the supergraph same-origin.
- **[revisium/infrastructure](https://github.com/revisium/infrastructure)** — Helm charts + ArgoCD wiring for the dev stand under `development/demo/{backend,frontend,router,supergraph-builder}`.
- **[revisium/supergraph-builder](https://github.com/revisium/supergraph-builder)** — long-running service that periodically polls SDL from `demo-rpg-backend`, `demo-rpg-data`, and `demo-rpg-cms`, composes the supergraph, and serves it at an HTTP endpoint. Apollo Router fetches the composed schema with a curl sidecar and hot-reloads on change. Not a CI tool.
- **[revisium-cli](https://github.com/revisium/revisium-cli)** — applies migrations + bootstraps endpoints; runs both locally (via `npm run revisium:bootstrap` against `@revisium/standalone`) and in the K8s migrations-Job.

Schemas + sample data + migrations live inside [`demo-rpg-backend/revisium/`](https://github.com/revisium/demo-rpg-backend/tree/master/revisium), mirrored from the source-of-truth specs in [`architecture/specs/`](architecture/specs/README.md).
