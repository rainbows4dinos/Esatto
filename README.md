# Design Agent Skills

Three Claude Code skills for product design work in Figma: inspect an existing design, explore alternative directions, and build the chosen direction as editable Figma layers.

They are written to work inside an existing design system rather than around it. Reuse existing components and variables, keep new decisions exploratory until someone approves them, and never change production designs as a side effect.

## The skills

| Skill | What it does | Changes Figma? |
|---|---|---|
| [`lr-figma-inspection`](lr-figma-inspection/SKILL.md) | Audits a Figma file or selection: components, variables and modes, styles, auto layout and conventions. Produces an evidence-backed baseline that separates observed facts from inferences and unknowns. | No. Read-only by design. |
| [`lr-design-exploration`](lr-design-exploration/SKILL.md) | Develops substantively different design directions, each with a testable hypothesis, rationale, tradeoffs and evaluation criteria, then prepares an editable Figma handoff. | Only when the request authorizes it. |
| [`lr-figma-construction`](lr-figma-construction/SKILL.md) | Builds designs in Figma from native, editable layers using existing components, tokens and nested auto layout. | Yes, within the authorized destination. |

They work best in sequence, but each one also stands alone:

```
inspection  →  exploration  →  construction
(baseline)     (directions)    (editable Figma)
```

`lr-design-exploration` refers to the other two by name and falls back to the same principles when they aren't installed.

## Exploration intensity

`lr-design-exploration` controls how far each direction departs from the current experience:

| Intensity | What it explores |
|---|---|
| **1 — Refine** | Hierarchy, typography, spacing, density and component usability while preserving existing workflows, information architecture and interaction patterns. |
| **2 — Rethink** | Alternative layouts, navigation, information architecture and interaction patterns while preserving core functionality and user goals. |
| **3 — Reinvent** | Fundamentally different concepts and workflows while preserving underlying user needs, product goals and explicit requirements. Speculative functionality is labeled. |

**Mixed is the default.** For five directions, it produces **2 Refine, 2 Rethink and 1 Reinvent**. The skill normally produces two or three directions unless you request another count: two uses one Refine and one Rethink; three uses one of each. Other counts approximate the 2:2:1 balance while keeping a useful range.

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

## What's inside

Each skill is a folder with a `SKILL.md` and supporting references that Claude reads when relevant:

```
lr-figma-inspection/
├── SKILL.md
└── references/
    ├── inspection-checklist.md
    └── report-template.md
lr-design-exploration/
├── SKILL.md
└── references/
    ├── direction-framework.md   how to form and evaluate directions
    └── figma-handoff.md         what a buildable handoff must include
lr-figma-construction/
├── SKILL.md
└── references/
    ├── auto-layout.md
    ├── design-tokens.md
    └── component-practices.md
```

## Installation

Claude Code loads personal skills from `~/.claude/skills/<skill-name>/SKILL.md`, one level deep. Clone this repository anywhere, then link or copy each skill folder into that directory.

**Link (edits in the clone take effect immediately):**

```bash
git clone https://github.com/rainbows4dinos/design-agent-skills.git ~/Dev/design-agent-skills
cd ~/Dev/design-agent-skills
for s in lr-*; do ln -s "$PWD/$s" ~/.claude/skills/"$s"; done
```

**Copy:**

```bash
cp -R lr-* ~/.claude/skills/
```

To scope the skills to one project, put them in that project's `.claude/skills/` directory instead.

Run `/reload-skills` (or start a new session), then confirm the three `lr-` skills appear in the skills list.

## Requirements

- Claude Code.
- Figma’s MCP server, connected to Claude Code, for anything that reads or writes Figma. Without it, `lr-design-exploration` can still produce directions and a written handoff.

## About the `lr-` prefix

The prefix marks these as personal skills so they are easy to tell apart from installed ones in Claude Code's skills list. To use your own prefix, or none, rename each folder and its `name:` field. Also update the cross-references in `lr-design-exploration/SKILL.md` and `lr-figma-inspection/SKILL.md`.

## License

[MIT](LICENSE)
