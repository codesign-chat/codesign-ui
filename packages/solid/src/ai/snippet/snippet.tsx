import { Show, createContext, createSignal, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'

const SCOPE = 'snippet'

interface SnippetContextValue {
  code: string
}

const SnippetContext = createContext<SnippetContextValue>()

export function useSnippet(): SnippetContextValue {
  const context = useContext(SnippetContext)
  if (!context) {
    throw new Error('Snippet parts must be used within Snippet')
  }
  return context
}

export type SnippetProps = JSX.HTMLAttributes<HTMLDivElement> & {
  code: string
}

export function Snippet(props: SnippetProps) {
  const [local, rest] = splitProps(props, ['code', 'children'])

  return (
    <SnippetContext.Provider value={{ code: local.code }}>
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </SnippetContext.Provider>
  )
}

export type SnippetAddonProps = JSX.HTMLAttributes<HTMLDivElement>

export function SnippetAddon(props: SnippetAddonProps) {
  return <div data-scope={SCOPE} data-part="addon" {...props} />
}

export type SnippetTextProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SnippetText(props: SnippetTextProps) {
  return <span data-scope={SCOPE} data-part="text" {...props} />
}

export type SnippetInputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'readOnly' | 'value'>

export function SnippetInput(props: SnippetInputProps) {
  const { code } = useSnippet()
  return <input data-scope={SCOPE} data-part="input" readOnly value={code} {...props} />
}

export type SnippetCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  timeout?: number
}

export function SnippetCopyButton(props: SnippetCopyButtonProps) {
  const [local, rest] = splitProps(props, ['timeout', 'children', 'onClick'])
  const { code } = useSnippet()
  const [isCopied, setIsCopied] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  return (
    <button
      aria-label="Copy"
      data-copied={isCopied() || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={(event) => {
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
        navigator.clipboard
          .writeText(code)
          .then(() => {
            setIsCopied(true)
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => setIsCopied(false), local.timeout ?? 2000)
          })
          .catch(() => {
            // clipboard unavailable
          })
      }}
      title="Copy"
      type="button"
      {...rest}
    >
      <Show when={typeof local.children === 'function'} fallback={local.children}>
        {(local.children as unknown as (isCopied: boolean) => JSX.Element)(isCopied())}
      </Show>
    </button>
  )
}
