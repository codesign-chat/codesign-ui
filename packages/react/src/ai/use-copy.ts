import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseCopyToClipboardOptions {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

/**
 * Shared clipboard hook for the copy buttons across composites. Returns the
 * copied flag (for icon swaps via render props) and a copy function.
 */
export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { onCopy, onError, timeout = 2000 } = options
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef(0)

  const copy = useCallback(
    async (text: string) => {
      if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
        onError?.(new Error('Clipboard API not available'))
        return
      }

      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        onCopy?.()
        timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout)
      } catch (error) {
        onError?.(error as Error)
      }
    },
    [onCopy, onError, timeout],
  )

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    [],
  )

  return { copy, isCopied }
}
