<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectIndicatorProps extends Assign<HTMLProps<'div'>, SelectIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), ...props }: SelectIndicatorProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getIndicatorProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
