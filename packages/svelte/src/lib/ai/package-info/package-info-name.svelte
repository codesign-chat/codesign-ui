<script lang="ts">
  import { usePackageInfo } from './package-info-context.svelte.ts'

  interface PackageInfoNameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoNameProps = $props()
  const { name } = usePackageInfo()
</script>

<div {...rest} data-scope="package-info" data-part="name">
  {#if children}
    {@render children()}
  {:else}
    {name}
  {/if}
</div>
