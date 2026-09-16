import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { useMemo } from 'react'

export interface ShimmerProps extends HTMLAttributes<HTMLElement> {
  children: string
  as?: ElementType
  duration?: number
}

/**
 * Structure-only shimmer: splits the text into words and staggers each word
 * with an animation delay. The keyframes live in the consuming stylesheet
 * (see the reference styles) so the package itself stays CSS-free.
 */
export function Shimmer({ children, as: Component = 'p', duration = 2, ...props }: ShimmerProps) {
  const words = useMemo(() => children.split(' '), [children])

  return (
    <Component data-scope="shimmer" data-part="root" {...props}>
      {words.map((word, index) => (
        <span
          data-scope="shimmer"
          data-part="word"
          key={index}
          style={
            {
              animationDelay: `${index * 60}ms`,
              animationDuration: `${duration}s`,
            } as CSSProperties
          }
        >
          {word}{' '}
        </span>
      ))}
    </Component>
  )
}
