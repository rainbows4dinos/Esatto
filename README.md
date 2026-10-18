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
