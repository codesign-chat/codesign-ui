<script lang="ts">
  interface CommitHashProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitHashProps = $props()
</script>

<span {...rest} data-scope="commit" data-part="hash">
  {@render children?.()}
</span>
