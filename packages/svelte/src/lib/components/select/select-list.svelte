<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectListProps extends Assign<HTMLProps<'div'>, SelectListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), ...props }: SelectListProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getListProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
