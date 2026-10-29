# Prototype contract

A few attributes in the comparison prototype let `scripts/check-prototype.mjs` click through every direction before it is published, and let construction take reference screenshots without guessing. They add nothing visible.

| Attribute | On | Meaning |
|---|---|---|
| `data-direction="D1"` | Each switcher control | Activates that direction. Mark the active one with `aria-selected="true"` (tabs) or `aria-pressed="true"`. The id matches `screen` in the round file. |
| `data-direction-panel="D1"` | The container for one direction | Hidden (`hidden` or `display: none`) when not active. One panel per direction. |
| `data-check="filter"` | Each primary interaction control | A name for the interaction. The checker uses it and expects the direction to change in response. |
| `data-check-action` | Optional, on the same control | `click` (default), `type`, `select`, `key`, or `drag`. Inputs default to `type`, selects to `select`. |
| `data-check-value` | Optional | Text to type, option to select, or key to press. |
| `data-mode="dark"` | Each mode toggle control | Switches the mode (light, dark, density). Used for screenshots. |
| `<script type="application/json" id="exploration-round">` | Once per page | The round file (see round-file.md). |

Number keys 1 to 9 switch directions when focus is not in a text field.

## Controls

The prototype is hand-written HTML, so it has no component instances. Unless a direction says otherwise, its controls must still match the system's components. Otherwise they fall back to browser and generic defaults, and every direction inherits the same flaws.

- **Define controls once.** Put Select, Input, Button, and any other system controls the screen uses in one shared block of CSS classes (and markup helpers if useful) that every direction uses. Directions may restyle a control only when that is part of their hypothesis, and then list it in the round file's `departures`.
- **Take the anatomy from the source.** Height, padding on each side, gap, icon size, radius, stroke, and type come from the app's component code when it is available, otherwise from the Figma main component (read its auto layout and children). If neither is available, say so and note the values as assumptions.
- **Mirror the structure, not just the look.** A control with a trailing icon is label, gap, icon, with right padding that clears the icon. Do not reuse symmetric text-input padding.
- **No native select chrome.** Use `appearance: none` on `select` and draw the system's chevron, positioned to match the component, with `padding-right` equal to edge padding + icon width + gap. A native arrow ignores the system's spacing. Mark a deliberate native select with `data-native`.

## Interactions that need more than one control

Some interactions need a sequence or a drop target, such as dragging a card between columns. List them in the round file's `checks` instead of, or alongside, `data-check`:

```json
"checks": [
  { "name": "move card to Interview", "action": "drag", "target": "[data-card='acme']", "to": "[data-column='interview']", "directions": ["D1", "D2"] },
  { "name": "open details", "action": "click", "target": "[data-card='acme']", "expectIn": "body" }
]
```

`directions` limits a check to some directions (default: all). `expectIn` is where the change should appear when it happens outside the direction panel, such as a dialog appended to `body`.

## What the checker verifies

For every direction: number key and click switching, that the direction renders real content, that every primary interaction changes the page, a visible focus style on the first controls reached with Tab, that selects have no native chrome and leave room for their chevron, and no uncaught or console errors. With `--shots`, it saves `<direction>-<viewport>-<mode>.png` for every viewport and mode, which go into the build manifest as frame references.

It does not judge whether an interaction did the right thing, only that it did something. Hover states, motion, and data persistence across directions are still checked by looking.
