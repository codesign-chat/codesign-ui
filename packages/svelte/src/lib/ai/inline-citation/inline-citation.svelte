<script lang="ts">
  interface InlineCitationProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationProps = $props()
</script>

<span {...rest} data-scope="inline-citation" data-part="root">
  {@render children?.()}
</span>
