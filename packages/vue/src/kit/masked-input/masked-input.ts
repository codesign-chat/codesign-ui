import { defineComponent, h } from 'vue'

export const MaskedInput = defineComponent({
  name: 'MaskedInput',
  setup(_, { attrs }) {
    return () => h('input', { ...attrs, 'data-scope': 'masked-input', 'data-part': 'root' })
  },
})
