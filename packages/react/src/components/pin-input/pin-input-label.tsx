'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputLabelBaseProps extends PolymorphicProps {}
export interface PinInputLabelProps extends HTMLProps<'label'>, PinInputLabelBaseProps {}

export const PinInputLabel = forwardRef<HTMLLabelElement, PinInputLabelProps>((props, ref) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(pinInput.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

PinInputLabel.displayName = 'PinInputLabel'
