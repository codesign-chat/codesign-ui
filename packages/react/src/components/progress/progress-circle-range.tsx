'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressCircleRangeBaseProps extends PolymorphicProps {}
export interface ProgressCircleRangeProps extends HTMLProps<'circle'>, ProgressCircleRangeBaseProps {}

export const ProgressCircleRange = forwardRef<SVGCircleElement, ProgressCircleRangeProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleRangeProps(), props)

  return <codesign.circle ref={ref} {...mergedProps} />
})

ProgressCircleRange.displayName = 'ProgressCircleRange'
