<script lang="ts">
  interface InlineCitationTextProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationTextProps = $props()
</script>

<span {...rest} data-scope="inline-citation" data-part="text">
  {@render children?.()}
</span>
