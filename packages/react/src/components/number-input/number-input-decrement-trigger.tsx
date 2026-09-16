'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputDecrementTriggerProps extends HTMLProps<'button'>, NumberInputDecrementTriggerBaseProps {}

export const NumberInputDecrementTrigger = forwardRef<HTMLButtonElement, NumberInputDecrementTriggerProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getDecrementTriggerProps(), props)

    return <codesign.button {...mergedProps} ref={ref} />
  },
)

NumberInputDecrementTrigger.displayName = 'NumberInputDecrementTrigger'
