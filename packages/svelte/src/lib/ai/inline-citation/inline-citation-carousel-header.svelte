<script lang="ts">
  interface InlineCitationCarouselHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCarouselHeaderProps = $props()
</script>

<div {...rest} data-scope="inline-citation" data-part="carousel-header">
  {@render children?.()}
</div>
