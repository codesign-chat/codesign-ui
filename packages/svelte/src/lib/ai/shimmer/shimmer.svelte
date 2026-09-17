<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ShimmerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    text: string
    duration?: number
    as?: string
  }

  let { text, duration = 2, as = 'p', ...rest }: ShimmerProps = $props()
  const words = $derived(text.split(' '))
</script>

<svelte:element this={as} {...rest} data-scope="shimmer" data-part="root">
  {#each words as word, index (index)}
    <span data-scope="shimmer" data-part="word" style:animation-delay="{index * 60}ms" style:animation-duration="{duration}s"
      >{word}</span
    >{' '}
  {/each}
</svelte:element>
