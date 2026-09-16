<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CollapsibleTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CollapsibleTriggerProps extends Assign<HTMLProps<'button'>, CollapsibleTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useCollapsibleContext } from './use-collapsible-context.ts'

  let { ref = $bindable(null), ...props }: CollapsibleTriggerProps = $props()
  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
