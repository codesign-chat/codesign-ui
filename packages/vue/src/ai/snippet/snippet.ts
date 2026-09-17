import { defineComponent, h, inject, provide, ref, type InjectionKey } from 'vue'

const SCOPE = 'snippet'

interface SnippetContextValue {
  code: string
}

const snippetKey: InjectionKey<SnippetContextValue> = Symbol('snippet')

export function useSnippet(): SnippetContextValue {
  const context = inject(snippetKey)
  if (!context) {
    throw new Error('Snippet parts must be used within Snippet')
  }
  return context
}

export const Snippet = defineComponent({
  name: 'Snippet',
  props: { code: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    provide(snippetKey, { code: props.code })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const SnippetAddon = defineComponent({
  name: 'SnippetAddon',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'addon' }, slots.default?.())
  },
})

export const SnippetText = defineComponent({
  name: 'SnippetText',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'text' }, slots.default?.())
  },
})

export const SnippetInput = defineComponent({
  name: 'SnippetInput',
  setup(_, { attrs }) {
    const { code } = useSnippet()
    return () => h('input', { ...attrs, 'data-scope': SCOPE, 'data-part': 'input', readOnly: true, value: code })
  },
})

export const SnippetCopyButton = defineComponent({
  name: 'SnippetCopyButton',
  props: { timeout: { type: Number, default: undefined } },
  setup(props, { attrs, slots }) {
    const { code } = useSnippet()
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
              .writeText(code)
              .then(() => {
                isCopied.value = true
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => (isCopied.value = false), props.timeout ?? 2000)
              })
              .catch(() => {
                // clipboard unavailable
              })
          },
          title: 'Copy',
          type: 'button',
        },
        slots.default?.({ isCopied: isCopied.value }),
      )
  },
})
