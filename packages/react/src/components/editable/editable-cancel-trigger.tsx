'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps {}
export interface EditableCancelTriggerProps extends HTMLProps<'button'>, EditableCancelTriggerBaseProps {}

export const EditableCancelTrigger = forwardRef<HTMLButtonElement, EditableCancelTriggerProps>((props, ref) => {
  const editable = useEditableContext()
  const mergedProps = mergeProps(editable.getCancelTriggerProps(), props)

  return <codesign.button {...mergedProps} ref={ref} />
})

EditableCancelTrigger.displayName = 'EditableCancelTrigger'
