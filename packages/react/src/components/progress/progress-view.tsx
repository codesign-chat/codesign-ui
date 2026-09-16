'use client'

import type { ViewProps } from '@zag-js/progress'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressViewBaseProps extends ViewProps, PolymorphicProps {}
export interface ProgressViewProps extends HTMLProps<'span'>, ProgressViewBaseProps {}

const splitViewProps = createSplitProps<ViewProps>()

export const ProgressView = forwardRef<HTMLSpanElement, ProgressViewProps>((props, ref) => {
  const [viewProps, localProps] = splitViewProps(props, ['state'])
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getViewProps(viewProps), localProps)

  return <codesign.span {...mergedProps} ref={ref} />
})

ProgressView.displayName = 'ProgressView'
