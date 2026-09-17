import 'styles/ai.module.css'
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from '../package-info.tsx'

export function Basic() {
  return (
    <PackageInfo
      changeType="minor"
      name="codesign-ui"
      currentVersion="1.4.2"
      newVersion="1.5.0"
      style={{ maxWidth: 440 }}
    >
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
      <PackageInfoDescription>Headless component library for React, Solid, Vue and Svelte.</PackageInfoDescription>
      <PackageInfoContent>
        <PackageInfoDependencies>
          <PackageInfoDependency name="@zag-js/react" version="1.4.2" />
          <PackageInfoDependency name="react" version="^19.0.0" />
        </PackageInfoDependencies>
      </PackageInfoContent>
    </PackageInfo>
  )
}

export function Added() {
  return (
    <PackageInfo changeType="added" name="@codesign-ui/ai" style={{ maxWidth: 440 }}>
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
      <PackageInfoDescription>Composite AI components built on the headless core.</PackageInfoDescription>
    </PackageInfo>
  )
}
