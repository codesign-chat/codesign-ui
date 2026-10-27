import { defineComponent, h } from 'vue'

export const Chip = defineComponent({
  name: 'Chip',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'chip', 'data-part': 'root' }, slots.default?.())
  },
})

export const ChipLabel = defineComponent({
  name: 'ChipLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'chip', 'data-part': 'label' }, slots.default?.())
  },
})

export const ChipRemoveTrigger = defineComponent({
  name: 'ChipRemoveTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'chip', 'data-part': 'remove' }, slots.default?.())
  },
})
