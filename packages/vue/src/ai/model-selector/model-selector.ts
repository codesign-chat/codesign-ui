import { defineComponent, h, inject, provide, ref, type InjectionKey, type PropType } from 'vue'
import {
  DialogContent,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog/index.ts'

const SCOPE = 'model-selector'

interface ModelSelectorEntry {
  id: string
  onSelect?: (value: string) => void
  value: string
}

interface ModelSelectorContextValue {
  close: () => void
  highlightedValue: string | null
  registerItem: (entry: ModelSelectorEntry) => void
  selectValue: (value: string) => void
  setHighlightedValue: (value: string | null) => void
  setQuery: (query: string) => void
  unregisterItem: (value: string) => void
  visibleValues: string[]
}

const modelSelectorKey: InjectionKey<ModelSelectorContextValue> = Symbol('model-selector')

export function useModelSelector(): ModelSelectorContextValue {
  const context = inject(modelSelectorKey)
  if (!context) {
    throw new Error('ModelSelector components must be used within ModelSelector')
  }
  return context
}

const matchesQuery = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase())

export const ModelSelector = defineComponent({
  name: 'ModelSelector',
  setup(_, { slots }) {
    const entries = ref<ModelSelectorEntry[]>([])
    const query = ref('')
    const open = ref(false)
    const highlightedValue = ref<string | null>(null)

    provide(modelSelectorKey, {
      close: () => (open.value = false),
      get highlightedValue() {
        return highlightedValue.value
      },
      registerItem(entry: ModelSelectorEntry) {
        if (!entries.value.some((item) => item.value === entry.value)) {
          entries.value = [...entries.value, entry]
        }
      },
      selectValue(value: string) {
        entries.value.find((item) => item.value === value)?.onSelect?.(value)
      },
      setHighlightedValue(value: string | null) {
        highlightedValue.value = value
      },
      setQuery(nextQuery: string) {
        query.value = nextQuery
        const firstVisible = entries.value.map((entry) => entry.value).find((value) => matchesQuery(value, nextQuery))
        highlightedValue.value = firstVisible ?? null
      },
      unregisterItem(value: string) {
        entries.value = entries.value.filter((item) => item.value !== value)
      },
      get visibleValues() {
        return entries.value.map((entry) => entry.value).filter((value) => matchesQuery(value, query.value))
      },
    })

    return () =>
      h(
        DialogRoot as any,
        { onOpenChange: (details: { open: boolean }) => (open.value = details.open), open: open.value },
        slots.default,
      )
  },
})

export const ModelSelectorTrigger = defineComponent({
  name: 'ModelSelectorTrigger',
  setup(_, { attrs, slots }) {
    return () => h(DialogTrigger as any, { ...attrs, 'data-scope': SCOPE, 'data-part': 'trigger' }, slots.default)
  },
})

export const ModelSelectorContent = defineComponent({
  name: 'ModelSelectorContent',
  props: { title: { type: String, default: 'Select a model' } },
  setup(props, { slots }) {
    return () =>
      h(DialogPositioner as any, { 'data-scope': SCOPE, 'data-part': 'positioner' }, () =>
        h(DialogContent as any, { 'data-scope': SCOPE, 'data-part': 'content' }, () => [
          h(DialogTitle as any, { 'data-scope': SCOPE, 'data-part': 'title' }, props.title),
          slots.default?.(),
        ]),
      )
  },
})

export const ModelSelectorInput = defineComponent({
  name: 'ModelSelectorInput',
  setup(_, { attrs }) {
    const context = useModelSelector()
    const moveHighlight = (offset: number) => {
      const values = context.visibleValues
      if (values.length === 0) return
      const currentIndex = context.highlightedValue ? values.indexOf(context.highlightedValue) : -1
      context.setHighlightedValue(values[(currentIndex + offset + values.length) % values.length])
    }
    return () =>
      h('input', {
        ...attrs,
        'aria-autocomplete': 'list',
        'aria-controls': 'model-selector-list',
        'aria-expanded': true,
        'data-scope': SCOPE,
        'data-part': 'input',
        onKeydown: (event: KeyboardEvent) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            moveHighlight(1)
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            moveHighlight(-1)
          } else if (event.key === 'Enter' && context.highlightedValue) {
            event.preventDefault()
            context.selectValue(context.highlightedValue)
            context.close()
          } else if (event.key === 'Home' && context.visibleValues.length > 0) {
            event.preventDefault()
            context.setHighlightedValue(context.visibleValues[0])
          } else if (event.key === 'End' && context.visibleValues.length > 0) {
            event.preventDefault()
            const values = context.visibleValues
            context.setHighlightedValue(values[values.length - 1])
          }
        },
        placeholder: 'Search models…',
        role: 'combobox',
        type: 'text',
      })
  },
})

export const ModelSelectorList = defineComponent({
  name: 'ModelSelectorList',
  setup(_, { attrs, slots }) {
    const context = useModelSelector()
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-activedescendant': context.highlightedValue
            ? 'model-selector-item-' + context.visibleValues.indexOf(context.highlightedValue)
            : undefined,
          'aria-label': 'Models',
          'data-scope': SCOPE,
          'data-part': 'list',
          role: 'listbox',
        },
        slots.default?.(),
      )
  },
})

export const ModelSelectorGroup = defineComponent({
  name: 'ModelSelectorGroup',
  props: { label: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, 'aria-label': props.label, 'data-scope': SCOPE, 'data-part': 'group', role: 'group' },
        slots.default?.(),
      )
  },
})

export const ModelSelectorGroupLabel = defineComponent({
  name: 'ModelSelectorGroupLabel',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'group-label' }, slots.default?.())
  },
})

export const ModelSelectorItem = defineComponent({
  name: 'ModelSelectorItem',
  props: {
    onSelect: { type: Function as PropType<(value: string) => void>, default: undefined },
    value: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    const context = useModelSelector()
    context.registerItem({ id: 'rs', onSelect: props.onSelect, value: props.value })
    return () => {
      if (!context.visibleValues.includes(props.value)) return null
      const id = 'model-selector-item-' + context.visibleValues.indexOf(props.value)
      const highlighted = context.highlightedValue === props.value
      return h(
        'div',
        {
          ...attrs,
          'aria-label': props.value,
          'aria-selected': highlighted,
          'data-highlighted': highlighted,
          'data-scope': SCOPE,
          'data-part': 'item',
          'data-value': props.value,
          id,
          onClick: () => {
            context.selectValue(props.value)
            context.close()
          },
          onMouseenter: () => context.setHighlightedValue(props.value),
          role: 'option',
          tabindex: -1,
        },
        slots.default?.(),
      )
    }
  },
})

export const ModelSelectorEmpty = defineComponent({
  name: 'ModelSelectorEmpty',
  setup(_, { attrs, slots }) {
    const context = useModelSelector()
    return () =>
      context.visibleValues.length === 0
        ? h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'empty' }, slots.default?.() ?? 'No models found')
        : null
  },
})

export const ModelSelectorSeparator = defineComponent({
  name: 'ModelSelectorSeparator',
  setup(_, { attrs }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'separator', role: 'separator' })
  },
})

export const ModelSelectorLogo = defineComponent({
  name: 'ModelSelectorLogo',
  props: { provider: { type: String, required: true } },
  setup(props, { attrs }) {
    return () =>
      h('img', {
        ...attrs,
        alt: props.provider + ' logo',
        'data-scope': SCOPE,
        'data-part': 'logo',
        height: 12,
        loading: 'lazy',
        src: 'https://models.dev/logos/' + props.provider + '.svg',
        width: 12,
      })
  },
})

export const ModelSelectorLogoGroup = defineComponent({
  name: 'ModelSelectorLogoGroup',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'logo-group' }, slots.default?.())
  },
})

export const ModelSelectorName = defineComponent({
  name: 'ModelSelectorName',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'name' }, slots.default?.())
  },
})

export const ModelSelectorShortcut = defineComponent({
  name: 'ModelSelectorShortcut',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'shortcut' }, slots.default?.())
  },
})
