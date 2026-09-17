import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
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

const SchemaDisplayContext = createContext<SchemaDisplayContextValue>({ method: 'GET', path: '' })

function useSchemaDisplay() {
  return useContext(SchemaDisplayContext)
}

export type SchemaDisplayProps = ComponentProps<'div'> & {
  description?: string
  method?: SchemaHttpMethod
  parameters?: SchemaParameter[]
  path: string
}

export function SchemaDisplay({ description, method = 'GET', parameters, path, ...props }: SchemaDisplayProps) {
  const contextValue = useMemo<SchemaDisplayContextValue>(
    () => ({ description, method, parameters, path }),
    [description, method, parameters, path],
  )

  return (
    <SchemaDisplayContext.Provider value={contextValue}>
      <div data-scope={SCOPE} data-part="root" {...props} />
    </SchemaDisplayContext.Provider>
  )
}

export type SchemaDisplayHeaderProps = ComponentProps<'div'>

export function SchemaDisplayHeader(props: SchemaDisplayHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type SchemaDisplayMethodProps = ComponentProps<'span'>

export function SchemaDisplayMethod({ children, ...props }: SchemaDisplayMethodProps) {
  const { method } = useSchemaDisplay()

  return (
    <span data-method={method} data-scope={SCOPE} data-part="method" {...props}>
      {children ?? method}
    </span>
  )
}

export type SchemaDisplayPathProps = ComponentProps<'span'>

export function SchemaDisplayPath({ children, ...props }: SchemaDisplayPathProps) {
  const { path } = useSchemaDisplay()
  // Split so {param} segments can be highlighted without dangerouslySetInnerHTML
  const segments = children ?? path.split(/(\{[^}]+\})/g)

  return (
    <span data-scope={SCOPE} data-part="path" {...props}>
      {Array.isArray(segments)
        ? segments.map((segment, index) =>
            segment.startsWith('{') && segment.endsWith('}') ? (
              <em data-scope={SCOPE} data-part="path-param" key={index}>
                {segment}
              </em>
            ) : (
              (segment as ReactNode)
            ),
          )
        : segments}
    </span>
  )
}

export type SchemaDisplayDescriptionProps = ComponentProps<'p'>

export function SchemaDisplayDescription({ children, ...props }: SchemaDisplayDescriptionProps) {
  const { description } = useSchemaDisplay()

  if (!(children || description)) {
    return null
  }

  return (
    <p data-scope={SCOPE} data-part="description" {...props}>
      {children ?? description}
    </p>
  )
}

export type SchemaDisplayContentProps = ComponentProps<'div'>

export function SchemaDisplayContent(props: SchemaDisplayContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type SchemaDisplaySectionProps = ComponentProps<typeof Collapsible.Root> & {
  count?: number
  defaultOpen?: boolean
  label: string
}

export function SchemaDisplaySection({
  count,
  defaultOpen = false,
  label,
  children,
  ...props
}: SchemaDisplaySectionProps) {
  return (
    <Collapsible.Root data-scope={SCOPE} data-part="section" defaultOpen={defaultOpen} {...props}>
      <Collapsible.Trigger data-scope={SCOPE} data-part="section-trigger">
        <span data-scope={SCOPE} data-part="section-label">
          {label}
          {count !== undefined && (
            <span data-scope={SCOPE} data-part="section-count">
              {count}
            </span>
          )}
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content data-scope={SCOPE} data-part="section-content">
        <div data-scope={SCOPE} data-part="section-body">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export type SchemaDisplayParameterProps = ComponentProps<'div'> & {
  parameter: SchemaParameter
}

export function SchemaDisplayParameter({ parameter, ...props }: SchemaDisplayParameterProps) {
  return (
    <div data-scope={SCOPE} data-part="parameter" {...props}>
      <span data-scope={SCOPE} data-part="parameter-name">
        {parameter.name}
      </span>
      <span data-scope={SCOPE} data-part="parameter-type">
        {parameter.type}
      </span>
      {parameter.location && (
        <span data-scope={SCOPE} data-part="parameter-location">
          {parameter.location}
        </span>
      )}
      {parameter.required && (
        <span data-scope={SCOPE} data-part="parameter-required">
          required
        </span>
      )}
      {parameter.description && (
        <span data-scope={SCOPE} data-part="parameter-description">
          {parameter.description}
        </span>
      )}
    </div>
  )
}

export type SchemaDisplayPropertyProps = Omit<ComponentProps<'div'>, 'property'> & {
  depth?: number
  property: SchemaProperty
}

export function SchemaDisplayProperty({ depth = 0, property, ...props }: SchemaDisplayPropertyProps) {
  const hasChildren = Boolean(property.properties?.length || property.items)

  return (
    <div data-scope={SCOPE} data-part="property" style={{ marginLeft: depth > 0 ? '0.75rem' : undefined }} {...props}>
      <div data-scope={SCOPE} data-part="property-row">
        <span data-scope={SCOPE} data-part="property-name">
          {property.name}
        </span>
        <span data-scope={SCOPE} data-part="property-type">
          {property.type}
        </span>
        {property.required && (
          <span data-scope={SCOPE} data-part="property-required">
            required
          </span>
        )}
      </div>
      {property.description && (
        <p data-scope={SCOPE} data-part="property-description">
          {property.description}
        </p>
      )}
      {property.properties?.map((child) => (
        <SchemaDisplayProperty depth={depth + 1} key={child.name} property={child} />
      ))}
      {property.items && <SchemaDisplayProperty depth={depth + 1} property={property.items} />}
      {!hasChildren && null}
    </div>
  )
}

export type SchemaDisplayExampleProps = ComponentProps<'pre'>

export function SchemaDisplayExample(props: SchemaDisplayExampleProps) {
  return <pre data-scope={SCOPE} data-part="example" {...props} />
}
