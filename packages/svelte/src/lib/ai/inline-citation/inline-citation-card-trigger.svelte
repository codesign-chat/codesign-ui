<script lang="ts">
  import { HoverCardTrigger } from '../../components/hover-card/index.ts'

  interface InlineCitationCardTriggerProps {
    sources: string[]
  }

  let { sources, ...rest }: InlineCitationCardTriggerProps = $props()

  const label = $derived.by(() => {
    const first = sources[0]
    if (!first) return 'unknown'
    const host = new URL(first).hostname
    return sources.length > 1 ? `${host} +${sources.length - 1}` : host
  })
</script>

<HoverCardTrigger data-scope="inline-citation" data-part="card-trigger">
  {#snippet asChild(props)}
    <span {...props()} {...rest} data-scope="inline-citation" data-part="citation-badge">{label}</span>
  {/snippet}
</HoverCardTrigger>
