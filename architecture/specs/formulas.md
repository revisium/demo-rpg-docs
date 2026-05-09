# Formulas — Branching Tales

> Status: Spec for v1. All expressions below are valid `@revisium/formula` v1 syntax and have been chosen to fit within the engine's data-scope rules.

**Navigation:** [project passport](../../README.md) · [overview](../overview.md) · [game design](./game-design.md) · [schemas](./schemas.md) · [files](./files.md)

## Engine reference

Computed fields are powered by [`@revisium/formula`](https://github.com/revisium/formula). The full grammar lives in that repo's [`SPEC.md`](https://github.com/revisium/formula/blob/master/SPEC.md). Highlights relevant to this demo:

- Functions are **lowercase**: `sum`, `avg`, `count`, `max`, `min`, `if`, `concat`, `length`, `round`, `floor`, `ceil`, etc.
- Conditional uses **`if(condition, value_if_true, value_if_false)`** — not `IF/THEN/ELSE`.
- Comparison: `==`, `!=`, `>`, `<`, `>=`, `<=`.
- Logical: `&&`, `||`, `!`.
- Path syntax for embedded arrays: `arr[*].field`. Also `arr[0]`, `arr[-1]`.
- Path syntax for nested paths: `obj.field`, `obj.field.subfield`.
- Path syntax for parent / root: `../field` (parent scope), `/field` (root). Used inside array-item formulas.

### Schema syntax

A computed field is declared with the `x-formula` extension keyword:

```json
{
  "type": "<return_type>",
  "x-formula": {
    "version": 1,
    "expression": "<formula_string>"
  }
}
```

`type` is the formula's inferred return type. The field has no stored value — it is recomputed on every read.

## Data-scope rules — what you CAN and CANNOT do

The formula engine evaluates an expression against the **single row's data**. This shapes every choice in the catalogue below.

### What works

- ✅ Reference any field on the same row, including nested objects (`title.en`, `coordinates.x`).
- ✅ Reference any embedded array of objects (`steps[*].xp`, `equipment[*].modifier`, `drops[*].chance`).
- ✅ Two levels of embedded array traversal (`steps[*].rewards[*].bonus_xp`).
- ✅ Aggregate functions on embedded arrays: `sum`, `avg`, `min`, `max`, `count`.
- ✅ `count` and `length` on FK arrays (the array elements are strings — counting them does not require dereferencing).
- ✅ String concatenation across same-row fields, including locale subfields (`concat(title.en, " ", name.en)`).
- ✅ Conditionals with arbitrary nesting (`if(cond1, a, if(cond2, b, c))`).

### What does NOT work

- ❌ **Cross-table FK dereferencing.** The expression cannot read fields from a referenced row. `class.base_hp`, `inventory_item_ids[*].damage_bonus`, `hero_ids[*].power` — these are **not** valid against the engine. FK arrays carry strings (the IDs), not the referenced objects.
- ❌ Anything requiring a database lookup mid-evaluation. The data scope is pre-loaded.

This constraint shapes the demo: aggregation formulas live on **embedded arrays**, while FK arrays are demonstrated through `count` only. Cross-table reads (e.g. "compute hero total HP using class data") happen in the application layer (`demo-rpg-backend`), not in Revisium formulas.

## Coverage matrix

Twelve formulas across nine tables. Every Revisium-supported formula primitive is exercised at least once.

| # | Capability | Formula | Field |
|---|---|---|---|
| 1 | Scalar arithmetic | `base_value * rarity_multiplier` | `items.market_value` |
| 2 | Nested conditional | `if(rarity == "legendary", "epic-tier", if(rarity == "epic", "high-tier", "common-tier"))` | `items.rarity_tag` |
| 3 | Boolean derived | `level >= 10` | `heroes.is_veteran` |
| 4 | Counter on FK array | `count(ally_ids)` | `factions.ally_count` |
| 5 | Counter on FK array | `count(enemy_ids)` | `factions.enemy_count` |
| 6 | Counter on FK array | `count(hero_ids)` | `parties.member_count` |
| 7 | Counter + comparison | `count(hero_ids) >= 4` | `parties.is_full` |
| 8 | Embedded array SUM | `sum(equipment[*].modifier)` | `heroes.total_equipment_modifier` |
| 9 | Embedded array SUM | `sum(steps[*].xp)` | `quests.total_xp` |
| 10 | **Nested embedded SUM (two levels)** | `sum(steps[*].rewards[*].bonus_xp)` | `quests.total_loot_xp` |
| 11 | Embedded array AVG | `avg(drops[*].chance)` | `monsters.avg_drop_chance` |
| 12 | Embedded array MAX | `max(drops[*].quantity_max)` | `monsters.max_drop_quantity` |
| 13 | Embedded array length | `count(drops)` | `monsters.drop_count` |
| 14 | Embedded array length | `count(equipment)` | `heroes.equipped_count` |
| 15 | Embedded array length | `count(steps)` | `quests.step_count` |
| 16 | Embedded array length | `count(lines)` | `dialogs.line_count` |
| 17 | String concat across locale fields | `concat(title.en, " ", name.en)` | `npcs.display_label_en` |
| 18 | String concat across locale fields | `concat(name.en, " ", epithet.en)` | `heroes.display_name_en` |

## Formulas in detail

Each entry shows the schema declaration, the inputs, and a worked example.

### 1. `items.market_value` — scalar arithmetic

```json
"market_value": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "base_value * rarity_multiplier" }
}
```

**Behaviour.** Multiplies two same-row numeric fields.

**Example.** A row with `base_value: 50` and `rarity_multiplier: 2.5` yields `market_value: 125`.

**Edge cases.** If either input is missing, defaults (`0`) propagate and the result is `0`.

---

### 2. `items.rarity_tag` — nested conditional

```json
"rarity_tag": {
  "type": "string",
  "x-formula": {
    "version": 1,
    "expression": "if(rarity == \"legendary\", \"epic-tier\", if(rarity == \"epic\", \"high-tier\", \"common-tier\"))"
  }
}
```

**Behaviour.** Maps the `rarity` enum to a coarser tier label, demonstrating nested `if(...)`.

**Example.** `rarity: "legendary"` → `"epic-tier"`. `rarity: "rare"` → `"common-tier"`.

**Note.** `if` is a function, not a statement. Both branches are evaluated to the same return type (`string` here).

---

### 3. `heroes.is_veteran` — boolean derived

```json
"is_veteran": {
  "type": "boolean",
  "x-formula": { "version": 1, "expression": "level >= 10" }
}
```

**Behaviour.** True when the hero has reached level 10.

**Example.** `level: 12` → `true`. `level: 9` → `false`.

---

### 4. `factions.ally_count` — counter on FK array

```json
"ally_count": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "count(ally_ids)" }
}
```

**Behaviour.** Returns the length of the FK array. Notably, `count` does **not** dereference each FK — it reads the array of strings directly, so this works on FK arrays just as well as on embedded arrays.

**Example.** `ally_ids: ["faction-stoneward", "faction-whisperwood"]` → `2`.

`enemy_count` is the symmetric formula on `enemy_ids`.

---

### 5. `parties.member_count` and `parties.is_full`

```json
"member_count": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "count(hero_ids)" }
},
"is_full": {
  "type": "boolean",
  "x-formula": { "version": 1, "expression": "count(hero_ids) >= 4" }
}
```

**Behaviour.** Same `count` mechanic as `ally_count`, plus a comparison. Captures a common UX flag ("party at capacity").

**Example.** `hero_ids` of length 3 → `member_count: 3`, `is_full: false`. Length 4 → `is_full: true`.

---

### 6. `heroes.total_equipment_modifier` — embedded array SUM

```json
"equipment": {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["slot", "item_id", "modifier"],
    "properties": {
      "slot": {
        "type": "string",
        "default": "main_hand",
        "enum": ["head", "chest", "legs", "hands", "feet", "main_hand", "off_hand", "ranged"]
      },
      "item_id": { "type": "string", "default": "", "foreignKey": "items" },
      "modifier": { "type": "number", "default": 0 }
    },
    "additionalProperties": false
  }
},
"total_equipment_modifier": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "sum(equipment[*].modifier)" }
}
```

**Behaviour.** Sums the `modifier` of every equipped slot. Each `equipment[*].item_id` is an FK to `items`, but the formula does **not** read `items` — it sums a numeric field that lives on the embedded object itself (the per-slot modifier comes from the gear assignment, not from the item).

**Example.** Equipment of `[ { slot: "main_hand", modifier: 5 }, { slot: "chest", modifier: 3 } ]` → `8`.

**Why an embedded array rather than an FK array.** Aggregation across an FK array would require dereferencing each ID — see the data-scope rules. Holding the per-slot modifier on the embedded object keeps the data flat enough for the formula engine.

---

### 7. `quests.total_xp` — embedded array SUM (one level)

```json
"total_xp": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "sum(steps[*].xp)" }
}
```

**Behaviour.** Sums the `xp` value across every step of the quest.

**Example.** `steps: [ { xp: 50 }, { xp: 75 }, { xp: 100 } ]` → `225`.

---

### 8. `quests.total_loot_xp` — nested embedded SUM (two levels)

```json
"total_loot_xp": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "sum(steps[*].rewards[*].bonus_xp)" }
}
```

**Behaviour.** Traverses two levels of embedded arrays: each step has a `rewards[]`, each reward has a `bonus_xp`. Sums all bonus_xp values across all rewards across all steps.

**Example.** `steps: [ { rewards: [ { bonus_xp: 10 }, { bonus_xp: 20 } ] }, { rewards: [ { bonus_xp: 5 } ] } ]` → `35`.

This is the **showpiece** formula for the demo: the deepest nested aggregation Revisium supports out of the box.

---

### 9. `monsters.avg_drop_chance` — embedded array AVG

```json
"avg_drop_chance": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "avg(drops[*].chance)" }
}
```

**Behaviour.** Averages the drop chance across all entries in the drop table.

**Example.** `drops: [ { chance: 0.6 }, { chance: 0.3 }, { chance: 0.9 } ]` → `0.6`.

**Edge case.** `avg([])` on an empty array — confirm against engine before relying on either `0` or `null`. See open questions.

---

### 10. `monsters.max_drop_quantity` — embedded array MAX

```json
"max_drop_quantity": {
  "type": "number",
  "x-formula": { "version": 1, "expression": "max(drops[*].quantity_max)" }
}
```

**Behaviour.** Returns the largest `quantity_max` across all entries.

**Example.** `drops: [ { quantity_max: 1 }, { quantity_max: 5 }, { quantity_max: 3 } ]` → `5`.

`min(...)` could be added analogously for `min_drop_quantity`; not currently in scope.

---

### 11. Embedded array length — multiple fields

```json
"drop_count": { "type": "number", "x-formula": { "version": 1, "expression": "count(drops)" } },
"equipped_count": { "type": "number", "x-formula": { "version": 1, "expression": "count(equipment)" } },
"step_count": { "type": "number", "x-formula": { "version": 1, "expression": "count(steps)" } },
"line_count": { "type": "number", "x-formula": { "version": 1, "expression": "count(lines)" } }
```

**Behaviour.** `count(arr)` on an embedded array of objects returns the number of elements. Same as `length(arr)` for arrays.

---

### 12. `npcs.display_label_en` and `heroes.display_name_en` — string concat

```json
"display_label_en": {
  "type": "string",
  "x-formula": { "version": 1, "expression": "concat(title.en, \" \", name.en)" }
}
```

```json
"display_name_en": {
  "type": "string",
  "x-formula": { "version": 1, "expression": "concat(name.en, \" \", epithet.en)" }
}
```

**Behaviour.** Concatenates two locale-specific subfields with a space separator. Demonstrates:

- string concatenation via `concat(...)`,
- nested-path access into a locale object,
- explicit locale selection (the demo picks `en` because the formula engine concatenates one specific string per evaluation; per-locale display is a frontend concern).

**Example.** `title: { en: "Captain" }`, `name: { en: "Aelric" }` → `"Captain Aelric"`.

**Why locale-specific.** The engine cannot conditionally pick a locale at evaluation time without a known locale parameter. The simplest, most honest demo is to compute one canonical English label; the frontend renders the appropriate locale from the underlying `title` and `name` objects directly when needed.

## Evaluation order

`@revisium/formula` builds a dependency graph from the `x-formula` expressions in a row's schema and evaluates in topological order. Within a row:

- Leaf fields (no formula) are read directly.
- Computed fields whose dependencies are leaves evaluate next.
- Computed fields that depend on other computed fields evaluate last.

Within Branching Tales:

- `factions.ally_count` and `factions.enemy_count` depend only on FK arrays. Evaluate immediately.
- `parties.is_full` depends on `count(hero_ids)`, computed inline. Evaluate immediately.
- `monsters.avg_drop_chance` and `max_drop_quantity` depend only on the embedded `drops`. Evaluate immediately.
- All other formulas depend only on leaf fields.

No formula in the catalogue depends on another `x-formula` field, so evaluation is single-pass. This is intentional — keeps the demo readable and avoids circular-dependency edge cases.

## Failure modes

| Mode | What the engine does |
|---|---|
| Required input missing (e.g. `base_value` undefined) | Schema default (`0`) fills in; formula evaluates against the default. |
| Empty embedded array (`steps: []`) | `count` returns `0`; `sum` returns `0`; `avg` behaviour is open question 1. |
| FK array contains a stale ID | Irrelevant for `count` (just counts strings). FK validation is a separate concern, not the formula engine's. |
| Locale subfield missing (`title.ru` empty) | The formula reads the empty string; concat produces something like `" Aelric"`. The frontend should prefer locale fallback before display, not rely on the formula. |
| Wrong type passed to a function | Engine raises a validation error; the row read returns `null` for that field with `formulaErrors` populated (per `revisium-core` API). |

## Branching demo

The `balance-patch-1.1` branch keeps the same schemas and formula expressions but tunes input values:

- `items.rarity_multiplier` for `legendary` items lowered from `10.0` to `8.0` → recomputed `market_value` is lower without touching the formula expression.
- `abilities.base_damage` for `Fireball` lowered from `40` to `35` → if any embedded structure summed Fireball-related damage, it would reflect immediately.

This shows the Revisium branching workflow without any code change.

## Open questions

| # | Question | Status |
|---|---|---|
| 1 | Empty-array semantics for `avg([])` — does it return `0` or `null`? Confirm against `@revisium/formula` SPEC | Open |
| 2 | Whether `monsters.drop_count == 0` should propagate as a `null` flag for "boss with no loot" | Open |
| 3 | Locale fallback: should there be `display_label_ru` / `display_label_ch` formulas mirroring the `en` form, or is one English canonical label enough for the demo? | Open |
| 4 | Whether to add an `if`-based formula combining FK array length with another field (e.g. `parties.formation_label = if(count(hero_ids) >= 4, "Full Party", "Open Party")`) | Open |
| 5 | Whether we should document a deliberately failing formula (e.g. `total_inventory_value = sum(inventory_item_ids[*].base_value)` — invalid because of FK dereferencing) as a teaching moment in the docs | Open |
