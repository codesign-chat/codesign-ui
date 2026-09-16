'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemHiddenInputProps extends HTMLProps<'input'>, SegmentGroupItemHiddenInputBaseProps {}

export const SegmentGroupItemHiddenInput = forwardRef<HTMLInputElement, SegmentGroupItemHiddenInputProps>(
  (props, ref) => {
    const segmentGroup = useSegmentGroupContext()
    const itemProps = useSegmentGroupItemPropsContext()
    const mergedProps = mergeProps(segmentGroup.getItemHiddenInputProps(itemProps), props)

    return <codesign.input {...mergedProps} ref={ref} />
  },
)

SegmentGroupItemHiddenInput.displayName = 'SegmentGroupItemHiddenInput'
