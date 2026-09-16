<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ProgressRangeBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ProgressRangeProps extends HTMLProps<'div'>, ProgressRangeBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useProgressContext } from './use-progress-context.ts'

  let { ref = $bindable(null), ...props }: ProgressRangeProps = $props()
  const progress = useProgressContext()
  const mergedProps = $derived(mergeProps(progress().getRangeProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
