import {
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  provide,
  ref,
  type InjectionKey,
  type CSSProperties,
  type PropType,
  type VNode,
} from 'vue'
import type { BundledLanguage, ThemedToken } from 'shiki'
import { createRawTokens, highlightCode, isBold, isItalic, isUnderline } from './highlight.ts'

const SCOPE = 'code-block'

interface CodeBlockContextValue {
  code: string
}

const codeBlockKey: InjectionKey<CodeBlockContextValue> = Symbol('code-block')

export function useCodeBlock(): CodeBlockContextValue {
  const context = inject(codeBlockKey)
  if (!context) {
    throw new Error('CodeBlock parts must be used within CodeBlock')
  }
  return context
}

const tokenStyle = (token: ThemedToken): CSSProperties => ({
  backgroundColor: token.bgColor,
  color: token.color,
  fontStyle: isItalic(token.fontStyle) ? 'italic' : undefined,
  fontWeight: isBold(token.fontStyle) ? 'bold' : undefined,
  textDecoration: isUnderline(token.fontStyle) ? 'underline' : undefined,
})

const renderBody = (tokenized: { tokens: ThemedToken[][]; fg: string; bg: string }, showLineNumbers: boolean): VNode =>
  h('pre', { 'data-scope': SCOPE, 'data-part': 'pre', style: { backgroundColor: tokenized.bg, color: tokenized.fg } }, [
    h('code', { 'data-part': 'code-inner', 'data-line-numbers': showLineNumbers || undefined }, [
      tokenized.tokens.map((line) =>
        h('span', { 'data-part': 'line', 'data-line-numbers': showLineNumbers || undefined }, [
          line.length === 0
            ? '\n'
            : line.map((token) => h('span', { 'data-part': 'token', style: tokenStyle(token) }, token.content)),
        ]),
      ),
    ]),
  ])

export const CodeBlock = defineComponent({
  name: 'CodeBlock',
  props: {
    code: { type: String, required: true },
    language: { type: String as PropType<BundledLanguage>, required: true },
    showLineNumbers: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    provide(codeBlockKey, { code: props.code })
    return () =>
      h(CodeBlockContainer, { ...attrs, language: props.language }, [
        slots.default?.(),
        h(CodeBlockContent, { code: props.code, language: props.language, showLineNumbers: props.showLineNumbers }),
      ])
  },
})

export const CodeBlockContainer = defineComponent({
  name: 'CodeBlockContainer',
  props: { language: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-language': props.language,
          'data-scope': SCOPE,
          'data-part': 'root',
          style: { containIntrinsicSize: 'auto 200px', contentVisibility: 'auto' },
        },
        slots.default?.(),
      )
  },
})

export const CodeBlockHeader = defineComponent({
  name: 'CodeBlockHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const CodeBlockTitle = defineComponent({
  name: 'CodeBlockTitle',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'title' }, slots.default?.())
  },
})

export const CodeBlockFilename = defineComponent({
  name: 'CodeBlockFilename',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'filename' }, slots.default?.())
  },
})

export const CodeBlockActions = defineComponent({
  name: 'CodeBlockActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'actions' }, slots.default?.())
  },
})

export const CodeBlockContent = defineComponent({
  name: 'CodeBlockContent',
  props: {
    code: { type: String, required: true },
    language: { type: String as PropType<BundledLanguage>, required: true },
    showLineNumbers: { type: Boolean, default: false },
  },
  setup(props) {
    const asyncTokens = ref<{ tokens: ThemedToken[][]; fg: string; bg: string } | null>(null)
    let cancelled = false

    highlightCode(props.code, props.language, (result) => {
      if (!cancelled) {
        asyncTokens.value = result
      }
    })
    onBeforeUnmount(() => {
      cancelled = true
    })

    return () => {
      const tokenized = asyncTokens.value ?? highlightCode(props.code, props.language) ?? createRawTokens(props.code)
      return h('div', { 'data-scope': SCOPE, 'data-part': 'content' }, [renderBody(tokenized, props.showLineNumbers)])
    }
  },
})

export const CodeBlockCopyButton = defineComponent({
  name: 'CodeBlockCopyButton',
  props: { timeout: { type: Number, default: undefined } },
  setup(props, { attrs, slots }) {
    const { code } = useCodeBlock()
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
          type: 'button',
        },
        slots.default?.({ isCopied: isCopied.value }),
      )
  },
})
