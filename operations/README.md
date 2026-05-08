# Operations

**Navigation:** [project passport](../README.md) · [architecture overview](../architecture/overview.md)

Operations documentation for the Branching Tales demo: how it is deployed, how it is run, what is on call (nothing — it is a demo, but the docs follow real conventions).

## Contents

| Document | Purpose |
|---|---|
| [overview.md](./overview.md) | How everything is deployed: hosting, environments, CI/CD, observability |
| [deploy.md](./deploy.md) | Procedures: bootstrap a fresh environment, ship a change, rollback |
| [runbook.md](./runbook.md) | Reactive procedures: restart, regenerate supergraph, recover from a bad migration |
| [secrets.md](./secrets.md) | Secrets registry and rotation |

## Related

- [README.md](../README.md) — project passport: status, environments, repositories
- [architecture/overview.md](../architecture/overview.md) — components, runtime flows, cross-cutting concerns
- [playbooks/](../playbooks/README.md) — step-by-step task guides oriented at new contributors
