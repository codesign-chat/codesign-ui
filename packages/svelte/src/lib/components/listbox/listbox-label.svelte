<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ListboxLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ListboxLabelProps extends Assign<HTMLProps<'span'>, ListboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useListboxContext } from './use-listbox-context.js'

  let { ref = $bindable(null), ...props }: ListboxLabelProps = $props()

  const listbox = useListboxContext()
  const mergedProps = $derived(mergeProps(listbox().getLabelProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
