import { defineComponent, h } from 'vue'

export const ButtonGroup = defineComponent({
  name: 'ButtonGroup',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'button-group', 'data-part': 'root' }, slots.default?.())
  },
})

export const ButtonGroupItem = defineComponent({
  name: 'ButtonGroupItem',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'button-group', 'data-part': 'item' }, slots.default?.())
  },
})
