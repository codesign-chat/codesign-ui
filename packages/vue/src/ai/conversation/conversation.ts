import { defineComponent, h, inject, onBeforeUnmount, onMounted, provide, ref, type InjectionKey } from 'vue'

const SCOPE = 'conversation'
const SCROLL_THRESHOLD = 80

export interface ConversationContextValue {
  isAtBottom: boolean
  scrollToBottom: () => void
}

const conversationKey: InjectionKey<ConversationContextValue> = Symbol('conversation')

export function useConversationContext(): ConversationContextValue {
  const context = inject(conversationKey)
  if (!context) {
    throw new Error('Conversation components must be used within Conversation')
  }
  return context
}

export const Conversation = defineComponent({
  name: 'Conversation',
  props: { role: { type: String, default: 'log' } },
  setup(props, { attrs, slots, expose }) {
    const scrollRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const isAtBottom = ref(true)

    const updateIsAtBottom = () => {
      const element = scrollRef.value
      if (!element) return
      const distance = element.scrollHeight - element.scrollTop - element.clientHeight
      isAtBottom.value = distance < SCROLL_THRESHOLD
    }

    const scrollToBottom = () => {
      const element = scrollRef.value
      element?.scrollTo({ top: element.scrollHeight })
    }

    const scrollToBottomInstant = () => {
      const element = scrollRef.value
      if (element) element.scrollTop = element.scrollHeight
    }

    let observer: ResizeObserver | undefined
    onMounted(() => {
      const element = contentRef.value
      if (!element) return
      observer = new ResizeObserver(() => {
        if (isAtBottom.value) scrollToBottomInstant()
        updateIsAtBottom()
      })
      observer.observe(element)
    })
    onBeforeUnmount(() => observer?.disconnect())

    provide(conversationKey, {
      get isAtBottom() {
        return isAtBottom.value
      },
      scrollToBottom,
    })

    expose({ scrollToBottom })

    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: scrollRef,
          'data-scope': SCOPE,
          'data-part': 'root',
          onScroll: updateIsAtBottom,
          role: props.role,
        },
        slots.default,
      )
  },
})

export const ConversationContent = defineComponent({
  name: 'ConversationContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const ConversationEmptyState = defineComponent({
  name: 'ConversationEmptyState',
  props: {
    title: { type: String, default: 'No messages yet' },
    description: { type: String, default: 'Start a conversation to see messages here' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'empty-state' }, [
        slots.default?.() ?? [
          h('div', { 'data-scope': SCOPE, 'data-part': 'empty-state-title' }, props.title),
          h('div', { 'data-scope': SCOPE, 'data-part': 'empty-state-description' }, props.description),
        ],
      ])
  },
})

export const ConversationScrollToBottom = defineComponent({
  name: 'ConversationScrollToBottom',
  setup(_, { attrs }) {
    const context = useConversationContext()
    return () =>
      h('button', {
        ...attrs,
        type: 'button',
        'data-scope': SCOPE,
        'data-part': 'scroll-to-bottom',
        'data-state': context.isAtBottom ? 'at-bottom' : 'detached',
        onClick: () => context.scrollToBottom(),
      })
  },
})
