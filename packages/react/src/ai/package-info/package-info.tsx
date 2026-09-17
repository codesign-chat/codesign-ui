import type { ComponentProps } from 'react'
import { createContext, useContext, useMemo } from 'react'

const SCOPE = 'package-info'

export type PackageChangeType = 'added' | 'major' | 'minor' | 'patch' | 'removed'

interface PackageInfoContextValue {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

const PackageInfoContext = createContext<PackageInfoContextValue>({ name: '' })

function usePackageInfo() {
  return useContext(PackageInfoContext)
}

export type PackageInfoProps = ComponentProps<'div'> & {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

export function PackageInfo({ changeType, currentVersion, name, newVersion, children, ...props }: PackageInfoProps) {
  const contextValue = useMemo<PackageInfoContextValue>(
    () => ({ changeType, currentVersion, name, newVersion }),
    [changeType, currentVersion, name, newVersion],
  )

  return (
    <PackageInfoContext.Provider value={contextValue}>
      <div data-scope={SCOPE} data-part="root" {...props}>
        {children}
      </div>
    </PackageInfoContext.Provider>
  )
}

export type PackageInfoHeaderProps = ComponentProps<'div'>

export function PackageInfoHeader(props: PackageInfoHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type PackageInfoNameProps = ComponentProps<'div'>

export function PackageInfoName({ children, ...props }: PackageInfoNameProps) {
  const { name } = usePackageInfo()

  return (
    <div data-scope={SCOPE} data-part="name" {...props}>
      {children ?? name}
    </div>
  )
}

export type PackageInfoChangeTypeProps = ComponentProps<'span'>

export function PackageInfoChangeType({ children, ...props }: PackageInfoChangeTypeProps) {
  const { changeType } = usePackageInfo()

  if (!changeType) {
    return null
  }

  return (
    <span data-change-type={changeType} data-scope={SCOPE} data-part="change-type" {...props}>
      {children ?? changeType}
    </span>
  )
}

export type PackageInfoVersionProps = ComponentProps<'div'>

export function PackageInfoVersion({ children, ...props }: PackageInfoVersionProps) {
  const { currentVersion, newVersion } = usePackageInfo()

  if (!(currentVersion || newVersion)) {
    return null
  }

  return (
    <div data-scope={SCOPE} data-part="version" {...props}>
      {children ?? (
        <>
          {currentVersion && <span>{currentVersion}</span>}
          {currentVersion && newVersion && (
            <span data-scope={SCOPE} data-part="version-arrow">
              →
            </span>
          )}
          {newVersion && (
            <span data-scope={SCOPE} data-part="version-new">
              {newVersion}
            </span>
          )}
        </>
      )}
    </div>
  )
}

export type PackageInfoDescriptionProps = ComponentProps<'p'>

export function PackageInfoDescription(props: PackageInfoDescriptionProps) {
  return <p data-scope={SCOPE} data-part="description" {...props} />
}

export type PackageInfoContentProps = ComponentProps<'div'>

export function PackageInfoContent(props: PackageInfoContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type PackageInfoDependenciesProps = ComponentProps<'div'>

export function PackageInfoDependencies({ children, ...props }: PackageInfoDependenciesProps) {
  return (
    <div data-scope={SCOPE} data-part="dependencies" {...props}>
      <span data-scope={SCOPE} data-part="dependencies-label">
        Dependencies
      </span>
      <div data-scope={SCOPE} data-part="dependencies-list">
        {children}
      </div>
    </div>
  )
}

export type PackageInfoDependencyProps = ComponentProps<'div'> & {
  name: string
  version?: string
}

export function PackageInfoDependency({ name, version, children, ...props }: PackageInfoDependencyProps) {
  return (
    <div data-scope={SCOPE} data-part="dependency" {...props}>
      {children ?? (
        <>
          <span data-part="dependency-name">{name}</span>
          {version && <span data-part="dependency-version">{version}</span>}
        </>
      )}
    </div>
  )
}
