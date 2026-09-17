import { defineComponent, h, inject, provide, ref, type InjectionKey, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'stack-trace'

const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/

export interface StackFrame {
  columnNumber: number | null
  filePath: string | null
  functionName: string | null
  isInternal: boolean
  lineNumber: number | null
  raw: string
}

export interface ParsedStackTrace {
  errorMessage: string
  errorType: string | null
  frames: StackFrame[]
}

export interface StackTraceContextValue {
  isOpen: boolean
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  raw: string
  setIsOpen: (open: boolean) => void
  trace: ParsedStackTrace
}

const stackTraceKey: InjectionKey<StackTraceContextValue> = Symbol('stack-trace')

export function useStackTrace(): StackTraceContextValue {
  const context = inject(stackTraceKey)
  if (!context) {
    throw new Error('StackTrace components must be used within StackTrace')
  }
  return context
}

const parseStackFrame = (line: string): StackFrame => {
  const trimmed = line.trim()
  const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX)
  if (withParensMatch) {
    const [, functionName, filePath, lineNum, colNum] = withParensMatch
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: functionName ?? null,
      isInternal: filePath.includes('node_modules') || filePath.startsWith('node:') || filePath.includes('internal/'),
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    }
  }
  const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX)
  if (withoutFnMatch) {
    const [, filePath, lineNum, colNum] = withoutFnMatch
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: null,
      isInternal: filePath.includes('node_modules') || filePath.startsWith('node:') || filePath.includes('internal/'),
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    }
  }
  return {
    columnNumber: null,
    filePath: null,
    functionName: null,
    isInternal: trimmed.includes('node_modules') || trimmed.includes('node:'),
    lineNumber: null,
    raw: trimmed,
  }
}

const parseStackTrace = (trace: string): ParsedStackTrace => {
  const lines = trace.split('\n').filter((line) => line.trim())
  if (lines.length === 0) {
    return { errorMessage: trace, errorType: null, frames: [] }
  }
  const firstLine = lines[0].trim()
  let errorType: string | null = null
  let errorMessage = firstLine
  const errorMatch = firstLine.match(ERROR_TYPE_REGEX)
  if (errorMatch) {
    errorType = errorMatch[1]
    errorMessage = errorMatch[2] || ''
  }
  const frames = lines
    .slice(1)
    .filter((line) => line.trim().startsWith('at '))
    .map(parseStackFrame)
  return { errorMessage, errorType, frames }
}

export const StackTrace = defineComponent({
  name: 'StackTrace',
  props: {
    defaultOpen: { type: Boolean, default: false },
    onFilePathClick: {
      type: Function as PropType<(filePath: string, line?: number, column?: number) => void>,
      default: undefined,
    },
    onOpenChange: { type: Function as PropType<(open: boolean) => void>, default: undefined },
    trace: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    const isOpen = ref(props.defaultOpen)
    const setIsOpen = (open: boolean) => {
      isOpen.value = open
      props.onOpenChange?.(open)
    }
    provide(stackTraceKey, {
      get isOpen() {
        return isOpen.value
      },
      onFilePathClick: props.onFilePathClick,
      raw: props.trace,
      setIsOpen,
      trace: parseStackTrace(props.trace),
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const StackTraceHeader = defineComponent({
  name: 'StackTraceHeader',
  setup(_, { attrs, slots }) {
    const { isOpen, setIsOpen } = useStackTrace()
    return () =>
      h(
        'div',
        {
          ...attrs,
          'aria-expanded': isOpen,
          'data-scope': SCOPE,
          'data-part': 'header',
          onClick: () => setIsOpen(!isOpen),
          onKeydown: (event: KeyboardEvent) => {
            if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault()
              setIsOpen(!isOpen)
            }
          },
          role: 'button',
          tabindex: 0,
        },
        slots.default?.(),
      )
  },
})

export const StackTraceErrorType = defineComponent({
  name: 'StackTraceErrorType',
  setup(_, { attrs, slots }) {
    const { trace } = useStackTrace()
    return () =>
      trace.errorType
        ? h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'error-type' }, slots.default?.() ?? trace.errorType)
        : null
  },
})

export const StackTraceErrorMessage = defineComponent({
  name: 'StackTraceErrorMessage',
  setup(_, { attrs }) {
    const { trace } = useStackTrace()
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'error-message' }, trace.errorMessage)
  },
})

export const StackTraceActions = defineComponent({
  name: 'StackTraceActions',
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'actions',
          onClick: (event: MouseEvent) => event.stopPropagation(),
          onKeydown: (event: KeyboardEvent) => event.stopPropagation(),
          role: 'group',
        },
        slots.default?.(),
      )
  },
})

export const StackTraceCopyButton = defineComponent({
  name: 'StackTraceCopyButton',
  props: { timeout: { type: Number, default: undefined } },
  setup(props, { attrs, slots }) {
    const { raw } = useStackTrace()
    const isCopied = ref(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    return () =>
      h(
        'button',
        {
          ...attrs,
          'aria-label': 'Copy stack trace',
          'data-copied': isCopied.value || undefined,
          'data-scope': SCOPE,
          'data-part': 'copy-button',
          onClick: () => {
            navigator.clipboard
              .writeText(raw)
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
        () => slots.default?.({ isCopied: isCopied.value }),
      )
  },
})

export const StackTraceContent = defineComponent({
  name: 'StackTraceContent',
  setup(_, { attrs, slots }) {
    const { isOpen } = useStackTrace()
    return () =>
      h(CollapsibleRoot, { 'data-scope': SCOPE, 'data-part': 'content-collapsible', open: isOpen }, () =>
        h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default),
      )
  },
})

export const StackTraceFrames = defineComponent({
  name: 'StackTraceFrames',
  setup(_, { attrs, slots }) {
    const { onFilePathClick, trace } = useStackTrace()
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'frames' }, [
        slots.default?.() ??
          trace.frames.map((frame, index) =>
            h(
              'div',
              { 'data-internal': frame.isInternal || undefined, 'data-scope': SCOPE, 'data-part': 'frame', key: index },
              [
                frame.functionName
                  ? h('span', { 'data-scope': SCOPE, 'data-part': 'frame-name' }, frame.functionName)
                  : null,
                frame.filePath
                  ? h(
                      'button',
                      {
                        'data-scope': SCOPE,
                        'data-part': 'frame-path',
                        onClick: onFilePathClick
                          ? () =>
                              onFilePathClick(
                                frame.filePath as string,
                                frame.lineNumber ?? undefined,
                                frame.columnNumber ?? undefined,
                              )
                          : undefined,
                        type: 'button',
                      },
                      frame.filePath +
                        (frame.lineNumber !== null ? ':' + frame.lineNumber : '') +
                        (frame.columnNumber !== null ? ':' + frame.columnNumber : ''),
                    )
                  : null,
              ],
            ),
          ),
      ])
  },
})
