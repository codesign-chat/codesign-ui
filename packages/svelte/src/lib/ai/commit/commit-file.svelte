<script lang="ts">
  interface CommitFileProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitFileProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="file">
  {@render children?.()}
</div>
