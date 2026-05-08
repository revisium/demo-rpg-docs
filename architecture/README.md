# Architecture

The architecture layer of `demo-rpg-docs`. Connected overview, decisions, technical specifications, and runtime scenarios.

**Navigation:** [project passport](../README.md) · [operations](../operations/README.md) · [requirements](../requirements/README.md)

## Contents

| Document / Directory | Purpose |
|---|---|
| [overview.md](./overview.md) | Connected story: principles, context, components, runtime flows, cross-cutting concerns |
| [adr/](./adr/README.md) | Architecture Decision Records — **why** decisions were made (source of truth for ADRs) |
| [specs/](./specs/README.md) | Technical specifications — **what** is implemented (source of truth for specs) |
| [runtime-flows/](./runtime-flows/README.md) | Catalogue of runtime scenarios (sequence diagrams: federation, queries, mutations) |

## How to make changes

1. **Decisions** → new ADR in `adr/` from [template](./adr/template.md), update [`adr/README.md`](./adr/README.md)
2. **Detailed specifications** → new spec in `specs/`, update [`specs/README.md`](./specs/README.md)
3. **Runtime scenarios** → if > 4 flows total, move to `runtime-flows/`; otherwise inline in [overview.md](./overview.md)
4. **Cross-link** — every ADR references the spec it implements; every flow references the relevant ADR + spec.

See [CLAUDE.md](../CLAUDE.md) for AI agent instructions.
