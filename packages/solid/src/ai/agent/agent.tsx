import { Show, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from '../../components/accordion/index.ts'
import { CodeBlock } from '../code-block/code-block.tsx'

const SCOPE = 'agent'

export type AgentProps = JSX.HTMLAttributes<HTMLDivElement>

export function Agent(props: AgentProps) {
  return <div data-scope={SCOPE} data-part="root" {...props} />
}

export type AgentHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & {
  model?: JSX.Element
  name: JSX.Element
}

export function AgentHeader(props: AgentHeaderProps) {
  const [local, rest] = splitProps(props, ['model', 'name', 'children'])
  return (
    <div data-scope={SCOPE} data-part="header" {...rest}>
      <div data-scope={SCOPE} data-part="header-identity">
        {local.children ?? (
          <>
            <span data-scope={SCOPE} data-part="name">
              {local.name}
            </span>
            <Show when={local.model}>
              <span data-scope={SCOPE} data-part="model">
                {local.model}
              </span>
            </Show>
          </>
        )}
      </div>
    </div>
  )
}

export type AgentContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function AgentContent(props: AgentContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type AgentInstructionsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  children: string
}

export function AgentInstructions(props: AgentInstructionsProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <div data-scope={SCOPE} data-part="instructions" {...rest}>
      <span data-scope={SCOPE} data-part="instructions-label">
        Instructions
      </span>
      <p data-scope={SCOPE} data-part="instructions-body">
        {local.children}
      </p>
    </div>
  )
}

export type AgentToolsProps = Record<string, unknown>

export function AgentTools(props: AgentToolsProps) {
  const [local, rest] = splitProps(props as any, ['children'])
  return (
    <div data-scope={SCOPE} data-part="tools" {...(rest as any)}>
      <span data-scope={SCOPE} data-part="tools-label">
        Tools
      </span>
      <AccordionRoot data-scope={SCOPE} data-part="tools-list">
        {local.children}
      </AccordionRoot>
    </div>
  )
}

export type AgentToolProps = {
  description?: JSX.Element
  schema: string
  toolName: string
  children?: JSX.Element
}

export function AgentTool(props: AgentToolProps) {
  const [local, rest] = splitProps(props, ['description', 'schema', 'toolName', 'children'])
  return (
    <AccordionItem data-scope={SCOPE} data-part="tool" value={local.toolName} {...(rest as any)}>
      <AccordionItemTrigger data-scope={SCOPE} data-part="tool-trigger">
        <span data-scope={SCOPE} data-part="tool-name">
          {local.toolName}
        </span>
        <span data-scope={SCOPE} data-part="tool-description">
          {local.description ?? 'No description'}
        </span>
      </AccordionItemTrigger>
      <AccordionItemContent data-scope={SCOPE} data-part="tool-content">
        <div data-scope={SCOPE} data-part="tool-schema">
          <CodeBlock code={local.schema} language="json" />
        </div>
      </AccordionItemContent>
    </AccordionItem>
  )
}

export type AgentOutputProps = JSX.HTMLAttributes<HTMLDivElement> & {
  schema: string
}

export function AgentOutput(props: AgentOutputProps) {
  const [local, rest] = splitProps(props, ['schema'])
  return (
    <div data-scope={SCOPE} data-part="output" {...rest}>
      <span data-scope={SCOPE} data-part="output-label">
        Output Schema
      </span>
      <div data-scope={SCOPE} data-part="output-schema">
        <CodeBlock code={local.schema} language="typescript" />
      </div>
    </div>
  )
}
