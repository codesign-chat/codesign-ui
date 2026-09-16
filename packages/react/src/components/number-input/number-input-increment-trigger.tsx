'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps extends HTMLProps<'button'>, NumberInputIncrementTriggerBaseProps {}

export const NumberInputIncrementTrigger = forwardRef<HTMLButtonElement, NumberInputIncrementTriggerProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getIncrementTriggerProps(), props)

    return <codesign.button {...mergedProps} ref={ref} />
  },
)

NumberInputIncrementTrigger.displayName = 'NumberInputIncrementTrigger'
