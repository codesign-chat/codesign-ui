import type { ChangeEvent, ComponentProps, KeyboardEvent, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

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

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null)

function useWebPreview() {
  const context = useContext(WebPreviewContext)
  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }
  return context
}

export type WebPreviewProps = ComponentProps<'div'> & {
  defaultUrl?: string
  onUrlChange?: (url: string) => void
}

export function WebPreview({ defaultUrl = '', onUrlChange, children, ...props }: WebPreviewProps) {
  const [url, setUrlState] = useState(defaultUrl)
  const [consoleOpen, setConsoleOpen] = useState(false)

  const setUrl = useCallback(
    (nextUrl: string) => {
      setUrlState(nextUrl)
      onUrlChange?.(nextUrl)
    },
    [onUrlChange],
  )

  const contextValue = useMemo<WebPreviewContextValue>(
    () => ({ consoleOpen, setConsoleOpen, setUrl, url }),
    [consoleOpen, setUrl, url],
  )

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div data-scope={SCOPE} data-part="root" {...props}>
        {children}
      </div>
    </WebPreviewContext.Provider>
  )
}

export type WebPreviewNavigationProps = ComponentProps<'div'>

export function WebPreviewNavigation(props: WebPreviewNavigationProps) {
  return <div data-scope={SCOPE} data-part="navigation" {...props} />
}

export type WebPreviewNavigationButtonProps = ComponentProps<'button'> & {
  tooltip?: string
}

export function WebPreviewNavigationButton({ tooltip, children, ...props }: WebPreviewNavigationButtonProps) {
  return (
    <button data-scope={SCOPE} data-part="navigation-button" title={tooltip} type="button" {...props}>
      {children}
    </button>
  )
}

export type WebPreviewUrlProps = Omit<ComponentProps<'input'>, 'onChange' | 'value'> & {
  value?: string
}

export function WebPreviewUrl({ value, onKeyDown, placeholder = 'Enter URL…', ...props }: WebPreviewUrlProps) {
  const { setUrl, url } = useWebPreview()
  const [inputValue, setInputValue] = useState(url)
  const [prevUrl, setPrevUrl] = useState(url)

  // Derived-state pattern: sync the input when the context URL changes externally
  if (url !== prevUrl) {
    setPrevUrl(url)
    setInputValue(url)
  }

  return (
    <input
      data-scope={SCOPE}
      data-part="url"
      onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          setUrl((event.target as HTMLInputElement).value)
        }
        onKeyDown?.(event)
      }}
      placeholder={placeholder}
      value={value ?? inputValue}
      {...props}
    />
  )
}

export type WebPreviewBodyProps = Omit<ComponentProps<'iframe'>, 'src'> & {
  loading?: ReactNode
  src?: string
}

export function WebPreviewBody({ loading, src, title = 'Preview', ...props }: WebPreviewBodyProps) {
  const { url } = useWebPreview()

  return (
    <div data-scope={SCOPE} data-part="body">
      <iframe
        data-scope={SCOPE}
        data-part="iframe"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        src={(src ?? url) || undefined}
        title={title}
        {...props}
      />
      {loading}
    </div>
  )
}

export type WebPreviewConsoleProps = ComponentProps<typeof Collapsible.Root> & {
  indicator?: ReactNode
  logs?: WebPreviewLog[]
}

export function WebPreviewConsole({ indicator, logs = [], children, ...props }: WebPreviewConsoleProps) {
  const { consoleOpen, setConsoleOpen } = useWebPreview()

  return (
    <Collapsible.Root
      data-scope={SCOPE}
      data-part="console"
      onOpenChange={(details) => setConsoleOpen(details.open)}
      open={consoleOpen}
      {...props}
    >
      <Collapsible.Trigger data-scope={SCOPE} data-part="console-trigger">
        Console
        {indicator}
      </Collapsible.Trigger>
      <Collapsible.Content data-scope={SCOPE} data-part="console-content">
        <div data-scope={SCOPE} data-part="console-logs">
          {logs.length === 0 && (
            <p data-scope={SCOPE} data-part="console-empty">
              No console output
            </p>
          )}
          {logs.map((log) => (
            <div
              data-level={log.level}
              data-scope={SCOPE}
              data-part="console-log"
              key={`${log.timestamp.getTime()}-${log.message}`}
            >
              <span data-scope={SCOPE} data-part="log-time">
                {log.timestamp.toLocaleTimeString()}
              </span>
              <span data-scope={SCOPE} data-part="log-message">
                {log.message}
              </span>
            </div>
          ))}
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
