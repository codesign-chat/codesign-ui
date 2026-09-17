import { defineComponent, h, inject, onMounted, provide, ref, type InjectionKey } from 'vue'
import { parseAnsi } from './ansi.ts'

const SCOPE = 'terminal'

interface TerminalContextValue {
  autoScroll: boolean
  isStreaming: boolean
  onClear?: () => void
  output: string
}

const terminalKey: InjectionKey<TerminalContextValue> = Symbol('terminal')

export function useTerminal(): TerminalContextValue {
  const context = inject(terminalKey)
  if (!context) {
    throw new Error('Terminal parts must be used within Terminal')
  }
  return context
}

export const Terminal = defineComponent({
  name: 'Terminal',
  props: {
    autoScroll: { type: Boolean, default: true },
    isStreaming: { type: Boolean, default: false },
    onClear: { type: Function, default: undefined },
    output: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    provide(terminalKey, {
      autoScroll: props.autoScroll,
      isStreaming: props.isStreaming,
      onClear: props.onClear as (() => void) | undefined,
      output: props.output,
    })
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, [
        slots.default?.() ?? [
          h(TerminalHeader, null, () => [
            h(TerminalTitle),
            h('div', { 'data-scope': SCOPE, 'data-part': 'header-actions' }, [
              h(TerminalStatus),
              h(TerminalActions, null, () => [h(TerminalCopyButton), props.onClear ? h(TerminalClearButton) : null]),
            ]),
          ]),
          h(TerminalContent),
        ],
      ])
  },
})

export const TerminalHeader = defineComponent({
  name: 'TerminalHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const TerminalTitle = defineComponent({
  name: 'TerminalTitle',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'title' }, slots.default?.() ?? 'Terminal')
  },
})

export const TerminalStatus = defineComponent({
  name: 'TerminalStatus',
  setup(_, { attrs, slots }) {
    const { isStreaming } = useTerminal()
    return () =>
      isStreaming ? h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'status' }, slots.default?.()) : null
  },
})

export const TerminalActions = defineComponent({
  name: 'TerminalActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'actions' }, slots.default?.())
  },
})

export const TerminalCopyButton = defineComponent({
  name: 'TerminalCopyButton',
  props: { timeout: { type: Number, default: undefined } },
  setup(props, { attrs, slots }) {
    const { output } = useTerminal()
    const isCopied = ref(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    return () =>
      h(
        'button',
        {
          ...attrs,
          'aria-label': 'Copy',
          'data-copied': isCopied.value || undefined,
          'data-scope': SCOPE,
          'data-part': 'copy-button',
          onClick: () => {
            navigator.clipboard
              .writeText(output)
              .then(() => {
                isCopied.value = true
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => (isCopied.value = false), props.timeout ?? 2000)
              })
              .catch(() => {
                // clipboard unavailable
              })
          },
          type: 'button',
        },
        slots.default?.({ isCopied: isCopied.value }),
      )
  },
})

export const TerminalClearButton = defineComponent({
  name: 'TerminalClearButton',
  setup(_, { attrs, slots }) {
    const { onClear } = useTerminal()
    return () => {
      if (!onClear) return null
      return h(
        'button',
        {
          ...attrs,
          'aria-label': 'Clear',
          'data-scope': SCOPE,
          'data-part': 'clear-button',
          onClick: () => {
            onClear?.()
          },
          type: 'button',
        },
        slots.default?.(),
      )
    }
  },
})

export const TerminalContent = defineComponent({
  name: 'TerminalContent',
  setup(_, { attrs, slots }) {
    const { output, isStreaming, autoScroll } = useTerminal()
    const containerRef = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      if (autoScroll && containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight
      }
    })
    return () => {
      const segments = parseAnsi(output)
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content', ref: containerRef }, [
        slots.default?.() ??
          h('pre', { 'data-scope': SCOPE, 'data-part': 'output' }, [
            segments.map((segment) =>
              h(
                'span',
                {
                  style: {
                    color: segment.color,
                    fontWeight: segment.bold ? 'bold' : undefined,
                    opacity: segment.faint ? 0.6 : undefined,
                  },
                },
                segment.text,
              ),
            ),
            isStreaming ? h('span', { 'data-scope': SCOPE, 'data-part': 'cursor' }) : null,
          ]),
      ])
    }
  },
})
