# Inspection checklist

Use relevant sections; this is not a requirement to crawl every node. Record observed properties and identifiers, not just visual judgments.

## Read mechanics

Follow "Reading Figma" in [conventions.md](conventions.md): one category per call, text styles read separately with their bindings, aliases recorded by name (with opacity when present), values inside nested instances marked `unverified`, and no findings for gaps on single-child frames.

## File, system, and coverage

- File identity/version if exposed; pages, target frame/node IDs, dimensions, relevant states and flows.
- Local versus remote/library assets; accessible library names/keys and provenance. Note unavailable or unpublished sources without importing anything.
- Documented conventions versus recurring patterns inferred from samples. Resolve conflicts using explicit project guidance and authoritative system sources; otherwise preserve the conflict as an open question.
- Included pages, samples, omitted areas, pagination, access/tool limitations, and baseline age.

## Components and instances

- Component/set ID or key and name; local/remote status; instance-to-main-component link where exposed.
- Variant axes and supported combinations; text, boolean, instance-swap and other exposed properties; nested instances and slot conventions.
- Overrides, detached copies, raw lookalikes, state coverage, disabled/loading/error behavior where present. Similar appearance is not proof of shared provenance.
- Reuse candidates, intended use, sizing behavior, constraints and known limitations. Distinguish an unavailable main component from an orphaned instance.

## Variables, collections, and modes

- Collection/variable IDs, names, types, scopes, descriptions and exposed publication status.
- Available mode IDs/names, collection default, explicit mode assignments on target/ancestors, and resolved effective mode where exposed. A collection's default does not prove the selected frame uses it.
- Alias chains, cross-collection references and mode-specific values for relevant tokens. Resolve aliases only with available evidence; detect cycles or missing targets and mark unresolved values.
- Bindings on fills, strokes, spacing, dimensions, radii, typography and other supported properties. Separate variable bindings, style references, and raw literals.
- Semantic versus primitive conventions, theme/density/localization modes where present. Do not invent dark mode, spacing scales, or token relationships from visual similarity.

## Styles and visual foundations

- Text, paint, effect and grid styles: IDs, names, library origin, applied references, and relevant resolved properties.
- Typography family, weight/style, size, line height, letter spacing; missing fonts where the API reports them.
- Color roles, borders, radii, shadows, icon and imagery conventions; consistency with existing bindings.
- Apparent duplicates or conflicting sources: report evidence and impact without consolidating or renaming.

## Auto layout and resizing

- Parent/child hierarchy and frame purpose; layout direction, wrapping, gap, padding, alignment, distribution and relevant layout model (including grid if exposed).
- Hug/fill/fixed sizing by axis, min/max dimensions, grow/stretch behavior and dependencies on parent size.
- Constraints outside auto layout, absolute children, clipping, overflow, scrolling, text wrapping/truncation, visibility and stacking order.
- Distinguish legitimate overlays/decorations from accidental absolute positioning. Inspect narrow/wide frames and existing content-length variants when available.
- Label responsiveness inferred from properties versus demonstrated by existing frames; do not claim runtime validation from a static tree.

## Interaction and accessibility evidence

- Existing component states, prototype connections, reading order, labels, focus treatment, hit-target dimensions, contrast where measured, and error communication when relevant.
- Describe what is visible or measurable in Figma. Keyboard behavior, screen-reader semantics and production interactions require other evidence.
