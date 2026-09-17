import { For, Show, createContext, createSignal, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
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

const WebPreviewContext = createContext<WebPreviewContextValue>()

export function useWebPreview(): WebPreviewContextValue {
  const context = useContext(WebPreviewContext)
  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }
  return context
}

export type WebPreviewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultUrl?: string
  onUrlChange?: (url: string) => void
}

export function WebPreview(props: WebPreviewProps) {
  const [local, rest] = splitProps(props, ['defaultUrl', 'onUrlChange', 'children'])
  const [url, setUrlState] = createSignal(local.defaultUrl ?? '')
  const [consoleOpen, setConsoleOpen] = createSignal(false)

  const setUrl = (next: string) => {
    setUrlState(next)
    local.onUrlChange?.(next)
  }

  const contextValue: WebPreviewContextValue = {
    get consoleOpen() {
      return consoleOpen()
    },
    setConsoleOpen,
    setUrl,
    get url() {
      return url()
    },
  }

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </WebPreviewContext.Provider>
  )
}

export type WebPreviewNavigationProps = JSX.HTMLAttributes<HTMLDivElement>

export function WebPreviewNavigation(props: WebPreviewNavigationProps) {
  return <div data-scope={SCOPE} data-part="navigation" {...props} />
}

export type WebPreviewNavigationButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  tooltip?: string
}

export function WebPreviewNavigationButton(props: WebPreviewNavigationButtonProps) {
  const [local, rest] = splitProps(props, ['tooltip'])
  return <button data-scope={SCOPE} data-part="navigation-button" title={local.tooltip} type="button" {...rest} />
}

export type WebPreviewUrlProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  value?: string
}

export function WebPreviewUrl(props: WebPreviewUrlProps) {
  const { setUrl, url } = useWebPreview()
  const [inputValue, setInputValue] = createSignal(url)

  return (
    <input
      {...props}
      data-scope={SCOPE}
      data-part="url"
      onChange={(event) => setInputValue(event.currentTarget.value)}
      onInput={(event) => setInputValue(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setUrl(event.currentTarget.value)
        }
      }}
      placeholder={props.placeholder ?? 'Enter URL…'}
      value={props.value ?? inputValue()}
    />
  )
}

export type WebPreviewBodyProps = Omit<JSX.HTMLAttributes<HTMLIFrameElement>, 'src'> & {
  loading?: JSX.Element
  src?: string
}

export function WebPreviewBody(props: WebPreviewBodyProps) {
  const [local, rest] = splitProps(props, ['loading', 'src', 'title'])
  const { url } = useWebPreview()

  return (
    <div data-scope={SCOPE} data-part="body">
      <iframe
        data-scope={SCOPE}
        data-part="iframe"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        src={(local.src ?? url) || undefined}
        title={local.title ?? 'Preview'}
        {...rest}
      />
      {local.loading}
    </div>
  )
}

export type WebPreviewConsoleProps = JSX.HTMLAttributes<HTMLDivElement> & {
  indicator?: JSX.Element
  logs?: WebPreviewLog[]
}

export function WebPreviewConsole(props: WebPreviewConsoleProps) {
  const [local, rest] = splitProps(props, ['indicator', 'logs', 'children'])
  const logs = () => local.logs ?? []
  const { consoleOpen, setConsoleOpen } = useWebPreview()

  return (
    <Collapsible.Root
      data-scope={SCOPE}
      data-part="console"
      onOpenChange={(details) => setConsoleOpen(details.open)}
      open={consoleOpen}
      {...rest}
    >
      <Collapsible.Trigger data-scope={SCOPE} data-part="console-trigger">
        Console
        {local.indicator}
      </Collapsible.Trigger>
      <Collapsible.Content data-scope={SCOPE} data-part="console-content">
        <div data-scope={SCOPE} data-part="console-logs">
          <Show
            when={logs().length > 0}
            fallback={
              <p data-scope={SCOPE} data-part="console-empty">
                No console output
              </p>
            }
          >
            <For each={logs()}>
              {(log) => (
                <div data-level={log.level} data-scope={SCOPE} data-part="console-log">
                  <span data-scope={SCOPE} data-part="log-time">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span data-scope={SCOPE} data-part="log-message">
                    {log.message}
                  </span>
                </div>
              )}
            </For>
          </Show>
          {local.children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
