import { defineComponent, h } from 'vue'

export const Search = defineComponent({
  name: 'Search',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'search', 'data-part': 'root' }, slots.default?.())
  },
})

export const SearchInput = defineComponent({
  name: 'SearchInput',
  setup(_, { attrs }) {
    return () => h('input', { ...attrs, 'data-scope': 'search', 'data-part': 'input' })
  },
})

export const SearchIcon = defineComponent({
  name: 'SearchIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'search', 'data-part': 'icon' }, slots.default?.())
  },
})

export const SearchClearTrigger = defineComponent({
  name: 'SearchClearTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'search', 'data-part': 'clear' }, slots.default?.())
  },
})
