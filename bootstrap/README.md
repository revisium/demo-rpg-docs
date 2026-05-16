# Bootstrap

Source-controlled JSON Schemas and seed data for both Revisium projects behind Branching Tales. Anyone can apply these to their own Revisium org and get the full dataset that powers the public demo.

```
bootstrap/
├── README.md                # This file
├── data/                    # demo-rpg-data (game dictionary, 15 tables)
│   ├── schemas/             # JSON Schema per table
│   │   ├── regions.json
│   │   ├── factions.json
│   │   └── …
│   └── seed/                # Seed rows per table — one [{ rowId, data }, …] per file
│       ├── regions.json
│       ├── factions.json
│       └── …
├── cms/                     # demo-rpg-cms (marketing CMS, 5 tables)
│   ├── schemas/
│   └── seed/
└── scripts/
    ├── apply.mjs            # Node script: applies schemas + seed via MCP (works against any host)
    └── apply.sh             # Wrapper that drives apply.mjs
```

## What this gives you

- **15 dictionary tables** in `data/schemas/`: `regions`, `factions`, `item_types`, `stats`, `effects`, `abilities`, `locations`, `classes`, `items`, `npcs`, `monsters`, `heroes`, `parties`, `quests`, `dialogs`.
- **5 CMS tables** in `cms/schemas/`: `blog_authors`, `blog_posts`, `landing_hero`, `landing_features`, `landing_testimonials`.
- **Seed rows** for every table — enough rows to make computed fields show real values and FK lookups resolve.

## Live reference

| Project | URL | State |
|---|---|---|
| `demo-rpg-data` | `https://cloud.revisium.io/revisium/demo-rpg-data` | committed v1; public access pending org-owner approval |
| `demo-rpg-cms` | `https://cloud.revisium.io/revisium/demo-rpg-cms` | committed v1; public |

Once both are public, anyone can browse the schemas and rows in the admin UI without an account.

## Bootstrap from scratch

Two paths — pick whichever matches your habits.

### Path A — Apply via the bootstrap script (works against any Revisium host)

Prerequisite: Node 18+ and a Bearer token for `https://cloud.revisium.io` (or your self-hosted Revisium) exported as `REVISIUM_TOKEN`. The script talks to Revisium's HTTP API directly — no MCP server, IDE, or extra dependencies required.

```bash
export REVISIUM_TOKEN=...
node bootstrap/scripts/apply.mjs --org <your-org> --project demo-rpg-data
node bootstrap/scripts/apply.mjs --org <your-org> --project demo-rpg-cms --source bootstrap/cms
```

The script:

1. Reads `bootstrap/{data,cms}/schemas/*.json` and creates each table in dependency order.
2. Reads `bootstrap/{data,cms}/seed/*.json` and inserts rows in dependency order (children after parents).
3. **Leaves the changes in the draft revision; it does NOT commit.** Open the admin UI on `cloud.revisium.io/<your-org>/<project>` and commit the draft when you're satisfied — that's where the explicit human-in-the-loop step lives.

### Path B — Apply via `revisium-cli`

Prerequisite: [`@revisium/cli`](https://github.com/revisium/revisium-cli) installed (`npm i -g @revisium/cli`) and authenticated.

```bash
# 1. Create the project shell
revisium project create <your-org>/demo-rpg-data

# 2. Apply schemas + seed (cli understands the bootstrap layout)
revisium apply --source bootstrap/data --target <your-org>/demo-rpg-data

# 3. Repeat for the CMS project
revisium project create <your-org>/demo-rpg-cms
revisium apply --source bootstrap/cms --target <your-org>/demo-rpg-cms

# 4. (optional) make both projects publicly readable
revisium project public <your-org>/demo-rpg-data --enable
revisium project public <your-org>/demo-rpg-cms --enable
```

### Path C — Bootstrap with Claude Code

Open this repo in Claude Code with the Revisium MCP configured. Tell the agent:

> Bootstrap a new project from `bootstrap/data/` into `<your-org>/demo-rpg-data`, then commit a "Bootstrap v1" revision.

The agent reads the JSON files, applies them in dependency order, and asks for permission before committing.

## Dependency order

Tables must be created in topological order because of foreign-key constraints. The script handles this automatically; if you apply schemas manually, follow:

```
Tier 0 (no FKs):           regions · item_types · stats · effects · factions
Tier 1 (FKs to Tier 0):    abilities · locations
Tier 2 (FKs to Tier 0/1):  classes · items
Tier 3 (FKs to Tier 0-2):  npcs · monsters · heroes
Tier 4 (FKs to Tier 0-3):  parties · quests · dialogs
```

Seed-row insertion follows the same order: every FK reference must resolve to an already-inserted row.

## Conventions

- Snake_case throughout. FK fields are `<target>_id`, FK arrays `<target>_ids`.
- Localized strings are inline objects: `{ en, ru, zh }`. `en` is required; `ru` (Russian) and `zh` (Chinese, defaults to Simplified) default to `""`. **Validation note:** even though only `en` is in `required`, Revisium's runtime requires `ru` and `zh` to be present (with empty-string default) when seeding rows. The seed files include all three keys.
- File fields use `{ "$ref": "urn:jsonschema:io:revisium:file-schema:1.0.0" }`. Seed rows include an empty file object `{ status, fileId, url, fileName, hash, extension, mimeType, size, width, height }` — uploads happen later via `upload_file`.
- Computed fields use `x-formula: { version: 1, expression: "…" }`. They have `readOnly: true`, a `default`, and are listed in `required`.

See [`../architecture/specs/schemas.md`](../architecture/specs/schemas.md), [`formulas.md`](../architecture/specs/formulas.md), and [`game-design.md`](../architecture/specs/game-design.md) for the human-readable spec.

## Known limitations encountered while bootstrapping

These are real Revisium constraints that influenced the spec:

| Limitation | Impact on the demo |
|---|---|
| Self-referencing foreign keys are not supported | `factions.ally_ids` / `enemy_ids` were dropped from the v1 schema. A follow-up `faction_relationships` junction table will demonstrate M:N self-relations. |
| `max()` and `min()` are scalar functions only — they do **not** accept arrays | `monsters.max_drop_quantity` was dropped from v1. `sum`, `avg`, `count` work on arrays via the `[*]` wildcard. |
| Localized object validation requires every declared locale to be present | Seed rows always include `ru` and `zh` keys (empty-string is fine), even though `required: ["en"]`. |
| `"format": "date-time"` is silently ignored | `blog_posts.published_at` is `string` only; format validation happens in the application layer. |

These are tracked as open questions in the relevant specs and as candidates for a future `faction_relationships` migration.

## Migration plan (live)

| Order | Migration | Status |
|---|---|---|
| 1 | `0001-initial-tables` — all 15 dictionary tables | Applied |
| 2 | `0002-cms-tables` — 5 CMS tables in the separate project | Applied |
| 3 | `0003-data-media-fields` — required `regions.cover_image`, `classes.icon`, `locations.gallery[]`, and `quests.steps[].image` media fields for Admin-uploaded art | Applied in source |
| 4 | `0004-faction-relationships` — junction table for ally/enemy after Revisium ships self-FK or as M:N | Planned |
| 5 | `0005-quest-types` — new lookup table classifying quests | Planned |
| 6 | `balance-patch-1.1` (branch) — tune `items.rarity_multiplier` and `abilities.base_damage` without touching `master` | Planned |

The `bootstrap/` directory is the source of truth for migrations 1–3. Migrations 4 and 5 will land here as additional schema files plus updates to the apply script.
