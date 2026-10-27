import { defineComponent, h } from 'vue'

export const Spin = defineComponent({
  name: 'Spin',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'spin', 'data-part': 'root' }, slots.default?.())
  },
})

export const SpinIndicator = defineComponent({
  name: 'SpinIndicator',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'spin', 'data-part': 'indicator' }, slots.default?.())
  },
})

export const SpinLabel = defineComponent({
  name: 'SpinLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'spin', 'data-part': 'label' }, slots.default?.())
  },
})
