# Bootstrap A New Revisium Demo Project

## Prerequisites

- Access to this reference workspace:
  - `demo-rpg-docs`
  - `demo-rpg-backend`
  - `demo-rpg-frontend`
  - `revisium/infrastructure`
- A target demo idea with a working name, audience, and primary domain.
- Empty or existing target repositories for docs, backend, frontend, and
  infrastructure wiring.

## Expected Outcome

A new demo project gets the same operating model as Branching Tales without
copying RPG-specific content:

- a short docs/passport repo with clear source-of-truth boundaries;
- product requirements, ADRs, schema intent, capability coverage, messaging,
  and bootstrap data owned by the docs repo;
- backend runtime docs, generated Revisium artifacts, and agent rules owned by
  the backend repo;
- frontend page contracts, UX specs, architecture rules, review gates, and
  agent workflows owned by the frontend repo;
- real deployment details owned by infrastructure, with only sanitized public
  summaries in docs.

Estimated time: 1-2 focused sessions for the documentation baseline before
implementation begins.

## What To Reuse

Reuse the structure and contracts, not the Branching Tales domain:

- `demo-rpg-docs/README.md#source-of-truth-boundaries`
- `demo-rpg-docs/AGENTS.md`
- `demo-rpg-docs/architecture/`
- `demo-rpg-docs/requirements/`
- `demo-rpg-docs/bootstrap/`
- `demo-rpg-docs/products/branching-tales/`
- `demo-rpg-docs/operations/`
- `demo-rpg-backend/AGENTS.md`
- `demo-rpg-backend/README.md`
- `demo-rpg-backend/docs/`
- `demo-rpg-frontend/AGENTS.md`
- `demo-rpg-frontend/REVIEW.md`
- `demo-rpg-frontend/docs/`
- `demo-rpg-frontend/.agents/`

## What To Replace

- Demo name, audience, product promise, route map, and domain entities.
- Revisium project names, table names, schema fields, and seed data.
- Backend service names, generated client package names, API URLs, and env vars.
- Frontend routes, GraphQL operations, page descriptors, design language, and
  image rules.
- Deployment hosts, namespaces, secret names, Argo CD app names, and chart
  paths.
- Any page status or implementation contract that belongs in a target
  implementation repo.

## Source-Of-Truth Boundary Template

Use this table in the target docs repo and adapt repo/path names before any
implementation work starts.

| Area | Canonical repo/path | Other repos may contain |
|---|---|---|
| Project identity, goals, public architecture, ADRs, and BRs | `<demo>-docs/` | Links and short summaries |
| Domain design and data/CMS schema intent | `<demo>-docs/architecture/specs/` | Applied/generated artifacts |
| Portable Revisium seed snapshot | `<demo>-docs/bootstrap/` | References to the bootstrap workflow |
| Applied Revisium migrations, OpenAPI, and backend data client | `<demo>-backend/revisium/`, `<demo>-backend/src/__generated__/.../` | Links to the artifact and regeneration command |
| Frontend route behavior, page specs, layout, and implementation status | `<demo>-frontend/docs/product/` | Product-level route scope and capability links |
| Frontend architecture, review gates, and agent workflows | `<demo>-frontend/docs/`, `<demo>-frontend/REVIEW.md`, `<demo>-frontend/.agents/` | Links only |
| Backend runtime patterns, review gates, and agent rules | `<demo>-backend/AGENTS.md`, `<demo>-backend/REVIEW.md`, `<demo>-backend/docs/` | Links only |
| Deployment manifests, real environment values, and cluster operations | `revisium/infrastructure` or target infra repo | Public summaries with no secrets |
| Public operations overview and sanitized runbooks | `<demo>-docs/operations/` | Links to private infrastructure details where needed |

## One-Prompt Bootstrap

Copy this prompt into a fresh target project session. Fill placeholders first.

```text
You are setting up a new Revisium demo project using Branching Tales as the
reference operating model.

Reference repo paths:
- docs: <path-to-demo-rpg-docs>
- backend: <path-to-demo-rpg-backend>
- frontend: <path-to-demo-rpg-frontend>
- infrastructure: <path-to-revisium-infrastructure>

Target repo paths:
- docs: <path-to-new-demo-docs>
- backend: <path-to-new-demo-backend>
- frontend: <path-to-new-demo-frontend>
- infrastructure: <path-to-target-infrastructure>

Target demo:
- Name: <demo-name>
- Audience: <primary-users>
- Product promise: <one-sentence-demo-promise>
- Domain entities: <main-entities>
- Revisium capabilities to showcase: <capabilities>
- Required API surfaces: <REST/GraphQL/MCP/federation>

Goal:
Create a docs-first demo baseline that can be handed to implementation agents.
Reuse the Branching Tales source-of-truth boundaries, architecture shape, review
rules, and handoff style. Do not copy RPG content unless the new demo is also
an RPG.

First inspect these reference files:
- demo-rpg-docs/README.md
- demo-rpg-docs/AGENTS.md
- demo-rpg-docs/architecture/overview.md
- demo-rpg-docs/architecture/adr/
- demo-rpg-docs/architecture/specs/
- demo-rpg-docs/requirements/
- demo-rpg-docs/bootstrap/README.md
- demo-rpg-docs/products/branching-tales/
- demo-rpg-docs/operations/
- demo-rpg-backend/AGENTS.md
- demo-rpg-backend/README.md
- demo-rpg-backend/docs/
- demo-rpg-frontend/AGENTS.md
- demo-rpg-frontend/REVIEW.md
- demo-rpg-frontend/docs/README.md
- demo-rpg-frontend/docs/handoff/bootstrap-new-frontend-project.md
- demo-rpg-frontend/docs/product/
- demo-rpg-frontend/docs/architecture/frontend.md
- demo-rpg-frontend/docs/review/frontend-checklist.md
- demo-rpg-frontend/.agents/

Then inspect the target repos and preserve any existing compatible patterns.
If a target repo already has working commands, coding style, deployment model,
or agent rules, adapt the Branching Tales contracts instead of replacing them.

Deliverables in the target docs repo:
1. README.md as the project passport with service URLs, repositories,
   source-of-truth boundaries, architecture summary, and current next steps.
2. AGENTS.md that boots agents into the docs repo and points to implementation
   repo ownership boundaries.
3. architecture/overview.md with current component boundaries and runtime
   flows.
4. architecture/adr/ with the first federation/data-split decisions.
5. architecture/specs/ with domain schema intent and reusable conventions.
6. requirements/ with BRs for data, CMS/content, and frontend showcase scope.
7. bootstrap/README.md for portable Revisium seed data and migration handoff.
8. products/<product>/ with product-level route scope, capability coverage,
   messaging, and explainer/evidence contracts only.
9. operations/ with sanitized public deployment overview, deploy summary,
   runbook, and secret classes.
10. playbooks/ with this bootstrap prompt adapted to the new demo.

Deliverables in the target backend repo:
1. AGENTS.md and optional CLAUDE.md symlink for cross-agent boot rules.
2. README.md describing backend role, Revisium integration, local setup, and
   runtime commands.
3. docs/ for dictionary/Revisium integration, deployment contract, MCP/API
   additions, and environment setup.
4. REVIEW.md or equivalent backend review gate if the repo does not have one.
5. Generated Revisium artifacts owned by the backend repo once schema is
   applied: migrations, OpenAPI, generated client, and regeneration commands.

Deliverables in the target frontend repo:
1. AGENTS.md, REVIEW.md, AI-review bot config, and repo-local agent skills.
2. docs/README.md with reading order and source-of-truth rules.
3. docs/product/page-inventory.md and docs/product/pages/_template.md.
4. docs/product/site-map.md, page-patterns, explainer/evidence widget contract,
   and first page specs.
5. docs/architecture/frontend.md adapted to the target stack while preserving
   docs-first contracts, ViewModel/data-source separation, typed GraphQL, and
   review gates.
6. docs/handoff/README.md and a first implementation task list.

Architecture requirements to preserve:
- Docs repo owns product identity, ADRs, BRs, schema intent, capability
  coverage, messaging, and portable bootstrap data.
- Backend repo owns runtime behavior, generated Revisium artifacts, backend
  docs, and backend verification gates.
- Frontend repo owns exact route behavior, page specs, implementation status,
  frontend architecture, review gates, and agent workflows.
- Infrastructure owns real manifests, namespaces, secret names, Argo CD apps,
  and cluster operations.
- Public docs may summarize operations but must not duplicate private
  deployment truth or secrets.
- Do not create duplicate per-page implementation specs in the docs repo when
  the frontend repo owns them.
- Every cross-boundary change updates the canonical owner first and leaves
  other repos as pointers.

Before editing:
1. Print the target source-of-truth boundary table.
2. List target repos and which deliverables will be created in each.
3. Identify any existing files that should be preserved.

After editing:
1. Run available markdown and repo verification checks.
2. Search for copied Branching Tales names that should have been replaced.
3. Search for stale placeholders such as TODO, planned, pending, and once
   bootstrapped; keep only intentional future-scope entries.
4. Summarize changed files, remaining gaps, and the next implementation
   milestone.
```

## Review Checklist

- [ ] The target docs repo has one explicit boundary table.
- [ ] Implementation repos link back to that boundary table.
- [ ] Product-level scope is not duplicated as frontend implementation status.
- [ ] Frontend page specs are in the frontend repo.
- [ ] Backend migrations/OpenAPI/generated clients are in the backend repo.
- [ ] Operations docs do not expose real secret names or private values.
- [ ] The prompt contains no Branching Tales domain nouns unless intentionally
      retained.
- [ ] Verification commands and skipped checks are reported in the handoff.
