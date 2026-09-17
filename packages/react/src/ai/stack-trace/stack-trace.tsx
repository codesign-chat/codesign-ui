import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'
import { useControllableState } from '../use-controllable-state.ts'
import { useCopyToClipboard } from '../use-copy.ts'

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

const StackTraceContext = createContext<StackTraceContextValue | null>(null)

function useStackTrace() {
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

export type StackTraceProps = ComponentProps<'div'> & {
  defaultOpen?: boolean
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trace: string
}

export function StackTrace({
  defaultOpen = false,
  onFilePathClick,
  onOpenChange,
  open,
  trace,
  children,
  ...props
}: StackTraceProps) {
  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open,
  })

  const parsed = useMemo(() => parseStackTrace(trace), [trace])

  return (
    <StackTraceContext.Provider value={{ isOpen, onFilePathClick, raw: trace, setIsOpen, trace: parsed }}>
      <div data-scope={SCOPE} data-part="root" {...props}>
        {children}
      </div>
    </StackTraceContext.Provider>
  )
}

export type StackTraceHeaderProps = ComponentProps<'div'>

export function StackTraceHeader({ children, ...props }: StackTraceHeaderProps) {
  const { isOpen, setIsOpen } = useStackTrace()

  return (
    // role="button" instead of <button>: the header contains interactive actions
    // (copy button) and nested interactive elements inside <button> are invalid HTML
    <div
      aria-expanded={isOpen}
      data-scope={SCOPE}
      data-part="header"
      onClick={(event) => {
        props.onClick?.(event)
        setIsOpen(!isOpen)
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event)
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  )
}

export type StackTraceErrorTypeProps = ComponentProps<'span'>

export function StackTraceErrorType({ children, ...props }: StackTraceErrorTypeProps) {
  const { trace } = useStackTrace()

  if (!trace.errorType) {
    return null
  }

  return (
    <span data-scope={SCOPE} data-part="error-type" {...props}>
      {children ?? trace.errorType}
    </span>
  )
}

export type StackTraceErrorMessageProps = ComponentProps<'span'>

export function StackTraceErrorMessage(props: StackTraceErrorMessageProps) {
  const { trace } = useStackTrace()

  return (
    <span data-scope={SCOPE} data-part="error-message" {...props}>
      {trace.errorMessage}
    </span>
  )
}

export type StackTraceActionsProps = ComponentProps<'div'>

export function StackTraceActions({ children, ...props }: StackTraceActionsProps) {
  return (
    <div
      data-scope={SCOPE}
      data-part="actions"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
}

export type StackTraceCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
  timeout?: number
}

export function StackTraceCopyButton({ children, timeout, ...props }: StackTraceCopyButtonProps) {
  const { raw } = useStackTrace()
  const { copy, isCopied } = useCopyToClipboard({ timeout })

  return (
    <button
      aria-label="Copy stack trace"
      data-copied={isCopied || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={() => copy(raw)}
      type="button"
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}

export type StackTraceContentProps = ComponentProps<typeof Collapsible.Content>

export function StackTraceContent(props: StackTraceContentProps) {
  const { isOpen } = useStackTrace()

  return (
    <Collapsible.Root open={isOpen}>
      <Collapsible.Content data-scope={SCOPE} data-part="content" {...props} />
    </Collapsible.Root>
  )
}

export type StackTraceFramesProps = ComponentProps<'div'>

export function StackTraceFrames({ children, ...props }: StackTraceFramesProps) {
  const { onFilePathClick, trace } = useStackTrace()

  return (
    <div data-scope={SCOPE} data-part="frames" {...props}>
      {children ??
        trace.frames.map((frame, index) => (
          <div data-scope={SCOPE} data-part="frame" data-internal={frame.isInternal || undefined} key={index}>
            {frame.functionName && (
              <span data-scope={SCOPE} data-part="frame-name">
                {frame.functionName}
              </span>
            )}
            {frame.filePath && (
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
            )}
          </div>
        ))}
    </div>
  )
}
