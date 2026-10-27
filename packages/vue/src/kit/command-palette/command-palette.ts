import { defineComponent, h } from 'vue'

export const CommandPalette = defineComponent({
  name: 'CommandPalette',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'root' }, slots.default?.())
  },
})

export const CommandPaletteInput = defineComponent({
  name: 'CommandPaletteInput',
  setup(_, { attrs }) {
    return () => h('input', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'input' })
  },
})

export const CommandPaletteList = defineComponent({
  name: 'CommandPaletteList',
  setup(_, { attrs, slots }) {
    return () => h('ul', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'list' }, slots.default?.())
  },
})

export const CommandPaletteGroup = defineComponent({
  name: 'CommandPaletteGroup',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'group' }, slots.default?.())
  },
})

export const CommandPaletteItem = defineComponent({
  name: 'CommandPaletteItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'item' }, slots.default?.())
  },
})

export const CommandPaletteEmpty = defineComponent({
  name: 'CommandPaletteEmpty',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'command-palette', 'data-part': 'empty' }, slots.default?.())
  },
})
