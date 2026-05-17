# demo-rpg - Branching Tales

Branching Tales is a public RPG codex demo for Revisium.

Visitors browse game content first: regions, heroes, items, monsters, quests,
guides, and search. The technical proof is visible through the Explainer Widget:
the page query, response sample, source rows, and API surfaces.

## Live Surfaces

| Surface | URL |
| --- | --- |
| Frontend | <https://demo-rpg.dev.revisium.io> |
| Apollo Router | <https://demo-rpg-router.dev.revisium.io/graphql> |
| Backend | <https://demo-rpg-backend.dev.revisium.io> |
| Game data | <https://cloud.revisium.io/revisium/demo-rpg-data> |
| CMS | <https://cloud.revisium.io/revisium/demo-rpg-cms> |

## What This Repo Owns

This repo is the lightweight public passport for the demo. It owns only:

- this project summary;
- [architecture.md](architecture.md) - public component boundaries;
- [product.md](product.md) - visitor story and Revisium proof map;
- [bootstrap/](bootstrap/README.md) - copyable seed snapshot;
- [PROMPT.md](PROMPT.md) - prompt for starting the next demo.

It does not own implementation contracts.

## Source Of Truth Boundaries

- Project identity and public summary: `demo-rpg-docs/README.md`.
- Public architecture summary: `demo-rpg-docs/architecture.md`.
- Product story and capability proof map: `demo-rpg-docs/product.md`.
- Portable seed snapshot: `demo-rpg-docs/bootstrap/`.
- Applied migrations, OpenAPI, generated clients, and full schemas:
  `demo-rpg-backend/revisium/` plus the generated backend client.
- Backend runtime behavior, MCP, REST, GraphQL, and tests:
  `demo-rpg-backend/`.
- Frontend routes, page specs, layout, and implementation status:
  `demo-rpg-frontend/docs/product/`.
- Frontend architecture and review gates:
  `demo-rpg-frontend/docs/`, `REVIEW.md`, and `.agents/`.
- Deployment, secrets, Argo CD, Helm values, and cluster runbooks:
  `revisium/infrastructure`.

When a change crosses a boundary, update the canonical owner first. This repo
should link to implementation truth instead of copying it.

## Repositories

- `demo-rpg-docs`: public passport, product story, bootstrap prompt.
- `demo-rpg-backend`: NestJS subgraph, generated Revisium client, runtime API.
- `demo-rpg-frontend`: SSR codex frontend and page implementation contracts.
- `revisium/infrastructure`: real deployment wiring.
- `revisium/supergraph-builder`: polls subgraph SDL and serves the composed
  supergraph.

## Short Architecture

```text
browser
  -> demo-rpg-frontend
  -> Apollo Router
  -> demo-rpg-backend
  -> demo-rpg-data / demo-rpg-cms on Revisium Cloud
```

The browser talks to same-origin `/graphql` through the frontend host. Apollo
Router federates one NestJS subgraph with two Revisium Cloud subgraphs.
`supergraph-builder` keeps the composed schema fresh by polling subgraph SDL.

See [architecture.md](architecture.md) for the public version. Use
`revisium/infrastructure` for real deployment details.

## Product

The demo should feel like a real game database before it feels like a DevRel
page. Revisium proof appears through source links and the Explainer Widget, not
as the first visual layer.

See [product.md](product.md).

## Bootstrap

`bootstrap/` contains portable JSON schemas, seed rows, and an apply script for
fresh Revisium projects.

Runtime migrations and generated artifacts are backend-owned. Use
`demo-rpg-backend/revisium/` when working on the running application.

## Next Demo

Use [PROMPT.md](PROMPT.md) as the copyable prompt for starting another demo with
the same boundaries but a different domain.
