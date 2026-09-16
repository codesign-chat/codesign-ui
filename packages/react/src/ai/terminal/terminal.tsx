import AnsiModule from 'ansi-to-react'
import { resolveInterop } from '../interop.ts'

const Ansi = resolveInterop<React.ComponentType<{ children: string }>>(AnsiModule)
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useCopyToClipboard } from '../use-copy.ts'

interface TerminalContextType {
  output: string
  isStreaming: boolean
  autoScroll: boolean
  onClear?: () => void
}

const TerminalContext = createContext<TerminalContextType>({
  autoScroll: true,
  isStreaming: false,
  output: '',
})

export function useTerminal() {
  return useContext(TerminalContext)
}

export type TerminalProps = HTMLAttributes<HTMLDivElement> & {
  output: string
  isStreaming?: boolean
  autoScroll?: boolean
  onClear?: () => void
}

export function Terminal({
  output,
  isStreaming = false,
  autoScroll = true,
  onClear,
  children,
  ...props
}: TerminalProps) {
  const contextValue = useMemo(
    () => ({ autoScroll, isStreaming, onClear, output }),
    [autoScroll, isStreaming, onClear, output],
  )

  return (
    <TerminalContext.Provider value={contextValue}>
      <div data-scope="terminal" data-part="root" {...props}>
        {children ?? (
          <>
            <TerminalHeader>
              <TerminalTitle />
              <div data-scope="terminal" data-part="header-actions">
                <TerminalStatus />
                <TerminalActions>
                  <TerminalCopyButton />
                  {onClear && <TerminalClearButton />}
                </TerminalActions>
              </div>
            </TerminalHeader>
            <TerminalContent />
          </>
        )}
      </div>
    </TerminalContext.Provider>
  )
}

export type TerminalHeaderProps = HTMLAttributes<HTMLDivElement>

export function TerminalHeader(props: TerminalHeaderProps) {
  return <div data-scope="terminal" data-part="header" {...props} />
}

export type TerminalTitleProps = HTMLAttributes<HTMLDivElement>

export function TerminalTitle({ children, ...props }: TerminalTitleProps) {
  return (
    <div data-scope="terminal" data-part="title" {...props}>
      {children ?? 'Terminal'}
    </div>
  )
}

export type TerminalStatusProps = HTMLAttributes<HTMLDivElement>

export function TerminalStatus({ children, ...props }: TerminalStatusProps) {
  const { isStreaming } = useTerminal()

  if (!isStreaming) {
    return null
  }

  return (
    <div data-scope="terminal" data-part="status" {...props}>
      {children}
    </div>
  )
}

export type TerminalActionsProps = HTMLAttributes<HTMLDivElement>

export function TerminalActions(props: TerminalActionsProps) {
  return <div data-scope="terminal" data-part="actions" {...props} />
}

export type TerminalCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
}

export function TerminalCopyButton({ onCopy, onError, timeout, children, ...props }: TerminalCopyButtonProps) {
  const { output } = useTerminal()
  const { copy, isCopied } = useCopyToClipboard({ onCopy, onError, timeout })

  return (
    <button
      type="button"
      aria-label="Copy"
      data-scope="terminal"
      data-part="copy-button"
      data-copied={isCopied || undefined}
      onClick={() => copy(output)}
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}

export type TerminalClearButtonProps = ComponentProps<'button'>

export function TerminalClearButton({ onClick, ...props }: TerminalClearButtonProps) {
  const { onClear } = useTerminal()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClear?.()
      onClick?.(e)
    },
    [onClear, onClick],
  )

  if (!onClear) {
    return null
  }

  return (
    <button
      type="button"
      aria-label="Clear"
      data-scope="terminal"
      data-part="clear-button"
      onClick={handleClick}
      {...props}
    />
  )
}

export type TerminalContentProps = HTMLAttributes<HTMLDivElement>

export function TerminalContent({ children, ...props }: TerminalContentProps) {
  const { output, isStreaming, autoScroll } = useTerminal()
  const containerRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run when output changes so the view stays pinned to the bottom
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [output, autoScroll])

  return (
    <div data-scope="terminal" data-part="content" ref={containerRef} {...props}>
      {children ?? (
        <pre data-part="output">
          <Ansi>{output}</Ansi>
          {isStreaming && <span data-scope="terminal" data-part="cursor" />}
        </pre>
      )}
    </div>
  )
}
