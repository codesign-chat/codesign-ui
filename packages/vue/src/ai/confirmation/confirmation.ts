import { defineComponent, h, inject, provide, type InjectionKey, type PropType } from 'vue'

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

const confirmationKey: InjectionKey<ConfirmationContextValue> = Symbol('confirmation')

export function useConfirmation(): ConfirmationContextValue {
  const context = inject(confirmationKey)
  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation')
  }
  return context
}

export const Confirmation = defineComponent({
  name: 'Confirmation',
  props: {
    approval: { type: Object as PropType<ConfirmationApproval>, default: undefined },
    state: { type: String as PropType<ConfirmationState>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      if (!(props.approval && props.state !== 'input-streaming' && props.state !== 'input-available')) {
        return null
      }
      provide(confirmationKey, { approval: props.approval, state: props.state })
      return h('div', { ...attrs, role: 'alert', 'data-scope': SCOPE, 'data-part': 'root', 'data-state': props.state })
    }
  },
})

export const ConfirmationTitle = defineComponent({
  name: 'ConfirmationTitle',
  setup(_, { attrs }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'title' })
  },
})

export const ConfirmationRequest = defineComponent({
  name: 'ConfirmationRequest',
  setup(_, { slots }) {
    const { state } = useConfirmation()
    return () => (state === 'approval-requested' ? slots.default?.() : null)
  },
})

export const ConfirmationAccepted = defineComponent({
  name: 'ConfirmationAccepted',
  setup(_, { slots }) {
    const { approval, state } = useConfirmation()
    return () => {
      const visible =
        Boolean(approval?.approved) &&
        (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
      return visible ? slots.default?.() : null
    }
  },
})

export const ConfirmationRejected = defineComponent({
  name: 'ConfirmationRejected',
  setup(_, { slots }) {
    const { approval, state } = useConfirmation()
    return () => {
      const visible =
        approval?.approved === false &&
        (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
      return visible ? slots.default?.() : null
    }
  },
})

export const ConfirmationActions = defineComponent({
  name: 'ConfirmationActions',
  setup(_, { attrs, slots }) {
    const { state } = useConfirmation()
    return () =>
      state === 'approval-requested'
        ? h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'actions' }, slots.default?.())
        : null
  },
})

export const ConfirmationAction = defineComponent({
  name: 'ConfirmationAction',
  setup(_, { attrs, slots }) {
    return () =>
      h('button', { ...attrs, type: 'button', 'data-scope': SCOPE, 'data-part': 'action' }, slots.default?.())
  },
})
