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

## Choose meaningful exploration axes

Read [direction-framework.md](references/direction-framework.md) when forming or evaluating directions. Explore differences in information architecture, task sequence, interaction model, content hierarchy, progressive disclosure, or density. Color/font/radius changes alone are styling variants unless visual style itself is the requested question.

Choose enough directions to expose the useful trade space, normally two or three unless the user specifies otherwise. Each must offer a distinct user-facing benefit and a credible drawback. Keep task, content, representative data, viewport, states and fidelity consistent enough for fair comparison. Do not manufacture a weak alternative to justify a preferred one.

For each direction, state a testable hypothesis, mechanism, rationale grounded in evidence, expected benefit, tradeoffs, failure conditions, system reuse, departures and cost. Distinguish predicted improvements from demonstrated results; do not invent user research or claim an untested metric gain.

## Make and evaluate artifacts

Deliver the requested fidelity: flow sketches, wireframes, screen concepts or prototypes, plus the reasoning required to assess them. Use realistic supplied content and comparable edge states. Preserve original sources; create alternatives only in an authorized separate destination. Do not overwrite production designs or modify shared components, variables, styles or published libraries as a side effect of exploration.

Reuse existing assets by identity when feasible. Label proposed extensions and exploratory raw values; do not promote them into new system tokens/styles without authorization. Preserve source assets and their provenance; do not fabricate logos, rewrite required copy or simplify data in ways that conceal layout problems.

Compare against the brief's criteria with evidence and uncertainty. Examine accessibility, narrow layouts, long content, and relevant empty/loading/error/permission states proportionately. Recommend a direction with reasons and a next validation step, or explain the unresolved decision. Do not equate a recommendation with user selection or permission to build/publish.

## Prepare editable Figma handoff

Read [figma-handoff.md](references/figma-handoff.md) before handing off a selected direction or constructing Figma artifacts. The handoff must preserve the explored composition and behavior, map existing components/tokens/modes, specify native layer/layout structure, and explain remaining gaps. A screenshot or image can communicate intent but is not an editable Figma deliverable.

If Figma writing is already within the user's request, proceed within that scope and use the available construction guidance. Otherwise deliver the ready-to-build handoff without mutating Figma. If tooling cannot create or verify editable layers, state that limitation and deliver the spec/assets; never claim that a raster mockup or unverified import is complete editable Figma.

Before finishing, verify substantive differences, source fidelity, current constraints, fair comparison, explicit uncertainty, and a usable handoff. Separate visual fidelity checks from structural editability checks.
