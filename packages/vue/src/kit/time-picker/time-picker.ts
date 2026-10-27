import { defineComponent, h } from 'vue'

export const TimePicker = defineComponent({
  name: 'TimePicker',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'time-picker', 'data-part': 'root' }, slots.default?.())
  },
})

export const TimePickerInput = defineComponent({
  name: 'TimePickerInput',
  setup(_, { attrs }) {
    return () => h('input', { ...attrs, 'data-scope': 'time-picker', 'data-part': 'input' })
  },
})

export const TimePickerTrigger = defineComponent({
  name: 'TimePickerTrigger',
  setup(_, { attrs, slots }) {
    return () => h('button', { ...attrs, 'data-scope': 'time-picker', 'data-part': 'trigger' }, slots.default?.())
  },
})

export const TimePickerContent = defineComponent({
  name: 'TimePickerContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': 'time-picker', 'data-part': 'content' }, slots.default?.())
  },
})
