---
name: lr-figma-construction
description: Build editable, structurally sound Figma designs from a prototype, exploration, screenshot or spec, using the existing design system, components, variables and native auto layout. Use when asked to put a design into Figma, build or rebuild frames, or turn an exploration direction into editable layers.
---

# Figma Construction

Turn a source design into native, editable Figma layers that look right and behave right. Use `lr-figma-inspection` for the baseline and `lr-design-exploration` handoffs as input when available; otherwise apply the same principles directly. The goal is a file a designer can keep working in, matched to the source and verified frame by frame.

Shared rules for evidence, Figma reads, value notation, tokens, strokes, and handoff files are in [conventions.md](references/conventions.md); read it once per session before the first Figma read or write.

## Boundaries and destination

Write only to the destination the user authorized: a named page, section or new file. When none is named, propose one (a separate page or section beside the source) and confirm before writing. Never modify source frames, shared components, variables, styles or published libraries as a side effect. Do not create tokens or styles, add variants to existing components, or publish anything without explicit authorization. Exploratory structures stay local to the destination and are labeled as such.

Before the first `use_figma` call, read Figma's `figma-use` skill, and before the first visible write also read `figma-generate-design`; pass both in `skillNames`. Read `figma-generate-library` as well if the user authorizes new library components. Inspect the tools actually available; do not invent tool names or assume capabilities.

## Agree a build list before building

From the source and any handoff, write a build list: every frame × viewport × mode the source has, plus the components and states needed. Save it as a manifest file in the format in [build-manifest.md](references/build-manifest.md) and update each frame's status as it changes. If a manifest already exists (a resumed build, or one from an exploration handoff), continue from it. Default to building every mode the source supports. When colors are bound to variables, a second mode is a duplicate with the mode switched, and it also tests the bindings, because any raw value that should have been a variable shows up wrong. Viewports that need real layout work (such as phone from desktop) are built when the source has them; if that is too large for one pass, say so before building and agree what is deferred. Scope is settled at the start, never discovered in the final report.

For each direction, list its signature details: the distinctive treatments that make it that direction (restyled controls, connectors, numerals, shadows, color fields, motion stand-ins). Take them from the direction card and the prototype. This list is checked frame by frame during verification.

## Map before drawing

Inspect the target file's components, variables, styles and modes, or reuse a recent inspection (its `figma-baseline.json` when there is one) after rechecking anything material. Map each source element to an existing asset, a configuration of one, or a new local structure, choosing tokens by semantic role, never by matching values. Read [construction-rules.md](references/construction-rules.md) before mapping; its Components and Tokens sections govern reuse and bindings.

**Fidelity over reuse in explorations.** When an existing component can match the direction through its properties, use it. When it cannot, build a local exploratory variant or structure that does, and flag it as a proposal. Never substitute the library default when that changes how the direction looks; a direction rebuilt from default parts is a different direction. Values the direction introduced (type sizes, colors, radii, shadows) stay as labeled raw values, with the nearest existing token noted. A raw value cannot change between modes, so when the source uses a different value per mode (a surface that is light gray in one mode and dark in the other) and no existing token matches both, flag it as a token proposal while mapping, before building, and agree a stand-in. Do not discover it in the second mode's screenshot.

## Build in stages

Build one frame at a time: the frame and its auto layout skeleton first, then one region at a time, taking a screenshot after each region to catch problems early. Follow the Layout section of construction-rules.md for structure and sizing. Use nested auto layout for content flow; absolute positioning is for genuine overlays and decorative details such as connectors, badges or corner marks, and those details are still built. Name layers semantically. Keep text editable and image fills from their source.

After placing instances, audit every exposed property: text still at a default value (“Label”, “Button”, placeholder copy), instance-swap slots still on their default icon, and boolean layers shown or hidden by default rather than by intent. Searching the frame for default strings is a quick first check. Include variant properties that depend on mode or viewport, such as a theme switch, nav size or mobile state: a frame duplicated into another mode must have them set to match. Icons and vectors imported into new local components often arrive with a hard-coded default color, usually black; bind their fills to the appropriate text or icon token so they read in every mode.

When adding a viewport variant to a local component by cloning an existing variant, re-link its component property references (text, boolean, instance swap) and confirm that instances switched to the new variant keep their overrides; cloned variants can silently fall back to default text.

Missing fonts, unavailable library assets, or images that cannot be placed are reported at the point they occur, with the substitution made, not discovered later.

## Verify every frame

For every frame in every mode, take a screenshot and compare it with the source in the same state, viewport and mode. Check content, hierarchy, spacing, type, color, wrapping and each signature detail on the list. Then check structure against the verification checklist in construction-rules.md: layer types, instance links, variable and style bindings, sizing behavior, and no stray rasters or flattened text. Fix what differs, then check again; stop after two fix passes and report what remains. Record each frame's checks and status in the manifest as you go, not at the end.

A gap is reported only when it is blocked by a tool limitation, an unavailable asset, or the agreed scope. Anything fixable within scope is fixed, not listed.

## Report

Return:

- Links to the destination and each frame, by direction, viewport and mode.
- A mapping table: element, existing asset or local structure, bindings, and any proposed extension.
- Exploratory values and local components, labeled as proposals.
- The checks actually performed, frame by frame, and anything deferred by agreement.
- Remaining gaps with the reason each could not be closed.
- Confirmation that the source frames and shared library assets were not changed.

Do not claim responsive behavior, multi-mode support or editability that was not verified. Do not finish while any manifest frame is `pending` or `built`; lead the report with frame counts by status and attach the manifest.
