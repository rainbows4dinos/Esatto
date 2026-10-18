# Figma Design Tokens Reference

## Purpose

This reference defines how to work with existing design tokens,
variables, styles, and component properties when constructing
or modifying Figma designs.

The objective is to maintain consistency with an established
design system without restricting legitimate design exploration.

**Reuse existing system foundations. Keep new design decisions
exploratory until explicitly approved.**

This reference applies to:
- Constructing new Figma designs.
- Recreating designs from external references.
- Translating interactive prototypes into Figma.
- Creating design variations.
- Extending existing interfaces.
- Working within unfamiliar design systems.

---

## 1. Core Principles

### The existing design system is the source of truth

When working in an existing Figma file:

1. Inspect the available design system.
2. Identify relevant variables, styles, and components.
3. Understand their intended usage.
4. Reuse established foundations where appropriate.
5. Preserve existing bindings and component relationships.
6. Keep genuinely new properties as raw values.

Do not invent a parallel design system.

### Semantic meaning matters more than matching values

A token should be selected based on its intended purpose,
not simply because its value happens to match.

For example:

```text
surface/default = #FFFFFF
text/inverse    = #FFFFFF
```

These tokens have identical values but different meanings.

A white card background should use `surface/default`,
not `text/inverse`.

Never select tokens solely by comparing hex values.

### Existing does not automatically mean appropriate

Do not force an existing token into a design simply
because it is available.

If a new design decision does not correspond to an
existing semantic token, use a raw value.

Document meaningful deviations.

---

## 2. Inspect the Design System

Before constructing designs, inspect the relevant
Figma document and its available design foundations.

### Variables

Identify existing variables for:

- Colors.
- Spacing.
- Dimensions.
- Corner radii.
- Opacity.
- Other supported numeric or semantic properties.

Inspect variable collections and modes where accessible.

### Styles

Identify available:

- Typography styles.
- Color styles.
- Effect styles.
- Grid styles.

### Components

Identify:

- Existing components.
- Component sets and variants.
- Component properties.
- Existing component instances.
- Available instance overrides.

### Documentation

When available, inspect:

- Design system documentation.
- Component usage guidelines.
- Naming conventions.
- Token descriptions.
- Deprecated token guidance.
- Accessibility requirements.

Do not assume a token's purpose from its name alone
when documentation or usage provides better evidence.

---

## 3. Classify Design Properties

Before applying values, classify them.

### A. Existing system property

A property that maps to an established token or style.

Example:

```text
Card background → surface/raised
Card radius     → radius/md
Body text       → typography/body
```

**Action:** Apply the existing token or style.

### B. Existing component property

A property controlled by an established component.

Example:

```text
Button size → Medium
Button tone → Primary
```

**Action:** Use the existing component and configure
its supported properties.

Do not recreate the component with primitives.

### C. New exploratory property

A property introduced by the design that has no
appropriate existing system equivalent.

Example:

```text
Editorial card padding → 22px
```

**Action:** Use the raw value.

Do not create a new token or style.

### D. Unknown property

A property whose intended mapping cannot be verified.

**Action:**

1. Inspect related components and documentation.
2. Look for established usage patterns.
3. Avoid inventing semantic relationships.
4. Use a raw value when appropriate.
5. Report uncertainty when meaningful.

Do not present inferred mappings as verified facts.

---

## 4. Apply Real Variable Bindings

### Binding versus matching

These are not equivalent:

**Raw value:**

```text
Fill: #FFFFFF
```

**Variable binding:**

```text
Fill: surface/default
```

Even if both currently produce the same appearance,
only the second maintains a relationship with the
design system.

### Required behavior

When an appropriate existing variable is available:

- Apply the actual variable binding.
- Preserve its semantic meaning.
- Respect the current variable mode.
- Avoid replacing bindings with raw values.
- Verify the binding after construction.

Do not claim a design is tokenized merely because
its raw values match existing tokens.

### When binding is unavailable

If the Figma integration cannot apply variable bindings:

1. Preserve the intended appearance using raw values.
2. Record the intended variable mapping.
3. Identify the affected properties.
4. Report that the values are not actually bound.

Do not silently treat raw values as equivalent
to variable bindings.

---

## 5. Variable Collections and Modes

Design systems may contain multiple variable modes.

Examples:

- Light and dark themes.
- Brand themes.
- Density modes.
- Platform-specific modes.

### Preserve intended modes

Before applying variables:

1. Identify the relevant collection.
2. Identify available modes.
3. Determine the intended mode for the target frame.
4. Apply variables according to their semantic purpose.
5. Preserve inherited modes where appropriate.

### Avoid hardcoding mode-specific values

For example:

```text
surface/default
```

may resolve to different colors in light and dark modes.

Do not replace it with a fixed hex value simply because
the reference currently displays one mode.

### Missing modes

If the requested theme or mode is unavailable:

- Do not invent missing token values.
- Do not assume another mode is equivalent.
- Identify the limitation.
- Use explicitly provided fallback values if appropriate.
- Document any substitutions.

### Verify mode behavior

Where supported, check the design in relevant modes.

Confirm that:

- Backgrounds update appropriately.
- Text remains legible.
- Borders remain visible.
- Semantic colors retain their meaning.
- Component instances behave as expected.

Do not claim multi-mode support without verification.

---

## 6. Color Tokens

### Prefer semantic color tokens

Examples:

```text
surface/default
surface/raised
text/primary
text/secondary
border/subtle
status/success
status/warning
```

These are illustrative names, not a required taxonomy.

Always use the naming conventions of the actual
design system.

### Avoid arbitrary color substitutions

Do not:

- Replace semantic colors with visually similar values.
- Introduce unrelated accent colors.
- Use status colors for decorative purposes without justification.
- Hardcode colors that should respond to theme changes.

### New exploratory colors

When a design requires a color not represented by
the existing system:

- Use a raw color value.
- Do not create a new variable.
- Do not modify an existing variable.
- Document its purpose.
- Consider contrast and theme implications.

Do not automatically generate a full color scale
for a single exploratory color.

### Accessibility

Evaluate text and meaningful UI contrast where possible.

Use WCAG contrast guidance as a reference:

- 4.5:1 for normal text.
- 3:1 for large text.
- 3:1 for meaningful non-text UI boundaries and indicators.

Do not silently change established colors solely
to satisfy an inferred accessibility requirement.

Identify concerns and propose corrections when needed.

---

## 7. Typography Styles

### Reuse established text styles

When an appropriate typography style exists:

- Apply the actual Figma text style.
- Preserve its font family.
- Preserve its weight.
- Preserve its size.
- Preserve its line height.
- Preserve its letter spacing.

Avoid manually recreating an existing style.

### Semantic typography

Select styles based on their role.

Examples:

```text
Page title  → Heading/Large
Card title  → Heading/Small
Body copy   → Body/Default
Metadata    → Label/Small
```

These are examples only.

Follow the target design system's actual naming
and intended usage.

### New typographic treatments

When a design direction introduces typography
not represented by existing styles:

- Use raw typography properties.
- Preserve the intended hierarchy.
- Do not create a new text style.
- Do not modify existing text styles.
- Document significant deviations.

### Avoid false consistency

Do not force text into an inappropriate style
simply to eliminate raw values.

For example, a distinctive editorial treatment
may intentionally require a different size or weight.

That decision should remain exploratory until approved.

---

## 8. Spacing and Dimension Tokens

### Use established spacing conventions

Inspect existing spacing variables and patterns.

Prefer existing tokens for:

- Component padding.
- Gaps between elements.
- Section spacing.
- Layout gutters.
- Repeated content spacing.

### Use native auto layout

Apply spacing through:

- Parent padding.
- Auto layout gaps.
- Appropriate alignment.
- Flexible sizing behavior.

Do not use manually positioned layers to reproduce
spacing values.

See [Auto Layout](auto-layout.md).

### New spacing values

If the intended spacing does not map appropriately
to an existing token:

- Use the raw numeric value.
- Do not round automatically to the nearest token.
- Do not create a new spacing variable.
- Document meaningful deviations.

### Fixed dimensions

Existing dimension tokens may be appropriate for:

- Icons.
- Avatars.
- Controls.
- Navigation rails.
- Other standardized elements.

Do not force every width or height into a token.

Content-driven dimensions should use appropriate
Hug or Fill behavior.

---

## 9. Radius, Border, and Effect Tokens

### Corner radii

Use existing radius variables where appropriate.

Preserve intentional differences between:

- Cards.
- Buttons.
- Inputs.
- Badges.
- Containers.

Do not normalize all corners to one radius
unless the design explicitly calls for it.

### Borders

Reuse established border colors and widths
where semantically appropriate.

Avoid inventing new border treatments when
existing ones fulfill the same role.

### Effects

Reuse established effect styles where appropriate.

Do not introduce arbitrary shadows, blurs,
or elevation treatments.

If a new effect is essential to the design,
keep it as a raw property and document it.

---

## 10. Component Tokens and Properties

Components often encode design system decisions
that should not be recreated manually.

### Prefer component instances

Use existing components for:

- Buttons.
- Inputs.
- Select controls.
- Navigation elements.
- Badges.
- Avatars.
- Cards.
- Other established patterns.

Configure supported variants and properties.

### Preserve component integrity

Do not:

- Detach instances unnecessarily.
- Replace component internals with primitives.
- Modify shared component definitions.
- Override values that should be controlled by variants.
- Break existing variable bindings.

### Exploratory component variations

When a new design requires a variation that
existing components cannot support:

1. Determine whether an existing variant is suitable.
2. Preserve the intended design if no variant fits.
3. Construct an editable local structure.
4. Reuse appropriate tokens and styles.
5. Keep new values raw.
6. Document the proposed variation.

Do not create or publish a new library component
without authorization.

---

## 11. External References and Prototypes

When translating designs from:

- HTML/CSS.
- React prototypes.
- Screenshots.
- Other Figma files.
- Design exploration artifacts.

Do not assume their values correspond directly
to the target design system.

### Mapping process

1. Inspect the source design.
2. Extract relevant visual properties.
3. Inspect the target design system.
4. Identify appropriate semantic mappings.
5. Apply existing tokens and styles.
6. Preserve genuinely new properties as raw values.
7. Document important differences.

### CSS variables are not Figma tokens

For example:

```css
--card-background: #FFFFFF;
```

does not prove that a corresponding Figma variable exists.

Verify the mapping before applying or reporting it.

### Fidelity versus system consistency

Prefer a solution that preserves both.

When they conflict:

- Do not silently change the source design.
- Do not force an inappropriate token.
- Identify the conflict.
- Use a raw value when justified.
- Document the decision.

---

## 12. Do Not Create Tokens Without Authorization

Creating a design does not automatically authorize
changes to the design system.

Unless explicitly requested, do not:

- Create variables.
- Create variable collections.
- Create variable modes.
- Create color styles.
- Create text styles.
- Create effect styles.
- Rename existing tokens.
- Modify token values.
- Delete or deprecate tokens.
- Publish library updates.

### Exploratory values stay raw

New design decisions should remain local to the
exploration until reviewed.

A designer may later decide to:

- Adopt the new value.
- Map it to an existing token.
- Create a new token.
- Reject the deviation.

That decision is outside the scope of construction.

---

## 13. Verification

After constructing designs, verify token usage.

### Existing tokens

Check that:

- Appropriate existing variables are bound.
- Appropriate text styles are applied.
- Component instances preserve their properties.
- Semantic token usage is correct.
- Variable modes behave as intended.

### Exploratory values

Check that:

- New values remain raw.
- No unauthorized variables or styles were created.
- Existing tokens were not modified.
- Significant deviations are documented.

### Visual consistency

Check:

- Typography hierarchy.
- Color relationships.
- Spacing rhythm.
- Surface treatments.
- Component consistency.
- Contrast and legibility.

### Integration limitations

If the Figma integration cannot inspect or verify
bindings, modes, or styles:

- Report what could not be verified.
- Distinguish actual bindings from intended mappings.
- Do not claim full design system compliance.

---

## 14. Common Anti-Patterns

### Matching values instead of binding tokens

**Problem:** A card uses the same hex value as
`surface/default`, but the fill is raw.

**Better:** Apply the actual semantic variable binding.

### Inventing tokens during exploration

**Problem:** Every new spacing or color value becomes
a new Figma variable.

**Better:** Keep exploratory values raw until approved.

### Choosing tokens by numerical similarity

**Problem:** A 22px gap is automatically replaced
with a 24px spacing token.

**Better:** Preserve 22px if it is an intentional
design decision.

### Using the wrong semantic token

**Problem:** A white background uses `text/inverse`
because both resolve to white.

**Better:** Use the appropriate surface token.

### Recreating existing components

**Problem:** A button is reconstructed from a rectangle,
text layer, and icon.

**Better:** Use the existing Button component and
its supported properties.

### Hardcoding theme-specific colors

**Problem:** A design looks correct in light mode
but does not respond to dark mode.

**Better:** Use semantic variable bindings and
verify mode behavior.

### Forcing every property into the system

**Problem:** New design ideas are compromised because
every value must map to an existing token.

**Better:** Use existing tokens where appropriate
and raw values where necessary.

---

## 15. Completion Checklist

Before completing construction, confirm:

- [ ] Existing design system foundations were inspected.
- [ ] Appropriate existing tokens were reused.
- [ ] Actual variable bindings were applied where supported.
- [ ] Typography styles were applied correctly.
- [ ] Existing component instances were preserved.
- [ ] Variable modes were respected.
- [ ] New exploratory values remain raw.
- [ ] No unauthorized tokens or styles were created.
- [ ] Existing design system assets remain unchanged.
- [ ] Significant deviations were documented.
- [ ] Token usage was verified where supported.
- [ ] Any integration limitations were reported.

## Definition of Done

A design system-aware Figma construction:

- Uses established tokens according to their meaning.
- Preserves actual variable and style bindings.
- Respects component architecture.
- Supports intended variable modes.
- Allows legitimate design exploration.
- Keeps new values raw until approved.
- Does not introduce unauthorized system changes.
- Clearly distinguishes verified mappings from assumptions.

**Design system consistency should support exploration,
not prevent it.**