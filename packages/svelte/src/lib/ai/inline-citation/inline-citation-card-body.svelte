<script lang="ts">
  import { HoverCardContent, HoverCardPositioner } from '../../components/hover-card/index.ts'

  interface InlineCitationCardBodyProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationCardBodyProps = $props()
</script>

<HoverCardPositioner>
  <HoverCardContent {...rest} data-scope="inline-citation" data-part="card-body">
    {@render children?.()}
  </HoverCardContent>
</HoverCardPositioner>
