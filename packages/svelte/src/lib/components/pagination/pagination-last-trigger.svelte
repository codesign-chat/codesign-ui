<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PaginationLastTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface PaginationLastTriggerProps extends Assign<HTMLProps<'button'>, PaginationLastTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { usePaginationContext } from './use-pagination-context.ts'

  let { ref = $bindable(null), ...props }: PaginationLastTriggerProps = $props()
  const pagination = usePaginationContext()
  const mergedProps = $derived(mergeProps(pagination().getLastTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
