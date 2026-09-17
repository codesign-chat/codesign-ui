import { defineComponent, h, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'tool'

export type ToolState =
  | 'approval-requested'
  | 'approval-responded'
  | 'input-available'
  | 'input-streaming'
  | 'output-available'
  | 'output-denied'
  | 'output-error'

const statusLabels: Record<ToolState, string> = {
  'approval-requested': 'Awaiting Approval',
  'approval-responded': 'Responded',
  'input-available': 'Running',
  'input-streaming': 'Pending',
  'output-available': 'Completed',
  'output-denied': 'Denied',
  'output-error': 'Error',
}

export function getStatusLabel(status: ToolState) {
  return statusLabels[status]
}

export const Tool = defineComponent({
  name: 'Tool',
  setup(_, { attrs }) {
    return () => h(CollapsibleRoot, { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' })
  },
})

export const ToolHeader = defineComponent({
  name: 'ToolHeader',
  props: {
    state: { type: String as PropType<ToolState>, required: true },
    title: { type: String, default: undefined },
    toolName: { type: String, default: undefined },
    type: { type: String, required: true },
  },
  setup(props, { attrs }) {
    const derivedName =
      props.type === 'dynamic-tool' ? (props.toolName ?? '') : props.type.split('-').slice(1).join('-')
    return () =>
      h(CollapsibleTrigger, { ...attrs, 'data-scope': SCOPE, 'data-part': 'trigger' }, () => [
        h('span', { 'data-scope': SCOPE, 'data-part': 'title' }, props.title ?? derivedName),
        h(
          'span',
          { 'data-scope': SCOPE, 'data-part': 'status', 'data-status': props.state },
          statusLabels[props.state],
        ),
      ])
  },
})

export const ToolContent = defineComponent({
  name: 'ToolContent',
  setup(_, { attrs, slots }) {
    return () => h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const ToolInput = defineComponent({
  name: 'ToolInput',
  props: { input: { type: Object as PropType<unknown>, required: true } },
  setup(props, { attrs }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'input' }, [
        h('h4', { 'data-scope': SCOPE, 'data-part': 'label' }, 'Parameters'),
        h('pre', { 'data-scope': SCOPE, 'data-part': 'code' }, JSON.stringify(props.input, null, 2)),
      ])
  },
})

export const ToolOutput = defineComponent({
  name: 'ToolOutput',
  props: {
    output: { type: Object as PropType<unknown>, default: undefined },
    errorText: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      if (!(props.output || props.errorText)) return null
      const rendered =
        typeof props.output === 'string' || (typeof props.output === 'object' && props.output !== null)
          ? h(
              'pre',
              { 'data-scope': SCOPE, 'data-part': 'code' },
              typeof props.output === 'string' ? props.output : JSON.stringify(props.output, null, 2),
            )
          : props.output !== null && props.output !== undefined
            ? h('div', { 'data-scope': SCOPE, 'data-part': 'output-value' }, String(props.output))
            : null
      return h(
        'div',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'output', 'data-error': props.errorText ? '' : undefined },
        [
          h('h4', { 'data-scope': SCOPE, 'data-part': 'label' }, props.errorText ? 'Error' : 'Result'),
          props.errorText ? h('div', { 'data-scope': SCOPE, 'data-part': 'error-text' }, props.errorText) : null,
          rendered,
        ],
      )
    }
  },
})
