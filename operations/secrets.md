# Secrets

Public secret inventory for Branching Tales. Values, Kubernetes Secret names,
and rotation commands belong in `revisium/infrastructure`; this file only
documents what classes of secrets exist and which surface uses them.

## Principles

- Never commit secret values.
- Keep `.env.example` files synchronized with runtime docs in the owning repo.
- Public-read Revisium data/CMS endpoints do not require browser-visible tokens.
- Write credentials are used only by migration/bootstrap jobs or trusted
  backend/server contexts.

## Registry

| Secret class | Used by | Purpose | Canonical owner |
|---|---|---|---|
| Revisium API key/token | backend migration job, bootstrap automation | Apply schema/data changes to Revisium projects | `demo-rpg-backend` + infrastructure |
| Backend database URL | backend runtime and migrations | Store backend-owned runtime state | `demo-rpg-backend` + infrastructure |
| Backend JWT/OAuth secrets | backend runtime | Auth, sessions, OAuth/MCP flows | `demo-rpg-backend` + infrastructure |
| Container registry credentials | CI/CD and cluster image pulls | Publish and deploy images | infrastructure |
| External provider credentials | future integrations only | Optional demo extensions | owning repo + infrastructure |

## Rotation

Rotation procedures are environment-specific. Public docs should state the
affected secret class and owner; private runbooks in `revisium/infrastructure`
should hold exact commands and secret names.
