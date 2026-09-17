import { For, Show, createContext, createSignal, onMount, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { parseAnsi } from './ansi.ts'

const SCOPE = 'terminal'

interface TerminalContextValue {
  autoScroll: boolean
  isStreaming: boolean
  onClear?: () => void
  output: string
}

const TerminalContext = createContext<TerminalContextValue>()

export function useTerminal(): TerminalContextValue {
  const context = useContext(TerminalContext)
  if (!context) {
    throw new Error('Terminal parts must be used within Terminal')
  }
  return context
}

export type TerminalProps = JSX.HTMLAttributes<HTMLDivElement> & {
  autoScroll?: boolean
  isStreaming?: boolean
  onClear?: () => void
  output: string
}

export function Terminal(props: TerminalProps) {
  const [local, rest] = splitProps(props, ['autoScroll', 'isStreaming', 'onClear', 'output', 'children'])

  return (
    <TerminalContext.Provider
      value={{
        autoScroll: local.autoScroll ?? true,
        isStreaming: local.isStreaming ?? false,
        onClear: local.onClear,
        output: local.output,
      }}
    >
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children ?? (
          <>
            <TerminalHeader>
              <TerminalTitle />
              <div data-scope={SCOPE} data-part="header-actions">
                <TerminalStatus />
                <TerminalActions>
                  <TerminalCopyButton />
                  <Show when={local.onClear}>
                    <TerminalClearButton />
                  </Show>
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

export type TerminalHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function TerminalHeader(props: TerminalHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type TerminalTitleProps = JSX.HTMLAttributes<HTMLDivElement>

export function TerminalTitle(props: TerminalTitleProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <div data-scope={SCOPE} data-part="title" {...rest}>
      {local.children ?? 'Terminal'}
    </div>
  )
}

export type TerminalStatusProps = JSX.HTMLAttributes<HTMLDivElement>

export function TerminalStatus(props: TerminalStatusProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { isStreaming } = useTerminal()
  return (
    <Show when={isStreaming}>
      <div data-scope={SCOPE} data-part="status" {...rest}>
        {local.children}
      </div>
    </Show>
  )
}

export type TerminalActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function TerminalActions(props: TerminalActionsProps) {
  return <div data-scope={SCOPE} data-part="actions" {...props} />
}

export type TerminalCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  timeout?: number
}

export function TerminalCopyButton(props: TerminalCopyButtonProps) {
  const [local, rest] = splitProps(props, ['timeout', 'children', 'onClick'])
  const { output } = useTerminal()
  const [isCopied, setIsCopied] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  return (
    <button
      aria-label="Copy"
      data-copied={isCopied() || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={(event) => {
        ;(local.onClick as any)?.(event)
        navigator.clipboard
          .writeText(output)
          .then(() => {
            setIsCopied(true)
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => setIsCopied(false), local.timeout ?? 2000)
          })
          .catch(() => {
            // clipboard unavailable
          })
      }}
      type="button"
      {...rest}
    >
      <Show when={typeof local.children === 'function'} fallback={local.children}>
        {(local.children as unknown as (isCopied: boolean) => JSX.Element)(isCopied())}
      </Show>
    </button>
  )
}

export type TerminalClearButtonProps = JSX.HTMLAttributes<HTMLButtonElement>

export function TerminalClearButton(props: TerminalClearButtonProps) {
  const [local, rest] = splitProps(props, ['onClick', 'children'])
  const { onClear } = useTerminal()

  if (!onClear) {
    return null
  }

  return (
    <button
      aria-label="Clear"
      data-scope={SCOPE}
      data-part="clear-button"
      onClick={(event) => {
        onClear?.()
        ;(local.onClick as any)?.(event)
      }}
      type="button"
      {...rest}
    />
  )
}

export type TerminalContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TerminalContent(props: TerminalContentProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { output, isStreaming, autoScroll } = useTerminal()
  let containerRef: HTMLDivElement | undefined

  onMount(() => {
    if (autoScroll && containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight
    }
  })

  return (
    <div data-scope={SCOPE} data-part="content" ref={containerRef} {...rest}>
      {local.children ?? (
        <pre data-scope={SCOPE} data-part="output">
          <For each={parseAnsi(output)}>
            {(segment) => (
              <span
                style={{
                  color: segment.color,
                  'font-weight': segment.bold ? 'bold' : undefined,
                  opacity: segment.faint ? 0.6 : undefined,
                }}
              >
                {segment.text}
              </span>
            )}
          </For>
          <Show when={isStreaming}>
            <span data-scope={SCOPE} data-part="cursor" />
          </Show>
        </pre>
      )}
    </div>
  )
}
