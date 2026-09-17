import { getContext } from 'svelte'

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

export interface SchemaDisplayContextValue {
  description?: string
  method: SchemaHttpMethod
  parameters?: SchemaParameter[]
  path: string
}

export const schemaDisplayKey: symbol = Symbol('schema-display')

export function useSchemaDisplay(): SchemaDisplayContextValue {
  const context = getContext<SchemaDisplayContextValue>(schemaDisplayKey)
  if (!context) {
    throw new Error('SchemaDisplay components must be used within SchemaDisplay')
  }
  return context
}
