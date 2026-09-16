import type { DynamicToolUIPart, ToolUIPart } from 'ai'
import type { ComponentProps, ReactNode } from 'react'
import { isValidElement } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

export type ToolProps = ComponentProps<typeof Collapsible.Root>

export function Tool(props: ToolProps) {
  return <Collapsible.Root data-scope="tool" data-part="root" {...props} />
}

export type ToolPart = ToolUIPart | DynamicToolUIPart

export type ToolHeaderProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange' | 'type'> & {
  title?: string
  type: ToolPart['type']
  state: ToolPart['state']
  toolName?: string
}

const statusLabels: Record<ToolPart['state'], string> = {
  'approval-requested': 'Awaiting Approval',
  'approval-responded': 'Responded',
  'input-available': 'Running',
  'input-streaming': 'Pending',
  'output-available': 'Completed',
  'output-denied': 'Denied',
  'output-error': 'Error',
}

export function getStatusLabel(status: ToolPart['state']) {
  return statusLabels[status]
}

export function ToolHeader({ title, type, state, toolName, ...props }: ToolHeaderProps) {
  const derivedName = type === 'dynamic-tool' ? (toolName ?? '') : type.split('-').slice(1).join('-')

  return (
    <Collapsible.Trigger data-scope="tool" data-part="trigger" {...props}>
      <span data-part="title">{title ?? derivedName}</span>
      <span data-part="status" data-status={state}>
        {statusLabels[state]}
      </span>
    </Collapsible.Trigger>
  )
}

export type ToolContentProps = ComponentProps<typeof Collapsible.Content>

export function ToolContent(props: ToolContentProps) {
  return <Collapsible.Content data-scope="tool" data-part="content" {...props} />
}

export type ToolInputProps = ComponentProps<'div'> & {
  input: ToolPart['input']
}

export function ToolInput({ input, ...props }: ToolInputProps) {
  return (
    <div data-scope="tool" data-part="input" {...props}>
      <h4 data-part="label">Parameters</h4>
      <pre data-part="code">{JSON.stringify(input, null, 2)}</pre>
    </div>
  )
}

export type ToolOutputProps = ComponentProps<'div'> & {
  output?: ToolPart['output']
  errorText?: ToolPart['errorText']
}

export function ToolOutput({ output, errorText, ...props }: ToolOutputProps) {
  if (!(output || errorText)) {
    return null
  }

  let rendered: ReactNode = null
  if (typeof output === 'object' && output !== null && !isValidElement(output)) {
    rendered = <pre data-part="code">{JSON.stringify(output, null, 2)}</pre>
  } else if (typeof output === 'string') {
    rendered = <pre data-part="code">{output}</pre>
  } else if (output !== null && output !== undefined) {
    rendered = <div data-part="output-value">{output as ReactNode}</div>
  }

  return (
    <div data-scope="tool" data-part="output" data-error={errorText ? '' : undefined} {...props}>
      <h4 data-part="label">{errorText ? 'Error' : 'Result'}</h4>
      {errorText && <div data-part="error-text">{errorText}</div>}
      {rendered}
    </div>
  )
}
