<script lang="ts">
  interface PackageInfoDescriptionProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PackageInfoDescriptionProps = $props()
</script>

<p {...rest} data-scope="package-info" data-part="description">
  {@render children?.()}
</p>
