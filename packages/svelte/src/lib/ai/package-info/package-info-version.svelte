<script lang="ts">
  import { usePackageInfo } from './package-info-context.svelte.ts'

  interface PackageInfoVersionProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoVersionProps = $props()
  const { currentVersion, newVersion } = usePackageInfo()
</script>

{#if currentVersion || newVersion}
  <div {...rest} data-scope="package-info" data-part="version">
    {#if children}
      {@render children()}
    {:else}
      {#if currentVersion}<span>{currentVersion}</span>{/if}
      {#if currentVersion && newVersion}
        <span data-scope="package-info" data-part="version-arrow">→</span>
      {/if}
      {#if newVersion}<span data-scope="package-info" data-part="version-new">{newVersion}</span>{/if}
    {/if}
  </div>
{/if}
