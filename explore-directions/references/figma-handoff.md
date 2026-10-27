# Editable Figma handoff

Use this for a build-ready specification and, when construction is authorized, acceptance checks. Keep unselected directions clearly labeled as alternatives.

## Provenance and destination

Record brief, source links/node IDs and version/date, inspection baseline, direction status (proposed/recommended/selected), target file/page or requested new destination, frame sizes, states and modes. Protect original frames and library assets. If a destination or selection is necessary but unknown, prepare the specification and ask for that missing decision before dependent writes.

## Structure and mappings

Specify:

- Frame/layer hierarchy with meaningful names; sections and semantic reading order.
- Auto-layout direction, nesting, padding, gap, alignment, wrapping; hug/fill/fixed sizing by axis and min/max rules where relevant.
- Overlays or absolute children with reasons; clipping, scroll behavior, long-copy and narrow-width behavior.
- Existing component/set IDs or keys, exact variants, instance properties, nested swaps and permitted overrides. Preserve instance links instead of detaching for convenience.
- Variable/style IDs and names, semantic role, collection and effective modes, alias dependencies and binding targets. Do not translate a bound token into a raw literal accidentally.
- Intentional exploratory literals and proposed extensions, marked as provisional. New tokens/styles/library changes require their own authorization.
- Editable text, exact required copy, font availability, icons/assets and provenance. Preserve original imagery rather than silently substituting generated assets.
- Flow transitions, component states and required empty/loading/error/disabled/focus cases; distinguish Figma prototype behavior from implementation requirements.

A mapping table is useful:

| Visual/behavior element | Existing asset + properties | Layout/binding | Gap or proposed extension |
| --- | --- | --- | --- |

## Build manifest

Give construction a checklist instead of leaving it to rebuild one from the prototype. Write it as a manifest file in the format `build-in-figma` uses (`references/build-manifest.md` in that skill), with every frame `pending`; construction continues from it. When that skill is not installed, use the same fields:

- **Frames:** every direction × viewport × mode the prototype supports, marked required or optional, plus states worth drawing (hover, dragging, empty, expanded).
- **Signature details:** for each direction, the distinctive treatments that make it that direction, such as restyled controls, connectors, numerals, shadows and color fields. Note which existing components cannot produce them as configured.
- **References:** screenshots of the prototype for each required frame, in the matching state, viewport and mode, so every built frame has something to be compared against. `scripts/check-prototype.mjs --shots --viewports 1440x900,390x844` produces them per direction, viewport and mode.

## Verification and acceptance

For an actual Figma artifact, check both:

1. **Visual and behavioral fidelity:** compare rendered frames with the selected concept at matching viewport, data, state and mode. Check content, hierarchy, spacing, typography, wrapping, imagery and intended flow. Document deviations and their reasons.
2. **Native editability:** inspect layer types, editable text, component links/properties, variable/style bindings, layout sizing and meaningful hierarchy. Inspect or exercise relevant size/content/mode changes only in authorized working copies. Imported screenshots, flattened vectors of text, or a single raster-filled frame do not pass.

List verified frame/node links and checks actually performed, unresolved gaps, implementation notes and any proposed changes needing a decision. When only handing off a specification, phrase checks as acceptance criteria, not completed verification. Do not claim responsive or accessible implementation solely from a static Figma view.
