<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTourContext } from './use-tour-context.ts'

  let { ref = $bindable(null), ...props }: TourDescriptionProps = $props()

  const tour = useTourContext()
  const mergedProps = $derived(mergeProps(tour().getDescriptionProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {tour().step?.description}
  {/if}
</Codesign>
