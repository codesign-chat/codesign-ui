import { defineComponent, h } from 'vue'

export const SplitButton = defineComponent({
  name: 'SplitButton',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'split-button', 'data-part': 'root' }, slots.default?.())
  },
})

export const SplitButtonAction = defineComponent({
  name: 'SplitButtonAction',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'split-button', 'data-part': 'action' }, slots.default?.())
  },
})

export const SplitButtonTrigger = defineComponent({
  name: 'SplitButtonTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'split-button', 'data-part': 'trigger' }, slots.default?.())
  },
})
