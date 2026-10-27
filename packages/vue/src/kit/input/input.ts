import { defineComponent, h } from 'vue'

export const Input = defineComponent({
  name: 'Input',
  setup(_, { attrs }) {
    return () => h('input', { ...attrs, 'data-scope': 'input', 'data-part': 'root' })
  },
})
