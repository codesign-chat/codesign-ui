import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

export type SuggestionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function Suggestions(props: SuggestionsProps) {
  return <div data-scope="suggestion" data-part="list" {...props} />
}

export type SuggestionProps = Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  suggestion: string
  onClick?: (suggestion: string) => void
}

export function Suggestion(props: SuggestionProps) {
  const [local, rest] = splitProps(props, ['suggestion', 'onClick', 'children'])

  return (
    <button
      type="button"
      data-scope="suggestion"
      data-part="item"
      onClick={() => local.onClick?.(local.suggestion)}
      {...rest}
    >
      {local.children ?? local.suggestion}
    </button>
  )
}
