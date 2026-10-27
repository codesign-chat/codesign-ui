import { defineComponent, h } from 'vue'

export const AvatarGroup = defineComponent({
  name: 'AvatarGroup',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'avatar-group', 'data-part': 'root' }, slots.default?.())
  },
})

export const AvatarGroupItem = defineComponent({
  name: 'AvatarGroupItem',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'avatar-group', 'data-part': 'item' }, slots.default?.())
  },
})
