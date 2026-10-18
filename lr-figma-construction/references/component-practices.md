# Figma Component Practices Reference

## Purpose

This reference defines best practices for inspecting, reusing,
constructing, and maintaining Figma components when working
with AI design agents.

The objective is to produce designs that are:

- Consistent with an existing design system.
- Structurally sound and maintainable.
- Flexible enough for legitimate design exploration.
- Easy for other designers to understand and modify.
- Free from unnecessary component complexity.

**Reuse components when they represent established patterns.
Use editable structures when the design is still evolving.**

This reference complements:

- [Auto Layout](auto-layout.md)
- [Design Tokens](design-tokens.md)

---

## 1. Core Principles

### Reuse before recreating

Before constructing a UI element:

1. Inspect the available component library.
2. Identify components that serve the intended purpose.
3. Inspect their variants and properties.
4. Determine whether they support the desired composition.
5. Reuse an existing component when appropriate.
6. Construct a new editable structure only when necessary.

Do not recreate existing components simply because
drawing primitives is easier.

### Components express established design decisions

A component should represent a reusable pattern with
meaningful consistency across its instances.

Examples:

- Buttons.
- Inputs.
- Select controls.
- Status badges.
- Navigation items.
- Avatars.
- Established card patterns.

Not every repeated visual treatment requires a component.

### Preserve design flexibility

Avoid introducing rigid component structures where
flexible styling or composition is more appropriate.

A generic surface treatment, for example, may be better
represented through existing tokens and auto layout
than through a component with dozens of variants.

**A component is not a substitute for a styling abstraction.**

---

## 2. Inspect Existing Components

Before creating new content, inspect relevant components.

### Identify

- Main components.
- Component sets.
- Variants.
- Component properties.
- Nested component instances.
- Exposed properties.
- Instance overrides.
- Existing design token bindings.

### Understand intended usage

Determine:

- What problem the component solves.
- Which properties are configurable.
- Which aspects are intentionally fixed.
- Whether it supports the intended content.
- Whether it has responsive or resizing behavior.
- Whether the component is deprecated or superseded.

Do not assume two visually similar components
are interchangeable.

### Distinguish verified information from inference

Use these classifications:

- **Observed:** Directly inspected in Figma.
- **Documented:** Explicitly described in system guidance.
- **Inferred:** Suggested by naming or usage.
- **Unknown:** Not accessible or verifiable.

Do not present inferred component behavior as fact.

---

## 3. Prefer Existing Component Instances

When an existing component accurately represents
the intended design, use an instance.

### Preserve instance integrity

- Maintain the connection to the main component.
- Preserve existing variable and style bindings.
- Configure supported component properties.
- Use intended variants.
- Apply legitimate instance overrides.
- Preserve nested component relationships.

### Do not detach unnecessarily

Detaching an instance breaks its relationship
with the component library.

Do not detach simply to:

- Change text.
- Replace an icon.
- Adjust a supported variant.
- Modify a property exposed by the component.
- Work around unfamiliar component controls.

Inspect the available properties first.

### When detaching may be justified

Detaching may be appropriate when:

- The requested design fundamentally changes the structure.
- Existing component properties cannot support the change.
- The work is explicitly exploratory.
- The user authorizes detachment.

Prefer constructing a separate exploratory structure
over detaching an existing production instance.

Document significant exceptions.

---

## 4. Component Properties and Variants

### Use existing properties intentionally

Prefer supported properties for:

- Size.
- Tone.
- State.
- Icon visibility.
- Icon selection.
- Text content.
- Optional elements.
- Layout orientation.

Do not recreate a component to achieve a configuration
that already exists.

### Avoid unnecessary overrides

An instance override should represent a legitimate
variation supported by the component's intended use.

Avoid overriding internal geometry, typography,
or colors when a corresponding property exists.

### Preserve variant semantics

Select variants according to their meaning.

For example:

```text
Button
├── Tone: Primary
├── Size: Medium
└── State: Default
```

Do not choose a visually similar variant that
communicates the wrong semantic role.

### Do not invent variants

Unless authorized:

- Do not modify component sets.
- Do not add variants to existing components.
- Do not rename variant properties.
- Do not change existing component definitions.

If a new variant is needed, document it as a proposal.

---

## 5. New Exploratory Components

Sometimes an exploration requires UI structures
that do not exist in the current library.

### Default approach

Construct these as editable native Figma structures.

Use:

- Frames.
- Auto layout.
- Text layers.
- Existing token bindings.
- Existing nested component instances.
- Raw values for genuinely new properties.

Do not automatically promote every new structure
to a reusable component.

### When to create a local component

A local component may be appropriate when:

- The same structure appears repeatedly.
- Consistency between instances matters.
- The structure is reasonably stable.
- Reuse reduces maintenance.
- The user has authorized component creation.

Prefer local, exploration-scoped components over
changes to shared libraries.

### When to keep a structure editable

Keep the structure as ordinary frames when:

- The design is still being explored.
- Instances require substantial structural differences.
- Reuse provides little practical benefit.
- The structure is primarily a styling treatment.
- Componentization would introduce unnecessary rigidity.

### New components do not imply new tokens

A new component can reuse existing variables
and styles while keeping new properties raw.

Do not create tokens simply because a new component
uses an unfamiliar value.

---

## 6. Components Versus Styling Patterns

This distinction is particularly important
during exploratory design.

### Components

Use components for repeatable UI structures
with meaningful behavioral or structural consistency.

Examples:

- A standardized button.
- A status badge with defined tones.
- A navigation item with selected states.
- A company avatar with established sizes.

### Styling patterns

Use styling patterns for reusable visual treatments
that do not require a fixed component structure.

Examples:

- A raised card surface.
- A bordered content container.
- A particular combination of padding and radius.
- A section background treatment.
- A flexible content panel.

### Avoid over-componentization

Do not create a component simply because two elements
share the same background, border, and radius.

Apply the appropriate existing tokens and layout
properties instead.

For example:

```text
Surface Treatment
├── Fill: surface/raised
├── Border: border/subtle
├── Radius: radius/md
└── Padding: spacing/4
```

This may be a reusable styling convention
without requiring a dedicated component.

### Avoid rigid generic containers

A generic Card component that must be detached
whenever its contents change may be less useful
than a flexible auto layout frame with established
surface tokens.

Prefer the abstraction that best supports
the designer's actual workflow.

---

## 7. Component Composition

### Build from existing primitives

Complex UI should reuse smaller established components
where appropriate.

Example:

```text
Prospect Card [Vertical Auto Layout]
├── Card Header [Horizontal Auto Layout]
│   ├── Company Avatar [Instance]
│   └── Company Details [Vertical Auto Layout]
│       ├── Company Name [Text]
│       └── Role Title [Text]
├── Metadata [Horizontal Auto Layout]
│   ├── Location [Text]
│   └── Employment Type [Text]
└── Card Footer [Horizontal Auto Layout]
    ├── Status Badge [Instance]
    └── Application Date [Text]
```

This structure may remain an ordinary frame
during exploration.

### Preserve logical hierarchy

Organize components around meaningful relationships.

Avoid:

- Disconnected primitives.
- Unnecessary wrapper frames.
- Deep nesting without purpose.
- Repeated manual positioning.
- Flattened UI structures.

### Use auto layout

Apply the guidance in
[Auto Layout](auto-layout.md).

Normal content flow should use native auto layout.

Absolute positioning should be reserved for
intentional overlapping or layered compositions.

---

## 8. Content and Overrides

### Text content

Use editable text layers or exposed text properties.

Do not convert text to outlines or rasterize it
unless explicitly requested.

### Icons

Prefer existing icon components.

Preserve:

- Intended size.
- Stroke or fill treatment.
- Alignment.
- Semantic meaning.

Do not substitute unrelated icons simply because
they look similar.

### Images and avatars

Prefer existing image and avatar components.

Use native image fills where appropriate.

Preserve image proportions and cropping.

### Optional content

Use component properties or flexible auto layout
to support optional elements.

Avoid leaving empty placeholders when content
is removed.

### Overrides

Use instance overrides for legitimate content
and presentation differences.

Do not override internal component structure
when an existing property supports the same result.

---

## 9. Component States

When constructing or modifying interactive UI,
consider relevant states.

Examples:

- Default.
- Hover.
- Focus.
- Active.
- Selected.
- Disabled.
- Loading.
- Error.
- Empty.

### Do not invent states unnecessarily

Inspect the existing design system first.

Use established state conventions where available.

Do not introduce unrelated interaction patterns.

### Static exploration versus production specification

A static design exploration may only require
representative states.

Do not create exhaustive state matrices unless
requested or necessary to communicate the design.

### Accessibility

Preserve clear visual affordances for:

- Interactive controls.
- Selected states.
- Focus states.
- Disabled controls.
- Error feedback.

Do not rely solely on color when another cue
is necessary for clarity.

---

## 10. Responsive Component Behavior

Components should accommodate reasonable
content and container changes.

### Test content variation

Where supported, test:

- Short and long labels.
- Multiline text.
- Missing optional content.
- Different icon configurations.
- Different content quantities.

### Test resizing

Where supported, verify:

- Hug contents behavior.
- Fill container behavior.
- Fixed dimensions.
- Minimum and maximum widths.
- Text wrapping.
- Nested auto layout relationships.

### Avoid rigid constructions

Do not use fixed heights or absolute positioning
to maintain alignment when auto layout can
express the intended relationship.

### Responsive variants

Some components require different structures
at different viewport sizes.

Do not assume every responsive behavior can
be achieved through resizing alone.

Create separate responsive compositions when
the design requires them and the user authorizes them.

---

## 11. Naming and Organization

Use semantic names that describe purpose.

### Good names

```text
Prospect Card
Company Identity
Role Details
Status Badge
Card Actions
```

### Avoid

```text
Frame 247
Rectangle 18
Group 42
Component 53
```

### Component naming

Follow the existing library's naming conventions.

Do not introduce a competing naming system.

### Exploratory variants

Use clear names that distinguish experiments
from production components.

Examples:

```text
Prospect Card / Editorial
Prospect Card / Compact
Prospect Card / Soft
```

These names do not imply that the structures
must become published components.

### Keep explorations isolated

Do not place experimental components inside
production component sets without authorization.

---

## 12. Protect Existing Components

Unless explicitly authorized, do not:

- Modify main components.
- Add or remove variants.
- Rename component properties.
- Change component definitions.
- Detach existing production instances.
- Modify shared library assets.
- Publish component changes.
- Delete or reorganize existing components.

When creating new exploratory content,
keep it separate from established system assets.

If a requested design requires changes to
a shared component, document the proposed
change rather than applying it automatically.

---

## 13. Verification

After constructing UI, verify component quality.

### Reuse

Check that:

- Appropriate existing components were reused.
- Instances remain connected to their main components.
- Correct variants and properties were applied.
- Existing nested instances remain intact.

### Structure

Check that:

- New structures use logical auto layout.
- Layer hierarchy is understandable.
- Text and content remain editable.
- No unnecessary wrapper frames exist.
- No inappropriate absolute positioning exists.

### Design system

Check that:

- Existing tokens and styles are correctly applied.
- New exploratory values remain raw.
- No unauthorized components or variants were created.
- Shared component definitions remain unchanged.

### Behavior

Where supported, test:

- Content changes.
- Resizing.
- Optional content.
- Variant switching.
- Component overrides.

### Tool limitations

If the Figma integration cannot inspect
component relationships or verify properties,
report that limitation.

Do not claim structural verification
that was not performed.

---

## 14. Common Anti-Patterns

### Rebuilding existing components

**Problem:** Recreating a Button using a frame,
text, and icon.

**Better:** Use the established Button component
and configure its properties.

### Detaching for simple changes

**Problem:** Detaching a component to change its label.

**Better:** Use the exposed text property or
supported instance override.

### The universal component

**Problem:** Creating a single Card component
with dozens of variants to support unrelated layouts.

**Better:** Use flexible styling patterns and
purpose-specific components where appropriate.

### Componentizing every repeated treatment

**Problem:** Turning every bordered container
into a component.

**Better:** Reuse surface tokens and auto layout.

### Rigid content structures

**Problem:** A card component cannot accommodate
a longer title without breaking.

**Better:** Use flexible sizing and appropriate
text behavior.

### Flattening complex UI

**Problem:** Importing an entire interface
as a single image.

**Better:** Reconstruct editable native layers
and reuse existing components.

### Unnecessary local components

**Problem:** Creating dozens of one-off components
during early exploration.

**Better:** Keep experimental structures as frames
until reuse or stability justifies componentization.

### Modifying shared components during exploration

**Problem:** Changing a production component
to accommodate one experimental direction.

**Better:** Create a separate exploratory structure
and document the proposed library change.

---

## 15. Completion Checklist

Before completing component construction, confirm:

- [ ] Existing components were inspected.
- [ ] Appropriate components were reused.
- [ ] Correct variants and properties were selected.
- [ ] Existing instances remain connected.
- [ ] No unnecessary detachment occurred.
- [ ] New structures use sensible auto layout.
- [ ] Text and content remain editable.
- [ ] Component hierarchy is understandable.
- [ ] Exploratory structures remain isolated.
- [ ] No unauthorized shared components were modified.
- [ ] New design values remain raw.
- [ ] Component behavior was verified where supported.
- [ ] Any limitations or compromises were documented.

## Definition of Done

A well-constructed Figma design:

- Reuses established components appropriately.
- Preserves component and instance integrity.
- Avoids unnecessary componentization.
- Uses flexible native layout structures.
- Supports reasonable content variation.
- Keeps experimental designs separate from production.
- Maintains clear naming and hierarchy.
- Preserves existing design system foundations.
- Remains easy for another designer to understand and edit.

**The best component architecture is not the one
with the most components. It's the one that gives
designers the right amount of structure and freedom.**