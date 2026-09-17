<script lang="ts">
  interface PackageInfoDependencyProps {
    name: string
    version?: string
    children?: import('svelte').Snippet
  }

  let { name, version, children, ...rest }: PackageInfoDependencyProps = $props()
</script>

<div {...rest} data-scope="package-info" data-part="dependency">
  {#if children}
    {@render children()}
  {:else}
    <span data-scope="package-info" data-part="dependency-name">{name}</span>
    {#if version}<span data-scope="package-info" data-part="dependency-version">{version}</span>{/if}
  {/if}
</div>
