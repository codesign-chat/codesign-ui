<p align="center">
  <img alt="License" src="https://img.shields.io/npm/l/@codesign-ui/react?style=for-the-badge" />
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/codesign-chat/codesign-ui?logo=github&style=for-the-badge" />
  <img alt="Downloads" src="https://img.shields.io/npm/dt/@codesign-ui/react?style=for-the-badge" />
</p>

# Welcome to Codesign UI

Codesign UI is a headless, open-source UI library with over 45+ components designed for building reusable, scalable Design
Systems. It supports a wide range of JavaScript frameworks, offering dedciated packages for each supported framework.

## Supported Frameworks

Codesign UI is available for the following JavaScript frameworks:

- **React**: `@codesign-ui/react`
- **Solid**: `@codesign-ui/solid`
- **Vue**: `@codesign-ui/vue`
- **Svelte**: `@codesign-ui/svelte`

## Available Components

- [Accordion](https://codesign.chat/react/docs/components/accordion)
- [Avatar](https://codesign.chat/react/docs/components/avatar)
- [Carousel](https://codesign.chat/react/docs/components/carousel)
- [Checkbox](https://codesign.chat/react/docs/components/checkbox)
- [Clipboard](https://codesign.chat/react/docs/components/clipboard)
- [Collapsible](https://codesign.chat/react/docs/components/collapsible)
- [Color Picker](https://codesign.chat/react/docs/components/color-picker)
- [Combobox](https://codesign.chat/react/docs/components/combobox)
- [Date Picker](https://codesign.chat/react/docs/components/date-picker)
- [Dialog](https://codesign.chat/react/docs/components/dialog)
- [Editable](https://codesign.chat/react/docs/components/editable)
- [Field](https://codesign.chat/react/docs/components/field)
- [Fieldset](https://codesign.chat/react/docs/components/fieldset)
- [File Upload](https://codesign.chat/react/docs/components/file-upload)
- [Hover Card](https://codesign.chat/react/docs/components/hover-card)
- [Menu](https://codesign.chat/react/docs/components/menu)
- [Number Input](https://codesign.chat/react/docs/components/number-input)
- [Pagination](https://codesign.chat/react/docs/components/pagination)
- [Pin Input](https://codesign.chat/react/docs/components/pin-input)
- [Popover](https://codesign.chat/react/docs/components/popover)
- [Progress - Circular](https://codesign.chat/react/docs/components/progress-circular)
- [Progress - Linear](https://codesign.chat/react/docs/components/progress-linear)
- [QR Code](https://codesign.chat/react/docs/components/qr-code)
- [Radio Group](https://codesign.chat/react/docs/components/radio-group)
- [Rating Group](https://codesign.chat/react/docs/components/rating-group)
- [Segment Group](https://codesign.chat/react/docs/components/segment-group)
- [Select](https://codesign.chat/react/docs/components/select)
- [Signature Pad](https://codesign.chat/react/docs/components/signature-pad)
- [Slider](https://codesign.chat/react/docs/components/slider)
- [Splitter](https://codesign.chat/react/docs/components/splitter)
- [Switch](https://codesign.chat/react/docs/components/switch)
- [Tabs](https://codesign.chat/react/docs/components/tabs)
- [Tags Input](https://codesign.chat/react/docs/components/tags-input)
- [Timer](https://codesign.chat/react/docs/components/timer)
- [Toast](https://codesign.chat/react/docs/components/toast)
- [Toggle Group](https://codesign.chat/react/docs/components/toggle-group)
- [Tooltip](https://codesign.chat/react/docs/components/tooltip)
- [Tree View](https://codesign.chat/react/docs/components/tree-view)

## Installation

To install `@codesign-ui/react`, run the following command:

```bash
npm install @codesign-ui/react
```

or with yarn:

```bash
yarn add @codesign-ui/react
```

## Usage

To use a component from `@codesign-ui/react`, import it and include it in your application:

```tsx
import { Slider } from '@codesign-ui/react'
import { useState } from 'react'

export const MySlider = () => {
  const [value, setValue] = useState([30])

  return (
    <Slider.Root min={-50} max={50} value={value} onValueChange={(e) => setValue(e.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{value}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider.Root>
  )
}
```

## Documentation

For more detailed documentation and examples, please visit the [official documentation](https://codesign.chat/).

## Roadmap

You can request, vote for, and check upcoming features on our [roadmap](https://github.com/codesign-chat/codesign-ui/issues/).

## Contribution

We welcome contributions to Codesign UI. Please read our
[contributing guidelines](https://github.com/codesign-chat/codesign-ui/blob/main/CONTRIBUTING.md) for more information on how to
contribute.

## License

This project is licensed under the terms of the [MIT license](https://github.com/codesign-chat/codesign-ui/blob/main/LICENSE).
