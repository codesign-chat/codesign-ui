'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'

export interface RadioGroupItemControlBaseProps extends PolymorphicProps {}
export interface RadioGroupItemControlProps extends HTMLProps<'div'>, RadioGroupItemControlBaseProps {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemControlProps(itemProps), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
