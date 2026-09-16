'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps extends HTMLProps<'div'>, EditableAreaBaseProps {}

export const EditableArea = forwardRef<HTMLDivElement, EditableAreaProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getAreaProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

EditableArea.displayName = 'EditableArea'
