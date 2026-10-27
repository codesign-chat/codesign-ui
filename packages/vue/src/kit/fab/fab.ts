import { defineComponent, h } from 'vue'

export const FabRoot = defineComponent({
  name: 'FabRoot',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'fab', 'data-part': 'root' }, slots.default?.())
  },
})

export const FabIcon = defineComponent({
  name: 'FabIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'fab', 'data-part': 'icon' }, slots.default?.())
  },
})

export const FabLabel = defineComponent({
  name: 'FabLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'fab', 'data-part': 'label' }, slots.default?.())
  },
})
