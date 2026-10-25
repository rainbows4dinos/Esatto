# Inspection report template

Adapt depth to scope; omit irrelevant sections rather than inventing data.

## Baseline and coverage

- User objective; file/link and version/date if available; inspection timestamp.
- Pages/nodes, relevant viewports, states, modes and flows inspected.
- Tools/data sources, representative sampling, omitted or inaccessible areas.
- Source fidelity and protected artifacts to preserve.

## Findings

| Finding | Evidence/location | Status | Effect on requested work | Suggested next step |
| --- | --- | --- | --- | --- |

Status: observed, inferred, proposed, unknown, or unverified (the API cannot read the value, for example a binding inside a nested instance). Include confidence only when it adds information, and explain its basis. Proposals must not be phrased as facts about the existing file.

## Reuse map

| Asset and role | ID/key/source | Properties or variants | Bindings/modes | Limitations |
| --- | --- | --- | --- | --- |

Include enough exact names/IDs to find components, styles and tokens again. Record unresolved aliases and library dependencies.

## Layout and conventions

Describe hierarchy, sizing by axis, spacing, content behavior, responsive evidence, visual conventions, and exceptions for the target. Identify which rules are explicit and which are inferred.

## Handoff

- Fixed constraints and permitted exploration space.
- Reusable assets and exact mappings.
- Gaps that require user/system-owner input; nonblocking assumptions.
- Proposed improvements, ordered by relevance and consequence.
- Reinspection triggers: source version change, new mode/viewport, library change, or unresolved constraint becoming material.

Conclude with the scope of what was verified and confirmation that the Figma document was not changed. Do not claim completeness beyond coverage.
