import {
  Confirmation,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '../confirmation.tsx'

export function ApprovalRequested() {
  return (
    <Confirmation approval={{ id: 'approval-1' }} state="approval-requested">
      <ConfirmationTitle>
        Allow <strong>read_file</strong> to access project settings?
      </ConfirmationTitle>
      <ConfirmationActions>
        <ConfirmationAction>Reject</ConfirmationAction>
        <ConfirmationAction>Approve</ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  )
}

export function Responded() {
  return (
    <Confirmation approval={{ approved: false, id: 'approval-1' }} state="approval-responded">
      <ConfirmationTitle>read_file access</ConfirmationTitle>
      <ConfirmationRejected>Permission was rejected by the user.</ConfirmationRejected>
    </Confirmation>
  )
}

export function Hidden() {
  return (
    <Confirmation approval={{ id: 'approval-1' }} state="input-streaming">
      <ConfirmationTitle>This is hidden while the tool is streaming input.</ConfirmationTitle>
      <ConfirmationRequest>So is this.</ConfirmationRequest>
    </Confirmation>
  )
}
