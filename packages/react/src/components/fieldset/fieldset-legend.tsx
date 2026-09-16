'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useFieldsetContext } from './use-fieldset-context.ts'

export interface FieldsetLegendBaseProps extends PolymorphicProps {}
export interface FieldsetLegendProps extends HTMLProps<'legend'>, FieldsetLegendBaseProps {}

export const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>((props, ref) => {
  const fieldset = useFieldsetContext()
  const mergedProps = mergeProps(fieldset.getLegendProps(), props)

  return <codesign.legend {...mergedProps} ref={ref} />
})

FieldsetLegend.displayName = 'FieldsetLegend'
