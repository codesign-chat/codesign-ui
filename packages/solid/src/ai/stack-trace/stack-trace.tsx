import { For, Show, createContext, createSignal, onCleanup, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

const SCOPE = 'stack-trace'

const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/

interface StackFrame {
  columnNumber: number | null
  filePath: string | null
  functionName: string | null
  isInternal: boolean
  lineNumber: number | null
  raw: string
}

interface ParsedStackTrace {
  errorMessage: string
  errorType: string | null
  frames: StackFrame[]
}

interface StackTraceContextValue {
  isOpen: boolean
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  raw: string
  setIsOpen: (open: boolean) => void
  trace: ParsedStackTrace
}

const StackTraceContext = createContext<StackTraceContextValue>()

export function useStackTrace(): StackTraceContextValue {
  const context = useContext(StackTraceContext)
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

export type StackTraceProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trace: string
}

export function StackTrace(props: StackTraceProps) {
  const [local, rest] = splitProps(props, [
    'defaultOpen',
    'onFilePathClick',
    'onOpenChange',
    'open',
    'trace',
    'children',
  ])
  const [isOpen, setIsOpenRaw] = createSignal(local.open ?? local.defaultOpen ?? false)
  const setIsOpen = (open: boolean) => {
    setIsOpenRaw(open)
    local.onOpenChange?.(open)
  }

  const trace = parseStackTrace(local.trace)
  const contextValue: StackTraceContextValue = {
    get isOpen() {
      return isOpen()
    },
    onFilePathClick: local.onFilePathClick,
    raw: local.trace,
    setIsOpen,
    trace,
  }

  return (
    <StackTraceContext.Provider value={contextValue}>
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </StackTraceContext.Provider>
  )
}

export type StackTraceHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function StackTraceHeader(props: StackTraceHeaderProps) {
  const { isOpen, setIsOpen } = useStackTrace()
  const [local, rest] = splitProps(props, ['children', 'onClick', 'onKeyDown'])

  return (
    <div
      aria-expanded={isOpen}
      data-scope={SCOPE}
      data-part="header"
      onClick={(event) => {
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
        setIsOpen(!isOpen)
      }}
      onKeyDown={(event) => {
        ;(local.onKeyDown as ((event: KeyboardEvent) => void) | undefined)?.(event)
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
      role="button"
      tabIndex={0}
      {...rest}
    >
      {local.children}
    </div>
  )
}

export type StackTraceErrorTypeProps = JSX.HTMLAttributes<HTMLSpanElement>

export function StackTraceErrorType(props: StackTraceErrorTypeProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { trace } = useStackTrace()
  return (
    <Show when={trace.errorType}>
      <span data-scope={SCOPE} data-part="error-type" {...rest}>
        {local.children ?? trace.errorType}
      </span>
    </Show>
  )
}

export type StackTraceErrorMessageProps = JSX.HTMLAttributes<HTMLSpanElement>

export function StackTraceErrorMessage(props: StackTraceErrorMessageProps) {
  const { trace } = useStackTrace()
  return (
    <span data-scope={SCOPE} data-part="error-message" {...props}>
      {trace.errorMessage}
    </span>
  )
}

export type StackTraceActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function StackTraceActions(props: StackTraceActionsProps) {
  const [local, rest] = splitProps(props, ['children', 'onClick', 'onKeyDown'])
  return (
    <div
      data-scope={SCOPE}
      data-part="actions"
      onClick={(event) => {
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
        event.stopPropagation()
      }}
      onKeyDown={(event) => {
        ;(local.onKeyDown as ((event: KeyboardEvent) => void) | undefined)?.(event)
        event.stopPropagation()
      }}
      role="group"
      {...rest}
    >
      {local.children}
    </div>
  )
}

let copiedTimer: ReturnType<typeof setTimeout> | undefined

export type StackTraceCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  children?: JSX.Element
  timeout?: number
}

export function StackTraceCopyButton(props: StackTraceCopyButtonProps) {
  const [local, rest] = splitProps(props, ['children', 'timeout', 'onClick'])
  const { raw } = useStackTrace()
  const [isCopied, setIsCopied] = createSignal(false)

  onCleanup(() => {
    if (copiedTimer) clearTimeout(copiedTimer)
  })

  return (
    <button
      aria-label="Copy stack trace"
      data-copied={isCopied() || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={(event) => {
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
        navigator.clipboard
          .writeText(raw)
          .then(() => {
            setIsCopied(true)
            if (copiedTimer) clearTimeout(copiedTimer)
            copiedTimer = setTimeout(() => setIsCopied(false), local.timeout ?? 2000)
          })
          .catch(() => {
            // clipboard unavailable
          })
      }}
      type="button"
      {...rest}
    >
      {local.children}
    </button>
  )
}

export type StackTraceContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function StackTraceContent(props: StackTraceContentProps) {
  const { isOpen } = useStackTrace()
  return (
    <Collapsible.Root open={isOpen}>
      <Collapsible.Content data-scope={SCOPE} data-part="content" {...props} />
    </Collapsible.Root>
  )
}

export type StackTraceFramesProps = JSX.HTMLAttributes<HTMLDivElement>

export function StackTraceFrames(props: StackTraceFramesProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { onFilePathClick, trace } = useStackTrace()

  return (
    <div data-scope={SCOPE} data-part="frames" {...rest}>
      {local.children ?? (
        <For each={trace.frames}>
          {(frame) => (
            <div data-internal={frame.isInternal || undefined} data-scope={SCOPE} data-part="frame">
              <Show when={frame.functionName}>
                <span data-scope={SCOPE} data-part="frame-name">
                  {frame.functionName}
                </span>
              </Show>
              <Show when={frame.filePath}>
                <button
                  data-scope={SCOPE}
                  data-part="frame-path"
                  onClick={
                    onFilePathClick
                      ? () =>
                          onFilePathClick(
                            frame.filePath as string,
                            frame.lineNumber ?? undefined,
                            frame.columnNumber ?? undefined,
                          )
                      : undefined
                  }
                  type="button"
                >
                  {frame.filePath}
                  {frame.lineNumber !== null && `:${frame.lineNumber}`}
                  {frame.columnNumber !== null && `:${frame.columnNumber}`}
                </button>
              </Show>
            </div>
          )}
        </For>
      )}
    </div>
  )
}
