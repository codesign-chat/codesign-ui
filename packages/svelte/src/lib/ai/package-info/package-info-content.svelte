<script lang="ts">
  interface PackageInfoContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoContentProps = $props()
</script>

<div {...rest} data-scope="package-info" data-part="content">
  {@render children?.()}
</div>
