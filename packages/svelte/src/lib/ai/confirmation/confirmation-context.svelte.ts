import { getContext } from 'svelte'

export type ConfirmationState =
  | 'approval-responded'
  | 'approval-requested'
  | 'input-available'
  | 'input-streaming'
  | 'output-available'
  | 'output-denied'
  | 'output-error'

export interface ConfirmationApproval {
  approved?: boolean
  id: string
  reason?: string
}

export interface ConfirmationContextValue {
  approval?: ConfirmationApproval
  state: ConfirmationState
}

export const confirmationKey: symbol = Symbol('confirmation')

export function useConfirmation(): ConfirmationContextValue {
  const context = getContext<ConfirmationContextValue>(confirmationKey)
  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation')
  }
  return context
}
