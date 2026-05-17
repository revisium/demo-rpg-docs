# Runtime Flows

**Navigation:** [project passport](../../README.md) · [overview](../overview.md) · [ADR](../adr/README.md) · [specs](../specs/README.md)

Catalogue of runtime sequences for Branching Tales. Each flow is a `sequenceDiagram` showing how a user action traverses the system.

## Index

| Flow | Description | Status |
|---|---|---|
| [overview.md § Visitor Reads Game Data](../overview.md#visitor-reads-game-data) | Catalog/detail read path through Apollo Router | Current |
| [overview.md § Visitor Reads CMS Content](../overview.md#visitor-reads-cms-content) | SSR/content read path through Apollo Router and `demo-rpg-cms` | Current |
| Balance patch preview | `head` vs `draft` revision toggle and diff call | Planned |
| AI agent MCP query | MCP access to demo data/backend tools | Planned |
| [schema-reconciliation.md](./schema-reconciliation.md) | Schema reconciliation: `revisium/supergraph-builder` polls subgraphs, composes supergraph, Apollo Router curl sidecar refetches and hot-reloads | Current |

## When to add a flow here

Per [AGENTS.md](../../AGENTS.md): inline up to 4 flows in [`overview.md`](../overview.md). Once a 5th flow appears or any flow exceeds ~30 lines of mermaid, move it to its own file in this directory.

## Naming

- File: `{flow-slug}.md`
- Title: `# Runtime Flow — {Concise Action}`
