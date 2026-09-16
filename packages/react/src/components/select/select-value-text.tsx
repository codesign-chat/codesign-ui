'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'

export interface SelectValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string | undefined
}
export interface SelectValueTextProps extends HTMLProps<'span'>, SelectValueTextBaseProps {}

export const SelectValueText = forwardRef<HTMLSpanElement, SelectValueTextProps>((props, ref) => {
  const { children, placeholder, ...localprops } = props
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getValueTextProps(), localprops)

  return (
    <codesign.span {...mergedProps} ref={ref}>
      {children || select.valueAsString || placeholder}
    </codesign.span>
  )
})

SelectValueText.displayName = 'SelectValueText'
