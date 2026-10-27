# Source of truth

Decides which side wins when Figma and code disagree. In v1 the sync runs Figma to code, so "Figma" rows are synced and "Code" rows are protected. Record project-specific overrides in `design-sync/config.json` under `ownership`.

| Area | Owner | Notes |
|---|---|---|
| Primitive token values (color, space, radius, size, opacity) | Figma variables | |
| Semantic token names and alias chains | Figma variables | Keep aliases as references in code, not resolved values. |
| Mode values (light/dark, density, brand) | Figma variable modes | Code decides how modes are switched (class, attribute, media query). |
| Typography (family, weight, size, line height, tracking, case) | Figma text styles and typography variables | Code owns font loading. A new family or weight with no font file is `blocked`. |
| Effects (shadows, blurs) | Figma effect styles | |
| Component anatomy, child order, visual structure | Figma | |
| Component layout (direction, gap, padding, alignment, sizing) | Figma | |
| Visual variants and visual states (hover, pressed, disabled, error) | Figma | |
| Prop names and public component API | Code | Figma property changes that need a new, renamed, or removed prop are `needs-decision`. |
| Behavior, events, focus, keyboard, ARIA, HTML semantics | Code | Never changed to match a picture. |
| Responsive behavior between Figma frame sizes | Code, informed by Figma | Figma shows sample sizes, not breakpoints. |
| Code-only tokens (z-index, breakpoints, motion, durations) | Code | Leave alone unless Figma has an equivalent. |
| Copy and content | Neither | Out of scope. |

## Conflicts

- Figma changes a Figma-owned area: sync it.
- Figma changes a code-owned area: record a `needs-decision` row with what Figma implies and what code does now. Do not edit.
- Ownership unclear: `needs-decision`. Do not guess.

## Toward two-way sync

A later code-to-Figma direction would flip the protected rows: code-owned areas could inform Figma documentation and component properties, while Figma-owned areas stay protected in that direction. Keep the table explicit so that change only needs new rules, not a new model.
