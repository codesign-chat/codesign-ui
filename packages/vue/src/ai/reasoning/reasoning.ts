import {
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  watchEffect,
  type InjectionKey,
  type PropType,
  type VNode,
} from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'
import { Shimmer } from '../shimmer/shimmer.ts'

const SCOPE = 'reasoning'
const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

export interface ReasoningContextValue {
  duration: number | undefined
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const reasoningKey: InjectionKey<ReasoningContextValue> = Symbol('reasoning')

export function useReasoning(): ReasoningContextValue {
  const context = inject(reasoningKey)
  if (!context) {
    throw new Error('Reasoning components must be used within Reasoning')
  }
  return context
}

export const Reasoning = defineComponent({
  name: 'Reasoning',
  props: {
    isStreaming: { type: Boolean, default: false },
    defaultOpen: { type: Boolean, default: undefined },
    duration: { type: Number, default: undefined },
    onOpenChange: { type: Function as PropType<(open: boolean) => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const resolvedDefaultOpen = props.defaultOpen ?? props.isStreaming
    const isExplicitlyClosed = props.defaultOpen === false

    const isOpen = ref(resolvedDefaultOpen)
    const duration = ref<number | undefined>(props.duration)

    const setIsOpen = (open: boolean) => {
      isOpen.value = open
      props.onOpenChange?.(open)
    }

    let hasEverStreamed = props.isStreaming
    let startTime: number | null = null

    watchEffect(() => {
      if (props.isStreaming) {
        hasEverStreamed = true
        if (startTime === null) startTime = Date.now()
      } else if (startTime !== null) {
        duration.value = Math.ceil((Date.now() - startTime) / MS_IN_S)
        startTime = null
      }
    })

    watchEffect(() => {
      if (props.isStreaming && !isOpen.value && !isExplicitlyClosed) {
        setIsOpen(true)
      }
    })

    watchEffect(() => {
      if (hasEverStreamed && !props.isStreaming && isOpen.value) {
        const timer = setTimeout(() => setIsOpen(false), AUTO_CLOSE_DELAY)
        onBeforeUnmount(() => clearTimeout(timer))
      }
    })

    provide(reasoningKey, {
      get duration() {
        return duration.value
      },
      get isStreaming() {
        return props.isStreaming
      },
      get isOpen() {
        return isOpen.value
      },
      setIsOpen,
    })

    return () =>
      h(
        CollapsibleRoot,
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'root',
          open: isOpen.value,
          onOpenChange: (details: { open: boolean }) => setIsOpen(details.open),
        },
        slots.default,
      )
  },
})

export const ReasoningTrigger = defineComponent({
  name: 'ReasoningTrigger',
  props: {
    getThinkingMessage: {
      type: Function as PropType<(isStreaming: boolean, duration?: number) => VNode>,
      default: undefined,
    },
  },
  setup(props, { attrs, slots }) {
    const context = useReasoning()

    const defaultThinkingMessage = () => {
      if (context.isStreaming || context.duration === 0) {
        return h(Shimmer, { children: 'Thinking...' })
      }
      if (context.duration === undefined) {
        return h('p', 'Thought for a few seconds')
      }
      return h('p', 'Thought for ' + context.duration + ' seconds')
    }

    return () =>
      h(
        CollapsibleTrigger,
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'trigger',
        },
        () =>
          slots.default?.() ??
          props.getThinkingMessage?.(context.isStreaming, context.duration) ?? [defaultThinkingMessage()],
      )
  },
})

export const ReasoningContent = defineComponent({
  name: 'ReasoningContent',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})
