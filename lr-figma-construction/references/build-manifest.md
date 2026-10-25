# Build manifest

The build list lives in a file, so a long build survives a lost session and "every frame verified" can be checked rather than claimed. Write it before the first Figma write and update it as each frame changes status.

Save it as `figma-build/<destination-name>.json` in the project folder. In a session without a persistent folder, keep it in the working directory and send it with the final report. When an exploration handoff already includes a manifest, start from it.

```json
{
  "source": "Dashboard exploration round 2, prototype https://claude.ai/... ",
  "destination": { "fileKey": "abc123", "page": "Explorations / Dashboard", "pageId": "301:2" },
  "agreed": "2026-10-25: all directions x desktop + phone x light + dark; phone hover states deferred",
  "directions": {
    "D2": { "name": "Fields", "signature": ["numbered stage connectors", "tabular numerals in totals", "flat color fields per stage"] }
  },
  "frames": [
    {
      "id": "D2-desktop-dark",
      "direction": "D2",
      "viewport": "desktop 1440",
      "mode": "Dark",
      "state": "default",
      "required": true,
      "status": "verified",
      "nodeId": "301:88",
      "reference": "references/d2-desktop-dark.png",
      "checks": {
        "visual": "matches reference; long company names wrap to 2 lines as in prototype",
        "structure": "all colors bound; 0 raw fills; instances linked",
        "signature": "3 of 3 present"
      },
      "fixPasses": 1,
      "gaps": []
    }
  ],
  "proposals": [
    { "what": "stage field color #F3EDE4 (light) / #2A2431 (dark)", "nearest": "surface/raised", "why": "no token matches both modes; agreed stand-in: raw values on a local style" }
  ]
}
```

## Frame status

| Status | Meaning |
|---|---|
| `pending` | Agreed, not built. |
| `built` | Built, not yet compared with its reference. |
| `verified` | Visual, structure, and signature checks recorded and passing. |
| `deferred` | Out of scope by agreement with the user. Needs the date or message it was agreed in. |
| `blocked` | Cannot be finished (missing font, unavailable library asset, tool limit). Needs the reason. |

## Rules

- Every frame in `frames` exists before building starts. Frames found later are added with a note, not built silently.
- `checks` records what was actually compared. A screenshot taken but not compared is not a check.
- Stop after two fix passes on a frame; set it `blocked` with what remains, or `verified` if it passes.
- Finishing requires no `pending` or `built` frames. The report gives counts by status and lists every `deferred` and `blocked` frame with its reason.
