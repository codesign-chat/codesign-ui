'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'

export interface RatingGroupLabelBaseProps extends PolymorphicProps {}
export interface RatingGroupLabelProps extends HTMLProps<'label'>, RatingGroupLabelBaseProps {}

export const RatingGroupLabel = forwardRef<HTMLLabelElement, RatingGroupLabelProps>((props, ref) => {
  const ratingGroup = useRatingGroupContext()
  const mergedProps = mergeProps(ratingGroup.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

RatingGroupLabel.displayName = 'RatingGroupLabel'
