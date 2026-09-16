'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps extends HTMLProps<'div'>, DialogDescriptionBaseProps {}

export const DialogDescription = forwardRef<HTMLDivElement, DialogDescriptionProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getDescriptionProps(), props)

  return <codesign.div {...mergedProps} ref={ref} />
})

DialogDescription.displayName = 'DialogDescription'
