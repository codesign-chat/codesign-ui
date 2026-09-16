import { Popover } from '@codesign-ui/solid/popover'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger asChild={(props) => <button {...props()} />}>Open Popover</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
