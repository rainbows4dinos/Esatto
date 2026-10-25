# Machine-readable baseline

Save the baseline as JSON next to the report so exploration, construction, and design system sync can reuse it instead of reading Figma again. Name it `figma-baseline.json`, in the location the user asked for or the project folder; in a session without a persistent folder, send it as a file with the report.

A category that was not inspected is left out. An empty object means it was inspected and nothing exists. Never write an empty object for something you did not read.

```json
{
  "file": { "key": "abc123", "name": "nextchapter", "inspectedAt": "2026-10-25", "version": "not exposed" },
  "scope": {
    "question": "Can the dashboard redesign reuse the existing cards?",
    "nodes": ["92:5175", "216:20442"],
    "coverage": "Components page, all 24 sets; Dashboard frame 310:2 at desktop, light mode only",
    "notInspected": ["Icons page", "dark mode rendering"]
  },
  "variables": {
    "Theme": { "modes": ["Light", "Dark"], "vars": { "surface/default": ["@neutral/50", "@neutral/900"] } }
  },
  "textStyles": { "Type/Body/Default": { "family": "Inter", "style": "Light", "size": 16, "lineHeight": 24, "letterSpacing": 0, "bound": { "fontSize": "@font-size/base" } } },
  "effectStyles": { "shadow/sm": "drop 1 1 0 0 @border/control" },
  "paintStyles": {},
  "components": {
    "Prospect Card": { "key": "f808...", "nodeId": "216:20442", "axes": { "State": ["Default", "Hover"] }, "props": {}, "nested": ["Company Avatar", "Status-Badge"] }
  },
  "findings": [
    {
      "id": "F-01",
      "area": "components",
      "status": "observed",
      "node": "216:20442",
      "summary": "Hover variant bottom-aligns the header row; Default centers it.",
      "effect": "Company name shifts 6px on hover.",
      "next": "Designer: set Hover to center."
    }
  ]
}
```

- `variables`, `textStyles`, `effectStyles`, `paintStyles`, and `components` use the same format as `lr-design-system-sync`'s `figma-inventory.json`. If that skill is installed, its `scripts/figma/read-inventory.js` and `scripts/figma/hygiene-scan.js` produce them; both are read-only.
- Values: `#rrggbb` or `#rrggbbaa`, numbers in px, `@name` for an alias, `@name 80%` for an alias with opacity. Line height is px, `N%`, or `auto`.
- Finding `status` is `observed`, `inferred`, `proposed`, `unknown`, or `unverified` (a value the API cannot read, such as a binding inside a nested instance). `area` is `components`, `variables`, `styles`, `layout`, `accessibility`, or `conventions`.
- Every finding has a node, component key, variable or style name, or says `"node": "screenshot only"`.
