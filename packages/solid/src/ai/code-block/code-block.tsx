import { For, Show, createContext, createSignal, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import type { BundledLanguage, ThemedToken } from 'shiki'
import { createRawTokens, highlightCode, isBold, isItalic, isUnderline, type TokenizedCode } from './highlight.ts'

const SCOPE = 'code-block'

interface CodeBlockContextValue {
  code: string
}

const CodeBlockContext = createContext<CodeBlockContextValue>()

export function useCodeBlock(): CodeBlockContextValue {
  const context = useContext(CodeBlockContext)
  if (!context) {
    throw new Error('CodeBlock parts must be used within CodeBlock')
  }
  return context
}

export interface CodeBlockProps extends JSX.HTMLAttributes<HTMLDivElement> {
  code: string
  language: BundledLanguage
  showLineNumbers?: boolean
}

export function CodeBlock(props: CodeBlockProps) {
  const [local, rest] = splitProps(props, ['code', 'language', 'showLineNumbers', 'children'])

  return (
    <CodeBlockContext.Provider value={{ code: local.code }}>
      <CodeBlockContainer language={local.language} {...rest}>
        {local.children}
        <CodeBlockContent code={local.code} language={local.language} showLineNumbers={local.showLineNumbers} />
      </CodeBlockContainer>
    </CodeBlockContext.Provider>
  )
}

export type CodeBlockContainerProps = JSX.HTMLAttributes<HTMLDivElement> & {
  language: string
}

export function CodeBlockContainer(props: CodeBlockContainerProps) {
  const [local, rest] = splitProps(props, ['language', 'style'])
  return (
    <div
      data-language={local.language}
      data-scope={SCOPE}
      data-part="root"
      style={{
        'contain-intrinsic-size': 'auto 200px',
        'content-visibility': 'auto',
        ...(local.style as JSX.CSSProperties),
      }}
      {...rest}
    />
  )
}

export type CodeBlockHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function CodeBlockHeader(props: CodeBlockHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type CodeBlockTitleProps = JSX.HTMLAttributes<HTMLDivElement>

export function CodeBlockTitle(props: CodeBlockTitleProps) {
  return <div data-scope={SCOPE} data-part="title" {...props} />
}

export type CodeBlockFilenameProps = JSX.HTMLAttributes<HTMLSpanElement>

export function CodeBlockFilename(props: CodeBlockFilenameProps) {
  return <span data-scope={SCOPE} data-part="filename" {...props} />
}

export type CodeBlockActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function CodeBlockActions(props: CodeBlockActionsProps) {
  return <div data-scope={SCOPE} data-part="actions" {...props} />
}

const TokenSpan = (props: { token: ThemedToken }) => (
  <span
    data-part="token"
    style={{
      'background-color': props.token.bgColor,
      color: props.token.color,
      'font-style': isItalic(props.token.fontStyle) ? 'italic' : undefined,
      'font-weight': isBold(props.token.fontStyle) ? 'bold' : undefined,
      'text-decoration': isUnderline(props.token.fontStyle) ? 'underline' : undefined,
    }}
  >
    {props.token.content}
  </span>
)

const LineSpan = (props: { line: ThemedToken[]; showLineNumbers: boolean }) => (
  <span data-line-numbers={props.showLineNumbers || undefined} data-part="line">
    <Show when={props.line.length > 0} fallback={'\n'}>
      <For each={props.line}>{(token) => <TokenSpan token={token} />}</For>
    </Show>
  </span>
)

export type CodeBlockContentProps = {
  code: string
  language: BundledLanguage
  showLineNumbers?: boolean
}

export function CodeBlockContent(props: CodeBlockContentProps) {
  const syncTokens = () => highlightCode(props.code, props.language) ?? createRawTokens(props.code)
  const [asyncTokens, setAsyncTokens] = createSignal<TokenizedCode | null>(null)
  let asyncKey = { code: props.code, language: props.language }

  if (asyncKey.code !== props.code || asyncKey.language !== props.language) {
    asyncKey = { code: props.code, language: props.language }
    setAsyncTokens(null)
  }

  let cancelled = false
  highlightCode(props.code, props.language, (result) => {
    if (!cancelled) {
      setAsyncTokens(result)
    }
  })

  const tokenized = () => asyncTokens() ?? syncTokens()

  return (
    <div data-scope={SCOPE} data-part="content">
      <pre data-scope={SCOPE} data-part="pre" style={{ 'background-color': tokenized().bg, color: tokenized().fg }}>
        <code data-line-numbers={props.showLineNumbers || undefined} data-part="code-inner">
          <For each={tokenized().tokens}>
            {(line) => <LineSpan line={line} showLineNumbers={props.showLineNumbers ?? false} />}
          </For>
        </code>
      </pre>
    </div>
  )
}

export type CodeBlockCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  timeout?: number
}

export function CodeBlockCopyButton(props: CodeBlockCopyButtonProps) {
  const [local, rest] = splitProps(props, ['timeout', 'children', 'onClick'])
  const { code } = useCodeBlock()
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
      type="button"
      {...rest}
    >
      <Show when={typeof local.children === 'function'} fallback={local.children}>
        {(local.children as unknown as (isCopied: boolean) => JSX.Element)(isCopied())}
      </Show>
    </button>
  )
}
