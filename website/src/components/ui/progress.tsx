import { forwardRef } from 'react'
import * as CodesignProgress from './primitives/progress'

export interface ProgressProps extends CodesignProgress.RootProps {
  /**
   * The type of progress to render.
   * @default linear
   */
  type?: 'linear' | 'circular'
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { children, type = 'linear', ...rootProps } = props

  return (
    <CodesignProgress.Root ref={ref} {...rootProps}>
      {children && <CodesignProgress.Label>{children}</CodesignProgress.Label>}
      {type === 'linear' && (
        <CodesignProgress.Track>
          <CodesignProgress.Range />
        </CodesignProgress.Track>
      )}
      {type === 'circular' && (
        <CodesignProgress.Circle>
          <CodesignProgress.CircleTrack />
          <CodesignProgress.CircleRange />
          <CodesignProgress.ValueText />
        </CodesignProgress.Circle>
      )}
      <CodesignProgress.ValueText />
    </CodesignProgress.Root>
  )
})

Progress.displayName = 'Progress'
