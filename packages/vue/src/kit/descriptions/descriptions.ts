import { defineComponent, h } from 'vue'

export const Descriptions = defineComponent({
  name: 'Descriptions',
  setup(_, { attrs, slots }) {
    return () => h('dl', { ...attrs, 'data-scope': 'descriptions', 'data-part': 'root' }, slots.default?.())
  },
})

export const DescriptionsItem = defineComponent({
  name: 'DescriptionsItem',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'descriptions', 'data-part': 'item' }, slots.default?.())
  },
})

export const DescriptionsLabel = defineComponent({
  name: 'DescriptionsLabel',
  setup(_, { attrs, slots }) {
    return () => h('dt', { ...attrs, 'data-scope': 'descriptions', 'data-part': 'label' }, slots.default?.())
  },
})

export const DescriptionsValue = defineComponent({
  name: 'DescriptionsValue',
  setup(_, { attrs, slots }) {
    return () => h('dd', { ...attrs, 'data-scope': 'descriptions', 'data-part': 'value' }, slots.default?.())
  },
})
