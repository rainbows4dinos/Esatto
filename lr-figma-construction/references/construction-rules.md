# Construction rules

The rules for building in Figma: layout, components, and tokens, then the anti-patterns to avoid and one checklist to verify against. Evidence statuses, the stroke and padding rule, value notation, and source protection are in [conventions.md](conventions.md).

The goal is not only that the design looks right. It should behave right when someone changes the content, the size, or the mode, and stay easy for another designer to edit.

## Layout

Auto layout is the default; absolute positioning is the exception. The aim is logical, predictable relationships between elements, not auto layout for its own sake.

**Structure follows relationships**
- Vertical auto layout for stacked content: cards, forms, lists, menus, modal content, page sections, text groups.
- Horizontal for adjacent content: toolbars, nav bars, button groups, icon and label pairs, card headers, metadata rows, side-by-side panels.
- Nest them to express real groups. A few meaningful nested frames beat many shallow, disconnected layers.
- Every frame needs a purpose: direction, padding, alignment, a background or border, clipping, or component structure. Never add frames just to organize the layer panel.

```text
Prospect Card [Vertical / Hug]
├── Card Header [Horizontal / Fill]
│   ├── Company Avatar [Instance / Fixed]
│   └── Company Details [Vertical / Fill]
│       ├── Company Name [Text / Hug]
│       └── Role Title [Text / Hug]
├── Metadata [Horizontal / Fill]
└── Card Footer [Horizontal / Fill]
    ├── Status Badge [Instance / Hug]
    └── Application Date [Text / Hug]
```

**Sizing, chosen per axis**
- **Hug** when content sets the size: buttons, badges, labels, text groups, compact controls, cards with variable-height content.
- **Fill** when the element takes the space its parent offers: a search field in a toolbar, a text column beside an avatar, cards in a fixed-width column, main content areas. The parent must support it.
- **Fixed** when the dimension is a real constraint: icons, avatars, nav rails, deliberate column widths, thumbnails, fixed-size controls. Fixed is fine as a design decision and wrong as a workaround for missing layout logic.
- **Min and max** for useful boundaries: minimum readable card width, maximum text column, minimum touch target, maximum modal width.
- No fixed heights on anything that holds text unless the design calls for truncation or clipping.

**Spacing and alignment**
- Padding on the parent for internal space, gaps between siblings, alignment and distribution for placement. Never offset children by hand, never use spacer rectangles or empty frames.
- Opposite ends of a row use space-between distribution or a flexible middle element, not manual positions.
- An optical adjustment belongs in the component, not in one instance, and is noted when significant.

**Text and content**
- Text that wraps in a column is Fill with height resizing. Natural-width text hugs.
- Truncation is a decision, never an accident.
- Build for content variation: short and long names, multiline titles, long metadata, missing optional fields. "Stripe" and "International Healthcare Technology Partners" should both hold up.
- Removing an optional element should let the rest reflow, not leave a gap.
- Repeated items (cards, rows) live in one vertical auto layout with one consistent gap. Never position them individually.
- Draggable items are laid out at rest. Dragging belongs to the implementation, so it is never a reason for absolute positioning.

**Absolute positioning** only for an intentional overlap or layer: floating action buttons, notification dots and status indicators on a corner, overlays, decorative details such as connectors and corner marks. Those details are still built, not skipped. Never for card content, form fields, nav items, toolbar controls, list items, column headers, text alignment, or page layout. Before using it, ask whether the element overlaps something on purpose, whether it must be independent of the flow, and whether it stays correct when content changes. If auto layout can express the relationship, use auto layout.

**Responsive**
- Fill for flexible regions, Hug for content-sized controls, Fixed only where it is a real constraint.
- Wrapping for groups that should flow onto new rows (filter chips, tags, button groups), not for every horizontal layout.
- A desktop composition does not become a phone layout by resizing. Build a separate arrangement when the source has one, keeping the same component relationships.

**Names** describe purpose: `Prospect Card`, `Card Header`, `Role Details`. Never `Frame 284`, `Group 7`, `Rectangle 4`. Follow the library's naming conventions rather than introducing a second system.

## Components

**Reuse before recreating.** Inspect the library first: component sets, variants, properties, nested instances, overrides, bindings, and whether a component is deprecated. Visually similar components are not interchangeable; check what each is for. Use the existing component when it fits, and configure it through its properties rather than rebuilding it from primitives.

**Instances**
- Keep them linked. Preserve bindings, nested instances, and the intended variant.
- Choose variants by meaning. A visually similar variant with the wrong semantic role is wrong.
- Use properties for size, tone, state, icon visibility and selection, text, optional elements, and orientation. Override internal geometry, type, or color only when no property covers it.
- Do not detach to change text, swap an icon, pick a variant, or work around unfamiliar controls. Detaching is justified only when the change is structural and no property supports it, the work is exploratory, or the user authorizes it. Even then, prefer building a separate exploratory structure to detaching a production instance.
- After placing instances, audit every exposed property: default text ("Label", "Button"), default icons in swap slots, booleans left at their defaults. Searching the frame for default strings is a quick first check. Variant properties that depend on mode or viewport (theme, nav size) must match the frame.

**New structures**
- Build what the library lacks as editable frames: auto layout, text, existing bindings, existing nested instances, raw values for genuinely new properties.
- Make a local component only when the structure repeats, consistency between instances matters, it is reasonably stable, and the user has authorized component creation. Keep it local to the exploration, named so it reads as an experiment (`Prospect Card / Editorial`), never inside a production component set.
- Keep it as plain frames while the design is still moving, when instances differ structurally, or when it is really a styling treatment.
- A new component does not need new tokens. Reuse variables and styles; keep new values raw.

**Components versus styling.** A component is for a repeatable structure with consistent behavior: a button, a status badge with defined tones, a nav item with selected states. A shared look (surface fill, border, radius, padding) is a styling pattern built with tokens and auto layout, not a component. A generic Card that must be detached whenever its contents change is worse than a flexible frame with the right surface tokens.

**Content**
- Text stays editable: no outlines, no rasterized text.
- Icons from the icon library at their intended size and treatment, chosen for meaning, not resemblance. Icons imported into new local components often arrive black; bind their fills to the right text or icon token.
- Images and avatars from existing components where they exist, with native image fills and the source's proportions and crop.
- When a local component gets a viewport variant by cloning, re-link its text, boolean, and swap properties, and check that switched instances keep their overrides.

**States.** Use the system's existing states (hover, focus, active, selected, disabled, loading, error, empty) rather than inventing new patterns. An exploration needs representative states, not a full matrix, unless asked. Keep affordances for interactive, selected, focused, disabled, and error states, and do not rely on color alone where another cue is needed.

**Never, without explicit authorization:** modify main components, add or remove variants, rename properties, change definitions, publish, or delete and reorganize library components. When a direction needs a shared component to change, build the local version and record the library change as a proposal.

## Tokens and styles

**Classify every property before applying it**

| Kind | Example | Action |
|---|---|---|
| Existing system property | card background, card radius, body text | Bind the variable or apply the style. |
| Existing component property | button size, button tone | Use the component and set the property. |
| New exploratory property | 22px editorial padding | Raw value, labeled, nearest token noted. |
| Unknown | a value with no clear mapping | Check related components and docs, then a raw value; report the uncertainty. |

**Bind, don't match.** A raw `#FFFFFF` that equals `surface/default` is not tokenized. Apply the real binding, verify it after building, and never call a design tokenized because its values match. Choose by role: a white card is `surface/default`, not `text/inverse`, even though both are white. If the tool cannot bind, keep the raw value, record the intended mapping, and report the property as unbound.

**Modes**
- Find the collection, its modes, and the mode the target frame should use; preserve inherited modes.
- Never replace a mode-aware variable with the hex it shows in one mode.
- When a requested mode does not exist, do not invent values or assume another mode is equivalent. Report it and use a fallback only if one was provided.
- With colors bound, a second mode is the frame duplicated with the mode switched. Any raw value that should have been a variable shows up wrong there, so check every mode the build list includes.

**Color.** Semantic tokens over visually similar values; status colors only for status. A new color is a raw value with its purpose noted, not a new variable and not a generated scale. Check contrast where possible (WCAG: 4.5:1 normal text, 3:1 large text and meaningful UI boundaries). Report a contrast problem with an established color and propose a fix; do not change it silently.

**Typography.** Apply the real text style, chosen by role. A new treatment (an editorial size or weight) stays raw with the hierarchy preserved. Do not force text into the wrong style just to avoid raw values.

**Spacing and dimensions.** Spacing tokens through padding and gaps. A value that does not map stays raw: 22px stays 22px, never rounded to the nearest step. Dimension tokens suit standardized elements (icons, avatars, controls); content-driven sizes use Hug or Fill instead of a token.

**Radius, borders, effects.** Keep intentional differences between cards, buttons, inputs, and badges rather than normalizing them. Reuse border colors, widths, and effect styles by role. A new shadow or blur stays raw and is noted.

**From prototypes and other sources.** Values in HTML, CSS, React, or screenshots do not prove a matching Figma variable exists; `--card-background: #FFF` is not a Figma token. Extract the property, find the semantic match in the target system, bind it, and keep genuinely new values raw. When fidelity and system consistency conflict, do not silently change the design or force a token: say so and decide with the user.

## Anti-patterns

| Problem | Instead |
|---|---|
| Screenshot reconstruction: hundreds of absolute layers that resemble the source | Rebuild the hierarchy with frames, auto layout, and instances |
| Whole interface imported as one image | Editable native layers and existing components |
| Fixed-height card that clips a wrapped title | Hug vertically, text set to wrap |
| Spacer rectangles | Padding, gaps, distribution, or Fill |
| Wrapper explosion | The fewest frames that express the relationships |
| Rebuilding an existing component from primitives | Use the component and its properties |
| Detaching to change a label | The text property or a supported override |
| A universal Card with dozens of variants | Styling patterns plus purpose-specific components |
| A component for every bordered container | Surface tokens and auto layout |
| Dozens of one-off local components early on | Plain frames until reuse justifies a component |
| Changing a shared component for one direction | A local structure and a written proposal |
| Raw value that matches a token | Bind the variable |
| A token chosen because its value matches | Choose by role |
| 22px snapped to a 24px token | Keep 22px when it is intentional |
| Hardcoded light-mode colors | Semantic bindings, checked in every mode |
| Every new value turned into a variable | Raw until approved |
| Layout bent to fit an existing token | Raw value, noted |

## Verification checklist

Run per frame, after the screenshot comparison in the skill. Record results in the build manifest.

**Reuse and integrity**
- [ ] Existing components were inspected and reused where they fit; correct variants and properties.
- [ ] Instances are linked, nested instances intact, nothing detached without reason.
- [ ] No default text, default icons, or default booleans left in instances.
- [ ] No library component, variable, or style was created, changed, or published without authorization.

**Structure**
- [ ] Auto layout carries normal content flow; absolute positioning only for justified overlaps.
- [ ] Hug, Fill, and Fixed are intentional per axis; no fixed heights on text containers.
- [ ] Padding and gaps, not offsets or spacer shapes; no unnecessary wrappers.
- [ ] Layer names describe purpose; text is editable; no rasters standing in for UI.

**Tokens**
- [ ] Bindings applied (not matched) for every existing system property; text styles applied.
- [ ] Every mode in the build list checked; no hardcoded mode-specific colors.
- [ ] New values raw and labeled with the nearest token; deviations noted.

**Behavior, where the tool supports it** (only in an authorized working copy)
- [ ] Narrower and wider frame, longer text, optional content removed: no overlap, clipping, stray gaps, broken alignment, or content escaping its container.
- [ ] Variant switching and overrides behave.

**Honesty**
- [ ] Anything the tool could not inspect or verify is reported as such. Resizing, modes, bindings, and editability are claimed only when checked.
