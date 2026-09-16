import type { BundledLanguage, BundledTheme, HighlighterGeneric, ThemedToken } from 'shiki'
import { createHighlighter } from 'shiki'
import type { ComponentProps, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { createContext, memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useCopyToClipboard } from '../use-copy.ts'

// Shiki uses bitflags for font styles: 1=italic, 2=bold, 4=underline
const isItalic = (fontStyle: number | undefined) => fontStyle && fontStyle & 1
const isBold = (fontStyle: number | undefined) => fontStyle && fontStyle & 2
const isUnderline = (fontStyle: number | undefined) => fontStyle && fontStyle & 4

interface KeyedToken {
  token: ThemedToken
  key: string
}

interface KeyedLine {
  tokens: KeyedToken[]
  key: string
}

const addKeysToTokens = (lines: ThemedToken[][]): KeyedLine[] =>
  lines.map((line, lineIndex) => ({
    key: `line-${lineIndex}`,
    tokens: line.map((token, tokenIndex) => ({
      key: `line-${lineIndex}-${tokenIndex}`,
      token,
    })),
  }))

const TokenSpan = ({ token }: { token: ThemedToken }) => (
  <span
    data-part="token"
    style={
      {
        backgroundColor: token.bgColor,
        color: token.color,
        fontStyle: isItalic(token.fontStyle) ? 'italic' : undefined,
        fontWeight: isBold(token.fontStyle) ? 'bold' : undefined,
        textDecoration: isUnderline(token.fontStyle) ? 'underline' : undefined,
        ...token.htmlStyle,
      } as CSSProperties
    }
  >
    {token.content}
  </span>
)

const LineSpan = ({ line, showLineNumbers }: { line: KeyedLine; showLineNumbers: boolean }) => (
  <span data-part="line" data-line-numbers={showLineNumbers || undefined}>
    {line.tokens.length === 0 ? '\n' : line.tokens.map(({ token, key }) => <TokenSpan key={key} token={token} />)}
  </span>
)

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string
  language: BundledLanguage
  showLineNumbers?: boolean
}

interface TokenizedCode {
  tokens: ThemedToken[][]
  fg: string
  bg: string
}

interface CodeBlockContextType {
  code: string
}

const CodeBlockContext = createContext<CodeBlockContextType>({ code: '' })

// Highlighter cache (singleton per language)
const highlighterCache = new Map<string, Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>>()

// Token cache
const tokensCache = new Map<string, TokenizedCode>()

// Subscribers for async token updates
const subscribers = new Map<string, Set<(result: TokenizedCode) => void>>()

const getTokensCacheKey = (code: string, language: BundledLanguage) => {
  const start = code.slice(0, 100)
  const end = code.length > 100 ? code.slice(-100) : ''
  return `${language}:${code.length}:${start}:${end}`
}

const getHighlighter = (language: BundledLanguage): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> => {
  const cached = highlighterCache.get(language)
  if (cached) {
    return cached
  }

  const highlighterPromise = createHighlighter({
    langs: [language],
    themes: ['github-light', 'github-dark'],
  })

  highlighterCache.set(language, highlighterPromise)
  return highlighterPromise
}

// Create raw tokens for immediate display while highlighting loads
const createRawTokens = (code: string): TokenizedCode => ({
  bg: 'transparent',
  fg: 'inherit',
  tokens: code.split('\n').map((line) =>
    line === ''
      ? []
      : [
          {
            color: 'inherit',
            content: line,
          } as ThemedToken,
        ],
  ),
})

// Synchronous highlight with callback for async results
export const highlightCode = (
  code: string,
  language: BundledLanguage,
  callback?: (result: TokenizedCode) => void,
): TokenizedCode | null => {
  const tokensCacheKey = getTokensCacheKey(code, language)

  const cached = tokensCache.get(tokensCacheKey)
  if (cached) {
    return cached
  }

  if (callback) {
    if (!subscribers.has(tokensCacheKey)) {
      subscribers.set(tokensCacheKey, new Set())
    }
    subscribers.get(tokensCacheKey)?.add(callback)
  }

  // Start highlighting in the background (fire-and-forget)
  getHighlighter(language)
    .then((highlighter) => {
      const availableLangs = highlighter.getLoadedLanguages()
      const langToUse = availableLangs.includes(language) ? language : 'text'

      const result = highlighter.codeToTokens(code, {
        lang: langToUse,
        themes: {
          dark: 'github-dark',
          light: 'github-light',
        },
      })

      const tokenized: TokenizedCode = {
        bg: result.bg ?? 'transparent',
        fg: result.fg ?? 'inherit',
        tokens: result.tokens,
      }

      tokensCache.set(tokensCacheKey, tokenized)

      const subs = subscribers.get(tokensCacheKey)
      if (subs) {
        for (const sub of subs) {
          sub(tokenized)
        }
        subscribers.delete(tokensCacheKey)
      }
    })
    .catch((error) => {
      console.error('Failed to highlight code:', error)
      subscribers.delete(tokensCacheKey)
    })

  return null
}

const CodeBlockBody = memo(
  ({ tokenized, showLineNumbers }: { tokenized: TokenizedCode; showLineNumbers: boolean }) => {
    const preStyle = useMemo(
      () => ({
        backgroundColor: tokenized.bg,
        color: tokenized.fg,
      }),
      [tokenized.bg, tokenized.fg],
    )

    const keyedLines = useMemo(() => addKeysToTokens(tokenized.tokens), [tokenized.tokens])

    return (
      <pre data-scope="code-block" data-part="pre" style={preStyle}>
        <code data-part="code-inner" data-line-numbers={showLineNumbers || undefined}>
          {keyedLines.map((line) => (
            <LineSpan key={line.key} line={line} showLineNumbers={showLineNumbers} />
          ))}
        </code>
      </pre>
    )
  },
  (prevProps, nextProps) =>
    prevProps.tokenized === nextProps.tokenized && prevProps.showLineNumbers === nextProps.showLineNumbers,
)

export type CodeBlockContainerProps = HTMLAttributes<HTMLDivElement> & {
  language: string
}

export function CodeBlockContainer({ language, style, ...props }: CodeBlockContainerProps) {
  return (
    <div
      data-scope="code-block"
      data-part="root"
      data-language={language}
      style={{
        containIntrinsicSize: 'auto 200px',
        contentVisibility: 'auto',
        ...style,
      }}
      {...props}
    />
  )
}

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>

export function CodeBlockHeader(props: CodeBlockHeaderProps) {
  return <div data-scope="code-block" data-part="header" {...props} />
}

export type CodeBlockTitleProps = HTMLAttributes<HTMLDivElement>

export function CodeBlockTitle(props: CodeBlockTitleProps) {
  return <div data-scope="code-block" data-part="title" {...props} />
}

export type CodeBlockFilenameProps = HTMLAttributes<HTMLSpanElement>

export function CodeBlockFilename(props: CodeBlockFilenameProps) {
  return <span data-scope="code-block" data-part="filename" {...props} />
}

export type CodeBlockActionsProps = HTMLAttributes<HTMLDivElement>

export function CodeBlockActions(props: CodeBlockActionsProps) {
  return <div data-scope="code-block" data-part="actions" {...props} />
}

export type CodeBlockContentProps = {
  code: string
  language: BundledLanguage
  showLineNumbers?: boolean
}

export function CodeBlockContent({ code, language, showLineNumbers = false }: CodeBlockContentProps) {
  const rawTokens = useMemo(() => createRawTokens(code), [code])

  // Synchronous cache lookup — avoids setState in effect for cached results
  const syncTokens = useMemo(() => highlightCode(code, language) ?? rawTokens, [code, language, rawTokens])

  const [asyncTokens, setAsyncTokens] = useState<TokenizedCode | null>(null)
  const asyncKeyRef = useRef({ code, language })

  // Invalidate stale async tokens synchronously during render
  if (asyncKeyRef.current.code !== code || asyncKeyRef.current.language !== language) {
    asyncKeyRef.current = { code, language }
    setAsyncTokens(null)
  }

  useEffect(() => {
    let cancelled = false

    highlightCode(code, language, (result) => {
      if (!cancelled) {
        setAsyncTokens(result)
      }
    })

    return () => {
      cancelled = true
    }
  }, [code, language])

  const tokenized = asyncTokens ?? syncTokens

  return (
    <div data-scope="code-block" data-part="content">
      <CodeBlockBody showLineNumbers={showLineNumbers} tokenized={tokenized} />
    </div>
  )
}

export function CodeBlock({ code, language, showLineNumbers = false, children, ...props }: CodeBlockProps) {
  const contextValue = useMemo(() => ({ code }), [code])

  return (
    <CodeBlockContext.Provider value={contextValue}>
      <CodeBlockContainer language={language} {...props}>
        {children}
        <CodeBlockContent code={code} language={language} showLineNumbers={showLineNumbers} />
      </CodeBlockContainer>
    </CodeBlockContext.Provider>
  )
}

export type CodeBlockCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
}

export function CodeBlockCopyButton({ onCopy, onError, timeout, children, ...props }: CodeBlockCopyButtonProps) {
  const { code } = useContext(CodeBlockContext)
  const { copy, isCopied } = useCopyToClipboard({ onCopy, onError, timeout })

  return (
    <button
      type="button"
      aria-label="Copy"
      data-scope="code-block"
      data-part="copy-button"
      data-copied={isCopied || undefined}
      onClick={() => copy(code)}
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}
