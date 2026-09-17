import { defineComponent, h, type PropType } from 'vue'

const SCOPE = 'suggestion'

export const Suggestions = defineComponent({
  name: 'Suggestions',
  setup(_, { attrs }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'list' })
  },
})

export const Suggestion = defineComponent({
  name: 'Suggestion',
  props: {
    suggestion: { type: String, required: true },
    onClick: { type: Function as PropType<(suggestion: string) => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-scope': SCOPE,
          'data-part': 'item',
          onClick: () => props.onClick?.(props.suggestion),
        },
        slots.default?.() ?? props.suggestion,
      )
  },
})
