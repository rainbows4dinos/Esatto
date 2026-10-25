# Drift audit

Produce a complete ledger before any code changes. The audit inventories both sides, matches them, and classifies every difference. For Figma hygiene detail, use `lr-figma-inspection`'s checklist if it is installed; the same read-only rules apply here.

## 1. Inventory Figma

Read the library file, not a consuming file. Library variables and styles are only fully readable in the file that defines them.

Record counts and identifiers for each category:

- **Variable collections**: name, ID, modes, and every variable with type, scopes, alias target, and value per mode.
- **Text styles**: `figma.getLocalTextStylesAsync()` through a read-only `use_figma` call. Variable reads do not return these.
- **Effect styles**: `figma.getLocalEffectStylesAsync()`.
- **Paint styles**: `figma.getLocalPaintStylesAsync()`, including gradients.
- **Components and component sets** on the library pages: name, component key, node ID, variant axes, properties, and nested instances.

If a read paginates or truncates, keep reading until the count is complete. A partial read is never treated as the full inventory.

Read mechanics are in "Reading Figma" in [conventions.md](conventions.md). For the sync specifically: aliases are what the code should mirror, so record the target name; and record the read date and the code commit, since Figma does not expose last-modified.

`scripts/figma/read-inventory.js` does this: set its `CATEGORY` (and `PAGE_IDS` for components), run it once per category, and merge each result into the inventory file. A recent `figma-baseline.json` from `lr-figma-inspection` uses the same format and can seed the inventory; re-read any category it left out or that changed since. Save the result to `design-sync/figma-inventory.json`. Later runs diff against it, and the comparison in step 4 runs on it.

## 2. Inventory code

- Token files: CSS custom properties, Tailwind or other theme config, JSON or TS token modules. Note the naming pattern, units (px or rem), and how modes are switched. Note which mode is the code default; it may not be Figma's default mode.
- Deliberate subsets. Code often carries only the spacing or radius steps it uses, stated in a comment or doc. Record the rule; missing steps then become `skipped` with that reason, not drift.
- Typography: utility classes, mixins, or composite custom properties, and where fonts load. List the exact weights each font request loads (for Google Fonts, the `wght@` list in every entry page). A style whose weight is not loaded renders in a fallback weight even when the tokens are right.
- Effects: shadow and blur tokens.
- Components: file, export, props interface, and how each is previewed.

Write the detected conventions to `design-sync/config.json` (for example `"tokenNaming": "color/text/primary -> --color-text-primary"`, `"units": "rem, 16px base"`). Record naming exceptions individually (for example `status/* -> --ds-badge-*`, `spacing/0_5 -> --nc-space-0-5`). Expect several; a single rule rarely covers a real codebase.

## 3. Figma hygiene gate

Before matching, check for problems that would make the sync guess:

- Raw values inside library components where a variable or style exists.
- Text layers in components with no text style.
- Inconsistent or duplicate names across collections or styles.
- Detached instances or lookalike layers inside components.
- Variant sets with missing combinations.

Scan with `scripts/figma/hygiene-scan.js`, one read-only `use_figma` call per library components page: for each component set, count unbound fills, strokes, padding, gaps, and radii, and text nodes without a text style, and return one example node ID per issue type. Collect nested instance names in the same pass; they become `dependsOn` in the component map. A gap on a frame with one child is not reported, since it has no effect. Text style bindings are checked by `text-style-check.py`: a style bound to fewer variables than its siblings is reported as a likely missed binding.

Instances of icons or other library components may expose no inner layers through the API, so their colors and bindings cannot be read. Record those as unverified and ask the designer, rather than filing them as unbound. A hygiene row must rest on something the API actually returned.

Each becomes a `needs-figma-fix` row with the node ID. Continue the audit. Fixes only need to land before the affected component's batch in component sync; token sync does not depend on them. Fix shared dependencies first (a label used by every input, for example).

### Agent fixes (opt-in)

When the user approves, bind unbound values to existing variables instead of waiting for a designer:

1. Read pass: list every unbound value with node ID, property, current value, and the variables in the matching collection with exactly that value (Spacing for padding and gap, Radius for radius).
2. Bind exact matches only. Check the node's current value equals the variable's value right before binding, and skip on mismatch.
3. Pills and circles are the one allowed value change: a radius at or above half the node's shorter side (999, or 10 on a 20px circle) can bind to the system's full radius token, since it renders identically. Record the old and new values.
4. Anything off-scale stays `needs-figma-fix` with the nearest steps listed. Snapping to the scale or adding a step is a design decision.
5. Never create variables, change variable values, or edit inside instances. Fix the main component; instances inherit the binding.
6. Re-run the hygiene scan over every library component and record the result.
7. Set fixed rows to `fixed-in-figma`, with what was bound in the notes, and flag any value change for review. Add a dated entry to the ledger's "Figma fixes applied" section and update the mirror.

## 4. Match and classify

Tokens and styles match by name through the recorded naming rule. Components match through the component map (see component-map.md).

Compare with a script, not by reading. `scripts/token-diff.py` parses the token files, applies the naming rules from config, resolves which selectors hold each mode, and compares against `figma-inventory.json`, classifying every variable. `scripts/text-style-check.py` does the same for text styles and font loading. If a whole collection comes back `missing-in-code`, the naming rule is wrong, not the code. A system with a few hundred variables is too many to compare reliably by eye.

| Class | Meaning |
|---|---|
| `match` | Same name, same value in every mode. Recorded as `synced` with no change. |
| `value-drift` | Same name, different value. |
| `alias-drift` | Same resolved value, different alias chain (Figma points at a primitive, code at another semantic token). Low risk; fix so future primitive changes flow the same way. |
| `missing-in-code` | In Figma, not in code. |
| `code-only` | In code, not in Figma. Never deleted by the sync. |
| `renamed?` | Likely the same item under a new name (same value, similar name, old name gone). Needs confirmation. |
| `structure-drift` | Components only: anatomy, layout, variants, or text styles differ. |

Do not stop at value comparison for components. A component whose colors match can still have a changed layout or child order. Component rows start as `pending` with class `structure-drift` unless the per-component check in component-sync.md proves otherwise.

## 5. Write the ledger

Write the rows to `design-sync/ledger.json`, then render `design-sync/ledger.md` from it with the template in sync-ledger.md. The JSON is what scripts and the Figma mirror read; the Markdown is what people read. Put the Figma file key, last-modified time, and inventory counts in the header. Add one row per variable group, per text style, per effect style, per paint style, and per component set. Variables can be grouped by collection and path prefix (for example `color/text/*`) when every member gets the same treatment; list the members in the row notes.

Check: rows per category equal the Figma inventory counts. `ledger.py render` refuses to write `ledger.md` when they differ, when a row has an unknown status, or when a non-synced row has no reason. Then show the user the summary and the `needs-figma-fix` and `renamed?` items before changing code.
