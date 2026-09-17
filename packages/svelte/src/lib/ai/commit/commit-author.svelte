<script lang="ts">
  interface CommitAuthorProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitAuthorProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="author">
  {@render children?.()}
</div>
