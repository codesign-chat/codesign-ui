'use client'

import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.ts'

export interface DateInputSegmentBaseProps extends PolymorphicProps, Pick<SegmentProps, 'segment'> {}

export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

const splitSegmentProps = createSplitProps<Pick<SegmentProps, 'segment'>>()

export const DateInputSegment = forwardRef<HTMLSpanElement, DateInputSegmentProps>((props, ref) => {
  const [segmentProps, localProps] = splitSegmentProps(props, ['segment'])
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(
    dateInput.getSegmentProps({ ...segmentProps, index: segmentGroupProps.index }),
    localProps,
  )
  return (
    <codesign.span {...mergedProps} ref={ref}>
      {segmentProps.segment.text}
    </codesign.span>
  )
})

DateInputSegment.displayName = 'DateInputSegment'
