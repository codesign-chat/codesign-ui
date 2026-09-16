'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'

export interface ProgressValueTextBaseProps extends PolymorphicProps {}
export interface ProgressValueTextProps extends HTMLProps<'span'>, ProgressValueTextBaseProps {}

export const ProgressValueText = forwardRef<HTMLSpanElement, ProgressValueTextProps>((props, ref) => {
  const { children, ...rest } = props
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getValueTextProps(), rest)

  return (
    <codesign.span {...mergedProps} ref={ref}>
      {children || progress.percentAsString}
    </codesign.span>
  )
})

ProgressValueText.displayName = 'ProgressValueText'
