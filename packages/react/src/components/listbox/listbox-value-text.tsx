'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

export interface ListboxValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is listboxed.
   */
  placeholder?: string | undefined
}
export interface ListboxValueTextProps extends HTMLProps<'span'>, ListboxValueTextBaseProps {}

export const ListboxValueText = forwardRef<HTMLSpanElement, ListboxValueTextProps>((props, ref) => {
  const { children, placeholder, ...localprops } = props
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getValueTextProps(), localprops)

  return (
    <codesign.span {...mergedProps} ref={ref}>
      {children || listbox.valueAsString || placeholder}
    </codesign.span>
  )
})

ListboxValueText.displayName = 'ListboxValueText'
