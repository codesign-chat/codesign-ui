<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PaginationPrevTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationPrevTriggerProps extends Assign<HTMLProps<'button'>, PaginationPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { usePaginationContext } from './use-pagination-context.ts'

  let { ref = $bindable(null), ...props }: PaginationPrevTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getPrevTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
