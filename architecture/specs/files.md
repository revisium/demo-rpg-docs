# File Fields — Branching Tales

> Status: Draft scaffolding. Filled in next session.

Catalogue of every file field in `demo-rpg-data` and `demo-rpg-cms`. Each entry showcases a different file-usage pattern.

## Why files matter for the demo

Revisium file fields are **first-class citizens with stable `fileId` + content `hash` + `fileName` + dimensions**. This makes them reproducible, cacheable, and addressable independently of the row that references them — exactly what an asset pipeline needs.

The demo deliberately uses every common shape: single image, gallery, vector glyph, audio, hero copy media.

## Coverage matrix

| Pattern | Field | Notes |
|---|---|---|
| Region cover image | `regions.cover_image` | Wide atlas/card image, uploaded in Admin UI |
| Class glyph | `classes.icon` | SVG/PNG class glyph for class catalog and hero filters |
| Single PNG portrait | `heroes.portrait`, `npcs.portrait` | Tall aspect ratio, ~512x768 |
| Single PNG illustration | `monsters.image` | Square ~768x768 |
| SVG vector icon | `items.icon`, `abilities.icon` | Sharp at any zoom |
| SVG crest | `factions.crest` | Solid colour, alpha background |
| Map image (large PNG) | `locations.map` | ~1920x1080 |
| Image gallery | `locations.gallery[]` | Required array field with one or more location screenshots/atlas crops by content convention |
| Embedded step image | `quests.steps[].image` | Required file field inside each quest step object |
| Marketing hero (CMS) | `landing_hero.bg_image` | Wide banner, optimised for SSR |
| Avatar (CMS) | `blog_authors.avatar` | Circular, ~256x256 |
| Markdown attachment | `blog_posts.hero_image` | OG-image for posts |

## File field shape

A file field is declared in JSON Schema as:

```json
{
  "$ref": "urn:jsonschema:io:revisium:file-schema:1.0.0"
}
```

A persisted file value carries the following keys (per `FileValueKeys` enum in `revisium-core/src/features/plugin/file/file-value.store.ts`):

| Key | Type | Notes |
|---|---|---|
| `status` | string | `uploading` / `uploaded` (see `FileStatus`) |
| `fileId` | string | Stable identifier (nanoid). Unique within a row |
| `url` | string | Public URL, derived from `hash` at read time |
| `fileName` | string | Original filename |
| `hash` | string | Content hash (`object-hash` over the buffer). Cache key |
| `extension` | string | File extension without the dot |
| `mimeType` | string | MIME type from upload |
| `size` | number | Bytes |
| `width` | number | Pixels (image only, else `0`) |
| `height` | number | Pixels (image only, else `0`) |

`hash` is the canonical content fingerprint — there is no separate `contentHash` field.

## Files in detail

<!-- TODO per field:
- expected dimensions
- recommended format
- where it appears in the UI / queries
- whether it is required
- example file
-->

## Asset pipeline for the demo

<!-- TODO:
- Where art is stored (initial seed)
- How it's uploaded (revisium-cli upload, or admin UI)
- Licence note (CC0 or commissioned)
-->

## Open questions

| # | Question | Status |
|---|---|---|
| 1 | Use AI-generated art (Midjourney) or commission seed art | Open |
| 2 | Whether to include audio (battle theme) to demo non-image file types | Open |
