# Codesign UI - Claude Development Guide

Codesign UI is a headless component library for building scalable Design Systems across React, Solid, Svelte, and Vue.
Built on top of Zag.js state machines, it provides unstyled, accessible UI components.

## Documentation Structure

This guide is split into focused documents for better navigation:

- **[Overview](@.claude/docs/overview.md)** - Project overview, architecture, and available components
- **[Development](@.claude/docs/development.md)** - Development workflows, commands, and processes
- **[Component Patterns](@.claude/docs/component_patterns.md)** - Component development patterns, examples, and testing
- **[Framework Patterns](@.claude/docs/framework_patterns.md)** - Framework-specific patterns and advanced
  implementations
- **[Documentation Patterns](@.claude/docs/documentation-patterns.md)** - Website documentation structure, Examples vs
  Guides, and writing guidelines

## Quick Start

### Common Commands

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests across all packages
bun run test

# Type check all packages
bun run typecheck

# Lint all packages
bun run lint

# Format code
bun run format
```

### Framework Development

```bash
# Work with specific framework packages
bun run react dev      # React Storybook on port 6006
bun run solid dev      # Solid Storybook on port 6006
bun run svelte dev     # Svelte Storybook on port 6006
bun run vue dev        # Vue Storybook on port 6006
```

### Claude Code Commands

The project includes Claude Code slash commands in `.claude/commands/`:

- `/zag` - Implement a Zag.js component in Codesign UI (follows specific implementation workflow)

## Project Structure

```
codesign-ui/
├── packages/
│   ├── react/             # React bindings (headless core + AI composites)
│   │   └── src/
│   │       ├── components/    # Layer 1: headless primitives (Zag.js machines) — synced with upstream
│   │       └── ai/            # Layer 2: unstyled composites — owned by this fork
│   ├── solid/             # SolidJS bindings (Layer 1)
│   ├── svelte/            # Svelte bindings (Layer 1)
│   ├── vue/               # Vue bindings (Layer 1)
│   ├── mcp/               # MCP server
│   └── themes/            # Themes (data only, planned)
├── website/               # Documentation site
├── templates/             # Project templates
└── scripts/               # Build and utility scripts
```

## Architecture Principles

The library ships in three layers. Keep the boundaries strict:

1. **Layer 1 — headless primitives** (`packages/*/src/components`): one Zag.js machine per
   component. Behavior + ARIA only. Zero styling. Kept in sync with upstream Ark.
2. **Layer 2 — unstyled composites** (`packages/react/src/ai`): multi-primitive components for a
   product domain (chat, and similar). Still zero styling; they compose Layer 1 and add behavior.
3. **Layer 3 — themes** (`packages/themes`): data, not code. Each theme maps semantic tokens to
   primitive tokens (light + dark). Components never hardcode colors; they expose
   `data-scope`/`data-part` hooks for styling.

### Rules for `src/ai` (Layer 2)

- One directory per composite, flat files. No anatomy/machine/provider file family — composites are
  plain React components, not Zag.js machines.
- Styling contract: every rendered element carries `data-scope="<family>"` and `data-part="<part>"`.
  Never ship default colors, spacing, or CSS classes; always forward `className` and spread `props`.
- Import Layer 1 only through its public surface (`@codesign-ui/react/<component>` or the relative
  component `index.ts`). Never reach into machine/anatomy internals.
- Icons are caller-supplied (via `children` or fallback props). The package ships no icon dependency.
- Behavioral dependencies are allowed when justified (e.g. `use-stick-to-bottom`). AI SDK types come
  from `ai` as an optional peer dependency, imported with `import type` only.
- The `./ai` export subpaths are experimental: no semver stability promise until stabilized.

### Fork sync discipline

- `src/ai/**` exists only in this fork. Upstream never creates it, so merges stay conflict-free as
  long as `package.json` diffs stay small (one dependency line, two export lines).
- Extract `src/ai` into its own package when any of these hold: it accumulates three or more of its
  own runtime dependencies, its release cadence diverges from core, a second framework needs shared
  AI types, or external contributors only touch the AI layer. Extraction is mechanical
  (`git mv` plus an import-prefix change).

### Themes

- Themes live in `packages/themes` as CSS custom properties, one directory per theme
  (`<name>/<name>.css` plus `theme.json`), plus a shared `contract.css` defining the semantic token
  vocabulary. A theme never contains component code; a component never contains theme values.

## Key Principles

- **TypeScript First**: All components must be fully typed
- **Framework Consistency**: Maintain API parity across React, Solid, Svelte, and Vue
- **Accessibility**: Follow ARIA guidelines and test with screen readers
- **No Comments**: Follow existing codebase pattern of minimal commenting
- **Imports**: Use absolute imports from framework packages (`@codesign-ui/solid/checkbox`)

## Contributing

1. Follow existing code patterns and conventions
2. Add TypeScript types for all new code
3. Include Storybook stories for components
4. Write tests for component behavior
5. Ensure accessibility compliance

For detailed information on any topic, refer to the specific documentation files linked above.
