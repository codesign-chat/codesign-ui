import { defineComponent, h, type PropType } from 'vue'

const SCOPE = 'message'

export const Message = defineComponent({
  name: 'Message',
  props: {
    from: { type: String as PropType<'assistant' | 'system' | 'user'>, required: true },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root', 'data-role': props.from }, slots.default)
  },
})

export const MessageContent = defineComponent({
  name: 'MessageContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default)
  },
})

export const MessageActions = defineComponent({
  name: 'MessageActions',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'actions' }, slots.default)
  },
})

export const MessageAction = defineComponent({
  name: 'MessageAction',
  props: {
    label: { type: String, default: undefined },
    tooltip: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-scope': SCOPE,
          'data-part': 'action',
          'aria-label': props.label ?? props.tooltip,
        },
        slots.default?.(),
      )
  },
})

export const MessageToolbar = defineComponent({
  name: 'MessageToolbar',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'toolbar' }, slots.default)
  },
})
