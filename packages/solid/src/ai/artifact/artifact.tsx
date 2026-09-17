import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Tooltip } from '../../components/tooltip/index.tsx'

const SCOPE = 'artifact'

export type ArtifactProps = JSX.HTMLAttributes<HTMLDivElement>

export function Artifact(props: ArtifactProps) {
  return <div data-scope={SCOPE} data-part="root" {...props} />
}

export type ArtifactHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function ArtifactHeader(props: ArtifactHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type ArtifactTitleProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function ArtifactTitle(props: ArtifactTitleProps) {
  return <p data-scope={SCOPE} data-part="title" {...props} />
}

export type ArtifactDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function ArtifactDescription(props: ArtifactDescriptionProps) {
  return <p data-scope={SCOPE} data-part="description" {...props} />
}

export type ArtifactActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function ArtifactActions(props: ArtifactActionsProps) {
  return <div data-scope={SCOPE} data-part="actions" {...props} />
}

export type ArtifactActionProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  label?: string
  tooltip?: string
}

export function ArtifactAction(props: ArtifactActionProps) {
  const [local, rest] = splitProps(props, ['label', 'tooltip'])
  const button = (
    <button aria-label={local.label ?? local.tooltip} data-scope={SCOPE} data-part="action" type="button" {...rest} />
  )

  return local.tooltip ? (
    <Tooltip.Root>
      <Tooltip.Trigger
        asChild={(triggerProps) => (
          <button
            {...triggerProps}
            aria-label={local.label ?? local.tooltip}
            data-scope={SCOPE}
            data-part="action"
            type="button"
            {...rest}
          />
        )}
      />
      <Tooltip.Positioner>
        <Tooltip.Content data-scope={SCOPE} data-part="tooltip">
          {local.tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ) : (
    button
  )
}

export type ArtifactContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function ArtifactContent(props: ArtifactContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}
