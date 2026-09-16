'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps extends HTMLProps<'div'>, NumberInputScrubberBaseProps {}

export const NumberInputScrubber = forwardRef<HTMLDivElement, NumberInputScrubberProps>((props, ref) => {
  const numberInput = useNumberInputContext()
  const mergedProps = mergeProps(numberInput.getScrubberProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

NumberInputScrubber.displayName = 'NumberInputScrubber'
