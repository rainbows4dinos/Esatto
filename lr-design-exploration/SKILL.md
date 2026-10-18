---
name: lr-design-exploration
description: Develop substantively different product design directions with explicit hypotheses, rationale, tradeoffs, and evaluation criteria. Use to explore UI or interaction alternatives while preserving source intent and current system constraints, then prepare an editable Figma handoff.
---

# Design Exploration

Explore different ways to solve the user's design problem, then make the alternatives comparable and buildable. Stay product agnostic. Use `lr-figma-inspection` for an existing Figma baseline and `lr-figma-construction` for authorized construction when available; otherwise follow the same evidence and native-editability principles directly.

## Establish a brief and source contract

Identify the user task, audience, target device/context, intended outcome, and evidence of the current problem. Read supplied source artifacts and project guidance before proposing directions. Distinguish requirements and measured findings from preferences and hypotheses.

List what must remain faithful: required content, data semantics, brand assets, workflow obligations, navigation contracts, component behavior, and any visual intent the user asked to preserve. If the request is faithful reproduction, treat alternatives as optional proposals outside the faithful baseline; do not silently redesign it. When redesign is requested, state the fidelity contract at the level of intent and required behavior rather than freezing every pixel.

Use current available system evidence: components, variants, tokens, modes, layout rules, platform/runtime constraints, and implementation capacity. Recheck stale inspection results where material. A screenshot is visual evidence, not proof of tokens or component availability. Mark missing access, unknown capabilities and assumptions. Ask only when uncertainty blocks a consequential decision; continue independent work with labeled assumptions.

## Set exploration intensity

Intensity controls how far a direction may depart from the existing experience. It does not relax the brief's required content, behavior, or implementation constraints. If no baseline exists, apply these levels relative to the supplied concept or established workflow and state that assumption.

| Level | Preserve | Explore |
| --- | --- | --- |
| **1 — Refine** | Existing workflows, information architecture, and interaction patterns. | Visual hierarchy, typography, spacing, density, component treatments, and usability within that structure. |
| **2 — Rethink** | Core product functionality and user goals. | Alternative layouts, information architecture, navigation, content priorities, task sequences, and interaction patterns. |
| **3 — Reinvent** | Underlying user needs, product goals, and explicit requirements. | Fundamentally different concepts, workflows, and interface paradigms. Clearly label speculative functionality and dependencies. |

**Mixed is the default.** For five directions, use two Refine, two Rethink, and one Reinvent. For other counts, approximate the 2:2:1 balance while retaining a useful range: for three, use one of each; for two, use one Refine and one Rethink. Do not add directions merely to fill every level.

Support `intensity: 1`, `intensity: 2`, or `intensity: 3` to apply a single level to every direction; `intensity: mixed` selects the default mix. A custom list such as `intensity: [1, 1, 2, 2, 3]` assigns one level per direction and sets the count unless the user separately specifies it. Resolve a conflicting count or invalid level before generating dependent artifacts.

Honor natural-language overrides: “keep it close” means Refine; “explore some alternatives” means Rethink; “push the boundaries” means Reinvent; “give me a range” means Mixed. Explicit user choices take precedence over defaults; use context to interpret phrasing and clarify only consequential conflicts. State the chosen count and intensity distribution before generating designs.

## Choose meaningful exploration axes

Read [direction-framework.md](references/direction-framework.md) when forming or evaluating directions. Choose axes within each direction’s intensity: hierarchy, readability, spacing, density, and component usability for Refine; information architecture, task sequence, interaction model, or progressive disclosure where Rethink or Reinvent permits them. Color/font/radius changes alone are styling variants unless visual style itself is the requested question. Refine directions must still produce meaningfully different task comprehension or usability hypotheses without changing the preserved structure.

Choose enough directions to expose the useful trade space, normally two or three unless the user specifies otherwise. Before making artifacts, give each direction a distinct, testable hypothesis and identify how its mechanism and expected user-facing benefit differ from the others, including directions at the same intensity. Each must offer a credible drawback. Intensity measures departure from the baseline; diversity measures differences between directions, so level labels alone do not establish diversity. Keep task, content, representative data, viewport, states and fidelity consistent enough for fair comparison. Do not manufacture a weak alternative to justify a preferred one.

For each direction, use the referenced direction card and include its intensity name/number and why its departures fit that level, alongside its hypothesis, mechanism, evidence-based rationale, expected benefit, tradeoffs, failure conditions, system reuse, departures and cost. Explain what stays faithful and what changes; present these fields consistently so directions can be compared. Distinguish predicted improvements from demonstrated results; do not invent user research or claim an untested metric gain.

## Make and evaluate artifacts

Deliver the requested fidelity: flow sketches, wireframes, screen concepts or prototypes, plus the reasoning required to assess them. Use realistic supplied content and comparable edge states. Preserve original sources; create alternatives only in an authorized separate destination. Do not overwrite production designs or modify shared components, variables, styles or published libraries as a side effect of exploration.

Reuse existing assets by identity when feasible. Label proposed extensions and exploratory raw values; do not promote them into new system tokens/styles without authorization. Preserve source assets and their provenance; do not fabricate logos, rewrite required copy or simplify data in ways that conceal layout problems.

Compare against the brief's criteria with evidence and uncertainty. Examine accessibility, narrow layouts, long content, and relevant empty/loading/error/permission states proportionately. Recommend a direction with reasons and a next validation step, or explain the unresolved decision. Do not equate a recommendation with user selection or permission to build/publish.

## Prepare editable Figma handoff

Read [figma-handoff.md](references/figma-handoff.md) before handing off a selected direction or constructing Figma artifacts. The handoff must preserve the explored composition and behavior, map existing components/tokens/modes, specify native layer/layout structure, and explain remaining gaps. A screenshot or image can communicate intent but is not an editable Figma deliverable.

If Figma writing is already within the user's request, proceed within that scope and use the available construction guidance. Otherwise deliver the ready-to-build handoff without mutating Figma. If tooling cannot create or verify editable layers, state that limitation and deliver the spec/assets; never claim that a raster mockup or unverified import is complete editable Figma.

Before finishing, verify the requested intensity distribution, distinct hypotheses and meaningful differences within the allowed levels, source fidelity, current constraints, fair comparison, explicit uncertainty, and a usable handoff. Separate visual fidelity checks from structural editability checks.
