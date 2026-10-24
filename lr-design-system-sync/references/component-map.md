# Component map

The component map links each Figma component to its code component and maps Figma properties to code props. Without it, component sync matches by name and guesses, which is where components get skipped or edited in the wrong file.

## Code Connect or a local map

Figma's Code Connect stores this same link inside Figma, and `get_design_context` then returns the real code component in its reference output. It requires a Figma Organization or Enterprise plan and components published to a team library. Check with `whoami` before suggesting it.

- **Code Connect available**: follow Figma's `figma-code-connect` skill to write `.figma.ts` templates. Still keep the local map, since this skill reads it for layout and verification paths that Code Connect does not hold.
- **Not available** (Free or Professional plan): use the local map only. Pass the mapped code component and props to the design-to-code step yourself.

The local map converts directly to Code Connect later: each entry already holds the node, source path, and property mapping a template needs.

## File

`design-sync/component-map.json` in the target repo:

```json
{
  "figmaFileKey": "abc123",
  "components": [
    {
      "figma": { "name": "Button", "key": "c0ffee...", "nodeId": "12:34" },
      "code": {
        "path": "src/components/Button/Button.tsx",
        "export": "Button",
        "preview": "src/components/Button/Button.stories.tsx"
      },
      "props": {
        "Variant": { "prop": "variant", "values": { "Primary": "primary", "Secondary": "secondary" } },
        "Size": { "prop": "size", "values": { "Small": "sm", "Medium": "md", "Large": "lg" } },
        "Label": { "prop": "children" },
        "Has icon": { "prop": "icon", "note": "presence of icon prop, not a boolean" },
        "State": { "prop": null, "note": "visual states map to :hover, :active, :disabled, not props" }
      },
      "dependsOn": ["Icon"],
      "notes": ""
    }
  ],
  "unmatched": {
    "figmaOnly": [],
    "codeOnly": []
  }
}
```

Use the component key as the stable identifier. Node IDs change when components move between files or pages.

### Codebases without a component framework

In plain HTML and CSS (BEM classes, web modules), a "component" is a class block plus whatever script renders its markup. Map it that way:

```json
{
  "figma": { "name": "Button", "key": "2b06...", "nodeId": "53:220" },
  "code": { "selector": ".nc-button", "path": "tools/shared/components.css" },
  "props": {
    "Variant": { "modifier": { "Primary": "--primary", "Secondary": "--secondary" } },
    "State": { "modifier": null, "note": "Hover/Pressed -> :hover/:active, Disabled -> :disabled" },
    "Show Icon L": { "modifier": null, "note": "presence of leading icon element" }
  }
}
```

Variant values map to modifier classes, visual states to pseudo-classes or ARIA attributes, booleans to the presence of child elements. Code Connect does not apply here; the local map is the only link. A Figma axis with no modifier at all (for example a Size axis when the code has one size) is structure drift for component sync, not a mapping gap.

## Building it

1. List component sets from the audit inventory.
2. For each, search the component directory for a matching name, then compare its props interface with the Figma property list (variant axes, booleans, text, instance swaps, slots).
3. A clear match by name and props: add it. Two or more candidates, or a name match with poor prop overlap: ask the user and show why.
4. Map every value of every variant axis. An unmapped value is a silent bug later.
5. Figma properties with no code prop: set `"prop": null` with a note. Visual states usually land here. Never invent a prop.
6. Record `dependsOn` from nested instances so component sync can work primitives first.
7. Figma components with no code match go to `unmatched.figmaOnly` and get a ledger row (`needs-decision`: build new or skip). Code components with no Figma match go to `codeOnly` and are left alone.

Show the user new or changed entries before component sync starts. On later runs, update the map instead of rebuilding it.
