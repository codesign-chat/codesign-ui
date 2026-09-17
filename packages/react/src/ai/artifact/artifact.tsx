import type { ComponentProps } from 'react'
import { Tooltip } from '../../components/tooltip/index.ts'

const SCOPE = 'artifact'

export type ArtifactProps = ComponentProps<'div'>

export function Artifact(props: ArtifactProps) {
  return <div data-scope={SCOPE} data-part="root" {...props} />
}

export type ArtifactHeaderProps = ComponentProps<'div'>

export function ArtifactHeader(props: ArtifactHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type ArtifactTitleProps = ComponentProps<'p'>

export function ArtifactTitle(props: ArtifactTitleProps) {
  return <p data-scope={SCOPE} data-part="title" {...props} />
}

export type ArtifactDescriptionProps = ComponentProps<'p'>

export function ArtifactDescription(props: ArtifactDescriptionProps) {
  return <p data-scope={SCOPE} data-part="description" {...props} />
}

export type ArtifactActionsProps = ComponentProps<'div'>

export function ArtifactActions(props: ArtifactActionsProps) {
  return <div data-scope={SCOPE} data-part="actions" {...props} />
}

export type ArtifactActionProps = ComponentProps<'button'> & {
  label?: string
  tooltip?: string
}

export function ArtifactAction({ label, tooltip, children, ...props }: ArtifactActionProps) {
  const button = (
    <button aria-label={label ?? tooltip} data-scope={SCOPE} data-part="action" type="button" {...props}>
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

export type ArtifactContentProps = ComponentProps<'div'>

export function ArtifactContent(props: ArtifactContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}
