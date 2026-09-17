import { defineComponent, h, inject, provide, ref, type InjectionKey, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'web-preview'

export interface WebPreviewLog {
  level: 'error' | 'log' | 'warn'
  message: string
  timestamp: Date
}

interface WebPreviewContextValue {
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
  setUrl: (url: string) => void
  url: string
}

const webPreviewKey: InjectionKey<WebPreviewContextValue> = Symbol('web-preview')

export function useWebPreview(): WebPreviewContextValue {
  const context = inject(webPreviewKey)
  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }
  return context
}

export const WebPreview = defineComponent({
  name: 'WebPreview',
  props: {
    defaultUrl: { type: String, default: '' },
    onUrlChange: { type: Function as PropType<(url: string) => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const url = ref(props.defaultUrl)
    const consoleOpen = ref(false)
    provide(webPreviewKey, {
      get consoleOpen() {
        return consoleOpen.value
      },
      setConsoleOpen(open: boolean) {
        consoleOpen.value = open
      },
      setUrl(next: string) {
        url.value = next
        props.onUrlChange?.(next)
      },
      get url() {
        return url.value
      },
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const WebPreviewNavigation = defineComponent({
  name: 'WebPreviewNavigation',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'navigation' }, slots.default?.())
  },
})

export const WebPreviewNavigationButton = defineComponent({
  name: 'WebPreviewNavigationButton',
  props: { tooltip: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'navigation-button', title: props.tooltip, type: 'button' },
        slots.default?.(),
      )
  },
})

export const WebPreviewUrl = defineComponent({
  name: 'WebPreviewUrl',
  props: { placeholder: { type: String, default: 'Enter URL…' } },
  setup(props, { attrs }) {
    const { setUrl, url } = useWebPreview()
    const inputValue = ref(url)
    return () =>
      h('input', {
        ...attrs,
        'data-scope': SCOPE,
        'data-part': 'url',
        onInput: (event: Event) => (inputValue.value = (event.target as HTMLInputElement).value),
        onKeydown: (event: KeyboardEvent) => {
          if (event.key === 'Enter') setUrl(inputValue.value)
        },
        placeholder: props.placeholder,
        value: inputValue.value,
      })
  },
})

export const WebPreviewBody = defineComponent({
  name: 'WebPreviewBody',
  props: {
    src: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const { url } = useWebPreview()
    return () =>
      h('div', { 'data-scope': SCOPE, 'data-part': 'body' }, [
        h('iframe', {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'iframe',
          sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups allow-presentation',
          src: (props.src ?? url) || undefined,
          title: 'Preview',
        }),
        slots.default?.(),
      ])
  },
})

export const WebPreviewConsole = defineComponent({
  name: 'WebPreviewConsole',
  props: { logs: { type: Array as PropType<WebPreviewLog[]>, default: () => [] } },
  setup(props, { attrs, slots }) {
    const { consoleOpen, setConsoleOpen } = useWebPreview()
    return () =>
      h(
        CollapsibleRoot,
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'console',
          onOpenChange: (details: { open: boolean }) => setConsoleOpen(details.open),
          open: consoleOpen,
        },
        () => [
          h(CollapsibleTrigger, { 'data-scope': SCOPE, 'data-part': 'console-trigger' }, () => ['Console']),
          h(CollapsibleContent, { 'data-scope': SCOPE, 'data-part': 'console-content' }, () =>
            h('div', { 'data-scope': SCOPE, 'data-part': 'console-logs' }, [
              props.logs.length === 0
                ? h('p', { 'data-scope': SCOPE, 'data-part': 'console-empty' }, 'No console output')
                : props.logs.map((log) =>
                    h(
                      'div',
                      {
                        'data-level': log.level,
                        'data-scope': SCOPE,
                        'data-part': 'console-log',
                        key: log.timestamp.getTime(),
                      },
                      [
                        h('span', { 'data-scope': SCOPE, 'data-part': 'log-time' }, log.timestamp.toLocaleTimeString()),
                        h('span', { 'data-scope': SCOPE, 'data-part': 'log-message' }, log.message),
                      ],
                    ),
                  ),
              slots.default?.(),
            ]),
          ),
        ],
      )
  },
})
