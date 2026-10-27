import { defineComponent, h } from 'vue'

export const StatusText = defineComponent({
  name: 'StatusText',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'status-text', 'data-part': 'root' }, slots.default?.())
  },
})

export const StatusTextIndicator = defineComponent({
  name: 'StatusTextIndicator',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'status-text', 'data-part': 'indicator' }, slots.default?.())
  },
})
