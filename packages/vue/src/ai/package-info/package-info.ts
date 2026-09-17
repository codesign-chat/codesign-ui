import { defineComponent, h, inject, provide, type InjectionKey, type PropType } from 'vue'

const SCOPE = 'package-info'

export type PackageChangeType = 'added' | 'major' | 'minor' | 'patch' | 'removed'

interface PackageInfoContextValue {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

const packageInfoKey: InjectionKey<PackageInfoContextValue> = Symbol('package-info')

export function usePackageInfo(): PackageInfoContextValue {
  const context = inject(packageInfoKey)
  if (!context) {
    throw new Error('PackageInfo components must be used within PackageInfo')
  }
  return context
}

export const PackageInfo = defineComponent({
  name: 'PackageInfo',
  props: {
    changeType: { type: String as PropType<PackageChangeType>, default: undefined },
    currentVersion: { type: String, default: undefined },
    name: { type: String, required: true },
    newVersion: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    provide(packageInfoKey, {
      changeType: props.changeType,
      currentVersion: props.currentVersion,
      name: props.name,
      newVersion: props.newVersion,
    })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const PackageInfoHeader = defineComponent({
  name: 'PackageInfoHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const PackageInfoName = defineComponent({
  name: 'PackageInfoName',
  setup(_, { attrs, slots }) {
    const { name } = usePackageInfo()
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'name' }, slots.default?.() ?? name)
  },
})

export const PackageInfoChangeType = defineComponent({
  name: 'PackageInfoChangeType',
  setup(_, { attrs, slots }) {
    const { changeType } = usePackageInfo()
    if (!changeType) return () => null
    return () =>
      h(
        'span',
        { ...attrs, 'data-change-type': changeType, 'data-scope': SCOPE, 'data-part': 'change-type' },
        slots.default?.() ?? changeType,
      )
  },
})

export const PackageInfoVersion = defineComponent({
  name: 'PackageInfoVersion',
  setup(_, { attrs, slots }) {
    const { currentVersion, newVersion } = usePackageInfo()
    return () => {
      if (!(currentVersion || newVersion)) return null
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'version' }, [
        slots.default?.() ?? [
          currentVersion ? h('span', currentVersion) : null,
          currentVersion && newVersion ? h('span', { 'data-scope': SCOPE, 'data-part': 'version-arrow' }, '→') : null,
          newVersion ? h('span', { 'data-scope': SCOPE, 'data-part': 'version-new' }, newVersion) : null,
        ],
      ])
    }
  },
})

export const PackageInfoDescription = defineComponent({
  name: 'PackageInfoDescription',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': SCOPE, 'data-part': 'description' }, slots.default?.())
  },
})

export const PackageInfoContent = defineComponent({
  name: 'PackageInfoContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})

export const PackageInfoDependencies = defineComponent({
  name: 'PackageInfoDependencies',
  setup(_, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'dependencies' }, [
        h('span', { 'data-scope': SCOPE, 'data-part': 'dependencies-label' }, 'Dependencies'),
        h('div', { 'data-scope': SCOPE, 'data-part': 'dependencies-list' }, slots.default?.()),
      ])
  },
})

export const PackageInfoDependency = defineComponent({
  name: 'PackageInfoDependency',
  props: {
    name: { type: String, required: true },
    version: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'dependency' }, [
        slots.default?.() ?? [
          h('span', { 'data-scope': SCOPE, 'data-part': 'dependency-name' }, props.name),
          props.version ? h('span', { 'data-scope': SCOPE, 'data-part': 'dependency-version' }, props.version) : null,
        ],
      ])
  },
})
