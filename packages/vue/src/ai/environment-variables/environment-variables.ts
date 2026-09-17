import { computed, defineComponent, h, inject, provide, ref, type InjectionKey, type PropType } from 'vue'
import { SwitchRoot } from '../../components/switch/index.ts'

const SCOPE = 'env-vars'

interface EnvironmentVariablesContextValue {
  setShowValues: (show: boolean) => void
  showValues: boolean
}

const envVarsKey: InjectionKey<EnvironmentVariablesContextValue> = Symbol('env-vars')
const envVarKey: InjectionKey<{ name: string; value: string }> = Symbol('env-var')

export function useEnvironmentVariables(): EnvironmentVariablesContextValue {
  const context = inject(envVarsKey)
  if (!context) {
    throw new Error('EnvironmentVariables components must be used within EnvironmentVariables')
  }
  return context
}

export function useEnvironmentVariable(): { name: string; value: string } {
  const context = inject(envVarKey)
  if (!context) {
    throw new Error('EnvironmentVariable parts must be used within EnvironmentVariable')
  }
  return context
}

export const EnvironmentVariables = defineComponent({
  name: 'EnvironmentVariables',
  props: {
    defaultShowValues: { type: Boolean, default: false },
    onShowValuesChange: { type: Function as PropType<(show: boolean) => void>, default: undefined },
    showValues: { type: Boolean, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const internal = ref(props.defaultShowValues)
    provide(envVarsKey, {
      setShowValues(show: boolean) {
        internal.value = show
        props.onShowValuesChange?.(show)
      },
      get showValues() {
        return props.showValues ?? internal.value
      },
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const EnvironmentVariablesHeader = defineComponent({
  name: 'EnvironmentVariablesHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const EnvironmentVariablesTitle = defineComponent({
  name: 'EnvironmentVariablesTitle',
  setup(_, { attrs, slots }) {
    return () =>
      h('h3', { ...attrs, 'data-scope': SCOPE, 'data-part': 'title' }, slots.default?.() ?? 'Environment Variables')
  },
})

export const EnvironmentVariablesToggle = defineComponent({
  name: 'EnvironmentVariablesToggle',
  setup(_, { attrs, slots }) {
    const context = useEnvironmentVariables()
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'toggle' }, () =>
        [
          context.showValues && slots.toggleIcon
            ? h('span', { 'data-scope': SCOPE, 'data-part': 'toggle-icon' }, slots.toggleIcon())
            : undefined,
          h(SwitchRoot as any, {
            'aria-label': 'Toggle value visibility',
            checked: context.showValues,
            onCheckedChange: (details: { checked: boolean }) => context.setShowValues(details.checked),
          }),
        ].filter(Boolean),
      )
  },
})

export const EnvironmentVariablesContent = defineComponent({
  name: 'EnvironmentVariablesContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})

export const EnvironmentVariableGroup = defineComponent({
  name: 'EnvironmentVariableGroup',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'group' }, slots.default?.())
  },
})

export const EnvironmentVariableName = defineComponent({
  name: 'EnvironmentVariableName',
  setup(_, { attrs, slots }) {
    const { name } = useEnvironmentVariable()
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'name' }, slots.default?.() ?? name)
  },
})

export const EnvironmentVariableValue = defineComponent({
  name: 'EnvironmentVariableValue',
  setup(_, { attrs, slots }) {
    const { value } = useEnvironmentVariable()
    const { showValues } = useEnvironmentVariables()
    const display = computed(() => (showValues ? value : '•'.repeat(Math.min(value.length, 20))))
    return () =>
      h(
        'span',
        { ...attrs, 'data-hidden': !showValues || undefined, 'data-scope': SCOPE, 'data-part': 'value' },
        slots.default?.() ?? display.value,
      )
  },
})

export const EnvironmentVariable = defineComponent({
  name: 'EnvironmentVariable',
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    provide(envVarKey, { name: props.name, value: props.value })
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'variable' }, [
        slots.default?.() ?? [
          h(EnvironmentVariableGroup, null, () => h(EnvironmentVariableName)),
          h(EnvironmentVariableValue),
        ],
      ])
  },
})

export const EnvironmentVariableCopyButton = defineComponent({
  name: 'EnvironmentVariableCopyButton',
  props: {
    copyFormat: { type: String as PropType<'export' | 'name' | 'value'>, default: 'value' },
    timeout: { type: Number, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const { name, value } = useEnvironmentVariable()
    const isCopied = ref(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    return () => {
      const text =
        props.copyFormat === 'export'
          ? 'export ' + name + '="' + value + '"'
          : props.copyFormat === 'name'
            ? name
            : value
      return h(
        'button',
        {
          ...attrs,
          'aria-label': 'Copy',
          'data-copied': isCopied.value || undefined,
          'data-scope': SCOPE,
          'data-part': 'copy-button',
          onClick: () => {
            navigator.clipboard
              .writeText(text)
              .then(() => {
                isCopied.value = true
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => (isCopied.value = false), props.timeout ?? 2000)
              })
              .catch(() => {
                // clipboard unavailable
              })
          },
          type: 'button',
        },
        slots.default?.({ isCopied: isCopied.value }),
      )
    }
  },
})

export const EnvironmentVariableRequired = defineComponent({
  name: 'EnvironmentVariableRequired',
  setup(_, { attrs, slots }) {
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'required' }, slots.default?.() ?? 'Required')
  },
})
