import { defineComponent, h } from 'vue'

export const Button = defineComponent({
  name: 'Button',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'button', 'data-part': 'root' }, slots.default?.())
  },
})

export const ButtonIcon = defineComponent({
  name: 'ButtonIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'button', 'data-part': 'icon' }, slots.default?.())
  },
})

export const ButtonLabel = defineComponent({
  name: 'ButtonLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'button', 'data-part': 'label' }, slots.default?.())
  },
})
