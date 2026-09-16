<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourProgressTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTourContext } from './use-tour-context.ts'

  let { ref = $bindable(null), ...props }: TourProgressTextProps = $props()

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getProgressTextProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {tour().getProgressText()}
  {/if}
</Codesign>
