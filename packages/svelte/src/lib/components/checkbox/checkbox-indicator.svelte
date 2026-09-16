<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CheckboxIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    indeterminate?: boolean
  }
  export interface CheckboxIndicatorProps extends Assign<HTMLProps<'div'>, CheckboxIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useCheckboxContext } from './use-checkbox-context.ts'

  let { ref = $bindable(null), indeterminate, ...rest }: CheckboxIndicatorProps = $props()

  const checkbox = useCheckboxContext()
  const mergedProps = $derived(mergeProps(checkbox().getIndicatorProps(), rest))
  const isVisible = $derived(indeterminate ? checkbox().indeterminate : checkbox().checked)
</script>

<Codesign as="div" bind:ref {...mergedProps} hidden={!isVisible} />
