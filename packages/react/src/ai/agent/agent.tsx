import type { ComponentProps, ReactNode } from 'react'
import { Accordion } from '../../components/accordion/index.ts'
import { CodeBlock } from '../code-block/code-block.tsx'

const SCOPE = 'agent'

export type AgentProps = ComponentProps<'div'>

export function Agent(props: AgentProps) {
  return <div data-scope={SCOPE} data-part="root" {...props} />
}

export type AgentHeaderProps = ComponentProps<'div'> & {
  model?: ReactNode
  name: ReactNode
}

export function AgentHeader({ model, name, children, ...props }: AgentHeaderProps) {
  return (
    <div data-scope={SCOPE} data-part="header" {...props}>
      <div data-scope={SCOPE} data-part="header-identity">
        {children ?? (
          <>
            <span data-scope={SCOPE} data-part="name">
              {name}
            </span>
            {model && (
              <span data-scope={SCOPE} data-part="model">
                {model}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export type AgentContentProps = ComponentProps<'div'>

export function AgentContent(props: AgentContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type AgentInstructionsProps = ComponentProps<'div'> & {
  children: string
}

export function AgentInstructions({ children, ...props }: AgentInstructionsProps) {
  return (
    <div data-scope={SCOPE} data-part="instructions" {...props}>
      <span data-scope={SCOPE} data-part="instructions-label">
        Instructions
      </span>
      <p data-scope={SCOPE} data-part="instructions-body">
        {children}
      </p>
    </div>
  )
}

export type AgentToolsProps = ComponentProps<typeof Accordion.Root>

export function AgentTools({ children, ...props }: AgentToolsProps) {
  return (
    <div data-scope={SCOPE} data-part="tools" {...props}>
      <span data-scope={SCOPE} data-part="tools-label">
        Tools
      </span>
      <Accordion.Root data-scope={SCOPE} data-part="tools-list">
        {children}
      </Accordion.Root>
    </div>
  )
}

export type AgentToolProps = Omit<ComponentProps<typeof Accordion.Item>, 'value'> & {
  description?: ReactNode
  schema: string
  toolName: string
}

export function AgentTool({ description, schema, toolName, ...props }: AgentToolProps) {
  return (
    <Accordion.Item data-scope={SCOPE} data-part="tool" value={toolName} {...props}>
      <Accordion.ItemTrigger data-scope={SCOPE} data-part="tool-trigger">
        <span data-scope={SCOPE} data-part="tool-name">
          {toolName}
        </span>
        <span data-scope={SCOPE} data-part="tool-description">
          {description ?? 'No description'}
        </span>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent data-scope={SCOPE} data-part="tool-content">
        <div data-scope={SCOPE} data-part="tool-schema">
          <CodeBlock code={schema} language="json" />
        </div>
      </Accordion.ItemContent>
    </Accordion.Item>
  )
}

export type AgentOutputProps = ComponentProps<'div'> & {
  schema: string
}

export function AgentOutput({ schema, ...props }: AgentOutputProps) {
  return (
    <div data-scope={SCOPE} data-part="output" {...props}>
      <span data-scope={SCOPE} data-part="output-label">
        Output Schema
      </span>
      <div data-scope={SCOPE} data-part="output-schema">
        <CodeBlock code={schema} language="typescript" />
      </div>
    </div>
  )
}
