import { Show, createContext, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'

const SCOPE = 'confirmation'

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

interface ConfirmationContextValue {
  approval?: ConfirmationApproval
  state: ConfirmationState
}

const ConfirmationContext = createContext<ConfirmationContextValue>()

export function useConfirmation(): ConfirmationContextValue {
  const context = useContext(ConfirmationContext)
  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation')
  }
  return context
}

export type ConfirmationProps = JSX.HTMLAttributes<HTMLDivElement> & {
  approval?: ConfirmationApproval
  state: ConfirmationState
}

export function Confirmation(props: ConfirmationProps) {
  const [local, rest] = splitProps(props, ['approval', 'state'])

  return (
    <Show when={Boolean(local.approval) && local.state !== 'input-streaming' && local.state !== 'input-available'}>
      <ConfirmationContext.Provider value={{ approval: local.approval, state: local.state }}>
        <div role="alert" data-scope={SCOPE} data-part="root" data-state={local.state} {...rest} />
      </ConfirmationContext.Provider>
    </Show>
  )
}

export type ConfirmationTitleProps = JSX.HTMLAttributes<HTMLDivElement>

export function ConfirmationTitle(props: ConfirmationTitleProps) {
  return <div data-scope={SCOPE} data-part="title" {...props} />
}

export type ConfirmationRequestProps = { children?: JSX.Element }

export function ConfirmationRequest(props: ConfirmationRequestProps) {
  const { state } = useConfirmation()
  return <Show when={state === 'approval-requested'}>{props.children}</Show>
}

export type ConfirmationAcceptedProps = { children?: JSX.Element }

export function ConfirmationAccepted(props: ConfirmationAcceptedProps) {
  const { approval, state } = useConfirmation()
  const visible =
    Boolean(approval?.approved) &&
    (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
  return <Show when={visible}>{props.children}</Show>
}

export type ConfirmationRejectedProps = { children?: JSX.Element }

export function ConfirmationRejected(props: ConfirmationRejectedProps) {
  const { approval, state } = useConfirmation()
  const visible =
    approval?.approved === false &&
    (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
  return <Show when={visible}>{props.children}</Show>
}

export type ConfirmationActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function ConfirmationActions(props: ConfirmationActionsProps) {
  const { state } = useConfirmation()
  return (
    <Show when={state === 'approval-requested'}>
      <div data-scope={SCOPE} data-part="actions" {...props} />
    </Show>
  )
}

export type ConfirmationActionProps = JSX.HTMLAttributes<HTMLButtonElement>

export function ConfirmationAction(props: ConfirmationActionProps) {
  return <button type="button" data-scope={SCOPE} data-part="action" {...props} />
}
