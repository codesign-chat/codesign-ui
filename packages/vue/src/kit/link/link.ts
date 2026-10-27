import { defineComponent, h } from 'vue'

export const Link = defineComponent({
  name: 'Link',
  setup(_, { attrs, slots }) {
    return () => h('a', { ...attrs, 'data-scope': 'link', 'data-part': 'root' }, slots.default?.())
  },
})
