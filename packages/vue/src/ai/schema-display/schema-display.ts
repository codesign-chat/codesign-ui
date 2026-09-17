import { computed, defineComponent, h, inject, provide, type InjectionKey, type PropType, type VNode } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

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

const schemaDisplayKey: InjectionKey<SchemaDisplayContextValue> = Symbol('schema-display')

export function useSchemaDisplay(): SchemaDisplayContextValue {
  const context = inject(schemaDisplayKey)
  if (!context) {
    throw new Error('SchemaDisplay components must be used within SchemaDisplay')
  }
  return context
}

export const SchemaDisplay = defineComponent({
  name: 'SchemaDisplay',
  props: {
    description: { type: String, default: undefined },
    method: { type: String as PropType<SchemaHttpMethod>, default: 'GET' },
    parameters: { type: Array as PropType<SchemaParameter[]>, default: undefined },
    path: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    provide(schemaDisplayKey, {
      description: props.description,
      method: props.method,
      parameters: props.parameters,
      path: props.path,
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const SchemaDisplayHeader = defineComponent({
  name: 'SchemaDisplayHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const SchemaDisplayMethod = defineComponent({
  name: 'SchemaDisplayMethod',
  setup(_, { attrs }) {
    const { method } = useSchemaDisplay()
    return () =>
      h(
        'span',
        { ...attrs, 'data-method': method, 'data-scope': SCOPE, 'data-part': 'method' },
        slots.default?.() ?? method,
      )
  },
})

export const SchemaDisplayPath = defineComponent({
  name: 'SchemaDisplayPath',
  setup(_, { attrs }) {
    const { path } = useSchemaDisplay()
    const segments = computed(() => path.split(/(\{[^}]+\})/g))
    return () =>
      h(
        'span',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'path' },
        segments.value.map((segment) =>
          segment.startsWith('{') && segment.endsWith('}')
            ? h('em', { 'data-scope': SCOPE, 'data-part': 'path-param' }, segment)
            : segment,
        ),
      )
  },
})

export const SchemaDisplayDescription = defineComponent({
  name: 'SchemaDisplayDescription',
  setup(_, { attrs, slots }) {
    const { description } = useSchemaDisplay()
    return () =>
      description ? h('p', { ...attrs, 'data-scope': SCOPE, 'data-part': 'description' }, description) : null
  },
})

export const SchemaDisplayContent = defineComponent({
  name: 'SchemaDisplayContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})

export const SchemaDisplaySection = defineComponent({
  name: 'SchemaDisplaySection',
  props: {
    count: { type: Number, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    label: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        CollapsibleRoot,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'section', defaultOpen: props.defaultOpen },
        () => [
          h(CollapsibleTrigger, { 'data-scope': SCOPE, 'data-part': 'section-trigger' }, () =>
            h('span', { 'data-scope': SCOPE, 'data-part': 'section-label' }, [
              props.label,
              props.count !== undefined
                ? h('span', { 'data-scope': SCOPE, 'data-part': 'section-count' }, String(props.count))
                : null,
            ]),
          ),
          h(CollapsibleContent, { 'data-scope': SCOPE, 'data-part': 'section-content' }, () =>
            h('div', { 'data-scope': SCOPE, 'data-part': 'section-body' }, slots.default?.()),
          ),
        ],
      )
  },
})

export const SchemaDisplayParameter = defineComponent({
  name: 'SchemaDisplayParameter',
  props: { parameter: { type: Object as PropType<SchemaParameter>, required: true } },
  setup(props, { attrs }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'parameter' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'parameter-name' }, props.parameter.name),
        h('span', { 'data-scope': SCOPE, 'data-part': 'parameter-type' }, props.parameter.type),
        props.parameter.location
          ? h('span', { 'data-scope': SCOPE, 'data-part': 'parameter-location' }, props.parameter.location)
          : null,
        props.parameter.required
          ? h('span', { 'data-scope': SCOPE, 'data-part': 'parameter-required' }, 'required')
          : null,
        props.parameter.description
          ? h('span', { 'data-scope': SCOPE, 'data-part': 'parameter-description' }, props.parameter.description)
          : null,
      ])
  },
})

function renderSchemaProperty(property: SchemaProperty, depth: number, attrs: Record<string, unknown>): VNode {
  return h(
    'div',
    {
      ...attrs,
      'data-scope': SCOPE,
      'data-part': 'property',
      style: { marginLeft: depth > 0 ? '0.75rem' : undefined },
    },
    [
      h('div', { 'data-scope': SCOPE, 'data-part': 'property-row' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'property-name' }, property.name),
        h('span', { 'data-scope': SCOPE, 'data-part': 'property-type' }, property.type),
        property.required ? h('span', { 'data-scope': SCOPE, 'data-part': 'property-required' }, 'required') : null,
      ]),
      property.description
        ? h('p', { 'data-scope': SCOPE, 'data-part': 'property-description' }, property.description)
        : null,
      property.properties?.map((child) => renderSchemaProperty(child, depth + 1, attrs)),
      property.items ? renderSchemaProperty(property.items, depth + 1, attrs) : null,
    ],
  )
}

export const SchemaDisplayProperty = defineComponent({
  name: 'SchemaDisplayProperty',
  props: {
    depth: { type: Number, default: 0 },
    property: { type: Object as PropType<SchemaProperty>, required: true },
  },
  setup(props, { attrs }) {
    return () => renderSchemaProperty(props.property, props.depth, attrs)
  },
})

export const SchemaDisplayExample = defineComponent({
  name: 'SchemaDisplayExample',
  setup(_, { attrs, slots }) {
    return () => h('pre', { ...attrs, 'data-scope': SCOPE, 'data-part': 'example' }, slots.default?.())
  },
})
