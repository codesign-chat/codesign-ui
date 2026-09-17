<script lang="ts">
  import { usePackageInfo } from './package-info-context.svelte.ts'

  interface PackageInfoChangeTypeProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoChangeTypeProps = $props()
  const { changeType } = usePackageInfo()
</script>

{#if changeType}
  <span {...rest} data-change-type={changeType} data-scope="package-info" data-part="change-type">
    {#if children}
      {@render children()}
    {:else}
      {changeType}
    {/if}
  </span>
{/if}
