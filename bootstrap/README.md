# Bootstrap

This folder is a portable seed snapshot for fresh Revisium projects.

It is not the runtime source of truth for the live backend. The running backend
owns applied migrations, OpenAPI, and generated clients in `demo-rpg-backend`.

## Contents

- `data/schemas/`: JSON schemas for the game dictionary project.
- `data/seed/`: seed rows for the game dictionary project.
- `cms/schemas/`: JSON schemas for the CMS project.
- `cms/seed/`: seed rows for the CMS project.
- `scripts/apply.mjs`: applies the snapshot to another Revisium org.

Current shape:

- `demo-rpg-data`: 15 game dictionary tables.
- `demo-rpg-cms`: 5 editorial/home tables.

For full schema and migration truth, use `demo-rpg-backend/revisium/`.

## Apply To Another Org

```bash
export REVISIUM_TOKEN=...
node bootstrap/scripts/apply.mjs --org <your-org> --project demo-rpg-data
node bootstrap/scripts/apply.mjs \
  --org <your-org> \
  --project demo-rpg-cms \
  --source bootstrap/cms
```

The script leaves changes in draft. Commit the Revisium revision manually after
reviewing the result.

## Live Reference

| Project | URL |
| --- | --- |
| `demo-rpg-data` | <https://cloud.revisium.io/revisium/demo-rpg-data> |
| `demo-rpg-cms` | <https://cloud.revisium.io/revisium/demo-rpg-cms> |

Both projects are public-read for the demo.
