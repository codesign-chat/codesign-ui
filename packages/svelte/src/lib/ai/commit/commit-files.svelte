<script lang="ts">
  interface CommitFilesProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitFilesProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="files">
  {@render children?.()}
</div>
