'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxLabelBaseProps extends PolymorphicProps {}
export interface ComboboxLabelProps extends HTMLProps<'label'>, ComboboxLabelBaseProps {}

export const ComboboxLabel = forwardRef<HTMLLabelElement, ComboboxLabelProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getLabelProps(), props)

  return <codesign.label {...mergedProps} ref={ref} />
})

ComboboxLabel.displayName = 'ComboboxLabel'
