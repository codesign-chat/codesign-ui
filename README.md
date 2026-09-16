<p align="center">
  <strong>Codesign UI</strong>
</p>

<p align="center">
  <strong>Build scalable design systems with unstyled, accessible UI components</strong>
</p>

<p align="center">
  <a href="https://github.com/codesign-chat/codesign-ui/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT License" /></a>
  <a href="https://github.com/codesign-chat/codesign-ui"><img src="https://img.shields.io/github/stars/codesign-chat/codesign-ui?logo=github&style=for-the-badge" alt="GitHub stars" /></a>
  <a href="https://github.com/codesign-chat/codesign-ui/discussions"><img src="https://img.shields.io/badge/discussions-welcome-green?style=for-the-badge" alt="Discussions" /></a>
</p>

<p align="center">
  <a href="https://codesign.chat">Documentation</a> •
  <a href="#installation">Installation</a> •
  <a href="#features">Features</a> •
  <a href="#components">Components</a> •
  <a href="https://github.com/codesign-chat/codesign-ui/issues">Issues</a> •
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<br />

## Overview

Codesign UI is a headless component library that provides the foundation for building high-quality, accessible design
systems and web applications. Built on top of [Zag.js](https://zagjs.com) state machines, Codesign UI delivers robust,
framework-agnostic component logic with perfect parity across **React**, **Solid**, **Vue**, and **Svelte**.

> Codesign UI is a fork of [Ark UI](https://github.com/chakra-ui/ark). See [Credits](#credits) for details.

### Why Codesign UI?

- **🎨 Completely Unstyled** - Zero styling opinions. Bring your own styles with CSS-in-JS, Tailwind, vanilla CSS, or
  any styling solution
- **♿️ Accessibility First** - WCAG compliant components tested with real assistive technologies out of the box
- **🔄 State Machine Powered** - Predictable, testable behavior powered by Zag.js finite state machines
- **🌍 Multi-Framework** - Same API across React, Solid, Vue, and Svelte - write once, use everywhere
- **📦 Truly Composable** - Granular component primitives that work together seamlessly
- **⚡️ Production Ready** - Battle-tested heritage, derived from Ark UI and used in products like Chakra UI v3
- **🎯 Type-Safe** - Fully typed with TypeScript for exceptional developer experience

## Installation

Choose your framework and install the corresponding package:

```bash
# React
npm install @codesign-ui/react

# Solid
npm install @codesign-ui/solid

# Vue
npm install @codesign-ui/vue

# Svelte
npm install @codesign-ui/svelte
```

## Quick Start

Here's a simple example showing how consistent the API is across frameworks:

### React

```tsx
import { Dialog } from '@codesign-ui/react/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Vue

```vue
<script setup lang="ts">
import { Dialog } from '@codesign-ui/vue/dialog'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</template>
```

### Solid

```tsx
import { Dialog } from '@codesign-ui/solid/dialog'

export const MyDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog description</Dialog.Description>
        <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
```

### Svelte

```svelte
<script lang="ts">
  import { Dialog } from '@codesign-ui/svelte/dialog'
</script>

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog description</Dialog.Description>
      <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Features

### Zero-Styling Freedom

Every component is completely unstyled, giving you total control over your design. Use any styling solution:

```tsx
// Tailwind CSS
<Dialog.Trigger className="px-4 py-2 bg-blue-500 rounded">Open</Dialog.Trigger>

// CSS-in-JS
<Dialog.Trigger css={{ padding: '8px 16px', background: 'blue' }}>Open</Dialog.Trigger>

// Vanilla CSS
<Dialog.Trigger className="my-button">Open</Dialog.Trigger>
```

### Accessibility Built-In

All components follow WAI-ARIA design patterns and are tested with screen readers:

- ✅ Proper ARIA attributes and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ RTL support

### State Machine Architecture

Powered by Zag.js, each component uses finite state machines for predictable behavior:

- 🔒 Type-safe state transitions
- 🧪 Easier to test and debug
- 🐛 Fewer edge cases and bugs
- 📊 Visualizable component logic

### Framework Parity

Maintain a single design system across multiple frameworks without rewriting component logic:

```tsx
// Same API, same behavior, different frameworks
const packages = ['@codesign-ui/react', '@codesign-ui/solid', '@codesign-ui/vue', '@codesign-ui/svelte']
```

## Components

Codesign UI provides **45+ production-ready components** covering common UI patterns:

### Layout & Navigation

- Accordion
- Tabs
- Splitter
- Steps
- Tree View
- Tour

### Overlays & Dialogs

- Dialog
- Popover
- Tooltip
- Hover Card
- Bottom Sheet
- Floating Panel

### Forms & Inputs

- Checkbox
- Radio Group
- Select
- Combobox
- Number Input
- Pin Input
- Tags Input
- Editable
- File Upload
- Color Picker
- Date Picker
- Password Input
- Signature Pad
- Slider
- Angle Slider
- Rating Group
- Switch
- Toggle / Toggle Group

### Data Display

- Avatar
- Highlight
- Progress
- QR Code
- Format
- JSON Tree View
- Marquee

### Utilities

- Carousel
- Clipboard
- Collapsible
- Field / Fieldset
- Menu
- Pagination
- Portal
- Presence
- Scroll Area
- Segment Group
- Timer
- Toast
- Client Only
- Download Trigger
- Focus Trap
- Frame
- Collection
- Listbox

[View all components →](https://codesign.chat/docs/overview/introduction)

## Documentation

Visit [codesign.chat](https://codesign.chat) for:

- 📖 Comprehensive guides and tutorials
- 📚 Detailed API references for each component
- 💡 Interactive examples and recipes
- 🎓 Styling guides for popular frameworks
- 🔧 TypeScript usage patterns

The documentation site source lives in [`website/`](website) within this repository.

## Ecosystem

### Related Projects

Projects from the Ark UI ecosystem that pair well with Codesign UI:

- **[Chakra UI v3](https://chakra-ui.com)** - A simple, modular component library
- **[Park UI](https://park-ui.com)** - Beautifully designed components built with Ark UI and Panda CSS
- **[Tark UI](https://www.tarkui.com/)** - Ark UI components styled with Tailwind CSS

### Styling Libraries

Codesign UI works seamlessly with:

- [Panda CSS](https://panda-css.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Styled Components](https://styled-components.com)
- [Emotion](https://emotion.sh)
- Vanilla CSS, CSS Modules, and more

### Developer Tools

- **[MCP Server](https://github.com/codesign-chat/codesign-ui/tree/main/packages/mcp)** - AI-assisted development with
  Claude and other AI agents

## Community

- 🗺️ [Issues](https://github.com/codesign-chat/codesign-ui/issues) - Report bugs and request features
- 💬 [Discussions](https://github.com/codesign-chat/codesign-ui/discussions) - Ask questions and share ideas

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about:

- Setting up your development environment
- Our development workflow
- Code conventions and standards
- How to submit pull requests

## Credits

Codesign UI is a fork of [Ark UI](https://github.com/chakra-ui/ark), created and maintained by
[Christian Schröter](https://github.com/cschroeter), [Segun Adebayo](https://github.com/segunadebayo), and the Chakra UI
team. All credit for the original component architecture, state machine integration, and framework implementations
belongs to the upstream project and its contributors.

## License

MIT © [Chakra Systems Inc.](https://github.com/chakra-ui) and codesign-chat contributors. See [LICENSE](LICENSE) for
details.

---

<p align="center">
  Built with ❤️ by the <a href="https://github.com/codesign-chat/codesign-ui/graphs/contributors">Codesign UI
  Community</a>
</p>
