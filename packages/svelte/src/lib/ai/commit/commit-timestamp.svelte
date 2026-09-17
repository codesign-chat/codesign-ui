<script lang="ts">
  interface CommitTimestampProps {
    date: Date
    children?: import('svelte').Snippet
  }

  let { date, children, ...rest }: CommitTimestampProps = $props()

  const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const formatted = $derived.by(() => {
    const days = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return relativeTimeFormat.format(days, 'day')
  })
</script>

<time {...rest} data-scope="commit" data-part="timestamp" datetime={date.toISOString()}>
  {#if children}
    {@render children()}
  {:else}
    {formatted}
  {/if}
</time>
