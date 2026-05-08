# Formulas — Branching Tales

> Status: Draft scaffolding. Concrete formula bodies added in next session.

Catalogue of every computed field in `demo-rpg-data`. Each entry covers a Revisium formula capability that should be demonstrated.

## Coverage matrix

All formula paths use the **canonical FK-array column names** from [`schemas.md`](./schemas.md) (e.g. `heroIds`, `inventoryItemIds`, `objectiveIds`). Aliasing is not assumed.

| Capability | Formula(s) | Table.field |
|---|---|---|
| Scalar arithmetic | `baseValue * rarityMultiplier` | `items.marketValue` |
| Level scaling | `baseDamage + (level * damageScaling)` | `abilities.damageAtLevel` |
| Cross-table reference (single FK) | `class.baseHp + (level * class.hpPerLevel) + (constitution * 2)` | `heroes.totalHp` |
| Cross-table aggregation (FK array) | `SUM(inventoryItemIds[*].damageBonus)` | `heroes.totalDamage` |
| Aggregation: SUM (FK array) | `SUM(heroIds[*].gold)` | `parties.totalGold` |
| Aggregation: AVG (FK array) | `AVG(heroIds[*].power)` | `parties.partyPower` |
| Aggregation: MAX (FK array) | `MAX(heroIds[*].level)` | `parties.maxLevel` |
| Aggregation: SUM (FK array, scalar field) | `SUM(objectiveIds[*].xp)` | `quests.totalXp` |
| Nested-array path (two levels) | `SUM(objectiveIds[*].rewardItemIds[*].xp)` | `quests.totalLoot` |
| Conditional | `IF rarity == "legendary" THEN "epic" ELSE "common"` | `items.rarityTag` |
| String concat | `class.name + " " + name` | `heroes.fullTitle` |
| Boolean derived | `level >= 10` | `heroes.isVeteran` |
| Counter | `LENGTH(allyIds)` | `factions.allyCount` |

## Formulas in detail

### `items.marketValue`

<!-- TODO: full expression, example inputs/outputs, edge cases (zero rarity, missing baseValue). -->

### `abilities.damageAtLevel`

<!-- TODO -->

### `heroes.totalHp` — cross-table

<!-- TODO. Highlight: pulls baseHp + hpPerLevel from referenced class via FK. Demonstrates relative-path expressions like `class.baseHp`. -->

### `heroes.totalDamage` — FK-array aggregation

<!-- TODO. Highlight: aggregates damageBonus across the items referenced by `inventoryItemIds`. Path uses the FK column directly: `inventoryItemIds[*].damageBonus`. -->

### `parties.partyPower` — AVG over FK array

<!-- TODO. Highlight: AVG over `heroIds[*].power` where `heroIds` is the FK array on `parties`. -->

### `parties.totalGold` — SUM over FK array

<!-- TODO. Highlight: SUM over `heroIds[*].gold`. -->

### `parties.maxLevel` — MAX over FK array

<!-- TODO. Highlight: MAX over `heroIds[*].level`. -->

### `quests.totalXp` — SUM over FK array (one level)

<!-- TODO. Highlight: SUM over `objectiveIds[*].xp`. The simpler aggregation; companion to `totalLoot`. -->

### `quests.totalLoot` — nested-array path (two levels)

<!-- TODO. Highlight: SUM over `objectiveIds[*].rewardItemIds[*].xp` — two levels of FK-array traversal. Companion to `totalXp`. -->


### `items.rarityTag` — conditional

<!-- TODO. Highlight: IF / THEN / ELSE expression returning a string. -->

### `heroes.fullTitle` — string concat

<!-- TODO. Highlight: cross-table read (class.name) + literal + own field. -->

### `heroes.isVeteran` — boolean derived

<!-- TODO -->

### `factions.allyCount` — counter

<!-- TODO. Highlight: LENGTH() on an FK array. -->

## Performance notes

<!-- TODO: which formulas are evaluated on read vs write, caching considerations, what happens on FK invalidation. -->

## Open questions

| # | Question | Status |
|---|---|---|
| 1 | Final formula syntax for nested-array paths in current Revisium release | Open |
| 2 | Whether AVG of an empty array returns 0 or NULL | Open |
