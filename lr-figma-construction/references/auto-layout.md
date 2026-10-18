# Figma Auto Layout Reference

## Purpose

This reference defines best practices for constructing
flexible, maintainable layouts using native Figma auto layout.

Use these guidelines whenever creating or modifying
Figma frames, components, or design explorations.

**Auto layout is the default. Absolute positioning is
the exception.**

The goal is not to maximize auto layout usage at all costs.
The goal is to create logical, predictable relationships
between elements.

---

## 1. Core Principles

### Structure reflects relationships

Organize layers according to how their content relates.

- Use vertical auto layout for stacked content.
- Use horizontal auto layout for adjacent content.
- Use nested frames for meaningful component groups.
- Use padding to create internal spacing.
- Use gaps to separate sibling elements.
- Use alignment properties instead of manual offsets.

Avoid unnecessary wrapper frames.

### Design for content variability

Layouts should accommodate:

- Longer and shorter text.
- Missing or optional elements.
- Different content quantities.
- Changes to component properties.
- Changes to container dimensions.

Do not optimize exclusively for the example content
shown in the reference design.

### Prefer native layout behavior

Use Figma's native layout properties rather than
simulating them with coordinates.

Avoid:
- Manually positioning sibling elements.
- Creating invisible spacer rectangles.
- Using arbitrary fixed heights to align content.
- Adding empty frames solely to create spacing.
- Using absolute positioning for ordinary content flow.

---

## 2. Choosing Layout Direction

### Vertical auto layout

Use for:

- Cards with stacked information.
- Forms.
- Lists.
- Navigation menus.
- Modal content.
- Page sections.
- Text groups.

Example:

```text
Prospect Card [Vertical / Hug]
├── Company Identity [Horizontal / Fill]
│   ├── Company Avatar [Fixed]
│   └── Company Details [Vertical / Fill]
│       ├── Company Name [Hug]
│       └── Job Title [Hug]
├── Metadata [Horizontal / Fill]
│   ├── Location [Hug]
│   └── Employment Type [Hug]
└── Card Footer [Horizontal / Fill]
    ├── Status Badge [Hug]
    └── Date [Hug]
```

### Horizontal auto layout

Use for:

- Toolbars.
- Navigation bars.
- Button groups.
- Icon-label combinations.
- Card headers.
- Metadata rows.
- Side-by-side panels.

Example:

```text
Toolbar [Horizontal / Fill]
├── Search Field [Fill]
├── Status Filter [Hug]
├── Date Filter [Hug]
└── Add Prospect Button [Hug]
```

### Nested auto layout

Combine horizontal and vertical layouts to express
complex compositions.

Prefer a few meaningful nested frames over a large
number of shallow, disconnected layers.

---

## 3. Sizing Behavior

Choose sizing modes intentionally.

### Hug contents

Use when an element's size should be determined
by its content.

Common examples:

- Buttons.
- Badges.
- Labels.
- Text groups.
- Compact controls.
- Cards with variable-height content.

Avoid fixed heights on text-containing elements
unless the design explicitly requires truncation
or clipping.

### Fill container

Use when an element should occupy available space
within its auto layout parent.

Common examples:

- Search inputs in toolbars.
- Text columns beside avatars.
- Flexible content panels.
- Cards inside fixed-width board columns.
- Main content areas.

Ensure the parent layout supports Fill container.

### Fixed dimensions

Use when a stable dimension is intentional.

Common examples:

- Icons.
- Avatars.
- Navigation rails.
- Desktop board columns with deliberate widths.
- Image thumbnails.
- Fixed-size controls.

Fixed dimensions are not inherently bad.

Use them where they express a real design constraint,
not as a workaround for missing layout logic.

### Min and max dimensions

Where supported, use minimum and maximum dimensions
to maintain useful layout boundaries.

Examples:

- Minimum readable card widths.
- Maximum text-column widths.
- Minimum touch-target dimensions.
- Maximum modal widths.

---

## 4. Spacing and Alignment

### Padding

Use parent-frame padding for internal spacing.

Example:

```text
Card
├── Padding: 16px
├── Gap: 12px
└── Children
```

Do not manually offset every child to simulate padding.

### Gaps

Use auto layout gaps to separate siblings.

Prefer established spacing tokens when available.

Avoid inserting empty frames as spacers.

### Alignment

Use native alignment properties to control:

- Horizontal alignment.
- Vertical alignment.
- Cross-axis alignment.
- Distribution of available space.

For layouts requiring elements at opposite ends,
use appropriate distribution behavior or flexible
intermediate content.

Do not manually position elements to create
space-between arrangements.

### Optical adjustments

Small optical adjustments may occasionally be necessary.

Prefer component-level adjustments over arbitrary
offsets on individual instances.

Document significant exceptions.

---

## 5. Text and Content Behavior

Text is one of the primary reasons to use auto layout.

### Text resizing

Configure text layers so they behave predictably.

- Use Hug contents for natural text sizing where appropriate.
- Use Fill container for text that should wrap within a column.
- Allow multiline content when the design requires it.
- Avoid fixed text heights that clip content.
- Use truncation intentionally, not accidentally.

### Variable-length content

Test with:

- Short company names.
- Long company names.
- Multiline job titles.
- Long metadata values.
- Missing optional fields.

For example:

```text
Company Name:
"Stripe"

Company Name:
"International Healthcare Technology Partners"
```

Both should remain structurally sound.

### Optional elements

Removing an optional child should not leave an
unexplained gap.

Use auto layout so surrounding elements naturally
reflow when content is added or removed.

---

## 6. Cards and Repeated Components

Repeated elements should use consistent layout rules.

### Card construction

A typical card should:

- Use a vertical auto layout parent.
- Use padding for internal spacing.
- Use gaps between logical content groups.
- Use nested horizontal layouts for metadata.
- Allow text to wrap predictably.
- Resize vertically when content grows.

### Repeated lists

Use vertical auto layout for stacked cards or rows.

Example:

```text
Kanban Column [Vertical / Fill]
├── Column Header [Horizontal / Fill]
└── Card List [Vertical / Fill]
    ├── Prospect Card
    ├── Prospect Card
    └── Prospect Card
```

Use a consistent gap between cards.

Do not position each card individually.

### Drag-and-drop interfaces

Auto layout should represent the resting layout
of draggable items.

Dragging behavior belongs to the interactive
implementation, not the static layout structure.

Do not use absolute positioning simply because
a component will eventually be draggable.

---

## 7. Responsive Layouts

Build layouts that respond predictably to resizing.

### Flexible relationships

Use Fill container for flexible regions.

Use Hug contents for content-sized controls.

Use fixed dimensions only where appropriate.

### Wrapping

Where supported, use auto layout wrapping for
groups that should move onto additional rows.

Examples:

- Filter chips.
- Tag collections.
- Responsive button groups.

Do not assume wrapping is appropriate for every
horizontal layout.

### Desktop and mobile

Do not assume a desktop composition can be made
mobile-friendly through resizing alone.

Different breakpoints may require different
component arrangements.

Preserve the underlying component relationships
where possible.

---

## 8. Absolute Positioning

Absolute positioning is acceptable when it reflects
an intentional visual relationship.

### Appropriate uses

- Floating action buttons.
- Overlapping status indicators.
- Notification dots.
- Decorative elements.
- Overlays.
- Intentional layered compositions.

### Inappropriate uses

- Card content.
- Form fields.
- Navigation items.
- Toolbar controls.
- Repeated list items.
- Column headers.
- Text alignment.
- Ordinary page layout.

### Decision rule

Before using absolute positioning, ask:

1. Is this element intentionally overlapping something?
2. Does its position need to be independent of normal flow?
3. Would auto layout express the relationship more clearly?
4. Will this positioning remain correct when content changes?

If auto layout can express the relationship naturally,
use auto layout.

---

## 9. Layer Hierarchy and Naming

Layout structure should be understandable from
the Figma layer panel.

### Prefer semantic names

Good:

```text
Prospect Card
├── Card Header
│   ├── Company Avatar
│   └── Company Details
├── Role Information
└── Card Footer
```

Avoid:

```text
Frame 284
├── Frame 12
│   ├── Rectangle 4
│   └── Text 18
├── Group 7
└── Frame 19
```

### Avoid excessive nesting

Every frame should serve a purpose.

Valid purposes include:

- Layout direction.
- Padding.
- Alignment.
- Background or border.
- Clipping.
- Reusable component structure.

Do not add frames simply to organize the layer panel.

---

## 10. Verification

After constructing a design, inspect both its
visual appearance and layout behavior.

### Structural checks

Verify:

- Auto layout is used for ordinary content flow.
- Parent-child relationships are logical.
- Hug, Fill, and fixed sizing are intentional.
- Padding and gaps replace manual offsets.
- Text layers resize appropriately.
- Repeated elements share consistent layout rules.
- No unnecessary absolute positioning exists.

### Resize checks

Where supported, test:

1. Original frame dimensions.
2. A narrower frame.
3. A wider frame.
4. Longer text content.
5. Removal of optional content.

Look for:

- Overlapping elements.
- Clipped text.
- Unexpected gaps.
- Broken alignment.
- Unintended stretching.
- Components escaping their containers.

### Visual checks

Verify:

- Alignment.
- Spacing consistency.
- Component proportions.
- Text hierarchy.
- Overall fidelity to the reference.

### Tool limitations

If the Figma integration cannot inspect or modify
specific layout properties, report the limitation.

Do not claim that resizing or structural verification
was performed unless it actually was.

---

## 11. Common Anti-Patterns

### The screenshot reconstruction

**Problem:** Hundreds of absolutely positioned elements
that visually resemble a reference.

**Better:** Reconstruct the underlying component hierarchy
using native frames and auto layout.

### The fixed-height card

**Problem:** Card content clips when a title wraps.

**Better:** Use Hug contents vertically and flexible
text sizing.

### The spacer rectangle

**Problem:** Empty shapes are used to push elements apart.

**Better:** Use padding, gaps, distribution, or Fill container.

### The wrapper explosion

**Problem:** Every element is nested inside multiple
unnecessary frames.

**Better:** Use the minimum hierarchy required to express
layout relationships.

### The detached component

**Problem:** Existing component instances are detached
to make small visual adjustments.

**Better:** Use supported component properties and overrides.
Create exploratory structures only when necessary.

### The token workaround

**Problem:** Layout is distorted to force an existing
spacing token into a composition.

**Better:** Use the appropriate raw value during exploration
and document it.

---

## Definition of Done

A well-constructed Figma layout:

- Uses auto layout for normal content flow.
- Uses absolute positioning only when justified.
- Has logical parent-child relationships.
- Uses intentional Hug, Fill, and fixed sizing.
- Accommodates reasonable content variation.
- Resizes predictably.
- Avoids unnecessary wrapper frames.
- Maintains readable layer hierarchy.
- Preserves visual fidelity.
- Remains practical for another designer to edit.

**The goal is not merely to make the design look right.
The goal is to make it behave right.**