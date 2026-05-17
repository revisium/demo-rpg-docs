# Prompt For The Next Demo

Copy this into a new session when starting another Revisium demo. Replace the
placeholders before running it.

```text
You are setting up a new Revisium demo using demo-rpg as the reference.

Reference repos:
- docs: <path-to-demo-rpg-docs>
- backend: <path-to-demo-rpg-backend>
- frontend: <path-to-demo-rpg-frontend>
- infrastructure: <path-to-infrastructure>

Target repos:
- docs: <path-to-new-demo-docs>
- backend: <path-to-new-demo-backend>
- frontend: <path-to-new-demo-frontend>
- infrastructure: <path-to-target-infrastructure>

Target demo:
- Name: <name>
- Audience: <audience>
- Product promise: <one sentence>
- Main entities: <entities>
- Revisium capabilities to prove: <capabilities>

Goal:
Create a minimal docs-first baseline for the new demo. Keep the docs repo small.
Do not copy Branching Tales RPG content unless the target demo is also an RPG.

Use these boundaries:
- docs repo owns the public passport, public architecture summary, product
  story, bootstrap snapshot, and this reusable prompt;
- backend repo owns full schemas, migrations, OpenAPI, generated clients,
  backend runtime behavior, MCP, REST, GraphQL, and tests;
- frontend repo owns exact routes, page specs, layout, implementation status,
  frontend architecture, and review gates;
- infrastructure repo owns deployment, secrets, Helm values, Argo CD apps, and
  cluster runbooks.

Inspect first:
- demo-rpg-docs/README.md
- demo-rpg-docs/architecture.md
- demo-rpg-docs/product.md
- demo-rpg-docs/bootstrap/README.md
- demo-rpg-backend/AGENTS.md
- demo-rpg-backend/README.md
- demo-rpg-frontend/AGENTS.md
- demo-rpg-frontend/REVIEW.md
- demo-rpg-frontend/docs/README.md
- demo-rpg-frontend/docs/product/

Deliver in the target docs repo:
1. README.md - 1-2 page project passport and source-of-truth boundaries.
2. AGENTS.md - short agent rules that prevent duplicate docs trees.
3. architecture.md - one public diagram and component boundary table.
4. product.md - visitor story, proof map, route scope, and explainer evidence.
5. bootstrap/README.md - how the portable seed snapshot is used.
6. PROMPT.md - adapted copy of this prompt.

Do not create operations, requirements, ADR, research, skills, or long playbook
folders unless the user explicitly asks for the heavier structure.

After editing:
- run available checks;
- search for copied old demo names;
- search for stale references to deleted folders;
- summarize changed files and the next implementation milestone.
```
