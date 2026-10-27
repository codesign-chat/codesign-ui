import { defineComponent, h } from 'vue'

export const ListItem = defineComponent({
  name: 'ListItem',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'list-item', 'data-part': 'root' }, slots.default?.())
  },
})

export const ListItemContent = defineComponent({
  name: 'ListItemContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'list-item', 'data-part': 'content' }, slots.default?.())
  },
})

export const ListItemTitle = defineComponent({
  name: 'ListItemTitle',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'list-item', 'data-part': 'title' }, slots.default?.())
  },
})

export const ListItemDescription = defineComponent({
  name: 'ListItemDescription',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'list-item', 'data-part': 'description' }, slots.default?.())
  },
})

export const ListItemTrailing = defineComponent({
  name: 'ListItemTrailing',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'list-item', 'data-part': 'trailing' }, slots.default?.())
  },
})
