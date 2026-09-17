<script lang="ts">
  interface InlineCitationSourceProps {
    description?: string
    title?: string
    url?: string
    children?: import('svelte').Snippet
  }

  let { description, title, url, children, ...rest }: InlineCitationSourceProps = $props()
</script>

<div {...rest} data-scope="inline-citation" data-part="source">
  {#if title}
    <h4 data-scope="inline-citation" data-part="source-title">{title}</h4>
  {/if}
  {#if url}
    <p data-scope="inline-citation" data-part="source-url">{url}</p>
  {/if}
  {#if description}
    <p data-scope="inline-citation" data-part="source-description">{description}</p>
  {/if}
  {@render children?.()}
</div>
