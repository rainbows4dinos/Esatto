---
name: lr-design-exploration
description: Develop substantively different product design directions with explicit hypotheses, rationale, tradeoffs, and evaluation criteria. Use to explore product, UX, UI, or visual design alternatives at a chosen intensity while preserving source intent and current system constraints, then prepare an editable Figma handoff.
---

# Design Exploration

Explore different ways to solve the user's design problem, then make the alternatives comparable and buildable. Stay product agnostic. Use `lr-figma-inspection` for an existing Figma baseline and `lr-figma-construction` for authorized construction when available; otherwise follow the same evidence and native-editability principles directly.

## Settle the settings

Before generating, settle count, intensity and focus. Ask only for settings the user has not given, explicitly or in natural language (“push the boundaries” settles intensity; “restyle” settles focus), and ask all of them together in one step of at most three questions. Use the environment's multiple-choice question tool when one is available; otherwise ask in plain text. Put the default first in each question so accepting defaults takes one answer.

| Question | Options (default first) | Ask when |
| --- | --- | --- |
| How far should it go? | Give me a range (mixed) · Keep it close (1) · Explore alternatives (2) · Push the boundaries (3) | Intensity not given. Skip in seeded rounds, which default to [1, 2, 2]. |
| What can change? | Everything (`all`) · Product · UX · UI · Visual · Brand. Allow several. | Focus not given. |
| How many directions? | 3 · 2 · 5 | Count not given and not implied by an intensity list. |

When an earlier exploration round is in the conversation, or its prototype link or round file is supplied, and the user has not said whether to build on it, add one question: “Start from one of the previous directions?” with one option per direction plus “No, start fresh”. A chosen direction becomes the seed.

Do not ask about fidelity; it stays `prototype` unless the user names another level. Do not ask anything when the run is unattended (scheduled, or the user said they will check back later) or when the user has said to use defaults: apply the defaults and state them. Never ask about a setting the user already gave, and do not re-ask settings in later rounds unless the user changes them.

## Establish a brief and source contract

Identify the user task, audience, target device/context, intended outcome, and evidence of the current problem. Read supplied source artifacts and project guidance before proposing directions. Distinguish requirements and measured findings from preferences and hypotheses.

List what must remain faithful: required content, data semantics, brand assets, workflow obligations, navigation contracts, component behavior, and any visual intent the user asked to preserve. If the request is faithful reproduction, treat alternatives as optional proposals outside the faithful baseline; do not silently redesign it. When redesign is requested, state the fidelity contract at the level of intent and required behavior rather than freezing every pixel.

Use current available system evidence: components, variants, tokens, modes, layout rules, platform/runtime constraints, and implementation capacity. When an inspection baseline (`figma-baseline.json` from `lr-figma-inspection`) exists, start from it. Recheck stale inspection results where material. A screenshot is visual evidence, not proof of tokens or component availability. Mark missing access, unknown capabilities and assumptions. Ask only when uncertainty blocks a consequential decision; continue independent work with labeled assumptions.

## Set exploration intensity

Intensity controls how far a direction may depart from the existing experience. It does not relax the brief's required content, behavior, or implementation constraints. If no baseline exists, apply these levels relative to the supplied concept or established workflow and state that assumption.

| Level | Preserve | Explore |
| --- | --- | --- |
| **1 — Refine** | Existing workflows, information architecture, and interaction patterns. | Visual hierarchy, typography, spacing, density, component treatments, and usability within that structure. |
| **2 — Rethink** | Core product functionality and user goals. | Alternative layouts, information architecture, navigation, content priorities, task sequences, and interaction patterns. |
| **3 — Reinvent** | Underlying user needs, product goals, and explicit requirements. | Fundamentally different concepts, workflows, interface paradigms, or visual languages. Clearly label speculative functionality and dependencies. |

Each level applies only within the layers selected by focus (next section). For example, Reinvent with `focus: visual` means a fundamentally different visual language on the preserved structure.

**Mixed is the default.** For five directions, use two Refine, two Rethink, and one Reinvent. For other counts, approximate the 2:2:1 balance while retaining a useful range: for three, use one of each; for two, use one Refine and one Rethink. Do not add directions merely to fill every level.

Support `intensity: 1`, `intensity: 2`, or `intensity: 3` to apply a single level to every direction; `intensity: mixed` selects the default mix. A custom list such as `intensity: [1, 1, 2, 2, 3]` assigns one level per direction and sets the count unless the user separately specifies it. Resolve a conflicting count or invalid level before generating dependent artifacts.

Honor natural-language overrides: “keep it close” means Refine; “explore some alternatives” means Rethink; “push the boundaries” means Reinvent; “give me a range” means Mixed. Explicit user choices take precedence over defaults; use context to interpret phrasing and clarify only consequential conflicts.

## Set exploration focus

Focus controls which layers of the design a direction may change. Intensity sets how far a direction departs; focus sets where.

| Focus | May change | Hypotheses usually address |
| --- | --- | --- |
| `product` | Scope, features, and what the product does for the user. | Value delivered and whether the user's goal is met. |
| `ux` | Task flow, information architecture, navigation, and interaction model. | Task effort, findability, and comprehension. |
| `ui` | Layout, component choice, density, controls, and states. | Scanning, efficiency, and clarity of the screen. |
| `visual` | Typography, color strategy, spacing rhythm, shape language, imagery, iconography, motion, and overall tone. | Perceived character, visual hierarchy, legibility, and emotional fit. |
| `brand` | Identity: logo treatment, signature palette and typefaces, and voice. | Recognition and positioning. |
| `all` | `product`, `ux`, `ui`, and `visual`. Not `brand`. | Any of the above. |

**`all` is the default.** Accept one value or a list, such as `focus: [ui, visual]`. Layers outside the focus stay at the baseline except for incidental changes a focused change needs to work; label those.

`brand` is opt-in only, through `focus: brand`, a list that includes it, or an explicit request to rethink the brand. Otherwise brand assets stay in the source contract. `visual` may still take real risks with them, such as their scale, proportion, emphasis, placement, and supporting colors and type, but does not replace the logo, signature palette, or brand typefaces.

Give each direction a lead layer, the one its hypothesis is mainly about. With `all` and three or more directions, at least one direction leads with `visual`, and directions should not all lead with the same layer unless the user asks. This keeps the default from drifting toward UX-only alternatives.

Interpret natural language: “make it look different”, “new visual direction”, or “restyle” means `visual`; “different layouts” means `ui`; “rethink the flow” means `ux`; “what should this feature do” means `product`; “rebrand” includes `brand`.

Before generating, state the settled settings as one copyable line the user can reuse or edit to rerun without being asked, for example: `Settings: 3 directions · intensity mixed (1, 2, 3) · focus all · fidelity prototype`. Add `seed: D` for a seeded round. Then name each direction's lead layer.

## Iterate from a seed

A seed makes a previous direction the baseline for a new round. Accept `seed: <direction>` with a link to or mention of the earlier exploration, or natural language such as “start from D” or “take Fields further”. `seed: [C, D]` combines two directions.

- **Seed contract.** Before generating, list the traits that define the seed (its organizing idea, layout paradigm, signature visual moves, and key interactions) and preserve them by default. The user's note says what should change. Honor `keep:` and `change:` when given; otherwise infer them from the note and state the inference.
- **Inherited contract.** The original brief and source contract still apply. A seed cannot loosen a requirement fixed in an earlier round.
- **Relative settings.** Intensity and focus measure departure from the seed, not from the original. Infer focus from the note where it is clear (“hard-edge style” means `visual`; “simplify the flow” means `ux`).
- **Narrowing defaults.** Seeding usually means narrowing down, so default to three directions at `intensity: [1, 2, 2]`. Explicit settings override this.
- **Distinct readings.** Each direction interprets the note differently through a distinct mechanism, not as parameter steps of one idea (for example, three corner-radius values are one direction, not three).
- **Combinations.** For a combined seed, name which traits come from each parent, resolve conflicts explicitly, and reassess the result rather than assuming both parents' benefits survive.
- **Lineage.** Name directions after the seed (D1, D2, D3), record the chain (original → seed → direction) on each direction card, and show it in the artifact. In a prototype, the seed is the control tab, and the original baseline stays available as a second control.
- **Reuse.** Start from the seed's round file and prototype code (see [round-file.md](references/round-file.md)), so the direction card, lineage, interactions and data carry over instead of being rebuilt from a description. Read them from the project folder or from the prototype link. If neither is accessible, ask for the link; reconstruct from the conversation only as a last resort, and say so.

## Choose meaningful exploration axes

Read [direction-framework.md](references/direction-framework.md) when forming or evaluating directions. Choose axes within each direction’s intensity and focus: hierarchy, readability, spacing, density, and component usability for Refine; information architecture, task sequence, interaction model, or progressive disclosure where Rethink or Reinvent permits them and `ux` is in focus; typographic voice, color strategy, density and rhythm, shape language, imagery, and motion when `visual` is in focus.

When `visual` is in focus, a coherent change of visual language is a substantive difference. It must be a deliberate system applied across the screen with its own hypothesis, not a palette swap or scattered tweaks. When `visual` is not in focus, color, font, and radius changes alone are cosmetic and do not establish diversity. Refine directions must still produce meaningfully different hypotheses (usability, comprehension, or, with `visual` in focus, perception) without changing the preserved structure.

Use the settled count (three by default) and make sure it exposes the useful trade space. Before making artifacts, give each direction a distinct, testable hypothesis and identify how its mechanism and expected user-facing benefit differ from the others, including directions at the same intensity. Each must offer a credible drawback. Intensity measures departure from the baseline; diversity measures differences between directions, so level labels alone do not establish diversity. Keep task, content, representative data, viewport, states and fidelity consistent enough for fair comparison. Do not manufacture a weak alternative to justify a preferred one.

For each direction, use the referenced direction card and include its intensity name/number, lead layer, and why its departures fit that level and focus, alongside its hypothesis, mechanism, evidence-based rationale, expected benefit, tradeoffs, failure conditions, system reuse, departures and cost. Explain what stays faithful and what changes; present these fields consistently so directions can be compared. Distinguish predicted improvements from demonstrated results; do not invent user research or claim an untested metric gain.

## Make and evaluate artifacts

Deliver the requested fidelity with the reasoning needed to assess it. Support `fidelity: sketch` (flows and wireframes), `fidelity: static` (rendered screen concepts), and `fidelity: prototype`. **`prototype` is the default** whenever the environment can publish or render interactive HTML; otherwise fall back to `static` and say so. Interpret natural language: “quick sketches” or “wireframes” means `sketch`; “mockups” or “static” means `static`; “interactive”, “clickable” or “prototype” means `prototype`.

A prototype deliverable is one interactive comparison artifact:

- A direction switcher (tabs, plus number keys), with the baseline included as a control when one exists.
- Each direction as a working prototype over the same shared data and state, so filters and changes persist when switching. The source's primary interactions actually work: for example filtering, sorting, selecting, adding, moving or reordering items, expanding and collapsing, and opening details. Simulate only what would need a backend, and label it.
- States produced by real interaction (hover, focus, drag, selected, empty) rather than mocked with static classes.
- Mode and viewport toggles when the source has them (such as light/dark or desktop/phone), and a fit-to-screen versus actual-size control for fixed-size frames.
- The active direction's card beside or below the prototype, followed by the comparison, recommendation, and handoff.

Prototype controls need keyboard access and visible focus. Screenshots may support the brief but do not replace a working direction.

Mark up the prototype with the attributes in [prototype-contract.md](references/prototype-contract.md), then run `scripts/check-prototype.mjs` on it before publishing or handing off. It switches to every direction, runs each primary interaction, checks focus visibility and console errors, and exits non-zero on any failure. Fix failures and run it again; report anything it could not test. Run it with `--shots` before a Figma handoff to produce the reference screenshots.

Save every round as data in the format in [round-file.md](references/round-file.md): embedded in the prototype, and as a file when there is a project folder. Later rounds, other sessions, and construction read it from there.

Use realistic supplied content and comparable edge states. Preserve original sources; create alternatives only in an authorized separate destination. Do not overwrite production designs or modify shared components, variables, styles or published libraries as a side effect of exploration.

Reuse existing assets by identity when feasible. Label proposed extensions and exploratory raw values; do not promote them into new system tokens/styles without authorization.

When `visual` is in focus, do not hold directions to the existing token set. Use exploratory raw values for type, color, spacing, radius, and motion where the visual hypothesis needs them, label them as exploratory, and note the nearest existing token where one exists. They remain proposals until approved. Preserve source assets and their provenance; do not fabricate logos, rewrite required copy or simplify data in ways that conceal layout problems.

Compare against the brief's criteria with evidence and uncertainty. Examine accessibility, narrow layouts, long content, and relevant empty/loading/error/permission states proportionately. Recommend a direction with reasons and a next validation step, or explain the unresolved decision. Do not equate a recommendation with user selection or permission to build/publish.

## Prepare editable Figma handoff

Read [figma-handoff.md](references/figma-handoff.md) before handing off a selected direction or constructing Figma artifacts. The handoff must preserve the explored composition and behavior, map existing components/tokens/modes, specify native layer/layout structure, and explain remaining gaps. A screenshot or image can communicate intent but is not an editable Figma deliverable.

If Figma writing is already within the user's request, proceed within that scope and use the available construction guidance. Otherwise deliver the ready-to-build handoff without mutating Figma. If tooling cannot create or verify editable layers, state that limitation and deliver the spec/assets; never claim that a raster mockup or unverified import is complete editable Figma.

Before finishing, verify the requested intensity distribution, focus and fidelity (at `prototype`, that `check-prototype.mjs` passes), each direction's lead layer, distinct hypotheses and meaningful differences within the allowed levels and layers, source fidelity, current constraints, fair comparison, explicit uncertainty, and a usable handoff. Separate visual fidelity checks from structural editability checks.
