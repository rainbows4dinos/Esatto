# Esatto

Design agent skills by [rainbows4dinos](https://github.com/rainbows4dinos). *Esatto* is Italian for "exactly": the skills check their work against the source instead of claiming it.

Four Claude Code skills for product design work in Figma: inspect an existing design, explore alternative directions, build the chosen direction as editable Figma layers, and sync the design system into code.

They are written to work inside an existing design system rather than around it. Reuse existing components and variables, keep new decisions exploratory until someone approves them, and never change production designs as a side effect.

## The skills

| Skill | What it does | Changes Figma? |
|---|---|---|
| [`inspect-figma`](inspect-figma/SKILL.md) | Audits a Figma file or selection: components, variables and modes, styles, auto layout and conventions. Produces an evidence-backed baseline that separates observed facts from inferences and unknowns. | No. Read-only by design. |
| [`explore-directions`](explore-directions/SKILL.md) | Develops substantively different design directions, each with a testable hypothesis, rationale, tradeoffs and evaluation criteria, then prepares an editable Figma handoff. | Only when the request authorizes it. |
| [`build-in-figma`](build-in-figma/SKILL.md) | Builds designs in Figma from native, editable layers using existing components, tokens and nested auto layout. Agrees a build list of frames, viewports and modes first, then verifies every frame against the source. | Yes, within the authorized destination. |
| [`sync-design-system`](sync-design-system/SKILL.md) | Syncs Figma variables, text and effect styles, and components into a codebase, one item at a time, tracked in a ledger committed with the code so nothing is silently skipped. | Only the optional `Sync status` ledger page. |

They work best in sequence, but each one also stands alone. Each step saves a file the next one reads, so nothing has to be re-read from Figma or rebuilt from memory, and work can resume in a new session:

```
inspection         →  exploration          →  construction            →  design system sync
figma-baseline.json   round file              build manifest              design-sync/ledger.json
(what exists)         (in the prototype and   figma-build/<name>.json     (every token, style and
                      explorations/<slug>/)   (every frame and status)    component, with status)
```

| File | Written by | Read by |
|---|---|---|
| `figma-baseline.json` | inspection | exploration (system evidence), construction (mapping), sync (seeds `figma-inventory.json`) |
| Round file, embedded in the prototype as `#exploration-round` | exploration | the next exploration round (`seed:`), construction (direction cards, signature details) |
| `figma-build/<name>.json` | exploration handoff (all frames `pending`), construction | construction, to resume and to prove every frame was verified |
| `design-sync/ledger.json` | sync | sync, to resume; `ledger.py status` answers "where are we?" |

`sync-design-system` usually runs separately, whenever the Figma library changes and the code needs to catch up.

`explore-directions` refers to the other two by name and falls back to the same principles when they aren't installed.

## Quick start

Point the exploration skill at a design and say what you want to improve:

```text
Use explore-directions on the dashboard (Figma link).
```

If you haven't said how far to go, what can change, or how many directions you want, Claude asks first, in up to three quick multiple-choice questions with the defaults listed first. Settings you already gave, in plain language or as `intensity:` / `focus:`, are never asked again. After an earlier round, it also offers to start from one of the previous directions.

Before generating, Claude prints a settings line you can copy to rerun or tweak without any questions:

```text
Settings: 3 directions · intensity mixed (1, 2, 3) · focus all · fidelity prototype
```

The result is an interactive comparison of working prototypes, ready to hand off to Figma.

## Going further: exploration settings

Everything below is optional. Each setting can be typed directly, described in plain language, or left for Claude to ask about.

### Exploration intensity

`explore-directions` controls how far each direction departs from the current experience:

| Intensity | What it explores |
|---|---|
| **1 — Refine** | Hierarchy, typography, spacing, density and component usability while preserving existing workflows, information architecture and interaction patterns. |
| **2 — Rethink** | Alternative layouts, navigation, information architecture and interaction patterns while preserving core functionality and user goals. |
| **3 — Reinvent** | Fundamentally different concepts, workflows or visual languages while preserving underlying user needs, product goals and explicit requirements. Speculative functionality is labeled. |

**Mixed is the default.** For five directions, it produces **2 Refine, 2 Rethink and 1 Reinvent**. The default count is three: two uses one Refine and one Rethink; three uses one of each. Other counts approximate the 2:2:1 balance while keeping a useful range.

Specify a single level for all directions, choose Mixed, or assign a level to each direction:

```text
Explore five directions with intensity: 1
Explore five directions with intensity: 2
Explore five directions with intensity: 3
Explore five directions with intensity: mixed
Explore directions with intensity: [1, 1, 2, 2, 3]
```

A custom list assigns levels in order and sets the direction count unless you separately specify it. Conflicting counts or invalid levels are resolved before generating artifacts.

Natural-language overrides work too: “keep it close” selects Refine, “explore some alternatives” selects Rethink, “push the boundaries” selects Reinvent, and “give me a range” selects Mixed. Your explicit choices take precedence over defaults.

Each direction has a distinct, testable hypothesis and a meaningful user-facing difference, including directions at the same level. Each presents its intensity, rationale, expected benefit, tradeoffs and implementation cost, explaining what stays faithful and what changes. Different intensity labels or cosmetic changes alone do not establish diversity.

### Exploration focus

Intensity sets how far a direction departs. Focus sets which layers of the design it may change:

| Focus | What can change |
|---|---|
| `product` | Scope, features and what the product does for the user |
| `ux` | Task flow, information architecture, navigation and interaction model |
| `ui` | Layout, component choice, density, controls and states |
| `visual` | Typography, color strategy, spacing rhythm, shape language, imagery, iconography, motion and overall tone |
| `brand` | Identity: logo treatment, signature palette and typefaces, voice. Opt-in only. |
| `all` | Everything except `brand`. **The default.** |

Use one value or a list. Layers outside the focus stay as they are.

```text
Explore three directions with focus: visual
Explore five directions with intensity: 3, focus: visual
Explore directions with intensity: mixed, focus: [ui, visual]
Explore three directions with intensity: 2, focus: ux
Explore directions with focus: [visual, brand]
```

With the default `all`, each direction names a lead layer, and any set of three or more includes at least one direction that leads with a visual risk. Without `brand`, visual directions can change how brand assets are used but not replace them.

When `visual` is in focus, a coherent new visual language counts as a meaningful difference, and directions can use exploratory values outside the existing tokens. Those values are labeled as proposals.

Natural language works here too: “make it look different” or “restyle” selects `visual`, “different layouts” selects `ui`, “rethink the flow” selects `ux`, and “rebrand” adds `brand`.

### Iterating from a seed

When one direction stands out, make it the seed for the next round. The seed becomes the new baseline: its defining traits are kept, your note says what to change, and intensity and focus are measured from the seed instead of the original design.

```text
seed: D (artifact link). Explore three directions with a hard-edge style.
seed: D, keep: color fields and big counts, change: shape language
Start from direction B and simplify the flow, focus: ux
seed: [C, D]. Combine C's typography with D's color fields.
```

How a seeded round works:

- **Point to the seed.** Link the earlier exploration and name the direction, or say "start from D" in the same conversation. If the seed can't be opened, the skill asks for it or rebuilds it from its direction card and says so.
- **Seed contract.** The skill lists the traits that define the seed and keeps them by default. Use `keep:` and `change:` to be explicit; otherwise it infers them from your note and tells you what it inferred.
- **Original contract still applies.** Anything fixed in an earlier round, such as required content or navigation, stays fixed. A seed can't loosen it.
- **Narrower defaults.** Seeded rounds default to three directions at `intensity: [1, 2, 2]`, with focus inferred from your note ("hard-edge style" selects `visual`). Explicit settings override this.
- **Different readings.** Each direction interprets your note through a different mechanism, not as small steps of one idea.
- **Combining.** `seed: [C, D]` names which traits come from each direction, resolves conflicts, and reassesses the result.
- **Lineage.** Directions are named after the seed (D1, D2, D3) and each records its chain (original → D → D2). In the prototype, the seed is the control tab and the original design stays available. The seed's prototype code is reused, so data and interactions carry over.

### Output fidelity

By default, `explore-directions` delivers one interactive comparison artifact. You can switch between directions (and the baseline), each direction works on the same shared data, and the source's main interactions function: filters, drag and drop, expand and collapse, light and dark mode where the source has them.

| Fidelity | Output |
|---|---|
| `sketch` | Flows and wireframes |
| `static` | Rendered screen concepts |
| `prototype` | Working interactive prototypes in one comparison artifact. **The default.** |

```text
Explore three directions, focus: visual, fidelity: static
Give me quick wireframes for three directions
```

## Usage recipes

Name a skill directly ("Use explore-directions to…"), run it as a slash command in Claude Code (`/explore-directions`), or describe the task and let it trigger. Settings can go anywhere in the prompt.

**Same screen, bold new looks.** Keeps the structure and pushes the visual language.

```text
Use explore-directions on the dashboard (Figma link).
Explore four directions, intensity: 3, focus: visual.
Keep the layout structure and all content.
```

**The default, with a full range.** Uses Mixed intensity and `all` focus; at least one direction leads with a visual risk.

```text
Explore five directions for the settings page. Give me a range.
```

**A safe polish pass before shipping.**

```text
Explore three directions, intensity: 1, focus: [ui, visual].
We ship this week, so no flow changes.
```

**Fix the workflow, keep the look.**

```text
Users lose track of stalled requests. Explore three directions,
intensity: 2, focus: ux. Keep the visual design as is.
```

**Take a favorite further.**

```text
seed: D (artifact link). Explore three directions with a hard-edge style.
```

**A specific spread of directions.**

```text
Explore directions with intensity: [1, 2, 3, 3], focus: [ui, visual].
```

**Brand on the table.**

```text
Explore three directions, intensity: 3, focus: [visual, brand].
The logo can change; the product name stays.
```

**The full chain.**

```text
1. Use inspect-figma on (Figma link) and summarize the baseline.
2. Use explore-directions: four directions, intensity: mixed, focus: all.
3. I pick direction 2. Use build-in-figma to build it on a new
   page called "Exploration – Direction 2".
```

Run step 1 alone, then decide on the rest. Construction only writes to Figma when you ask it to.

**Tips**

- Say what must stay fixed ("all content", "the navigation"). It is the most useful constraint you can give.
- Fewer, more different directions beat many similar ones. Three strong directions usually beat five.
- If a run comes back too safe, follow up with "push direction 2 further visually" rather than starting over.

## Design system sync

Run `sync-design-system` from inside the codebase you want to sync. Ask in plain language, or call it directly with `/sync-design-system` followed by the request. The skill keeps its state in a `design-sync/` folder in that repo (config, Figma snapshot, component map, ledger), so any session can pick up where the last one stopped.

**Audit**

```text
/sync-design-system audit this codebase against the Figma library
https://www.figma.com/design/<fileKey>/<fileName>
```

**Audit with the optional Figma steps**

```text
/sync-design-system run an audit, fix any Figma hygiene issues that match
the scale exactly, and mirror the ledger to the Sync status page
```

Hygiene fixes bind unbound padding, gap and radius values to existing variables. Only exact matches are bound; anything off-scale is left for you. The mirror is a read-only copy of the ledger on a `Sync status` page in the library file.

**Token sync**

```text
/sync-design-system sync tokens and text styles from the ledger
```

**Component sync**

```text
/sync-design-system start component sync with the next batch
/sync-design-system sync Button and Chip only
/sync-design-system continue from the ledger
```

`continue from the ledger` is how you resume in a new session. The agent reads `design-sync/ledger.md` and starts at the first `pending` row.

**Decisions**

```text
/sync-design-system for the open decisions: add typography primitives,
skip Avatar, build Company Avatar
```

**After changing Figma**

```text
/sync-design-system I updated Button and Alert in Figma, re-audit what changed
```

**Status**

```text
/sync-design-system what's left in the ledger?
/sync-design-system refresh the Figma mirror
```

**Helper scripts**

The skill ships its scripts in `sync-design-system/scripts/` and copies them to `design-sync/scripts/` in your repo at setup, so every project runs the same tested code. The agent runs them, but you can too, from the repo root:

```bash
python3 design-sync/scripts/ledger.py status            # counts, open rows, next batch
python3 design-sync/scripts/token-diff.py               # every Figma variable vs. the token CSS, per mode
python3 design-sync/scripts/text-style-check.py         # text styles vs. type tokens, and loaded font weights
python3 design-sync/scripts/ledger.py set C-07 synced --evidence design-sync/evidence/batch-3
python3 design-sync/scripts/bump-cache.py 20261025-batch-3 --git   # ?v= revisions, following the import chain
python3 design-sync/scripts/ledger.py mirror            # code for the Figma ledger mirror
```

`ledger.md` is rendered from `ledger.json` and refuses to render when row counts stop matching the Figma inventory. See [the scripts README](sync-design-system/scripts/README.md) for the config keys.

## What's inside

Each skill is a folder with a `SKILL.md` and supporting references that Claude reads when relevant:

```
inspect-figma/
├── SKILL.md
└── references/
    ├── inspection-checklist.md
    ├── report-template.md
    └── baseline-json.md         machine-readable baseline format
explore-directions/
├── SKILL.md
└── references/
    ├── direction-framework.md   how to form and evaluate directions
    ├── figma-handoff.md         what a buildable handoff must include
    ├── round-file.md            saving a round so later rounds and sessions can seed from it
    └── prototype-contract.md    attributes the prototype checker relies on
└── scripts/
    └── check-prototype.mjs      clicks through every direction before publishing
build-in-figma/
├── SKILL.md
└── references/
    ├── construction-rules.md    layout, components, tokens, anti-patterns, verification checklist
    └── build-manifest.md        frame list and status file
sync-design-system/
├── SKILL.md
└── references/
    ├── source-of-truth.md       which side owns each area
    ├── drift-audit.md           inventory both sides, build the ledger
    ├── component-map.md         Figma component to code component links
    ├── token-sync.md            variables, text, effect and paint styles
    ├── component-sync.md        per-component loop, auto layout to CSS
    └── sync-ledger.md           ledger format, statuses, Figma mirror
└── scripts/                     copied into the target repo at setup
    ├── token-diff.py, text-style-check.py, resolve-tokens.py
    ├── ledger.py                render, status, set, add, log, mirror
    ├── bump-cache.py, shot.mjs
    └── figma/                   use_figma code: inventory read, hygiene scan, mirror
.claude-plugin/
└── marketplace.json             lists the repo as a Claude Code plugin marketplace
shared/
└── conventions.md               rules every skill follows; copied into each skill's references/
scripts/
├── sync-shared.sh               copy shared/conventions.md into each skill
└── package.sh                   rebuild the skill zips for the Claude app (fails if copies are stale)
```

Each skill also carries `references/conventions.md`, a copy of `shared/conventions.md`: evidence statuses, Figma read rules, value notation, token rules, the stroke and padding rule, and the handoff files. Edit the master in `shared/`, then run `scripts/sync-shared.sh`.

## Installation

**Plugin (easiest, with updates):** in Claude Code, run

```text
/plugin install esatto --marketplace rainbows4dinos/Esatto
```

That adds this repository as a plugin marketplace and installs all four skills in one step (Claude Code 2.1.275 or later; on earlier versions run `/plugin marketplace add rainbows4dinos/Esatto`, then `/plugin install esatto@rainbows4dinos`). Plugin skills are namespaced, so they appear as `/esatto:explore-directions` and so on. To pick up new versions, run `claude plugin marketplace update rainbows4dinos`, then `claude plugin update esatto@rainbows4dinos`, and restart.

Use either the plugin or the link/copy install below, not both, or each skill loads twice.

**Skills folder:** Claude Code also loads personal skills from `~/.claude/skills/<skill-name>/SKILL.md`, one level deep. Clone this repository anywhere, then link or copy each skill folder into that directory.

**Link (edits in the clone take effect immediately):**

```bash
git clone https://github.com/rainbows4dinos/Esatto.git ~/Dev/Esatto
cd ~/Dev/Esatto
for f in */SKILL.md; do s=$(dirname "$f"); ln -s "$PWD/$s" ~/.claude/skills/"$s"; done
```

**Copy:**

```bash
cp -R inspect-figma explore-directions build-in-figma sync-design-system ~/.claude/skills/
```

To scope the skills to one project, put them in that project's `.claude/skills/` directory instead.

Run `/reload-skills` (or start a new session), then confirm the four skills appear in the skills list.

**Claude app (claude.ai and desktop):** upload a zip per skill under Settings > Capabilities > Skills. Build the zips from the current repo:

```bash
scripts/package.sh                          # every skill
scripts/package.sh sync-design-system    # just one
```

Uploaded skills are copies. After changing a skill, rebuild its zip and upload it again, or the app keeps running the old version. Linked Claude Code installs pick up changes on reload.

## Requirements

- Claude Code.
- Figma’s MCP server, connected to Claude Code, for anything that reads or writes Figma. Without it, `explore-directions` can still produce directions and a written handoff.
- Node with Playwright (`npm i playwright` in any scratch folder) for the prototype checker and the sync screenshot script, and Python 3 for the sync scripts. Both are standard library otherwise.
- For `sync-design-system`, Code Connect is optional. It needs a Figma Organization or Enterprise plan; on other plans the skill keeps its own component map in the target repo.

## License

[MIT](LICENSE)
