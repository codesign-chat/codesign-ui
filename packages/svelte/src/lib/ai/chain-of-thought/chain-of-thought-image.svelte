<script lang="ts">
  interface ChainOfThoughtImageProps {
    caption?: string
    children?: import('svelte').Snippet
  }

  let { caption, children, ...rest }: ChainOfThoughtImageProps = $props()
</script>

<div {...rest} data-scope="chain-of-thought" data-part="image">
  <div data-scope="chain-of-thought" data-part="image-frame">
    {@render children?.()}
  </div>
  {#if caption}
    <p data-scope="chain-of-thought" data-part="image-caption">{caption}</p>
  {/if}
</div>
