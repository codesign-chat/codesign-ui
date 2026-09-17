import { defineComponent, h, inject, provide, ref, type InjectionKey, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'chain-of-thought'

interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const chainKey: InjectionKey<ChainOfThoughtContextValue> = Symbol('chain-of-thought')

export function useChainOfThought(): ChainOfThoughtContextValue {
  const context = inject(chainKey)
  if (!context) {
    throw new Error('ChainOfThought components must be used within ChainOfThought')
  }
  return context
}

export const ChainOfThought = defineComponent({
  name: 'ChainOfThought',
  props: {
    defaultOpen: { type: Boolean, default: false },
    onOpenChange: { type: Function as PropType<(open: boolean) => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const isOpen = ref(props.defaultOpen)
    const setIsOpen = (open: boolean) => {
      isOpen.value = open
      props.onOpenChange?.(open)
    }
    provide(chainKey, {
      get isOpen() {
        return isOpen.value
      },
      setIsOpen,
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const ChainOfThoughtHeader = defineComponent({
  name: 'ChainOfThoughtHeader',
  setup(_, { attrs, slots }) {
    const { isOpen, setIsOpen } = useChainOfThought()
    return () =>
      h(
        CollapsibleRoot,
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'header-collapsible',
          open: isOpen,
          onOpenChange: (details: { open: boolean }) => setIsOpen(details.open),
        },
        () => h(CollapsibleTrigger, { 'data-scope': SCOPE, 'data-part': 'trigger' }, slots.default),
      )
  },
})

export const ChainOfThoughtStep = defineComponent({
  name: 'ChainOfThoughtStep',
  props: {
    description: { type: String, default: undefined },
    label: { type: String, required: true },
    status: { type: String as () => 'active' | 'complete' | 'pending', default: 'complete' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'step', 'data-status': props.status }, [
        h('div', { 'data-scope': SCOPE, 'data-part': 'step-marker' }, slots.icon?.()),
        h('div', { 'data-scope': SCOPE, 'data-part': 'step-body' }, [
          h('div', { 'data-scope': SCOPE, 'data-part': 'step-label' }, props.label),
          props.description
            ? h('div', { 'data-scope': SCOPE, 'data-part': 'step-description' }, props.description)
            : null,
          slots.default?.(),
        ]),
      ])
  },
})

export const ChainOfThoughtSearchResults = defineComponent({
  name: 'ChainOfThoughtSearchResults',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'search-results' }, slots.default?.())
  },
})

export const ChainOfThoughtSearchResult = defineComponent({
  name: 'ChainOfThoughtSearchResult',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'search-result' }, slots.default?.())
  },
})

export const ChainOfThoughtContent = defineComponent({
  name: 'ChainOfThoughtContent',
  setup(_, { attrs, slots }) {
    const { isOpen } = useChainOfThought()
    return () =>
      h(CollapsibleRoot, { 'data-scope': SCOPE, 'data-part': 'content-collapsible', open: isOpen }, () =>
        h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default),
      )
  },
})

export const ChainOfThoughtImage = defineComponent({
  name: 'ChainOfThoughtImage',
  props: { caption: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'image' }, [
        h('div', { 'data-scope': SCOPE, 'data-part': 'image-frame' }, slots.default?.()),
        props.caption ? h('p', { 'data-scope': SCOPE, 'data-part': 'image-caption' }, props.caption) : null,
      ])
  },
})
