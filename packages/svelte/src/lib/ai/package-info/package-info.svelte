<script lang="ts">
  import { setContext } from 'svelte'
  import { packageInfoKey, type PackageChangeType } from './package-info-context.svelte.ts'

  interface PackageInfoProps {
    changeType?: PackageChangeType
    currentVersion?: string
    name: string
    newVersion?: string
    children?: import('svelte').Snippet
  }

  let { changeType, currentVersion, name, newVersion, children, ...rest }: PackageInfoProps = $props()

  setContext(packageInfoKey, { changeType, currentVersion, name, newVersion })
</script>

<div {...rest} data-scope="package-info" data-part="root">
  {@render children?.()}
</div>
