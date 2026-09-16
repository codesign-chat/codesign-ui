import type { ComponentProps, HTMLAttributes } from 'react'
import { useCallback } from 'react'

export type SuggestionsProps = HTMLAttributes<HTMLDivElement>

export function Suggestions(props: SuggestionsProps) {
  return <div data-scope="suggestion" data-part="list" {...props} />
}

export type SuggestionProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  suggestion: string
  onClick?: (suggestion: string) => void
}

export function Suggestion({ suggestion, onClick, children, ...props }: SuggestionProps) {
  const handleClick = useCallback(() => {
    onClick?.(suggestion)
  }, [onClick, suggestion])

  return (
    <button type="button" data-scope="suggestion" data-part="item" onClick={handleClick} {...props}>
      {children ?? suggestion}
    </button>
  )
}
