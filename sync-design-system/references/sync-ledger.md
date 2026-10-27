# Sync ledger

The ledger lives at `design-sync/ledger.md` in the target repo and is committed with the code, rendered from `design-sync/ledger.json`. Update the JSON, then re-render; never hand-edit one without the other.

The `design-sync/` folder after an audit:

```text
design-sync/
├── config.json             paths, conventions, naming exceptions, batch size, mirror on/off
├── figma-inventory.json    snapshot of Figma variables and styles at audit time
├── component-map.json      Figma component to code links
├── ledger.json             rows (machine-readable)
├── ledger.md               rows and inventory (rendered)
└── scripts/                copied from the skill: token-diff, text-style-check, ledger, shot, ...
```

The ledger is how progress survives across sessions and how skipped items stay visible.

## Template

```markdown
# Design sync ledger

- Figma file: <name> (<fileKey>)
- Figma last modified: <timestamp>
- Audit run: <date>
- Direction: Figma to code

## Inventory

| Category | Figma count | Ledger rows | Synced | Open |
|---|---|---|---|---|
| Variables | 142 | 18 groups (142 vars) | 0 | 18 |
| Text styles | 14 | 14 | 0 | 14 |
| Effect styles | 4 | 4 | 0 | 4 |
| Paint styles | 2 | 2 | 0 | 2 |
| Components | 23 | 23 | 0 | 23 |

## Rows

| ID | Category | Item | Figma ref | Code ref | Class | Status | Notes |
|---|---|---|---|---|---|---|---|
| V-01 | Variables | color/text/* (6) | VariableCollectionId:1:2 | tokens.css | value-drift | pending | |
| T-03 | Text styles | Heading/Large | S:abc... | typography.css | missing-in-code | pending | |
| C-07 | Components | Card | key c0ffee / 12:34 | src/components/Card.tsx | structure-drift | pending | |
```

Each component row also gets a section below the table holding its checklist and verification evidence:

```markdown
### C-07 Card

- [x] Layout: gap 12 -> space/300 (16)
- [x] Anatomy: footer moved below body
- [ ] Typography: title uses Heading/Small, code uses .text-body-strong
- [needs-decision] Figma adds "Elevated" variant; code has no prop

Evidence: screenshots in design-sync/evidence/card-*.png, typecheck pass
```

## Statuses

| Status | Meaning | Needs |
|---|---|---|
| `pending` | Not done yet. | Nothing. Blocks completion. |
| `synced` | Code matches Figma for this item. | Evidence for components; output location for tokens. |
| `skipped` | Deliberately not synced. | Reason. |
| `blocked` | Can't proceed (missing font, build error, missing access). | Reason and what unblocks it. |
| `needs-decision` | Code-owned area affected, rename unconfirmed, ownership unclear. | The question for the user. |
| `needs-figma-fix` | Figma hygiene problem. | Node ID and the fix. |
| `fixed-in-figma` | Hygiene problem fixed in Figma, by the agent with approval or by the designer. | Who fixed it, what changed, and any value change flagged for review. Re-read Figma to confirm before closing. |

Rules:

- Never delete a row. Re-audits add rows and reopen changed ones.
- Update the row when the item finishes, then update the inventory table.
- Before reporting, ledger rows per category equal the Figma counts, and `pending` is zero or explicitly reported as remaining.

## Figma mirror (optional)

A read-only copy of the ledger on the Figma canvas, so designers can see sync status next to the components. Turn it on with `"mirror": true` in config, or when the user asks.

- The code ledger stays the source of truth. The mirror is generated from `ledger.json` on each run, and edits made on the canvas are overwritten. Designers who want to change a status tell the agent or edit the ledger.
- Build it with `python3 design-sync/scripts/ledger.py mirror`, which writes `design-sync/mirror.generated.js` from `ledger.json` and `config.json` `mirrorStyle`. Pass that file as the `use_figma` code, unedited. It removes the old frame and rebuilds it in one retry-safe call, and returns the row count and any `fallbacks` (variables, text styles, or badge it could not find). Report fallbacks; do not patch the canvas by hand. Targeted edits drift from the ledger.
- Write only to a dedicated page named `Sync status` in the library file, inside one frame named `Design sync ledger`. Never touch other pages or design system nodes.
- Build it with native auto layout and the library's own assets: bind fills, strokes, and padding to existing variables, use existing text styles, and use the system's status or badge component for statuses if it has one. Do not create new variables, styles, or components for the mirror. Raw values only where the system has nothing suitable.
- Order: header (file, direction, date, code commit, a note that edits are overwritten), status totals, the inventory table, then **Fix in Figma** (`needs-figma-fix` rows), then **Needs a decision or blocked**, then the full rows by category. Designers should see their action items without scrolling past synced rows.
- After agent hygiene fixes, the Fix in Figma section becomes Fixed in Figma with the same rows, so designers can see what changed in their file.
- Status colors: synced and fixed-in-figma green, pending gray, skipped neutral or accent, needs-decision amber, blocked and needs-figma-fix red. Always show the status text, not color alone.
- Make each Figma node ID a node hyperlink (`setRangeHyperlink` with `{ type: 'NODE', value: id }`) so designers can click straight to the component.
- Read Figma's `figma-use` skill (and `figma-generate-design`, which it requires for visible changes) before writing. Text style assignment is async (`setTextStyleIdAsync`), and fonts for every style used must be loaded first.
- Confirm the page and frame names with the user on the first run, unless they already asked for the mirror by name.
- Verify with one screenshot of the frame, and check that the returned `uniqueRows` equals the ledger row count.
