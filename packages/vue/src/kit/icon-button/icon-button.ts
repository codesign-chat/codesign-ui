import { defineComponent, h } from 'vue'

export const IconButton = defineComponent({
  name: 'IconButton',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'icon-button', 'data-part': 'root' }, slots.default?.())
  },
})

export const IconButtonIcon = defineComponent({
  name: 'IconButtonIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'icon-button', 'data-part': 'icon' }, slots.default?.())
  },
})
