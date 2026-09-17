<script lang="ts">
  interface CommitMessageProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitMessageProps = $props()
</script>

<span {...rest} data-scope="commit" data-part="message">
  {@render children?.()}
</span>
