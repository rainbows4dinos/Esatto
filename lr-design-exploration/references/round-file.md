# Round file

Each exploration round is saved as data, so a later session can seed from it, construction can start from it, and the comparison does not depend on this conversation still being available.

## Where it goes

- **Inside the prototype.** Embed the round in the comparison artifact as `<script type="application/json" id="exploration-round">…</script>`. Whoever has the prototype link has the round. Escape `</` in the JSON as `<\/`.
- **As a file** when there is a project folder: `explorations/<slug>/round-<n>.json`, beside the prototype source. A slug is a short name for the exploration, such as `dashboard`.

## Format

```json
{
  "exploration": "dashboard",
  "round": 2,
  "date": "2026-10-25",
  "settings": "Settings: 3 directions · intensity [1, 2, 2] · focus all · fidelity prototype · seed: D",
  "brief": "Recruiters scanning 40+ prospects need to spot stalled ones without opening each card.",
  "sourceContract": ["all prospect fields stay visible on the card", "status labels and colors are fixed (Status-Badge)", "brand serif for headings"],
  "baseline": "Figma 216:20442 (Prospect Card), inspected 2026-10-24",
  "seed": { "round": 1, "direction": "D", "preserved": ["column per stage", "age shown as a bar"], "change": "make stalled cards impossible to miss" },
  "directions": [
    {
      "id": "D1",
      "name": "Fields",
      "intensity": 1,
      "lead": "visual",
      "lineage": "original → D → D1",
      "hypothesis": "For recruiters scanning the board, tinting each stage as a color field will make stalled cards stand out because the eye compares against a uniform ground.",
      "mechanism": "Stage tints plus a contrasting age bar.",
      "tradeoffs": ["less room for status colors", "tints need a dark-mode pair"],
      "departures": ["stage tint values are exploratory, nearest token surface/raised"],
      "signature": ["flat stage fields", "age bar under the title"],
      "screen": "d1"
    }
  ],
  "recommendation": { "direction": "D2", "why": "…", "counterargument": "…", "nextValidation": "five-second test with 5 recruiters" },
  "prototype": { "url": "https://claude.ai/...", "file": "explorations/dashboard/round-2.html" },
  "selected": null
}
```

- `screen` is the id the prototype's direction switcher uses, so construction can open the right tab for reference screenshots.
- `selected` stays `null` until the user picks a direction. A recommendation is not a selection.

## Seeding from a round

Read the round from the file, or from the prototype link (read the artifact, then parse the `exploration-round` script). Take the seed's direction card, lineage, and source contract from it rather than reconstructing them from memory. If neither is available, ask for the link; reconstructing from the conversation is the last resort and is said so.
