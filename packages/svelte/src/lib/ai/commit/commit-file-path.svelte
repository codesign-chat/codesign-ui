<script lang="ts">
  interface CommitFilePathProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitFilePathProps = $props()
</script>

<span {...rest} data-scope="commit" data-part="file-path">
  {@render children?.()}
</span>
