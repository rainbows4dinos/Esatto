# Token and style sync

Write Figma variables and styles into the code's existing token format. Follow the naming, units, and mode conventions recorded in `design-sync/config.json`; do not introduce a new token architecture. Token rules shared by all skills are in [conventions.md](conventions.md).

Work in this order, one ledger category at a time: variables, text styles, effect styles, paint styles. Update rows as each group finishes.

## Variables

- Keep alias chains. A semantic variable that aliases a primitive becomes `--color-text-primary: var(--color-gray-900)`, not a copied hex value.
- Write one value per mode using the existing switching mechanism (for example `:root` for the default mode and `[data-theme="dark"]` for others). A variable with the same value in every mode is written once.
- Convert units per config. Figma floats are pixels.
- Respect scopes: a float scoped to gap and padding belongs with spacing tokens, not sizes.
- An alias with opacity becomes `color-mix(in srgb, var(--target) 80%, transparent)`, or the code's existing equivalent.
- Mode-invariant semantic tokens (the same alias in every mode) can live in the default block only; check both places before calling one missing.
- Booleans and strings rarely map to CSS. Record them as `skipped` with a reason unless the code has a home for them.

## Text styles

Text styles are composite and are not returned by variable reads. This is the step that gets skipped when sync is anchored on variables, so every text style needs its own ledger row.

For each style, capture:

| Figma | CSS |
|---|---|
| `fontName.family` | `font-family`, with the existing fallback stack |
| `fontName.style` | `font-weight` and `font-style`, using the weight map in "Value notation" in [conventions.md](conventions.md). "Italic" sets `font-style: italic`. |
| `fontSize` | `font-size` in configured units |
| `lineHeight` `PIXELS` | unitless ratio (`lineHeight / fontSize`) unless the code uses fixed values |
| `lineHeight` `PERCENT` | unitless ratio (`value / 100`) |
| `lineHeight` `AUTO` | `normal` |
| `letterSpacing` `PERCENT` | `em` (`value / 100`) |
| `letterSpacing` `PIXELS` | configured units |
| `textCase` | `text-transform` (`UPPER` uppercase, `LOWER` lowercase, `TITLE` capitalize) |
| `textDecoration` | `text-decoration` |
| `paragraphSpacing` | margin between paragraphs, only if the code models it |

If a style property is bound to a variable (`boundVariables`), emit a reference to that variable's token rather than the resolved value.

Write each style in the code's existing form: a utility class, a mixin, or a set of per-property custom properties. If the code has no typography layer yet, ask before choosing one.

Check fonts against what actually loads, not just what the tokens say. A style can have every token right and still render wrong because its weight is never requested: `font-weight: 300` with a font URL that loads 400, 500 and 600 falls back to 400. Compare each style's weight and italic with the weights in every entry page's font request or `@font-face`. A missing family or weight is `blocked` until it is added; the fix is usually one URL edit per entry page.

Typography variables: if Figma text styles bind size, line height, and weight to variables, the code ideally references matching primitives (`--font-size-base`) rather than repeating raw values. When the code uses raw values, record one `needs-decision` row for the missing primitives rather than marking every style as drift.

## Effect styles

- Drop shadow: `box-shadow: x y blur spread color`. Inner shadow adds `inset`. Several effects in one style join with commas in Figma's order.
- Layer blur: `filter: blur()`. Background blur: `backdrop-filter: blur()`.
- Bound variables in effects become token references.

## Paint styles

Solid paints usually duplicate variables. If a paint style and a variable describe the same color, use the variable and record the style as `synced` with a note. Gradients become `linear-gradient` or `radial-gradient` tokens using the stop colors' tokens.

## Renames and removals

- `renamed?` rows confirmed by the user: add the new token, point the old name at it (`--old: var(--new)`), and mark the old one deprecated in a comment. A full rename across the codebase happens only on request.
- Tokens gone from Figma: search for usages. Unused ones can be removed with the user's OK. Used ones stay, marked deprecated, and are listed in the report.

## Verify

- `token-diff.py` reports every variable as `match`, and `text-style-check.py` passes. Search for effect and paint names by hand; do not trust a summary.
- `resolve-tokens.py` against the pre-sync file lists only the value changes the sync intended.
- Counts written equal counts in the ledger header.
- The build and type check pass.
- Spot-check a few computed values in a rendered page in each mode.
