import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

const SCOPE = 'package-info'

export type PackageChangeType = 'added' | 'major' | 'minor' | 'patch' | 'removed'

interface PackageInfoContextValue {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

let currentContext: PackageInfoContextValue | undefined

export function usePackageInfo(): PackageInfoContextValue {
  if (!currentContext) {
    throw new Error('PackageInfo components must be used within PackageInfo')
  }
  return currentContext
}

export type PackageInfoProps = JSX.HTMLAttributes<HTMLDivElement> & {
  changeType?: PackageChangeType
  currentVersion?: string
  name: string
  newVersion?: string
}

export function PackageInfo(props: PackageInfoProps) {
  const [local, rest] = splitProps(props, ['changeType', 'currentVersion', 'name', 'newVersion', 'children'])
  currentContext = {
    changeType: local.changeType,
    currentVersion: local.currentVersion,
    name: local.name,
    newVersion: local.newVersion,
  }

  return (
    <div data-scope={SCOPE} data-part="root" {...rest}>
      {local.children}
    </div>
  )
}

export type PackageInfoHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function PackageInfoHeader(props: PackageInfoHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type PackageInfoNameProps = JSX.HTMLAttributes<HTMLDivElement>

export function PackageInfoName(props: PackageInfoNameProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { name } = usePackageInfo()
  return (
    <div data-scope={SCOPE} data-part="name" {...rest}>
      {local.children ?? name}
    </div>
  )
}

export type PackageInfoChangeTypeProps = JSX.HTMLAttributes<HTMLSpanElement>

export function PackageInfoChangeType(props: PackageInfoChangeTypeProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { changeType } = usePackageInfo()
  return changeType ? (
    <span data-change-type={changeType} data-scope={SCOPE} data-part="change-type" {...rest}>
      {local.children ?? changeType}
    </span>
  ) : null
}

export type PackageInfoVersionProps = JSX.HTMLAttributes<HTMLDivElement>

export function PackageInfoVersion(props: PackageInfoVersionProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { currentVersion, newVersion } = usePackageInfo()

  return currentVersion || newVersion ? (
    <div data-scope={SCOPE} data-part="version" {...rest}>
      {local.children ?? (
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
  ) : null
}

export type PackageInfoDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function PackageInfoDescription(props: PackageInfoDescriptionProps) {
  return <p data-scope={SCOPE} data-part="description" {...props} />
}

export type PackageInfoContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function PackageInfoContent(props: PackageInfoContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

export type PackageInfoDependenciesProps = JSX.HTMLAttributes<HTMLDivElement>

export function PackageInfoDependencies(props: PackageInfoDependenciesProps) {
  return (
    <div data-scope={SCOPE} data-part="dependencies" {...props}>
      <span data-scope={SCOPE} data-part="dependencies-label">
        Dependencies
      </span>
      <div data-scope={SCOPE} data-part="dependencies-list">
        {props.children}
      </div>
    </div>
  )
}

export type PackageInfoDependencyProps = JSX.HTMLAttributes<HTMLDivElement> & {
  name: string
  version?: string
}

export function PackageInfoDependency(props: PackageInfoDependencyProps) {
  const [local, rest] = splitProps(props, ['name', 'version', 'children'])
  return (
    <div data-scope={SCOPE} data-part="dependency" {...rest}>
      {local.children ?? (
        <>
          <span data-scope={SCOPE} data-part="dependency-name">
            {local.name}
          </span>
          {local.version && (
            <span data-scope={SCOPE} data-part="dependency-version">
              {local.version}
            </span>
          )}
        </>
      )}
    </div>
  )
}
