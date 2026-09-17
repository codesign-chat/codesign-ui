<script lang="ts">
  interface CodeBlockContainerProps {
    language: string
    children?: import('svelte').Snippet
  }

  let { language, children, ...rest }: CodeBlockContainerProps = $props()
</script>

<div {...rest} data-language={language} data-scope="code-block" data-part="root" style:contain-intrinsic-size="auto 200px" style:content-visibility="auto">
  {@render children?.()}
</div>
