# BR-0002: Marketing CMS

## Metadata

| Field | Value |
|---|---|
| Owner | <!-- TODO --> |
| Status | Draft |
| Version | 1 |
| Last updated | 2026-05-17 |

## 1. Context

The marketing CMS (`revisium/demo-rpg-cms`) holds all editorial content surrounding the demo: landing copy, blog posts, hero sections, testimonials. It is intentionally separated from the game-data dictionary so that visitors see Revisium handling **two unrelated content domains** in the same demo.

## 2. Goals & metrics

### Business goals

- Show Revisium working as a headless CMS for a real landing site.
- Show that two Revisium projects can coexist with independent editorial cadences.
- Provide a copyable pattern for landing-content modelling.

### Success metrics

| Metric | Baseline | Target | Measured by |
|---|---|---|---|
| Landing tables | 0 | 5 | Project view |
| Markdown content support exercised | no | yes | `blog_posts.body` |
| File support exercised in CMS context | no | yes | `landing_hero.bg_image`, `blog_authors.avatar`, `blog_posts.hero_image` |

## 3. Audience

| Role | Who | Interest |
|---|---|---|
| Primary | Frontend developers | "Can I use Revisium for my landing/blog?" |
| Secondary | Editorial / marketing | "Does the admin UI work for non-developers?" |

## 4. Scope

### In scope

- 5 tables: `landing_hero`, `landing_features`, `landing_testimonials`, `blog_posts`, `blog_authors`.
- Markdown content with hero image and SEO metadata in `blog_posts`.
- Federated under Apollo Router as a subgraph alongside `demo-rpg-data` and `demo-rpg-backend` (see [ADR-0001](../architecture/adr/ADR-0001-federation-with-revisium-cloud.md), [ADR-0002](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md)). Supergraph composed by [`revisium/supergraph-builder`](https://github.com/revisium/supergraph-builder).

### Out of scope

- Editorial workflow UI beyond what Revisium admin already provides.
- Multi-author permissions.

### Assumptions

- Frontend is React Router v7 SSR + MobX + `graphql-request`; CMS reads go
  through Apollo Router as part of the federated graph.

## 5. User scenarios

### US-1: Editor publishes a blog post

**As** an editor,
**I want** to draft a blog post in `demo-rpg-cms`, attach a hero image, and publish it,
**so that** the landing site picks it up via Apollo Router on the next render.

**Acceptance:**

- [ ] Given an unpublished post, When the editor commits the draft to head, Then the next SSR fetch through Apollo Router returns the post.

### US-2: Visitor reads the blog

**As** a visitor,
**I want** to load a blog post under 1.5s,
**so that** the demo feels production-grade.

**Acceptance:**

- [ ] Given a published post, When the visitor opens its URL, Then it renders SSR within 1.5s on broadband.

## 6. Functional requirements

| Requirement | Priority | Status | Realised by |
|---|---|---|---|
| 5 CMS tables with documented schemas | Must | Done | [`specs/schemas.md`](../architecture/specs/schemas.md) |
| Markdown content type | Must | Done | `blog_posts.body` |
| File fields for hero images and avatars | Must | Done | [`specs/files.md`](../architecture/specs/files.md) |
| CMS federated under Apollo Router as a subgraph | Must | Done | [ADR-0001](../architecture/adr/ADR-0001-federation-with-revisium-cloud.md), [ADR-0002](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md) |
| Public read access | Must | Done | Project setting |

## 7. Business rules and constraints

- CMS tables never reference game-data tables. The split is hard.
- Every blog post has a hero image and SEO metadata.

## 8. Non-functional requirements

| Category | Requirement |
|---|---|
| Performance | Blog post SSR < 1.5s |
| Availability | Best-effort |
| Security | Public read; no PII |
| Audit | Revisium revision history |

## 9. Open questions

| # | Question | Owner | Due | Status |
|---|---|---|---|---|
| 1 | Whether to demo Revisium webhook → SSR cache invalidation in Apollo Router | | | Open |
| 2 | Number of seed blog posts | | | Open |

## 10. Related artefacts

- **ADR**: [ADR-0002 Dictionary vs CMS split](../architecture/adr/ADR-0002-dictionary-vs-cms-split.md)
- **Spec**: [schemas.md](../architecture/specs/schemas.md), [files.md](../architecture/specs/files.md)

## Changelog

### v1 (2026-05-08)

- Initial draft
