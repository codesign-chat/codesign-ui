'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableEditTriggerBaseProps extends PolymorphicProps {}
export interface EditableEditTriggerProps extends HTMLProps<'button'>, EditableEditTriggerBaseProps {}

export const EditableEditTrigger = forwardRef<HTMLButtonElement, EditableEditTriggerProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getEditTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

EditableEditTrigger.displayName = 'EditableEditTrigger'
