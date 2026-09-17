import { For, createMemo, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { JSX, ValidComponent } from 'solid-js'

export interface ShimmerProps extends JSX.HTMLAttributes<HTMLElement> {
  children: string
  as?: ValidComponent
  duration?: number
}

/**
 * Structure-only shimmer: splits the text into words and staggers each word
 * with an animation delay. The keyframes live in the consuming stylesheet
 * (see the reference styles) so the package itself stays CSS-free.
 */
export function Shimmer(props: ShimmerProps) {
  const [local, rest] = splitProps(props, ['children', 'duration', 'as'])
  const words = createMemo(() => local.children.split(' '))

  return (
    <Dynamic component={(local.as ?? 'p') as ValidComponent} data-scope="shimmer" data-part="root" {...rest}>
      <For each={words()}>
        {(word, index) => (
          <span
            data-scope="shimmer"
            data-part="word"
            style={{ 'animation-delay': `${index() * 60}ms`, 'animation-duration': `${local.duration ?? 2}s` }}
          >
            {word}{' '}
          </span>
        )}
      </For>
    </Dynamic>
  )
}
