# @codesign-ui/svelte

## [1.0.0] - 2026-09-16

### Added

- Initial stable release of `@codesign-ui/svelte`. This is the first version published to npm under the
  `@codesign-ui` scope; earlier version numbers predate the Codesign UI rebrand and were never published.

### Fixed

- Fix `Dialog.Description` and `Popover.Description` rendering a `p` element, unlike the `div` used by React, Solid
  and Vue, so shared stylesheets or nested block elements written against one stack no longer break on the other.
- Fix `Select.ValueText` spreading its `placeholder` onto the underlying `span` as a DOM attribute instead of using
  it as the fallback text. `Listbox.ValueText` and `DatePicker.ValueText` already split it out.
- Fix `Tabs.Content` omitting the presence props, so it never carried `data-state="open" | "closed"` and was hidden
  the moment the tab changed, cutting exit animations short.
- Fix `Tooltip.Root` ignoring a controlled `open` prop, so `<Tooltip.Root open={true}>` (or a parent-driven
  `bind:open`) rendered a closed tooltip.
