# Runtime Flows

**Navigation:** [project passport](../../README.md) · [overview](../overview.md) · [ADR](../adr/README.md) · [specs](../specs/README.md)

Catalogue of runtime sequences for Branching Tales. Each flow is a `sequenceDiagram` showing how a user action traverses the system.

## Index

| Flow | Description | Status |
|---|---|---|
| <!-- TODO --> | Visitor browses heroes (read path through Apollo Router) | Planned |
| <!-- TODO --> | Visitor reads a blog post (SSR via Apollo Router → `demo-rpg-cms` subgraph) | Planned |
| <!-- TODO --> | Editor ships a balance patch via Revisium branching | Planned |
| <!-- TODO --> | AI agent queries `demo-rpg-data` over MCP | Planned |
| <!-- TODO --> | CI pipeline composes supergraph with `revisium/supergraph-builder` | Planned |

## When to add a flow here

Per [CLAUDE.md](../../CLAUDE.md): inline up to 4 flows in [`overview.md`](../overview.md). Once a 5th flow appears or any flow exceeds ~30 lines of mermaid, move it to its own file in this directory.

## Naming

- File: `{flow-slug}.md`
- Title: `# Runtime Flow — {Concise Action}`
