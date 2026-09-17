import { For, Show, createContext, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

const SCOPE = 'schema-display'

export type SchemaHttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export interface SchemaParameter {
  description?: string
  location?: 'header' | 'path' | 'query'
  name: string
  required?: boolean
  type: string
}

export interface SchemaProperty {
  description?: string
  items?: SchemaProperty
  name: string
  properties?: SchemaProperty[]
  required?: boolean
  type: string
}

interface SchemaDisplayContextValue {
  description?: string
  method: SchemaHttpMethod
  parameters?: SchemaParameter[]
  path: string
}

const SchemaDisplayContext = createContext<SchemaDisplayContextValue>()

export function useSchemaDisplay(): SchemaDisplayContextValue {
  const context = useContext(SchemaDisplayContext)
  if (!context) {
    throw new Error('SchemaDisplay components must be used within SchemaDisplay')
  }
  return context
}

export type SchemaDisplayProps = JSX.HTMLAttributes<HTMLDivElement> & {
  description?: string
  method?: SchemaHttpMethod
  parameters?: SchemaParameter[]
  path: string
}

export function SchemaDisplay(props: SchemaDisplayProps) {
  const [local, rest] = splitProps(props, ['description', 'method', 'parameters', 'path', 'children'])

  return (
    <SchemaDisplayContext.Provider
      value={{
        description: local.description,
        method: local.method ?? 'GET',
        parameters: local.parameters,
        path: local.path,
      }}
    >
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </SchemaDisplayContext.Provider>
  )
}

export type SchemaDisplayHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function SchemaDisplayHeader(props: SchemaDisplayHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type SchemaDisplayMethodProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SchemaDisplayMethod(props: SchemaDisplayMethodProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { method } = useSchemaDisplay()
  return (
    <span data-method={method} data-scope={SCOPE} data-part="method" {...rest}>
      {local.children ?? method}
    </span>
  )
}

export type SchemaDisplayPathProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SchemaDisplayPath(props: SchemaDisplayPathProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { path } = useSchemaDisplay()
  const segments = local.children ?? path.split(/(\{[^}]+\})/g)

  return (
    <span data-scope={SCOPE} data-part="path" {...rest}>
      <For each={Array.isArray(segments) ? segments : [segments]}>
        {(segment) =>
          typeof segment === 'string' && segment.startsWith('{') && segment.endsWith('}') ? (
            <em data-scope={SCOPE} data-part="path-param">
              {segment}
            </em>
          ) : (
            segment
          )
        }
      </For>
    </span>
  )
}

export type SchemaDisplayDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function SchemaDisplayDescription(props: SchemaDisplayDescriptionProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { description } = useSchemaDisplay()
  return (
    <Show when={local.children || description}>
      <p data-scope={SCOPE} data-part="description" {...rest}>
        {local.children ?? description}
      </p>
    </Show>
  )
}

export type SchemaDisplayContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SchemaDisplayContent(props: SchemaDisplayContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type SchemaDisplaySectionProps = JSX.HTMLAttributes<HTMLDivElement> & {
  count?: number
  defaultOpen?: boolean
  label: string
}

export function SchemaDisplaySection(props: SchemaDisplaySectionProps) {
  const [local, rest] = splitProps(props, ['count', 'defaultOpen', 'label', 'children'])

  return (
    <Collapsible.Root data-scope={SCOPE} data-part="section" defaultOpen={local.defaultOpen ?? false} {...rest}>
      <Collapsible.Trigger data-scope={SCOPE} data-part="section-trigger">
        <span data-scope={SCOPE} data-part="section-label">
          {local.label}
          <Show when={local.count !== undefined}>
            <span data-scope={SCOPE} data-part="section-count">
              {local.count}
            </span>
          </Show>
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content data-scope={SCOPE} data-part="section-content">
        <div data-scope={SCOPE} data-part="section-body">
          {local.children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export type SchemaDisplayParameterProps = JSX.HTMLAttributes<HTMLDivElement> & {
  parameter: SchemaParameter
}

export function SchemaDisplayParameter(props: SchemaDisplayParameterProps) {
  const [local, rest] = splitProps(props, ['parameter'])
  return (
    <div data-scope={SCOPE} data-part="parameter" {...rest}>
      <span data-scope={SCOPE} data-part="parameter-name">
        {local.parameter.name}
      </span>
      <span data-scope={SCOPE} data-part="parameter-type">
        {local.parameter.type}
      </span>
      <Show when={local.parameter.location}>
        <span data-scope={SCOPE} data-part="parameter-location">
          {local.parameter.location}
        </span>
      </Show>
      <Show when={local.parameter.required}>
        <span data-scope={SCOPE} data-part="parameter-required">
          required
        </span>
      </Show>
      <Show when={local.parameter.description}>
        <span data-scope={SCOPE} data-part="parameter-description">
          {local.parameter.description}
        </span>
      </Show>
    </div>
  )
}

export type SchemaDisplayPropertyProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'property'> & {
  depth?: number
  property: SchemaProperty
}

export function SchemaDisplayProperty(props: SchemaDisplayPropertyProps) {
  const [local, rest] = splitProps(props, ['depth', 'property'])
  const depth = () => local.depth ?? 0

  return (
    <div
      data-scope={SCOPE}
      data-part="property"
      style={{ 'margin-left': depth() > 0 ? '0.75rem' : undefined }}
      {...rest}
    >
      <div data-scope={SCOPE} data-part="property-row">
        <span data-scope={SCOPE} data-part="property-name">
          {local.property.name}
        </span>
        <span data-scope={SCOPE} data-part="property-type">
          {local.property.type}
        </span>
        <Show when={local.property.required}>
          <span data-scope={SCOPE} data-part="property-required">
            required
          </span>
        </Show>
      </div>
      <Show when={local.property.description}>
        <p data-scope={SCOPE} data-part="property-description">
          {local.property.description}
        </p>
      </Show>
      <For each={local.property.properties}>
        {(child) => <SchemaDisplayProperty depth={depth() + 1} property={child} />}
      </For>
      <Show when={local.property.items}>
        {(item) => <SchemaDisplayProperty depth={depth() + 1} property={item()} />}
      </Show>
    </div>
  )
}

export type SchemaDisplayExampleProps = JSX.HTMLAttributes<HTMLPreElement>

export function SchemaDisplayExample(props: SchemaDisplayExampleProps) {
  return <pre data-scope={SCOPE} data-part="example" {...props} />
}
