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
  - `cornerRadius`, strokes and stroke weight, fills, effects
  - `boundVariables` and `textStyleId` / `effectStyleId` on each node
  - child order and visibility, and nested instances with their component keys
- Component properties and variant axes from the map.
- Optionally `get_design_context` as a reference. Its output is a starting point to adapt, not code to paste.

### 2. Read code

The component file, its styles, its props interface, and its preview.

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

- Render each variant in the preview (Storybook, dev route, or a test page) at the Figma frame's size and screenshot it, with Playwright or the available browser.
- Compare against the Figma screenshots: layout, spacing, alignment, child order, type. Note differences that remain and why (font rendering, code-owned behavior).
- Run the type check.
- Record the evidence (screenshot paths, check results) in the row and set the status.

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
| `strokesIncludedInLayout` false | Figma does not count the stroke in layout; use `outline` or an inset `box-shadow`, or offset the padding |
| text auto-resize `HEIGHT` / `NONE` with truncation | wrapping or `text-overflow: ellipsis` with the matching line clamp |

Hidden layers that are toggled by a boolean property map to conditional rendering, not `display: none`, unless the code already uses that pattern.
