<script lang="ts">
  interface CommitInfoProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitInfoProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="info">
  {@render children?.()}
</div>
