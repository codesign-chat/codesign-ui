import { Show, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

export type ToolState =
  | 'approval-requested'
  | 'approval-responded'
  | 'input-available'
  | 'input-streaming'
  | 'output-available'
  | 'output-denied'
  | 'output-error'

const statusLabels: Record<ToolState, string> = {
  'approval-requested': 'Awaiting Approval',
  'approval-responded': 'Responded',
  'input-available': 'Running',
  'input-streaming': 'Pending',
  'output-available': 'Completed',
  'output-denied': 'Denied',
  'output-error': 'Error',
}

export function getStatusLabel(status: ToolState) {
  return statusLabels[status]
}

export type ToolProps = JSX.HTMLAttributes<HTMLDivElement>

export function Tool(props: ToolProps) {
  return <Collapsible.Root data-scope="tool" data-part="root" {...props} />
}

export type ToolHeaderProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  state: ToolState
  title?: string
  toolName?: string
  type: string
}

export function ToolHeader(props: ToolHeaderProps) {
  const [local, rest] = splitProps(props, ['state', 'title', 'toolName', 'type'])
  const derivedName = local.type === 'dynamic-tool' ? (local.toolName ?? '') : local.type.split('-').slice(1).join('-')

  return (
    <Collapsible.Trigger data-scope="tool" data-part="trigger" {...rest}>
      <span data-scope="tool" data-part="title">
        {local.title ?? derivedName}
      </span>
      <span data-scope="tool" data-part="status" data-status={local.state}>
        {statusLabels[local.state]}
      </span>
    </Collapsible.Trigger>
  )
}

export type ToolContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function ToolContent(props: ToolContentProps) {
  return <Collapsible.Content data-scope="tool" data-part="content" {...props} />
}

export type ToolInputProps = JSX.HTMLAttributes<HTMLDivElement> & {
  input: unknown
}

export function ToolInput(props: ToolInputProps) {
  const [local, rest] = splitProps(props, ['input'])
  return (
    <div data-scope="tool" data-part="input" {...rest}>
      <h4 data-scope="tool" data-part="label">
        Parameters
      </h4>
      <pre data-scope="tool" data-part="code">
        {JSON.stringify(local.input, null, 2)}
      </pre>
    </div>
  )
}

export type ToolOutputProps = JSX.HTMLAttributes<HTMLDivElement> & {
  errorText?: string
  output?: unknown
}

export function ToolOutput(props: ToolOutputProps) {
  const [local, rest] = splitProps(props, ['errorText', 'output'])

  return (
    <Show when={Boolean(local.output || local.errorText)} fallback={null}>
      <div data-scope="tool" data-part="output" data-error={local.errorText ? '' : undefined} {...rest}>
        <h4 data-scope="tool" data-part="label">
          {local.errorText ? 'Error' : 'Result'}
        </h4>
        <Show when={local.errorText}>
          <div data-scope="tool" data-part="error-text">
            {local.errorText}
          </div>
        </Show>
        <Show when={typeof local.output === 'string' || (typeof local.output === 'object' && local.output !== null)}>
          <pre data-scope="tool" data-part="code">
            {typeof local.output === 'string' ? local.output : JSON.stringify(local.output, null, 2)}
          </pre>
        </Show>
      </div>
    </Show>
  )
}
