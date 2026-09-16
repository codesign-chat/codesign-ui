'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface RadioGroupItemHiddenInputProps extends HTMLProps<'input'>, RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = forwardRef<HTMLInputElement, RadioGroupItemHiddenInputProps>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemHiddenInputProps(itemProps), props)

  return <codesign.input {...mergedProps} ref={ref} />
})

RadioGroupItemHiddenInput.displayName = 'RadioGroupItemHiddenInput'
