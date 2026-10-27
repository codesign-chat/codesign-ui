import { defineComponent, h } from 'vue'

export const NavItem = defineComponent({
  name: 'NavItem',
  setup(_, { attrs, slots }) {
    return () => h('a', { ...attrs, 'data-scope': 'nav-item', 'data-part': 'root' }, slots.default?.())
  },
})

export const NavItemIcon = defineComponent({
  name: 'NavItemIcon',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'nav-item', 'data-part': 'icon' }, slots.default?.())
  },
})

export const NavItemLabel = defineComponent({
  name: 'NavItemLabel',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'nav-item', 'data-part': 'label' }, slots.default?.())
  },
})

export const NavItemTrailing = defineComponent({
  name: 'NavItemTrailing',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': 'nav-item', 'data-part': 'trailing' }, slots.default?.())
  },
})
