import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useCopyToClipboard } from '../use-copy.ts'

interface SnippetContextType {
  code: string
}

const SnippetContext = createContext<SnippetContextType>({ code: '' })

export type SnippetProps = HTMLAttributes<HTMLDivElement> & {
  code: string
}

export function Snippet({ code, children, ...props }: SnippetProps) {
  const contextValue = useMemo(() => ({ code }), [code])

  return (
    <SnippetContext.Provider value={contextValue}>
      <div data-scope="snippet" data-part="root" {...props}>
        {children}
      </div>
    </SnippetContext.Provider>
  )
}

export type SnippetAddonProps = HTMLAttributes<HTMLDivElement>

export function SnippetAddon(props: SnippetAddonProps) {
  return <div data-scope="snippet" data-part="addon" {...props} />
}

export type SnippetTextProps = HTMLAttributes<HTMLSpanElement>

export function SnippetText(props: SnippetTextProps) {
  return <span data-scope="snippet" data-part="text" {...props} />
}

export type SnippetInputProps = Omit<ComponentProps<'input'>, 'readOnly' | 'value'>

export function SnippetInput(props: SnippetInputProps) {
  const { code } = useContext(SnippetContext)

  return <input data-scope="snippet" data-part="input" readOnly value={code} {...props} />
}

export type SnippetCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
}

export function SnippetCopyButton({ onCopy, onError, timeout, children, ...props }: SnippetCopyButtonProps) {
  const { code } = useContext(SnippetContext)
  const { copy, isCopied } = useCopyToClipboard({ onCopy, onError, timeout })

  return (
    <button
      type="button"
      aria-label="Copy"
      title="Copy"
      data-scope="snippet"
      data-part="copy-button"
      data-copied={isCopied || undefined}
      onClick={() => copy(code)}
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}
