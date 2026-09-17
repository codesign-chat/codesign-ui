<script lang="ts">
  import { HoverCardRoot } from '../../components/hover-card/index.ts'

  interface InlineCitationCardProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCardProps = $props()
</script>

<HoverCardRoot {...(rest as any)} data-scope="inline-citation" data-part="card" closeDelay={0} openDelay={0}>
  {@render children?.()}
</HoverCardRoot>
