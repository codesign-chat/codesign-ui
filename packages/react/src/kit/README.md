# Screen kit (all frameworks)

The paired Penpot catalog needs product-level families — Button, Card, KPI, Breadcrumb, Table, Alert, … —
that the headless Zag.js primitives do not own. This layer provides them without changing the core
`src/components` contract or its four-framework parity.

- **Headless**: no styling, no default colors; every part forwards its props/ref and carries
  `data-scope="<family>"` / `data-part="<part>"`.
- **Composable**: the parts are plain native elements in each framework; interactive composites can wrap the existing Layer-1
  primitives later without changing the exported anatomy.
- **Published**: each framework package exposes `./kit` and `./kit/*` (Solid/Vue use `src/kit`, Svelte uses `src/lib/kit`).
- **Inventory**: `scripts/inventory_library.py` scans this directory as `layer: "kit"`; the skill maps each
  family to its `CF` factory and builds one `Family·Spec` page per component.

The React, Solid, Vue and Svelte bindings share the same component names and anatomy. `check:exports` compares the
React/Solid/Vue kit indexes; `check:anatomy` still covers `src/components` only because the kit has no Zag machines.
