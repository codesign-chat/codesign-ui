import type { ComponentProps, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TProps as JsxParserProps } from 'react-jsx-parser'
import JsxParser from 'react-jsx-parser'

const SCOPE = 'jsx-preview'

const TAG_REGEX = /<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*?)(\/)?>/

const matchJsxTag = (code: string) => {
  if (code.trim() === '') {
    return null
  }

  const match = code.match(TAG_REGEX)
  if (!match || match.index === undefined) {
    return null
  }

  const [fullMatch, tagName, attributes, selfClosing] = match
  return {
    attributes: attributes.trim(),
    endIndex: match.index + fullMatch.length,
    tagName,
    type: (selfClosing ? 'self-closing' : fullMatch.startsWith('</') ? 'closing' : 'opening') as
      'closing' | 'opening' | 'self-closing',
  }
}

const stripIncompleteTag = (text: string) => {
  const lastOpen = text.lastIndexOf('<')
  if (lastOpen === -1) {
    return text
  }

  const afterOpen = text.slice(lastOpen)
  if (!afterOpen.includes('>')) {
    return text.slice(0, lastOpen)
  }

  return text
}

/** Close any JSX tags still open so a streaming snippet can render safely. */
const completeJsxTag = (code: string) => {
  const stack: string[] = []
  let result = ''
  let currentPosition = 0

  while (currentPosition < code.length) {
    const match = matchJsxTag(code.slice(currentPosition))
    if (!match) {
      result += stripIncompleteTag(code.slice(currentPosition))
      break
    }
    const { endIndex, tagName, type } = match

    result += code.slice(currentPosition, currentPosition + endIndex)

    if (type === 'opening') {
      stack.push(tagName)
    } else if (type === 'closing') {
      stack.pop()
    }

    currentPosition += endIndex
  }

  return (
    result +
    stack
      .toReversed()
      .map((tag) => `</${tag}>`)
      .join('')
  )
}

export type JSXPreviewProps = ComponentProps<'div'> & {
  bindings?: JsxParserProps['bindings']
  components?: JsxParserProps['components']
  isStreaming?: boolean
  jsx: string
  onError?: (error: Error) => void
}

export function JSXPreview({
  bindings,
  components,
  isStreaming = false,
  jsx,
  onError,
  children,
  ...props
}: JSXPreviewProps) {
  const [error, setError] = useState<Error | null>(null)
  const [prevJsx, setPrevJsx] = useState(jsx)
  const lastGoodJsxRef = useRef('')

  // Derived state: clear the error whenever new jsx arrives
  if (jsx !== prevJsx) {
    setPrevJsx(jsx)
    setError(null)
  }

  const processedJsx = useMemo(() => (isStreaming ? completeJsxTag(jsx) : jsx), [isStreaming, jsx])

  const handleParserError = useCallback(
    (parserError: Error) => {
      // While streaming, partial snippets are expected: keep the last good render
      if (isStreaming) {
        return
      }
      setError(parserError)
      onError?.(parserError)
    },
    [isStreaming, onError],
  )

  const hadError = error !== null
  const displayJsx = isStreaming && hadError ? lastGoodJsxRef.current : processedJsx

  useEffect(() => {
    if (!hadError) {
      lastGoodJsxRef.current = processedJsx
    }
  }, [hadError, processedJsx])

  return (
    <div data-scope={SCOPE} data-part="root" {...props}>
      {children ?? (
        <>
          <JSXPreviewContent bindings={bindings} components={components} jsx={displayJsx} onError={handleParserError} />
          {error && !isStreaming && <JSXPreviewError>{error.message}</JSXPreviewError>}
        </>
      )}
    </div>
  )
}

export type JSXPreviewContentProps = Omit<JsxParserProps, 'jsx'> & {
  jsx: string
}

export function JSXPreviewContent({ jsx, onError, ...props }: JSXPreviewContentProps) {
  return (
    <div data-scope={SCOPE} data-part="content" {...props}>
      <JsxParser
        {...props}
        jsx={jsx}
        onError={onError}
        renderError={({ error }) => (
          <span data-scope={SCOPE} data-part="render-error">
            {String(error)}
          </span>
        )}
      />
    </div>
  )
}

export type JSXPreviewErrorProps = ComponentProps<'div'> & {
  children?: ReactNode
}

export function JSXPreviewError({ children, ...props }: JSXPreviewErrorProps) {
  return (
    <div data-scope={SCOPE} data-part="error" role="alert" {...props}>
      {children}
    </div>
  )
}
