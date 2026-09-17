<script lang="ts">
  interface SourceProps {
    href?: string
    title?: string
    children?: import('svelte').Snippet
  }

  let { href, title, children, ...rest }: SourceProps = $props()
</script>

<a {...rest} data-scope="sources" data-part="source" href={href} rel="noreferrer" target="_blank">
  {#if children}
    {@render children()}
  {:else}
    <span>{title}</span>
  {/if}
</a>
