import type { ToolUIPart } from 'ai'
import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

type ToolUIPartApproval =
  { id: string; approved?: never; reason?: never } | { id: string; approved: boolean; reason?: string } | undefined

interface ConfirmationContextValue {
  approval: ToolUIPartApproval
  state: ToolUIPart['state']
}

const ConfirmationContext = createContext<ConfirmationContextValue | null>(null)

function useConfirmation() {
  const context = useContext(ConfirmationContext)

  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation')
  }

  return context
}

export type ConfirmationProps = ComponentProps<'div'> & {
  approval?: ToolUIPartApproval
  state: ToolUIPart['state']
}

export function Confirmation({ approval, state, ...props }: ConfirmationProps) {
  const contextValue = useMemo(() => ({ approval, state }), [approval, state])

  if (!approval || state === 'input-streaming' || state === 'input-available') {
    return null
  }

  return (
    <ConfirmationContext.Provider value={contextValue}>
      <div role="alert" data-scope="confirmation" data-part="root" data-state={state} {...props} />
    </ConfirmationContext.Provider>
  )
}

export type ConfirmationTitleProps = ComponentProps<'div'>

export function ConfirmationTitle(props: ConfirmationTitleProps) {
  return <div data-scope="confirmation" data-part="title" {...props} />
}

export interface ConfirmationRequestProps {
  children?: ReactNode
}

export function ConfirmationRequest({ children }: ConfirmationRequestProps) {
  const { state } = useConfirmation()

  // Only show when approval is requested
  if (state !== 'approval-requested') {
    return null
  }

  return children
}

export interface ConfirmationAcceptedProps {
  children?: ReactNode
}

export function ConfirmationAccepted({ children }: ConfirmationAcceptedProps) {
  const { approval, state } = useConfirmation()

  // Only show when approved and in response states
  if (
    !approval?.approved ||
    (state !== 'approval-responded' && state !== 'output-denied' && state !== 'output-available')
  ) {
    return null
  }

  return children
}

export interface ConfirmationRejectedProps {
  children?: ReactNode
}

export function ConfirmationRejected({ children }: ConfirmationRejectedProps) {
  const { approval, state } = useConfirmation()

  // Only show when rejected and in response states
  if (
    approval?.approved !== false ||
    (state !== 'approval-responded' && state !== 'output-denied' && state !== 'output-available')
  ) {
    return null
  }

  return children
}

export type ConfirmationActionsProps = ComponentProps<'div'>

export function ConfirmationActions(props: ConfirmationActionsProps) {
  const { state } = useConfirmation()

  // Only show when approval is requested
  if (state !== 'approval-requested') {
    return null
  }

  return <div data-scope="confirmation" data-part="actions" {...props} />
}

export type ConfirmationActionProps = ComponentProps<'button'>

export function ConfirmationAction(props: ConfirmationActionProps) {
  return <button type="button" data-scope="confirmation" data-part="action" {...props} />
}
