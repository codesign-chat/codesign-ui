<script lang="ts">
  interface PackageInfoDependenciesProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoDependenciesProps = $props()
</script>

<div {...rest} data-scope="package-info" data-part="dependencies">
  <span data-scope="package-info" data-part="dependencies-label">Dependencies</span>
  <div data-scope="package-info" data-part="dependencies-list">
    {@render children?.()}
  </div>
</div>
