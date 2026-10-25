# Component sync

Bring each mapped code component in line with its Figma component. Do this after token sync so components can use the updated tokens.

## Order and batches

Sort components by `dependsOn` in the component map so primitives (Icon, Button, Input) come before the components that contain them (Card, Dialog, Form). Work in batches of the configured size. Finish and record each component before starting the next.

## The per-component loop

### 1. Read Figma

For the component set and each variant:

- Screenshot every variant (`get_screenshot`). These are the visual reference for step 5.
- Structure from `get_metadata` and, through a read-only `use_figma` call, these properties for the root and every frame inside it:
  - `layoutMode`, `layoutWrap`, `itemSpacing`, `counterAxisSpacing`, padding on all four sides
  - `primaryAxisAlignItems`, `counterAxisAlignItems`
  - `layoutSizingHorizontal` and `layoutSizingVertical` on each child
  - `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `clipsContent`, `layoutPositioning`
  - `cornerRadius`, strokes, stroke weight, `strokeAlign`, and `strokesIncludedInLayout`, fills, effects
  - `boundVariables` and `textStyleId` / `effectStyleId` on each node
  - child order and visibility, and nested instances with their component keys
- Component properties and variant axes from the map.
- Optionally `get_design_context` as a reference. Its output is a starting point to adapt, not code to paste.

### 2. Read code

The component file, its styles, its props interface, and its preview.

Then search the consuming pages for local markup that implements the same component or one of its optional Figma properties (hidden slots, booleans that default to off). A slot with no shared CSS can still be built locally on one page, for example a link positioned inside an input. Search by role and pattern (absolutely positioned children of the control, extra classes on the wrapper), not only by the shared class name. Never record a property as unused based on the shared stylesheet alone; promote a local implementation into the shared component instead.

Also search page and feature stylesheets for rules that restyle the shared component from outside (for example `.prospect-card strong { color: ... }`). They win on specificity or order, so the shared component can be correct and still render wrong on the page. Remove or fold them in as part of the sync, and note each one in the checklist.

### 3. Write the checklist

Compare the two and write a checklist into the component's ledger row. One line per difference, grouped:

- **Anatomy**: children added, removed, or reordered; slots; nested components.
- **Layout**: direction, gap, padding, alignment, sizing, wrapping, min and max sizes.
- **Variants and states**: each axis and value; visual states.
- **Tokens**: raw values in code where Figma binds a variable; bindings that changed.
- **Typography**: for each text layer, the text style it uses in Figma and the class or token it uses in code.
- **Effects and borders**: radius, stroke, shadow.

Compare against the Figma properties, not against whether the component looks close enough. A component that looks right can still have the wrong gap token or a missing child.

If the checklist is empty, the row is `synced` with "no structural drift" and the evidence from step 1.

### 4. Edit

- Map auto layout with the table below.
- Use tokens wherever Figma binds a variable or style. No raw values where a token exists.
- Keep prop names, behavior, ARIA, and semantics. If Figma implies a prop change, add a `needs-decision` line and leave that part alone.
- Tick each checklist line as it is done.

### 5. Verify

If the project has no component gallery (Storybook or similar), add `design-sync/preview.html`: a standalone page that loads the shared stylesheets and renders each synced variant inside a `[data-shot]` wrapper, with a query parameter for each theme. It is not linked from the app. Add each batch's components to it. A component that only renders correctly in its real context (a nav item on the header background) gets that context in its preview cell.

Render it with `design-sync/scripts/shot.mjs` (copied from this skill's `scripts/`, see its README). It screenshots every `[data-shot]` element in every mode and records computed size, padding, gap, radius, colors, and font for it and its children. Serve the page over HTTP; `file://` breaks module imports. Web fonts are blocked and replaced with the same families from `@fontsource` so results do not depend on network access.

- Compare the recorded numbers with Figma's auto layout values first: height and width of each variant, padding, gap, radius. A 1 or 2px difference in height is almost always border math (see `strokesIncludedInLayout` below).
- Then compare the screenshots side by side with `get_screenshot` of the component set: layout, spacing, alignment, child order, type. Note differences that remain and why (font rendering, code-owned behavior).
- Check the component in at least one real consuming page as well, so page-level overrides show up.
- Run the type check. If the project's checker ships a platform-specific binary that does not match the agent's shell, install the same version outside the repo and run it against the project; do not skip it or leave it to the user.
- When inserting helpers into an existing file, never place them between a doc comment and the function it documents. In JSDoc-typed code that silently drops the types.
- Bump cache revisions on every changed stylesheet and module, if the project versions its asset URLs (`?v=`). Run `scripts/bump-cache.py` with the paths in `config.json` `cacheRevisions`, so a chain of imports is not missed.
- Save one composite image and the metrics JSON per batch in `design-sync/evidence/`, record the paths and check results in the row, and set the status.

## After a Figma fix

When the designer (or the agent, with approval) fixes something in Figma mid-sync, re-check only what it touches:

1. `python3 design-sync/scripts/ledger.py affected "<Component>"` lists the component and every component that contains it, with their row IDs, from `dependsOn` in the component map.
2. Re-read those components (step 1 of the loop) and re-run `figma/hygiene-scan.js` with `ONLY` set to their names.
3. Close the hygiene row as `fixed-in-figma` after the re-read confirms it, and reopen any already-synced component whose Figma values changed (`ledger.py set C-07 pending --notes "reopened: ..."`). Sync it again in the next batch.

Do not re-audit the whole library for one fix, and do not assume a fix landed without reading it back.

## Auto layout to CSS

| Figma | CSS |
|---|---|
| `layoutMode` `HORIZONTAL` / `VERTICAL` | `display: flex; flex-direction: row` / `column` |
| `layoutMode` `GRID` | `display: grid` with matching tracks |
| `itemSpacing` | `gap` (column gap in a row, row gap in a column) |
| `primaryAxisAlignItems` `SPACE_BETWEEN` (Figma "Auto" spacing) | `justify-content: space-between`; no `gap` from `itemSpacing` |
| `primaryAxisAlignItems` `MIN` / `CENTER` / `MAX` | `justify-content: flex-start` / `center` / `flex-end` |
| `counterAxisAlignItems` `MIN` / `CENTER` / `MAX` / `BASELINE` | `align-items: flex-start` / `center` / `flex-end` / `baseline` |
| padding | `padding`, using spacing tokens |
| `layoutWrap` `WRAP` | `flex-wrap: wrap`; `counterAxisSpacing` becomes the cross-axis gap |
| child Fill on the main axis | `flex: 1 1 0; min-width: 0` (or `min-height: 0` in a column) |
| child Fill on the cross axis | `align-self: stretch` |
| child Hug | no explicit size on that axis |
| child Fixed | explicit size. Confirm it is intended; Fixed often hides a missing Fill. |
| `minWidth` / `maxWidth` / `minHeight` / `maxHeight` | same CSS properties |
| `layoutPositioning` `ABSOLUTE` | `position: absolute` in a `position: relative` parent |
| `clipsContent` | `overflow: hidden` |
| `strokesIncludedInLayout` false (default), inside stroke | Figma measures padding from the outer edge, so the stroke sits inside the padding. With a CSS `border` and `box-sizing: border-box`, use `padding: calc(token - border-width)`; otherwise the component grows by twice the border. |
| `strokesIncludedInLayout` true | Padding starts inside the stroke, which matches CSS `border` plus `padding: token` with no subtraction. Check this per component, and per nested frame, before subtracting. |
| text auto-resize `HEIGHT` / `NONE` with truncation | wrapping or `text-overflow: ellipsis` with the matching line clamp |

When Figma's layout and the code's differ but render the same, keep the code's approach if switching would break something code-owned, and record why in the checklist. Example: a label that is horizontal auto layout in Figma but `display: block` in code because consumers add inline description text that flex would collapse.


Hidden layers that are toggled by a boolean property map to conditional rendering, not `display: none`, unless the code already uses that pattern.
