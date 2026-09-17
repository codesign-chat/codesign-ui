<script lang="ts">
  interface PackageInfoHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoHeaderProps = $props()
</script>

<div {...rest} data-scope="package-info" data-part="header">
  {@render children?.()}
</div>
