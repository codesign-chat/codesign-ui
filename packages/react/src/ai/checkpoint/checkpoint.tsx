import type { ComponentProps, ReactNode } from 'react'
import { Tooltip } from '../../components/tooltip/index.ts'

const SCOPE = 'checkpoint'

export type CheckpointProps = ComponentProps<'div'>

export function Checkpoint({ children, ...props }: CheckpointProps) {
  return (
    <div data-scope={SCOPE} data-part="root" {...props}>
      {children}
    </div>
  )
}

export type CheckpointIconProps = ComponentProps<'span'> & {
  children?: ReactNode
}

export function CheckpointIcon({ children, ...props }: CheckpointIconProps) {
  return (
    <span data-scope={SCOPE} data-part="icon" {...props}>
      {children}
    </span>
  )
}

export type CheckpointTriggerProps = ComponentProps<'button'> & {
  tooltip?: string
}

export function CheckpointTrigger({ tooltip, children, ...props }: CheckpointTriggerProps) {
  const button = (
    <button data-scope={SCOPE} data-part="trigger" type="button" {...props}>
      {children}
    </button>
  )

  if (!tooltip) {
    return button
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content data-scope={SCOPE} data-part="tooltip">
          {tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
