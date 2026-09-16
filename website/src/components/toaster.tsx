'use client'

import { Portal } from '@codesign-ui/react/portal'
import { Toaster as CodesignToaster, createToaster } from '@codesign-ui/react/toast'
import { Toast } from './ui/toast'

export const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
  max: 3,
})

export const Toaster = () => {
  return (
    <Portal>
      <CodesignToaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
          </Toast.Root>
        )}
      </CodesignToaster>
    </Portal>
  )
}
