import { getContext } from 'svelte'

export type PackageChangeType = 'added' | 'major' | 'minor' | 'patch' | 'removed'

export interface PackageInfoContextValue {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

export const packageInfoKey: symbol = Symbol('package-info')

export function usePackageInfo(): PackageInfoContextValue {
  const context = getContext<PackageInfoContextValue>(packageInfoKey)
  if (!context) {
    throw new Error('PackageInfo components must be used within PackageInfo')
  }
  return context
}
