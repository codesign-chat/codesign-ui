<script lang="ts">
  import { AvatarRoot, AvatarFallback } from '../../components/avatar/index.ts'

  interface CommitAuthorAvatarProps {
    initials: string
    children?: import('svelte').Snippet
  }

  let { initials, children, ...rest }: CommitAuthorAvatarProps = $props()
</script>

<AvatarRoot {...rest} data-scope="commit" data-part="author-avatar">
  <AvatarFallback>{initials}</AvatarFallback>
  {@render children?.()}
</AvatarRoot>
